// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/ERC165Checker.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "../IRRoyalty.sol";

contract DecliningAuction is ReentrancyGuard{

    bytes4 public constant ERC721INTERFACE = type(IERC721).interfaceId;
    bytes4 public constant ERC2981INTERFACE = type(IERC2981).interfaceId;

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    
    struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable creator;
    address payable seller;
    address payable owner;
    uint256 initialPrice;
    uint256 minPrice;
    bool sold;
    }

    struct AuctionInfo {
        uint256 highestBid;
        address highestBidder;
        uint256 royalty;
        uint256 timeStarted;
        uint256 timeEnding;
    }
    
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => AuctionInfo) private auctionData;
    
    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    event MarketItemSold(
        uint256 itemId,
        address indexed nftContract,
        address indexed seller,
        address indexed newOwner
        );
    
    event MarketItemBid(
        uint256 indexed itemId,
        address indexed bidder,
        uint256 amount
        );
        
    event MarketItemUnlisted(
        uint256 itemId
        );
    
    function createMarketAuction(
    address nftContract,
    uint256 tokenId,
    uint256 initialPrice,
    uint256 minPrice,
    uint auctionDays
    ) external payable nonReentrant{
    require(initialPrice > 0, "Price must be at least 1 wei");
    require(auctionDays > 0, "Auction time can't be 0 days");
    require(ERC165Checker.supportsInterface(nftContract,ERC721INTERFACE),"Contract needs to be ERC721");
    require(IERC721(nftContract).ownerOf(tokenId) == msg.sender,"Only owner can create listing");
    require(minPrice < initialPrice,"min price needs to be lower than initial price");
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    address creator;
    uint256 royaltyAmount;
    if (ERC165Checker.supportsInterface(nftContract,ERC2981INTERFACE)){
        (creator,royaltyAmount) = IERC2981(nftContract).royaltyInfo(tokenId,initialPrice);
    }
    idToMarketItem[itemId] =  MarketItem(
                                    itemId,
                                    nftContract,
                                    tokenId,
                                    payable(creator),
                                    payable(msg.sender),
                                    payable(address(0)),
                                    initialPrice,
                                    minPrice,
                                    false
                                );
    
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    
    auctionData[itemId] = AuctionInfo(0,
                                      address(0),
                                      royaltyAmount,
                                      block.timestamp,
                                      (block.timestamp + auctionDays*1 days)
                                     );
    
    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      initialPrice
    );
    }
    
    function createAuctionBid(
        uint256 itemId
    ) external payable nonReentrant{
        MarketItem storage currentItem = idToMarketItem[itemId];
        AuctionInfo storage currentInfo = auctionData[itemId];
        require(!currentItem.sold,"Item has already been sold");
        require(currentInfo.timeEnding > block.timestamp,"Auction has already ended");
        
        if(currentInfo.highestBid != 0){
            require(msg.value > currentInfo.highestBid,"You need to pay more than current highest bid");
        }
        else{
            uint currentValue = (currentItem.initialPrice - currentItem.minPrice)*(block.timestamp - currentInfo.timeStarted)/(currentInfo.timeEnding - currentInfo.timeStarted);
            require(msg.value > currentValue,"You need to pay more than current value of the NFT");
        }
        payable(currentInfo.highestBidder).transfer(currentInfo.highestBid);
        currentInfo.highestBidder = msg.sender;
        currentInfo.highestBid = msg.value;
        emit MarketItemBid(itemId,msg.sender,msg.value);
    }


    function createAuctionSale(
        address nftContract,
        uint itemId
        ) external payable nonReentrant{
        MarketItem storage currentItem = idToMarketItem[itemId];
        AuctionInfo storage currentInfo = auctionData[itemId];
        require(!currentItem.sold,"Item has already been sold");
        require(currentInfo.timeEnding < block.timestamp,"Auction has not yet ended");
        require(msg.sender == currentInfo.highestBidder,"Sender is not the highest bidder");
        if(currentItem.creator == currentItem.seller ){
        payable(currentItem.nftContract).transfer(msg.value);
        }
        else{
        payable(currentItem.seller).transfer(currentInfo.royalty);
        currentItem.seller.transfer(msg.value-currentInfo.royalty);
        }
        IERC721(nftContract).transferFrom(address(this), msg.sender, currentItem.tokenId);
        currentItem.owner = payable(msg.sender);
        currentItem.sold = true;
        _itemsSold.increment();
        emit MarketItemSold(itemId,nftContract,currentItem.seller,currentItem.owner);
        }

    function unlistItem(uint itemId) external nonReentrant{
        require(!idToMarketItem[itemId].sold,"Sold items can't be unlisted");
        require(idToMarketItem[itemId].seller == msg.sender,"Sender is not lister");
        
        AuctionInfo storage info = auctionData[itemId];
        if(info.highestBid > 0){
            payable(info.highestBidder).transfer(info.highestBid);
        }
        delete auctionData[itemId];
        
        IERC721(idToMarketItem[itemId].nftContract).transferFrom(address(this),msg.sender,idToMarketItem[itemId].tokenId);
        delete idToMarketItem[itemId];
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        emit MarketItemUnlisted(
        itemId
        );
    }
}