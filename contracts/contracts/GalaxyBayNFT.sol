// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GalaxyBayNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    // Repare que agora chamamos ambos os construtores:
    // ERC721(name, symbol) e Ownable(initialOwner)
    constructor()
        ERC721("GalaxyBayNFT", "GBNFT")
        Ownable(msg.sender)
    {}

    function mint(string calldata tokenURI) external {
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}