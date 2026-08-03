import { Shield, Mail, FileText, Lock, Globe, Clock } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { Helmet } from "react-helmet-async";

const SECTIONS = [
    {
        icon: FileText,
        heading: "Information We Collect",
        body: (
            <>
                <p>
                    We collect information you provide directly to us through
                    the forms on this website. What we collect depends on how
                    you reach out:
                </p>
                <p className="mt-4 font-semibold text-slate-800">
                    General and product inquiries
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>Your name, email address, and phone number</li>
                    <li>Your company name, if provided</li>
                    <li>The message or details you submit</li>
                    <li>
                        Which product or service category you're asking about
                    </li>
                </ul>
                <p className="mt-4 font-semibold text-slate-800">
                    Copier Solutions inquiries
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>The decision maker's name at your organisation</li>
                    <li>
                        Whether you currently lease or own a copier, and related
                        contract details (remaining term, monthly rental, buyout
                        figures)
                    </li>
                    <li>
                        Your average monthly print volume and cost per print
                    </li>
                </ul>
                <p className="mt-4 font-semibold text-slate-800">
                    Energy Solutions inquiries
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>Whether you're a residential or commercial customer</li>
                    <li>
                        A copy of your recent electricity bill, which you upload
                        directly — this document may contain your name, address,
                        account number, and consumption history
                    </li>
                </ul>
                <p className="mt-4 font-semibold text-slate-800">
                    Job applications
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>Your name, email, and phone number</li>
                    <li>
                        Your resume, uploaded directly through the application
                        form
                    </li>
                    <li>
                        A link to a video introduction you host on Streamable (a
                        third-party platform you control — see below)
                    </li>
                    <li>Any additional information you choose to include</li>
                </ul>
            </>
        ),
    },
    {
        icon: Shield,
        heading: "How We Use Your Information",
        body: (
            <ul className="list-disc space-y-1.5 pl-5">
                <li>
                    To respond to your inquiry and route it to the right team
                </li>
                <li>To evaluate and follow up on job applications</li>
                <li>
                    To match you with an appropriate solution or partner
                    relevant to your inquiry
                </li>
                <li>
                    To maintain records of correspondence for legitimate
                    business purposes
                </li>
                <li>
                    We do not sell, rent, or trade your personal information to
                    third parties for marketing purposes
                </li>
            </ul>
        ),
    },
    {
        icon: Globe,
        heading: "Third-Party Service Providers",
        body: (
            <>
                <p>
                    We rely on a small number of third-party services to operate
                    this website. Each processes data only to the extent
                    necessary to provide their service to us:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                    <li>
                        <strong>Resend</strong> — delivers form submissions to
                        our email inbox. Submitted data passes through Resend's
                        infrastructure as part of sending that email.
                    </li>
                    <li>
                        <strong>Vercel</strong> — hosts this website. Standard
                        technical logs (such as IP address and request timing)
                        may be retained by Vercel for security and performance
                        purposes.
                    </li>
                    <li>
                        <strong>Streamable</strong> — if you apply for a role,
                        you upload your own video introduction to Streamable
                        directly. That upload is governed by Streamable's own
                        privacy policy and terms, not ours.
                    </li>
                </ul>
            </>
        ),
    },
    {
        icon: Lock,
        heading: "Data Security",
        body: (
            <p>
                All data submitted through this website is encrypted in transit
                via HTTPS. Uploaded documents (electricity bills, resumes) are
                transmitted directly to our email system and are not stored in a
                separate public database on this website. While we take
                reasonable steps to protect your information, no method of
                transmission over the internet is completely secure, and we
                cannot guarantee absolute security.
            </p>
        ),
    },
    {
        icon: Clock,
        heading: "Data Retention",
        body: (
            <p>
                We retain inquiry and application data for as long as reasonably
                necessary to respond to your request, evaluate your application,
                or maintain records required for legitimate business purposes.
                If you would like your information deleted sooner, contact us
                using the details below and we will act on your request
                promptly.
            </p>
        ),
    },
    {
        icon: Shield,
        heading: "Your Rights",
        body: (
            <p>
                Depending on your location, you may have rights under applicable
                data protection law — including Singapore's Personal Data
                Protection Act (PDPA) and the Philippines' Data Privacy Act of
                2012 — to access, correct, or request deletion of your personal
                data. To exercise any of these rights, contact us using the
                details below.
            </p>
        ),
    },
    {
        icon: FileText,
        heading: "Children's Privacy",
        body: (
            <p>
                This website is not directed at children, and we do not
                knowingly collect personal information from anyone under the age
                of 18. If you believe a child has provided us with personal
                information, please contact us so we can remove it.
            </p>
        ),
    },
    {
        icon: Clock,
        heading: "Changes to This Policy",
        body: (
            <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for legal, operational, or
                regulatory reasons. The "Last updated" date at the top of this
                page reflects the most recent revision.
            </p>
        ),
    },
];

export default function Privacy() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - Veritas Organisation</title>
                <meta
                    name="description"
                    content="How Veritas Organisation collects, uses, and protects your personal information."
                />
            </Helmet>
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

                    <div className="relative mx-auto max-w-7xl px-6 pb-20 lg:px-10">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                Legal
                            </span>
                        </Reveal>
                        <Reveal delay={80}>
                            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
                                PRIVACY{" "}
                                <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                                    POLICY
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={140}>
                            <p className="mt-4 text-sm text-white/50">
                                Last updated: August 2026
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

                {/* ── Intro ───────────────────────────────────── */}
                <section className="w-full bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-10">
                        <div className="mx-auto max-w-3xl">
                            <Reveal>
                                <p className="text-base leading-relaxed text-slate-600">
                                    Veritas Organisation Pte. Ltd. ("Veritas,"
                                    "we," "us," or "our") respects your privacy.
                                    This policy explains what information we
                                    collect through this website, how we use it,
                                    and the choices you have. By submitting a
                                    form on this site, you agree to the
                                    practices described below.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ── Sections ────────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
                        <div className="mx-auto flex max-w-3xl flex-col gap-10">
                            {SECTIONS.map((section, i) => (
                                <Reveal key={section.heading} delay={i * 40}>
                                    <div className="border-t border-slate-200 pt-8">
                                        <div className="flex items-center gap-3 text-indigo-600">
                                            <section.icon
                                                className="h-5 w-5"
                                                strokeWidth={1.8}
                                            />
                                            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest">
                                                {section.heading}
                                            </h2>
                                        </div>
                                        <div className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                            {section.body}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}

                            {/* Contact */}
                            <Reveal delay={SECTIONS.length * 40}>
                                <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7 sm:p-8">
                                    <div className="flex items-center gap-3 text-indigo-300">
                                        <Mail
                                            className="h-5 w-5"
                                            strokeWidth={1.8}
                                        />
                                        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest">
                                            Questions About This Policy
                                        </h2>
                                    </div>
                                    <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                                        If you have questions about this Privacy
                                        Policy or how your information is
                                        handled, contact us at{" "}
                                        <a
                                            href="mailto:enquiry@veritasorganisation.com"
                                            className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                                        >
                                            enquiry@veritasorganisation.com
                                        </a>
                                        .
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
