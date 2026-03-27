# 💎 Vaultverse — Web3 NFT Marketplace

A decentralized NFT marketplace built with **Solidity**, **Foundry**, **React + TypeScript**, and **ethers.js**. Mint, list, buy, and manage NFTs seamlessly on the Ethereum blockchain.

---

## 🏗 Project Structure

```
vaultverse/
├── frontend/                    # React + Vite + TypeScript frontend
│   ├── public/                  # Static assets (NFT artwork images)
│   └── src/
│       ├── App.tsx              # Main application (Explore, Create, Dashboard)
│       ├── index.css            # Glassmorphism dark theme styling
│       └── global.d.ts          # TypeScript globals (window.ethereum)
│
├── smart_contracts/             # Solidity smart contracts (Foundry)
│   ├── src/
│   │   ├── VaultverseNFT.sol    # ERC-721 NFT contract (mint with URI)
│   │   └── VaultverseMarket.sol # Marketplace (list, buy, cancel)
│   ├── lib/                     # OpenZeppelin + forge-std dependencies
│   └── foundry.toml             # Foundry config with OZ remappings
│
├── app/                         # Python FastAPI backend (API layer)
├── requirements.txt             # Python dependencies (includes web3)
└── README.md
```

---

## ⚡ Smart Contracts

### VaultverseNFT.sol

- **Standard**: ERC-721 with URI Storage (OpenZeppelin v5)
- **Features**: Anyone can mint an NFT with a metadata URI
- **Events**: `NFTMinted(tokenId, tokenURI, owner)`

### VaultverseMarket.sol

- **List**: Approve the marketplace and list your NFT at a price
- **Buy**: Purchase listed NFTs with ETH (atomic swap)
- **Cancel**: Delist your own NFTs at any time
- **Security**: Uses `ReentrancyGuard` to prevent reentrancy attacks

---

## 🎨 Frontend Features

| Feature | Description |
|---------|-------------|
| **Explore** | Browse trending NFTs with animated card grid |
| **Create** | Upload artwork, set name/description/price, and mint via MetaMask |
| **Dashboard** | View your minted NFTs with floor price and buyer count |
| **Wallet** | Connect MetaMask with one click (ethers.js BrowserProvider) |
| **Design** | Premium glassmorphism dark theme with Framer Motion animations |

---

## 🚀 Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Foundry](https://getfoundry.sh/) (for smart contracts)
- [MetaMask](https://metamask.io/) browser extension
- Python 3.10+ (optional, for backend)

### 1. Smart Contracts

```bash
cd smart_contracts
forge build          # Compile contracts
forge test           # Run tests
```

### 2. Frontend

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:5173
```

### 3. Backend (Optional)

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1       # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contracts** | Solidity ^0.8.20, OpenZeppelin v5, Foundry |
| **Frontend** | React, TypeScript, Vite, ethers.js v6, Framer Motion, Lucide Icons |
| **Backend** | Python, FastAPI, web3.py |
| **Blockchain** | Ethereum (EVM-compatible) |

---

## 📜 License

MIT
