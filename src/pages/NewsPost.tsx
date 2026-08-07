import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
    findPostBySlug,
    publishedPosts,
    imgSrc,
    parseDate,
    fullDateLabel,
} from "../data/news";
import NotFound from "./NotFound";
import Seo, { absoluteUrl } from "./components/Seo";
import { getExcerpt } from "../data/news";

export default function NewsPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? findPostBySlug(slug) : undefined;

    const [activeImg, setActiveImg] = useState(0);

    if (!post) {
        return (
            <>
                <NotFound />
            </>
        );
    }

    const posts = publishedPosts();
    const index = posts.findIndex((p) => p.id === post.id);
    const newer = index > 0 ? posts[index - 1] : undefined;
    const older = index < posts.length - 1 ? posts[index + 1] : undefined;
    const excerpt = getExcerpt(post);
    const paragraphs = post.description
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

    const images = post.images ?? [];
    const activeSrc = images[activeImg] ? imgSrc(images[activeImg]) : undefined;

    return (
        <>
            <Seo
                title={`${post.title.trim()} - Veritas Organisation`}
                description={excerpt}
                path={`/news/${post.slug}`}
                image={absoluteUrl(activeSrc)}
                type="article"
            />
            <Header />

            <main className="w-full">
                {/* ── Article header ───────────────────────────── */}
                <section className="w-full bg-slate-50 pt-32 md:pt-40">
                    <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
                        <div className="mx-auto max-w-3xl">
                            <a
                                href="/news"
                                className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-indigo-600"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                All News
                            </a>

                            <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
                                {post.title.trim()}
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <span
                                    className="h-8 w-[3px] bg-gradient-to-b from-indigo-600 to-fuchsia-600"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Veritas Organisation
                                    </p>
                                    <time
                                        dateTime={post.published_at.replace(
                                            " ",
                                            "T",
                                        )}
                                        className="text-sm text-slate-500"
                                    >
                                        {fullDateLabel(
                                            parseDate(post.published_at),
                                        )}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Image carousel ───────────────────────────── */}
                {images.length > 0 && (
                    <section className="w-full bg-slate-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-10">
                            <div className="mx-auto max-w-4xl">
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 shadow-lg">
                                    {activeSrc ? (
                                        <img
                                            src={activeSrc}
                                            alt={`${post.title.trim()} — photo ${activeImg + 1} of ${images.length}`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="absolute bottom-3 left-4 font-mono text-[10px] font-medium uppercase tracking-widest text-white/70">
                                            Image unavailable
                                        </span>
                                    )}

                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setActiveImg((i) =>
                                                        i === 0
                                                            ? images.length - 1
                                                            : i - 1,
                                                    )
                                                }
                                                aria-label="Previous image"
                                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/50"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setActiveImg((i) =>
                                                        i === images.length - 1
                                                            ? 0
                                                            : i + 1,
                                                    )
                                                }
                                                aria-label="Next image"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/50"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                            <span className="absolute bottom-3 right-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-md">
                                                {activeImg + 1} /{" "}
                                                {images.length}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {images.length > 1 && (
                                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                        {images.map((file, i) => (
                                            <button
                                                key={file}
                                                onClick={() => setActiveImg(i)}
                                                aria-label={`View image ${i + 1}`}
                                                aria-current={i === activeImg}
                                                className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                                                    i === activeImg
                                                        ? "border-indigo-600"
                                                        : "border-transparent opacity-60 hover:opacity-100"
                                                }`}
                                            >
                                                {imgSrc(file) ? (
                                                    <img
                                                        src={imgSrc(file)}
                                                        alt=""
                                                        loading="lazy"
                                                        className="absolute inset-0 h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-fuchsia-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Article body ─────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-16">
                    <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
                        <article className="mx-auto max-w-3xl">
                            {paragraphs.map((para, i) => (
                                <p
                                    key={i}
                                    className={`leading-relaxed text-slate-600 ${
                                        i === 0
                                            ? "text-lg font-medium text-slate-700"
                                            : "mt-5 text-base"
                                    }`}
                                >
                                    {para}
                                </p>
                            ))}
                        </article>
                    </div>
                </section>

                {/* ── Prev / Next ──────────────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                            {older ? (
                                <a
                                    href={`/news/${older.slug}`}
                                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200"
                                >
                                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        ← Older
                                    </p>
                                    <p className="mt-2 text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
                                        {older.title.trim()}
                                    </p>
                                </a>
                            ) : (
                                <div />
                            )}
                            {newer && (
                                <a
                                    href={`/news/${newer.slug}`}
                                    className="group rounded-xl border border-slate-200 bg-white p-5 text-right transition-colors hover:border-indigo-200"
                                >
                                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        Newer →
                                    </p>
                                    <p className="mt-2 text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
                                        {newer.title.trim()}
                                    </p>
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
