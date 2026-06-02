"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockBookings } from "@/lib/data";
import type { Booking } from "@/lib/types";
import {
  LayoutDashboard, CalendarDays, Heart, Star, Settings,
  LogOut, ChevronRight, Sparkles, MapPin, Clock,
  Check, X, Download, Calendar, ArrowRight, Menu,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Overview",    id: "overview"  },
  { icon: CalendarDays,    label: "My Bookings", id: "bookings"  },
  { icon: Heart,           label: "Wishlist",    id: "wishlist"  },
  { icon: Star,            label: "Reviews",     id: "reviews"   },
  { icon: Sparkles,        label: "Loyalty",     id: "loyalty"   },
  { icon: Settings,        label: "Profile",     id: "profile"   },
];

const TIERS = [
  { name: "Bronze",   min: 0,     max: 5000,    color: "#92400E", bg: "#FEF3C7" },
  { name: "Silver",   min: 5000,  max: 15000,   color: "#6B7280", bg: "#F3F4F6" },
  { name: "Gold",     min: 15000, max: 30000,   color: "#92400E", bg: "#FEF3C7" },
  { name: "Platinum", min: 30000, max: Infinity, color: "#6366F1", bg: "#EEF2FF" },
];

const POINTS = 12400;
const currentTier = TIERS.find(t => POINTS >= t.min && POINTS < t.max) ?? TIERS[1];
const nextTier    = TIERS[TIERS.indexOf(currentTier) + 1];
const pct = nextTier
  ? ((POINTS - currentTier.min) / (nextTier.min - currentTier.min)) * 100
  : 100;

