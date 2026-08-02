import Header from "./components/Header";
import Footer from "./components/Footer";
import { Eye, Target } from "lucide-react";
import Reveal from "./components/Reveal";
import {
    groupByDepartment,
    employeePhotoSrc,
    initialsOf,
} from "../data/employees";

const CORE_VALUES = [
    {
        title: "Truth",
        description:
            "We tell clients exactly what we are, what we're not, and what to expect — no exceptions, even when the easier answer would sell faster.",
    },
    {
        title: "Competence",
        description:
            "Nobody on our team is handed responsibility they haven't earned. Every closer, every manager, has done the work from the ground up.",
    },
    {
        title: "Fairness",
        description:
            "Good deals work for both sides. We're not interested in a win that leaves a client or a teammate worse off than they should be.",
    },
    {
        title: "Responsibility",
        description:
            "We own our results, not our excuses. When something goes wrong, we own up and do our best to fix it.",
    },
];

const founder_image = "/images/boss.jpeg";
const founder_image2 = "/images/boss2.jpg";

export default function About() {
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
                                About Us
                            </span>
                        </Reveal>
                        <Reveal delay={80}>
                            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                                WHO WE{" "}
                                <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                    ARE
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={160}>
                            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                                Veritas is Latin for truth. That's not a
                                branding choice — it's the standard we hold
                                ourselves to. In sales, it's easy to blur the
                                line between representing a good product and
                                pretending to be something you're not. We don't
                                do that. Every client, every principal, and
                                every person on our team knows exactly what to
                                expect from us: always, honesty, in all things.
                            </p>
                        </Reveal>
                        {/* <Reveal delay={220}>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                                We work closely with trusted providers across
                                multiple industries — offering customers
                                reliable products and services while helping
                                businesses expand their market reach through
                                proven sales strategies, dedicated teams, and an
                                extensive lead database.
                            </p>
                        </Reveal> */}
                    </div>

                    <div
                        className="h-16 w-full bg-slate-50"
                        style={{
                            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
                        }}
                    />
                </section>

                {/* ── Mission / Vision ─────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 px-6 py-16 md:grid-cols-2 md:py-20 lg:px-10">
                        {[
                            {
                                icon: (
                                    <Target
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                ),
                                label: "Mission",
                                text: "To empower businesses with scalable sales solutions, connecting trusted service providers with customers through innovative lead generation and results-driven sales strategies.",
                                helps: [
                                    {
                                        lead: "Help our principal companies sell more",
                                        rest: "through a team that represents their brand and values honestly and closes with real conviction.",
                                    },
                                    {
                                        lead: "Help our clients get better value",
                                        rest: "real savings, real service, real support.",
                                    },
                                    {
                                        lead: "Help our team build a stable life",
                                        rest: "honest work, fair pay, and room to grow.",
                                    },
                                ],
                                closing:
                                    "We don't see these as competing goals. Done right, honest sales makes all three true at once.",
                            },
                            {
                                icon: (
                                    <Eye
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                ),
                                label: "Vision",
                                text: "To become an industry trusted and respected sales and business development group — a company where every person, from an intern to channel director, has a real path to grow into ownership of what they do.",
                            },
                        ].map((item, i) => (
                            <Reveal key={item.label} delay={i * 100}>
                                <div className="relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-8 lg:p-10">
                                    <div
                                        aria-hidden="true"
                                        className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10"
                                        style={{
                                            clipPath:
                                                "polygon(100% 0, 0 0, 100% 100%)",
                                        }}
                                    />
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    </div>
                                    <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
                                        {item.text}
                                    </p>

                                    {/* Mission-only: the "how" behind the statement */}
                                    {item.helps && (
                                        <>
                                            <ul className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                                                {item.helps.map((h) => (
                                                    <li
                                                        key={h.lead}
                                                        className="flex gap-3"
                                                    >
                                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                                                        <p className="text-sm leading-relaxed text-slate-600">
                                                            <span className="font-semibold text-slate-900">
                                                                {h.lead}
                                                            </span>
                                                            {" — "}
                                                            {h.rest}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                            {item.closing && (
                                                <p className="mt-6 border-t border-slate-200 pt-6 text-sm font-medium italic leading-relaxed text-indigo-700">
                                                    {item.closing}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Core Values ──────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20 lg:px-10">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                Our Core Values
                            </span>
                            <h2 className="mt-5 max-w-xl text-2xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                                WHAT WE{" "}
                                <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    STAND FOR
                                </span>
                            </h2>
                        </Reveal>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {CORE_VALUES.map((value, i) => (
                                <Reveal key={value.title} delay={i * 90}>
                                    <div className="group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-6">
                                        <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />
                                        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
                                            {value.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                            {value.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Founder ──────────────────────────────────── */}
                <section className="w-full bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-5 lg:gap-16 lg:px-10">
                        {/* Left — portrait, crossfades to second photo on hover */}
                        <Reveal className="lg:col-span-2">
                            <div className="group relative mx-auto max-w-sm lg:max-w-none">
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-4 -top-4 h-full w-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 opacity-20"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 100% 4%, 96% 100%, 4% 96%)",
                                    }}
                                />
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 to-slate-300">
                                    {/* Base photo — always visible */}
                                    <img
                                        src={founder_image}
                                        alt="Gerald Lee, Founder of Veritas Organisation"
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Second photo — crossfades in on hover */}
                                    <img
                                        src={founder_image2}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                                    />
                                </div>
                            </div>
                        </Reveal>

                        {/* Right — quote */}
                        <Reveal delay={150} className="lg:col-span-3">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                    From Our Founder
                                </span>

                                <blockquote className="mt-6">
                                    <p className="text-xl font-medium leading-relaxed tracking-tight text-slate-900 sm:text-2xl">
                                        "In all that you do... do your best, try
                                        your best, believe that you deserve the
                                        best and the best result will come
                                        through for you."
                                    </p>
                                </blockquote>

                                <div className="mt-6 flex items-center gap-4">
                                    <div
                                        className="h-10 w-[3px] bg-gradient-to-b from-indigo-600 to-fuchsia-600"
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <p className="font-bold tracking-tight text-slate-900">
                                            Gerald Lee
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Founder, Veritas Organisation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Meet the Team ─────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-10">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                Meet the Team
                            </span>
                            <h2 className="mt-5 max-w-xl text-2xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                                THE LEADERSHIP BEHIND{" "}
                                <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    VERITAS
                                </span>
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
                                Our leadership team oversees the Group's
                                day-to-day operations while driving the
                                execution of strategic initiatives and corporate
                                policies. Through regular reviews of business
                                performance and development projects, they
                                ensure operational excellence and sustainable
                                growth.
                            </p>
                        </Reveal>

                        <div className="mt-10 flex flex-col gap-14">
                            {[...groupByDepartment().entries()].map(
                                ([department, members]) => (
                                    <div key={department}>
                                        <Reveal>
                                            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
                                                {department}
                                            </h3>
                                        </Reveal>

                                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {members.map((employee, i) => {
                                                const src = employeePhotoSrc(
                                                    employee.photo,
                                                );
                                                return (
                                                    <Reveal
                                                        key={employee.id}
                                                        delay={i * 80}
                                                        className={
                                                            employee.featured
                                                                ? "sm:col-span-2 lg:col-span-1"
                                                                : ""
                                                        }
                                                    >
                                                        <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900">
                                                            {src ? (
                                                                <img
                                                                    src={src}
                                                                    alt={
                                                                        employee.name
                                                                    }
                                                                    loading="lazy"
                                                                    className="absolute inset-0 h-full w-full object-cover object-top grayscale-[15%] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                                                                />
                                                            ) : (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06] font-mono text-xl font-bold text-white/40"
                                                                    >
                                                                        {initialsOf(
                                                                            employee.name,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"
                                                            />

                                                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                                                <h4 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                                                                    {
                                                                        employee.name
                                                                    }
                                                                </h4>
                                                                <p className="mt-1 text-sm font-semibold text-indigo-200">
                                                                    {
                                                                        employee.role
                                                                    }
                                                                </p>
                                                            </div>

                                                            <span
                                                                aria-hidden="true"
                                                                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                                            />
                                                        </div>
                                                    </Reveal>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
