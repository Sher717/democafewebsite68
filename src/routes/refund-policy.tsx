import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcw, CheckCircle2, Clock, AlertTriangle, CreditCard } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — Khokharz Cafe" },
      {
        name: "description",
        content: "Learn about order cancellation rules, refund processing timelines, and resolution policies at Khokharz Cafe.",
      },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#e2c569] uppercase">
            <RefreshCcw className="h-4 w-4" />
            <span>CANCELLATION & REFUNDS</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569]">
            REFUND & CANCELLATION
          </h1>
          <p className="mt-2 text-xs text-neutral-400 font-cinzel">
            Customer Protection Policy · Khokharz Cafe
          </p>
        </Reveal>

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl space-y-8 rounded-3xl border border-[#e2c569]/30 bg-[#0f0c08] p-8 text-neutral-300 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Clock className="h-5 w-5 text-[#e2c569]" />
              1. Order Cancellation Policy
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Online orders can be cancelled free of charge within <strong>3 minutes</strong> of placing the order. Once kitchen preparation begins, orders cannot be cancelled due to the perishable fresh nature of our food.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <CreditCard className="h-5 w-5 text-[#e2c569]" />
              2. Refund Processing Timelines
            </h2>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-5">
              <li>Eligible refunds for cancelled orders or payment errors will be processed to the original payment method within 3 to 5 business days.</li>
              <li>UPI and card refunds are initiated immediately upon manager approval.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <AlertTriangle className="h-5 w-5 text-[#e2c569]" />
              3. Quality Guarantee & Replacement
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              If an item received is incorrect, damaged, or fails to meet our quality standards, notify our manager immediately or call {SITE.phone} for an instant replacement or full credit.
            </p>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
