import Link from 'next/link';

const PILLARS = [
  {
    num: '01',
    title: 'GENESIS NFT',
    desc: '888 warrior tokens minted on Polygon. First come, first sovereign.',
    href: '/mint',
    cta: 'Mint Now',
  },
  {
    num: '02',
    title: 'ON-CHAIN TREASURY',
    desc: 'Every holder governs. Smart contract enforced. No middlemen.',
    href: '#',
    cta: 'Learn More',
  },
  {
    num: '03',
    title: 'THE COUNCIL',
    desc: 'Genesis holders form the founding council. Private access. Real power.',
    href: '#',
    cta: 'Join Council',
  },
];

const TIMELINE = [
  { phase: 'PHASE I', title: 'Genesis Mint', desc: '888 NFTs released. Community forms.', active: true },
  { phase: 'PHASE II', title: 'Treasury Launch', desc: 'On-chain governance activated.', active: false },
  { phase: 'PHASE III', title: 'Expansion', desc: 'Ecosystem grows. New drops. New power.', active: false },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cinzel text-gold text-xl tracking-widest">AUREUS</span>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-gray-400 hover:text-white text-sm font-cinzel tracking-wider transition-colors">ABOUT</a>
            <a href="#roadmap" className="text-gray-400 hover:text-white text-sm font-cinzel tracking-wider transition-colors">ROADMAP</a>
            <Link
              href="/mint"
              className="border border-gold text-gold font-cinzel text-sm tracking-widest px-5 py-2 hover:bg-gold hover:text-black transition-all duration-300"
            >
              MINT
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/4 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gold/40" />
            <span className="font-cinzel text-gold/60 text-xs tracking-[0.5em]">EST. 2025</span>
            <div className="h-px w-16 bg-gold/40" />
          </div>

          <h1 className="font-cinzel font-bold text-6xl md:text-8xl xl:text-9xl text-white leading-none mb-4">
            AUREUS
          </h1>
          <div className="font-cinzel text-gold text-xl md:text-2xl tracking-[0.5em] mb-6">
            GENESIS
          </div>

          <p className="font-playfair italic text-gray-300 text-lg md:text-2xl max-w-xl mx-auto mb-4">
            888 Warriors. One Chain. Eternal Legacy.
          </p>
          <p className="font-cinzel text-gray-600 text-xs tracking-widest mb-14">
            POLYGON MAINNET &nbsp;&middot;&nbsp; ERC-721 &nbsp;&middot;&nbsp; 888 MAX SUPPLY
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mint"
              className="inline-block bg-gold text-black font-cinzel font-bold text-sm tracking-widest px-10 py-4 hover:bg-amber-400 transition-all duration-300"
            >
              MINT YOUR GENESIS NFT
            </Link>
            <a
              href="#about"
              className="inline-block border border-gold/30 text-gold/60 font-cinzel text-sm tracking-widest px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              LEARN MORE
            </a>
          </div>

          {/* Live badge */}
          <div className="mt-12 inline-flex items-center gap-2 border border-gold/20 rounded-full px-5 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-cinzel tracking-widest text-gray-400">MINT IS LIVE &mdash; 888 SPOTS AVAILABLE</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="h-8 w-px bg-gold" />
          <span className="font-cinzel text-gold text-xs tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="about" className="py-32 px-4 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-cinzel text-gold text-xs tracking-[0.5em] mb-3">THE FOUNDATION</p>
            <h2 className="font-cinzel text-4xl md:text-5xl text-white">Three Pillars of Power</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <div
                key={p.num}
                className="glass-card rounded-xl p-8 border border-gold/10 hover:border-gold/40 transition-all duration-500 group flex flex-col"
              >
                <div className="font-cinzel text-gold/30 text-4xl font-bold mb-6 group-hover:text-gold/60 transition-colors">
                  {p.num}
                </div>
                <h3 className="font-cinzel text-white text-sm tracking-widest mb-3">{p.title}</h3>
                <p className="font-playfair italic text-gray-500 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                <Link
                  href={p.href}
                  className="font-cinzel text-gold/50 text-xs tracking-widest hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  {p.cta} <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 px-4 bg-gold/5 border-y border-gold/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: '888', l: 'GENESIS SUPPLY' },
            { v: '0', l: 'TEAM RESERVE' },
            { v: '100%', l: 'ON-CHAIN' },
            { v: '\u221e', l: 'LEGACY' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-cinzel text-3xl md:text-4xl text-gold mb-2">{s.v}</p>
              <p className="font-cinzel text-xs text-gray-600 tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-cinzel text-gold text-xs tracking-[0.5em] mb-3">THE PATH</p>
            <h2 className="font-cinzel text-4xl md:text-5xl text-white">Roadmap</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gold/20" />
            <div className="space-y-12">
              {TIMELINE.map((t, i) => (
                <div key={i} className="relative pl-20">
                  <div
                    className={`absolute left-6 top-1 w-4 h-4 rounded-full border-2 ${
                      t.active
                        ? 'bg-gold border-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                        : 'bg-transparent border-gold/30'
                    }`}
                  />
                  <p className="font-cinzel text-gold/50 text-xs tracking-widest mb-1">{t.phase}</p>
                  <h3 className="font-cinzel text-white text-lg mb-2">{t.title}</h3>
                  <p className="font-playfair italic text-gray-500 text-sm">{t.desc}</p>
                  {t.active && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-cinzel text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      IN PROGRESS
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-4 border-t border-gold/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-gold/40 mx-auto mb-12" />
          <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">Your Seat Awaits</h2>
          <p className="font-playfair italic text-gray-400 text-lg mb-10">
            888 warriors. 888 legacies. The council needs you.
          </p>
          <Link
            href="/mint"
            className="inline-block bg-gold text-black font-cinzel font-bold text-sm tracking-widest px-12 py-5 hover:bg-amber-400 transition-all duration-300"
          >
            CLAIM YOUR GENESIS NFT
          </Link>
          <div className="mt-20 pt-10 border-t border-gold/10 flex flex-col md:flex-row items-center justify-center gap-6 text-xs font-cinzel text-gray-700 tracking-wider">
            <span>AUREUS GENESIS &copy; 2025</span>
            <span className="hidden md:block">&middot;</span>
            <a
              href="https://polygonscan.com/address/0x016024DA4bDC06eC299770e45053AADD1a8b4ab2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/50 transition-colors font-mono"
            >
              0x016024DA4bDC06eC299770e45053AADD1a8b4ab2
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
