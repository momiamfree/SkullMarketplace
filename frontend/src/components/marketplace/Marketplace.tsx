import { useAccount } from "wagmi";
import { useMyNFTs } from "../../hooks/useMyNFTs";
import EtherscanIcon from "../../assets/etherscan.svg";

export default function Marketplace() {
  const { isConnected } = useAccount();
  const { nfts, loading } = useMyNFTs();

  return (
    <div className="p-6 space-y-12 max-w-6xl mx-auto pt-10">
      <h2 className="text-2xl font-bold text-center">
        My Skull NFTs 💀
      </h2>

      {!isConnected && (
        <p className="text-center text-yellow-200 font-semibold">
          🔌 Connect your wallet to see your NFTs
        </p>
      )}

      {isConnected && loading && (
        <p className="text-center text-yellow-200">
          Loading NFTs...
        </p>
      )}

      {isConnected && !loading && nfts.length === 0 && (
        <p className="text-center text-yellow-200">
          No NFTs found in your wallet
        </p>
      )}

      {isConnected && !loading && nfts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {nfts.map((nft, idx) => (
            <div
              key={idx}
              className="bg-yellow-200 rounded-lg p-4 text-center shadow"
            >
              <img
                src={nft.image}
                alt={nft.collection}
                className="w-full h-48 object-cover rounded mb-2"
              />

              <p className="font-semibold text-brown flex items-center justify-center gap-2">
                {nft.collection} #{nft.tokenId.toString()}
                <a
                  href={`https://sepolia.etherscan.io/token/${nft.collectionAddress}?a=${nft.tokenId.toString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                  title="View on Etherscan"
                >
                  <img
                    src={EtherscanIcon}
                    alt="Etherscan"
                    className="w-4 h-4"
                  />
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
