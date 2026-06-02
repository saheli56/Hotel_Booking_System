import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/[0.06]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">N</div>
              <span className="text-white font-semibold text-sm">Nova Hotel & Suites</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Comfortable stays and seamless online booking. Your perfect room is just a few clicks away.
            </p>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><Phone size={11} /> +91 12345 67890</a>
              <a href="mailto:info@novahotel.com" className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><Mail size={11} /> info@novahotel.com</a>
              <div className="flex items-start gap-2"><MapPin size={11} className="mt-0.5 shrink-0" /><span>123 Main St, Sector 5, New Delhi — 110001</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {[["Home", "/"], ["Rooms & Suites", "/rooms"], ["About Us", "/about"], ["Book a Room", "/booking"], ["My Bookings", "/dashboard"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Admin */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">Management</p>
            <ul className="flex flex-col gap-2.5">
              {[["Admin Dashboard", "/admin"], ["Room Management", "/admin"], ["Booking Reports", "/admin"], ["Help Centre", "#"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">Policies</p>
            <ul className="flex flex-col gap-2 text-xs text-zinc-600">
              {["Check-in: 2:00 PM", "Check-out: 11:00 AM", "Free Cancellation", "No Smoking Rooms", "Pets Not Allowed", "Govt. ID Required"].map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Nova Hotel & Suites. All rights reserved.</p>
          <p className="text-zinc-700 text-xs">Hotel Management System · College Project</p>
        </div>
      </div>
    </footer>
  );
}
