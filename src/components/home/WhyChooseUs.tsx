import { Zap, ShieldCheck, HeadphonesIcon, BadgePercent, Star, CalendarCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Quick Booking", desc: "Book a room in under 2 minutes. Straightforward and fast." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "All transactions are encrypted with SSL. 100% safe." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our team is available around the clock to assist you." },
  { icon: BadgePercent, title: "Best Price", desc: "We match any lower price you find for the same room." },
  { icon: Star, title: "Verified Reviews", desc: "Honest reviews from real guests who have stayed with us." },
  { icon: CalendarCheck, title: "Free Cancellation", desc: "Cancel up to 48 hours before check-in at no charge." },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-white border-b border-zinc-200" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Why Us</p>
          <h2 className="text-3xl font-bold text-zinc-900 mb-3">Why Book With Nova Hotel?</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            Built to make the booking process simple, fast, and trustworthy for every guest.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-base card-hover p-5 flex gap-4 group relative">
              <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                <Icon size={16} className="text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 text-sm mb-1">{title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
