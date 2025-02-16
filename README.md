# Escrow App

A decentralized escrow system built with Next.js and Smart Contracts.

## Features

- Secure escrow system for digital transactions
- Wallet integration with RainbowKit
- Product listing and management
- Smart contract integration for secure payments
- User-friendly marketplace interface
- Seller dashboard for product management

## Tech Stack

- Next.js 14
- TypeScript
- Material UI
- RainbowKit & Wagmi
- Ethers.js
- Supabase

## Getting Started

1. Install dependencies:
```bash
npm install

2. Run the development server:
```bash
npm run dev
 ```

3. Open http://localhost:3000 with your browser
## Smart Contract Integration
The app uses smart contracts for:

- Secure payment holding
- Transaction verification
- Automated fund release
- Dispute resolution
## Environment Setup
Create a .env.local file with:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address