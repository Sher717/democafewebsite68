import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import tableImg from "@/assets/table-detail.jpg";
import { Container, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaAnchor, CtaLink } from "@/components/site/Cta";
import { DIRECTIONS_URL, SITE } from "@/lib/site";
import { addInquiry } from "@/lib/adminStore";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Send, CheckCircle2, MessageSquare, Phone, Mail, Clock, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Khokharz Cafe, Halifax" },
      {
        name: "description",
        content:
          "Visit Khokharz Cafe at 5151 Terminal Rd, 2nd Floor, Halifax. Get directions, send an inquiry or message us on WhatsApp.",
      },
      { property: "og:title", content: "Contact & Visit — Khokharz Cafe, Halifax" },
      {
        property: "og:description",
        content: "Plan your visit to Khokharz Cafe at Emera Place in downtown Halifax.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      addInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
      });
      setLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 400);
  };

  return (
    <>
      <Container className="py-14 sm:py-20">
        <p className="eyebrow">Contact & Inquiries</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">
          Make your next coffee break Khokharz.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Come up to the second floor at Emera Place for coffee, breakfast or lunch. Dine in at a
          table, or order it to take away.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CtaAnchor href={DIRECTIONS_URL} variant="primary">
            Get Directions
          </CtaAnchor>
          <CtaLink to="/menu" variant="outline">
            View Menu
          </CtaLink>
        </div>
      </Container>

      <Section className="pt-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact Info & Visit Card */}
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#e2c569]">
              VISIT US
            </h2>
            <address className="mt-5 text-base not-italic leading-relaxed text-neutral-300">
              {SITE.name}
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.country}
            </address>

            <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
              <div className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                <dt className="text-muted-foreground">Building</dt>
                <dd className="text-white font-medium">{SITE.address.building}</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.tel}
                    className="font-bold text-white hover:text-[#e2c569] underline decoration-[#e2c569]"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("Contact Page - Phone Row")}
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a
                    href={SITE.mailto}
                    className="font-bold text-white hover:text-[#e2c569] underline decoration-[#e2c569]"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                <dt className="text-muted-foreground">Hours</dt>
                <dd className="text-neutral-300">{SITE.hours}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <img
                src={tableImg}
                width={900}
                height={600}
                loading="lazy"
                alt="Two cups of coffee on a sunlit table"
                className="h-64 w-full object-cover rounded-2xl border border-[#e2c569]/30 shadow-lg"
              />
            </div>
          </Reveal>

          {/* Right: Interactive Contact Inquiry Form */}
          <Reveal delay={100}>
            <div className="rounded-3xl border border-[#e2c569]/40 bg-gradient-to-b from-[#14120c] via-[#0f0d09] to-[#090806] p-6 sm:p-8 shadow-[0_0_50px_rgba(226,197,105,0.15)] text-white">
              <div className="flex items-center gap-2 font-cinzel text-xs font-bold tracking-widest text-[#e2c569] uppercase">
                <Sparkles className="h-4 w-4" />
                <span>ONLINE INQUIRY</span>
              </div>
              <h2 className="mt-2 font-cinzel text-2xl font-bold tracking-wide text-white sm:text-3xl">
                Send us a Message
              </h2>
              <p className="mt-1 text-xs text-neutral-400">
                Have a question about catering, special events or our menu? Leave a message below.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center animate-in zoom-in-95 duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-cinzel text-lg font-bold text-white">
                    MESSAGE SENT SUCCESSFULLY!
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-300">
                    Thank you for reaching out. Our team will review your inquiry and respond promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-5 rounded-xl border border-[#e2c569] bg-[#e2c569] px-4 py-2 font-cinzel text-xs font-bold text-black hover:brightness-110"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 font-cinzel">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1 font-cinzel">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1 font-cinzel">
                        PHONE (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 font-cinzel">
                      SUBJECT
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950 p-3 text-white focus:border-[#e2c569] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Catering & Party Orders">Catering & Party Orders</option>
                      <option value="Table Booking Question">Table Booking Question</option>
                      <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 font-cinzel">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you today?..."
                      className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#e2c569] bg-gradient-to-r from-[#e2c569] to-[#c5a342] py-3 text-xs font-cinzel font-bold tracking-widest text-black shadow-[0_0_20px_rgba(226,197,105,0.25)] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>{loading ? "SENDING MESSAGE..." : "SUBMIT INQUIRY"}</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
