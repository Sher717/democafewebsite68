import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Khokharz Cafe" },
      {
        name: "description",
        content: "Read the Privacy Policy for Khokharz Cafe regarding customer data protection and online orders.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#e2c569] uppercase">
            <ShieldCheck className="h-4 w-4" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569]">
            PRIVACY POLICY
          </h1>
          <p className="mt-2 text-xs text-neutral-400 font-cinzel">
            Last Updated: August 2026 · Khokharz Cafe
          </p>
        </Reveal>

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl space-y-8 rounded-3xl border border-[#e2c569]/30 bg-[#0f0c08] p-8 text-neutral-300 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Eye className="h-5 w-5 text-[#e2c569]" />
              1. Information We Collect
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              At {SITE.name}, we value your privacy. When you place an online order or reserve a table through our website, we collect personal information necessary to fulfill your request, including your name, phone number, email address, delivery address, and table preferences.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Lock className="h-5 w-5 text-[#e2c569]" />
              2. How We Use Your Data
            </h2>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-5">
              <li>To process and deliver your online food orders efficiently.</li>
              <li>To confirm and manage your table reservations.</li>
              <li>To send SMS or email order receipts and status notifications.</li>
              <li>To provide customer support and address any inquiries.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <FileText className="h-5 w-5 text-[#e2c569]" />
              3. Data Security & Third-Party Protection
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              We never sell, rent, or trade customer personal data to third parties. All sensitive information transmitted during checkout or booking is encrypted using industry-standard SSL security protocols.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <CheckCircle2 className="h-5 w-5 text-[#e2c569]" />
              4. Contact Privacy Officer
            </h2>
            <p className="text-xs text-neutral-300">
              For any questions regarding our privacy practices, contact us at:
            </p>
            <div className="rounded-xl border border-[#e2c569]/20 bg-black/60 p-4 text-xs font-cinzel text-[#e2c569]">
              📧 Email: {SITE.email} | 📞 Phone: {SITE.phone}
            </div>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
