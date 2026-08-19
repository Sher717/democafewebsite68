import { createFileRoute } from "@tanstack/react-router";
import { FileText, CheckCircle2, Shield, Scale, AlertCircle } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Khokharz Cafe" },
      {
        name: "description",
        content: "Terms and conditions for visiting Khokharz Cafe and placing online orders.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#e2c569] uppercase">
            <Scale className="h-4 w-4" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569]">
            TERMS & CONDITIONS
          </h1>
          <p className="mt-2 text-xs text-neutral-400 font-cinzel">
            Effective Date: August 2026 · Khokharz Cafe
          </p>
        </Reveal>

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl space-y-8 rounded-3xl border border-[#e2c569]/30 bg-[#0f0c08] p-8 text-neutral-300 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <FileText className="h-5 w-5 text-[#e2c569]" />
              1. Acceptance of Terms
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              By accessing or using the {SITE.name} website, ordering food online, or reserving tables, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Shield className="h-5 w-5 text-[#e2c569]" />
              2. Online Orders & Pricing
            </h2>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-5">
              <li>All menu prices listed on the site are in Indian Rupees (₹) inclusive of applicable taxes.</li>
              <li>We reserve the right to modify menu prices or item availability without prior notice.</li>
              <li>Orders are subject to confirmation and preparation time (typically 10-20 minutes).</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <AlertCircle className="h-5 w-5 text-[#e2c569]" />
              3. Table Reservations
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Reserved tables will be held for up to 15 minutes past the scheduled booking time before being released to walk-in guests during peak hours.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <CheckCircle2 className="h-5 w-5 text-[#e2c569]" />
              4. Governing Law
            </h2>
            <p className="text-xs text-neutral-300">
              These terms are governed by the applicable laws of India. For dispute resolution, contact legal support at {SITE.email}.
            </p>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
