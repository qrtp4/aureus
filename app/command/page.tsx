import Link from 'next/link';

const cards = [
  { title: 'Analytics', desc: 'Track your growth' },
  { title: 'Content', desc: 'Manage your media' },
  { title: 'Audience', desc: 'Know your people' },
  { title: 'Revenue', desc: 'Monitor income streams' },
];

export default function CommandCenter() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-12">
      <h1 className="text-5xl font-bold text-[#C9A84C] mb-2">Command Center</h1>
      <p className="text-gray-400 mb-10">Your empire dashboard</p>
      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        {cards.map((card) => (
          <div key={card.title} className="border border-[#C9A84C]/30 p-6 hover:border-[#C9A84C] transition-all">
            <h2 className="text-[#C9A84C] text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-400 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
      <Link href="/" className="inline-block mt-10 text-[#C9A84C] underline hover:no-underline">
        ← Back to Solomon Palace
      </Link>
    </main>
  );
}
