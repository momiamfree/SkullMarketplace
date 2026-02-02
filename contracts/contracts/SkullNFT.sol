// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkullNFT is ERC721Enumerable, Ownable {
    uint256 public nextTokenId;
    string private baseTokenURI;

    constructor(string memory _baseTokenURI)
        ERC721("Skull NFT", "SKULL")
        Ownable(msg.sender)
    {
        baseTokenURI = _baseTokenURI;
    }

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
