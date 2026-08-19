import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Utensils, Heart, ShoppingBag, MapPin, Phone, Instagram, Facebook, Youtube, Sparkles, Flame, Leaf, Armchair, ChevronRight, Plus, Minus } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import coffeeImg from "@/assets/coffee-pour.jpg";
import breakfastImg from "@/assets/breakfast.jpg";
import focacciaImg from "@/assets/focaccia.jpg";
import butterChickenImg from "@/assets/butter-chicken.jpg";
import espressoImg from "@/assets/espresso.jpg";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { StorySlider } from "@/components/site/StorySlider";
import { FaqSection } from "@/components/site/FaqSection";
import { useCart } from "@/context/CartContext";
import { DIRECTIONS_URL, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khokharz Cafe — Coffee, Food & Moments" },
      {
        name: "description",
        content:
          "Welcome to Khokharz Cafe. Great coffee, good food and better company. View our menu, perfect pairings, and takeaway options.",
      },
      { property: "og:title", content: "Khokharz Cafe — Coffee, Food & Moments" },
    ],
  }),
  component: Home,
});

const coffeeItems = [
  { name: "Espresso", price: "₹120" },
  { name: "Americano", price: "₹140" },
  { name: "Cappuccino", price: "₹160", badge: "Bestseller" },
  { name: "Latte", price: "₹160" },
  { name: "Mocha", price: "₹180" },
  { name: "Caramel Macchiato", price: "₹190", badge: "Popular" },
  { name: "Cold Coffee", price: "₹170" },
  { name: "Iced Latte", price: "₹180" },
];

const nonCoffeeItems = [
  { name: "Hot Chocolate", price: "₹150", badge: "Chef Special" },
  { name: "Matcha Latte", price: "₹170" },
  { name: "Chai Latte", price: "₹120", badge: "Classic" },
  { name: "Iced Tea", price: "₹120" },
  { name: "Lemonade", price: "₹110" },
];

const foodItems = [
  { name: "Veg Sandwich", price: "₹160" },
  { name: "Cheese Sandwich", price: "₹180" },
  { name: "Pasta (Red/White Sauce)", price: "₹210", badge: "Must Try" },
  { name: "French Fries", price: "₹120" },
  { name: "Garlic Bread", price: "₹130" },
  { name: "Chocolate Brownie", price: "₹150", badge: "Bestseller" },
];

const pairings = [
  {
    title: "LATTE + CROISSANT",
    img1: espressoImg,
    img2: breakfastImg,
    tag: "Morning Classic",
  },
  {
    title: "ICED COFFEE + BROWNIE",
    img1: coffeeImg,
    img2: focacciaImg,
    tag: "Sweet Break",
  },
  {
    title: "PASTA + GARLIC BREAD",
    img1: butterChickenImg,
    img2: focacciaImg,
    tag: "Lunch Combo",
  },
];

