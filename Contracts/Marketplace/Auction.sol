// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/ERC165Checker.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "../IRRoyalty.sol";

contract Auction is ReentrancyGuard{
    
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
    uint256 price;
    uint256 royalty;
    bool sold;
    }
    
    struct AuctionInfo {
        uint256 highestBid;
        address highestBidder;
        uint256 timeEnding;
    }
    
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => AuctionInfo) private auctionData;
    
}