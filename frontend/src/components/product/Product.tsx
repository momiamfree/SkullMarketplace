import { useState } from "react";
import { useAccount, useWalletClient, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { ethers } from "ethers";
import FACTORY_ABI from "../../abis/SkullNFTFactory.json";
import { COLLECTIONS_UI } from "../../constants/collections.ui";
import "./Product.css";
import { ONCHAIN_FACTORY } from "../../constants/collections.onchain";

type ModalStatus = "pending" | "success" | "error";

export default function Product() {
    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();
    const { connect } = useConnect();

    const [showModal, setShowModal] = useState(false);
    const [modalStatus, setModalStatus] = useState<ModalStatus>("pending");
    const [modalMessage, setModalMessage] = useState("");

    const mintNFT = async (collectionType: number) => {
        if (!walletClient || !isConnected) return;

        try {
            setShowModal(true);
            setModalStatus("pending");
            setModalMessage("Minting your Skull NFT…");

            const provider = new ethers.BrowserProvider(walletClient);
            const signer = await provider.getSigner();

            const factory = new ethers.Contract(
                ONCHAIN_FACTORY,
                FACTORY_ABI.abi,
                signer
            );

            const tx = await factory.mint(collectionType, {
                value: ethers.parseEther("0.0001"),
            });

            await tx.wait();

            setModalStatus("success");
            setModalMessage("🎉 Your Skull NFT was minted successfully! 🎉");
        } catch (err) {
            console.error(err);
            setModalStatus("error");
            setModalMessage("❌ Mint failed. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-[1280px] mx-auto pt-10">
            <h1 className="text-2xl font-bold text-center mb-12 text-yellow-200">
                Mint your Skull NFT 🌺
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLECTIONS_UI.map((col) => (
                    <div
                        key={col.type}
                        className="bg-yellow-200 rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <h4 className="text-lg font-bold mb-2 text-brown">
                            {col.name}
                        </h4>

                        <img
                            src={col.image}
                            alt={col.name}
                            className="w-full h-80 object-cover rounded-md mb-4"
                        />

                        {isConnected ? (
                            <button
                                onClick={() => mintNFT(col.type)}
                                className="px-6 py-2 rounded-full text-brown border border-brown hover:bg-yellow-300 transition mint-button cursor-pointer"
                            >
                                Mint · 0.0001 ETH
                            </button>
                        ) : (
                            <button
                                onClick={() => connect({ connector: injected() })}
                                className="px-6 py-2 rounded-full bg-brown text-yellow-200 hover:opacity-90 transition cursor-pointer"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-yellow-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">

                        {modalStatus === "pending" && (
                            <div className="flex flex-col items-center">
                                <p className="text-brown font-semibold mb-6">
                                    Minting your NFT…
                                </p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 rounded-full bg-brown text-yellow-200 hover:opacity-90 transition cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {modalStatus !== "pending" && (
                            <>
                                <p className="text-brown text-lg font-semibold mb-6">
                                    {modalMessage}
                                </p>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 rounded-full bg-brown text-yellow-200 hover:opacity-90 transition cursor-pointer"
                                >
                                    Close
                                </button>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
