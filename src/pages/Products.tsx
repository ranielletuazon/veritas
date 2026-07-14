import Header from "./components/Header";
import Footer from "./components/Footer";
import { PRODUCT_CATEGORIES, type ProductCategory } from "../data/products";
import { Eye, Target } from "lucide-react";

export default function Products() {
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
                            Products
                        </span>
                        <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                            WHAT WE{" "}
                            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                OFFER
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                            We connect households and businesses to vetted
                            partners — matching you to the right solution, not
                            just any product.
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

                <section className="w-full bg-slate-50 pb-24">
                    {/* Product Cards */}
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-16 sm:grid-cols-2 lg:px-10 ">
                        {PRODUCT_CATEGORIES.map((cat) => (
                            <a
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                className="group relative flex flex-col overflow-hidden border border-slate-200 bg-white rounded-lg"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600">
                                    <span className="absolute bottom-3 left-4 z-10 font-mono text-[10px] font-medium uppercase tracking-widest text-white/70">
                                        Image placeholder
                                    </span>
                                    <span className="absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                                        {cat.tagline}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6 lg:p-7">
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                                        {cat.name}
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                        {cat.description}
                                    </p>

                                    <div className="mt-5 md:hidden">
                                        <BenefitsList cat={cat} />
                                    </div>
                                </div>

                                <div
                                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full border-t border-slate-200 bg-white p-6 transition-transform duration-300 ease-out group-hover:translate-y-0 md:block lg:p-7"
                                    aria-hidden="true"
                                >
                                    <BenefitsList cat={cat} />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function BenefitsList({ cat }: { cat: ProductCategory }) {
    return (
        <>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                {cat.benefitsLabel}
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {cat.benefits.map((b) => (
                    <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-slate-600"
                    >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-500" />
                        {b}
                    </li>
                ))}
            </ul>
        </>
    );
}
