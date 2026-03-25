'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MintButton = dynamic(() => import('@/components/MintButton'), { ssr: false });

const CONTRACT_ADDRESS = '0x016024DA4bDC06eC299770e45053AADD1a8b4ab2';

const FEATURES = [
  {
    icon: '⚔',
    title: 'WARRIOR GENESIS',
    desc: 'Legendary warrior souls forever immortalized on Polygon blockchain.',
  },
  {
    icon: '👑',
    title: 'SOVEREIGN RIGHTS',
    desc: 'Holders govern the treasury. Your token, your vote.',
  },
  {
    icon: '💎',
    title: 'TRUE OWNERSHIP',
    desc: 'ERC-721 standard. No custodians. No intermediaries.',
  },
  {
    icon: '🔥',
    title: 'EXCLUSIVE ACCESS',
    desc: 'Genesis holders unlock private council & future drops.',
  },
];

const FAQS = [
  {
    q: 'What is AUREUS GENESIS?',
    a: 'A collection of unique warrior NFTs minted on Polygon. Genesis holders are the founding council of the AUREUS ecosystem.',
  },
  {
    q: 'How many can I mint?',
    a: 'Up to 10 per transaction, max 100 per wallet. Be early — supply is strictly limited.',
  },
  {
    q: 'What wallet do I need?',
    a: 'MetaMask or any EIP-1193 compatible wallet connected to Polygon Mainnet (Chain ID 137).',
  },
  {
    q: 'What is the mint price?',
    a: 'Price is set on-chain. Connect your wallet to see the live price per NFT.',
  },
  {
    q: 'Where can I verify the contract?',
    a: 'The contract is deployed and verifiable on PolygonScan. Link is at the bottom of this page.',
  },
];

export default function MintPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sticky nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gold/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-cinzel text-gold text-lg tracking-widest hover:text-gold/80 transition-colors">
            AUREUS
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm font-cinzel tracking-wider transition-colors">
              HOME
            </Link>
            <a
              href={`https://polygonscan.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold text-sm font-cinzel tracking-wider transition-colors"
            >
              CONTRACT
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/ChatGPT Image 10 мар. 2026 г., 22_11_29.png"
            alt="The Monetary Mint"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-8 bg-black/40">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-cinzel tracking-widest text-gold/80">LIVE — MINT NOW</span>
          </div>

          <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white mb-3 leading-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            AUREUS
          </h1>
          <h2 className="font-cinzel text-2xl md:text-3xl text-gold tracking-[0.3em] mb-12">
            GENESIS
          </h2>

          <div className="glass-card rounded-2xl p-8 md:p-10 border border-gold/20 bg-black/40">
            <MintButton />
          </div>

          <div className="mt-8">
            <p className="text-xs text-gray-600 font-cinzel tracking-widest mb-2">VERIFIED CONTRACT</p>
            <a
              href={`https://polygonscan.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/40 hover:text-gold/70 text-xs font-mono transition-colors break-all"
            >
              {CONTRACT_ADDRESS}
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold font-cinzel text-xs tracking-[0.4em] mb-3">WHY GENESIS</p>
            <h2 className="font-cinzel text-3xl md:text-4xl text-white">Built for the Bold</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-cinzel text-gold text-sm tracking-widest mb-2">{f.title}</h3>
                <p className="text-gray-400 font-playfair italic text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 px-4 border-y border-gold/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            { label: 'NETWORK', value: 'POLYGON' },
            { label: 'STANDARD', value: 'ERC-721' },
            { label: 'STATUS', value: 'LIVE' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-cinzel text-2xl md:text-3xl text-white mb-1">{s.value}</p>
              <p className="font-cinzel text-xs text-gold/60 tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold font-cinzel text-xs tracking-[0.4em] mb-3">KNOWLEDGE</p>
            <h2 className="font-cinzel text-3xl md:text-4xl text-white">Frequently Asked</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-xl border border-gold/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between group"
                >
                  <span className="font-cinzel text-sm text-white group-hover:text-gold transition-colors">
                    {faq.q}
                  </span>
                  <span className={`text-gold transition-transform duration-300 ${
                    openFaq === i ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 font-playfair italic text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-16 h-px bg-gold/40 mx-auto mb-12" />
          <h2 className="font-cinzel text-2xl md:text-3xl text-white mb-10">Claim Your Place</h2>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-block border border-gold text-gold font-cinzel text-sm tracking-widest px-10 py-4 hover:bg-gold hover:text-black transition-all duration-300"
          >
            MINT NOW ↑
          </a>
          <div className="mt-16 pt-8 border-t border-gold/10">
            <p className="text-gray-700 text-xs font-cinzel tracking-wider">
              AUREUS GENESIS © 2025 · Polygon Mainnet
            </p>
            <a
              href={`https://polygonscan.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gold/60 text-xs font-mono transition-colors mt-2 inline-block"
            >
              {CONTRACT_ADDRESS}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
