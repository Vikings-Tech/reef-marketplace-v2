// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/ERC165Checker.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "../IRRoyalty.sol";

contract Lending is ReentrancyGuard{
    
    bytes4 public constant ERC721INTERFACE = type(IERC721).interfaceId;

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable borrower;
    address payable lender;
    uint256 price;
    uint daysToReturn;
    uint8 state; //0: listed,1:lended,2:retrieved,3:sold
    }


    mapping(uint256 => MarketItem) private idToMarketItem;
    
    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event MarketItemSold(
        uint256 itemId,
        address indexed nftContract,
        address indexed seller,
        address indexed newOwner
        );
    
    event MarketItemUnlisted(
        uint256 itemId
        );

    /* Places an item for sale on the marketplace */
    function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
    ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(ERC165Checker.supportsInterface(nftContract,ERC721INTERFACE),"Contract needs to be ERC721");
    require(IERC721(nftContract).ownerOf(tokenId) == msg.sender,"Only owner can create listing");
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    idToMarketItem[itemId] =  MarketItem(
                                      itemId,
                                      nftContract,
                                      tokenId,
                                      payable(msg.sender),
                                      payable(address(0)),
                                      price,
                                      0
                                    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    
    // emit MarketItemCreated(
    //   itemId,
    //   nftContract,
    //   tokenId,
    //   msg.sender,
    //   address(0),
    //   price
    // );
    }
    
    function marketLend(uint itemId) external payable nonReentrant{
        MarketItem storage item =  idToMarketItem[itemId];
        require(item.status == 0,"Item is not for lending");
        require(msg.value == item.price,"Value sent needs to be equal to asking amount");

    }
    
}