💀 SkullMarketplace

SkullMarketplace is a decentralized NFT marketplace built on Ethereum.

It allows users to mint NFTs and interact directly with smart contracts through a modern Web3 frontend.

All marketplace logic is executed on-chain via Solidity smart contracts.

This project was built to practice full-stack Web3 development: NFT standards, marketplace mechanics, contract architecture, and real-time frontend synchronization.

🛠 Tech Stack

- Solidity — Smart Contracts
- Hardhat — Development & Testing
- Ethereum (Sepolia) — Testnet Deployment
- React + Vite + TypeScript — Frontend
- ethers.js — Blockchain interaction
- wagmi — React hooks for Ethereum
- RainbowKit — Wallet connection
- TailwindCSS — Styling

⚙️ Features

- NFT minting (ERC-721)
- See NFT bought list
- Ownership validation
- Event-driven UI updates
- Real-time contract state synchronization
- Wallet connection via RainbowKit
- Deployed and accessible via web frontend

📜 Smart Contracts

ERC-721 NFT Contract

- Minting functionality
- Token ownership tracking
- Metadata URI management

Marketplace Contract

Handles:

- NFT listing
- Price management
- Secure purchase execution
- Transfer of ownership
- Seller payment distribution
- Event emission for frontend updates

All transactions are executed fully on-chain.

🏗 Architecture Overview

- User connects wallet
- NFT is minted via ERC-721 contract
- User approves Marketplace contract
- Frontend listens to emitted events and updates UI

🚀 Getting Started

1️⃣ Clone the repository
  - git clone https://github.com/yourusername/skullmarketplace.git
  - cd frontend

2️⃣ Install dependencies
  - npm install

3️⃣ Run locally
  - npm run dev

Make sure your wallet is connected to the correct network (e.g. Sepolia).

🧪 Network

Currently deployed on:

Ethereum Sepolia Testnet

You’ll need Sepolia ETH to mint NFTs

📌 Purpose

This project demonstrates:

- ERC-721 standard implementation
- Marketplace contract architecture
- NFT approval flow
- On-chain asset transfers
- Secure ETH handling
- Event-driven Web3 frontend architecture
