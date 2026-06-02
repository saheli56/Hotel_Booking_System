"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-16">
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 glow-indigo pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto px-4 text-center flex flex-col items-center gap-5">
        <h2 className="text-2xl font-bold text-white">Get Exclusive Deals</h2>
        <p className="text-zinc-500 text-sm">Subscribe for early access to offers and seasonal discounts.</p>
        {done ? (
          <div className="badge-indigo text-sm">✓ Subscribed — check your inbox soon!</div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }} className="flex w-full gap-2">
            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-sm px-4 py-2.5 rounded-lg outline-none focus:border-indigo-500 transition-colors" />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap">
              Subscribe <ArrowRight size={13} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
