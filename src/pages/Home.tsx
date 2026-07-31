// Images
import globe from "../assets/images/globe.webp";

// Lucide Icons
import {
    Network,
    Target,
    Users,
    TrendingUp,
    ShieldCheck,
    Zap,
    Printer,
    HomeIcon,
    Star,
    Quote,
    Sparkles,
    Package,
} from "lucide-react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MarqueeStrip from "./components/MarqueeStrip";
import HeroCarousel from "./components/HeroCarousel";
import Reveal from "./components/Reveal";

import {
    TESTIMONIALS,
    avatarSrc,
    photoSrc,
    initialsOf,
} from "../data/testimonials";

import productImage from "../assets/images/products_display.jpg";
import extensiveLead from "../assets/images/extensive.jpg";
import senokologo from "../assets/images/senoko.webp";

import { PRODUCT_CATEGORIES, productImgSrc } from "../data/products";

export default function Home() {
    const CATEGORY_ICONS: Record<string, React.ElementType> = {
        energy: Zap,
        residential: HomeIcon,
        printer: Printer,
        "business-dev": TrendingUp,
        cleaning: Sparkles,
    };
    const reasons = [
        {
            icon: <Network className="h-6 w-6" strokeWidth={1.75} />,
            title: "Extensive Lead Network",
            description:
                "Access to one of the most comprehensive lead-generation networks in the market.",
        },
        {
            icon: <Target className="h-6 w-6" strokeWidth={1.75} />,
            title: "Performance-Based Model",
            description:
                "Our focus is on delivering measurable outcomes and real business growth.",
        },
        {
            icon: <Users className="h-6 w-6" strokeWidth={1.75} />,
            title: "Experienced Team",
            description:
                "Dedicated sales professionals with proven industry expertise.",
        },
        {
            icon: <TrendingUp className="h-6 w-6" strokeWidth={1.75} />,
            title: "Scalable Growth",
            description: "Solutions designed to grow alongside your business.",
        },
        {
            icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />,
            title: "Trusted Reputation",
            description:
                "Built on transparency, accountability, and consistent results.",
        },
    ];

    return (
        <>
            <Header />

            <div className="w-full flex flex-col">
                {/* ── Hero Section ─────────────────────────────────── */}
                <section
                    className="relative w-full min-h-[600px] md:min-h-[700px] flex items-end md:items-center overflow-hidden"
                    aria-label="Hero"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center md:hidden"
                        style={{
                            backgroundImage: `url(/images/hero_web_mobile.jpg)`,
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-cover bg-top hidden md:block"
                        style={{ backgroundImage: `url(/images/hero_web.jpg)` }}
                    />

                    <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-black/25 to-black/65" />

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-14 md:pb-0 flex flex-col md:flex-row items-end md:items-center">
                        <div className="hidden md:block md:w-1/2">
                            <Reveal delay={200}>
                                <HeroCarousel />
                            </Reveal>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col gap-5 md:pl-10">
                            <Reveal>
                                <div className="flex items-center gap-3">
                                    <span className="uppercase tracking-[0.22em] text-xs font-semibold text-purple-400">
                                        Performance-Driven Sales
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="text-white text-4xl sm:text-5xl xl:text-[3.6rem] font-bold leading-[1.08] tracking-tight">
                                    TRUTH,{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                                        DELIVERED
                                    </span>
                                </h1>
                            </Reveal>

                            <Reveal delay={160}>
                                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm md:max-w-md">
                                    Performance-driven sales company
                                    specializing in growing service businesses
                                    across energy, utilities,
                                    telecommunications, and facilities
                                    management.
                                </p>
                            </Reveal>

                            <Reveal delay={240}>
                                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                                    <a
                                        href="/products"
                                        className="px-6 py-3 text-sm font-semibold tracking-wide text-white text-center
                                            rounded-lg bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                                            shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                                            hover:bg-purple-600/40 hover:border-purple-200/60 hover:-translate-y-0.5
                                            transition-all duration-300"
                                    >
                                        View Products
                                    </a>
                                    <a
                                        href="/careers"
                                        className="px-6 py-3 text-sm font-semibold tracking-wide text-center
                                            rounded-lg text-white/85 bg-white/5 backdrop-blur-md border border-white/25
                                            shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]
                                            hover:text-white hover:bg-white/15 hover:border-white/45 hover:-translate-y-0.5
                                            transition-all duration-300"
                                    >
                                        Join Our Team
                                    </a>
                                </div>
                            </Reveal>

                            <Reveal delay={320}>
                                <div className="mt-5 pt-5 border-t border-white/10 flex flex-row items-center gap-6 sm:gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-white text-xl sm:text-2xl font-bold leading-none text-center">
                                            10K+
                                        </span>
                                        <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                            Clients Served
                                        </span>
                                    </div>
                                    <div className="w-px h-8 bg-white/10 shrink-0" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-white text-xl sm:text-2xl font-bold leading-none text-center">
                                            4+
                                        </span>
                                        <span className="text-white/45 text-[11px] uppercase tracking-widest ">
                                            Years Active
                                        </span>
                                    </div>
                                    <div className="w-px h-8 bg-white/10 shrink-0" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-white text-xl sm:text-2xl font-bold leading-none text-center">
                                            90M+
                                        </span>
                                        <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                            Total Sales Generated
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ── Why Veritas ─────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
                        <Reveal>
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                    Why Veritas
                                </span>
                                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                                    RESULTS THAT{" "}
                                    <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                        MATTER
                                    </span>
                                </h2>
                                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                                    The advantages that make Veritas a sales
                                    partner service providers keep coming back
                                    to.
                                </p>
                            </div>
                        </Reveal>

                        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                            {reasons.map((reason, i) => (
                                <Reveal
                                    key={reason.title}
                                    delay={i * 90}
                                    className={i === 0 ? "lg:row-span-2" : ""}
                                >
                                    <article
                                        className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 ${
                                            i === 0 ? "lg:p-8" : ""
                                        }`}
                                    >
                                        <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

                                        <div className="relative z-10 flex h-full flex-col">
                                            <div className="flex items-center gap-2 text-indigo-600">
                                                {reason.icon}
                                            </div>

                                            <h3
                                                className={`mt-4 font-bold tracking-tight text-slate-900 ${
                                                    i === 0
                                                        ? "text-2xl"
                                                        : "text-lg"
                                                }`}
                                            >
                                                {reason.title}
                                            </h3>
                                            <p
                                                className={`mt-2.5 leading-relaxed text-slate-500 ${
                                                    i === 0
                                                        ? "text-base"
                                                        : "text-sm"
                                                }`}
                                            >
                                                {reason.description}
                                            </p>

                                            {i === 0 && (
                                                <div className="mt-auto pt-8">
                                                    {/* <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600"> */}
                                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                                                        <img
                                                            src={extensiveLead}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute -bottom-10 left-1/2 w-[140%] max-w-none -translate-x-1/2 opacity-90"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <MarqueeStrip />

                {/* ── What We Offer ─────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16 lg:px-10">
                        <Reveal>
                            <div className="flex flex-col">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                    What We Offer
                                </span>

                                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                                    QUALITY SOLUTIONS,{" "}
                                    <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                        TRUSTED PARTNERS
                                    </span>
                                </h2>

                                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
                                    We don't just sell — we connect. Veritas
                                    matches households and businesses to vetted
                                    partners offering competitive rates,
                                    dependable service, and solutions built to
                                    fit.
                                </p>

                                <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                                    <img
                                        src={productImage}
                                        alt="Product Image User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Reveal>

                        <div className="flex flex-col justify-center border-t border-slate-200 lg:border-l lg:border-t-0 lg:pl-16">
                            {PRODUCT_CATEGORIES.map((cat, i) => {
                                const Icon = CATEGORY_ICONS[cat.id] ?? Package;
                                return (
                                    <Reveal key={cat.id} delay={i * 90}>
                                        <a
                                            href={`/products/${cat.slug}`}
                                            className="group flex items-start gap-5 border-b border-slate-200 py-6 lg:py-7"
                                        >
                                            <span className="mt-0.5 font-mono text-[11px] font-semibold tracking-widest text-indigo-400">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-indigo-600">
                                                <Icon
                                                    className="h-5 w-5"
                                                    strokeWidth={1.75}
                                                />
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
                                                    {cat.name}
                                                </h3>
                                                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                                    {cat.description}
                                                </p>
                                            </div>
                                            <span className="mt-1 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-500">
                                                →
                                            </span>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Closing CTA ───────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-10">
                        <Reveal>
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950">
                                <svg
                                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay"
                                    aria-hidden="true"
                                >
                                    <filter id="veritas-grain">
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.9"
                                            numOctaves="2"
                                            stitchTiles="stitch"
                                        />
                                        <feColorMatrix
                                            type="saturate"
                                            values="0"
                                        />
                                    </filter>
                                    <rect
                                        width="100%"
                                        height="100%"
                                        filter="url(#veritas-grain)"
                                    />
                                </svg>

                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -left-1/4 -top-1/2 h-[140%] w-[70%]"
                                    style={{
                                        background:
                                            "radial-gradient(closest-side, rgba(129,140,248,0.18), transparent 70%)",
                                    }}
                                />

                                <div className="relative grid grid-cols-1 gap-10 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-5 lg:gap-16 lg:px-14 lg:py-24">
                                    <div className="flex flex-col lg:col-span-3">
                                        <span className="inline-flex w-fit items-center rounded-full gap-2 border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                            Get Started
                                        </span>

                                        <h2 className="mt-5 max-w-md text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
                                            TWO WAYS FORWARD WITH VERITAS
                                        </h2>

                                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                                            Build a career with a team that
                                            rewards performance — or discover
                                            solutions matched to your needs
                                            through our trusted partners.
                                        </p>

                                        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                            <a
                                                href="/careers"
                                                className="rounded-lg border border-white bg-white px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-slate-950 transition-colors duration-300 hover:bg-white/90"
                                            >
                                                VIEW OPEN ROLES
                                            </a>
                                            <a
                                                href="/products"
                                                className="rounded-lg border border-white/25 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-white backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/40"
                                            >
                                                EXPLORE OUR SOLUTIONS
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center lg:col-span-2">
                                        <div className="relative w-full rounded-xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-2xl backdrop-saturate-150">
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                            />
                                            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                                                Trusted since 2024
                                            </span>
                                            <p className="mt-3 text-5xl font-bold tracking-tight text-white">
                                                500
                                                <span className="text-indigo-300">
                                                    +
                                                </span>
                                            </p>
                                            <p className="mt-1 text-sm text-white/55">
                                                Businesses partnered with
                                                Veritas
                                            </p>

                                            <div className="mt-6 border-t border-white/10 pt-6">
                                                <p className="text-sm leading-relaxed text-white/55">
                                                    Every partnership is
                                                    measured on results — not
                                                    activity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Testimonials ──────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-10">
                        <Reveal>
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                    Testimonials
                                </span>
                                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                                    WHAT OUR PARTNERS{" "}
                                    <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                        SAY
                                    </span>
                                </h2>
                                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                                    Results speak louder than promises — here's
                                    what the businesses we work with have to
                                    say.
                                </p>
                            </div>
                        </Reveal>

                        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {TESTIMONIALS.map((t, i) => {
                                const src = avatarSrc(t.avatar);
                                return (
                                    <Reveal key={t.id} delay={i * 90}>
                                        <figure className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 lg:p-7">
                                            <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

                                            <Quote
                                                className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 text-slate-900/[0.03]"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                aria-hidden="true"
                                            />

                                            <div className="relative z-10 flex h-full flex-col">
                                                <div
                                                    className="flex items-center gap-0.5"
                                                    role="img"
                                                    aria-label={`${t.rating} out of 5 stars`}
                                                >
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, si) => (
                                                        <Star
                                                            key={si}
                                                            className={`h-4 w-4 ${
                                                                si < t.rating
                                                                    ? "fill-amber-400 text-amber-400"
                                                                    : "fill-slate-200 text-slate-200"
                                                            }`}
                                                            strokeWidth={0}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>

                                                <blockquote className="mt-4 flex-1">
                                                    <p className="text-sm leading-relaxed text-slate-600">
                                                        {t.quote}
                                                    </p>
                                                </blockquote>

                                                <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                                                    {photoSrc(t.photo) ? (
                                                        <img
                                                            src={photoSrc(
                                                                t.photo,
                                                            )}
                                                            alt=""
                                                            loading="lazy"
                                                            className="absolute inset-0 h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="absolute bottom-2 left-3 font-mono text-[9px] font-medium uppercase tracking-widest text-slate-400">
                                                            Image placeholder
                                                        </span>
                                                    )}
                                                </div>

                                                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                                                    {src ? (
                                                        <img
                                                            src={src}
                                                            alt=""
                                                            loading="lazy"
                                                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 font-mono text-[11px] font-bold text-white"
                                                        >
                                                            {initialsOf(t.name)}
                                                        </span>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-bold tracking-tight text-slate-900">
                                                            {t.name}
                                                        </p>
                                                        <p className="truncate text-xs text-slate-500">
                                                            {t.role}
                                                        </p>
                                                        <p className="truncate text-xs text-slate-500">
                                                            {t.company}
                                                        </p>
                                                    </div>
                                                </figcaption>
                                            </div>
                                        </figure>
                                    </Reveal>
                                );
                            })}
                        </div>

                        {/* ── Spotlight testimonial — standalone, below the card grid ── */}
                        <Reveal delay={280}>
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-8 sm:p-10 lg:p-12 mt-6 md:mt-14">
                                {/* Grain texture — same treatment as the Closing CTA panel */}
                                <svg
                                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay"
                                    aria-hidden="true"
                                >
                                    <filter id="testimonial-grain">
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.9"
                                            numOctaves="2"
                                            stitchTiles="stitch"
                                        />
                                        <feColorMatrix
                                            type="saturate"
                                            values="0"
                                        />
                                    </filter>
                                    <rect
                                        width="100%"
                                        height="100%"
                                        filter="url(#testimonial-grain)"
                                    />
                                </svg>

                                {/* Single restrained light source */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -left-1/4 -top-1/2 h-[140%] w-[70%]"
                                    style={{
                                        background:
                                            "radial-gradient(closest-side, rgba(129,140,248,0.18), transparent 70%)",
                                    }}
                                />

                                <Quote
                                    className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-white/[0.05]"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    aria-hidden="true"
                                />

                                <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
                                    {/* Quote body */}
                                    <div className="lg:col-span-3">
                                        <div
                                            className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400"
                                            aria-hidden="true"
                                        />
                                        <blockquote className="mt-6 space-y-4 text-base leading-relaxed text-white/75 sm:text-lg">
                                            <p>
                                                Veritas Organisation has been an
                                                absolute game-changer since
                                                becoming a Business Partner of
                                                Genco Energy. From the very
                                                beginning, Veritas entered the
                                                partnership with a clear
                                                mission: to capture Singapore's
                                                highly competitive and diverse
                                                energy market. In a remarkably
                                                short period, the team has
                                                exceeded every expectation.
                                            </p>
                                            <p>
                                                Beyond their outstanding
                                                business expertise, Veritas
                                                Organisation brings
                                                professionalism, innovation, and
                                                a collaborative approach to
                                                every engagement. The team is
                                                proactive, solution-oriented,
                                                and consistently goes above and
                                                beyond to ensure clients receive
                                                exceptional value. Veritas
                                                Organisation has proven to be an
                                                invaluable partner in our growth
                                                strategy, and we highly
                                                recommend them to any
                                                organization seeking a trusted
                                                and results-driven business
                                                partner.
                                            </p>
                                        </blockquote>
                                    </div>

                                    {/* Attribution */}
                                    <div className="flex flex-col justify-start border-t border-white/10 pt-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                                        {/* <div
                                            className="flex items-center gap-0.5"
                                            role="img"
                                            aria-label="5 out of 5 stars"
                                        >
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                                        strokeWidth={0}
                                                        aria-hidden="true"
                                                    />
                                                ),
                                            )}
                                        </div> */}

                                        <div className="mt-4 flex items-center gap-3">
                                            <img
                                                aria-hidden="true"
                                                src={senokologo}
                                                alt="Senoko"
                                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm font-bold tracking-tight text-white">
                                                    Daryil Ian Rajoo
                                                </p>
                                                <p className="text-xs text-white/50">
                                                    Director, Genco Energy Pte
                                                    Ltd
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-4">
                                            <span className="w-fit rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-indigo-200">
                                                Authorised Senoko Channel
                                                Partner
                                            </span>
                                            <p className="mt-1 text-xs text-white/50">
                                                Industry: Commercial and
                                                Residential Energy Sales
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
