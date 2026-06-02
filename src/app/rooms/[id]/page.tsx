"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomCard from "@/components/rooms/RoomCard";
import { rooms } from "@/lib/data";
import {
  Star, Maximize2, Users, MapPin, Check,
  ChevronLeft, ChevronRight, X, Heart,
  ShieldCheck, ArrowRight, Minus, Plus,
  Wifi, Coffee, Wind, Bath,
} from "lucide-react";
import { use } from "react";

const amenityIcons: Record<string, React.ReactNode> = {
  "High-Speed WiFi": <Wifi size={13} />,
  "Espresso Machine": <Coffee size={13} />,
  "Climate Control": <Wind size={13} />,
  "Rain Shower": <Bath size={13} />,
  "Soaking Tub": <Bath size={13} />,
};

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const room = rooms.find(r => r.id === id);
  if (!room) notFound();

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 1;
  const subtotal = room.price * nights;
  const taxes    = Math.round(subtotal * 0.12);
  const total    = subtotal + taxes;

  const allImages = room.gallery.length > 0 ? room.gallery : [room.image];
  const related   = rooms.filter(r => r.id !== room.id).slice(0, 3);

  const handleBookNow = () => {
    const p = new URLSearchParams({ roomId: room.id, checkIn, checkOut, guests: String(guests) });
    router.push(`/booking?${p.toString()}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50">

        {/* ── Gallery ──────────────────────────────────────────── */}
        <div className="relative h-[55vh] lg:h-[65vh] bg-zinc-900 overflow-hidden">
          <Image
            src={allImages[galleryIndex]}
            alt={room.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />

          {/* Prev / Next */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setGalleryIndex(i => (i - 1 + allImages.length) % allImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-900/80 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setGalleryIndex(i => (i + 1) % allImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-900/80 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`h-1 rounded-full transition-all ${i === galleryIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>

          {/* View all */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 bg-zinc-900/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 border border-white/20 hover:bg-zinc-900/80 transition-colors"
          >
            All {allImages.length} photos
          </button>

          {/* Back + wishlist */}
          <div className="absolute top-20 left-0 right-0 px-5 flex items-center justify-between">
            <Link
              href="/rooms"
              className="flex items-center gap-1.5 bg-zinc-900/60 backdrop-blur-sm text-white text-xs px-3 py-2 border border-white/20 hover:bg-zinc-900/80 transition-colors"
            >
              <ChevronLeft size={13} /> All Rooms
            </Link>
            <button
              onClick={() => setWishlisted(w => !w)}
              className={`w-9 h-9 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-zinc-900/80 transition-colors ${wishlisted ? "text-red-400" : "text-white"}`}
            >
              <Heart size={14} className={wishlisted ? "fill-current" : ""} />
            </button>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: details */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Header */}
              <div className="flex flex-col gap-3">
                <span className="badge-indigo w-fit">{room.category}</span>
                <h1 className="text-4xl font-bold text-zinc-900 leading-tight">{room.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    {room.rating} ({room.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1.5"><Maximize2 size={13} />{room.sizeSqm} m²</span>
                  <span className="flex items-center gap-1.5"><Users size={13} />{room.beds} · up to {room.capacity} guests</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} />{room.floor} · {room.view}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-semibold text-zinc-900 mb-2">About this room</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">{room.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-semibold text-zinc-900 mb-3">Room highlights</h2>
                <div className="flex flex-col gap-2.5">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-indigo-600" />
                      </div>
                      <p className="text-zinc-700 text-sm leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-semibold text-zinc-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {room.amenities.map(a => (
                    <div
                      key={a}
                      className="flex items-center gap-2 bg-white border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700"
                    >
                      <span className="text-indigo-500 shrink-0">
                        {amenityIcons[a] ?? <Check size={13} />}
                      </span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="bg-white border border-zinc-200 p-5">
                <h2 className="font-semibold text-zinc-900 mb-4">Stay policies</h2>
                <div className="grid sm:grid-cols-2 gap-0">
                  {[
                    ["Check-in",     "From 2:00 PM"],
                    ["Check-out",    "Until 11:00 AM"],
                    ["Cancellation", "Free up to 48 hrs"],
                    ["Pets",         "Not permitted"],
                    ["Smoking",      "Non-smoking"],
                    ["Min. stay",    "1 night"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between py-2.5 border-b border-zinc-100">
                      <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{label}</span>
                      <span className="text-sm text-zinc-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: booking widget */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-zinc-200 sticky top-24">
                {/* Price header */}
                <div className="bg-zinc-950 px-5 py-5 border-b border-white/[0.06]">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    {room.originalPrice && (
                      <span className="text-zinc-500 text-sm line-through">
                        ₹{(room.originalPrice * 83).toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-white">
                      ₹{(room.price * 83).toLocaleString("en-IN")}
                    </span>
                    <span className="text-zinc-400 text-sm">/night</span>
                  </div>
                  <p className="text-zinc-400 text-xs flex items-center gap-1">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    {room.rating} · {room.reviewCount} reviews
                  </p>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2 outline-none focus:border-zinc-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2 outline-none focus:border-zinc-900 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Guests</label>
                    <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-3 py-2">
                      <button
                        onClick={() => setGuests(g => Math.max(1, g - 1))}
                        className="w-6 h-6 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="flex-1 text-center text-sm font-medium text-zinc-900">
                        {guests} Guest{guests > 1 ? "s" : ""}
                      </span>
                      <button
                        onClick={() => setGuests(g => Math.min(room.capacity, g + 1))}
                        className="w-6 h-6 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 text-sm">
                    <div className="flex justify-between text-zinc-500">
                      <span>₹{(room.price * 83).toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
                      <span className="text-zinc-900 font-medium">₹{(subtotal * 83).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Taxes & GST (12%)</span>
                      <span className="text-zinc-900 font-medium">₹{(taxes * 83).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-1 pt-2 border-t border-zinc-100">
                      <span className="text-zinc-900">Total</span>
                      <span className="text-xl text-zinc-900">₹{(total * 83).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Reserve button */}
                  <button
                    onClick={handleBookNow}
                    disabled={!room.available}
                    className="w-full bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-400 text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {room.available ? <>Reserve Now <ArrowRight size={13} /></> : "Not Available"}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                    <ShieldCheck size={11} className="text-emerald-500" />
                    Free cancellation up to 48 hours before arrival
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Similar rooms ─────────────────────────────────── */}
          <div className="mt-14 pt-10 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">You may also like</h2>
              <Link href="/rooms" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => <RoomCard key={r.id} room={r} />)}
            </div>
          </div>
        </div>

        {/* ── Lightbox ──────────────────────────────────────────── */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] bg-zinc-950/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white">
              <X size={22} />
            </button>
            <div className="relative w-full max-w-4xl max-h-[80vh] aspect-video" onClick={e => e.stopPropagation()}>
              <Image src={allImages[galleryIndex]} alt={room.name} fill className="object-contain" />
              <button
                onClick={() => setGalleryIndex(i => (i - 1 + allImages.length) % allImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setGalleryIndex(i => (i + 1) % allImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
