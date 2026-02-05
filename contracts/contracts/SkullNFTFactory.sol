// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./SkullCollectionNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkullNFTFactory is Ownable {
    enum CollectionType { CAT, DOG, BEAR }

    mapping(CollectionType => address) public collections;
    address public marketplaceWallet;

    event CollectionCreated(
        CollectionType indexed collectionType,
        address collectionAddress
    );

    constructor(address _marketplaceWallet) Ownable(msg.sender) {
        marketplaceWallet = _marketplaceWallet;
    }

    function createCollection(
        CollectionType collectionType,
        string memory name,
        string memory symbol,
        string memory baseURI
    ) external onlyOwner {
        require(collections[collectionType] == address(0), "Already created");

        SkullCollectionNFT nft = new SkullCollectionNFT(
            name,
            symbol,
            baseURI,
            marketplaceWallet
        );

        collections[collectionType] = address(nft);

        emit CollectionCreated(collectionType, address(nft));
    }

    function mint(CollectionType collectionType) external payable {
        address collection = collections[collectionType];
        require(collection != address(0), "Collection not deployed");

        SkullCollectionNFT(collection).mint{value: msg.value}(msg.sender);
    }

    function setMarketplaceWallet(address newWallet) external onlyOwner {
        marketplaceWallet = newWallet;
    }
}
