import { useState, useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight, Utensils, MapPin, Clock, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { addOrder, saveCustomerRecentOrderId, type Order } from "@/lib/adminStore";
import { OrderTrackerModal } from "./OrderTrackerModal";

export function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway" | "delivery">("dine-in");
  const [tableNo, setTableNo] = useState("Table 04");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  // If new items are added to the cart, automatically clear any stale orderSuccess state
  useEffect(() => {
    if (cart.length > 0 && orderSuccess) {
      setOrderSuccess(false);
    }
  }, [cart.length, orderSuccess]);

  if (!isCartOpen) return null;

  const taxes = Math.round(totalPrice * 0.05); // 5% GST
  const grandTotal = totalPrice + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = addOrder({
      customerName: customerName.trim() || "Guest",
      phone: phone.trim() || "N/A",
      orderType,
      tableNo: orderType === "dine-in" ? tableNo : undefined,
      instructions: instructions.trim() || undefined,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        category: i.category,
      })),
      subtotal: totalPrice,
      taxes,
      totalAmount: grandTotal,
      status: "pending",
      paymentStatus: orderType === "dine-in" ? "cash_on_counter" : "paid",
    });

    saveCustomerRecentOrderId(newOrder.id);
    setPlacedOrder(newOrder);
    clearCart(); // Clear active cart for subsequent orders
    setOrderSuccess(true);
  };

  const handleClose = () => {
    setOrderSuccess(false);
    setPlacedOrder(null);
    setIsCartOpen(false);
  };

  const handleStartNewOrder = () => {
    setOrderSuccess(false);
    setPlacedOrder(null);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-300">
        
        {/* Backdrop Click to Close */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Drawer Container */}
        <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-[#d4af37]/40 bg-[#0f0c08] p-6 text-white shadow-[0_0_80px_rgba(0,0,0,0.95)]">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
            <div className="flex items-center gap-2 font-cinzel text-lg font-bold tracking-wider text-[#d4af37]">
              <ShoppingBag className="h-5 w-5 text-[#d4af37]" />
              <span>YOUR ORDER ({totalItems})</span>
            </div>
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-neutral-900 text-[#d4af37] transition-colors hover:bg-[#d4af37] hover:text-black cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          {orderSuccess ? (
            /* Order Confirmation Receipt */
            <div className="my-auto py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="mt-6 font-cinzel text-2xl font-bold tracking-wider text-[#d4af37]">
                ORDER PLACED SUCCESSFULLY!
              </h3>
              <p className="mt-2 font-cinzel text-xs text-emerald-400 font-mono font-bold">
                ORDER ID: {placedOrder?.id || `#ORD-${Math.floor(1000 + Math.random() * 9000)}`}
              </p>

              <div className="mt-6 rounded-2xl border border-[#d4af37]/30 bg-neutral-900/80 p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Customer:</span>
                  <span className="font-bold text-white">{placedOrder?.customerName || customerName || "Guest"}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Order Type:</span>
                  <span className="font-bold text-[#d4af37] uppercase">
                    {placedOrder?.orderType || orderType} {placedOrder?.tableNo ? `(${placedOrder.tableNo})` : ""}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Estimated Time:</span>
                  <span className="font-bold text-emerald-400">10-15 Minutes</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm font-bold text-[#d4af37]">
                  <span>Total Amount:</span>
                  <span>₹{placedOrder?.totalAmount || grandTotal}</span>
                </div>
              </div>

              {/* 1-Minute cancellation callout */}
              <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300">
                <Clock className="h-4 w-4 shrink-0 text-amber-400 animate-spin" />
                <span>You can track or cancel this order within 1 minute.</span>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setShowTrackerModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4af37] bg-[#d4af37] py-3.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>TRACK ORDER LIVE & MANAGE (ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ)</span>
                </button>

                <button
                  type="button"
                  onClick={handleStartNewOrder}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-600/30 py-3 font-cinzel text-xs font-bold text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>START A NEW ORDER (ਨਵਾਂ ਆਰਡਰ ਕਰੋ)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 font-cinzel text-xs font-semibold text-neutral-300 transition-all hover:text-white cursor-pointer"
                >
                  DONE & CLOSE (ਬੰਦ ਕਰੋ)
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart State */
            <div className="my-auto text-center py-12">
              <ShoppingBag className="mx-auto h-16 w-16 text-[#d4af37]/40" />
              <h4 className="mt-4 font-cinzel text-lg font-bold text-neutral-300">YOUR CART IS EMPTY</h4>
              <p className="mt-1 text-xs text-neutral-500">Add delicious coffee & food items to start ordering online.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-xl border border-[#d4af37] bg-[#d4af37]/10 px-6 py-2.5 font-cinzel text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
              EXPLORE MENU
            </button>
          </div>
        ) : (
          /* Active Cart Items & Checkout Form */
          <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
            
            {/* Order Type Toggle */}
            <div>
              <label className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider block mb-2">
                Order Type:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("dine-in")}
                  className={`rounded-xl border py-2 text-xs font-cinzel font-bold transition-all ${
                    orderType === "dine-in"
                      ? "border-[#d4af37] bg-[#d4af37] text-black"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  Dine-In
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`rounded-xl border py-2 text-xs font-cinzel font-bold transition-all ${
                    orderType === "takeaway"
                      ? "border-[#d4af37] bg-[#d4af37] text-black"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`rounded-xl border py-2 text-xs font-cinzel font-bold transition-all ${
                    orderType === "delivery"
                      ? "border-[#d4af37] bg-[#d4af37] text-black"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  Delivery
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#d4af37]/20 bg-neutral-900/70 p-3">
                  <div className="min-w-0 flex-1">
                    <h5 className="font-cinzel text-xs font-bold text-white truncate">{item.name}</h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-cinzel text-xs font-bold text-[#d4af37]">₹{item.price}</span>
                      {item.size && (
                        <span className="rounded bg-[#d4af37]/20 px-1.5 py-0.2 text-[9px] text-[#d4af37] font-semibold">
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 rounded-xl border border-[#d4af37]/30 bg-black px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-[#d4af37] hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-cinzel text-xs font-bold text-white px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-[#d4af37] hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Customer Information Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3 border-t border-[#d4af37]/20 pt-4">
              <div className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                Customer Info:
              </div>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-[#d4af37]/30 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-[#d4af37]/30 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
              />
              {orderType === "dine-in" && (
                <input
                  type="text"
                  placeholder="Table No (e.g. Table 04)"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
                />
              )}
              <input
                type="text"
                placeholder="Special Cooking Notes (e.g. Less sugar, extra crispy)"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full rounded-xl border border-[#d4af37]/30 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
              />
            </form>

          </div>
        )}

        {/* Drawer Footer Bill & Submit */}
        {!orderSuccess && cart.length > 0 && (
          <div className="border-t border-[#d4af37]/30 pt-4 space-y-3">
            <div className="space-y-1 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between font-cinzel text-sm font-bold text-[#d4af37] pt-1 border-t border-neutral-800">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4af37] bg-[#d4af37] py-3.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <span>PLACE ORDER ONLINE (₹{grandTotal})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Order Tracker Modal */}
        <OrderTrackerModal
          isOpen={showTrackerModal}
          onClose={() => setShowTrackerModal(false)}
          initialOrderId={placedOrder?.id}
        />
      </div>
    </div>
  </>
  );
}
