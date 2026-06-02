import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, Users, BedDouble, Star, Award, MapPin, Phone, Mail } from "lucide-react";

const team = [
  { name: "Rajesh Kumar", role: "General Manager", initials: "RK" },
  { name: "Priya Sharma", role: "Front Desk Manager", initials: "PS" },
  { name: "Amit Verma", role: "Housekeeping Head", initials: "AV" },
  { name: "Sneha Patel", role: "F&B Manager", initials: "SP" },
];

const milestones = [
  { year: "2015", title: "Hotel Founded", desc: "Nova Hotel opened its doors with 20 rooms in New Delhi." },
  { year: "2017", title: "First Expansion", desc: "Extended to 50 rooms and launched our restaurant." },
  { year: "2020", title: "Online Booking", desc: "Launched our digital booking system to reduce manual work." },
  { year: "2022", title: "4-Star Rating", desc: "Awarded 4-star status by the Ministry of Tourism." },
  { year: "2024", title: "100+ Rooms", desc: "Expanded to 6 room categories and 3 new locations." },
];

const amenities = [
  "Free High-Speed WiFi", "24/7 Room Service", "Airport Transfer",
  "Conference Rooms", "Restaurant & Bar", "Fitness Centre",
  "Swimming Pool", "Laundry Service", "Daily Housekeeping",
  "Concierge Service", "Free Parking", "Spa & Wellness",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative overflow-hidden bg-zinc-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 grid-pattern pointer-events-none" />
          <div className="absolute inset-0 glow-indigo pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="badge-indigo mb-5 inline-flex">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              About Nova Hotel & Suites
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A comfortable, modern hotel built for every kind of traveller — from business guests to family vacations.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="border-b border-zinc-200 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { icon: <BedDouble size={18} />, val: "100+", label: "Rooms & Suites" },
                { icon: <Users size={18} />, val: "500+", label: "Happy Guests" },
                { icon: <Star size={18} />, val: "4.8", label: "Average Rating" },
                { icon: <Award size={18} />, val: "4★", label: "Ministry Rated" },
              ].map(({ icon, val, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                    {icon}
                  </div>
                  <p className="text-2xl font-bold text-zinc-900">{val}</p>
                  <p className="text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About content */}
        <section className="section-pad border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-2">Our Story</p>
                <h2 className="text-3xl font-bold text-zinc-900 mb-5">A Hotel Built on Comfort & Care</h2>
                <div className="flex flex-col gap-4 text-zinc-500 text-sm leading-relaxed">
                  <p>
                    Nova Hotel & Suites was founded in 2015 with a simple idea: every guest deserves a clean, comfortable room at a fair price, with staff who actually care.
                  </p>
                  <p>
                    Starting with just 20 rooms in New Delhi, we've grown to over 100 rooms across 6 categories — from budget-friendly Classic rooms to premium Penthouse Suites — without losing sight of what matters: your comfort.
                  </p>
                  <p>
                    Our online booking system was built to eliminate long queues, phone call confirmations, and paperwork. Book in under 5 minutes, receive instant confirmation, and manage your stay entirely online.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2.5">
                  {["Ministry of Tourism 4-Star Certified", "Free cancellation on all bookings", "24/7 front desk and concierge support"].map(p => (
                    <div key={p} className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className="w-5 h-5 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center shrink-0">
                        <Check size={10} className="text-indigo-600" />
                      </div>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities list */}
              <div className="card-base p-6">
                <h3 className="font-semibold text-zinc-900 mb-4">Hotel Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-zinc-600 py-1.5 border-b border-zinc-100 last:border-0">
                      <Check size={12} className="text-indigo-500 shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-pad bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">History</p>
              <h2 className="text-3xl font-bold text-zinc-900">Our Journey</h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200" />
              <div className="flex flex-col gap-6">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-5 items-start">
                    <div className="shrink-0 w-12 h-12 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center z-10">
                      <span className="text-[10px] font-bold text-indigo-600 leading-tight text-center">{m.year}</span>
                    </div>
                    <div className="card-base p-4 flex-1">
                      <h3 className="font-semibold text-zinc-900 text-sm mb-1">{m.title}</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-pad border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Team</p>
              <h2 className="text-3xl font-bold text-zinc-900">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {team.map(m => (
                <div key={m.name} className="card-base card-hover p-5 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {m.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">{m.name}</p>
                    <p className="text-xs text-zinc-500">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section-pad bg-zinc-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-1.5">Get In Touch</p>
            <h2 className="text-3xl font-bold text-zinc-900 mb-8">Contact Us</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: <Phone size={18} />, label: "Phone", val: "+91 12345 67890" },
                { icon: <Mail size={18} />, label: "Email", val: "info@novahotel.com" },
                { icon: <MapPin size={18} />, label: "Address", val: "123 Main St, New Delhi" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="card-base p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-zinc-900">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
