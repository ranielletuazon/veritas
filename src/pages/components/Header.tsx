import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/veritas_landscape_logo_white.png";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "About Us", href: "/about" },
];

export default function Header() {
    const { pathname } = useLocation();
    const isHomepage = pathname === "/";

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll(); // set correct state immediately on mount, incl. after route changes
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]); // re-check on navigation — see flag below

    // Transparent only on the homepage AND actually at the top.
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
                <a href="#" className="shrink-0">
                    <img
                        src={logo}
                        alt="Veritas Organisation"
                        className={`h-11 w-auto object-contain transition-all duration-500 ${
                            isTransparent
                                ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                                : ""
                        }`}
                    />
                </a>

                <nav className="hidden md:flex items-center gap-7">
                    {NAV_LINKS.map(({ label, href }) => (
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
                    ))}
                    <a
                        href="#"
                        className="ml-1 px-5 py-2 text-sm font-semibold tracking-wide text-white
                            bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                            shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                            hover:bg-purple-600/40 hover:border-purple-200/60 hover:-translate-y-0.5
                            transition-all duration-300"
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
                        className={`block w-full h-[2px] bg-white origin-center
                            transition-all duration-300
                            ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-white
                            transition-all duration-300
                            ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                    />
                    <span
                        className={`block w-full h-[2px] bg-white origin-center
                            transition-all duration-300
                            ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                    />
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out
                    bg-black/60 backdrop-blur-2xl border-t border-white/10
                    ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="flex flex-col px-6 py-5 gap-1">
                    {NAV_LINKS.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="text-white/75 hover:text-white text-sm font-medium
                                py-3 border-b border-white/5 last:border-0
                                transition-colors duration-200"
                        >
                            {label}
                        </a>
                    ))}
                    <a
                        href="#"
                        onClick={() => setMenuOpen(false)}
                        className="mt-3 px-5 py-2.5 text-sm font-semibold text-center tracking-wide text-white
                            bg-purple-600/25 backdrop-blur-md border border-purple-300/40
                            shadow-[0_8px_32px_-8px_rgba(147,51,234,0.45)]
                            transition-all duration-300"
                    >
                        Get In Touch
                    </a>
                </nav>
            </div>
        </header>
    );
}
