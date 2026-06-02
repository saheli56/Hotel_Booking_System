import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/lib/data";
import { Star, Maximize2, Users, ArrowRight } from "lucide-react";

export default function FeaturedRooms() {
  const featured = rooms.slice(0, 3);

  return (
    <section className="section-pad bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Our Collection</p>
            <h2 className="text-3xl font-bold text-zinc-900">Featured Rooms & Suites</h2>
          </div>
          <Link href="/rooms" className="hidden sm:flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            View all <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(room => (
            <Link key={room.id} href={`/rooms/${room.id}`} className="card-base card-hover group overflow-hidden flex flex-col relative">
              {/* Border beam on hover */}
              <div className="relative overflow-hidden rounded-t-xl">
                <div className="relative h-52 overflow-hidden">
                  <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
                {room.originalPrice && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">SALE</span>
                )}
                <span className="absolute top-3 right-3 text-[10px] font-medium bg-zinc-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" /> {room.rating}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <span className="badge-indigo">{room.category}</span>
                  <h3 className="text-lg font-semibold text-zinc-900 mt-2">{room.name}</h3>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Maximize2 size={10} />{room.sizeSqm} m²</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Users size={10} />{room.beds}</span>
                </div>
                <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    {room.originalPrice && <p className="text-xs text-zinc-400 line-through">₹{(room.originalPrice * 83).toLocaleString("en-IN")}</p>}
                    <span className="text-xl font-bold text-zinc-900">₹{(room.price * 83).toLocaleString("en-IN")}</span>
                    <span className="text-xs text-zinc-400 ml-1">/night</span>
                  </div>
                  <span className="text-xs text-indigo-600 font-medium group-hover:underline flex items-center gap-1">Book <ArrowRight size={11} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
