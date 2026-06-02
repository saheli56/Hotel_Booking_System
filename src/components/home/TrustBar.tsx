const stats = [
  { value: "100+", label: "Rooms & Suites" },
  { value: "500+", label: "Guests Hosted" },
  { value: "4.8 ★", label: "Average Rating" },
  { value: "24 / 7", label: "Front Desk" },
  { value: "< 5 min", label: "Booking Time" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-zinc-100 py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-zinc-900">{value}</span>
              <span className="text-xs text-zinc-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
