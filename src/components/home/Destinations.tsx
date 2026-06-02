"use client";

import Image from "next/image";
import { useRef } from "react";
import { destinations } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Destinations() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="section-pad overflow-hidden" id="destinations">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-xs tracking-[0.25em] text-gold-600 uppercase">Worldwide</span>
            </div>
            <h2
              className="text-4xl lg:text-5xl text-charcoal-900 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              Our Destinations
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-aurea-300 flex items-center justify-center text-warm-500 hover:border-gold-500 hover:text-gold-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-aurea-300 flex items-center justify-center text-warm-500 hover:border-gold-500 hover:text-gold-500 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/rooms?location=${dest.city}`}
            className="group relative shrink-0 w-72 h-96 rounded-2xl overflow-hidden block"
          >
            <Image
              src={dest.image}
              alt={dest.city}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent" />

            {/* Property count badge */}
            <div className="absolute top-4 left-4 glass-dark text-white/80 text-xs tracking-wide px-3 py-1.5 rounded-full border border-white/10">
              {dest.properties} {dest.properties === 1 ? "property" : "properties"}
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
              <span className="text-white/60 text-xs tracking-widest uppercase">{dest.tagline}</span>
              <div className="flex items-end justify-between">
                <div>
                  <h3
                    className="text-white text-2xl leading-tight font-medium"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {dest.city}
                  </h3>
                  <p className="text-white/50 text-sm">{dest.country}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Trailing spacer */}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}
