import Link from 'next/link';

export default function MediaFloor() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-[#C9A84C] mb-4">Media Floor</h1>
      <p className="text-gray-400 mb-8">Content empire — coming soon</p>
      <Link href="/" className="text-[#C9A84C] underline hover:no-underline">
        ← Back to Solomon Palace
      </Link>
    </main>
  );
}
