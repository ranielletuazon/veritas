import { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Clock,
    CheckCircle2,
    Video,
    FileText,
    AlertCircle,
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { findCareerBySlug } from "../data/careers";
import { Helmet } from "react-helmet-async";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_RESUME_BYTES = 3 * 1024 * 1024; // 3MB — see note on Vercel's ~4.5MB body cap

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

const labelClass =
    "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500";

/** Strip the "data:...;base64," prefix FileReader adds. */
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

export default function CareersView() {
    const { slug } = useParams<{ slug: string }>();
    const job = slug ? findCareerBySlug(slug) : undefined;

    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

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

        const resume = data.get("resume") as File | null;
        if (!resume || resume.size === 0) {
            setErrorMsg("Please attach your resume.");
            setStatus("error");
            return;
        }
        if (resume.size > MAX_RESUME_BYTES) {
            setErrorMsg(
                "Your resume is larger than 3MB. Please compress it or export a smaller PDF.",
            );
            setStatus("error");
            return;
        }

        setStatus("submitting");
        setErrorMsg("");

        try {
            const resumeData = await toBase64(resume);

            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role: job?.title,
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    videoLink: data.get("videoLink"),
                    pitch: data.get("pitch"),
                    resumeName: resume.name,
                    resumeType: resume.type,
                    resumeData,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Request failed");
            }

            setStatus("success");
            form.reset();
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
            <Helmet>
                <title>{`${job.title} - Veritas Organisation`}</title>
                <meta name="description" content={job.summary} />
                <meta
                    property="og:title"
                    content={`${job.title} — Veritas Organisation`}
                />
                <meta property="og:description" content={job.summary} />
            </Helmet>
            <Header />
            <main className="w-full bg-slate-50">
                {/* ── Role header ─────────────────────────────── */}
                <section className="w-full bg-white pt-32 md:pt-40">
                    <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
                        <Reveal>
                            <a
                                href="/careers"
                                className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-indigo-600"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                All Open Roles
                            </a>
                        </Reveal>

                        <Reveal delay={80}>
                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
                                    {job.team}
                                </span>
                            </div>
                            <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl">
                                {job.title}
                            </h1>
                        </Reveal>

                        <Reveal delay={140}>
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
                        </Reveal>
                    </div>
                </section>

                {/* ── Detail + Application ────────────────────── */}
                <section className="w-full pb-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-5 lg:gap-14 lg:px-10">
                        {/* Left — role detail */}
                        <div className="lg:col-span-3">
                            <Reveal>
                                <p className="text-base leading-relaxed text-slate-600">
                                    {job.summary}
                                </p>
                            </Reveal>

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
                                    {
                                        heading: "Schedule",
                                        items: job.work_details,
                                    },
                                ] as const
                            ).map((block, bi) => (
                                <Reveal key={block.heading} delay={bi * 80}>
                                    <div className="mt-10">
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
                                </Reveal>
                            ))}

                            {/* ── Video introduction instructions ── */}
                            <Reveal delay={240}>
                                <div className="mt-12 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 text-indigo-700">
                                        <Video
                                            className="h-5 w-5"
                                            strokeWidth={1.8}
                                        />
                                        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest">
                                            Required — Video Introduction
                                        </h2>
                                    </div>

                                    <p className="mt-4 text-sm leading-relaxed text-slate-700">
                                        Every application must include a link to
                                        a{" "}
                                        <strong>
                                            2-minute video introduction
                                        </strong>{" "}
                                        of yourself, uploaded to Streamable. We
                                        use this to get a sense of who you are
                                        beyond your resume — there's no need for
                                        production quality, a phone camera is
                                        completely fine.
                                    </p>

                                    <div className="mt-6">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700">
                                            What to cover
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                            {[
                                                "Your name, and a short introduction about your background.",
                                                "What you're currently doing, and why you're looking for a change.",
                                                "Why you're interested in sales and in joining Veritas specifically.",
                                                "One thing about you that wouldn't show up on a resume.",
                                            ].map((line) => (
                                                <li
                                                    key={line}
                                                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                                                >
                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700">
                                            How to submit
                                        </p>
                                        <ol className="mt-3 space-y-2">
                                            {[
                                                "Create a free account at streamable.com before uploading.",
                                                "Record your introduction — keep it to roughly 2 minutes.",
                                                "Upload the video to Streamable while logged in.",
                                                "Copy the shareable video link and paste it into the form.",
                                            ].map((line, i) => (
                                                <li
                                                    key={line}
                                                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                                                >
                                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-mono text-[10px] font-bold text-white">
                                                        {i + 1}
                                                    </span>
                                                    {line}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                                        <AlertCircle
                                            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                                            strokeWidth={1.8}
                                        />
                                        <p className="text-xs leading-relaxed text-amber-900">
                                            <strong>
                                                You must register a Streamable
                                                account first.
                                            </strong>{" "}
                                            Videos uploaded without an account
                                            are automatically deleted after a
                                            short period, which means we won't
                                            be able to view your introduction
                                            when we review your application.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right — application form */}
                        <aside className="lg:col-span-2">
                            <Reveal delay={120}>
                                <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                    {status === "success" ? (
                                        <div className="py-8 text-center">
                                            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                                Application received
                                            </p>
                                            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                                                Thank you for applying.
                                            </h2>
                                            <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                                We've received your application
                                                for <strong>{job.title}</strong>{" "}
                                                and will review it within 3
                                                business days.
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setStatus("idle")
                                                }
                                                className="mt-6 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-indigo-400 hover:text-indigo-700"
                                            >
                                                Submit Another
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                                Apply for this role
                                            </p>

                                            <input
                                                type="text"
                                                name="website"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                aria-hidden="true"
                                                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                                            />

                                            <div className="mt-6 flex flex-col gap-5">
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
                                                        placeholder="+63 000 000 0000"
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="resume"
                                                        className={labelClass}
                                                    >
                                                        Resume * (PDF or Word,
                                                        max 3MB)
                                                    </label>
                                                    <input
                                                        id="resume"
                                                        name="resume"
                                                        type="file"
                                                        required
                                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="videoLink"
                                                        className={labelClass}
                                                    >
                                                        Streamable video link *
                                                    </label>
                                                    <input
                                                        id="videoLink"
                                                        name="videoLink"
                                                        type="url"
                                                        required
                                                        placeholder="https://streamable.com/..."
                                                        className={inputClass}
                                                    />
                                                    <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                                                        <FileText
                                                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500"
                                                            strokeWidth={1.8}
                                                        />
                                                        See the video
                                                        introduction
                                                        instructions before
                                                        submitting.
                                                    </p>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="pitch"
                                                        className={labelClass}
                                                    >
                                                        Why you? (optional)
                                                    </label>
                                                    <textarea
                                                        id="pitch"
                                                        name="pitch"
                                                        rows={4}
                                                        placeholder="Anything else you'd like us to know."
                                                        className={inputClass}
                                                    />
                                                </div>
                                            </div>

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
                                                        "Something went wrong. Please try again."}
                                                </p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={
                                                    status === "submitting" ||
                                                    !privacyAccepted
                                                }
                                                className="mt-6 w-full rounded-lg border border-indigo-600 bg-indigo-600 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                            >
                                                {status === "submitting"
                                                    ? "Submitting…"
                                                    : "Submit Application"}
                                            </button>
                                            <p className="mt-3 text-center text-xs text-slate-400">
                                                Applications are reviewed within
                                                3 business days.
                                            </p>
                                        </form>
                                    )}
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
