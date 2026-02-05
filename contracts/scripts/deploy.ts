import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const marketplaceWallet = deployer.address;

  // Factory deployment
  const Factory = await ethers.getContractFactory("SkullNFTFactory");
  const factory = (await Factory.deploy(marketplaceWallet)) as any;
  await factory.waitForDeployment();
  console.log("Factory deployed to:", await factory.getAddress());

  // Create collections
  const collections = [
    { type: 0, name: "Skull Cats", symbol: "SCAT", baseURI: "ipfs://bafkreibrwhiay6alias3ldyme5z5y6maqk4bk5tidyjvmgx7w4hg4rorxm" },
    { type: 1, name: "Skull Dogs", symbol: "SDOG", baseURI: "ipfs://bafkreifg4k7vzpiy5lvh2jae7kip3whxjuhgct4idgbkodxpdstel5itfy" },
    { type: 2, name: "Skull Bears", symbol: "SBEAR", baseURI: "ipfs://bafkreia22krmjzxxkfhqslsamhthcuoqseehwi32olw4eark6jgac7mlta" },
  ];

  for (const col of collections) {
    const tx = await factory.createCollection(col.type, col.name, col.symbol, col.baseURI);
    await tx.wait();
    console.log(`Collection ${col.name} created!`);
  }

  // Get collections address contracts
  const deployedCollections: { name: string; address: string, type: number }[] = [];
  for (const col of collections) {
    const address = await factory.collections(col.type);
    deployedCollections.push({ name: col.name, address, type: col.type });
    console.log(`${col.name} deployed at: ${address}`);
  }

  // Test minting 1 NFT in each collection
  for (const col of deployedCollections) {
    const nft = (await ethers.getContractAt(
      "SkullCollectionNFT",
      col.address
    )) as any;

    const mintTx = await factory.mint(col.type, {
      value: ethers.parseEther("0.0001"),
    });
    await mintTx.wait();

    const tokenId = await nft.nextTokenId();
    console.log(`Minted 1 NFT in ${col.name}, nextTokenId is now: ${tokenId.toString()}`);
  }

  console.log("✅ All collections created and test mints completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
