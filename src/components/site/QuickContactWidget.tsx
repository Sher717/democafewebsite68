import { useState, useEffect } from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { trackWhatsAppClick } from "@/lib/analytics";

export function QuickContactWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col gap-2 animate-in slide-in-from-bottom-5 duration-300">
      
      {/* WhatsApp Button */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("Floating Quick Contact Widget")}
        title="Chat on WhatsApp"
        className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-emerald-400/50 bg-[#122e1b] text-emerald-400 shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:text-black"
      >
        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
        <span className="absolute left-12 sm:left-14 hidden sm:group-hover:block whitespace-nowrap rounded-lg border border-emerald-400/30 bg-black/95 px-2.5 py-1 text-xs font-cinzel font-bold text-emerald-300 backdrop-blur-md shadow-md">
          WhatsApp: "hello Khokharz cafe"
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href={SITE.tel}
        title="Call Now"
        className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#e2c569]/50 bg-[#1c180c] text-[#e2c569] shadow-[0_4px_20px_rgba(226,197,105,0.3)] transition-all duration-300 hover:scale-110 hover:bg-[#e2c569] hover:text-black"
      >
        <Phone className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
        <span className="absolute left-12 sm:left-14 hidden sm:group-hover:block whitespace-nowrap rounded-lg border border-[#e2c569]/30 bg-black/95 px-2.5 py-1 text-xs font-cinzel font-bold text-[#e2c569] backdrop-blur-md shadow-md">
          Call: +91 9815977969
        </span>
      </a>

      {/* Direct Email Button */}
      <a
        href={SITE.mailto}
        title="Send Email"
        className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-amber-400/50 bg-[#241a0b] text-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-110 hover:bg-amber-400 hover:text-black"
      >
        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="absolute left-12 sm:left-14 hidden sm:group-hover:block whitespace-nowrap rounded-lg border border-amber-400/30 bg-black/95 px-2.5 py-1 text-xs font-cinzel font-bold text-amber-300 backdrop-blur-md shadow-md">
          Email: sharrymaan2005@gmail.com
        </span>
      </a>

    </div>
  );
}
