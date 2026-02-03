import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import productsData from "../../data/ProductsData";
import './Product.css';
import { ethers } from "ethers";
import NFT_ABI from "../../abis/SkullNFT.json";
import MARKETPLACE_ABI from "../../abis/SkullMarketplace.json";

/* ---------- Types ---------- */
interface ProductItem {
    id: number;
    name: string;
    image: string;
    collectionId: number;
}

interface Collection {
    id: number;
    name: string;
}

interface CollectionFilterProps {
    collections: Collection[];
    selectedCollection: number | null;
    onSelect: (collectionId?: number) => void;
}

/* ---------- Components ---------- */
function CollectionFilter({
    collections,
    selectedCollection,
    onSelect,
}: CollectionFilterProps) {
return (
  <div className="w-full text-center mb-6">
    <button
      className={`rounded-full px-2 py-1 text-sm border border-yellow-200 mr-2 mb-2 cursor-pointer
        ${
          selectedCollection === null
            ? "bg-yellow-200 text-brown"
            : "text-yellow-200"
        }`}
      onClick={() => onSelect()}
    >
      All
    </button>

    {collections.map((collection) => {
      const isSelected = selectedCollection === collection.id;

      return (
        <button
          key={collection.id}
          className={`rounded-full px-2 py-1 text-sm border border-yellow-200 mr-2 mb-2 focus:text-brown focus:bg-yellow-200 cursor-pointer
            ${
              isSelected
                ? "bg-yellow-200 text-brown"
                : "text-yellow-200"
            }`}
          onClick={() => onSelect(collection.id)}
        >
          {collection.name}
        </button>
      );
    })}
  </div>
);

}

export default function Product() {
const NFT_ADDRESS = "0xA691b0E7Ab049a257B5B0357788ad205e972e13d";
const MARKETPLACE_ADDRESS = "0xb1A4e26148399Fe8AD3C67a6F4644Aa5186F2BD0";
const [status, setStatus] = useState("");
const [tokenId, setTokenId] = useState<number | null>(null);

const { isConnected, address } = useAccount();
const { data: walletClient } = useWalletClient();

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

    const [selectedCollection, setSelectedCollection] = useState<number | null>(
        null
    );

    const handleSelectCollection = (collectionId?: number) => {
        if (selectedCollection === collectionId) {
            setSelectedCollection(null);
        } else {
            setSelectedCollection(collectionId ?? null);
        }
    };

    const filteredProducts: ProductItem[] = selectedCollection
        ? productsData.filter(
            (product: ProductItem) => product.collectionId === selectedCollection
        )
        : productsData;

    const collections: Collection[] = [
        { id: 1, name: "Bears" },
        { id: 2, name: "Cats" },
        { id: 3, name: "Dogs" },
    ];

    return (
        <div className="p-6 max-w-[1280px] mx-auto">
            <CollectionFilter
                collections={collections}
                selectedCollection={selectedCollection}
                onSelect={handleSelectCollection}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-yellow-200 h-110 rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <h4 className="text-lg font-bold mb-2 text-center product-card">
                            {product.name}
                        </h4>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-md mb-4"
                        />
          <button
            className="px-6 py-2 text-yellow-200 rounded mint-button cursor-pointer"
            onClick={mintNFT}
          >
            Mint
          </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
