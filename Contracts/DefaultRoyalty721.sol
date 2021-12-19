//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./IRRoyalty.sol";

contract DefaultRoyalty is Ownable,ReentrancyGuard,ERC721Enumerable,ERC721URIStorage{
    
    mapping(uint=>address) creator;
    
    using Counters for Counters.Counter;
    Counters.Counter private tokenId_;
  
    mapping(uint=>uint) royalty;

    address marketAddress;

    modifier onlyCreator(uint tokenId) {
        require(msg.sender == creator[tokenId],"Royalty Contract : Caller is not creator");
        _;
    }
     
    constructor(address market) ERC721("Reef Base","RB") {
        marketAddress = market;
        setApprovalForAll(marketAddress,true);
    }
    
    
    function mint(string calldata metaHash,uint256 royalty_) external {
        tokenId_.increment();
        uint256 tokenId = tokenId_.current();
        _mint(msg.sender,tokenId);
        _setTokenURI(tokenId,metaHash);
        royalty[tokenId] = royalty_;
        creator[tokenId] = msg.sender;
    }
    
    function getTokenRoyalty(uint256 _tokenId) external view returns(uint256){
        return royalty[_tokenId];
    }
    
    function royaltyInfo(uint256 _tokenId,uint256 _salePrice) external view returns (
        address receiver,
        uint256 royaltyAmount
    ){
        receiver = creator[_tokenId];
        royaltyAmount = (_salePrice*royalty[_tokenId])/100;
    }
    
    function getCreator(uint _tokenId) external view returns(address){
        return creator[_tokenId];
    }
    
     function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721,ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Enumerable).interfaceId ||
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

}