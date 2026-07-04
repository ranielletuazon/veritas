import { Link } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
    return (
        <>
            <Header />
            <section className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
                <div className="flex max-w-md flex-col items-center text-center">
                    {/* Eyebrow */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                        Error 404
                    </span>

                    {/* Big number — the visual anchor */}
                    <h1 className="mt-8 text-7xl font-bold tracking-tight text-slate-900 sm:text-8xl">
                        4
                        <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                            0
                        </span>
                        4
                    </h1>

                    <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        This page took a wrong turn
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                        The page you're looking for doesn't exist, may have
                        moved, or is no longer available.
                    </p>

                    {/* Actions */}
                    <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                        <Link
                            to="/"
                            className="border border-indigo-600 bg-indigo-600 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-indigo-700"
                        >
                            Back to Home
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-900 transition-colors duration-300 hover:border-indigo-400 hover:text-indigo-700"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
