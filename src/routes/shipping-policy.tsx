import { createFileRoute } from "@tanstack/react-router";
import { Truck, Clock, MapPin, PackageCheck } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — Khokharz Cafe" },
      {
        name: "description",
        content: "Express food delivery radii, takeaway pickup instructions, and preparation timelines at Khokharz Cafe.",
      },
    ],
  }),
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#e2c569] uppercase">
            <Truck className="h-4 w-4" />
            <span>PICKUP & DELIVERY</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569]">
            SHIPPING & DELIVERY
          </h1>
          <p className="mt-2 text-xs text-neutral-400 font-cinzel">
            Fulfilment Guidelines · Khokharz Cafe
          </p>
        </Reveal>

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl space-y-8 rounded-3xl border border-[#e2c569]/30 bg-[#0f0c08] p-8 text-neutral-300 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Clock className="h-5 w-5 text-[#e2c569]" />
              1. Preparation & Pickup Timelines
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              For Takeaway and Dine-In orders, food is prepared fresh to order within <strong>10 to 15 minutes</strong>. Pickup orders can be collected directly from the 2nd floor counter at Emera Place.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <MapPin className="h-5 w-5 text-[#e2c569]" />
              2. Delivery Radius & Express Shipping
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Local express food delivery is available within a 7 km radius. Estimated delivery times range from 20 to 35 minutes depending on location and traffic.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <PackageCheck className="h-5 w-5 text-[#e2c569]" />
              3. Hygienic Packaging Standards
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              All delivery items are packed in eco-friendly tamper-evident thermal boxes to retain heat, freshness, and aroma during transit.
            </p>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
