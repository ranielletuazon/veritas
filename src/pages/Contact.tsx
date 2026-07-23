import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

export default function Contact() {
    const [status, setStatus] = useState<Status>("idle");

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
                                anything else? Send us a message and the right
                                team will get back to you.
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
                        {/* Form — revealed as ONE unit, fields never individually animated */}
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
                                                placeholder="Tell us how we can help — questions about our solutions, partnerships, or anything else."
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

                        {/* Info panel */}
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
