// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SkullMarketplace {

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(
        address indexed nft,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event Sale(
        address indexed nft,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    event Cancelled(
        address indexed nft,
        uint256 indexed tokenId
    );

    function listNFT(
        address nft,
        uint256 tokenId,
        uint256 price
    ) external {
        require(price > 0, "Price must be > 0");

        IERC721 token = IERC721(nft);
        require(token.ownerOf(tokenId) == msg.sender, "Not owner");

        token.transferFrom(msg.sender, address(this), tokenId);

        listings[nft][tokenId] = Listing({
            seller: msg.sender,
            price: price
        });

        emit Listed(nft, tokenId, msg.sender, price);
    }

    function cancelListing(address nft, uint256 tokenId) external {
        Listing memory listing = listings[nft][tokenId];
        require(listing.seller == msg.sender, "Not seller");

        delete listings[nft][tokenId];
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);

        emit Cancelled(nft, tokenId);
    }

    function buyNFT(address nft, uint256 tokenId) external payable {
        Listing memory listing = listings[nft][tokenId];
        require(listing.price > 0, "Not listed");
        require(msg.value == listing.price, "Wrong price");

        delete listings[nft][tokenId];

        payable(listing.seller).transfer(msg.value);
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);

        emit Sale(nft, tokenId, msg.sender, listing.price);
    }
}
