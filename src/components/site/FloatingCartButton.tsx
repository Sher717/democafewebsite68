import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function FloatingCartButton() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="group relative flex items-center gap-3.5 rounded-full border border-[#d4af37] bg-gradient-to-r from-[#18140c] via-[#0f0c08] to-[#18140c] px-5 py-3 text-white shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af37] text-black">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
            {totalItems}
          </span>
        </div>

        <div className="text-left font-cinzel">
          <p className="text-[10px] tracking-wider text-neutral-400 uppercase">ONLINE CART</p>
          <p className="text-xs font-bold text-[#d4af37]">₹{totalPrice}</p>
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] transition-transform group-hover:translate-x-1 group-hover:bg-[#d4af37] group-hover:text-black">
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
