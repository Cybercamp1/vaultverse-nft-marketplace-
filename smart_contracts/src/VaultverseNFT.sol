// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultverseNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event NFTMinted(uint256 indexed tokenId, string tokenURI, address indexed owner);

    constructor(address initialOwner) ERC721("Vaultverse", "VLT") Ownable(initialOwner) {}

    function mint(string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(tokenId, uri, msg.sender);
        return tokenId;
    }
}
