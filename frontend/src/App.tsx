import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useNftList } from "./NftList.tsx";

import NFT_ABI from "./abis/SkullNFT.json";
import MARKETPLACE_ABI from "./abis/SkullMarketplace.json";

const NFT_ADDRESS = "0xA691b0E7Ab049a257B5B0357788ad205e972e13d";
const MARKETPLACE_ADDRESS = "0xb1A4e26148399Fe8AD3C67a6F4644Aa5186F2BD0";

export default function App() {
  const [status, setStatus] = useState("");
  const [tokenId, setTokenId] = useState<number | null>(null);

  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { tokenIds, loading } = useNftList();

  const getSigner = async () => {
    if (!walletClient) return null;
    const provider = new ethers.BrowserProvider(walletClient);
    return provider.getSigner();
  };

  const mintNFT = async () => {
    if (!address) return;
    setStatus("Minting...");

    const signer = await getSigner();
    if (!signer) return;

    const nft = new ethers.Contract(NFT_ADDRESS, NFT_ABI.abi, signer);
    const tx = await nft.mint(address);
    const receipt = await tx.wait();

    const event = receipt.logs?.[0];
    if (event) {
      setTokenId(Number(BigInt(event.topics[3])));
    }

    setStatus("NFT minted ✅");
  };

  const approveMarketplace = async () => {
    setStatus("Approving...");

    const signer = await getSigner();
    if (!signer) return;

    const nft = new ethers.Contract(NFT_ADDRESS, NFT_ABI.abi, signer);
    await nft.setApprovalForAll(MARKETPLACE_ADDRESS, true);

    setStatus("Marketplace approved ✅");
  };

  const listNFT = async () => {
    if (tokenId === null) return;
    setStatus("Listing NFT...");

    const signer = await getSigner();
    if (!signer) return;

    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI.abi,
      signer
    );

    const price = ethers.parseEther("0.01");
    await marketplace.listNFT(NFT_ADDRESS, tokenId, price);

    setStatus("NFT listed ✅");
  };

  const buyNFT = async () => {
    if (tokenId === null) return;
    setStatus("Buying NFT...");

    const signer = await getSigner();
    if (!signer) return;

    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI.abi,
      signer
    );

    const price = ethers.parseEther("0.001");
    await marketplace.buyNFT(NFT_ADDRESS, tokenId, { value: price });

    setStatus("NFT bought 🎉");
  };

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        SkullMarketplace Test UI
      </h1>

      <div className="flex justify-center">
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="flex flex-col items-center space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            onClick={mintNFT}
          >
            Mint NFT
          </button>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            onClick={approveMarketplace}
          >
            Approve Marketplace
          </button>

          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            onClick={listNFT}
            disabled={tokenId === null}
          >
            List NFT
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            onClick={buyNFT}
            disabled={tokenId === null}
          >
            Buy NFT
          </button>

          {status && <p className="font-semibold">{status}</p>}
        </div>
      )}

      <hr />

      <h2 className="text-2xl font-bold text-center">My Skull NFTs 💀</h2>

      {loading && <p className="text-center">Loading NFTs...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tokenIds.map((id) => (
          <div
            key={id.toString()}
            className="border rounded-lg p-4 text-center shadow"
          >
            <p className="font-semibold">Token #{id.toString()}</p>
          </div>
        ))}
      </div>

      {!loading && tokenIds.length === 0 && (
        <p className="text-center text-gray-500">No NFTs found</p>
      )}
    </div>
  );
}
