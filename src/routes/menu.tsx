import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Coffee, Utensils, ShoppingBag, Heart, Sparkles, MapPin, Phone, Plus, Minus } from "lucide-react";
import coffeeImg from "@/assets/coffee-pour.jpg";
import breakfastImg from "@/assets/breakfast.jpg";
import butterChickenImg from "@/assets/butter-chicken.jpg";
import focacciaImg from "@/assets/focaccia.jpg";
import espressoImg from "@/assets/espresso.jpg";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/context/CartContext";
import { DIRECTIONS_URL } from "@/lib/site";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Khokharz Cafe" },
      {
        name: "description",
        content:
          "Explore our menu of specialty coffee, non-coffee teas, focaccia sandwiches, pasta, and fresh bakery items at Khokharz Cafe.",
      },
      { property: "og:title", content: "Menu — Khokharz Cafe" },
    ],
  }),
  component: MenuPage,
});

const menuCategories = [
  {
    id: "coffee",
    title: "COFFEE",
    icon: Coffee,
    items: [
      { name: "Espresso", price: "₹120", desc: "Pure intense single or double shot" },
      { name: "Americano", price: "₹140", desc: "Espresso diluted with hot water" },
      { name: "Cappuccino", price: "₹160", desc: "Equal parts espresso, steamed milk & foam" },
      { name: "Latte", price: "₹160", desc: "Rich espresso topped with velvety steamed milk" },
      { name: "Mocha", price: "₹180", desc: "Espresso with dark cocoa & silky milk" },
      { name: "Caramel Macchiato", price: "₹190", desc: "Vanilla milk stained with espresso & caramel" },
      { name: "Cold Coffee", price: "₹170", desc: "Chilled blended coffee served over ice" },
      { name: "Iced Latte", price: "₹180", desc: "Chilled espresso & milk over fresh ice" },
    ],
  },
  {
    id: "non-coffee",
    title: "NON COFFEE",
    icon: ShoppingBag,
    items: [
      { name: "Hot Chocolate", price: "₹150", desc: "Rich Belgian chocolate with steamed milk" },
      { name: "Matcha Latte", price: "₹170", desc: "Japanese ceremonial green tea & milk" },
      { name: "Chai Latte", price: "₹120", desc: "Spiced black tea infused with warm milk" },
      { name: "Iced Tea", price: "₹120", desc: "Freshly brewed fruit & herbal iced tea" },
      { name: "Lemonade", price: "₹110", desc: "Hand-squeezed citrus lemonade" },
    ],
  },
  {
    id: "food",
    title: "FOOD & BITES",
    icon: Utensils,
    items: [
      { name: "Veg Sandwich", price: "₹160", desc: "Fresh garden vegetables & mint chutney" },
      { name: "Cheese Sandwich", price: "₹180", desc: "Melted cheddar & mozzarella on brioche" },
      { name: "Pasta (Red/White Sauce)", price: "₹210", desc: "Penne in authentic marinara or cream sauce" },
      { name: "French Fries", price: "₹120", desc: "Golden crispy seasoned potato fries" },
      { name: "Garlic Bread", price: "₹130", desc: "Toasted baguette with herb garlic butter" },
      { name: "Chocolate Brownie", price: "₹150", desc: "Fudgy warm chocolate brownie" },
    ],
  },
];

