import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaAnchor, CtaLink } from "@/components/site/Cta";
import { DIRECTIONS_URL, MAP_EMBED_URL, SITE } from "@/lib/site";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location & Directions — Khokharz Cafe, Halifax" },
      {
        name: "description",
        content:
          "Khokharz Cafe is at 5151 Terminal Rd, 2nd Floor, Halifax, NS B3J 1A1 — on Floor 2 of Emera Place. Get directions.",
      },
      { property: "og:title", content: "Location & Directions — Khokharz Cafe, Halifax" },
      {
        property: "og:description",
        content: "Find Khokharz Cafe on the second floor of Emera Place, 5151 Terminal Rd, Halifax.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/location" },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <p className="eyebrow">Location</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">
          Second floor, Emera Place.
        </h1>
      </Container>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <address className="text-lg not-italic leading-relaxed">
              {SITE.name}
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.country}
            </address>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Located on Floor 2 of Emera Place, on Terminal Rd in downtown Halifax — within walking
              distance of the waterfront and cruise terminal area.
            </p>

            <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-4 py-3">
                <dt className="text-muted-foreground">Services</dt>
                <dd>{SITE.services.join(" · ")}</dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 py-3">
                <dt className="text-muted-foreground">Price range</dt>
                <dd>{SITE.priceRange}</dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 py-3">
                <dt className="text-muted-foreground">Hours</dt>
                <dd className="text-muted-foreground">{SITE.hours}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaAnchor href={DIRECTIONS_URL} variant="primary">
                Get Directions
              </CtaAnchor>
              <CtaLink to="/menu" variant="outline">
                View Menu
              </CtaLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <iframe
              title="Map showing Khokharz Cafe at 5151 Terminal Rd, Halifax"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border border-border sm:h-[520px]"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
