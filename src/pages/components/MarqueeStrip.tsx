function SeparatorIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0 text-indigo-500 sm:h-6 sm:w-6"
            aria-hidden="true"
        >
            <path
                d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20M4.5 18l15-12M19.5 18l-15-12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function MarqueeStrip() {
    const MARQUEE_ITEMS = [
        "Results-Based Sales",
        "Revenue Growth",
        "Industry Expertise",
        "Product Quality",
        "Performance-Driven",
    ];
    return (
        <section className="w-full overflow-hidden py-8 bg-slate-50">
            <style>{`
                @keyframes veritas-marquee {
                    from { transform: translateX(0%); }
                    to { transform: translateX(-50%); }
                }
            `}</style>

            <div
                className="flex w-max motion-safe:[animation:veritas-marquee_28s_linear_infinite] motion-reduce:translate-x-0"
                aria-hidden="true"
            >
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center">
                        {MARQUEE_ITEMS.map((item) => (
                            <div key={item} className="flex items-center">
                                <span className="whitespace-nowrap px-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                                    {item}
                                </span>
                                <SeparatorIcon />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <span className="sr-only">
                Direct sales, B2B growth, B2C campaigns, performance-driven,
                trusted results.
            </span>
        </section>
    );
}
