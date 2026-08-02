import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Check, X, Plus } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import {
    findCategoryBySlug,
    productImgSrc,
    type ProductItem,
} from "../data/products";

/* ────────────────────────────────────────────────────────────
   ItemCard — a single unit tile. Becomes a button when the item
   has `detail`, so only expandable cards are interactive.
   ──────────────────────────────────────────────────────────── */
function ItemCard({
    item,
    index,
    isSelected,
    onSelect,
}: {
    item: ProductItem;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const itemSrc = productImgSrc(item.image);
    const isExpandable = Boolean(item.detail);

    const card = (
        <>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/60">
                <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-2xl transition-all duration-500 group-hover:bg-fuchsia-400/25"
                />
                <div
                    aria-hidden="true"
                    className="absolute bottom-5 left-1/2 h-3 w-28 -translate-x-1/2 rounded-[100%] bg-slate-900/10 blur-md"
                />
                {itemSrc ? (
                    <img
                        src={itemSrc}
                        alt={item.name}
                        loading="lazy"
                        className="absolute inset-0 m-auto max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                ) : (
                    <span className="absolute bottom-3 left-4 font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
                        Image placeholder
                    </span>
                )}
                {item.badge && (
                    <span className="absolute left-3 top-3 rounded-full border border-slate-300/60 bg-white/70 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-slate-700 backdrop-blur-md">
                        {item.badge}
                    </span>
                )}
            </div>

            <div className="relative flex flex-1 flex-col p-6 text-left">
                <span
                    className={`absolute left-0 top-0 h-full w-[3px] bg-indigo-600 transition-transform duration-300 ease-out ${
                        isSelected
                            ? "scale-y-100"
                            : "scale-y-0 group-hover:scale-y-100"
                    }`}
                />

                <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                    {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {item.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                    {item.specs.map((s) => (
                        <li
                            key={s}
                            className="flex items-start gap-2 text-xs leading-relaxed text-slate-600"
                        >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-500" />
                            {s}
                        </li>
                    ))}
                </ul>

                {isExpandable && (
                    <span
                        className={`mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                            isSelected ? "text-indigo-700" : "text-indigo-500"
                        }`}
                    >
                        <Plus
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                isSelected ? "rotate-45" : ""
                            }`}
                            strokeWidth={2.2}
                        />
                        {isSelected ? "Hide details" : "View details"}
                    </span>
                )}
            </div>
        </>
    );

    const shellClasses = `group relative flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
        isSelected
            ? "border-indigo-400 shadow-lg shadow-indigo-500/10"
            : "border-slate-200 hover:border-indigo-200"
    }`;

    return (
        <Reveal delay={index * 90}>
            {isExpandable ? (
                <button
                    type="button"
                    onClick={onSelect}
                    aria-expanded={isSelected}
                    aria-controls="unit-detail-panel"
                    className={`${shellClasses} w-full cursor-pointer text-left`}
                >
                    {card}
                </button>
            ) : (
                <article className={shellClasses}>{card}</article>
            )}
        </Reveal>
    );
}

/* ────────────────────────────────────────────────────────────
   ItemDetailPanel — full-width expansion shown under the grid.
   ──────────────────────────────────────────────────────────── */
function ItemDetailPanel({
    item,
    onClose,
    categorySlug,
}: {
    item: ProductItem;
    onClose: () => void;
    categorySlug: string;
}) {
    const detail = item.detail;
    if (!detail) return null;

    const itemSrc = productImgSrc(item.image);

    return (
        <div
            id="unit-detail-panel"
            className="mt-6 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xl shadow-indigo-500/5"
        >
            {/* Accent bar */}
            <div
                aria-hidden="true"
                className="h-1 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600"
            />

            <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:gap-12 lg:p-10">
                {/* Left — image + identity */}
                <div className="lg:col-span-2">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-100 to-slate-200/60">
                        <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-3xl"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute bottom-8 left-1/2 h-4 w-40 -translate-x-1/2 rounded-[100%] bg-slate-900/10 blur-md"
                        />
                        {itemSrc ? (
                            <img
                                src={itemSrc}
                                alt={item.name}
                                className="absolute inset-0 m-auto max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_14px_24px_rgba(15,23,42,0.2)]"
                            />
                        ) : (
                            <span className="absolute bottom-4 left-5 font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
                                Image placeholder
                            </span>
                        )}
                    </div>

                    {detail.features && (
                        <div className="mt-6">
                            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                Capabilities
                            </h4>
                            <ul className="mt-4 space-y-2.5">
                                {detail.features.map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                                    >
                                        <Check
                                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500"
                                            strokeWidth={2.4}
                                        />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right — description + spec sheet */}
                <div className="lg:col-span-3">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            {detail.brand && (
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                    {detail.brand}
                                </p>
                            )}
                            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {detail.model ?? item.name}
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close details"
                            className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700 cursor-pointer"
                        >
                            <X className="h-4 w-4" strokeWidth={2} />
                        </button>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {detail.description}
                    </p>

                    <h4 className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                        Specifications
                    </h4>
                    <dl className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                        {detail.specSheet.map((row) => (
                            <div
                                key={row.label}
                                className="flex flex-col border-b border-slate-100 py-3"
                            >
                                <dt className="text-xs font-medium text-slate-400">
                                    {row.label}
                                </dt>
                                <dd className="mt-0.5 text-sm font-semibold text-slate-800">
                                    {row.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-slate-400">
                            Specifications per manufacturer datasheet and
                            subject to change. All trademarks are the property
                            of their respective owners.
                        </p>
                        <a
                            href={`/contact-us?product=${categorySlug}&unit=${item.id}`}
                            className="shrink-0 rounded-lg border border-indigo-600 bg-indigo-600 px-6 py-3 text-center text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-indigo-700"
                        >
                            Enquire
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   ItemGrid — owns the selection state for one grid of items,
   and scrolls the detail panel into view when one is opened.
   ──────────────────────────────────────────────────────────── */
function ItemGrid({
    items,
    categorySlug,
}: {
    items: ProductItem[];
    categorySlug: string;
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const selected = items.find((i) => i.id === selectedId) ?? null;

    useEffect(() => {
        if (selectedId && panelRef.current) {
            panelRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedId]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const toggle = (id: string) =>
        setSelectedId((current) => (current === id ? null : id));

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        index={i}
                        isSelected={selectedId === item.id}
                        onSelect={() => toggle(item.id)}
                    />
                ))}
            </div>

            <div ref={panelRef}>
                {selected && (
                    <ItemDetailPanel
                        item={selected}
                        onClose={() => setSelectedId(null)}
                        categorySlug={categorySlug}
                    />
                )}
            </div>
        </>
    );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
export default function ProductsView() {
    const { slug } = useParams<{ slug: string }>();
    const category = slug ? findCategoryBySlug(slug) : undefined;

    if (!category) {
        return (
            <>
                <Header />
                <main className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50 px-6 pt-20">
                    <div className="text-center">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                            404 — Not found
                        </p>
                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                            This solution doesn't exist or has been removed.
                        </h1>
                        <a
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-400 hover:text-indigo-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Solutions
                        </a>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const heroSrc = productImgSrc(category.featured_image);

    return (
        <>
            <Header />
            <main className="w-full">
                {/* ── Banner ──────────────────────────────────── */}
                <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 pt-32 md:pt-40">
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

                    <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 lg:grid-cols-5 lg:gap-16 lg:px-10">
                        <div className="lg:col-span-3">
                            <Reveal>
                                <a
                                    href="/products"
                                    className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-indigo-300"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    All Solutions
                                </a>
                            </Reveal>
                            <Reveal delay={80}>
                                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                    {category.tagline}
                                </span>
                            </Reveal>
                            <Reveal delay={140}>
                                <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
                                    {category.name}
                                </h1>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                                    {category.overview}
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={260} className="lg:col-span-2">
                            <div className="relative aspect-square w-full">
                                <div
                                    aria-hidden="true"
                                    className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/25 blur-[80px]"
                                />
                                {heroSrc ? (
                                    <img
                                        src={heroSrc}
                                        alt={category.name}
                                        className="absolute inset-0 m-auto max-h-[80%] max-w-[80%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                                    />
                                ) : (
                                    <div className="absolute inset-0 m-auto flex h-40 w-40 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                                            No image
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    <div
                        className="h-16 w-full bg-slate-50"
                        style={{
                            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
                        }}
                    />
                </section>

                {/* ── Items ───────────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
                        <Reveal>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {category.itemsLabel.toUpperCase()}
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
                                What's available under{" "}
                                {category.name.toLowerCase()} — select a unit to
                                see full specifications.
                            </p>
                        </Reveal>

                        {/* Benefits */}
                        <div className="mt-8">
                            <Reveal>
                                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                    {category.benefitsLabel}
                                </h3>
                            </Reveal>
                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {category.benefits.map((b, i) => (
                                    <Reveal key={b} delay={i * 70}>
                                        <div className="flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                                strokeWidth={2.2}
                                            />
                                            <span className="text-sm font-medium text-slate-700">
                                                {b}
                                            </span>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Flat categories */}
                        {category.items && (
                            <div className="mt-12">
                                <ItemGrid
                                    items={category.items}
                                    categorySlug={category.slug}
                                />
                            </div>
                        )}

                        {/* Grouped categories */}
                        {category.groups && (
                            <div className="mt-12 flex flex-col gap-14">
                                {category.groups.map((group) => (
                                    <div key={group.id}>
                                        <Reveal>
                                            <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                                                {group.name}
                                            </h3>
                                        </Reveal>

                                        {group.items && (
                                            <div className="mt-6">
                                                <ItemGrid
                                                    items={group.items}
                                                    categorySlug={category.slug}
                                                />
                                            </div>
                                        )}

                                        {group.subgroups && (
                                            <div className="mt-6 flex flex-col gap-10">
                                                {group.subgroups.map(
                                                    (subgroup) => (
                                                        <div key={subgroup.id}>
                                                            <Reveal>
                                                                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                                                    {
                                                                        subgroup.name
                                                                    }
                                                                </h4>
                                                            </Reveal>
                                                            <div className="mt-4">
                                                                <ItemGrid
                                                                    items={
                                                                        subgroup.items
                                                                    }
                                                                    categorySlug={
                                                                        category.slug
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Closing CTA ─────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <Reveal>
                            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-6 py-12 text-center sm:px-12 md:py-16">
                                <h2 className="mx-auto max-w-lg text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                                    NOT SURE WHICH OPTION FITS?
                                </h2>
                                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                                    Tell us what you're working with and we'll
                                    match you to the right partner — no
                                    obligation.
                                </p>
                                <a
                                    href="/contact-us"
                                    className="mt-8 inline-block rounded-lg border border-white bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-950 transition-colors duration-300 hover:bg-white/90"
                                >
                                    TALK TO US
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
