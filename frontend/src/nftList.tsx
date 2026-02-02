import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import NFT_ABI from "./abis/SkullNFT.json";

const NFT_ADDRESS = "0xA691b0E7Ab049a257B5B0357788ad205e972e13d";

export function useNftList() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !publicClient) return;

    const loadNFTs = async () => {
      setLoading(true);

      try {
        debugger;
        const balance = await publicClient.readContract({
          address: NFT_ADDRESS,
          abi: NFT_ABI.abi,
          functionName: "balanceOf",
          args: [address],
        });

        const ids: bigint[] = [];

        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await publicClient.readContract({
            address: NFT_ADDRESS,
            abi: NFT_ABI.abi,
            functionName: "tokenOfOwnerByIndex",
            args: [address, BigInt(i)],
          });
          console.log(tokenId)
          ids.push(tokenId as bigint);
        }

        setTokenIds(ids);
      } catch (err) {
        console.error("Error loading NFTs:", err);
      }

      setLoading(false);
    };

    loadNFTs();
  }, [address, publicClient]);

  return { tokenIds, loading };
}