function MenuPage() {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const getItemPrice = (basePriceStr: string, sizeOption?: string) => {
    const base = parseInt(basePriceStr.replace("₹", ""));
    if (sizeOption === "Large (+₹30)") return base + 30;
    if (sizeOption === "4 Pcs (+₹50)") return base + 50;
    return base;
  };

  const handleSizeChange = (itemName: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemName]: size }));
  };

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white pb-20">
      <Container className="py-12">
        {/* Menu Header */}
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 text-sm font-cinzel tracking-[0.3em] text-[#e2c569]">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e2c569]" />
            <span>─── ♦ OUR MENU ♦ ───</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e2c569]" />
          </div>
          <h1 className="mt-4 font-cinzel text-4xl font-bold tracking-[0.2em] text-[#e2c569] sm:text-5xl">
            KHOKHARZ CAFE
          </h1>
          <p className="mt-2 font-script text-3xl text-[#f5e4a8]">
            Great coffee, good food & better company.
          </p>
        </Reveal>

        {/* Takeaway & Info Banner */}
        <Reveal delay={60} className="mt-8 rounded-2xl border border-[#e2c569]/30 bg-gradient-to-r from-[#141414] via-[#1a1810] to-[#141414] p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2c569]/20 text-[#e2c569]">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-cinzel text-sm font-bold tracking-widest text-[#e2c569]">TAKEAWAY & DINE-IN AVAILABLE</h3>
                <p className="text-xs text-neutral-300">Good coffee, wherever you go.</p>
              </div>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#e2c569] bg-[#e2c569] px-6 py-2.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300"
            >
              GET DIRECTIONS
            </a>
          </div>
        </Reveal>

        {/* Menu Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {menuCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={i * 80} className="rounded-3xl border border-[#e2c569]/30 bg-[#121212] p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#e2c569]/20 pb-4">
                    <div className="flex items-center gap-2.5 font-cinzel text-lg font-bold tracking-widest text-[#e2c569]">
                      <Icon className="h-5 w-5 text-[#e2c569]" />
                      <span>{cat.title}</span>
                    </div>
                    <span className="text-xs text-neutral-400 font-cinzel">{cat.items.length} Items</span>
                  </div>

                  <ul className="mt-6 space-y-5">
                    {cat.items.map((item) => {
                      const isFood = cat.id === "food";
                      const defaultSize = isFood ? "2 Pcs" : "Regular";
                      const currentSize = selectedSizes[item.name] || defaultSize;
                      const finalPrice = getItemPrice(item.price, currentSize);
                      const itemId = `${item.name.toLowerCase().replace(/\s+/g, "-")}-${currentSize.toLowerCase().replace(/\s+/g, "")}`;
                      const cartItem = cart.find((c) => c.id === itemId);

                      return (
                        <li key={item.name} className="group border-b border-neutral-800/60 pb-4 transition-colors hover:bg-neutral-900/40 p-2.5 rounded-2xl">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-medium text-sm text-neutral-100 transition-colors group-hover:text-[#e2c569]">
                                {item.name}
                              </span>
                              <p className="mt-0.5 text-[11px] text-neutral-400 italic">
                                {item.desc}
                              </p>
                            </div>
                            <span className="rounded-md border border-[#e2c569]/40 bg-[#e2c569]/10 px-2.5 py-0.5 font-cinzel text-xs font-bold text-[#e2c569]">
                              ₹{finalPrice}
                            </span>
                          </div>

                          {/* Options / Portion Selection & Order Button Grid */}
                          <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-neutral-800/40">
                            {/* Portion Pills */}
                            <div className="flex items-center gap-1">
                              {isFood ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleSizeChange(item.name, "2 Pcs")}
                                    className={`rounded-md border px-2 py-0.5 font-cinzel text-[10px] font-bold transition-all ${
                                      currentSize === "2 Pcs"
                                        ? "border-[#e2c569] bg-[#e2c569] text-black"
                                        : "border-neutral-800 bg-black/60 text-neutral-400 hover:text-white"
                                    }`}
                                  >
                                    2 Pcs
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSizeChange(item.name, "4 Pcs (+₹50)")}
                                    className={`rounded-md border px-2 py-0.5 font-cinzel text-[10px] font-bold transition-all ${
                                      currentSize === "4 Pcs (+₹50)"
                                        ? "border-[#e2c569] bg-[#e2c569] text-black"
                                        : "border-neutral-800 bg-black/60 text-neutral-400 hover:text-white"
                                    }`}
                                  >
                                    4 Pcs (+₹50)
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleSizeChange(item.name, "Regular")}
                                    className={`rounded-md border px-2 py-0.5 font-cinzel text-[10px] font-bold transition-all ${
                                      currentSize === "Regular"
                                        ? "border-[#e2c569] bg-[#e2c569] text-black"
                                        : "border-neutral-800 bg-black/60 text-neutral-400 hover:text-white"
                                    }`}
                                  >
                                    Regular
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSizeChange(item.name, "Large (+₹30)")}
                                    className={`rounded-md border px-2 py-0.5 font-cinzel text-[10px] font-bold transition-all ${
                                      currentSize === "Large (+₹30)"
                                        ? "border-[#e2c569] bg-[#e2c569] text-black"
                                        : "border-neutral-800 bg-black/60 text-neutral-400 hover:text-white"
                                    }`}
                                  >
                                    Large (+₹30)
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Add / Stepper Control */}
                            {cartItem ? (
                              <div className="flex items-center gap-1.5 rounded-lg border border-[#e2c569] bg-[#e2c569] px-2.5 py-1 font-bold text-black text-xs">
                                <button onClick={() => updateQuantity(cartItem.id, -1)} className="hover:scale-125 transition-transform font-bold px-1">-</button>
                                <span className="px-1 font-cinzel font-bold">{cartItem.quantity}</span>
                                <button onClick={() => updateQuantity(cartItem.id, 1)} className="hover:scale-125 transition-transform font-bold px-1">+</button>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  addToCart({
                                    id: itemId,
                                    name: `${item.name} (${currentSize})`,
                                    price: finalPrice,
                                    size: currentSize,
                                    category: cat.title,
                                  })
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-[#e2c569] bg-[#e2c569]/15 px-3 py-1 font-cinzel text-xs font-bold text-[#e2c569] transition-all hover:bg-[#e2c569] hover:text-black shadow-sm"
                              >
                                <Plus className="h-3.5 w-3.5" /> ADD
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl border border-[#e2c569]/15 bg-black/40 p-3 text-center text-xs text-neutral-400 font-cinzel">
                  ✨ Prepared fresh to order
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Feature Card */}
        <Reveal delay={150} className="mt-12 rounded-3xl border border-[#e2c569]/30 bg-[#121212] p-8 text-center">
          <h3 className="font-script text-3xl text-[#e2c569]">A space to relax, work and unwind.</h3>
          <p className="mt-2 font-cinzel text-xs tracking-widest text-neutral-400 uppercase">
            THANK YOU FOR SUPPORTING LOCAL & LOVING KHOKHARZ CAFE! ♡
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
