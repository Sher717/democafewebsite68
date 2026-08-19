import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Coffee, ChevronRight, Star, ShoppingBag, Award, Tag, ArrowRight, Utensils, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import espressoImg from "@/assets/espresso.jpg";
import coffeeImg from "@/assets/coffee-pour.jpg";
import breakfastImg from "@/assets/breakfast.jpg";
import focacciaImg from "@/assets/focaccia.jpg";
import butterChickenImg from "@/assets/butter-chicken.jpg";

interface MegaMenuProps {
  onClose?: () => void;
}

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  to: string;
  img: string;
  category: string;
}

const coffeeItems: MenuItem[] = [
  { name: "Espresso", price: "₹120", desc: "Pure intense single or double shot espresso", to: "/menu", img: espressoImg, category: "COFFEE" },
  { name: "Americano", price: "₹140", desc: "Espresso diluted with steaming hot water", to: "/menu", img: coffeeImg, category: "COFFEE" },
  { name: "Cappuccino", price: "₹160", desc: "Equal parts espresso, steamed milk & foam", to: "/menu", img: heroImg, category: "COFFEE" },
  { name: "Latte", price: "₹160", desc: "Rich espresso topped with velvety steamed milk", to: "/menu", img: coffeeImg, category: "COFFEE" },
  { name: "Mocha", price: "₹180", desc: "Espresso infused with dark cocoa & milk", to: "/menu", img: espressoImg, category: "COFFEE" },
  { name: "Caramel Macchiato", price: "₹190", desc: "Vanilla milk stained with espresso & caramel", to: "/menu", img: coffeeImg, category: "COFFEE" },
  { name: "Cold Coffee", price: "₹170", desc: "Chilled blended coffee served over ice", to: "/menu", img: heroImg, category: "COFFEE" },
  { name: "Iced Latte", price: "₹180", desc: "Chilled espresso & milk over fresh ice", to: "/menu", img: espressoImg, category: "COFFEE" },
];

const nonCoffeeItems: MenuItem[] = [
  { name: "Hot Chocolate", price: "₹150", desc: "Rich Belgian chocolate with steamed milk", to: "/menu", img: coffeeImg, category: "NON-COFFEE" },
  { name: "Matcha Latte", price: "₹170", desc: "Japanese ceremonial green tea & milk", to: "/menu", img: heroImg, category: "NON-COFFEE" },
  { name: "Chai Latte", price: "₹120", desc: "Spiced black tea infused with warm milk", to: "/menu", img: coffeeImg, category: "NON-COFFEE" },
  { name: "Iced Tea", price: "₹120", desc: "Freshly brewed fruit & herbal iced tea", to: "/menu", img: espressoImg, category: "NON-COFFEE" },
  { name: "Lemonade", price: "₹110", desc: "Hand-squeezed citrus lemonade with mint", to: "/menu", img: heroImg, category: "NON-COFFEE" },
  { name: "Smoothies", price: "₹180", desc: "Fresh blended tropical fruit smoothie", to: "/menu", img: coffeeImg, category: "NON-COFFEE" },
  { name: "Milkshakes", price: "₹190", desc: "Thick creamy gourmet milkshakes", to: "/menu", img: espressoImg, category: "NON-COFFEE" },
];

const foodItems: MenuItem[] = [
  { name: "Veg Sandwich", price: "₹160", desc: "Fresh garden vegetables & mint chutney", to: "/menu", img: breakfastImg, category: "FOOD" },
  { name: "Cheese Sandwich", price: "₹180", desc: "Melted cheddar & mozzarella on brioche", to: "/menu", img: breakfastImg, category: "FOOD" },
  { name: "Pasta", price: "₹210", desc: "Penne in authentic marinara or cream sauce", to: "/menu", img: butterChickenImg, category: "FOOD" },
  { name: "Pizza", price: "₹250", desc: "Hand-tossed woodfired artisan pizza", to: "/menu", img: focacciaImg, category: "FOOD" },
  { name: "French Fries", price: "₹120", desc: "Golden crispy seasoned potato fries", to: "/menu", img: focacciaImg, category: "FOOD" },
  { name: "Garlic Bread", price: "₹130", desc: "Toasted baguette with herb garlic butter", to: "/menu", img: focacciaImg, category: "FOOD" },
  { name: "Salads", price: "₹190", desc: "Crisp Caesar salad with garlic croutons", to: "/menu", img: butterChickenImg, category: "FOOD" },
  { name: "Desserts", price: "₹150", desc: "Fudgy warm chocolate brownie & cake", to: "/menu", img: breakfastImg, category: "FOOD" },
];

