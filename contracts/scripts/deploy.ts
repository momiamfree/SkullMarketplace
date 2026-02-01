import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  // 1. Deploy NFT
  const baseURI = "https://example.com/metadata/";
  const SkullNFT = await ethers.getContractFactory("SkullNFT");
  const nft = await SkullNFT.deploy(baseURI);
  await nft.waitForDeployment();

  const nftAddress = await nft.getAddress();
  console.log("SkullNFT deployed to:", nftAddress);

  // 2. Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("SkullMarketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();

  const marketplaceAddress = await marketplace.getAddress();
  console.log("Marketplace deployed to:", marketplaceAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
