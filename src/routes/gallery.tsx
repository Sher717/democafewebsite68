import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cafe.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";
import coffeeImg from "@/assets/coffee-pour.jpg";
import breakfastImg from "@/assets/breakfast.jpg";
import focacciaImg from "@/assets/focaccia.jpg";
import butterChickenImg from "@/assets/butter-chicken.jpg";
import espressoImg from "@/assets/espresso.jpg";
import tableImg from "@/assets/table-detail.jpg";
import { Container } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Khokharz Cafe, Halifax" },
      {
        name: "description",
        content:
          "Coffee, food, interior and atmosphere at Khokharz Cafe on the second floor of Emera Place in Halifax.",
      },
      { property: "og:title", content: "Gallery — Khokharz Cafe, Halifax" },
      {
        property: "og:description",
        content: "A visual look at coffee, food and the room at Khokharz Cafe in Halifax.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const images = [
  { src: heroImg, w: 1280, h: 1600, alt: "Cafe interior with espresso machine and window seating", cat: "Interior" },
  { src: espressoImg, w: 900, h: 1200, alt: "Espresso extracting into a glass cup", cat: "Coffee" },
  { src: focacciaImg, w: 1200, h: 900, alt: "Focaccia sandwich cut in half on parchment", cat: "Food" },
  { src: atmosphereImg, w: 1200, h: 1100, alt: "Guests talking over coffee and lunch", cat: "Atmosphere" },
  { src: coffeeImg, w: 1200, h: 900, alt: "Barista pouring milk into a cup of coffee", cat: "Coffee" },
  { src: butterChickenImg, w: 1200, h: 900, alt: "Bowl of butter chicken with rice", cat: "Food" },
  { src: breakfastImg, w: 1200, h: 900, alt: "Breakfast plate served with a coffee", cat: "Food" },
  { src: tableImg, w: 900, h: 1200, alt: "Cups of coffee on a sunlit wooden table", cat: "Interior" },
];

function GalleryPage() {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">
          Coffee, food and the room it's served in.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          These are placeholder images standing in for real Khokharz Cafe photography — they are not
          photographs of the cafe and can be swapped out once the business photos are available.
        </p>
      </Container>

      <Container className="pb-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {images.map((img, i) => (
            <Reveal key={img.alt} delay={(i % 3) * 70} className="break-inside-avoid">
              <figure className="group overflow-hidden">
                <img
                  src={img.src}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  alt={`${img.alt} — placeholder image, to be replaced with Khokharz Cafe photography`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                  {img.cat}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
