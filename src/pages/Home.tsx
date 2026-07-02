import Header from "./components/Header";
import Footer from "./components/Footer";
import hero_desktop from "../assets/images/hero_web.jpg";
import hero_mobile from "../assets/images/hero_web_mobile.jpg";

export default function Home() {
    const advantages = [
        {
            title: "Results-Based Model",
            tags: ["Pay-for-Performance", "Zero Risk", "Transparent"],
            description:
                "Clients pay only for measurable outcomes. Every dollar is tied to verified sales results — never activity or airtime.",
            gradient: "from-indigo-600 via-violet-600 to-purple-600",
        },
        {
            title: "B2B & B2C Direct Sales",
            tags: ["B2B", "B2C", "Scalable"],
            description:
                "One accountable team across commercial and consumer channels, giving providers flexible, scalable routes to market.",
            gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
        },
        {
            title: "People-Led Execution",
            tags: ["In-House Trained", "Accountable", "Dedicated"],
            description:
                "Campaigns run by reps we recruit, train, and coach ourselves — keeping conduct and quality under our control.",
            gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
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
                        <div className="hidden md:block md:w-1/2" />

                        {/* Right — Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col gap-5 md:pl-10">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-px bg-purple-400 shrink-0" />
                                <span className="uppercase tracking-[0.22em] text-xs font-semibold text-purple-400">
                                    Performance-Driven Sales
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-white text-4xl sm:text-5xl xl:text-[3.6rem] font-bold leading-[1.08] tracking-tight">
                                Truth,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                                    Delivered
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
                                        bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                                        shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                                        hover:bg-purple-600/40 hover:border-purple-200/60 hover:-translate-y-0.5
                                        transition-all duration-300"
                                >
                                    View Products
                                </a>
                                <a
                                    href="#"
                                    className="px-6 py-3 text-sm font-semibold tracking-wide text-center
                                        text-white/85 bg-white/5 backdrop-blur-md border border-white/25
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

                {/* ── Second Content ── */}
                {/* ── The Veritas Model ── */}
                <section className="w-full border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-24">
                        {/* Heading block */}
                        <div className="flex flex-col items-center text-center">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                The Veritas Model
                            </span>

                            <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.1]">
                                Sales measured by{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                                    outcomes
                                </span>
                            </h2>

                            <p className="mt-4 max-w-xl text-slate-500 text-sm sm:text-base leading-relaxed">
                                We plug into essential-service providers as an
                                accountable revenue engine — clients carry the
                                risk of nothing but the upside.
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                            {advantages.map((card) => (
                                <article
                                    key={card.title}
                                    className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 lg:p-8"
                                >
                                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                                        {card.title}
                                    </h3>

                                    {/* Tag pills */}
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {card.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50
                                    text-[11px] font-medium text-slate-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                                        {card.description}
                                    </p>

                                    {/* Visual placeholder — swap this div for <img> when assets arrive */}
                                    <div
                                        className={`mt-6 relative aspect-[4/3] rounded-xl overflow-hidden
                            bg-gradient-to-br ${card.gradient}`}
                                    >
                                        {/* Brand motif — echoes the hero's bubble language */}
                                        <svg
                                            className="absolute inset-0 w-full h-full opacity-90"
                                            viewBox="0 0 400 300"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                cx="120"
                                                cy="120"
                                                r="70"
                                                fill="white"
                                                fillOpacity="0.10"
                                            />
                                            <circle
                                                cx="150"
                                                cy="150"
                                                r="34"
                                                fill="white"
                                                fillOpacity="0.14"
                                            />
                                            <circle
                                                cx="300"
                                                cy="90"
                                                r="16"
                                                fill="white"
                                                fillOpacity="0.16"
                                            />
                                            <circle
                                                cx="330"
                                                cy="220"
                                                r="46"
                                                fill="white"
                                                fillOpacity="0.08"
                                            />
                                        </svg>

                                        <span className="absolute bottom-3 left-4 text-[10px] font-medium uppercase tracking-widest text-white/70">
                                            Visual placeholder
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
