import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { trackWhatsAppClick } from "@/lib/analytics";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: "General" | "Ordering" | "Reservations" | "Menu";
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "What are the operating hours of Khokharz Cafe?",
    answer: `Khokharz Cafe is open daily from 09:00 AM to 09:00 PM, serving fresh coffee, breakfast, lunch, and warm pastries throughout the day.`,
    category: "General",
  },
  {
    id: 2,
    question: "Where is Khokharz Cafe located & how do I find it?",
    answer: `We are located at ${SITE.address.full} on the 2nd Floor of Emera Place. Elevators and escalators are available for easy access.`,
    category: "General",
  },
  {
    id: 3,
    question: "How can I order food online directly from the website?",
    answer: `Simply browse our online menu, select your preferred portion size (Regular, Large, 2 Pcs, 4 Pcs), click '+ ADD', and view your live cart to complete your order for Dine-In, Takeaway, or Express Delivery.`,
    category: "Ordering",
  },
  {
    id: 4,
    question: "Can I reserve a table in advance?",
    answer: `Yes! You can reserve your table by clicking the 'RESERVATION' button on our website or visiting our Reservation page. You can choose date, time, party size, and seating area (Window View, Main Lounge, Outdoor Terrace, or Quiet Workspace).`,
    category: "Reservations",
  },
  {
    id: 5,
    question: "What payment methods do you accept at the cafe & online?",
    answer: `We accept all major payment methods including Cash on Pickup/Delivery, UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, and Net Banking.`,
    category: "Ordering",
  },
  {
    id: 6,
    question: "What type of coffee beans do you use?",
    answer: `We use 100% shade-grown Single-Origin Arabica coffee beans ethically sourced from high-altitude estates and micro-lot roasted for smooth, low-acidity velvety flavor.`,
    category: "Menu",
  },
  {
    id: 7,
    question: "Do you offer vegetarian, vegan, or gluten-free options?",
    answer: `Yes! A major portion of our food menu is vegetarian, including our fresh Veg Sandwiches, Pesto & Marinara Pastas, Brioche Toast, and Garlic Bread. Dairy alternatives like Almond Milk (+₹20) and Oat Milk (+₹30) are also available.`,
    category: "Menu",
  },
  {
    id: 8,
    question: "Is high-speed Wi-Fi and workspace seating available?",
    answer: `Absolutely! Khokharz Cafe is designed for productivity. We offer free high-speed fiber Wi-Fi, comfortable lounge chairs, and quiet workspace seating equipped with power outlets for laptops.`,
    category: "General",
  },
  {
    id: 9,
    question: "What is your order cancellation & refund policy?",
    answer: `Online food orders can be cancelled free of charge within 3 minutes of placing the order before kitchen prep starts. Approved refunds are credited back within 3-5 business days.`,
    category: "Ordering",
  },
  {
    id: 10,
    question: "How can I contact Khokharz Cafe for catering or inquiries?",
    answer: `You can call us directly at ${SITE.phone}, send a WhatsApp message to ${SITE.phone} ("hello Khokharz cafe"), or email us at ${SITE.email}.`,
    category: "General",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // First open by default
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "General", "Ordering", "Reservations", "Menu"];

  const filteredFaqs = activeTab === "All" ? faqs : faqs.filter((f) => f.category === activeTab);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative overflow-hidden bg-[#090806] py-16 text-white border-t border-[#e2c569]/30">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#e2c569]/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.25em] text-[#e2c569] uppercase">
            <HelpCircle className="h-4 w-4" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="mt-3 font-cinzel text-3xl font-bold tracking-wider text-[#e2c569] sm:text-4xl">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="mt-1 font-script text-2xl text-[#f5e4a8]">
            Quick answers about coffee, food, reservations & online orders
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-xl border px-4 py-2 text-xs font-cinzel font-bold transition-all ${
                activeTab === cat
                  ? "border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                  : "border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions List */}
        <div className="mt-8 space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#e2c569]/70 bg-gradient-to-r from-[#14120c] via-[#1a1710] to-[#14120c] shadow-[0_0_25px_rgba(226,197,105,0.15)]"
                    : "border-neutral-800/80 bg-neutral-950/80 hover:border-[#e2c569]/30"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#e2c569]/40 bg-[#e2c569]/10 font-cinzel text-xs font-bold text-[#e2c569]">
                      0{idx + 1}
                    </span>
                    <span className="font-cinzel text-sm font-bold tracking-wide text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#e2c569] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#e2c569]/20 px-5 pb-5 pt-3 text-xs leading-relaxed text-neutral-300 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Contact Banner */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#e2c569]/30 bg-gradient-to-r from-neutral-950 via-[#120f0a] to-neutral-950 p-5 shadow-lg text-center sm:text-left">
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#e2c569]">STILL HAVE QUESTIONS?</h4>
            <p className="text-xs text-neutral-400 mt-0.5">We are happy to assist you anytime on WhatsApp or Direct Call.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("FAQ Section")}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-xs font-cinzel font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WHATSAPP</span>
            </a>
            <a
              href={SITE.tel}
              className="flex items-center gap-1.5 rounded-xl border border-[#e2c569] bg-[#e2c569] px-4 py-2 text-xs font-cinzel font-bold text-black hover:bg-amber-300 transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>CALL NOW</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
