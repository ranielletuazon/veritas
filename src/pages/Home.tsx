import Header from "./components/Header";
import Footer from "./components/Footer";
import hero_desktop from "../assets/images/hero_web.jpg";
import hero_mobile from "../assets/images/hero_web_mobile.jpg";

export default function Home() {
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
                                        bg-purple-700 border border-purple-500/60
                                        hover:bg-purple-600 hover:border-purple-400/70
                                        transition-all duration-300"
                                >
                                    View Products
                                </a>
                                <a
                                    href="#"
                                    className="px-6 py-3 text-sm font-semibold tracking-wide text-center
                                        text-white/75 border border-white/20
                                        hover:text-white hover:border-white/45
                                        transition-all duration-300"
                                >
                                    Join Our Team
                                </a>
                            </div>

                            {/* Stats Strip */}
                            <div className="mt-5 pt-5 border-t border-white/10 flex flex-row items-center gap-6 sm:gap-8">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white text-xl sm:text-2xl font-bold leading-none">
                                        500+
                                    </span>
                                    <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                        Clients Served
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-white/10 shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white text-xl sm:text-2xl font-bold leading-none">
                                        10+
                                    </span>
                                    <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                        Years Active
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-white/10 shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white text-xl sm:text-2xl font-bold leading-none">
                                        3
                                    </span>
                                    <span className="text-white/45 text-[11px] uppercase tracking-widest">
                                        Core Verticals
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Double Card Section (placeholder) ────────── */}
                <div className="container mx-auto px-8 py-16">
                    <div className="w-full flex flex-row items-center justify-center gap-4">
                        <div className="border border-black w-1/2 h-[300px]" />
                        <div className="border border-black w-1/2 h-[300px]" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
