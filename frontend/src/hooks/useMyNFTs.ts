import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import NFT_ABI from "../abis/SkullCollectionNFT.json";
import { ONCHAIN_COLLECTIONS } from "../constants/collections.onchain";

export interface MyNFT {
    collection: string;
    collectionAddress: string;
    tokenId: bigint;
    image: string;
}

export function useMyNFTs() {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const [nfts, setNfts] = useState<MyNFT[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address || !publicClient) return;

        const loadNFTs = async () => {
            setLoading(true);
            const results: MyNFT[] = [];

            for (const col of ONCHAIN_COLLECTIONS) {
                const balance = await publicClient.readContract({
                    address: col.address,
                    abi: NFT_ABI.abi,
                    functionName: "balanceOf",
                    args: [address],
                });

                const balanceNumber = Number(balance);
                if (balanceNumber === 0) continue;

                const tokenURI = (await publicClient.readContract({
                    address: col.address,
                    abi: NFT_ABI.abi,
                    functionName: "tokenURI",
                    args: [0],
                })) as string;

                const metadata = await fetch(
                    tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
                )
                    .then((r) => r.json())
                    .catch((e) => {
                        console.error("Error fetching NFT metadata:", e);
                        return { image: "" };
                    });

                for (let i = 0; i < balanceNumber; i++) {
                    const tokenId = await publicClient.readContract({
                        address: col.address,
                        abi: NFT_ABI.abi,
                        functionName: "tokenOfOwnerByIndex",
                        args: [address, BigInt(i)],
                    });

                    results.push({
                        collection: col.name,
                        collectionAddress: col.address,
                        tokenId: tokenId as bigint,
                        image: metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
                    });

                }
                await new Promise(r => setTimeout(r, 1));
            }

            setNfts(results);
            setLoading(false);
        };

        loadNFTs();
    }, [address, publicClient]);

    return { nfts, loading };
}
