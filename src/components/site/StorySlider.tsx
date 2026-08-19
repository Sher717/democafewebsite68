import { useState, useEffect, useRef } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, Heart, Flame, Leaf, Coffee, Award, RefreshCw } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import espressoImg from "@/assets/espresso.jpg";
import coffeeImg from "@/assets/coffee-pour.jpg";
import focacciaImg from "@/assets/focaccia.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";

interface StorySlide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  quote: string;
  img: string;
  icon: typeof Coffee;
  badge: string;
  accentColor: string;
  details: string[];
}

const storySlides: StorySlide[] = [
  {
    id: 1,
    title: "Pure Origin Beans",
    subtitle: "CHAPTER 01 · THE FOUNDATION",
    tag: "ETHICALLY SOURCED",
    quote: "Every memorable cup begins high in the shade-grown mountain estates.",
    img: espressoImg,
    icon: Flame,
    badge: "100% Arabica",
    accentColor: "from-amber-500 via-amber-400 to-yellow-300",
    details: ["Single-Origin Beans", "Micro-Lot Roasted", "Hand-Sorted Selection"],
  },
  {
    id: 2,
    title: "Precision Extraction",
    subtitle: "CHAPTER 02 · THE CRAFT",
    tag: "BARISTA MASTERY",
    quote: "Calibrated to 9-bar pressure for a rich golden crema & silk texture.",
    img: coffeeImg,
    icon: Coffee,
    badge: "9-Bar Crema",
    accentColor: "from-amber-400 via-yellow-400 to-amber-600",
    details: ["25-Sec Extraction", "Steamed Microfoam", "Signature Latte Art"],
  },
  {
    id: 3,
    title: "Baked Fresh Daily",
    subtitle: "CHAPTER 03 · THE KITCHEN",
    tag: "ARTISAN BAKERY",
    quote: "Scratch-made focaccia, golden brioche & pastries fresh out of the oven.",
    img: focacciaImg,
    icon: Leaf,
    badge: "Scratch Made",
    accentColor: "from-amber-400 via-[#e2c569] to-orange-400",
    details: ["Daily 6:00 AM Bake", "Organic Flour", "Herb Garlic Butter"],
  },
  {
    id: 4,
    title: "Pure Quality Food",
    subtitle: "CHAPTER 04 · THE STANDARD",
    tag: "ZERO PRESERVATIVES",
    quote: "Real food cooked with passion. No artificial colors, only fresh herbs & olive oil.",
    img: atmosphereImg,
    icon: Award,
    badge: "Pure & Organic",
    accentColor: "from-emerald-400 via-amber-300 to-yellow-400",
    details: ["Fresh Farm Produce", "House-made Sauces", "Made to Order"],
  },
  {
    id: 5,
    title: "Crafted for Moments",
    subtitle: "CHAPTER 05 · THE AMBIENCE",
    tag: "YOUR HAPPY PLACE",
    quote: "A warm space designed for conversations, productivity, and joyful sips.",
    img: heroImg,
    icon: Heart,
    badge: "Cozy Vibe",
    accentColor: "from-rose-400 via-amber-300 to-[#e2c569]",
    details: ["Emera Place 2nd Floor", "Cozy Seating", "Warm Hospitality"],
  },
];

