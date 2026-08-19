import { useState, useEffect } from "react";
import {
  X,
  Search,
  Clock,
  ChefHat,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Phone,
  MessageSquare,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Ban,
  UtensilsCrossed,
} from "lucide-react";
import {
  getOrderById,
  getOrders,
  cancelOrderByCustomer,
  getCustomerRecentOrderIds,
  ORDERS_EVENT,
  type Order,
} from "@/lib/adminStore";
import { SITE } from "@/lib/site";

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export function OrderTrackerModal({ isOpen, onClose, initialOrderId }: OrderTrackerModalProps) {
  const [searchId, setSearchId] = useState(initialOrderId || "");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [recentOrderIds, setRecentOrderIds] = useState<string[]>([]);
  const [now, setNow] = useState(Date.now());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("Changed my mind");
  const [cancelMessage, setCancelMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Load initial order & recent order IDs
  useEffect(() => {
    if (!isOpen) return;

    const recentIds = getCustomerRecentOrderIds();
    setRecentOrderIds(recentIds);

    const targetId = initialOrderId || searchId || recentIds[0] || "";
    if (targetId) {
      setSearchId(targetId);
      const found = getOrderById(targetId);
      if (found) {
        setSelectedOrder(found);
      } else {
        const all = getOrders();
        if (all.length > 0) setSelectedOrder(all[0]);
      }
    } else {
      const all = getOrders();
      if (all.length > 0) {
        setSelectedOrder(all[0]);
        setSearchId(all[0].id);
      }
    }
  }, [isOpen, initialOrderId]);

  // Real-time ticking timer for 60-second cancellation window & live sync
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    // Listen for live order updates from admin or kitchen
    const handleOrderSync = () => {
      if (selectedOrder) {
        const refreshed = getOrderById(selectedOrder.id);
        if (refreshed) setSelectedOrder(refreshed);
      }
    };

    window.addEventListener(ORDERS_EVENT, handleOrderSync);
    window.addEventListener("storage", handleOrderSync);

    return () => {
      clearInterval(timer);
      window.removeEventListener(ORDERS_EVENT, handleOrderSync);
      window.removeEventListener("storage", handleOrderSync);
    };
  }, [isOpen, selectedOrder?.id]);

  if (!isOpen) return null;

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getOrderById(searchId.trim());
    if (found) {
      setSelectedOrder(found);
      setCancelMessage(null);
    } else {
      setCancelMessage({
        text: `No order found with ID "${searchId}". Please check your receipt or try another ID.`,
        type: "error",
      });
    }
  };

  // Calculate 60-Second Cancellation Window
  const orderCreatedAt = selectedOrder ? new Date(selectedOrder.createdAt).getTime() : 0;
  const elapsedSeconds = Math.floor((now - orderCreatedAt) / 1000);
  const remainingCancelSeconds = Math.max(0, 60 - elapsedSeconds);
  const isCancellable =
    selectedOrder &&
    selectedOrder.status === "pending" &&
    remainingCancelSeconds > 0;

  // Handle Order Cancellation within 1 Minute
  const handleConfirmCancel = () => {
    if (!selectedOrder) return;
    setIsCancelling(true);

    const result = cancelOrderByCustomer(selectedOrder.id, cancelReason);
    setIsCancelling(false);
    setShowCancelConfirm(false);

    if (result.success && result.order) {
      setSelectedOrder(result.order);
      setCancelMessage({
        text: "✅ Order cancelled successfully! Staff notified immediately.",
        type: "success",
      });
    } else {
      setCancelMessage({
        text: `❌ ${result.message}`,
        type: "error",
      });
    }
  };

  // Stepper Status Configuration
  const steps = [
    {
      id: "pending",
      title: "Order Received",
      punjabi: "ਆਰਡਰ ਪ੍ਰਾਪਤ ਹੋਇਆ",
      desc: "Sent to Khokharz Kitchen",
      icon: Receipt,
    },
    {
      id: "preparing",
      title: "Cooking & Brewing",
      punjabi: "ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ",
      desc: "Chefs are preparing your meal",
      icon: ChefHat,
    },
    {
      id: "ready",
      title: "Ready to Serve",
      punjabi: "ਸਰਵ ਕਰਨ ਲਈ ਤਿਆਰ",
      desc: "Hot & fresh at counter/table",
      icon: Bell,
    },
    {
      id: "completed",
      title: "Served & Enjoyed",
      punjabi: "ਸਰਵ ਹੋ ਗਿਆ",
      desc: "Delivered to customer",
      icon: CheckCircle2,
    },
  ];

  const getStepIndex = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return 0;
      case "preparing":
        return 1;
      case "ready":
        return 2;
      case "completed":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIndex = selectedOrder ? getStepIndex(selectedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in-50 duration-200">
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#0c0a07] text-white shadow-[0_0_80px_rgba(212,175,55,0.25)]">
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 bg-[#120f0a] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-base font-bold tracking-wider text-[#d4af37]">
                LIVE ORDER TRACKER
              </h2>
              <p className="text-[11px] text-neutral-400">
                ਲਾਈਵ ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ ਅਤੇ ਰਿਅਲ-ਟਾਈਮ ਸਟੇਟਸ ਦੇਖੋ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-[#d4af37] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Search & Recent Orders Bar */}
          <div className="space-y-2.5">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Order ID (e.g. ORD-8921)..."
                  className="w-full rounded-2xl border border-[#d4af37]/30 bg-neutral-950 py-2.5 pl-10 pr-3 text-xs text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-2xl border border-[#d4af37] bg-[#d4af37] px-5 py-2.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-md cursor-pointer shrink-0"
              >
                TRACK
              </button>
            </form>

            {/* Quick Recent Order Chips */}
            {recentOrderIds.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-500">Recent:</span>
                {recentOrderIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSearchId(id);
                      const found = getOrderById(id);
                      if (found) {
                        setSelectedOrder(found);
                        setCancelMessage(null);
                      }
                    }}
                    className={`rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold transition-all ${
                      selectedOrder?.id === id
                        ? "border border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]"
                        : "border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    #{id}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toast / Alert Message */}
          {cancelMessage && (
            <div
              className={`flex items-start gap-2.5 rounded-2xl border p-3 text-xs animate-in fade-in duration-200 ${
                cancelMessage.type === "success"
                  ? "border-emerald-500/40 bg-emerald-950/60 text-emerald-200"
                  : "border-red-500/40 bg-red-950/60 text-red-200"
              }`}
            >
              {cancelMessage.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              )}
              <span>{cancelMessage.text}</span>
            </div>
          )}

          {/* If No Order Selected */}
          {!selectedOrder ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-neutral-600" />
              <h4 className="mt-3 font-cinzel text-sm font-bold text-neutral-300">
                NO ACTIVE ORDER SELECTED
              </h4>
              <p className="mt-1 text-xs text-neutral-500">
                Please enter your Order ID above or place an order from the menu.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Order Overview Header Card */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#14120c] to-[#0a0907] p-4 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#d4af37]">
                        {selectedOrder.id}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          selectedOrder.status === "cancelled"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                            : selectedOrder.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : selectedOrder.status === "ready"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                            : selectedOrder.status === "preparing"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        }`}
                      >
                        {selectedOrder.status === "cancelled"
                          ? "❌ CANCELLED"
                          : selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Placed: {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Type: <strong className="text-white uppercase">{selectedOrder.orderType} {selectedOrder.tableNo ? `(${selectedOrder.tableNo})` : ""}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block">Grand Total</span>
                    <span className="font-cinzel text-lg font-bold text-amber-300">
                      ₹{selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Customer Details Strip */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-300">
                  <div>
                    <span className="text-neutral-400">Customer: </span>
                    <strong className="text-white">{selectedOrder.customerName}</strong>
                    {selectedOrder.phone && <span> ({selectedOrder.phone})</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">Payment: </span>
                    <span className="font-bold text-emerald-400 uppercase">
                      {selectedOrder.paymentStatus === "paid" ? "PAID" : "CASH ON COUNTER"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CANCELLED ORDER NOTICE (If Cancelled) */}
              {selectedOrder.status === "cancelled" ? (
                <div className="rounded-2xl border border-red-500/50 bg-red-950/40 p-5 shadow-lg space-y-2">
                  <div className="flex items-center gap-2 text-red-300 font-cinzel font-bold text-sm">
                    <Ban className="h-5 w-5 text-red-400" />
                    <span>THIS ORDER HAS BEEN CANCELLED</span>
                  </div>
                  <p className="text-xs text-red-200/90">
                    <strong>Reason:</strong> {selectedOrder.cancellationReason || "Cancelled by customer within grace window."}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Cancelled by: <span className="font-semibold text-white uppercase">{selectedOrder.cancelledBy || "Customer"}</span> at{" "}
                    {selectedOrder.cancelledAt ? new Date(selectedOrder.cancelledAt).toLocaleTimeString() : "Just now"}
                  </p>
                  <p className="text-[11px] text-neutral-400 pt-1 italic">
                    If you require a new order, please browse our menu and place a fresh order anytime.
                  </p>
                </div>
              ) : (
                /* LIVE 4-STAGE VISUAL KITCHEN TRACKER */
                <div className="rounded-2xl border border-[#d4af37]/25 bg-neutral-950 p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel text-xs font-bold text-[#d4af37] tracking-wider flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>LIVE KITCHEN STAGES (ਲਾਈਵ ਸਟੇਟਸ)</span>
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      Real-Time Sync
                    </span>
                  </div>

                  {/* Stepper Progress Visual */}
                  <div className="relative mt-4 space-y-4">
                    {steps.map((step, idx) => {
                      const isDone = currentStepIndex >= idx;
                      const isCurrent = currentStepIndex === idx;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.id} className="relative flex items-start gap-4">
                          {/* Left Line connector */}
                          {idx < steps.length - 1 && (
                            <div
                              className={`absolute left-5 top-10 h-10 w-0.5 transition-colors ${
                                isDone && currentStepIndex > idx
                                  ? "bg-[#d4af37]"
                                  : "bg-neutral-800"
                              }`}
                            />
                          )}

                          {/* Step Icon Bubble */}
                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all ${
                              isCurrent
                                ? "border-[#d4af37] bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-bounce"
                                : isDone
                                ? "border-[#d4af37]/60 bg-[#d4af37]/20 text-[#d4af37]"
                                : "border-neutral-800 bg-neutral-900 text-neutral-600"
                            }`}
                          >
                            <StepIcon className="h-5 w-5" />
                          </div>

                          {/* Step Text Info */}
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center justify-between">
                              <p
                                className={`font-cinzel text-xs font-bold tracking-wider ${
                                  isCurrent
                                    ? "text-[#d4af37]"
                                    : isDone
                                    ? "text-white"
                                    : "text-neutral-500"
                                }`}
                              >
                                {step.title}
                              </p>
                              {isCurrent && (
                                <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[9px] font-bold font-mono text-[#d4af37] border border-[#d4af37]/40">
                                  IN PROGRESS
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-amber-200/80 font-medium">
                              {step.punjabi}
                            </p>
                            <p className="text-[10px] text-neutral-400">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 1-MINUTE ORDER CANCELLATION BOX (1 ਮਿੰਟ ਕੈਂਸਲੇਸ਼ਨ ਵਿੰਡੋ) */}
              {selectedOrder.status !== "cancelled" && selectedOrder.status !== "completed" && (
                <div
                  className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                    isCancellable
                      ? "border-amber-500/50 bg-gradient-to-r from-[#22160a] to-[#140e06] shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                      : "border-neutral-800 bg-neutral-950/80"
                  }`}
                >
                  {isCancellable ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-400 animate-spin" />
                          <span className="font-cinzel text-xs font-bold text-amber-300">
                            1-MINUTE CANCELLATION WINDOW
                          </span>
                        </div>
                        <span className="rounded-full border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-300">
                          ⏳ {remainingCancelSeconds}s Left
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300">
                        ਤੁਸੀਂ ਆਰਡਰ ਦੇਣ ਦੇ <strong>1 ਮਿੰਟ (60 ਸਕਿੰਟ)</strong> ਦੇ ਅੰਦਰ ਆਪਣਾ ਆਰਡਰ ਕੈਂਸਲ ਕਰ ਸਕਦੇ ਹੋ।
                      </p>

                      {/* Progress Bar shrinking from 60 to 0 */}
                      <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-1000"
                          style={{ width: `${(remainingCancelSeconds / 60) * 100}%` }}
                        />
                      </div>

                      {!showCancelConfirm ? (
                        <button
                          type="button"
                          onClick={() => setShowCancelConfirm(true)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/50 bg-red-950/60 py-2.5 font-cinzel text-xs font-bold text-red-300 hover:bg-red-900/80 hover:border-red-400 transition-all shadow-md cursor-pointer"
                        >
                          <Ban className="h-4 w-4" />
                          <span>CANCEL THIS ORDER (ਆਰਡਰ ਕੈਂਸਲ ਕਰੋ)</span>
                        </button>
                      ) : (
                        /* Cancel Confirmation Form */
                        <div className="rounded-xl border border-red-500/40 bg-black/60 p-3 space-y-3 animate-in fade-in duration-200">
                          <p className="text-xs font-semibold text-red-300">
                            Are you sure you want to cancel this order?
                          </p>
                          <div>
                            <label className="block text-[11px] text-neutral-400 mb-1">
                              Reason for cancellation (optional):
                            </label>
                            <select
                              value={cancelReason}
                              onChange={(e) => setCancelReason(e.target.value)}
                              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-xs text-white focus:border-red-500 focus:outline-none"
                            >
                              <option value="Changed my mind">Changed my mind (ਮਨ ਬਦਲ ਗਿਆ)</option>
                              <option value="Ordered wrong item / size">Ordered wrong items (ਗਲਤ ਆਈਟਮ ਚੁਣੀ ਗਈ)</option>
                              <option value="Need to change table / address">Need to change table / details</option>
                              <option value="Will re-order shortly">Will re-order shortly</option>
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={isCancelling}
                              onClick={handleConfirmCancel}
                              className="flex-1 rounded-xl border border-red-500 bg-red-600 py-2 font-cinzel text-xs font-bold text-white hover:bg-red-700 transition-all cursor-pointer shadow-md disabled:opacity-50"
                            >
                              {isCancelling ? "Cancelling..." : "YES, CANCEL ORDER NOW"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCancelConfirm(false)}
                              className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs text-neutral-300 hover:text-white"
                            >
                              No, Keep Order
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Cancellation Window Expired Message */
                    <div className="flex items-start gap-2.5 text-xs text-neutral-400">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="font-semibold text-neutral-300">
                          Cancellation grace window (1 minute) has closed.
                        </span>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          The kitchen has started preparing your food. For urgent changes or help, please contact our counter staff directly.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Itemized Order Breakdown */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
                <p className="font-cinzel text-xs font-bold text-[#d4af37] tracking-wider uppercase">
                  ORDERED ITEMS ({selectedOrder.items.reduce((s, i) => s + i.quantity, 0)} ITEMS):
                </p>
                <div className="divide-y divide-neutral-800/80 rounded-xl border border-neutral-800 bg-black/40 p-3 text-xs space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pt-1.5 first:pt-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#d4af37]">
                          {item.quantity}x
                        </span>
                        <span className="text-neutral-200">{item.name}</span>
                        {item.size && (
                          <span className="rounded bg-neutral-800 px-1.5 py-0.2 text-[9px] text-neutral-400">
                            {item.size}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-semibold text-[#d4af37]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedOrder.instructions && (
                  <div className="rounded-lg bg-amber-500/10 p-2.5 text-xs text-amber-300">
                    <strong>Cooking Note:</strong> {selectedOrder.instructions}
                  </div>
                )}
              </div>

              {/* Support & Contact Staff Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 py-2.5 text-xs font-semibold text-neutral-200 hover:border-[#d4af37] hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>Call Cafe Staff</span>
                </a>

                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Khokharz%20Cafe,%20I%20have%20a%20question%20about%20my%20Order%20${selectedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp Help</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
