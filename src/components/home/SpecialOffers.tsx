import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

const offers = [
  { code: "EARLY20", title: "Early Bird — 20% Off", desc: "Book 14+ days in advance and save 20% on any room.", validity: "Valid till 31 Mar 2025" },
  { code: "WEEKEND15", title: "Weekend Getaway", desc: "Stay Fri–Sun and receive 15% off on all room types.", validity: "Every weekend" },
  { code: "LONGSTAY", title: "Stay 3, Pay 2", desc: "Book 3 nights — the cheapest night is on us.", validity: "Ongoing" },
];

export default function SpecialOffers() {
  return (
    <section className="section-pad bg-white border-b border-zinc-200" id="offers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Deals</p>
          <h2 className="text-3xl font-bold text-zinc-900">Special Offers</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {offers.map(o => (
            <div key={o.code} className="relative overflow-hidden bg-zinc-950 rounded-xl border border-white/[0.06] p-6 flex flex-col gap-4 group">
              {/* Grid pattern inside card */}
              <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none rounded-xl" />
              {/* Subtle glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="relative z-10 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Tag size={14} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">Limited Offer</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg leading-snug">{o.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{o.desc}</p>
                </div>
                <p className="text-zinc-600 text-xs mt-auto">{o.validity}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <code className="font-mono text-indigo-400 text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-md tracking-widest">
                  {o.code}
                </code>
                <Link href="/booking" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                  Book <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
