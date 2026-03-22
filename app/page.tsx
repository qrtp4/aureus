import Link from 'next/link';
import MintButton from '@/components/MintButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-[#C9A84C] tracking-widest mb-4">AUREUS</h1>
      <p className="text-xl text-gray-400 mb-12">The Palace of Power</p>
      <div className="mb-12">
        <MintButton />
      </div>
      <nav className="flex gap-8">
        <Link href="/media" className="text-[#C9A84C] border border-[#C9A84C] px-6 py-3 hover:bg-[#C9A84C] hover:text-black transition">
          Media Floor
        </Link>
        <Link href="/command" className="text-[#C9A84C] border border-[#C9A84C] px-6 py-3 hover:bg-[#C9A84C] hover:text-black transition">
          Command Center
        </Link>
      </nav>
    </main>
  );
}
