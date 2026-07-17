import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { findCareerBySlug } from "../data/careers";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

export default function CareersView() {
    const { slug } = useParams<{ slug: string }>();
    const job = slug ? findCareerBySlug(slug) : undefined;

    if (!job) {
        return (
            <>
                <Header />
                <main className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50 px-6 pt-20">
                    <div className="text-center">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                            404 — Role not found
                        </p>
                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                            This position doesn't exist or has been filled.
                        </h1>
                        <a
                            href="/careers"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-400 hover:text-indigo-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Open Roles
                        </a>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="w-full bg-slate-50">
                {/* ── Role header ─────────────────────────────── */}
                <section className="w-full bg-white pt-32 md:pt-40">
                    <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
                        <a
                            href="/careers"
                            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-indigo-600"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            All Open Roles
                        </a>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
                                {job.team}
                            </span>
                        </div>

                        <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl">
                            {job.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <MapPin
                                    className="h-4 w-4 text-indigo-500"
                                    strokeWidth={1.8}
                                />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock
                                    className="h-4 w-4 text-indigo-500"
                                    strokeWidth={1.8}
                                />
                                {job.type}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── Detail + Application ────────────────────── */}
                <section className="w-full pb-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-5 lg:gap-14 lg:px-10">
                        {/* Left — role detail */}
                        <div className="lg:col-span-3">
                            <p className="text-base leading-relaxed text-slate-600">
                                {job.summary}
                            </p>

                            {(
                                [
                                    {
                                        heading: "Duties & Responsibilities",
                                        items: job.duties,
                                    },
                                    {
                                        heading: "Requirements",
                                        items: job.requirements,
                                    },
                                    {
                                        heading: "What You Get",
                                        items: job.perks,
                                    },
                                ] as const
                            ).map((block) => (
                                <div key={block.heading} className="mt-10">
                                    <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                        {block.heading}
                                    </h2>
                                    <ul className="mt-4 space-y-3">
                                        {block.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                                            >
                                                <CheckCircle2
                                                    className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                                                    strokeWidth={1.8}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Right — application form (non-functional for now) */}
                        <aside className="lg:col-span-2">
                            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                    Apply for this role
                                </p>

                                {/* NOTE: intentionally non-functional — submission wiring comes later */}
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="mt-6 flex flex-col gap-5"
                                >
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
                                            placeholder="you@email.com"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className={labelClass}
                                        >
                                            Phone *
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="+65 0000 0000"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="pitch"
                                            className={labelClass}
                                        >
                                            Why you? *
                                        </label>
                                        <textarea
                                            id="pitch"
                                            name="pitch"
                                            rows={4}
                                            required
                                            placeholder="Tell us in a few sentences why you'd be a great fit."
                                            className={inputClass}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="rounded-lg border border-indigo-600 bg-indigo-600 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-indigo-700"
                                    >
                                        Submit Application
                                    </button>
                                    <p className="text-center text-xs text-slate-400">
                                        Applications are reviewed within 3
                                        business days.
                                    </p>
                                </form>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
