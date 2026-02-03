import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Marketplace from "./components/marketplace/Marketplace";
import Product from "./components/product/Product";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <nav className="relative p-6 flex items-center border-b border-yellow-200">

        {/* ---------- LEFT ---------- */}
        <div className="flex items-center gap-3">
          <img
            src="/SKULLKID.png"
            alt="Logo"
            className="w-12 h-12 md:w-15 md:h-15 rounded-full border border-yellow-200"
          />

          <span className="font-bold text-lg md:text-xl">
            SkullMarketplace
          </span>

        </div>

        {/* ---------- CENTER LINKS (desktop only) ---------- */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12">
          <Link to="/" className="font-bold text-lg">
            Collections
          </Link>
          <Link to="/mynfts" className="font-bold text-lg">
            My NFTs
          </Link>
        </div>

        {/* ---------- RIGHT (desktop wallet) ---------- */}
        <div className="ml-auto hidden md:block">
          <CustomConnectButton />
        </div>

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto md:hidden text-2xl border border-yellow-200 rounded-full px-4 py-1 pb-2"
        >
          ☰
        </button>

        {/* ---------- MOBILE DROPDOWN ---------- */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-56 bg-brown border border-yellow-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-3">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-center"
            >
              Collections
            </Link>

            <Link
              to="/mynfts"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-center"
            >
              My NFTs
            </Link>

            <div className="border-t pt-3">
              <CustomConnectButton />
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/mynfts" element={<Marketplace />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

/* ---------- WALLET BUTTON ---------- */

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        mounted,
      }) => {
        if (!mounted) return null;

        const connected = account && chain;

        return (
          <>
            {!connected && (
              <button
                onClick={openConnectModal}
                className="wallet-button w-full px-4 py-2 rounded-full bg-yellow-200 text-brown font-semibold transition cursor-pointer"
              >
                Connect Wallet
              </button>
            )}

            {connected && (
              <button
                onClick={openAccountModal}
                className="wallet-button w-full px-4 py-2 rounded-full border border-yellow-200 text-yellow-200 hover:bg-yellow-200 transition cursor-pointer"
              >
                {account.displayName}
              </button>
            )}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
