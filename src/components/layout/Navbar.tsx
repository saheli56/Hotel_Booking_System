"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const base = isHome
    ? scrolled
      ? "bg-zinc-950/95 backdrop-blur-md border-b border-white/[0.06] py-3"
      : "bg-transparent py-4"
    : "bg-zinc-950 border-b border-white/[0.06] py-3";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${base}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">N</div>
            <span className="text-white font-semibold text-sm tracking-wide">Nova Hotel</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">
              My Bookings
            </Link>
            <Link href="/admin" className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 transition-colors">
              Admin
            </Link>
            <Link href="/booking" className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1.5 rounded-md transition-colors shadow-sm shadow-indigo-900/50">
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-zinc-400 hover:text-white p-1 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-64 bg-zinc-950 border-l border-white/[0.06] flex flex-col p-5 pt-20 gap-1 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm px-3 py-2.5 rounded-md transition-colors ${pathname === link.href ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/[0.06] my-2" />
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/5 transition-colors">My Bookings</Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white px-3 py-2.5 rounded-md border border-white/10 transition-colors text-center mt-1">Admin Panel</Link>
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="mt-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-md text-center">Book Now</Link>
          </div>
        </div>
      )}
    </>
  );
}
