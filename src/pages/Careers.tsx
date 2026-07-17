import { MapPin, Clock, Users } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CAREERS } from "../data/careers";
import teamBanner from "../assets/images/herobanner.jfif";

export default function Careers() {
    return (
        <>
            <Header />
            <main className="w-full bg-slate-50">
                {/* ── Hero — light, photo-led ─────────────────── */}
                <section className="relative w-full overflow-hidden bg-white pt-32 md:pt-40">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 lg:grid-cols-2 lg:gap-16 lg:px-10">
                        {/* Left — copy */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                                Careers
                            </span>
                            <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                                JUMPSTART YOUR{" "}
                                <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    CAREER
                                </span>{" "}
                                WITH US
                            </h1>
                            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                                We're always looking for driven people to join
                                the team. Passionate about growth and ready to
                                work in a high-energy environment? We'd love to
                                hear from you.
                            </p>
                        </div>

                        {/* Right — team photo */}
                        <div className="relative">
                            {/* Offset accent frame */}
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-3 -right-3 h-full w-full rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 opacity-15"
                            />
                            <img
                                src={teamBanner}
                                alt="The Veritas team"
                                className="relative w-full rounded-xl border border-slate-200 object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Open Roles ──────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
                        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                            Open Positions — {CAREERS.length}
                        </h2>

                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {CAREERS.map((job) => (
                                <a
                                    key={job.id}
                                    href={`/careers/${job.slug}`}
                                    className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-indigo-200 lg:p-7"
                                >
                                    <span className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
                                            {job.team}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
                                        {job.title}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                                        {job.summary}
                                    </p>

                                    <div className="mt-5 flex items-center gap-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin
                                                className="h-3.5 w-3.5 text-indigo-500"
                                                strokeWidth={1.8}
                                            />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock
                                                className="h-3.5 w-3.5 text-indigo-500"
                                                strokeWidth={1.8}
                                            />
                                            {job.type}
                                        </span>
                                        <span className="ml-auto font-semibold text-indigo-600 transition-transform duration-300 group-hover:translate-x-1">
                                            View Role →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
