import Header from "./components/Header";
import Footer from "./components/Footer";
import { Eye, Target } from "lucide-react";

const CORE_VALUES = [
    {
        title: "Integrity",
        description:
            "We operate with honesty, transparency, and professionalism.",
    },
    {
        title: "Excellence",
        description: "We strive for outstanding results in every campaign.",
    },
    {
        title: "Innovation",
        description:
            "We continuously improve our sales processes and market strategies.",
    },
    {
        title: "Partnership",
        description:
            "We build long-term relationships based on trust and mutual success.",
    },
];

/* Gallery placeholders — swap srcs when real photos arrive */
const GALLERY_SLOTS = [1, 2, 3, 4, 5, 6];

export default function About() {
    return (
        <>
            <Header />

            <main className="w-full">
                {/* ── Page header — polygon-cut dark banner ───── */}
                <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 pt-32 md:pt-40">
                    {/* Faceted polygon accents */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                    >
                        <div
                            className="absolute -right-20 top-10 h-72 w-72 bg-indigo-600/20"
                            style={{
                                clipPath:
                                    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                            }}
                        />
                        <div
                            className="absolute -left-16 bottom-0 h-56 w-56 bg-fuchsia-600/15"
                            style={{
                                clipPath:
                                    "polygon(25% 0%, 100% 20%, 75% 100%, 0% 80%)",
                            }}
                        />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                            About Us
                        </span>
                        <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                            WHO WE{" "}
                            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                ARE
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                            Veritas is a leading sales and business development
                            company headquartered in Singapore. Our mission is
                            simple: help our partners grow by delivering
                            qualified customers, measurable sales outcomes, and
                            sustainable revenue.
                        </p>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                            We work closely with trusted providers across
                            multiple industries — offering customers reliable
                            products and services while helping businesses
                            expand their market reach through proven sales
                            strategies, dedicated teams, and an extensive lead
                            database.
                        </p>
                    </div>

                    {/* Angled bottom edge — the polygon transition into the light section */}
                    <div
                        className="h-16 w-full bg-slate-50"
                        style={{
                            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
                        }}
                    />
                </section>

                {/* ── Mission / Vision ─────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-16 md:grid-cols-2 md:py-20 lg:px-10">
                        {[
                            {
                                icon: (
                                    <Target
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                ),
                                label: "Mission",
                                text: "To empower businesses with scalable sales solutions, connecting trusted service providers with customers through innovative lead generation and results-driven sales strategies.",
                            },
                            {
                                icon: (
                                    <Eye
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                ),
                                label: "Vision",
                                text: "To become Southeast Asia's most trusted and effective sales growth partner, delivering measurable business success through integrity, innovation, and performance excellence.",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 lg:p-10"
                            >
                                {/* Corner polygon accent */}
                                <div
                                    aria-hidden="true"
                                    className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10"
                                    style={{
                                        clipPath:
                                            "polygon(100% 0, 0 0, 100% 100%)",
                                    }}
                                />
                                <div className="flex items-center gap-3 text-indigo-600">
                                    {/* {item.icon} */}
                                    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest">
                                        {item.label}
                                    </span>
                                </div>
                                <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Core Values ──────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20 lg:px-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                            Our Core Values
                        </span>
                        <h2 className="mt-5 max-w-xl text-2xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                            WHAT WE{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                STAND FOR
                            </span>
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {CORE_VALUES.map((value, i) => (
                                <div
                                    key={value.title}
                                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6"
                                >
                                    <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />
                                    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
                                        {value.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Founder ──────────────────────────────────── */}
                <section className="w-full bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-5 lg:gap-16 lg:px-10">
                        {/* Left — portrait with polygon frame */}
                        <div className="lg:col-span-2">
                            <div className="relative mx-auto max-w-sm lg:max-w-none">
                                {/* Offset polygon backplate */}
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-4 -top-4 h-full w-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 opacity-20"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 100% 4%, 96% 100%, 4% 96%)",
                                    }}
                                />
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 to-slate-300">
                                    {/* Swap for founder photo:
                                        <img src={founderImg} alt="Jerome [Lastname], Founder of Veritas" className="h-full w-full object-cover" /> */}
                                    <span className="absolute bottom-3 left-4 font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
                                        Founder photo placeholder
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right — quote */}
                        <div className="lg:col-span-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                From Our Founder
                            </span>

                            <blockquote className="mt-6">
                                <p className="text-xl font-medium leading-relaxed tracking-tight text-slate-900 sm:text-2xl">
                                    "We started Veritas with nothing but
                                    conviction — that sales done with integrity
                                    isn't just possible, it's the only way to
                                    build something that lasts."
                                </p>
                            </blockquote>

                            <div className="mt-6 flex items-center gap-4">
                                <div
                                    className="h-10 w-[3px] bg-gradient-to-b from-indigo-600 to-fuchsia-600"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p className="font-bold tracking-tight text-slate-900">
                                        FirstName [Lastname]
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Founder, Veritas Organisation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Gallery ──────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                            Gallery
                        </span>
                        <h2 className="mt-5 max-w-xl text-2xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                            LIFE AT{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                VERITAS
                            </span>
                        </h2>

                        {/* Masonry-ish grid: alternating aspect ratios */}
                        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                            {GALLERY_SLOTS.map((n, i) => (
                                <div
                                    key={n}
                                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/80 via-violet-600/80 to-fuchsia-600/80 ${
                                        i % 3 === 0
                                            ? "aspect-[4/5]"
                                            : "aspect-[4/3]"
                                    }`}
                                >
                                    {/* Swap for real photos:
                                        <img src={...} alt="..." className="absolute inset-0 h-full w-full object-cover" loading="lazy" /> */}
                                    <span className="absolute bottom-3 left-4 font-mono text-[10px] font-medium uppercase tracking-widest text-white/70">
                                        Photo {n}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