function Home() {
  const { cart, addToCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderItemOrderButton = (item: { name: string; price: string }) => {
    const numericPrice = parseInt(item.price.replace("₹", ""));
    const itemId = item.name.toLowerCase().replace(/\s+/g, "-");
    const cartItem = mounted ? cart.find((i) => i.id === itemId) : null;

    return (
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-[#e2c569]/40 bg-[#e2c569]/10 px-2.5 py-0.5 font-cinzel text-xs font-bold text-[#e2c569] shadow-[0_0_10px_rgba(226,197,105,0.1)]">
          {item.price}
        </span>
        {cartItem ? (
          <div className="flex items-center gap-1 rounded-lg border border-[#e2c569] bg-[#e2c569] px-2 py-0.5 font-bold text-black text-xs">
            <button onClick={() => updateQuantity(cartItem.id, -1)} className="hover:scale-125 transition-transform px-1">-</button>
            <span className="px-1">{cartItem.quantity}</span>
            <button onClick={() => updateQuantity(cartItem.id, 1)} className="hover:scale-125 transition-transform px-1">+</button>
          </div>
        ) : (
          <button
            onClick={() => addToCart({ id: itemId, name: item.name, price: numericPrice, category: "Menu" })}
            className="flex items-center gap-1 rounded-lg border border-[#e2c569]/60 bg-[#e2c569]/10 px-2.5 py-0.5 font-cinzel text-[11px] font-bold text-[#e2c569] transition-all hover:bg-[#e2c569] hover:text-black shadow-sm"
          >
            <Plus className="h-3 w-3" /> ADD
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white selection:bg-[#e2c569] selection:text-black">
      {/* Top Banner Notice */}
      <div className="border-b border-[#e2c569]/20 bg-neutral-900/60 py-2.5 text-center text-xs tracking-widest text-[#e2c569] uppercase font-cinzel">
        ✨ WELCOME TO YOUR HAPPY PLACE — GOOD COFFEE, GOOD FOOD & BETTER COMPANY ✨
      </div>

      <Container className="py-8 lg:py-12">
        {/* Main Poster Split Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:gap-10">
          
          {/* LEFT PANEL: Branding, ESTD 2023, Hero Image, 4 Features & Footer */}
          <Reveal className="flex flex-col justify-between rounded-3xl border border-[#e2c569]/30 bg-gradient-to-b from-[#141414] to-[#090909] p-6 sm:p-10 shadow-[0_0_50px_rgba(226,197,105,0.08)]">
            <div>
              {/* ESTD Badge */}
              <div className="flex items-center justify-between border-b border-[#e2c569]/20 pb-6">
                <div className="flex flex-col items-center">
                  <Coffee className="h-6 w-6 text-[#e2c569]" />
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#e2c569]/80 mt-1">
                    ESTD 2023
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#e2c569]/30 bg-[#e2c569]/10 px-4 py-1.5 text-xs text-[#e2c569] font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Dine-In & Takeaway</span>
                </div>
              </div>

              {/* Title & Cursive Script Brand */}
              <div className="mt-8 text-center">
                <h1 className="font-cinzel text-5xl font-bold tracking-[0.25em] text-[#e2c569] sm:text-6xl lg:text-7xl drop-shadow-md">
                  KHOKHARZ
                </h1>
                <div className="-mt-4 sm:-mt-6 font-script text-5xl text-[#f3e198] sm:text-6xl lg:text-7xl">
                  Cafe
                </div>

                <div className="mt-4 flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-neutral-400 font-cinzel uppercase">
                  <span>COFFEE</span>
                  <span className="text-[#e2c569]">♦</span>
                  <span>FOOD</span>
                  <span className="text-[#e2c569]">♦</span>
                  <span>MOMENTS</span>
                </div>

                {/* Welcome Quote */}
                <div className="mt-6 border-y border-[#e2c569]/20 py-4">
                  <p className="text-sm text-neutral-300">
                    Great coffee, good food and better company.
                  </p>
                  <p className="font-script text-2xl text-[#e2c569] mt-1">
                    Welcome to your happy place.
                  </p>
                </div>
              </div>

              {/* Hero Image in Luxury Frame */}
              <div className="group relative mt-8 overflow-hidden rounded-2xl border border-[#e2c569]/40 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Khokharz Cafe Steaming Latte Art"
                  className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[340px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-neutral-950/80 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2c569]/20 text-[#e2c569]">
                      <Coffee className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-cinzel text-xs font-bold text-[#e2c569] tracking-wider">SPECIALTY COFFEE</p>
                      <p className="text-xs text-neutral-300">Brewed fresh daily with precision</p>
                    </div>
                  </div>
                  <Link
                    to="/menu"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e2c569] text-black transition-transform group-hover:translate-x-1"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* 4 Feature Badges Grid Box with Animated Gold Underlines */}
              <div className="mt-8 rounded-2xl border border-[#e2c569]/30 bg-neutral-900/50 p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {/* PREMIUM BEANS */}
                  <div className="group relative overflow-hidden flex flex-col items-center justify-between text-center px-2 py-3.5 rounded-xl border border-[#e2c569]/20 bg-black/50 transition-all duration-300 hover:border-[#e2c569]/70 hover:bg-neutral-900/90 hover:shadow-[0_0_20px_rgba(226,197,105,0.15)]">
                    <Flame className="h-5 w-5 text-[#e2c569] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                    <span className="relative z-10 font-cinzel text-[10px] font-bold tracking-wider text-[#e2c569] mt-2 group-hover:text-amber-200">
                      PREMIUM BEANS
                      {/* Animated Expanding Gold Underline */}
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent shadow-[0_0_10px_#e2c569] transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e2c569] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* EXPERTLY BREWED */}
                  <div className="group relative overflow-hidden flex flex-col items-center justify-between text-center px-2 py-3.5 rounded-xl border border-[#e2c569]/20 bg-black/50 transition-all duration-300 hover:border-[#e2c569]/70 hover:bg-neutral-900/90 hover:shadow-[0_0_20px_rgba(226,197,105,0.15)]">
                    <Coffee className="h-5 w-5 text-[#e2c569] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                    <span className="relative z-10 font-cinzel text-[10px] font-bold tracking-wider text-[#e2c569] mt-2 group-hover:text-amber-200">
                      EXPERTLY BREWED
                      {/* Animated Expanding Gold Underline */}
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent shadow-[0_0_10px_#e2c569] transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e2c569] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* FRESH & NATURAL */}
                  <div className="group relative overflow-hidden flex flex-col items-center justify-between text-center px-2 py-3.5 rounded-xl border border-[#e2c569]/20 bg-black/50 transition-all duration-300 hover:border-[#e2c569]/70 hover:bg-neutral-900/90 hover:shadow-[0_0_20px_rgba(226,197,105,0.15)]">
                    <Leaf className="h-5 w-5 text-[#e2c569] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                    <span className="relative z-10 font-cinzel text-[10px] font-bold tracking-wider text-[#e2c569] mt-2 group-hover:text-amber-200">
                      FRESH & NATURAL
                      {/* Animated Expanding Gold Underline */}
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent shadow-[0_0_10px_#e2c569] transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e2c569] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* COZY AMBIENCE */}
                  <div className="group relative overflow-hidden flex flex-col items-center justify-between text-center px-2 py-3.5 rounded-xl border border-[#e2c569]/20 bg-black/50 transition-all duration-300 hover:border-[#e2c569]/70 hover:bg-neutral-900/90 hover:shadow-[0_0_20px_rgba(226,197,105,0.15)]">
                    <Armchair className="h-5 w-5 text-[#e2c569] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                    <span className="relative z-10 font-cinzel text-[10px] font-bold tracking-wider text-[#e2c569] mt-2 group-hover:text-amber-200">
                      COZY AMBIENCE
                      {/* Animated Expanding Gold Underline */}
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent shadow-[0_0_10px_#e2c569] transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e2c569] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact Strip */}
            <div className="mt-8 border-t border-[#e2c569]/20 pt-4 text-xs text-neutral-400">
              <div className="flex flex-wrap items-center justify-between gap-3 font-cinzel tracking-wider">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <MapPin className="h-3.5 w-3.5 text-[#e2c569]" />
                  <span>5151 Terminal Rd, Halifax, USA</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="h-3.5 w-3.5 text-[#e2c569]" />
                  <span>{SITE.phone}</span>
                </span>
                <a href="https://instagram.com/shamsher_pb29" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-[#e2c569]">
                  <Instagram className="h-3.5 w-3.5 text-[#e2c569]" />
                  <span>@shamsher_pb29</span>
                </a>
                <a href="https://facebook.com/shamshersamadh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-[#e2c569]">
                  <Facebook className="h-3.5 w-3.5 text-[#e2c569]" />
                  <span>@shamshersamadh</span>
                </a>
                <a href="https://youtube.com/@735wale" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-[#e2c569]">
                  <Youtube className="h-3.5 w-3.5 text-[#e2c569]" />
                  <span>@735wale</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* RIGHT PANEL: OUR MENU & Perfect Pairings */}
          <div className="flex flex-col gap-8">
            
            {/* Main Menu Box */}
            <Reveal className="rounded-3xl border border-[#e2c569]/30 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-6 sm:p-10 shadow-[0_0_50px_rgba(226,197,105,0.06)]">
              {/* Menu Title */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-lg font-cinzel tracking-[0.25em] text-[#e2c569]">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e2c569]" />
                  <span>♦ OUR MENU ♦</span>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e2c569]" />
                </div>
              </div>

              {/* Menu Columns Grid */}
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                
                {/* Column 1: Coffee & Non Coffee */}
                <div className="space-y-8">
                  {/* COFFEE */}
                  <div>
                    <h3 className="flex items-center gap-2 font-cinzel text-sm font-bold tracking-[0.2em] text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
                      <Coffee className="h-4 w-4 text-[#e2c569]" />
                      <span>COFFEE</span>
                    </h3>
                    <ul className="mt-3.5 space-y-3 text-xs sm:text-sm">
                      {coffeeItems.map((item) => (
                        <li key={item.name} className="group flex items-center justify-between gap-2 rounded-lg p-1 transition-colors hover:bg-neutral-900/60">
                          <span className="flex items-center gap-2">
                            <span className="text-neutral-200 transition-colors group-hover:text-[#e2c569] font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.2 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="mx-1 flex-1 border-b border-dotted border-neutral-700/80 group-hover:border-[#e2c569]/60" />
                          {renderItemOrderButton(item)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* NON COFFEE */}
                  <div>
                    <h3 className="flex items-center gap-2 font-cinzel text-sm font-bold tracking-[0.2em] text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
                      <ShoppingBag className="h-4 w-4 text-[#e2c569]" />
                      <span>NON COFFEE</span>
                    </h3>
                    <ul className="mt-3.5 space-y-3 text-xs sm:text-sm">
                      {nonCoffeeItems.map((item) => (
                        <li key={item.name} className="group flex items-center justify-between gap-2 rounded-lg p-1 transition-colors hover:bg-neutral-900/60">
                          <span className="flex items-center gap-2">
                            <span className="text-neutral-200 transition-colors group-hover:text-[#e2c569] font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.2 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="mx-1 flex-1 border-b border-dotted border-neutral-700/80 group-hover:border-[#e2c569]/60" />
                          {renderItemOrderButton(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 2: Food & Takeaway Box */}
                <div className="space-y-8 flex flex-col justify-between">
                  {/* FOOD */}
                  <div>
                    <h3 className="flex items-center gap-2 font-cinzel text-sm font-bold tracking-[0.2em] text-[#e2c569] uppercase border-b border-[#e2c569]/20 pb-2">
                      <Utensils className="h-4 w-4 text-[#e2c569]" />
                      <span>FOOD</span>
                    </h3>
                    <ul className="mt-3.5 space-y-3 text-xs sm:text-sm">
                      {foodItems.map((item) => (
                        <li key={item.name} className="group flex items-center justify-between gap-2 rounded-lg p-1 transition-colors hover:bg-neutral-900/60">
                          <span className="flex items-center gap-2">
                            <span className="text-neutral-200 transition-colors group-hover:text-[#e2c569] font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.2 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="mx-1 flex-1 border-b border-dotted border-neutral-700/80 group-hover:border-[#e2c569]/60" />
                          {renderItemOrderButton(item)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Takeaway Available Box */}
                  <div className="rounded-2xl border border-[#e2c569]/40 bg-[#e2c569]/10 p-4 text-center shadow-md">
                    <div className="flex items-center justify-center gap-2 text-sm font-cinzel font-bold tracking-widest text-[#e2c569]">
                      <ShoppingBag className="h-4 w-4" />
                      <span>TAKEAWAY AVAILABLE</span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-300">
                      Good coffee, wherever you go.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Perfect Pairings Section */}
            <Reveal delay={100} className="rounded-3xl border border-[#e2c569]/30 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2c569]/20 pb-4 gap-2">
                <div>
                  <h3 className="font-script text-3xl text-[#e2c569] flex items-center gap-2">
                    <span>Perfect Pairings</span>
                    <Heart className="h-4 w-4 text-[#e2c569] fill-current" />
                  </h3>
                  <p className="font-cinzel text-[11px] tracking-widest text-neutral-400 uppercase">
                    GOOD COFFEE DESERVES GREAT FOOD
                  </p>
                </div>
                <Link
                  to="/location"
                  className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold text-[#e2c569] hover:underline"
                >
                  <span>Visit Location</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Pairings Circular Split Cards Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {pairings.map((p) => (
                  <div key={p.title} className="group flex flex-col items-center rounded-2xl border border-[#e2c569]/20 bg-neutral-900/60 p-4 text-center transition-all duration-300 hover:border-[#e2c569]/60 hover:bg-neutral-900">
                    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#e2c569]/50 p-1 group-hover:scale-105 transition-transform">
                      <div className="flex h-full w-full overflow-hidden rounded-full">
                        <img src={p.img1} alt="" className="h-full w-1/2 object-cover" />
                        <img src={p.img2} alt="" className="h-full w-1/2 object-cover" />
                      </div>
                    </div>
                    <span className="mt-3 font-cinzel text-xs font-bold tracking-wider text-[#e2c569]">{p.title}</span>
                    <span className="mt-1 text-[11px] text-neutral-400">{p.tag}</span>
                  </div>
                ))}
              </div>

              {/* Thank You & Relax Notice */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-[#e2c569]/20 bg-neutral-950 p-4 text-center sm:text-left gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e2c569]/40 bg-[#e2c569]/10 text-[#e2c569]">
                    <Armchair className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-script text-xl text-[#e2c569]">A space to relax, work and unwind.</p>
                    <p className="font-cinzel text-[10px] tracking-wider text-neutral-400 uppercase">
                      THANK YOU FOR SUPPORTING LOCAL & LOVING KHOKHARZ CAFE! ♡
                    </p>
                  </div>
                </div>

                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-[#e2c569] px-5 py-2.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-md"
                >
                  GET DIRECTIONS
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </Container>

      {/* Story Cinema Reel Carousel */}
      <StorySlider />

      {/* Frequently Asked Questions Section */}
      <FaqSection />
    </div>
  );
}
