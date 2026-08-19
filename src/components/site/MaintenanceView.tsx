import { useState, useEffect } from "react";
import {
  Coffee,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  RefreshCw,
  Lock,
  Sparkles,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { getSiteStatus, SITE_STATUS_EVENT, type SiteStatus } from "@/lib/adminStore";

interface MaintenanceViewProps {
  status?: SiteStatus;
}

export function MaintenanceView({ status: initialStatus }: MaintenanceViewProps) {
  const [status, setStatus] = useState<SiteStatus>(() => initialStatus || getSiteStatus());
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string>("");

  useEffect(() => {
    // Listen for real-time status updates across tabs & window
    const handleStatusUpdate = (e?: Event) => {
      const customEvent = e as CustomEvent<SiteStatus> | undefined;
      if (customEvent?.detail) {
        setStatus(customEvent.detail);
      } else {
        setStatus(getSiteStatus());
      }
    };

    window.addEventListener("storage", handleStatusUpdate);
    window.addEventListener(SITE_STATUS_EVENT, handleStatusUpdate);

    // Periodic auto-check every 15 seconds
    const interval = setInterval(() => {
      const current = getSiteStatus();
      if (current.isSiteActive !== status.isSiteActive) {
        setStatus(current);
      }
    }, 15000);

    return () => {
      window.removeEventListener("storage", handleStatusUpdate);
      window.removeEventListener(SITE_STATUS_EVENT, handleStatusUpdate);
      clearInterval(interval);
    };
  }, [status.isSiteActive]);

  const handleManualCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      const fresh = getSiteStatus();
      setStatus(fresh);
      setIsChecking(false);
      setLastChecked(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#070605] text-white flex flex-col justify-between overflow-hidden selection:bg-[#e2c569]/30 selection:text-[#e2c569]">
      {/* Ambient Luxury Lighting Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-b from-[#e2c569]/15 via-amber-600/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#c5a342]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Subtle Pattern Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#e2c569 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Brand Bar */}
      <header className="relative z-10 border-b border-[#e2c569]/15 bg-[#0a0806]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2c569]/40 bg-[#e2c569]/15 text-[#e2c569] shadow-[0_0_15px_rgba(226,197,105,0.25)]">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-lg font-bold tracking-widest text-[#e2c569]">
                {SITE.name}
              </span>
              <span className="ml-2.5 hidden text-[11px] tracking-wider text-neutral-400 sm:inline">
                {SITE.city}
              </span>
            </div>
          </div>

          {/* Live Offline Badge */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <span className="font-cinzel font-semibold tracking-wider text-[11px]">
              Maintenance Mode
            </span>
          </div>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        {/* Animated Icon Emblem */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#e2c569]/20 via-amber-500/20 to-[#e2c569]/20 blur-xl animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-[#e2c569]/60 bg-gradient-to-b from-[#1c1810] to-[#0c0a07] text-[#e2c569] shadow-[0_0_35px_rgba(226,197,105,0.35)]">
            <Coffee className="h-11 w-11 animate-bounce duration-1000" />
          </div>
        </div>

        {/* Small Notice Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e2c569]/30 bg-[#17140e] px-4 py-1.5 text-xs text-[#e2c569]">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-cinzel tracking-widest text-[11px] font-semibold uppercase">
            Temporary System Maintenance
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="font-cinzel text-3xl font-bold tracking-wide text-[#e2c569] sm:text-4xl md:text-5xl">
          {status.maintenanceTitle || "We'll Be Back Shortly"}
        </h1>

        {/* Dynamic Message */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
          {status.maintenanceMessage ||
            "We are currently performing scheduled maintenance to upgrade your dining and online experience. Online orders and table bookings are temporarily paused. Thank you for your patience!"}
        </p>

        {/* Direct Action Buttons & Reach Out Options */}
        <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          {/* Phone Call Card */}
          <a
            href={SITE.tel}
            className="group flex items-center justify-between rounded-2xl border border-[#e2c569]/30 bg-gradient-to-r from-[#17140e] to-[#12100a] p-4 text-left shadow-lg transition-all hover:border-[#e2c569] hover:shadow-[0_0_25px_rgba(226,197,105,0.25)] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e2c569]/15 text-[#e2c569] border border-[#e2c569]/30 group-hover:bg-[#e2c569] group-hover:text-black transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-cinzel font-semibold tracking-wider text-[#e2c569]">
                  CALL CAFE DIRECTLY
                </p>
                <p className="text-sm font-bold text-white mt-0.5">{SITE.phone}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#e2c569] underline opacity-0 group-hover:opacity-100 transition-opacity">
              Call Now
            </span>
          </a>

          {/* WhatsApp Direct Chat Card */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#0d1a12] to-[#07100b] p-4 text-left shadow-lg transition-all hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-cinzel font-semibold tracking-wider text-emerald-400">
                  WHATSAPP INQUIRY
                </p>
                <p className="text-sm font-bold text-white mt-0.5">Chat on WhatsApp</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 underline opacity-0 group-hover:opacity-100 transition-opacity">
              Chat Now
            </span>
          </a>
        </div>

        {/* Location & Opening Hours Pill */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 px-6 py-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#e2c569]" />
            <span>Hours: {SITE.hours}</span>
          </div>
          <div className="h-3 w-px bg-neutral-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#e2c569]" />
            <span>{SITE.address.full}</span>
          </div>
        </div>

        {/* Refresh / Check Site Status Button */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={handleManualCheck}
            disabled={isChecking}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e2c569]/40 bg-[#16130d] px-5 py-2.5 text-xs font-cinzel font-semibold tracking-wider text-[#e2c569] transition-all hover:border-[#e2c569] hover:bg-[#e2c569]/10 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "CHECKING STATUS..." : "CHECK IF SITE IS BACK ONLINE"}</span>
          </button>
          {lastChecked && (
            <span className="text-[10px] text-neutral-500">
              Last checked at {lastChecked}
            </span>
          )}
        </div>
      </main>

      {/* Footer & Discreet Staff Access */}
      <footer className="relative z-10 border-t border-[#e2c569]/15 bg-[#090806]/90 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>

          {/* Discreet Admin Login Button */}
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-[11px] font-cinzel font-medium text-neutral-400 transition-colors hover:border-[#e2c569]/40 hover:text-[#e2c569]"
          >
            <Lock className="h-3 w-3" />
            <span>Staff / Admin Portal Login</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
