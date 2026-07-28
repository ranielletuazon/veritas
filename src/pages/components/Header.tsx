import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import logo from "../../assets/images/veritas_landscape_logo_white.png";
import logo from "../../assets/images/new-veritas-logo-new.png";
import { PRODUCT_CATEGORIES } from "../../data/products";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "About Us", href: "/about-us" },
];

export default function Header() {
    const { pathname } = useLocation();
    const isHomepage = pathname === "/";

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    const isTransparent = isHomepage && !scrolled && !menuOpen;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
                border-b
                ${
                    isTransparent
                        ? "bg-transparent border-transparent"
                        : "bg-black/50 backdrop-blur-2xl border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
                <a href="/" className="shrink-0">
                    <img
                        src={logo}
                        alt="Veritas Organisation"
                        className={`h-14 sm:h-20 w-auto object-contain transition-all duration-500 ${
                            isTransparent
                                ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                                : ""
                        }`}
                    />
                </a>

                <nav className="hidden md:flex items-center gap-7">
                    {/* Home */}
                    <a
                        href="/"
                        className="relative text-sm font-medium text-white hover:text-white/75
                            transition-colors duration-200
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-px after:w-0 after:bg-purple-400
                            hover:after:w-full after:transition-all after:duration-300"
                    >
                        HOME
                    </a>

                    {/* Products — hover/focus dropdown */}
                    <div className="group relative">
                        <a
                            href="/products"
                            className="relative flex items-center gap-1 text-sm font-medium text-white hover:text-white/75
                                transition-colors duration-200
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                                after:h-px after:w-0 after:bg-purple-400
                                group-hover:after:w-full group-focus-within:after:w-full after:transition-all after:duration-300"
                        >
                            PRODUCTS
                            <svg
                                className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2.5 4.5L6 8l3.5-3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </a>

                        {/* Dropdown panel */}
                        <div
                            className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0
                                transition-all duration-200
                                group-hover:visible group-hover:opacity-100
                                group-focus-within:visible group-focus-within:opacity-100"
                        >
                            <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-950/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                                <ul className="flex flex-col divide-y divide-white/5">
                                    {PRODUCT_CATEGORIES.map((cat) => (
                                        <li key={cat.id}>
                                            <a
                                                href={`/products/${cat.slug}`}
                                                className="block px-4 py-3 transition-colors duration-150 hover:bg-white/5"
                                            >
                                                <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-indigo-300">
                                                    {cat.tagline}
                                                </span>
                                                <p className="mt-0.5 text-sm font-semibold text-white">
                                                    {cat.name}
                                                </p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {NAV_LINKS.filter((l) => l.label !== "Home").map(
                        ({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="relative text-sm font-medium text-white hover:text-white/75
                                transition-colors duration-200
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                                after:h-px after:w-0 after:bg-purple-400
                                hover:after:w-full after:transition-all after:duration-300"
                            >
                                {label.toUpperCase()}
                            </a>
                        ),
                    )}

                    <a
                        href="/contact-us"
                        className="ml-1 px-5 py-2 text-sm font-semibold tracking-wide text-white
                            bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                            shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                            hover:bg-purple-600/40 hover:border-purple-200/60 hover:-translate-y-0.5
                            transition-all duration-300 rounded-lg"
                    >
                        CONTACT US
                    </a>
                </nav>

                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
                >
                    <span
                        className={`block w-full h-[2px] bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                    />
                </button>
            </div>

            {/* Mobile menu — Products kept as a single flat link; a hover mega-menu has
                no equivalent on touch, and a tap-to-expand accordion is a separate feature
                I haven't built here. Say the word if you want that added. */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out
                    bg-black/60 backdrop-blur-2xl border-t border-white/10
                    ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="flex flex-col px-6 py-5 gap-1">
                    <a
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-white/75 hover:text-white text-sm font-medium py-3 border-b border-white/5 transition-colors duration-200"
                    >
                        Home
                    </a>
                    <a
                        href="/products"
                        onClick={() => setMenuOpen(false)}
                        className="text-white/75 hover:text-white text-sm font-medium py-3 border-b border-white/5 transition-colors duration-200"
                    >
                        Products
                    </a>
                    {NAV_LINKS.filter((l) => l.label !== "Home").map(
                        ({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="text-white/75 hover:text-white text-sm font-medium py-3 border-b border-white/5 last:border-0 transition-colors duration-200"
                            >
                                {label}
                            </a>
                        ),
                    )}
                    <a
                        href="/contact-us"
                        onClick={() => setMenuOpen(false)}
                        className="mt-3 px-5 py-2.5 text-sm font-semibold text-center tracking-wide text-white
                            bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                            shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                            transition-all duration-300 rounded-lg"
                    >
                        Get In Touch
                    </a>
                </nav>
            </div>
        </header>
    );
}
