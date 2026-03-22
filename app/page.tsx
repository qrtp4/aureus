import Link from 'next/link';
import WarriorGuide from '@/components/WarriorGuide';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark flex flex-col items-center pt-24 px-4">
      {/* Decorative top ornaments */}
      <div className="w-full max-w-4xl flex justify-between opacity-30 mb-8">
        <span className="text-gold font-cinzel">SPQR</span>
        <span className="text-gold font-cinzel">AUREUS</span>
      </div>

      {/* Main Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-7xl md:text-9xl font-cinzel font-black text-gradient-gold glow-gold tracking-widest mb-4">
          AUREUS
        </h1>
        <div className="ornament-divider max-w-md mx-auto mb-6">
          <span className="text-gold text-2xl">✦</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-cinzel text-gold-light tracking-[0.5em] uppercase opacity-80">
          Solomon's Palace
        </h2>
      </div>

      {/* The Warrior / Guide Section */}
      <div className="w-full max-w-4xl mb-24">
        <WarriorGuide />
      </div>

      {/* Navigation Gates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-32">
        <Link href="/artifacts" className="group">
          <div className="glass-card p-8 rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-500 text-center door-pulse">
            <h3 className="text-xl font-cinzel text-gold mb-4 group-hover:glow-gold">The Corridor</h3>
            <p className="text-gray-400 font-playfair italic">31 Doors. 31 Artifacts.</p>
            <div className="mt-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity">Enter Gate →</div>
          </div>
        </Link>

        <Link href="/mint" className="group">
          <div className="glass-card p-8 rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-500 text-center">
            <h3 className="text-xl font-cinzel text-gold mb-4">The Mint</h3>
            <p className="text-gray-400 font-playfair italic">The Imperial Treasury.</p>
            <div className="mt-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity">Claim Wealth →</div>
          </div>
        </Link>

        <Link href="/command" className="group">
          <div className="glass-card p-8 rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-500 text-center">
            <h3 className="text-xl font-cinzel text-gold mb-4">Command Center</h3>
            <p className="text-gray-400 font-playfair italic">Manage the Empire.</p>
            <div className="mt-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity">Command →</div>
          </div>
        </Link>
      </div>

      {/* Bottom info */}
      <div className="text-center pb-24 opacity-40">
        <p className="font-cinzel text-sm tracking-widest">AUREUS GENESIS © 2026</p>
      </div>
    </main>
  );
}