export function StorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per story

  const currentSlide = storySlides[currentIndex] ?? storySlides[0]!;
  const Icon = currentSlide.icon;

  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressIntervalRef.current!);
        handleNext();
      }
    }, 40);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % storySlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#090806] py-16 text-white border-y border-[#e2c569]/30">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#e2c569]/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 font-cinzel text-xs font-bold tracking-[0.3em] text-[#e2c569] uppercase">
            <Sparkles className="h-4 w-4" />
            <span>INTERACTIVE BRAND STORY</span>
          </div>
          <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wider text-[#e2c569] sm:text-4xl">
            THE KHOKHARZ QUALITY STORY
          </h2>
          <p className="mt-1 font-script text-2xl text-[#f5e4a8]">
            Watch how we turn pure ingredients into unforgettable moments
          </p>
        </div>

        {/* Story Cinema Frame */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-[#e2c569]/40 bg-[#0f0c08] shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          
          {/* Top Story Progress Bar Lines */}
          <div className="absolute top-0 left-0 right-0 z-30 flex gap-1.5 p-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
            {storySlides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(true);
                }}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20 cursor-pointer transition-all hover:bg-white/40"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-[#e2c569] transition-all ease-linear"
                  style={{
                    width:
                      idx < currentIndex
                        ? "100%"
                        : idx === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main Slide Stage (Grid of Media + Animated Text) */}
          <div className="relative grid min-h-[460px] lg:min-h-[520px] lg:grid-cols-[1.2fr_1fr]">
            
            {/* Left Column: Ken Burns Zooming Image Container */}
            <div className="group relative overflow-hidden bg-black">
              <img
                key={currentSlide.img}
                src={currentSlide.img}
                alt={currentSlide.title}
                className="h-full w-full object-cover transition-all duration-[7000ms] ease-out transform scale-105 group-hover:scale-115 animate-in fade-in-50 duration-700 min-h-[300px] lg:min-h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-16 left-5 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-1.5 text-xs font-cinzel font-bold text-[#e2c569] backdrop-blur-md shadow-lg animate-float">
                <Icon className="h-4 w-4 text-[#e2c569]" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Slide Counter Indicator */}
              <div className="absolute bottom-5 left-5 z-20 rounded-xl border border-white/10 bg-black/80 px-3 py-1 font-cinzel text-xs text-neutral-300 backdrop-blur-md">
                SLIDE <span className="font-bold text-[#e2c569]">0{currentIndex + 1}</span> / 0{storySlides.length}
              </div>
            </div>

            {/* Right Column: Animated Text & Story Highlights */}
            <div className="flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-[#14120c] to-[#090806] border-t lg:border-t-0 lg:border-l border-[#e2c569]/20">
              
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.25em] text-[#e2c569]">
                  <span className="h-2 w-2 rounded-full bg-[#e2c569] animate-ping" />
                  <span>{currentSlide.subtitle}</span>
                </div>

                <h3 className="font-cinzel text-3xl font-bold tracking-wide text-white sm:text-4xl drop-shadow">
                  {currentSlide.title}
                </h3>

                <p className="font-script text-2xl text-[#f5e4a8] leading-relaxed">
                  "{currentSlide.quote}"
                </p>

                {/* Key Quality Details List */}
                <div className="pt-2">
                  <p className="font-cinzel text-[10px] tracking-widest text-[#e2c569] uppercase font-bold mb-2">
                    KEY QUALITY METRICS:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {currentSlide.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 rounded-lg border border-[#e2c569]/20 bg-black/40 px-3 py-2 text-xs font-medium text-neutral-200">
                        <Sparkles className="h-3.5 w-3.5 text-[#e2c569] shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Story Control Navigation Bar */}
              <div className="mt-8 flex items-center justify-between border-t border-[#e2c569]/20 pt-4">
                
                {/* Play / Pause Toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 rounded-xl border border-[#e2c569]/40 bg-[#e2c569]/10 px-4 py-2 text-xs font-cinzel font-bold text-[#e2c569] transition-all hover:bg-[#e2c569] hover:text-black"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>PAUSE STORY</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>AUTOPLAY</span>
                    </>
                  )}
                </button>

                {/* Prev & Next Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous story"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2c569]/30 bg-black/60 text-[#e2c569] transition-all hover:border-[#e2c569] hover:bg-[#e2c569] hover:text-black"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next story"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2c569]/30 bg-black/60 text-[#e2c569] transition-all hover:border-[#e2c569] hover:bg-[#e2c569] hover:text-black"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Thumbnail Selector Bar */}
        <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-2">
          {storySlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(true);
              }}
              className={`group flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-cinzel font-semibold transition-all shrink-0 ${
                idx === currentIndex
                  ? "border-[#e2c569] bg-[#e2c569]/20 text-[#e2c569] shadow-[0_0_15px_rgba(226,197,105,0.2)]"
                  : "border-white/10 bg-black/40 text-neutral-400 hover:border-white/30 hover:text-white"
              }`}
            >
              <span className="font-bold">0{idx + 1}</span>
              <span>{slide.title}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
