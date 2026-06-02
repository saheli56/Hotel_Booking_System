import SearchWidget from "./SearchWidget";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Real hotel photo — dark overlay on top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              105deg,
              rgba(9,9,11,0.82) 0%,
              rgba(9,9,11,0.60) 55%,
              rgba(9,9,11,0.30) 100%
            ),
            url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=90&auto=format&fit=crop')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />

      {/* Very subtle bottom fade so search widget doesn't float */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(9,9,11,0.65) 0%, transparent 100%)" }}
      />

      {/* Content — left-aligned, not centered */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-xl flex flex-col gap-7">

          {/* Eyebrow — no badges, no dots, just text */}
          <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase font-medium">
            Nova Hotel & Suites · New Delhi
          </p>

          {/* Headline — confident, no gradient, no shimmer */}
          <h1
            className="text-white font-bold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)" }}
          >
            A comfortable stay,
            <br />
            seamlessly booked.
          </h1>

          {/* Subtext — one line, factual */}
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Browse 100+ rooms, pick your dates, and confirm in minutes — no calls, no queues.
          </p>

          {/* CTAs — two, flat, no drop shadows, no pill shapes */}
          <div className="flex items-center gap-3">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-5 py-2.5 hover:bg-zinc-100 transition-colors"
            >
              Browse Rooms
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm px-1 py-2.5 border-b border-zinc-600 hover:border-zinc-400 transition-colors"
            >
              About the hotel
            </Link>
          </div>

          {/* One line of factual trust — no icons, no badges */}
          <p className="text-zinc-500 text-xs">
            4.8 ★ rated &nbsp;·&nbsp; Instant confirmation &nbsp;·&nbsp; Free cancellation
          </p>
        </div>
      </div>

      {/* Search widget — anchored at the bottom of the hero */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 lg:px-8 pb-0 -mb-6">
        <SearchWidget dark />
      </div>

      <div className="h-8 relative z-0" />
    </section>
  );
}
