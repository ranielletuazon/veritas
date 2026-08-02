import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { PRODUCT_CATEGORIES } from "../data/products";

type Status = "idle" | "submitting" | "success" | "error";
type InquiryType = "general" | "product";
type CurrentSetup = "lease" | "owned" | "none";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

const COPIER_SLUG = "printer-solutions";

export default function Contact() {
    const [status, setStatus] = useState<Status>("idle");
    const [inquiryType, setInquiryType] = useState<InquiryType>("general");
    const [productSlug, setProductSlug] = useState<string>("");
    const [unitId, setUnitId] = useState<string>("");
    const [currentSetup, setCurrentSetup] = useState<CurrentSetup>("none");
    const selectedCategory = PRODUCT_CATEGORIES.find(
        (c) => c.slug === productSlug,
    );
    const isCopierInquiry =
        inquiryType === "product" && productSlug === COPIER_SLUG;
    /* Flat categories (Copier Solutions, Cleaning, Business Dev) expose `items` directly.
    Energy Solutions is nested under groups/subgroups and has no flat `items` — 
    the unit dropdown only appears when a flat list actually exists. */
    const availableUnits = selectedCategory?.items ?? [];
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        if (data.get("website")) return;

        setStatus("submitting");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inquiryType,
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    company: data.get("company"),
                    message: data.get("message"),

                    // Product inquiry fields — undefined/empty when not applicable
                    productCategory:
                        inquiryType === "product"
                            ? PRODUCT_CATEGORIES.find(
                                  (c) => c.slug === productSlug,
                              )?.name
                            : undefined,
                    productUnit:
                        inquiryType === "product" && unitId
                            ? unitId === "not-sure"
                                ? "Not sure — needs recommendation"
                                : availableUnits.find((i) => i.id === unitId)
                                      ?.name
                            : undefined,
                    // Copier-specific fields
                    currentSetup: isCopierInquiry ? currentSetup : undefined,
                    machineAge: isCopierInquiry
                        ? data.get("machineAge")
                        : undefined,
                    remainingMonths: isCopierInquiry
                        ? data.get("remainingMonths")
                        : undefined,
                    monthlyRentalFee: isCopierInquiry
                        ? data.get("monthlyRentalFee")
                        : undefined,
                    monoVolume: isCopierInquiry
                        ? data.get("monoVolume")
                        : undefined,
                    colorVolume: isCopierInquiry
                        ? data.get("colorVolume")
                        : undefined,
                    currentCostPerPrint: isCopierInquiry
                        ? data.get("currentCostPerPrint")
                        : undefined,
                    quotationType: isCopierInquiry
                        ? data.get("quotationType")
                        : undefined,
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            form.reset();
            setCurrentSetup("none");
            setUnitId("");
        } catch {
            setStatus("error");
        }
    };
    const handleCategoryChange = (slug: string) => {
        setProductSlug(slug);
        setUnitId(""); // clear any unit picked under a different category
    };

    return (
        <>
            <Header />
            <main className="w-full">
                {/* ── Page header ─────────────────────────────── */}
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

                    <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                Contact Us
                            </span>
                        </Reveal>
                        <Reveal delay={80}>
                            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                                LET'S START A{" "}
                                <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                    CONVERSATION
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={160}>
                            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                                Questions about our solutions, partnerships, or
                                a specific product? Send us a message and the
                                right team will get back to you.
                            </p>
                        </Reveal>
                    </div>

                    <div
                        className="h-16 w-full bg-slate-50"
                        style={{
                            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
                        }}
                    />
                </section>

                {/* ── Form + Info ─────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-5 lg:gap-14 lg:px-10">
                        {/* Form */}
                        <Reveal className="lg:col-span-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
                                {status === "success" ? (
                                    <div className="py-12 text-center">
                                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                            Message received
                                        </p>
                                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                                            Thank you — we'll be in touch.
                                        </h2>
                                        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                                            We've received your message and will
                                            reply within two business days.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-8 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-400 hover:text-indigo-700"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                            Send a message
                                        </p>

                                        {/* Inquiry type toggle */}
                                        <div
                                            className="mt-5 grid grid-cols-2 gap-2"
                                            role="radiogroup"
                                            aria-label="Inquiry type"
                                        >
                                            {(
                                                [
                                                    {
                                                        key: "general",
                                                        label: "General Question",
                                                    },
                                                    {
                                                        key: "product",
                                                        label: "Product Inquiry",
                                                    },
                                                ] as const
                                            ).map((option) => (
                                                <button
                                                    key={option.key}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={
                                                        inquiryType ===
                                                        option.key
                                                    }
                                                    onClick={() =>
                                                        setInquiryType(
                                                            option.key,
                                                        )
                                                    }
                                                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                                                        inquiryType ===
                                                        option.key
                                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                                            : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Product category — only shown for product inquiries */}
                                        {inquiryType === "product" && (
                                            <div className="mt-5">
                                                <label
                                                    htmlFor="productSlug"
                                                    className={labelClass}
                                                >
                                                    Which product are you
                                                    interested in? *
                                                </label>
                                                <select
                                                    id="productSlug"
                                                    required
                                                    value={productSlug}
                                                    onChange={(e) =>
                                                        handleCategoryChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="" disabled>
                                                        Select a product
                                                    </option>
                                                    {PRODUCT_CATEGORIES.map(
                                                        (cat) => (
                                                            <option
                                                                key={cat.id}
                                                                value={cat.slug}
                                                            >
                                                                {cat.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        )}

                                        {availableUnits.length > 0 && (
                                            <div className="mt-5">
                                                <label
                                                    htmlFor="unitId"
                                                    className={labelClass}
                                                >
                                                    Which unit are you asking
                                                    about? *
                                                </label>
                                                <select
                                                    id="unitId"
                                                    required
                                                    value={unitId}
                                                    onChange={(e) =>
                                                        setUnitId(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="" disabled>
                                                        Select a unit
                                                    </option>
                                                    {availableUnits.map(
                                                        (item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                    <option value="not-sure">
                                                        Not sure / need a
                                                        recommendation
                                                    </option>
                                                </select>
                                            </div>
                                        )}

                                        {/* Honeypot */}
                                        <input
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            className="absolute left-[-9999px] h-0 w-0 opacity-0"
                                        />

                                        {/* Standard contact fields */}
                                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className={labelClass}
                                                >
                                                    Name *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    placeholder="Your full name"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className={labelClass}
                                                >
                                                    Email *
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="you@company.com"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className={labelClass}
                                                >
                                                    Phone (optional)
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+65 0000 0000"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company"
                                                    className={labelClass}
                                                >
                                                    Company (optional)
                                                </label>
                                                <input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    placeholder="Company name"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        {/* ── Copier Solutions — unique fields ────────── */}
                                        {isCopierInquiry && (
                                            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-5">
                                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-700">
                                                    About Your Current Setup
                                                </p>

                                                {/* Current setup: lease / owned / none */}
                                                <div className="mt-4">
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Do you currently lease
                                                        or own a copier? *
                                                    </label>
                                                    <div
                                                        className="grid grid-cols-3 gap-2"
                                                        role="radiogroup"
                                                        aria-label="Current copier setup"
                                                    >
                                                        {(
                                                            [
                                                                {
                                                                    key: "lease",
                                                                    label: "Leased",
                                                                },
                                                                {
                                                                    key: "owned",
                                                                    label: "Owned",
                                                                },
                                                                {
                                                                    key: "none",
                                                                    label: "Neither yet",
                                                                },
                                                            ] as const
                                                        ).map((option) => (
                                                            <button
                                                                key={option.key}
                                                                type="button"
                                                                role="radio"
                                                                aria-checked={
                                                                    currentSetup ===
                                                                    option.key
                                                                }
                                                                onClick={() =>
                                                                    setCurrentSetup(
                                                                        option.key,
                                                                    )
                                                                }
                                                                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors duration-200 ${
                                                                    currentSetup ===
                                                                    option.key
                                                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                                                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                                                                }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Owned — machine age */}
                                                {currentSetup === "owned" && (
                                                    <div className="mt-4">
                                                        <label
                                                            htmlFor="machineAge"
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            How old is your
                                                            current machine?
                                                        </label>
                                                        <input
                                                            id="machineAge"
                                                            name="machineAge"
                                                            type="text"
                                                            placeholder="e.g. 3 years"
                                                            className={
                                                                inputClass
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                {/* Leased — remaining term + rental fee */}
                                                {currentSetup === "lease" && (
                                                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                        <div>
                                                            <label
                                                                htmlFor="remainingMonths"
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Remaining months
                                                                on contract
                                                            </label>
                                                            <input
                                                                id="remainingMonths"
                                                                name="remainingMonths"
                                                                type="text"
                                                                placeholder="e.g. 8 months"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="monthlyRentalFee"
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Current monthly
                                                                rental fee
                                                            </label>
                                                            <input
                                                                id="monthlyRentalFee"
                                                                name="monthlyRentalFee"
                                                                type="text"
                                                                placeholder="e.g. $250/month"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Print volume — relevant regardless of current setup */}
                                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <label
                                                            htmlFor="monoVolume"
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Avg. monthly prints
                                                            — mono
                                                        </label>
                                                        <input
                                                            id="monoVolume"
                                                            name="monoVolume"
                                                            type="text"
                                                            placeholder="e.g. 3,000"
                                                            className={
                                                                inputClass
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="colorVolume"
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Avg. monthly prints
                                                            — colour
                                                        </label>
                                                        <input
                                                            id="colorVolume"
                                                            name="colorVolume"
                                                            type="text"
                                                            placeholder="e.g. 500"
                                                            className={
                                                                inputClass
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <label
                                                        htmlFor="currentCostPerPrint"
                                                        className={labelClass}
                                                    >
                                                        Current cost per print,
                                                        if known (optional)
                                                    </label>
                                                    <input
                                                        id="currentCostPerPrint"
                                                        name="currentCostPerPrint"
                                                        type="text"
                                                        placeholder="e.g. $0.00 mono / $0.00 colour"
                                                        className={inputClass}
                                                    />
                                                </div>

                                                {/* Quotation preference */}
                                                <div className="mt-4">
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Preferred quotation type
                                                    </label>
                                                    <div
                                                        className="grid grid-cols-2 gap-2"
                                                        role="radiogroup"
                                                        aria-label="Preferred quotation type"
                                                    >
                                                        {[
                                                            "New Lease",
                                                            "Direct Buyout",
                                                        ].map((option) => (
                                                            <label
                                                                key={option}
                                                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition-colors has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="quotationType"
                                                                    value={
                                                                        option
                                                                    }
                                                                    className="sr-only"
                                                                />
                                                                {option}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Message */}
                                        <div className="mt-5">
                                            <label
                                                htmlFor="message"
                                                className={labelClass}
                                            >
                                                {isCopierInquiry
                                                    ? "Anything else we should know? (optional)"
                                                    : "Message *"}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required={!isCopierInquiry}
                                                rows={4}
                                                placeholder={
                                                    inquiryType === "product"
                                                        ? "Any other details about your requirements."
                                                        : "Tell us how we can help — questions about our solutions, partnerships, or anything else."
                                                }
                                                className={inputClass}
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                                Something went wrong sending
                                                your message. Please try again,
                                                or email us directly.
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="mt-7 w-full rounded-lg border border-indigo-600 bg-indigo-600 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                        >
                                            {status === "submitting"
                                                ? "Sending…"
                                                : "Send Message"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </Reveal>

                        {/* Info panel — unchanged */}
                        <aside className="flex flex-col gap-5 lg:col-span-2">
                            <Reveal delay={100}>
                                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                        Reach us directly
                                    </p>
                                    <ul className="mt-5 space-y-4 text-sm text-slate-600">
                                        <li className="flex items-start gap-3">
                                            <Mail
                                                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                                strokeWidth={1.8}
                                            />
                                            <a
                                                href="mailto:raejan@veritasorganisation.com"
                                                className="transition-colors hover:text-indigo-700"
                                            >
                                                raejan@veritasorganisation.com
                                            </a>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Phone
                                                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                                strokeWidth={1.8}
                                            />
                                            <a
                                                href="tel:+6582037719"
                                                className="transition-colors hover:text-indigo-700"
                                            >
                                                +65 8203 7719
                                            </a>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <MapPin
                                                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                                strokeWidth={1.8}
                                            />
                                            Singapore
                                        </li>
                                    </ul>
                                </div>
                            </Reveal>

                            <Reveal delay={180}>
                                <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7">
                                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                                        Looking for a career instead?
                                    </p>
                                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                                        Job applications are handled on our{" "}
                                        <a
                                            href="/careers"
                                            className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                                        >
                                            Careers page
                                        </a>{" "}
                                        — head there to view open roles and
                                        apply directly.
                                    </p>
                                </div>
                            </Reveal>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
