'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = '0x016024DA4bDC06eC299770e45053AADD1a8b4ab2';

const ABI = [
  'function mint(uint256 amount) payable',
  'function mintPrice() view returns (uint256)',
  'function saleActive() view returns (bool)',
  'function maxPerTx() view returns (uint256)',
  'function maxPerWallet() view returns (uint256)',
  'function totalSupply() view returns (uint256)',
];

const POLYGON_CHAIN_ID = '0x89';

export default function MintButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Install MetaMask');
        return;
      }
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== POLYGON_CHAIN_ID) {
        alert('Switch MetaMask to Polygon Mainnet');
        return;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0] ?? null);
    } catch (e: any) {
      alert(e?.message || 'Connection error');
    }
  };

  const mint = async () => {
    try {
      if (!window.ethereum) {
        alert('Install MetaMask');
        return;
      }
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== POLYGON_CHAIN_ID) {
        alert('Switch MetaMask to Polygon Mainnet');
        return;
      }
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      console.log('CONTRACT:', CONTRACT_ADDRESS);

      const code = await provider.getCode(CONTRACT_ADDRESS);
      console.log('BYTECODE:', code);

      const isSaleActive = await contract.saleActive();
      console.log('saleActive:', isSaleActive);

      if (!isSaleActive) {
        alert('Sale is not active');
        return;
      }

      const quantity = 1;
      const price = await contract.mintPrice();
      console.log('price:', price.toString());

      const totalPrice = price * BigInt(quantity);

      const tx = await contract.mint(quantity, { value: totalPrice });
      await tx.wait();
      alert('Mint successful!');
    } catch (e: any) {
      console.error('FULL ERROR:', e);
      const msg =
        e?.reason ||
        e?.data?.message ||
        e?.shortMessage ||
        e?.message ||
        'Mint error';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    const onAccounts = (accs: string[]) => setAccount(accs[0] ?? null);
    const onChain = () => window.location.reload();
    window.ethereum.on('accountsChanged', onAccounts);
    window.ethereum.on('chainChanged', onChain);
    return () => {
      window.ethereum.removeListener('accountsChanged', onAccounts);
      window.ethereum.removeListener('chainChanged', onChain);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-yellow-500 px-6 py-3 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={mint}
          disabled={loading}
          className="bg-green-600 px-6 py-3 rounded disabled:opacity-60"
        >
          {loading ? 'Minting...' : 'Mint NFT'}
        </button>
      )}
    </div>
  );
}
