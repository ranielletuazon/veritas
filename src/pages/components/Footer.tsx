import { Link } from "react-router-dom";
import logo from "../../assets/images/veritas_landscape_logo.png";
import { socials } from "../../data/social";

const footerNav = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Careers", to: "/careers" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
];

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#07040f] text-white">
            {/* Galaxy field — on-palette radial glows over near-black */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
            >
                <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-600/20 blur-[120px]" />
                <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[110px]" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 50%, transparent), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.3) 50%, transparent), radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.35) 50%, transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.25) 50%, transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.3) 50%, transparent), radial-gradient(1px 1px at 15% 65%, rgba(255,255,255,0.25) 50%, transparent), radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.3) 50%, transparent)",
                        backgroundSize: "250px 250px",
                    }}
                />
            </div>

            {/* Gradient hairline — ties footer to the brand without going loud */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
                    {/* Brand block */}
                    <div className="flex flex-col items-start">
                        <img
                            src={logo}
                            alt="Veritas Organisation"
                            className="h-12 w-auto object-contain brightness-0 invert"
                        />
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                            Performance-driven sales connecting households and
                            businesses to trusted partners across essential
                            services.
                        </p>

                        {/* Socials */}
                        <div className="mt-6 flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors duration-300 hover:border-indigo-400/60 hover:text-white"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-[18px] w-[18px]"
                                        aria-hidden="true"
                                    >
                                        <path d={s.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigate column */}
                    <div>
                        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/40">
                            Navigate
                        </h3>
                        <nav className="mt-5 flex flex-col gap-3">
                            {footerNav.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className="w-fit text-sm text-white/70 transition-colors duration-300 hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact column */}
                    <div>
                        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/40">
                            Get in Touch
                        </h3>
                        <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                            <a
                                href="tel:89220932"
                                className="w-fit transition-colors duration-300 hover:text-white"
                            >
                                +65 8922 0932
                            </a>
                            <span className="text-white/50">Singapore</span>
                            <Link
                                to="/contact"
                                className="mt-1 w-fit border-b border-indigo-400/40 pb-0.5 text-indigo-300 transition-colors duration-300 hover:border-indigo-400 hover:text-indigo-200"
                            >
                                Send us a message
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Veritas Organisation Pte.
                        Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40">
                        <Link
                            to="/privacy"
                            className="transition-colors hover:text-white/70"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="transition-colors hover:text-white/70"
                        >
                            Terms &amp; Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
