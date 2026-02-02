import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const NFT_ADDRESS = "0xA691b0E7Ab049a257B5B0357788ad205e972e13d";
  const MARKETPLACE_ADDRESS = "0xb1A4e26148399Fe8AD3C67a6F4644Aa5186F2BD0";

  const provider = ethers.provider; // provider de Sepolia según hardhat.config.ts

  const buyer = new ethers.Wallet(process.env.PRIVATE_KEY_BUYER!, provider);

  const nft = await ethers.getContractAt("SkullNFT", NFT_ADDRESS, owner);
  const marketplace = await ethers.getContractAt("SkullMarketplace", MARKETPLACE_ADDRESS, owner);

  // 1. Mint NFT
  const mintTx = await nft.mint(owner.address);
  await mintTx.wait();

  const filter = nft.filters.Transfer(undefined, owner.address);
  const events = await nft.queryFilter(filter, -5);
  const lastEvent = events[events.length - 1];
  const tokenId = lastEvent.args!.tokenId;
  console.log("NFT minted with tokenId:", tokenId.toString());

  // 2. Approve marketplace
  await (await nft.setApprovalForAll(MARKETPLACE_ADDRESS, true)).wait();
  console.log("Marketplace approved");

  // 3. List NFT
  const price = ethers.parseEther("0.0001");
  await (await marketplace.listNFT(NFT_ADDRESS, tokenId, price)).wait();
  console.log("NFT listed");

  // 4. Buy NFT as buyer
  const marketplaceBuyer = marketplace.connect(buyer);
  await (await marketplaceBuyer.buyNFT(NFT_ADDRESS, tokenId, { value: price })).wait();
  console.log("NFT bought 🎉");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
