"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, Minus, Plus, ChevronDown } from "lucide-react";

const LOCATIONS = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];

export default function SearchWidget({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuests, setShowGuests] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowGuests(false);
        setShowLoc(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (location) p.set("location", location);
    if (checkIn) p.set("checkIn", checkIn);
    if (checkOut) p.set("checkOut", checkOut);
    p.set("adults", String(adults));
    p.set("children", String(children));
    router.push(`/rooms?${p.toString()}`);
  };

  const filtered = LOCATIONS.filter(
    l => !location || l.toLowerCase().includes(location.toLowerCase())
  );

  const wrapCls = dark
    ? "bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl"
    : "bg-white border border-zinc-200 shadow-sm";

  const labelCls  = "text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400";
  const dividerCls = "border-r border-zinc-200/60";

  const inputCls = dark
    ? "text-white [color-scheme:dark]"
    : "text-zinc-900";

  const valueCls = (val: string) =>
    dark
      ? val ? "text-white" : "text-zinc-500"
      : val ? "text-zinc-900" : "text-zinc-400";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className={`${wrapCls} flex flex-col lg:flex-row rounded-none lg:rounded-sm overflow-visible`}>

        {/* Location */}
        <div className={`relative flex-1 min-w-0 ${dividerCls}`}>
          <button
            onClick={() => { setShowLoc(s => !s); setShowGuests(false); }}
            className="w-full text-left px-5 py-4 flex flex-col gap-1 hover:bg-black/5 transition-colors"
          >
            <span className={labelCls}>Location</span>
            <span className={`text-sm font-medium ${valueCls(location)}`}>
              {location || "Select destination"}
            </span>
          </button>

          {showLoc && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-200 shadow-xl z-50 animate-scale-in">
              <div className="p-2.5 border-b border-zinc-100">
                <input
                  autoFocus type="text" placeholder="Search…"
                  value={location} onChange={e => setLocation(e.target.value)}
                  className="w-full text-sm text-zinc-900 placeholder:text-zinc-400 bg-zinc-50 px-3 py-1.5 outline-none"
                />
              </div>
              <div className="py-1">
                {filtered.map(loc => (
                  <button
                    key={loc}
                    onClick={() => { setLocation(loc); setShowLoc(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
                  >
                    <MapPin size={11} className="text-zinc-400 shrink-0" /> {loc}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Check-in */}
        <div className={`flex-1 min-w-0 px-5 py-4 flex flex-col gap-1 ${dividerCls}`}>
          <span className={labelCls}>Check-in</span>
          <input
            type="date" value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={e => setCheckIn(e.target.value)}
            className={`text-sm font-medium bg-transparent outline-none w-full ${inputCls}`}
          />
        </div>

        {/* Check-out */}
        <div className={`flex-1 min-w-0 px-5 py-4 flex flex-col gap-1 ${dividerCls}`}>
          <span className={labelCls}>Check-out</span>
          <input
            type="date" value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={e => setCheckOut(e.target.value)}
            className={`text-sm font-medium bg-transparent outline-none w-full ${inputCls}`}
          />
        </div>

        {/* Guests */}
        <div className={`relative ${dividerCls}`}>
          <button
            onClick={() => { setShowGuests(s => !s); setShowLoc(false); }}
            className="w-full text-left px-5 py-4 flex flex-col gap-1 hover:bg-black/5 transition-colors min-w-[150px]"
          >
            <span className={labelCls}>Guests</span>
            <span className={`text-sm font-medium ${dark ? "text-white" : "text-zinc-900"}`}>
              {adults + children} Guest{adults + children !== 1 ? "s" : ""}
            </span>
          </button>

          {showGuests && (
            <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-zinc-200 shadow-xl z-50 p-4 animate-scale-in">
              {([
                ["Adults", "Age 13+", adults, setAdults, 1],
                ["Children", "Age 2–12", children, setChildren, 0],
              ] as const).map(([label, sub, val, set, min]) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{label}</p>
                    <p className="text-xs text-zinc-400">{sub}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => set(Math.max(min, val - 1))}
                      className="w-7 h-7 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-4 text-center text-sm font-medium text-zinc-900">{val}</span>
                    <button
                      onClick={() => set(val + 1)}
                      className="w-7 h-7 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="p-2.5 flex items-center">
          <button
            onClick={handleSearch}
            className="w-full lg:w-auto h-full bg-zinc-900 hover:bg-zinc-700 text-white font-medium text-sm px-7 py-3.5 flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={14} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
