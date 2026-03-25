'use client';

import { useCallback, useEffect, useState } from 'react';
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
  const [mintPrice, setMintPrice] = useState<bigint | null>(null);
  const [saleActive, setSaleActive] = useState(false);
  const [maxPerTx, setMaxPerTx] = useState(10);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'confirming' | 'success' | 'error'>('idle');

  const getContract = useCallback(async (withSigner = false) => {
    if (!window.ethereum) throw new Error('No wallet detected');
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (withSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    }
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  }, []);

  const loadContractData = useCallback(async () => {
    try {
      const contract = await getContract();
      const [price, active, maxTx, supply] = await Promise.all([
        contract.mintPrice(),
        contract.saleActive(),
        contract.maxPerTx(),
        contract.totalSupply(),
      ]);
      setMintPrice(price);
      setSaleActive(active);
      setMaxPerTx(Number(maxTx));
      setTotalSupply(Number(supply));
    } catch (e) {
      // silent — wallet might not be connected yet
    }
  }, [getContract]);

  useEffect(() => {
    loadContractData();
  }, [loadContractData]);

  const switchToPolygon = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_CHAIN_ID }],
    }).catch(async (err: any) => {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: POLYGON_CHAIN_ID,
            chainName: 'Polygon Mainnet',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com'],
          }],
        });
      }
    });
  };

  const connect = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask to mint.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await switchToPolygon();
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await loadContractData();
    } catch (e: any) {
      setError(e.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const mint = async () => {
    if (!account || mintPrice === null) return;
    setLoading(true);
    setError(null);
    setStatus('confirming');
    setTxHash(null);
    try {
      await switchToPolygon();
      const contract = await getContract(true);
      const totalCost = mintPrice * BigInt(quantity);
      const tx = await contract.mint(quantity, { value: totalCost });
      setTxHash(tx.hash);
      await tx.wait();
      setStatus('success');
      await loadContractData();
    } catch (e: any) {
      const msg = e?.reason || e?.message || 'Transaction failed';
      setError(msg.length > 120 ? msg.slice(0, 120) + '...' : msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const totalCostEth = mintPrice !== null
    ? ethers.formatEther(mintPrice * BigInt(quantity))
    : null;

  const pricePerNft = mintPrice !== null
    ? ethers.formatEther(mintPrice)
    : null;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Sale status */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          saleActive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
        }`} />
        <span className="font-cinzel text-xs tracking-widest text-gray-400">
          {saleActive ? 'SALE ACTIVE' : 'SALE INACTIVE'}
        </span>
        {totalSupply !== null && (
          <span className="font-cinzel text-xs text-gold/40 ml-2">
            {totalSupply} MINTED
          </span>
        )}
      </div>

      {!account ? (
        /* Connect wallet */
        <button
          onClick={connect}
          disabled={loading}
          className="w-full bg-gold text-black font-cinzel font-bold text-sm tracking-widest py-4 px-8 hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'CONNECTING...' : 'CONNECT WALLET'}
        </button>
      ) : (
        <div className="space-y-5">
          {/* Wallet info */}
          <div className="flex items-center justify-between px-1">
            <span className="font-cinzel text-xs text-gray-600 tracking-widest">CONNECTED</span>
            <span className="font-mono text-xs text-gold/50">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>

          {/* Price info */}
          {pricePerNft && (
            <div className="flex items-center justify-between px-1">
              <span className="font-cinzel text-xs text-gray-600 tracking-widest">PRICE / NFT</span>
              <span className="font-cinzel text-sm text-white">{pricePerNft} MATIC</span>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-cinzel text-xs text-gray-600 tracking-widest">QUANTITY</span>
              <span className="font-cinzel text-xs text-gray-600">MAX {maxPerTx}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={loading}
                className="w-10 h-10 border border-gold/30 text-gold font-cinzel text-xl hover:border-gold hover:bg-gold/10 transition-all disabled:opacity-30"
              >
                −
              </button>
              <div className="flex-1 text-center font-cinzel text-2xl text-white">{quantity}</div>
              <button
                onClick={() => setQuantity(Math.min(maxPerTx, quantity + 1))}
                disabled={loading}
                className="w-10 h-10 border border-gold/30 text-gold font-cinzel text-xl hover:border-gold hover:bg-gold/10 transition-all disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* Total cost */}
          {totalCostEth && (
            <div className="flex items-center justify-between px-1 py-3 border-t border-b border-gold/10">
              <span className="font-cinzel text-xs text-gray-400 tracking-widest">TOTAL</span>
              <span className="font-cinzel text-lg text-gold">{totalCostEth} MATIC</span>
            </div>
          )}

          {/* Mint button */}
          <button
            onClick={mint}
            disabled={loading || !saleActive}
            className="w-full bg-gold text-black font-cinzel font-bold text-sm tracking-widest py-4 px-8 hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {status === 'confirming' ? 'MINTING...' : 'LOADING...'}
              </span>
            ) : saleActive ? (
              `MINT ${quantity} NFT${quantity > 1 ? 'S' : ''}`
            ) : (
              'SALE NOT ACTIVE'
            )}
          </button>
        </div>
      )}

      {/* Success */}
      {status === 'success' && txHash && (
        <div className="mt-5 p-4 border border-green-500/30 bg-green-500/5 rounded">
          <p className="font-cinzel text-green-400 text-xs tracking-widest mb-2">MINT SUCCESSFUL</p>
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-green-400/60 hover:text-green-400 transition-colors break-all"
          >
            View on PolygonScan →
          </a>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 border border-red-500/30 bg-red-500/5 rounded">
          <p className="text-red-400 text-xs font-cinzel tracking-wide">{error}</p>
        </div>
      )}
    </div>
  );
}
