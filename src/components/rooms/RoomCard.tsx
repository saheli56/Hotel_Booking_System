import Image from "next/image";
import Link from "next/link";
import { Star, Maximize2, Users, ArrowRight } from "lucide-react";
import type { Room } from "@/lib/types";

export default function RoomCard({ room, layout = "grid" }: { room: Room; layout?: "grid" | "list" }) {
  const inrPrice = (room.price * 83).toLocaleString("en-IN");
  const inrOrig = room.originalPrice ? (room.originalPrice * 83).toLocaleString("en-IN") : null;

  if (layout === "list") {
    return (
      <Link href={`/rooms/${room.id}`} className="card-base card-hover flex flex-col sm:flex-row overflow-hidden group">
        <div className="relative sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden">
          <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="224px" />
          {!room.available && <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center"><span className="text-white text-xs bg-red-600 px-3 py-1 rounded-full">Sold Out</span></div>}
        </div>
        <div className="flex-1 p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="badge-indigo">{room.category}</span>
              <h3 className="text-xl font-semibold text-zinc-900 mt-2">{room.name}</h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-zinc-900">{room.rating}</span>
              <span className="text-xs text-zinc-400">({room.reviewCount})</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{room.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1"><Maximize2 size={10} />{room.sizeSqm} m²</span>
            <span className="flex items-center gap-1"><Users size={10} />{room.beds}</span>
            <span>{room.view}</span>
          </div>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100">
            <div>
              {inrOrig && <p className="text-xs text-zinc-400 line-through">₹{inrOrig}</p>}
              <span className="text-2xl font-bold text-zinc-900">₹{inrPrice}</span>
              <span className="text-xs text-zinc-400 ml-1">/night</span>
            </div>
            <span className="text-sm text-indigo-600 font-medium flex items-center gap-1 group-hover:underline">View details <ArrowRight size={13} /></span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/rooms/${room.id}`} className="card-base card-hover group overflow-hidden flex flex-col relative">
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <Image src={room.image} alt={room.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
        {room.originalPrice && <span className="absolute top-3 left-3 text-[10px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">SALE</span>}
        {!room.available && <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center"><span className="text-xs text-white bg-red-600 px-3 py-1 rounded-full">Sold Out</span></div>}
        <span className="absolute top-3 right-3 text-[10px] font-medium bg-zinc-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={9} className="fill-yellow-400 text-yellow-400" /> {room.rating}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <span className="badge-indigo">{room.category}</span>
          <h3 className="text-lg font-semibold text-zinc-900 mt-2">{room.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
          <span className="flex items-center gap-1"><Maximize2 size={10} />{room.sizeSqm} m²</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Users size={10} />{room.beds}</span>
          <span>·</span>
          <span>{room.floor}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {room.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded">{a}</span>
          ))}
          {room.amenities.length > 3 && <span className="text-[10px] text-zinc-400">+{room.amenities.length - 3}</span>}
        </div>
        <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div>
            {inrOrig && <p className="text-xs text-zinc-400 line-through">₹{inrOrig}</p>}
            <span className="text-xl font-bold text-zinc-900">₹{inrPrice}</span>
            <span className="text-xs text-zinc-400 ml-1">/night</span>
          </div>
          <span className={`text-xs font-medium flex items-center gap-1 ${room.available ? "text-indigo-600 group-hover:underline" : "text-zinc-300"}`}>
            {room.available ? <>Book <ArrowRight size={11} /></> : "Unavailable"}
          </span>
        </div>
      </div>
    </Link>
  );
}
