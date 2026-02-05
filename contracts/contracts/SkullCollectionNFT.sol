// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SkullCollectionNFT is ERC721Enumerable, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.0001 ether;

    uint256 public nextTokenId;
    string private baseTokenURI;
    address public marketplaceWallet;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        address marketplaceWallet_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        baseTokenURI = baseURI_;
        marketplaceWallet = marketplaceWallet_;
    }

    function mint(address to) external payable nonReentrant {
        require(msg.value == MINT_PRICE, "Incorrect ETH amount");
        require(nextTokenId < MAX_SUPPLY, "Max supply reached");

        _safeMint(to, nextTokenId);
        nextTokenId++;

        (bool success, ) = marketplaceWallet.call{value: msg.value}("");
        require(success, "ETH transfer failed");
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
