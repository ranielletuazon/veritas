import { useState, type FormEvent } from "react";
import { Briefcase, Users, Mail, Phone, MapPin } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

type InquiryType = "business" | "recruitment";
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

export default function Contact() {
    const [inquiry, setInquiry] = useState<InquiryType>("business");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        /* Honeypot — bots fill every field; humans never see this one */
        if (data.get("website")) return;

        setStatus("submitting");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inquiry,
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    company: data.get("company"),
                    message: data.get("message"),
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            <Header />
            <main className="w-full">
                {/* ── Page header — polygon-cut dark banner ───── */}
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
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                            Contact Us
                        </span>
                        <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                            START THE{" "}
                            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                CONVERSATION
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                            Business partnership or career inquiry — tell us
                            what you're looking for and the right team will get
                            back to you.
                        </p>
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
                        <div className="lg:col-span-3">
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
                                            Your inquiry has been sent to the{" "}
                                            {inquiry === "business"
                                                ? "partnerships"
                                                : "recruitment"}{" "}
                                            team. Expect a reply within two
                                            business days.
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
                                                        key: "business",
                                                        label: "Business Inquiry",
                                                        icon: Briefcase,
                                                    },
                                                    {
                                                        key: "recruitment",
                                                        label: "Recruitment",
                                                        icon: Users,
                                                    },
                                                ] as const
                                            ).map((option) => (
                                                <button
                                                    key={option.key}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={
                                                        inquiry === option.key
                                                    }
                                                    onClick={() =>
                                                        setInquiry(option.key)
                                                    }
                                                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                                                        inquiry === option.key
                                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                                            : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                                                    }`}
                                                >
                                                    <option.icon
                                                        className="h-4 w-4"
                                                        strokeWidth={1.8}
                                                    />
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Honeypot — hidden from humans, bait for bots */}
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
                                                    Company{" "}
                                                    {inquiry ===
                                                        "recruitment" &&
                                                        "(optional)"}
                                                </label>
                                                <input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    required={
                                                        inquiry === "business"
                                                    }
                                                    placeholder={
                                                        inquiry === "business"
                                                            ? "Company name"
                                                            : "Current company, if any"
                                                    }
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label
                                                htmlFor="message"
                                                className={labelClass}
                                            >
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder={
                                                    inquiry === "business"
                                                        ? "Tell us about your business and what you're looking for."
                                                        : "Tell us about yourself and why you want to build a career in sales."
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
                        </div>

                        {/* Info panel */}
                        <aside className="flex flex-col gap-5 lg:col-span-2">
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
                                            href="mailto:owner@veritasorganisation.com"
                                            className="transition-colors hover:text-indigo-700"
                                        >
                                            owner@veritasorganisation.com
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Phone
                                            className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                                            strokeWidth={1.8}
                                        />
                                        <a
                                            href="tel:89220932"
                                            className="transition-colors hover:text-indigo-700"
                                        >
                                            +65 8922 0932
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

                            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7">
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                                    Business inquiries
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-white/65">
                                    Exploring a partnership or one of our
                                    solutions? Select{" "}
                                    <span className="text-white">
                                        Business Inquiry
                                    </span>{" "}
                                    and the partnerships team will respond
                                    directly.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7">
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-fuchsia-300">
                                    Recruitment inquiries
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-white/65">
                                    Ready to build a sales career? Select{" "}
                                    <span className="text-white">
                                        Recruitment
                                    </span>{" "}
                                    and tell us about yourself — no prior
                                    experience required.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
