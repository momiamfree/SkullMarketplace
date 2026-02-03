import { useNftList } from "../../nftList";

export default function Marketplace() {

    const { tokenIds, loading } = useNftList();



    return (
        <div className="p-8 space-y-12 max-w-6xl mx-auto">
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
