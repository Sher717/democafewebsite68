import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, Users, MapPin, CheckCircle2, Sparkles, User, Phone, Mail, AlertCircle, MessageSquare, FileText } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { addReservation, formatReservationWhatsAppMessage, type Reservation } from "@/lib/adminStore";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Table Reservation — Khokharz Cafe" },
      {
        name: "description",
        content:
          "Reserve a table at Khokharz Cafe. Choose your seating preference, time slot and guest count.",
      },
    ],
  }),
  component: ReservationPage,
});

interface FormErrors {
  name?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
}

function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "Today",
    time: "02:00 PM",
    guests: "2 People",
    seating: "Window View",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Full Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Phone Validation
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // 1. Save to Admin Database
      const newRes = addReservation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seating: formData.seating,
        specialRequests: formData.specialRequests.trim() || undefined,
      });

      setCreatedReservation(newRes);
      setSubmitted(true);

      // 2. Pre-fill & Open WhatsApp Notification
      const waNumber = SITE.phone.replace(/\D/g, "") || "919815977969";
      const message = formatReservationWhatsAppMessage({
        id: newRes.id,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seating: formData.seating,
        specialRequests: formData.specialRequests.trim() || undefined,
      });

      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCreatedReservation(null);
    setErrors({});
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "Today",
      time: "02:00 PM",
      guests: "2 People",
      seating: "Window View",
      specialRequests: "",
    });
  };

  const getWhatsAppLink = () => {
    const waNumber = SITE.phone.replace(/\D/g, "") || "919815977969";
    const message = formatReservationWhatsAppMessage({
      id: createdReservation?.id,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      seating: formData.seating,
      specialRequests: formData.specialRequests.trim() || undefined,
    });
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.25em] text-[#e2c569] uppercase">
            <Sparkles className="h-4 w-4" />
            <span>ONLINE TABLE BOOKING</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569] sm:text-5xl">
            KHOKHARZ CAFE
          </h1>
          <p className="mt-2 font-script text-3xl text-[#f5e4a8]">
            Reserve your table for coffee, lunch & moments
          </p>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-10 max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#e2c569]/60 bg-gradient-to-b from-[#14120c] via-[#0f0c08] to-[#090806] p-8 shadow-[0_0_60px_rgba(226,197,105,0.25)]">
            
            {/* Metallic Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent" />

            {submitted ? (
              <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#e2c569] bg-[#e2c569]/20 text-[#e2c569] shadow-[0_0_30px_rgba(226,197,105,0.4)]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <h3 className="mt-6 font-cinzel text-2xl font-bold tracking-wider text-[#e2c569]">
                  RESERVATION CONFIRMED!
                </h3>

                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                  Thank you, <span className="text-white font-bold">{formData.name}</span>! Your table for <span className="text-[#e2c569] font-bold">{formData.guests}</span> ({formData.seating}) has been reserved for <span className="text-[#e2c569] font-bold">{formData.date} at {formData.time}</span>.
                </p>

                {/* WhatsApp Status Alert */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/60 p-3 text-xs text-emerald-200">
                  <MessageSquare className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>
                    Reservation details sent to <strong>Admin Portal</strong> and pre-filled for <strong>WhatsApp confirmation</strong>!
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-[#e2c569]/30 bg-neutral-950/80 p-4 text-xs font-cinzel text-neutral-300 space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Booking Reference:</span>
                    <span className="font-bold text-[#e2c569]">#{createdReservation?.id || "RES-PENDING"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Confirmation Email:</span>
                    <span className="font-bold text-white truncate max-w-[220px]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Phone Number:</span>
                    <span className="font-bold text-white">{formData.phone}</span>
                  </div>
                  {formData.specialRequests && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Special Notes:</span>
                      <span className="font-bold text-amber-200 truncate max-w-[220px]">{formData.specialRequests}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1.5 border-t border-neutral-800">
                    <span className="text-neutral-400">Location:</span>
                    <span className="font-bold text-amber-300">Emera Place 2nd Floor, Halifax</span>
                  </div>
                </div>

                {/* Primary WhatsApp Action Button */}
                <div className="mt-6 space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-600 py-3.5 font-cinzel text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>OPEN ON WHATSAPP / WHATSAPP 'ਤੇ ਭੇਜੋ</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 font-cinzel text-xs font-semibold text-neutral-300 transition-all hover:text-white"
                  >
                    MAKE ANOTHER RESERVATION
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Date & Time Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-[#e2c569] uppercase">
                      <Calendar className="h-4 w-4" /> Date
                    </label>
                    <select
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#e2c569]/30 bg-neutral-900/90 px-4 py-3 text-xs text-white focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="This Weekend">This Weekend</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-[#e2c569] uppercase">
                      <Clock className="h-4 w-4" /> Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#e2c569]/30 bg-neutral-900/90 px-4 py-3 text-xs text-white focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Guests & Seating Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-[#e2c569] uppercase">
                      <Users className="h-4 w-4" /> Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#e2c569]/30 bg-neutral-900/90 px-4 py-3 text-xs text-white focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 People">2 People</option>
                      <option value="4 People">4 People</option>
                      <option value="6+ People">6+ People</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-cinzel text-xs font-bold text-[#e2c569] uppercase">
                      <MapPin className="h-4 w-4" /> Seating
                    </label>
                    <select
                      value={formData.seating}
                      onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#e2c569]/30 bg-neutral-900/90 px-4 py-3 text-xs text-white focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                    >
                      <option value="Window View">Window View</option>
                      <option value="Main Lounge">Main Lounge</option>
                      <option value="Outdoor Terrace">Outdoor Terrace</option>
                      <option value="Quiet Workspace">Quiet Workspace</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information Form Fields */}
                <div className="space-y-4 pt-3 border-t border-[#e2c569]/20">
                  
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center justify-between font-cinzel text-xs font-bold text-[#e2c569] uppercase mb-1.5">
                      <span>Full Name *</span>
                      {errors.name && <span className="text-red-400 font-sans text-xs flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</span>}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e2c569]" />
                      <input
                        type="text"
                        placeholder="e.g. Shamsher Singh"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-full rounded-xl border pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 bg-neutral-900/90 focus:outline-none transition-all ${
                          errors.name
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-[#e2c569]/30 focus:border-[#e2c569] focus:ring-1 focus:ring-[#e2c569]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="flex items-center justify-between font-cinzel text-xs font-bold text-[#e2c569] uppercase mb-1.5">
                      <span>Phone Number *</span>
                      {errors.phone && <span className="text-red-400 font-sans text-xs flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</span>}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e2c569]" />
                      <input
                        type="tel"
                        placeholder="e.g. +91 9815977969"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={`w-full rounded-xl border pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 bg-neutral-900/90 focus:outline-none transition-all ${
                          errors.phone
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-[#e2c569]/30 focus:border-[#e2c569] focus:ring-1 focus:ring-[#e2c569]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="flex items-center justify-between font-cinzel text-xs font-bold text-[#e2c569] uppercase mb-1.5">
                      <span>Email Address *</span>
                      {errors.email && <span className="text-red-400 font-sans text-xs flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</span>}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e2c569]" />
                      <input
                        type="email"
                        placeholder="e.g. sharrymaan2005@gmail.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full rounded-xl border pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 bg-neutral-900/90 focus:outline-none transition-all ${
                          errors.email
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-[#e2c569]/30 focus:border-[#e2c569] focus:ring-1 focus:ring-[#e2c569]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Special Requests / Dietary Notes */}
                  <div>
                    <label className="flex items-center justify-between font-cinzel text-xs font-bold text-[#e2c569] uppercase mb-1.5">
                      <span>Special Requests / Notes (Optional)</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-3.5 h-4 w-4 text-[#e2c569]" />
                      <input
                        type="text"
                        placeholder="e.g. Birthday celebration, High chair, Quiet corner"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-900/90 pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2c569] bg-[#e2c569] py-3.5 font-cinzel text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-[0_0_25px_rgba(226,197,105,0.35)] cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>CONFIRM & NOTIFY VIA WHATSAPP (ਬੁੱਕ ਕਰੋ)</span>
                  </button>
                  <p className="mt-2 text-center text-[11px] text-neutral-400">
                    ⚡ Instant real-time booking saved to Admin System & pre-filled on WhatsApp.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