function statusBadge(s: Booking["status"]) {
  const map = {
    upcoming:  "bg-blue-50 text-blue-700 border-blue-200",
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-zinc-100 text-zinc-600 border-zinc-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };
  return map[s];
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function BookingCard({ b }: { b: Booking }) {
  return (
    <div className="card-base overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-48 h-36 sm:h-auto shrink-0">
          <Image src={b.roomImage} alt={b.roomName} fill className="object-cover" sizes="192px" />
          <span className={`absolute top-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusBadge(b.status)} capitalize`}>
            {b.status}
          </span>
        </div>
        <div className="flex-1 p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-semibold text-zinc-900 text-lg leading-snug">{b.roomName}</p>
              <p className="font-mono text-xs text-zinc-400 mt-0.5">{b.confirmationCode}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-zinc-900">
                ₹{(b.total * 83).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-zinc-400">{b.totalNights} nights</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} className="text-indigo-400" />
              {fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-indigo-400" />
              Nova Hotel, New Delhi
            </span>
          </div>

          {b.addOns.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {b.addOns.map(a => (
                <span key={a.id} className="badge-indigo">{a.name}</span>
              ))}
            </div>
          )}

          {b.status === "upcoming" && (
            <div className="flex gap-2 mt-1">
              <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 border border-zinc-200 px-3 py-1.5 rounded-lg transition-colors">
                <Download size={11} /> Download Voucher
              </button>
              <button className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                <X size={11} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const upcoming  = mockBookings.filter(b => b.status === "upcoming");
  const completed = mockBookings.filter(b => b.status === "completed");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50">

        {/* ── Top banner ─────────────────────────────────────────── */}
        <div className="bg-zinc-950 pt-16 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-5">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-500 text-xs">Welcome back</p>
              <p className="text-white font-semibold text-lg truncate">Jane Smith</p>
            </div>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border"
              style={{ color: currentTier.color, borderColor: `${currentTier.color}50`, background: `${currentTier.color}18` }}
            >
              {currentTier.name} Member
            </span>
            {/* Mobile sidebar toggle */}
            <button onClick={() => setSidebarOpen(s => !s)} className="lg:hidden text-zinc-400 p-1">
              <Menu size={18} />
            </button>
          </div>

          {/* Tab nav — visible on mobile as horizontal scroll, desktop shows inside sidebar */}
          <div className="lg:hidden overflow-x-auto no-scrollbar px-4 pb-3">
            <div className="flex gap-1 w-max">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    section === id ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Layout ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 items-start">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0">
            <div className="card-base overflow-hidden sticky top-24">
              <nav className="p-2 flex flex-col gap-0.5">
                {NAV.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    onClick={() => setSection(id)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      section === id
                        ? "bg-indigo-600 text-white font-medium"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </nav>
              <div className="h-px bg-zinc-200 mx-3" />
              <div className="p-2">
                <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* ── OVERVIEW ───────────────────────────────────────── */}
            {section === "overview" && (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Stays",     value: completed.length, sub: "completed",     icon: <Check size={16} />,   color: "text-emerald-600 bg-emerald-50" },
                    { label: "Loyalty Points",  value: POINTS.toLocaleString("en-IN"), sub: "pts earned", icon: <Sparkles size={16} />, color: "text-indigo-600 bg-indigo-50" },
                    { label: "Upcoming",        value: upcoming.length,  sub: "reservations",  icon: <Calendar size={16} />, color: "text-sky-600 bg-sky-50" },
                    { label: "Member Since",    value: "2022",           sub: `${currentTier.name} tier`, icon: <Star size={16} />, color: "text-yellow-600 bg-yellow-50" },
                  ].map(({ label, value, sub, icon, color }) => (
                    <div key={label} className="card-base p-5 flex flex-col gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
                      <div>
                        <p className="text-2xl font-bold text-zinc-900">{value}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 font-medium">{label}</p>
                        <p className="text-xs text-zinc-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loyalty tier */}
                <div className="card-base overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <h2 className="font-semibold text-zinc-900 text-sm">Loyalty Programme</h2>
                    <span className="badge-indigo">{currentTier.name} Member</span>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-zinc-900">{POINTS.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">points available</p>
                      </div>
                      {nextTier && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-zinc-900">{nextTier.name} tier</p>
                          <p className="text-xs text-zinc-400">{(nextTier.min - POINTS).toLocaleString("en-IN")} pts to go</p>
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
                        <span>{currentTier.name}</span>
                        {nextTier && <span>{nextTier.name}</span>}
                      </div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500">
                      Earn points on every stay and redeem for free nights, room upgrades, and dining credits.
                    </p>
                  </div>
                </div>

                {/* Upcoming booking */}
                {upcoming.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-zinc-900">Upcoming Stay</h2>
                      <button onClick={() => setSection("bookings")} className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1">View all <ChevronRight size={12} /></button>
                    </div>
                    <BookingCard b={upcoming[0]} />
                  </div>
                )}

                {/* Quick actions */}
                <div>
                  <h2 className="font-semibold text-zinc-900 mb-4">Quick Actions</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: "Browse Rooms",      sub: "Find your next stay",       href: "/rooms"  },
                      { label: "Special Offers",    sub: "View current deals",        href: "/#offers"},
                      { label: "Contact Support",   sub: "We're here 24/7",           href: "#contact"},
                    ].map(({ label, sub, href }) => (
                      <Link key={label} href={href} className="card-base card-hover p-4 flex items-center justify-between group">
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{label}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
                        </div>
                        <ArrowRight size={14} className="text-zinc-300 group-hover:text-indigo-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── MY BOOKINGS ────────────────────────────────────── */}
            {section === "bookings" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-zinc-900">My Bookings</h2>
                  <Link href="/rooms" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                    New booking <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 bg-white border border-zinc-200 rounded-lg p-1 w-fit">
                  {[
                    { label: `Upcoming (${upcoming.length})`,  val: "upcoming"  },
                    { label: `Past (${completed.length})`,     val: "completed" },
                    { label: `All (${mockBookings.length})`,   val: "all"       },
                  ].map(({ label, val }) => (
                    <button key={val} className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  {mockBookings.map(b => <BookingCard key={b.id} b={b} />)}
                </div>
              </>
            )}

            {/* ── LOYALTY ────────────────────────────────────────── */}
            {section === "loyalty" && (
              <>
                <h2 className="text-xl font-bold text-zinc-900">Loyalty Programme</h2>
                <div className="card-base p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-4xl font-bold text-zinc-900">{POINTS.toLocaleString("en-IN")}</p>
                      <p className="text-zinc-500 text-sm mt-1">points balance</p>
                    </div>
                    <span className="badge-indigo text-sm px-4 py-1.5">{currentTier.name} Member</span>
                  </div>
                  {nextTier && (
                    <div>
                      <div className="flex justify-between text-sm text-zinc-500 mb-2">
                        <span>{currentTier.name}</span>
                        <span>{nextTier.name} — {(nextTier.min - POINTS).toLocaleString("en-IN")} pts away</span>
                      </div>
                      <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                    {[
                      { tier: "Bronze",   pts: "0 – 5,000",    perks: "Basic perks" },
                      { tier: "Silver",   pts: "5,000 – 15,000", perks: "+ Room upgrades" },
                      { tier: "Gold",     pts: "15,000 – 30,000", perks: "+ Free breakfast" },
                    ].map(t => (
                      <div key={t.tier} className={`p-4 rounded-xl border ${t.tier === currentTier.name ? "border-indigo-300 bg-indigo-50" : "border-zinc-100 bg-zinc-50"}`}>
                        <p className="font-semibold text-zinc-900 text-sm">{t.tier}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{t.pts} pts</p>
                        <p className="text-xs text-indigo-600 mt-2">{t.perks}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── PLACEHOLDER sections ─────────────────────────── */}
            {!["overview", "bookings", "loyalty"].includes(section) && (
              <div className="card-base flex flex-col items-center justify-center py-20 text-center gap-3">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-zinc-400" />
                </div>
                <p className="font-medium text-zinc-900 capitalize">{section}</p>
                <p className="text-zinc-400 text-sm">This section is coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
