export const SITE = {
  name: "Khokharz Cafe",
  city: "Halifax, Nova Scotia",
  address: {
    line1: "5151 Terminal Rd, 2nd Floor",
    line2: "Halifax, NS B3J 1A1",
    country: "USA",
    building: "Emera Place, Floor 2",
    full: "5151 Terminal Rd, 2nd Floor, Halifax, NS B3J 1A1, USA",
  },
  priceRange: "₹100–300 per person",
  rating: { value: 4.5, count: 24 },
  services: ["Dine-in", "Takeaway"],
  // Unknown details stay as placeholders until the business supplies them.
  phone: "+91 9815977969",
  tel: "tel:+919815977969",
  whatsapp: "https://wa.me/919815977969?text=hello%20Khokharz%20cafe",
  email: "sharrymaan2005@gmail.com",
  mailto: "mailto:sharrymaan2005@gmail.com",
  hours: "9:00 AM – 9:00 PM Daily",
  menuLink: "/menu",
} as const;

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Khokharz Cafe, 5151 Terminal Rd, Halifax, NS B3J 1A1, USA",
)}`;

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  "5151 Terminal Rd, Halifax, NS B3J 1A1, USA",
)}&z=16&output=embed`;

export const NAV_LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { id: "instagram", name: "Instagram", handle: "@shamsher_pb29", url: "https://instagram.com/shamsher_pb29" },
  { id: "facebook", name: "Facebook", handle: "@shamshersamadh", url: "https://facebook.com/shamshersamadh" },
  { id: "youtube", name: "YouTube", handle: "@735wale", url: "https://youtube.com/@735wale" },
] as const;
