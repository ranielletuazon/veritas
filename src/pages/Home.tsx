import hero_desktop from "../assets/images/hero_web.jpg";
import hero_mobile from "../assets/images/hero_web_mobile.jpg";

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
} from "lucide-react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MarqueeStrip from "./components/MarqueeStrip";
import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
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

    const offerings = [
        {
            icon: <Zap className="h-5 w-5" strokeWidth={1.75} />,
            name: "Electricity Solutions",
            blurb: "Competitive electricity plans through trusted energy partners.",
        },
        {
            icon: <Printer className="h-5 w-5" strokeWidth={1.75} />,
            name: "Printer Solutions",
            blurb: "Business-grade printing, leasing, and managed print services.",
        },
        {
            icon: <HomeIcon className="h-5 w-5" strokeWidth={1.75} />,
            name: "Residential Services",
            blurb: "Essential home services from vetted, reliable providers.",
        },
        {
            icon: <TrendingUp className="h-5 w-5" strokeWidth={1.75} />,
            name: "Business Development",
            blurb: "Lead generation and customer acquisition that scales revenue.",
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
                    {/* Background — mobile image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center md:hidden"
                        style={{ backgroundImage: `url(${hero_mobile})` }}
                    />
                    {/* Background — desktop image */}
                    <div
                        className="absolute inset-0 bg-cover bg-top hidden md:block"
                        style={{ backgroundImage: `url(${hero_desktop})` }}
                    />

                    {/* Overlay — mobile: dark gradient rising from the bottom */}
                    <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
                    {/* Overlay — desktop: darken the right content column */}
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-black/25 to-black/65" />

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-14 md:pb-0 flex flex-col md:flex-row items-end md:items-center">
                        {/* Left — reserved for future development */}
                        <div className="hidden md:block md:w-1/2">
                            <HeroCarousel />
                        </div>

                        {/* Right — Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col gap-5 md:pl-10">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3">
                                <span className="uppercase tracking-[0.22em] text-xs font-semibold text-purple-400">
                                    Performance-Driven Sales
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-white text-4xl sm:text-5xl xl:text-[3.6rem] font-bold leading-[1.08] tracking-tight">
                                TRUTH,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                                    DELIVERED
                                </span>
                            </h1>

                            {/* Body copy */}
                            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm md:max-w-md">
                                Performance-driven sales company specializing in
                                growing service businesses across energy,
                                utilities, telecommunications, and facilities
                                management.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-1">
                                <a
                                    href="#"
                                    className="px-6 py-3 text-sm font-semibold tracking-wide text-white text-center
                                        rounded-lg bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                                        shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                                        hover:bg-purple-600/40 hover:border-purple-200/60 hover:-translate-y-0.5
                                        transition-all duration-300"
                                >
                                    View Products
                                </a>
                                <a
                                    href="#"
                                    className="px-6 py-3 text-sm font-semibold tracking-wide text-center
                                        rounded-lg text-white/85 bg-white/5 backdrop-blur-md border border-white/25
                                        shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]
                                        hover:text-white hover:bg-white/15 hover:border-white/45 hover:-translate-y-0.5
                                        transition-all duration-300"
                                >
                                    Join Our Team
                                </a>
                            </div>

                            {/* Stats Strip */}
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
                                        10+
                                    </span>
                                    <span className="text-white/45 text-[11px] uppercase tracking-widest ">
                                        Years Active
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-white/10 shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white text-xl sm:text-2xl font-bold leading-none text-center">
                                        100k+
                                    </span>
                                    <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                        Products Sold
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Why Veritas ─────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10">
                        {/* Heading */}
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
                                The advantages that make Veritas a sales partner
                                service providers keep coming back to.
                            </p>
                        </div>

                        {/* Bento grid: anchor cell + four supporting cells */}
                        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                            {reasons.map((reason, i) => (
                                <article
                                    key={reason.title}
                                    className={`group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 ${
                                        i === 0 ? "lg:row-span-2 lg:p-8" : ""
                                    }`}
                                >
                                    {/* Hover accent — left edge only, not the whole border */}
                                    <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

                                    <div className="relative z-10 flex h-full flex-col">
                                        {/* Index label + icon, inline — not a boxed centerpiece */}
                                        <div className="flex items-center gap-2 text-indigo-600">
                                            {reason.icon}
                                        </div>

                                        <h3
                                            className={`mt-4 font-bold tracking-tight text-slate-900 ${
                                                i === 0 ? "text-2xl" : "text-lg"
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

                                        {/* Anchor cell visual */}
                                        {i === 0 && (
                                            <div className="mt-auto pt-8">
                                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600">
                                                    <img
                                                        src={globe}
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="absolute -bottom-10 left-1/2 w-[140%] max-w-none -translate-x-1/2 opacity-90"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* <MarqueeStrip /> */}

                {/* ── What We Offer ─────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16 lg:px-10">
                        {/* Left — positioning + image */}
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
                                We don't just sell — we connect. Veritas matches
                                households and businesses to vetted partners
                                offering competitive rates, dependable service,
                                and solutions built to fit.
                            </p>

                            {/* Single supporting image placeholder */}
                            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                                <span className="absolute bottom-3 left-4 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                                    Image placeholder
                                </span>
                            </div>
                        </div>

                        {/* Right — offerings as index rows */}
                        <div className="flex flex-col justify-center border-t border-slate-200 lg:border-l lg:border-t-0 lg:pl-16">
                            {offerings.map((item, i) => (
                                <a
                                    key={item.name}
                                    href="/products"
                                    className="group flex items-start gap-5 border-b border-slate-200 py-6 lg:py-7"
                                >
                                    <span className="mt-0.5 font-mono text-[11px] font-semibold tracking-widest text-indigo-400">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-indigo-600">
                                        {item.icon}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                            {item.blurb}
                                        </p>
                                    </div>
                                    <span className="mt-1 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-500">
                                        →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Closing CTA ───────────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-10">
                        {/* Deep panel */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950">
                            {/* Grain texture */}
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
                                    <feColorMatrix type="saturate" values="0" />
                                </filter>
                                <rect
                                    width="100%"
                                    height="100%"
                                    filter="url(#veritas-grain)"
                                />
                            </svg>

                            {/* Single restrained light source, top-left */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-1/4 -top-1/2 h-[140%] w-[70%]"
                                style={{
                                    background:
                                        "radial-gradient(closest-side, rgba(129,140,248,0.18), transparent 70%)",
                                }}
                            />

                            {/* Asymmetric grid — text left, glass stat panel right */}
                            <div className="relative grid grid-cols-1 gap-10 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-5 lg:gap-16 lg:px-14 lg:py-24">
                                {/* Left — text */}
                                <div className="flex flex-col lg:col-span-3">
                                    <span className="inline-flex w-fit items-center rounded-full gap-2 border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                        Get Started
                                    </span>

                                    <h2 className="mt-5 max-w-md text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
                                        TWO WAYS FORWARD WITH VERITAS
                                    </h2>

                                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                                        Build a career with a team that rewards
                                        performance — or discover solutions
                                        matched to your needs through our
                                        trusted partners.
                                    </p>

                                    <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                        <a
                                            href="/careers"
                                            className="rounded-lg border border-white bg-white px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-slate-950 transition-colors duration-300 hover:bg-white/90"
                                        >
                                            View Open Roles
                                        </a>
                                        <a
                                            href="/products"
                                            className="rounded-lg border border-white/25 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-white backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/40"
                                        >
                                            Explore Our Solutions
                                        </a>
                                    </div>
                                </div>

                                {/* Right — glass stat panel */}
                                <div className="flex items-center lg:col-span-2">
                                    <div className="relative w-full rounded-xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-2xl backdrop-saturate-150">
                                        {/* Inset top highlight */}
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
                                            Businesses partnered with Veritas
                                        </p>

                                        <div className="mt-6 border-t border-white/10 pt-6">
                                            <p className="text-sm leading-relaxed text-white/55">
                                                Every partnership is measured on
                                                results — not activity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
