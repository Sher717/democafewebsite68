import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Sparkles, AlertCircle } from "lucide-react";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/food-safety")({
  head: () => ({
    meta: [
      { title: "Food Safety & Quality — Khokharz Cafe" },
      {
        name: "description",
        content: "Learn about FSSAI quality standards, allergen disclosures, and fresh kitchen hygiene practices at Khokharz Cafe.",
      },
    ],
  }),
  component: FoodSafetyPage,
});

function FoodSafetyPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#e2c569] uppercase">
            <Award className="h-4 w-4" />
            <span>FSSAI & QUALITY STANDARDS</span>
          </div>
          <h1 className="mt-3 font-cinzel text-4xl font-bold tracking-wider text-[#e2c569]">
            FOOD SAFETY & HYGIENE
          </h1>
          <p className="mt-2 text-xs text-neutral-400 font-cinzel">
            Uncompromising Culinary Excellence · Khokharz Cafe
          </p>
        </Reveal>

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl space-y-8 rounded-3xl border border-[#e2c569]/30 bg-[#0f0c08] p-8 text-neutral-300 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <ShieldCheck className="h-5 w-5 text-[#e2c569]" />
              1. FSSAI & Kitchen Sanitation
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Our kitchen adheres strictly to FSSAI food safety regulations. All kitchen equipment is sanitized multiple times daily, and our baristas and chefs wear protective gear at all times.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <Sparkles className="h-5 w-5 text-[#e2c569]" />
              2. Fresh Sourcing & Zero Preservatives
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              We source organic dairy, single-origin espresso beans, fresh vegetables, and scratch-baked breads every morning. We never use artificial preservatives or re-used cooking oils.
            </p>
          </section>

          <section className="space-y-3 border-t border-neutral-800 pt-6">
            <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold text-[#e2c569]">
              <AlertCircle className="h-5 w-5 text-[#e2c569]" />
              3. Allergen Advice
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              If you have severe food allergies (dairy, nuts, gluten, soy), please inform our server or write a note in your online order instructions before checkout so our team can take special precautions.
            </p>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
