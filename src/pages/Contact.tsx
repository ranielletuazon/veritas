import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { PRODUCT_CATEGORIES, getAllItems } from "../data/products";
import { Helmet } from "react-helmet-async";

type Status = "idle" | "submitting" | "success" | "error";
type InquiryType = "general" | "product";
type CurrentSetup = "lease" | "owned" | "none";
type ResidencyType = "residential" | "commercial";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

const COPIER_SLUG = "copier-solutions";
const ENERGY_SLUG = "energy-solutions";
const MAX_BILL_BYTES = 5 * 1024 * 1024; // 5MB as requested — see flag re: Vercel's ~4.5MB body cap after base64 inflation

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
        };
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.readAsDataURL(file);
    });

export default function Contact() {
    const [searchParams] = useSearchParams();
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [inquiryType, setInquiryType] = useState<InquiryType>("general");
    const [productSlug, setProductSlug] = useState<string>("");
    const [unitId, setUnitId] = useState<string>("");
    const [currentSetup, setCurrentSetup] = useState<CurrentSetup>("none");
    const [residencyType, setResidencyType] =
        useState<ResidencyType>("residential");

    const selectedCategory = PRODUCT_CATEGORIES.find(
        (c) => c.slug === productSlug,
    );
    const isCopierInquiry =
        inquiryType === "product" && productSlug === COPIER_SLUG;
    const isEnergyInquiry =
        inquiryType === "product" && productSlug === ENERGY_SLUG;
    const availableUnits = selectedCategory
        ? getAllItems(selectedCategory)
        : [];

    useEffect(() => {
        const productParam = searchParams.get("product");
        const unitParam = searchParams.get("unit");
        if (!productParam) return;

        const matchedCategory = PRODUCT_CATEGORIES.find(
            (c) => c.slug === productParam,
        );
        if (!matchedCategory) return;

        setInquiryType("product");
        setProductSlug(productParam);

        if (unitParam) {
            const matchedUnit = getAllItems(matchedCategory).find(
                (i) => i.id === unitParam,
            );
            setUnitId(matchedUnit ? matchedUnit.id : "not-sure");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCategoryChange = (slug: string) => {
        setProductSlug(slug);
        setUnitId("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        if (data.get("website")) return;

        if (!privacyAccepted) {
            setErrorMsg(
                "Please confirm you've read the Privacy Policy before submitting.",
            );
            setStatus("error");
            return;
        }

        /* Energy bill upload — validate before touching the network */
        let billFileName: string | undefined;
        let billFileType: string | undefined;
        let billFileData: string | undefined;

        if (isEnergyInquiry) {
            const billFile = data.get("billFile") as File | null;
            if (!billFile || billFile.size === 0) {
                setErrorMsg(
                    "Please attach your latest 1 month electricity bill.",
                );
                setStatus("error");
                return;
            }
            if (billFile.size > MAX_BILL_BYTES) {
                setErrorMsg(
                    "Your file is larger than 5MB. Please upload a smaller file.",
                );
                setStatus("error");
                return;
            }
            billFileName = billFile.name;
            billFileType = billFile.type;
        }

        setStatus("submitting");
        setErrorMsg("");

        try {
            if (isEnergyInquiry) {
                const billFile = data.get("billFile") as File;
                billFileData = await toBase64(billFile);
            }

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
                    // Copier-specific
                    currentSetup: isCopierInquiry ? currentSetup : undefined,
                    decisionMaker: isCopierInquiry
                        ? data.get("decisionMaker")
                        : undefined,
                    machineAge: isCopierInquiry
                        ? data.get("machineAge")
                        : undefined,
                    remainingMonths: isCopierInquiry
                        ? data.get("remainingMonths")
                        : undefined,
                    monthlyRentalFee: isCopierInquiry
                        ? data.get("monthlyRentalFee")
                        : undefined,
                    finalPayment: isCopierInquiry
                        ? data.get("finalPayment")
                        : undefined,
                    monoVolume: isCopierInquiry
                        ? data.get("monoVolume")
                        : undefined,
                    colorVolume: isCopierInquiry
                        ? data.get("colorVolume")
                        : undefined,
                    costPerPrintMono: isCopierInquiry
                        ? data.get("costPerPrintMono")
                        : undefined,
                    costPerPrintColor: isCopierInquiry
                        ? data.get("costPerPrintColor")
                        : undefined,
                    quotationType: isCopierInquiry
                        ? data.get("quotationType")
                        : undefined,
                    // Energy-specific
                    residencyType: isEnergyInquiry ? residencyType : undefined,
                    billFileName: isEnergyInquiry ? billFileName : undefined,
                    billFileType: isEnergyInquiry ? billFileType : undefined,
                    billFileData: isEnergyInquiry ? billFileData : undefined,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Request failed");
            }

            setStatus("success");
            form.reset();
            setCurrentSetup("none");
            setResidencyType("residential");
            setUnitId("");
            setPrivacyAccepted(false);
        } catch (err) {
            setErrorMsg(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
            setStatus("error");
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Veritas Organisation</title>
                <meta
                    name="description"
                    content="Questions about our solutions or a specific product? Send us a message and the right team will get back to you."
                />
            </Helmet>
            <Header />
            <main className="w-full">
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

                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-5 lg:gap-14 lg:px-10">
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
                                            className="mt-8 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-400 hover:text-indigo-700 cursor-pointer"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500 cursor-pointer">
                                            Send a message
                                        </p>

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
                                                    Which one are you asking
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
                                                        Select an option
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

                                        <input
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            className="absolute left-[-9999px] h-0 w-0 opacity-0"
                                        />

                                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className={labelClass}
                                                >
                                                    {isEnergyInquiry
                                                        ? residencyType ===
                                                          "residential"
                                                            ? "Name (Residential) *"
                                                            : "Person In Charge (Commercial) *"
                                                        : "Name *"}
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    placeholder="Full name"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className={labelClass}
                                                >
                                                    {isEnergyInquiry
                                                        ? "Email Address *"
                                                        : "Email *"}
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
                                                    {isEnergyInquiry
                                                        ? "Contact Number *"
                                                        : "Phone (optional)"}
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required={isEnergyInquiry}
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

                                        {/* ── Energy Solutions — unique fields ────────── */}
                                        {isEnergyInquiry && (
                                            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-5">
                                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-700">
                                                    Energy Inquiry Details
                                                </p>

                                                <div className="mt-4">
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Are you a Residential or
                                                        Commercial customer? *
                                                    </label>
                                                    <div
                                                        className="grid grid-cols-2 gap-2"
                                                        role="radiogroup"
                                                        aria-label="Residency type"
                                                    >
                                                        {(
                                                            [
                                                                {
                                                                    key: "residential",
                                                                    label: "Residential",
                                                                },
                                                                {
                                                                    key: "commercial",
                                                                    label: "Commercial",
                                                                },
                                                            ] as const
                                                        ).map((option) => (
                                                            <button
                                                                key={option.key}
                                                                type="button"
                                                                role="radio"
                                                                aria-checked={
                                                                    residencyType ===
                                                                    option.key
                                                                }
                                                                onClick={() =>
                                                                    setResidencyType(
                                                                        option.key,
                                                                    )
                                                                }
                                                                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                                                                    residencyType ===
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

                                                <div className="mt-4">
                                                    <label
                                                        htmlFor="billFile"
                                                        className={labelClass}
                                                    >
                                                        Latest 3 months
                                                        electricity bill * (PDF
                                                        or image, max 5MB)
                                                    </label>
                                                    <input
                                                        id="billFile"
                                                        name="billFile"
                                                        type="file"
                                                        required
                                                        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* ── Copier Solutions — unique fields ────────── */}
                                        {isCopierInquiry && (
                                            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-5">
                                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-700">
                                                    About Your Current Setup
                                                </p>

                                                <div className="mt-4">
                                                    <label
                                                        htmlFor="decisionMaker"
                                                        className={labelClass}
                                                    >
                                                        Decision maker's name *
                                                    </label>
                                                    <input
                                                        id="decisionMaker"
                                                        name="decisionMaker"
                                                        type="text"
                                                        required
                                                        placeholder="Who approves this purchase?"
                                                        className={inputClass}
                                                    />
                                                </div>

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
                                                                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
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
                                                                placeholder="e.g. $0.00/month"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label
                                                                htmlFor="finalPayment"
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Final payment
                                                                amount, if
                                                                applicable
                                                            </label>
                                                            <input
                                                                id="finalPayment"
                                                                name="finalPayment"
                                                                type="text"
                                                                placeholder="e.g. $0 buyout at end of term"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}

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

                                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <label
                                                            htmlFor="costPerPrintMono"
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Current cost per
                                                            print — B&W
                                                        </label>
                                                        <input
                                                            id="costPerPrintMono"
                                                            name="costPerPrintMono"
                                                            type="text"
                                                            placeholder="e.g. $0.00"
                                                            className={
                                                                inputClass
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="costPerPrintColor"
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Current cost per
                                                            print — Colored
                                                        </label>
                                                        <input
                                                            id="costPerPrintColor"
                                                            name="costPerPrintColor"
                                                            type="text"
                                                            placeholder="e.g. $0.00"
                                                            className={
                                                                inputClass
                                                            }
                                                        />
                                                    </div>
                                                </div>

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

                                        <div className="mt-5">
                                            <label
                                                htmlFor="message"
                                                className={labelClass}
                                            >
                                                {isCopierInquiry ||
                                                isEnergyInquiry
                                                    ? "Anything else we should know? (optional)"
                                                    : "Message *"}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required={
                                                    !isCopierInquiry &&
                                                    !isEnergyInquiry
                                                }
                                                rows={4}
                                                placeholder={
                                                    inquiryType === "product"
                                                        ? "Any other details about your requirements."
                                                        : "Tell us how we can help — questions about our solutions, partnerships, or anything else."
                                                }
                                                className={inputClass}
                                            />
                                        </div>

                                        {/* Privacy Acceptance */}
                                        <div className="mt-6 flex items-start gap-3">
                                            <input
                                                id="privacyAccepted"
                                                type="checkbox"
                                                checked={privacyAccepted}
                                                onChange={(e) =>
                                                    setPrivacyAccepted(
                                                        e.target.checked,
                                                    )
                                                }
                                                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                                            />
                                            <label
                                                htmlFor="privacyAccepted"
                                                className="text-sm leading-relaxed text-slate-600"
                                            >
                                                I have read and agree to the{" "}
                                                <a
                                                    href="/privacy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
                                                >
                                                    Privacy Policy
                                                </a>
                                                . *
                                            </label>
                                        </div>

                                        {status === "error" && (
                                            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                                {errorMsg ||
                                                    "Something went wrong sending your message. Please try again, or email us directly."}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={
                                                status === "submitting" ||
                                                !privacyAccepted
                                            }
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

                        <aside className="flex flex-col gap-5 lg:col-span-2">
                            <Reveal delay={100}>
                                <div className="rounded-2xl border border-slate-200 bg-white p-7">
                                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                        Reach us directly
                                    </p>
                                    <div className="mt-5">
                                        <a
                                            href="mailto:enquiry@veritasorganisation.com"
                                            className="flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-indigo-700"
                                        >
                                            <Mail
                                                className="h-4 w-4 shrink-0 text-indigo-600"
                                                strokeWidth={1.8}
                                            />
                                            enquiry@veritasorganisation.com
                                        </a>
                                    </div>

                                    {/* Offices */}
                                    <div className="mt-6 flex flex-col gap-6 border-t border-slate-200 pt-6">
                                        {[
                                            {
                                                location: "Singapore",
                                                phone: "+65 8203 7719",
                                                tel: "+6582037719",
                                                address: [
                                                    "7030 Ang Mo Kio Ave 5, #08-98",
                                                    "Singapore 569880",
                                                ],
                                            },
                                            {
                                                location: "Philippines",
                                                phone: "+63 962 167 8061",
                                                tel: "+639621678061",
                                                address: [
                                                    "San Fernando",
                                                    "Pampanga, Philippines",
                                                ],
                                            },
                                        ].map((office) => (
                                            <div key={office.location}>
                                                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                                                    {office.location}
                                                </p>
                                                <div className="mt-3 flex flex-col gap-2.5 text-sm text-slate-600">
                                                    <a
                                                        href={`tel:${office.tel}`}
                                                        className="flex items-center gap-3 transition-colors hover:text-indigo-700"
                                                    >
                                                        <Phone
                                                            className="h-4 w-4 shrink-0 text-indigo-600"
                                                            strokeWidth={1.8}
                                                        />
                                                        {office.phone}
                                                    </a>
                                                    <div className="flex items-start gap-3">
                                                        <MapPin
                                                            className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                                            strokeWidth={1.8}
                                                        />
                                                        <span>
                                                            {office.address.map(
                                                                (line, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="block"
                                                                    >
                                                                        {line}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
