export interface Room {
  id: string;
  name: string;
  category: "Classic" | "Deluxe" | "Suite" | "Villa" | "Penthouse";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  sizeSqm: number;
  capacity: number;
  beds: string;
  floor: string;
  view: string;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
  description: string;
  available: boolean;
  featured?: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  pricePerNight: number;
  total: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
  confirmationCode: string;
  addOns: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  perNight: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  roomStayed: string;
  verified: boolean;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  properties: number;
  tagline: string;
}

export interface SearchParams {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests: string;
}
