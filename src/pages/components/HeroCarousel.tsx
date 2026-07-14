import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCT_CATEGORIES, productImgSrc } from "../../data/products";

export default function HeroCarousel() {
    const slides = PRODUCT_CATEGORIES;
    const count = slides.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = () => setActive((i) => (i + 1) % count);
    const prev = () => setActive((i) => (i - 1 + count) % count);

    /* Auto-advance every 4.5s — pauses while the user hovers/interacts */
    useEffect(() => {
        if (paused) return;
        const id = setInterval(next, 4500);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused, count]);

    /* Position of each slide relative to the active one: -1 prev, 0 active, 1 next */
    const offsetOf = (i: number) => {
        const diff = (i - active + count) % count;
        if (diff === 0) return 0;
        if (diff === 1) return 1;
        if (diff === count - 1) return -1;
        return null; // not visible
    };

    const slideClasses = (offset: number | null) => {
        switch (offset) {
            case 0:
                return "z-20 opacity-100 translate-x-0 scale-100 blur-0";
            case -1:
                return "z-10 opacity-30 -translate-x-[40%] scale-[0.6] blur-[2px]";
            case 1:
                return "z-10 opacity-30 translate-x-[40%] scale-[0.6] blur-[2px]";
            default:
                return "z-0 opacity-0 scale-50 pointer-events-none";
        }
    };

    return (
        <div
            className="relative flex h-full min-h-[480px] w-full flex-col items-center justify-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Glow pedestal */}
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/25 blur-[90px]"
            />
            {/* Ground ellipse */}
            <div
                aria-hidden="true"
                className="absolute bottom-24 left-1/2 h-6 w-52 -translate-x-1/2 rounded-[100%] bg-black/40 blur-xl"
            />

            {/* Stage — wider than before to give the peeks room */}
            <div className="relative h-72 w-full max-w-md sm:h-80">
                {slides.map((slide, i) => {
                    const offset = offsetOf(i);
                    const src = productImgSrc(slide.featured_image);
                    const isActive = offset === 0;
                    return (
                        <div
                            key={slide.id}
                            aria-hidden={!isActive}
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${slideClasses(offset)}`}
                        >
                            {src ? (
                                <img
                                    src={src}
                                    alt={isActive ? slide.name : ""}
                                    className="max-h-full max-w-[70%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                                />
                            ) : (
                                <div className="flex h-52 w-52 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/40">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                                        {slide.tagline}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Arrows — same glass treatment as the NewsPost carousel */}
                <button
                    onClick={prev}
                    aria-label="Previous product"
                    className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/50 hover:border-white/40 cursor-pointer"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={next}
                    aria-label="Next product"
                    className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/50 hover:border-white/40 cursor-pointer"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Caption */}
            <div className="mt-6 h-12 text-center">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-300">
                    {slides[active].tagline}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">
                    {slides[active].name}
                </p>
            </div>

            {/* Dots */}
            <div className="mt-3 flex items-center gap-2">
                {slides.map((slide, i) => (
                    <button
                        key={slide.id}
                        onClick={() => setActive(i)}
                        aria-label={`Show ${slide.name}`}
                        aria-current={i === active}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === active
                                ? "w-6 bg-purple-400"
                                : "w-1.5 bg-white/25 hover:bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
