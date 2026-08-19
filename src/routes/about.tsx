import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cafe.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";
import { Container, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { StorySlider } from "@/components/site/StorySlider";
import { CtaAnchor, CtaLink } from "@/components/site/Cta";
import { DIRECTIONS_URL, SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Khokharz Cafe — Emera Place, Halifax" },
      {
        name: "description",
        content:
          "Khokharz Cafe is a cafe on the second floor of Emera Place in Halifax, serving coffee, breakfast and lunch for dine-in or takeaway.",
      },
      { property: "og:title", content: "About Khokharz Cafe — Emera Place, Halifax" },
      {
        property: "og:description",
        content: "A warm, welcoming cafe on the second floor of Emera Place in downtown Halifax.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">
          Your little break in the middle of Halifax.
        </h1>
      </Container>

      <Container className="pb-16">
        <img
          src={heroImg}
          width={1280}
          height={1600}
          loading="lazy"
          alt="Cafe counter and seating in warm daylight — placeholder image, to be replaced with Khokharz Cafe photography"
          className="h-[320px] w-full object-cover sm:h-[520px]"
        />
      </Container>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p className="font-display text-2xl leading-snug text-foreground sm:text-[1.75rem]">
              Khokharz Cafe is a cafe on the second floor of Emera Place, on Terminal Rd in downtown
              Halifax.
            </p>
            <p>
              Mornings are for coffee and breakfast. Midday it turns over to lunch — focaccia
              sandwiches, butter chicken, the sort of food that makes a break out of a lunch hour.
              Alternative milks, including almond milk, are available.
            </p>
            <p>
              You can sit down with it or take it away. Either way it's a short trip from the
              offices and streets around Terminal Rd, and an easy detour if you're walking the
              downtown waterfront.
            </p>
            <p>
              Public reviews currently average {SITE.rating.value} out of 5 across{" "}
              {SITE.rating.count} reviews. Most visits land around {SITE.priceRange}.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <img
              src={atmosphereImg}
              width={1200}
              height={1100}
              loading="lazy"
              alt="Guests eating and talking at a cafe table — placeholder image, to be replaced with Khokharz Cafe photography"
              className="h-[380px] w-full object-cover sm:h-[520px]"
            />
          </Reveal>
        </div>
      </Section>

      {/* Interactive Story Slide */}
      <StorySlider />

      <Section tone="espresso">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Come see for yourself.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink to="/menu" variant="light">
              View Menu
            </CtaLink>
            <CtaAnchor href={DIRECTIONS_URL} variant="outline">
              Get Directions
            </CtaAnchor>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
