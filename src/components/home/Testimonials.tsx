import Image from "next/image";
import { testimonials } from "@/lib/data";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="section-pad bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Reviews</p>
          <h2 className="text-3xl font-bold text-zinc-900">What Our Guests Say</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={t.id} className={`card-base card-hover p-5 flex flex-col gap-4 ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} className={j < t.rating ? "fill-yellow-400 text-yellow-400" : "fill-zinc-200 text-zinc-200"} />
                  ))}
                </div>
                <Quote size={16} className="text-zinc-200" />
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed flex-1">"{t.comment.slice(0, 160)}{t.comment.length > 160 ? "..." : ""}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                <Image src={t.avatar} alt={t.name} width={32} height={32} className="rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.location}</p>
                </div>
                {t.verified && (
                  <span className="ml-auto shrink-0 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-6 card-base p-5 flex flex-wrap items-center justify-center gap-8 text-center">
          <div><p className="text-4xl font-bold text-zinc-900">4.8</p><p className="text-xs text-zinc-500 mt-0.5">Out of 5</p></div>
          <div className="h-10 w-px bg-zinc-200 hidden sm:block" />
          <div><p className="text-3xl font-bold text-zinc-900">500+</p><p className="text-xs text-zinc-500 mt-0.5">Total reviews</p></div>
          <div className="h-10 w-px bg-zinc-200 hidden sm:block" />
          <div><p className="text-3xl font-bold text-zinc-900">98%</p><p className="text-xs text-zinc-500 mt-0.5">Recommend us</p></div>
        </div>
      </div>
    </section>
  );
}
