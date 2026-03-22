'use client';

import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window { ethereum?: any; }
}

const CONTRACT_ADDRESS = '0x016024DA4bDC06eC299770e45053AADD1a8b4ab2';
const POLYGON_CHAIN_ID = '0x89';
const ABI = [
  'function mint(uint256 amount) payable',
  'function mintPrice() view returns (uint256)',
  'function saleActive() view returns (bool)',
  'function maxPerTx() view returns (uint256)',
  'function maxPerWallet() view returns (uint256)',
  'function totalSupply() view returns (uint256)',
];

export default function MintButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<bigint | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [saleActive, setSaleActive] = useState<boolean | null>(null);
  const [maxPerTx, setMaxPerTx] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loadContractData = useCallback(async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const [p, ts, sa, mpt] = await Promise.all([
        contract.mintPrice(),
        contract.totalSupply(),
        contract.saleActive(),
        contract.maxPerTx(),
      ]);
      setPrice(p);
      setTotalSupply(Number(ts));
      setSaleActive(sa);
      setMaxPerTx(Number(mpt));
    } catch {}
  }, []);

  useEffect(() => {
    loadContractData();
  }, [loadContractData]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) { setError('MetaMask not installed'); return; }
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== POLYGON_CHAIN_ID) { setError('Switch MetaMask to Polygon Mainnet'); return; }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0] ?? null);
      setError(null);
      await loadContractData();
    } catch (e: any) { setError(e?.message || 'Connection error'); }
  };

  const mint = async () => {
    try {
      if (!window.ethereum) { setError('MetaMask not installed'); return; }
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== POLYGON_CHAIN_ID) { setError('Switch to Polygon Mainnet'); return; }
      setLoading(true); setError(null); setSuccess(false);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const currentPrice = await contract.mintPrice();
      const totalCost = currentPrice * BigInt(quantity);
      const tx = await contract.mint(quantity, { value: totalCost });
      await tx.wait();
      setSuccess(true);
      await loadContractData();
    } catch (e: any) {
      const msg = e?.reason || e?.shortMessage || e?.message || 'Mint error';
      setError(msg);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    const onAccounts = (a: string[]) => setAccount(a[0] ?? null);
    const onChain = () => window.location.reload();
    window.ethereum.on('accountsChanged', onAccounts);
    window.ethereum.on('chainChanged', onChain);
    return () => {
      window.ethereum.removeListener('accountsChanged', onAccounts);
      window.ethereum.removeListener('chainChanged', onChain);
    };
  }, []);

  const priceInPol = price ? parseFloat(ethers.formatEther(price)).toFixed(4) : null;
  const totalCostInPol = price ? parseFloat(ethers.formatEther(price * BigInt(quantity))).toFixed(4) : null;
  const MAX_SUPPLY = 100;
  const remaining = totalSupply !== null ? MAX_SUPPLY - totalSupply : null;
  const progressPct = totalSupply !== null ? (totalSupply / MAX_SUPPLY) * 100 : 0;

  return (
    <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl text-gradient-gold mb-1">The Monetary Mint</h2>
        <p className="text-gray-500 text-sm font-playfair italic">AUREUS GENESIS Collection</p>
      </div>

      {/* Supply Progress */}
      {totalSupply !== null && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-cinzel text-gray-400 mb-2">
            <span>MINTED</span>
            <span>{totalSupply} / {MAX_SUPPLY}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className="progress-gold h-2 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }}></div>
          </div>
          {remaining !== null && (
            <p className="text-right text-xs text-gold mt-1 font-cinzel">{remaining} remaining</p>
          )}
        </div>
      )}

      {/* Price Info */}
      {priceInPol && (
        <div className="flex justify-between items-center mb-6 py-3 border-t border-b border-gold/10">
          <span className="text-gray-400 font-cinzel text-xs tracking-widest">PRICE PER NFT</span>
          <span className="text-gold font-cinzel font-bold">{priceInPol} POL</span>
        </div>
      )}

      {/* Quantity Selector */}
      {account && (
        <div className="mb-6">
          <p className="text-xs font-cinzel text-gray-400 tracking-widest mb-3">QUANTITY</p>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition-all font-cinzel text-xl"
            >-</button>
            <span className="text-3xl font-cinzel text-white w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(maxPerTx, q + 1))}
              className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition-all font-cinzel text-xl"
            >+</button>
          </div>
          {totalCostInPol && (
            <p className="text-center text-gold/60 text-sm font-cinzel mt-2">Total: {totalCostInPol} POL</p>
          )}
        </div>
      )}

      {/* Sale Status */}
      {saleActive === false && (
        <div className="text-center text-yellow-500/80 text-sm font-cinzel mb-4 tracking-widest">
          ⚠ SALE NOT ACTIVE
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-400 text-xs text-center mb-4 font-playfair italic bg-red-900/10 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="text-green-400 text-sm text-center mb-4 font-cinzel tracking-widest bg-green-900/10 rounded-lg p-3">
          ✦ MINT SUCCESSFUL ✦
        </div>
      )}

      {/* Action Button */}
      {!account ? (
        <button onClick={connectWallet} className="btn-gold w-full py-4 rounded-xl text-sm tracking-[0.2em] font-cinzel">
          CONNECT WALLET
        </button>
      ) : (
        <button
          onClick={mint}
          disabled={loading || saleActive === false}
          className="btn-gold w-full py-4 rounded-xl text-sm tracking-[0.2em] font-cinzel disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'MINTING...' : 'MINT NFT'}
        </button>
      )}

      {/* Wallet Address */}
      {account && (
        <p className="text-center text-gray-600 text-xs mt-4 font-cinzel">
          {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
    </div>
  );
}
