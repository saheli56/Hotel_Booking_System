"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { rooms as initialRooms, mockBookings } from "@/lib/data";
import type { Room, Booking } from "@/lib/types";
import {
  LayoutDashboard, BedDouble, CalendarDays, LogOut,
  Plus, Pencil, Trash2, Check, X, Search, ChevronDown,
  Users, TrendingUp, Hotel, AlertCircle, Eye, EyeOff, ArrowLeft
} from "lucide-react";

const ADMIN_PASS = "admin123";

type Section = "dashboard" | "rooms" | "bookings";

const EMPTY_ROOM: Partial<Room> = {
  name: "", category: "Classic", price: 0, sizeSqm: 0, capacity: 2,
  beds: "", floor: "", view: "", image: "", amenities: [], highlights: [],
  description: "", available: true, rating: 4.5, reviewCount: 0, gallery: [],
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [section, setSection] = useState<Section>("dashboard");
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState<Partial<Room>>(EMPTY_ROOM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Room CRUD
  const openAddRoom = () => {
    setEditingRoom(null);
    setRoomForm({ ...EMPTY_ROOM });
    setShowRoomModal(true);
  };

  const openEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({ ...room });
    setShowRoomModal(true);
  };

  const saveRoom = () => {
    if (!roomForm.name || !roomForm.price) return;
    if (editingRoom) {
      setRooms(rs => rs.map(r => r.id === editingRoom.id ? { ...r, ...roomForm } as Room : r));
    } else {
      const newRoom: Room = {
        ...(roomForm as Room),
        id: roomForm.name!.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        gallery: [],
      };
      setRooms(rs => [...rs, newRoom]);
    }
    setShowRoomModal(false);
  };

  const deleteRoom = (id: string) => {
    setRooms(rs => rs.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
  };

  // Stats
  const totalRevenue = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
  const activeBookings = bookings.filter(b => b.status === "upcoming" || b.status === "active").length;

  const filteredRooms = rooms.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const statusColor: Record<Booking["status"], string> = {
    upcoming: "bg-blue-50 text-blue-700 border-blue-200",
    active: "bg-green-50 text-green-700 border-green-200",
    completed: "bg-neutral-100 text-neutral-600 border-neutral-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-dark-900 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Hotel size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-dark-900">Admin Login</h1>
            <p className="text-neutral-500 text-sm mt-1">Nova Hotel Management System</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col gap-4 shadow-sm">
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1.5">
                Username
              </label>
              <input
                type="text"
                value="admin"
                readOnly
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-dark-900 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setLoginError(false); }}
                  placeholder="Enter password"
                  className={`w-full bg-neutral-50 border rounded-lg px-3 py-2.5 pr-10 text-sm text-dark-900 outline-none focus:border-brand-500 transition-colors ${loginError ? "border-red-400" : "border-neutral-200"}`}
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {loginError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> Incorrect password. Try: admin123
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-dark-900 hover:bg-dark-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              Sign In
            </button>
            <div className="text-center">
              <Link href="/" className="text-xs text-neutral-400 hover:text-brand-500 transition-colors flex items-center justify-center gap-1">
                <ArrowLeft size={11} /> Back to website
              </Link>
            </div>
          </form>
          <p className="text-center text-xs text-neutral-400 mt-4">Demo credentials: admin / admin123</p>
        </div>
      </div>
    );
  }

  // ─── Admin Shell ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-dark-900 flex flex-col shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Hotel size={15} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Nova Hotel</p>
              <p className="text-white/40 text-[10px] leading-tight">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "rooms", label: "Room Management", icon: BedDouble },
            { id: "bookings", label: "Booking Management", icon: CalendarDays },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id as Section)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full text-left ${
                section === id ? "bg-brand-500 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={14} /> View Website
          </Link>
          <button
            onClick={() => setLoggedIn(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/40 hover:text-red-400 transition-colors w-full text-left"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-dark-900 capitalize">
            {section === "dashboard" ? "Dashboard Overview" : section === "rooms" ? "Room Management" : "Booking Management"}
          </h1>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <div className="w-7 h-7 bg-dark-900 rounded-full flex items-center justify-center text-white text-xs">A</div>
            Administrator
          </div>
        </div>

        <div className="p-6">

          {/* ── Dashboard ── */}
          {section === "dashboard" && (
            <div className="flex flex-col gap-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Rooms", value: rooms.length, icon: <BedDouble size={18} />, color: "bg-brand-50 text-brand-600" },
                  { label: "Total Bookings", value: bookings.length, icon: <CalendarDays size={18} />, color: "bg-purple-50 text-purple-600" },
                  { label: "Active Bookings", value: activeBookings, icon: <Users size={18} />, color: "bg-green-50 text-green-600" },
                  { label: "Total Revenue", value: `₹${(totalRevenue * 83).toLocaleString("en-IN")}`, icon: <TrendingUp size={18} />, color: "bg-yellow-50 text-yellow-600" },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} className="bg-white rounded-xl border border-neutral-200 p-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                      {icon}
                    </div>
                    <p className="text-2xl font-bold text-dark-900">{value}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Recent bookings table */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="font-semibold text-dark-900 text-sm">Recent Bookings</h2>
                  <button onClick={() => setSection("bookings")} className="text-xs text-brand-600 hover:text-brand-700">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Booking ID</th>
                        <th className="px-5 py-3 text-left">Room</th>
                        <th className="px-5 py-3 text-left">Check-in</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                          <td className="px-5 py-3 font-mono text-xs text-neutral-500">{b.confirmationCode}</td>
                          <td className="px-5 py-3 font-medium text-dark-900">{b.roomName}</td>
                          <td className="px-5 py-3 text-neutral-500">{new Date(b.checkIn).toLocaleDateString()}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[b.status]}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right font-medium">₹{(b.total * 83).toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Room availability overview */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="font-semibold text-dark-900 text-sm">Room Availability</h2>
                  <button onClick={() => setSection("rooms")} className="text-xs text-brand-600 hover:text-brand-700">Manage →</button>
                </div>
                <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {rooms.map(r => (
                    <div key={r.id} className="flex items-center justify-between px-3 py-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-dark-900 truncate">{r.name}</p>
                        <p className="text-xs text-neutral-400">₹{(r.price * 83).toLocaleString("en-IN")}/night</p>
                      </div>
                      <span className={`ml-3 shrink-0 w-2 h-2 rounded-full ${r.available ? "bg-green-500" : "bg-red-400"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Room Management ── */}
          {section === "rooms" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg outline-none focus:border-brand-500 transition-colors w-64"
                  />
                </div>
                <button
                  onClick={openAddRoom}
                  className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={15} /> Add Room
                </button>
              </div>

              {/* Rooms table */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                        <th className="px-5 py-3 text-left">Room</th>
                        <th className="px-5 py-3 text-left">Category</th>
                        <th className="px-5 py-3 text-left">Capacity</th>
                        <th className="px-5 py-3 text-left">Price/Night</th>
                        <th className="px-5 py-3 text-left">Rating</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map(room => (
                        <tr key={room.id} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                                {room.image && (
                                  <Image src={room.image} alt={room.name} fill className="object-cover" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-dark-900 leading-tight">{room.name}</p>
                                <p className="text-xs text-neutral-400">{room.floor}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded">{room.category}</span>
                          </td>
                          <td className="px-5 py-3 text-neutral-600">{room.capacity} guests · {room.beds}</td>
                          <td className="px-5 py-3 font-semibold text-dark-900">₹{(room.price * 83).toLocaleString("en-IN")}</td>
                          <td className="px-5 py-3 text-neutral-600">⭐ {room.rating}</td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => setRooms(rs => rs.map(r => r.id === room.id ? { ...r, available: !r.available } : r))}
                              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${room.available ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"}`}
                            >
                              {room.available ? "Available" : "Unavailable"}
                            </button>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openEditRoom(room)}
                                className="p-1.5 text-neutral-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(room.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-neutral-100 text-xs text-neutral-400">
                  Showing {filteredRooms.length} of {rooms.length} rooms
                </div>
              </div>
            </div>
          )}

          {/* ── Booking Management ── */}
          {section === "bookings" && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-4 gap-3">
                {(["upcoming", "active", "completed", "cancelled"] as const).map(s => {
                  const count = bookings.filter(b => b.status === s).length;
                  return (
                    <div key={s} className={`rounded-xl p-4 border text-center ${statusColor[s].replace("text-", "border-").split(" ")[1]} ${statusColor[s]}`}>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs capitalize mt-0.5">{s}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                        <th className="px-5 py-3 text-left">Ref. Code</th>
                        <th className="px-5 py-3 text-left">Room</th>
                        <th className="px-5 py-3 text-left">Check-in</th>
                        <th className="px-5 py-3 text-left">Check-out</th>
                        <th className="px-5 py-3 text-left">Guests</th>
                        <th className="px-5 py-3 text-left">Amount</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-center">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs text-neutral-500">{b.confirmationCode}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="relative w-8 h-8 rounded overflow-hidden bg-neutral-100 shrink-0">
                                <Image src={b.roomImage} alt={b.roomName} fill className="object-cover" />
                              </div>
                              <span className="font-medium text-dark-900 text-xs">{b.roomName}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-neutral-600">{new Date(b.checkIn).toLocaleDateString()}</td>
                          <td className="px-5 py-3 text-neutral-600">{new Date(b.checkOut).toLocaleDateString()}</td>
                          <td className="px-5 py-3 text-neutral-600">{b.guests}</td>
                          <td className="px-5 py-3 font-semibold text-dark-900">₹{(b.total * 83).toLocaleString("en-IN")}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[b.status]}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-center gap-1">
                              <select
                                value={b.status}
                                onChange={e => updateBookingStatus(b.id, e.target.value as Booking["status"])}
                                className="text-xs border border-neutral-200 rounded px-2 py-1 outline-none bg-white text-neutral-600"
                              >
                                {["upcoming", "active", "completed", "cancelled"].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-neutral-100 text-xs text-neutral-400">
                  Total: {bookings.length} bookings
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Room Modal ── */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 bg-dark-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 sticky top-0 bg-white">
              <h2 className="font-semibold text-dark-900">{editingRoom ? "Edit Room" : "Add New Room"}</h2>
              <button onClick={() => setShowRoomModal(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <ModalField label="Room Name *" value={roomForm.name || ""} onChange={v => setRoomForm(f => ({ ...f, name: v }))} />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1.5">Category</label>
                  <select
                    value={roomForm.category}
                    onChange={e => setRoomForm(f => ({ ...f, category: e.target.value as Room["category"] }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-dark-900 outline-none focus:border-brand-500"
                  >
                    {["Classic", "Deluxe", "Suite", "Villa", "Penthouse"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <ModalField label="Price/Night (USD) *" value={String(roomForm.price || "")} onChange={v => setRoomForm(f => ({ ...f, price: Number(v) }))} type="number" />
                <ModalField label="Size (m²)" value={String(roomForm.sizeSqm || "")} onChange={v => setRoomForm(f => ({ ...f, sizeSqm: Number(v) }))} type="number" />
                <ModalField label="Capacity (guests)" value={String(roomForm.capacity || "")} onChange={v => setRoomForm(f => ({ ...f, capacity: Number(v) }))} type="number" />
                <ModalField label="Bed Type" value={roomForm.beds || ""} onChange={v => setRoomForm(f => ({ ...f, beds: v }))} placeholder="e.g. 1 King Bed" />
                <ModalField label="Floor" value={roomForm.floor || ""} onChange={v => setRoomForm(f => ({ ...f, floor: v }))} placeholder="e.g. 5th Floor" />
                <div className="col-span-2">
                  <ModalField label="View" value={roomForm.view || ""} onChange={v => setRoomForm(f => ({ ...f, view: v }))} placeholder="e.g. Ocean View" />
                </div>
                <div className="col-span-2">
                  <ModalField label="Image URL" value={roomForm.image || ""} onChange={v => setRoomForm(f => ({ ...f, image: v }))} placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={roomForm.description || ""}
                    onChange={e => setRoomForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-dark-900 outline-none focus:border-brand-500 resize-none"
                    placeholder="Room description..."
                  />
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <label className="text-sm font-medium text-dark-900">Available</label>
                  <button
                    type="button"
                    onClick={() => setRoomForm(f => ({ ...f, available: !f.available }))}
                    className={`w-10 h-5 rounded-full transition-colors relative ${roomForm.available ? "bg-green-500" : "bg-neutral-300"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${roomForm.available ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-sm text-neutral-500">{roomForm.available ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-5 py-4 border-t border-neutral-200 sticky bottom-0 bg-white">
              <button onClick={() => setShowRoomModal(false)} className="flex-1 border border-neutral-200 text-neutral-600 py-2.5 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={saveRoom}
                disabled={!roomForm.name || !roomForm.price}
                className="flex-1 bg-brand-500 disabled:bg-neutral-300 hover:bg-brand-600 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Check size={14} />
                {editingRoom ? "Save Changes" : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-dark-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 w-full max-w-sm animate-scale-in text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-dark-900 mb-1">Delete this room?</h3>
            <p className="text-neutral-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-neutral-200 text-neutral-600 py-2.5 rounded-lg text-sm">
                Cancel
              </button>
              <button onClick={() => deleteRoom(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-dark-900 outline-none focus:border-brand-500 transition-colors"
      />
    </div>
  );
}
