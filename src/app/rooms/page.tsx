"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomCard from "@/components/rooms/RoomCard";
import { rooms } from "@/lib/data";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown } from "lucide-react";

const CATEGORIES = ["All", "Classic", "Deluxe", "Suite", "Villa", "Penthouse"];

const SORT_OPTIONS = [
  { label: "Recommended",        value: "recommended" },
  { label: "Price: Low → High",  value: "price_asc"   },
  { label: "Price: High → Low",  value: "price_desc"  },
  { label: "Best Rated",         value: "rating"      },
];

export default function RoomsPage() {
  const [category, setCategory]     = useState("All");
  const [sort, setSort]             = useState("recommended");
  const [layout, setLayout]         = useState<"grid" | "list">("grid");
  const [priceMax, setPriceMax]     = useState(2000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = [...rooms];
    if (category !== "All") r = r.filter(x => x.category === category);
    r = r.filter(x => x.price <= priceMax);
    if (sort === "price_asc")  r.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") r.sort((a, b) => b.price - a.price);
    if (sort === "rating")     r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, sort, priceMax]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50">

        {/* ── Dark page header — same pattern as every other page ── */}
        <div className="bg-zinc-950 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-10">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Browse
            </p>
            <h1 className="text-white text-4xl font-bold mb-2">
              Rooms & Suites
            </h1>
            <p className="text-zinc-400 text-sm">
              {rooms.length} room types available · All rates include free Wi-Fi and daily housekeeping
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

          {/* ── Filter bar ───────────────────────────────────────── */}
          <div className="bg-white border border-zinc-200 rounded-sm p-3 mb-6 flex flex-wrap items-center gap-3">

            {/* Category pills */}
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 transition-colors font-medium ${
                    category === cat
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs px-3 py-1.5 pr-7 outline-none cursor-pointer hover:border-zinc-300 transition-colors"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setFiltersOpen(o => !o)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border transition-colors ${
                  filtersOpen
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                <SlidersHorizontal size={12} />
                Filter
              </button>

              {/* Layout toggle */}
              <div className="flex border border-zinc-200 overflow-hidden">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-1.5 transition-colors ${layout === "grid" ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-700"}`}
                >
                  <Grid3X3 size={13} />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-1.5 border-l border-zinc-200 transition-colors ${layout === "list" ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-700"}`}
                >
                  <List size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Expanded price filter ─────────────────────────────── */}
          {filtersOpen && (
            <div className="bg-white border border-zinc-200 rounded-sm p-5 mb-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-zinc-900">Price Filter</span>
                <button onClick={() => setFiltersOpen(false)}>
                  <X size={15} className="text-zinc-400 hover:text-zinc-700" />
                </button>
              </div>
              <div className="max-w-sm">
                <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2 block">
                  Max price per night:{" "}
                  <span className="text-indigo-600 font-semibold">
                    ₹{(priceMax * 83).toLocaleString("en-IN")}
                  </span>
                </label>
                <input
                  type="range" min={100} max={2000} step={50}
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full accent-zinc-900"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>₹8,300</span>
                  <span>₹1,66,000</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Count + clear ─────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-zinc-500">
              Showing <span className="font-semibold text-zinc-900">{filtered.length}</span> of{" "}
              <span className="font-semibold text-zinc-900">{rooms.length}</span> rooms
            </p>
            {(category !== "All" || priceMax < 2000) && (
              <button
                onClick={() => { setCategory("All"); setPriceMax(2000); }}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-500 transition-colors"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* ── Room grid / list ──────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-sm flex flex-col items-center justify-center py-20 gap-3 text-center">
              <p className="font-medium text-zinc-900">No rooms match your filters.</p>
              <button
                onClick={() => { setCategory("All"); setPriceMax(2000); }}
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : layout === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(room => (
                <RoomCard key={room.id} room={room} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(room => (
                <RoomCard key={room.id} room={room} layout="list" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
