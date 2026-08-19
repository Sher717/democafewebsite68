import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Coffee, ChevronDown, User, Calendar, Image, MapPin, Phone, ShoppingBag, Clock, PackageSearch } from "lucide-react";
import { Container } from "./Section";
import { MegaMenu } from "./MegaMenu";
import { ReservationModal } from "./ReservationModal";
import { OrderTrackerModal } from "./OrderTrackerModal";
import { getCustomerRecentOrderIds, getOrderById, ORDERS_EVENT } from "@/lib/adminStore";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showOrderTrackerModal, setShowOrderTrackerModal] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if this device has active orders
  const checkActiveOrders = () => {
    const recentIds = getCustomerRecentOrderIds();
    const hasActive = recentIds.some((id) => {
      const ord = getOrderById(id);
      return ord && (ord.status === "pending" || ord.status === "preparing" || ord.status === "ready");
    });
    setHasActiveOrder(hasActive);
  };

  useEffect(() => {
    checkActiveOrders();
    window.addEventListener(ORDERS_EVENT, checkActiveOrders);
    window.addEventListener("storage", checkActiveOrders);
    return () => {
      window.removeEventListener(ORDERS_EVENT, checkActiveOrders);
      window.removeEventListener("storage", checkActiveOrders);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || showReservationModal || showOrderTrackerModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, showReservationModal, showOrderTrackerModal]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b border-[#d4af37]/20 bg-[#0b0906]/95 backdrop-blur-md text-white shadow-lg",
        )}
      >
        <Container className="relative flex h-20 items-center justify-between gap-4 py-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-1.5 group shrink-0" onClick={() => setOpen(false)}>
            <span className="flex flex-col">
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#d4af37] transition-colors group-hover:text-amber-200">
                KHOKHARZ
              </span>
              <span className="-mt-2 text-right font-script text-2xl text-amber-300/90">
                Cafe
              </span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-colors hover:text-[#d4af37]"
              activeProps={{ className: "text-[#d4af37]" }}
            >
              <Coffee className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>HOME</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-colors hover:text-[#d4af37]"
              activeProps={{ className: "text-[#d4af37]" }}
            >
              <User className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>ABOUT US</span>
            </Link>

            {/* MENU LINK WITH ANIMATED MEGAMENU DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/menu"
                onClick={() => setShowMegaMenu((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-cinzel font-bold tracking-wider text-neutral-200 transition-all hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 hover:text-[#d4af37]",
                  showMegaMenu && "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                )}
              >
                <Coffee className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>MENU</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300 text-[#d4af37]", showMegaMenu && "rotate-180")} />
              </Link>

              {/* MEGAMENU ANIMATED PANEL */}
              {showMegaMenu && <MegaMenu onClose={() => setShowMegaMenu(false)} />}
            </div>

            {/* RESERVATION BUTTON */}
            <button
              type="button"
              onClick={() => setShowReservationModal(true)}
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-all hover:text-[#d4af37] cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>RESERVATION</span>
            </button>

            <Link
              to="/gallery"
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-colors hover:text-[#d4af37]"
              activeProps={{ className: "text-[#d4af37]" }}
            >
              <Image className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>GALLERY</span>
            </Link>

            <Link
              to="/location"
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-colors hover:text-[#d4af37]"
              activeProps={{ className: "text-[#d4af37]" }}
            >
              <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>LOCATION</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-wider text-neutral-300 transition-colors hover:text-[#d4af37]"
              activeProps={{ className: "text-[#d4af37]" }}
            >
              <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>CONTACT</span>
            </Link>
          </nav>

          {/* RIGHT TOP SIDE ACTIONS: TRACK ORDER + ORDER NOW */}
          <div className="flex items-center gap-2.5">
            {/* TRACK ORDER BUTTON */}
            <button
              type="button"
              onClick={() => setShowOrderTrackerModal(true)}
              title="Track Order Status & 1-Minute Cancellation"
              className={`relative inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-105 ${
                hasActiveOrder
                  ? "border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse"
                  : "border-[#d4af37]/40 bg-neutral-900/90 text-neutral-200 hover:border-[#d4af37] hover:text-[#d4af37]"
              }`}
            >
              <Clock className="h-3.5 w-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">TRACK ORDER</span>
              <span className="sm:hidden">TRACK</span>
              {hasActiveOrder && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
            </button>

            {/* ORDER NOW CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/60 bg-gradient-to-r from-[#d4af37]/20 to-[#b88c4a]/30 px-4 py-2.5 font-cinzel text-xs font-bold tracking-widest text-[#d4af37] uppercase transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-105"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>ORDER NOW</span>
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 text-[#d4af37] lg:hidden cursor-pointer"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {open ? (
          <div id="mobile-nav" className="border-t border-[#d4af37]/20 bg-[#0f0c08] text-white lg:hidden">
            <Container className="flex flex-col gap-2 py-6">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                ABOUT US
              </Link>
              <Link
                to="/menu"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                MENU
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setShowReservationModal(true);
                }}
                className="py-2.5 text-left font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                RESERVATION
              </button>
              <Link
                to="/gallery"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                GALLERY
              </Link>
              <Link
                to="/location"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                LOCATION
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-2.5 font-cinzel text-lg text-[#d4af37] hover:text-white"
              >
                CONTACT
              </Link>

              {/* Mobile Track Order Button */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setShowOrderTrackerModal(true);
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4af37]/50 bg-neutral-900 py-3 font-cinzel text-sm font-bold text-[#d4af37]"
              >
                <Clock className="h-4 w-4" />
                <span>TRACK MY ORDER (ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ)</span>
              </button>

              <Link
                to="/menu"
                onClick={() => setOpen(false)}
                className="mt-2 flex w-full justify-center rounded-xl border border-[#d4af37] bg-[#d4af37] py-3 font-cinzel text-sm font-bold text-black shadow-md"
              >
                ORDER NOW
              </Link>
            </Container>
          </div>
        ) : null}
      </header>

      {/* Reservation Modal Component */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
      />

      {/* Live Order Tracker & Cancellation Modal */}
      <OrderTrackerModal
        isOpen={showOrderTrackerModal}
        onClose={() => setShowOrderTrackerModal(false)}
      />
    </>
  );
}