const chefSpecials = [
  {
    title: "Hazelnut Latte",
    desc: "Smooth espresso with hazelnut & steamed milk.",
    price: "₹190",
    badge: "BESTSELLER",
    img: espressoImg,
  },
  {
    title: "Iced Caramel Coffee",
    desc: "Chilled coffee with caramel & a touch of cream.",
    price: "₹180",
    badge: "MUST TRY",
    img: coffeeImg,
  },
  {
    title: "Pesto Pasta",
    desc: "Classic pesto pasta with herbs & parmesan.",
    price: "₹210",
    badge: "POPULAR",
    img: butterChickenImg,
  },
];

export function MegaMenu({ onClose }: MegaMenuProps) {
  const [activeHoverItem, setActiveHoverItem] = useState<MenuItem | null>(null);

  return (
    <div
      className="absolute top-full left-0 right-0 z-50 pointer-events-auto transition-all duration-300 ease-out"
      style={{
        animation: "megaMenuExpand 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-3 py-3">
        {/* Luxury Obsidian Card with Gold Halo */}
        <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#0f0c08]/98 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-[#d4af37]/20">
          
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#b88c4a]/5 blur-3xl pointer-events-none" />

          {/* Main 5-Column Grid */}
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1.3fr]">
            
            {/* Column 1: Dynamic Spotlight Preview Window */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-black/80 to-neutral-950 p-5 text-center transition-all duration-500 shadow-inner overflow-hidden">
              <div>
                <p className="font-script text-3xl text-[#d4af37] transition-transform duration-300 group-hover:scale-105">
                  {activeHoverItem ? activeHoverItem.category : "Good Coffee"}
                </p>
                <h3 className="font-script text-4xl text-[#f5e4a8] -mt-2">
                  {activeHoverItem ? activeHoverItem.name : "Great Vibes"}
                </h3>
                <div className="my-3 h-[1px] w-12 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                <p className="text-xs leading-relaxed text-neutral-300 font-sans min-h-[32px] transition-all duration-300">
                  {activeHoverItem ? activeHoverItem.desc : "Handcrafted coffee, delicious food and memorable moments."}
                </p>
              </div>

              {/* Dynamic Scaling Image Preview */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-xl group/img">
                <img
                  key={activeHoverItem ? activeHoverItem.name : "default"}
                  src={activeHoverItem ? activeHoverItem.img : heroImg}
                  alt={activeHoverItem ? activeHoverItem.name : "Latte Art"}
                  className="h-40 w-full object-cover transition-all duration-700 ease-out transform scale-100 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#d4af37] uppercase bg-black/70 px-2 py-0.5 rounded border border-[#d4af37]/30 backdrop-blur-sm">
                    {activeHoverItem ? activeHoverItem.price : "KHOKHARZ CAFE"}
                  </span>
                  <Link
                    to={activeHoverItem ? activeHoverItem.to : "/menu"}
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37] text-black transition-transform duration-300 hover:scale-110"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: COFFEE Category */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#d4af37]/15 bg-black/40 p-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2.5 font-cinzel text-xs font-bold tracking-widest text-[#d4af37]">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-[#d4af37]" />
                    <span>COFFEE</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-cinzel">{coffeeItems.length} items</span>
                </div>

                <ul className="mt-3 space-y-1.5 text-xs">
                  {coffeeItems.map((item) => {
                    const isHovered = activeHoverItem?.name === item.name;
                    const isAnyHovered = activeHoverItem !== null;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          onMouseEnter={() => setActiveHoverItem(item)}
                          onMouseLeave={() => setActiveHoverItem(null)}
                          className={`group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-all duration-300 ${
                            isHovered
                              ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-[1.02]"
                              : isAnyHovered
                              ? "text-neutral-400 opacity-50 blur-[0.3px]"
                              : "text-neutral-300 hover:text-[#d4af37]"
                          }`}
                        >
                          <span className={`relative z-10 transition-transform duration-300 font-medium ${isHovered ? "translate-x-1.5 text-white" : ""}`}>
                            {item.name}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className={`font-cinzel text-[11px] font-bold ${isHovered ? "text-[#d4af37]" : "text-[#d4af37]/80"}`}>
                              {item.price}
                            </span>
                            <ChevronRight
                              className={`h-3 w-3 text-[#d4af37] transition-all duration-300 ${
                                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                              }`}
                            />
                          </div>

                          {/* Thin Animated Gold Underline */}
                          <span
                            className={`absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#d4af37] transition-transform duration-300 origin-left ${
                              isHovered ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link
                to="/menu"
                onClick={onClose}
                className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#d4af37]/30 bg-black/60 py-2 font-cinzel text-[10px] font-bold tracking-widest text-[#d4af37] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Column 3: NON-COFFEE Category */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#d4af37]/15 bg-black/40 p-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2.5 font-cinzel text-xs font-bold tracking-widest text-[#d4af37]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#d4af37]" />
                    <span>NON-COFFEE</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-cinzel">{nonCoffeeItems.length} items</span>
                </div>

                <ul className="mt-3 space-y-1.5 text-xs">
                  {nonCoffeeItems.map((item) => {
                    const isHovered = activeHoverItem?.name === item.name;
                    const isAnyHovered = activeHoverItem !== null;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          onMouseEnter={() => setActiveHoverItem(item)}
                          onMouseLeave={() => setActiveHoverItem(null)}
                          className={`group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-all duration-300 ${
                            isHovered
                              ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-[1.02]"
                              : isAnyHovered
                              ? "text-neutral-400 opacity-50 blur-[0.3px]"
                              : "text-neutral-300 hover:text-[#d4af37]"
                          }`}
                        >
                          <span className={`relative z-10 transition-transform duration-300 font-medium ${isHovered ? "translate-x-1.5 text-white" : ""}`}>
                            {item.name}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className={`font-cinzel text-[11px] font-bold ${isHovered ? "text-[#d4af37]" : "text-[#d4af37]/80"}`}>
                              {item.price}
                            </span>
                            <ChevronRight
                              className={`h-3 w-3 text-[#d4af37] transition-all duration-300 ${
                                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                              }`}
                            />
                          </div>

                          {/* Thin Animated Gold Underline */}
                          <span
                            className={`absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#d4af37] transition-transform duration-300 origin-left ${
                              isHovered ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link
                to="/menu"
                onClick={onClose}
                className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#d4af37]/30 bg-black/60 py-2 font-cinzel text-[10px] font-bold tracking-widest text-[#d4af37] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Column 4: FOOD Category */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#d4af37]/15 bg-black/40 p-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2.5 font-cinzel text-xs font-bold tracking-widest text-[#d4af37]">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-[#d4af37]" />
                    <span>FOOD</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-cinzel">{foodItems.length} items</span>
                </div>

                <ul className="mt-3 space-y-1.5 text-xs">
                  {foodItems.map((item) => {
                    const isHovered = activeHoverItem?.name === item.name;
                    const isAnyHovered = activeHoverItem !== null;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          onMouseEnter={() => setActiveHoverItem(item)}
                          onMouseLeave={() => setActiveHoverItem(null)}
                          className={`group relative flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-all duration-300 ${
                            isHovered
                              ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-[1.02]"
                              : isAnyHovered
                              ? "text-neutral-400 opacity-50 blur-[0.3px]"
                              : "text-neutral-300 hover:text-[#d4af37]"
                          }`}
                        >
                          <span className={`relative z-10 transition-transform duration-300 font-medium ${isHovered ? "translate-x-1.5 text-white" : ""}`}>
                            {item.name}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className={`font-cinzel text-[11px] font-bold ${isHovered ? "text-[#d4af37]" : "text-[#d4af37]/80"}`}>
                              {item.price}
                            </span>
                            <ChevronRight
                              className={`h-3 w-3 text-[#d4af37] transition-all duration-300 ${
                                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                              }`}
                            />
                          </div>

                          {/* Thin Animated Gold Underline */}
                          <span
                            className={`absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#d4af37] transition-transform duration-300 origin-left ${
                              isHovered ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link
                to="/menu"
                onClick={onClose}
                className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#d4af37]/30 bg-black/60 py-2 font-cinzel text-[10px] font-bold tracking-widest text-[#d4af37] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Column 5: CHEF'S SPECIAL */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#d4af37]/25 bg-gradient-to-b from-[#18140c] to-[#0c0a06] p-4 shadow-lg">
              <div>
                <div className="flex items-center gap-2 border-b border-[#d4af37]/30 pb-2.5 font-cinzel text-xs font-bold tracking-widest text-[#d4af37]">
                  <Star className="h-4 w-4 fill-current text-[#d4af37]" />
                  <span>CHEF'S SPECIAL</span>
                </div>

                <div className="mt-3 space-y-3">
                  {chefSpecials.map((s) => (
                    <div
                      key={s.title}
                      className="group flex items-center gap-3 rounded-xl border border-[#d4af37]/15 bg-black/50 p-2.5 transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-neutral-900/80 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    >
                      <img
                        src={s.img}
                        alt={s.title}
                        className="h-12 w-12 rounded-full object-cover border border-[#d4af37]/50 shrink-0 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 px-2 py-0.2 text-[8px] font-bold text-[#d4af37] tracking-wider uppercase">
                            {s.badge}
                          </span>
                          <span className="font-cinzel text-[11px] font-bold text-[#d4af37]">{s.price}</span>
                        </div>
                        <h4 className="font-cinzel text-xs font-bold text-neutral-100 truncate mt-0.5 group-hover:text-[#d4af37]">
                          {s.title}
                        </h4>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Premium Bottom Section (3 Promo Cards with Hover Animation) */}
          <div className="relative z-10 mt-6 grid gap-4 border-t border-[#d4af37]/20 pt-5 sm:grid-cols-3">
            
            {/* Promo Card 1: TAKEAWAY */}
            <div className="group flex items-center gap-3.5 rounded-2xl border border-[#d4af37]/20 bg-black/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:bg-neutral-900/80 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <h5 className="font-cinzel text-xs font-bold tracking-wider text-[#d4af37]">TAKEAWAY</h5>
                <p className="text-[11px] text-neutral-300 mt-0.5">“Good coffee, wherever you go.”</p>
              </div>
            </div>

            {/* Promo Card 2: LOYALTY PROGRAM */}
            <div className="group flex items-center gap-3.5 rounded-2xl border border-[#d4af37]/20 bg-black/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:bg-neutral-900/80 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <h5 className="font-cinzel text-xs font-bold tracking-wider text-[#d4af37]">LOYALTY PROGRAM</h5>
                <p className="text-[11px] text-neutral-300 mt-0.5">“Earn points and unlock exciting rewards.”</p>
              </div>
            </div>

            {/* Promo Card 3: SPECIAL OFFER */}
            <div className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-[#1c170d] via-[#15120a] to-[#100d07] p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/20 text-[#d4af37] transition-transform duration-300 group-hover:scale-110">
                  <Tag className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-cinzel text-xs font-bold tracking-wider text-[#d4af37]">SPECIAL OFFER</h5>
                  <p className="text-[11px] text-neutral-200 mt-0.5">“15% OFF — First Online Order”</p>
                </div>
              </div>
              <Link
                to="/menu"
                onClick={onClose}
                className="shrink-0 rounded-lg bg-[#d4af37] px-3 py-1.5 font-cinzel text-[10px] font-bold text-black transition-all duration-300 hover:bg-amber-300 hover:scale-105 shadow-sm"
              >
                CLAIM NOW
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
