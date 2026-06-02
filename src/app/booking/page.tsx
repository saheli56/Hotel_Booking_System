"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { rooms, ADD_ONS } from "@/lib/data";
import type { AddOn, GuestDetails } from "@/lib/types";
import {
  Check, ChevronRight, ShieldCheck, CreditCard,
  User, Mail, Phone, Globe, MessageSquare,
  ArrowLeft, Sparkles, Calendar, Users, Plus, Minus,
} from "lucide-react";

const STEPS = ["Selection", "Guest Details", "Payment", "Confirmed"];

/* ── Step indicator ─────────────────────────────────────────────── */
function Steps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                i < current
                  ? "bg-indigo-600 text-white"
                  : i === current
                  ? "bg-zinc-900 text-white ring-4 ring-zinc-900/10"
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}
            >
              {i < current ? <Check size={13} /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block whitespace-nowrap ${i === current ? "text-zinc-900 font-medium" : "text-zinc-400"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-10 sm:w-20 mx-1 mb-4 ${i < current ? "bg-indigo-600" : "bg-zinc-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Form field ─────────────────────────────────────────────────── */
function Field({
  label, icon, value, onChange, placeholder, type = "text",
}: {
  label: string; icon: React.ReactNode; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
        {icon} {label}
      </label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
      />
    </div>
  );
}

/* ── Price summary sidebar ──────────────────────────────────────── */
function PriceSidebar({
  room, nights, checkIn, checkOut, selectedAddOns,
}: {
  room: (typeof rooms)[0]; nights: number;
  checkIn: string; checkOut: string; selectedAddOns: AddOn[];
}) {
  const fmt = (d: string) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";
  const addOnTotal = selectedAddOns.reduce((s, a) => s + (a.perNight ? a.price * nights : a.price), 0);
  const subtotal = room.price * nights;
  const taxes = Math.round((subtotal + addOnTotal) * 0.12);
  const total = subtotal + addOnTotal + taxes;

  return (
    <div className="card-base overflow-hidden sticky top-24">
      {/* Room image header */}
      <div className="relative h-36">
        <Image src={room.image} alt={room.name} fill className="object-cover" sizes="320px" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="badge-indigo">{room.category}</span>
          <p className="text-white font-semibold text-sm mt-1">{room.name}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Dates */}
        {(checkIn || checkOut) && (
          <div className="flex items-center justify-between text-sm text-zinc-500 bg-zinc-50 rounded-lg px-3 py-2.5 border border-zinc-100">
            <span>{fmt(checkIn)}</span>
            <span className="text-zinc-300">→</span>
            <span>{fmt(checkOut)}</span>
          </div>
        )}

        {/* Line items */}
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">₹{(room.price * 83).toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
            <span className="text-zinc-900 font-medium">₹{(subtotal * 83).toLocaleString("en-IN")}</span>
          </div>
          {selectedAddOns.map(a => (
            <div key={a.id} className="flex justify-between">
              <span className="text-zinc-500 truncate max-w-[160px]">{a.name}</span>
              <span className="text-zinc-900 font-medium">₹{((a.perNight ? a.price * nights : a.price) * 83).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-zinc-500">Taxes & GST (12%)</span>
            <span className="text-zinc-900 font-medium">₹{(taxes * 83).toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="h-px bg-zinc-100" />

        {/* Total */}
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-zinc-900">Total</span>
          <span className="text-2xl font-bold text-zinc-900">₹{(total * 83).toLocaleString("en-IN")}</span>
        </div>

        {/* Cancellation */}
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
          <ShieldCheck size={12} />
          Free cancellation until 48 hrs before check-in
        </div>
      </div>
    </div>
  );
}

/* ── Main booking content ───────────────────────────────────────── */
function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = searchParams.get("roomId") || rooms[0].id;
  const room = rooms.find(r => r.id === roomId) ?? rooms[0];
  const checkIn  = searchParams.get("checkIn")  || "";
  const checkOut = searchParams.get("checkOut") || "";
  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 2;

  const [step, setStep] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [guest, setGuest] = useState<GuestDetails>({ firstName: "", lastName: "", email: "", phone: "", nationality: "", specialRequests: "" });
  const [payMethod, setPayMethod] = useState<"card" | "upi">("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [confirmCode] = useState(`NOVA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  const addOnTotal = selectedAddOns.reduce((s, a) => s + (a.perNight ? a.price * nights : a.price), 0);
  const subtotal = room.price * nights;
  const taxes = Math.round((subtotal + addOnTotal) * 0.12);
  const grandTotal = (subtotal + addOnTotal + taxes) * 83;

  const toggleAddOn = (a: AddOn) =>
    setSelectedAddOns(prev => prev.find(x => x.id === a.id) ? prev.filter(x => x.id !== a.id) : [...prev, a]);

  const fmtDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not selected";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Steps */}
      <div className="mb-10">
        <Steps current={step} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Left: form area ─────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* STEP 0: Selection + Add-ons */}
          {step === 0 && (
            <div className="animate-fade-up flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Review your selection</h2>
                <p className="text-zinc-500 text-sm mt-1">Choose any add-ons before proceeding.</p>
              </div>

              {/* Room summary card */}
              <div className="card-base flex overflow-hidden">
                <div className="relative w-36 shrink-0">
                  <Image src={room.image} alt={room.name} fill className="object-cover" sizes="144px" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                  <div>
                    <span className="badge-indigo">{room.category}</span>
                    <h3 className="text-lg font-semibold text-zinc-900 mt-1.5">{room.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Calendar size={11} className="text-indigo-400" />{fmtDate(checkIn)} → {fmtDate(checkOut)}</span>
                    <span className="flex items-center gap-1"><Users size={11} className="text-indigo-400" />{searchParams.get("guests") || 2} guests</span>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-3">Enhance your stay</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADD_ONS.map(addOn => {
                    const selected = selectedAddOns.some(x => x.id === addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn)}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          selected ? "border-indigo-500 bg-indigo-50" : "border-zinc-200 bg-white hover:border-zinc-300"
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-indigo-600 border-indigo-600" : "border-zinc-300"}`}>
                          {selected && <Check size={9} className="text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{addOn.name}</p>
                          <p className="text-xs text-indigo-600 mt-0.5">
                            +₹{(addOn.price * 83).toLocaleString("en-IN")}{addOn.perNight ? "/night" : " (once)"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Continue to guest details <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* STEP 1: Guest details */}
          {step === 1 && (
            <div className="animate-fade-up flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Your details</h2>
                <p className="text-zinc-500 text-sm mt-1">Fields marked * are required.</p>
              </div>

              <div className="card-base p-6 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="First name *" icon={<User size={11} />} value={guest.firstName} onChange={v => setGuest(d => ({ ...d, firstName: v }))} placeholder="Arjun" />
                  <Field label="Last name *"  icon={<User size={11} />} value={guest.lastName}  onChange={v => setGuest(d => ({ ...d, lastName: v }))}  placeholder="Sharma" />
                </div>
                <Field label="Email *" icon={<Mail size={11} />} value={guest.email} onChange={v => setGuest(d => ({ ...d, email: v }))} placeholder="arjun@example.com" type="email" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone" icon={<Phone size={11} />} value={guest.phone} onChange={v => setGuest(d => ({ ...d, phone: v }))} placeholder="+91 98765 43210" type="tel" />
                  <Field label="Nationality" icon={<Globe size={11} />} value={guest.nationality} onChange={v => setGuest(d => ({ ...d, nationality: v }))} placeholder="Indian" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare size={11} /> Special Requests
                  </label>
                  <textarea
                    rows={3} value={guest.specialRequests}
                    onChange={e => setGuest(d => ({ ...d, specialRequests: e.target.value }))}
                    placeholder="Dietary requirements, late arrival, room preferences..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex items-center gap-2 px-5 py-3 border border-zinc-200 text-zinc-600 rounded-xl text-sm hover:bg-zinc-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!guest.firstName || !guest.email}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Continue to payment <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="animate-fade-up flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Secure payment</h2>
                <p className="text-zinc-500 text-sm mt-1 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" /> 256-bit SSL encrypted · PCI DSS compliant
                </p>
              </div>

              {/* Method toggle */}
              <div className="flex gap-2">
                {(["card", "upi"] as const).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className={`px-4 py-2 rounded-lg text-sm border font-medium transition-all ${payMethod === m ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"}`}>
                    {m === "card" ? "Credit / Debit Card" : "UPI"}
                  </button>
                ))}
              </div>

              {payMethod === "card" && (
                <div className="card-base p-6 flex flex-col gap-5">
                  <Field label="Card number" icon={<CreditCard size={11} />}
                    value={card.number}
                    onChange={v => setCard(c => ({ ...c, number: v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() }))}
                    placeholder="1234 5678 9012 3456"
                  />
                  <Field label="Cardholder name" icon={<User size={11} />} value={card.name} onChange={v => setCard(c => ({ ...c, name: v }))} placeholder="Arjun Sharma" />
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="Expiry" icon={<Calendar size={11} />}
                      value={card.expiry}
                      onChange={v => { const d = v.replace(/\D/g,"").slice(0,4); setCard(c=>({...c, expiry: d.length>2?`${d.slice(0,2)}/${d.slice(2)}`:d})); }}
                      placeholder="MM/YY"
                    />
                    <Field label="CVV" icon={<ShieldCheck size={11} />}
                      value={card.cvv}
                      onChange={v => setCard(c => ({ ...c, cvv: v.replace(/\D/g,"").slice(0,4) }))}
                      placeholder="123" type="password"
                    />
                  </div>
                </div>
              )}

              {payMethod === "upi" && (
                <div className="card-base p-6">
                  <Field label="UPI ID" icon={<span className="text-xs font-bold">₹</span>} value={upiId} onChange={setUpiId} placeholder="yourname@upi" />
                  <p className="text-xs text-zinc-400 mt-3">Enter your UPI ID (e.g. 9876543210@paytm, name@gpay)</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 border border-zinc-200 text-zinc-600 rounded-xl text-sm hover:bg-zinc-50 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-900/20"
                >
                  Pay ₹{grandTotal.toLocaleString("en-IN")} <ShieldCheck size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmed */}
          {step === 3 && (
            <div className="animate-scale-in flex flex-col items-center text-center gap-6 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center">
                <Check size={28} className="text-emerald-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Booking Confirmed!</h2>
                <p className="text-zinc-500 text-sm">
                  Confirmation sent to <strong className="text-zinc-900">{guest.email || "your email"}</strong>
                </p>
              </div>

              {/* Booking ref */}
              <div className="w-full bg-zinc-950 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Booking Reference</p>
                  <p className="font-mono text-2xl text-white tracking-widest">{confirmCode}</p>
                  <p className="text-zinc-600 text-xs mt-1">Show this at the front desk on arrival</p>
                </div>
              </div>

              {/* Summary */}
              <div className="w-full card-base p-5 text-left flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={room.image} alt={room.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{room.name}</p>
                    <p className="text-xs text-zinc-400">{fmtDate(checkIn)} → {fmtDate(checkOut)} · {nights} night{nights > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="h-px bg-zinc-100" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Total paid</span>
                  <span className="text-xl font-bold text-zinc-900">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Link href="/dashboard" className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-xl text-sm font-medium text-center transition-colors">View in My Bookings</Link>
                <Link href="/rooms" className="flex-1 border border-zinc-200 text-zinc-700 py-3 rounded-xl text-sm font-medium text-center hover:bg-zinc-50 transition-colors">Browse more rooms</Link>
              </div>
            </div>
          )}
        </div>

        {/* Right: price summary (hidden on step 3) */}
        {step < 3 && (
          <div className="lg:col-span-1">
            <PriceSidebar room={room} nights={nights} checkIn={checkIn} checkOut={checkOut} selectedAddOns={selectedAddOns} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page shell ─────────────────────────────────────────────────── */
export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50">
        {/* Dark header — consistent with all other pages */}
        <div className="bg-zinc-950 pt-16 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">Booking</p>
            <h1 className="text-white text-3xl font-bold">Reserve Your Room</h1>
            <p className="text-zinc-500 text-sm mt-1">Secure, instant confirmation · Free cancellation up to 48 hrs</p>
          </div>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <BookingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
