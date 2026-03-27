// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract VaultverseMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    // Mapping from NFT address to Token ID to Listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    modifier notListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Listing memory listing = listings[nftAddress][tokenId];
        require(listing.price == 0 || !listing.isActive, "Already listed");
        _;
    }

    modifier isListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Listing memory listing = listings[nftAddress][tokenId];
        require(listing.price > 0 && listing.isActive, "Not listed");
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == spender, "Not owner");
        _;
    }

    function listItems(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external notListed(nftAddress, tokenId) isOwner(nftAddress, tokenId, msg.sender) {
        require(price > 0, "Price must be > 0");
        IERC721 nft = IERC721(nftAddress);
        require(
            nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)),
            "Not approved for marketplace"
        );

        listings[nftAddress][tokenId] = Listing(msg.sender, nftAddress, tokenId, price, true);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(
        address nftAddress,
        uint256 tokenId
    ) external isOwner(nftAddress, tokenId, msg.sender) isListed(nftAddress, tokenId) {
        listings[nftAddress][tokenId].isActive = false;
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function buyItem(
        address nftAddress,
        uint256 tokenId
    ) external payable isListed(nftAddress, tokenId) nonReentrant {
        Listing memory listedItem = listings[nftAddress][tokenId];
        require(msg.value >= listedItem.price, "Price not met");

        // Deactivate listing
        listings[nftAddress][tokenId].isActive = false;

        // Pay seller
        (bool success, ) = payable(listedItem.seller).call{value: listedItem.price}("");
        require(success, "Transfer failed");

        // Transfer NFT
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);

        // Refund excess if any
        if (msg.value > listedItem.price) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - listedItem.price}("");
            require(refundSuccess, "Refund failed");
        }

        emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
    }
}
