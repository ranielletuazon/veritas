import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import newsData from "../data/news.json";
import type { NewsPost } from "../types/news";

const PAGE_SIZE = 4;

/* Resolve image filenames from the JSON against bundled assets.
   Folder assumed: src/assets/images/news/ — adjust glob if different. */
const newsImages = import.meta.glob("../assets/images/news/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

const imgSrc = (file: string): string | undefined =>
    newsImages[`../assets/images/news/${file}`];

/* Safari-safe: "2026-05-07 09:00:00" is not ISO — space must become "T". */
const parseDate = (s: string) => new Date(s.replace(" ", "T"));

const monthLabel = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const dayLabel = (d: Date) =>
    d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

export default function News() {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const posts = (newsData as NewsPost[])
        .filter((p) => p.status === "published")
        .sort(
            (a, b) =>
                parseDate(b.published_at).getTime() -
                parseDate(a.published_at).getTime(),
        );

    const visiblePosts = posts.slice(0, visibleCount);
    const hasMore = visibleCount < posts.length;

    /* Archive sidebar stays unpaginated — it's just links, not images. */
    const archive = posts.reduce<Map<string, NewsPost[]>>((map, post) => {
        const key = monthLabel(parseDate(post.published_at));
        const group = map.get(key);
        if (group) group.push(post);
        else map.set(key, [post]);
        return map;
    }, new Map());

    return (
        <>
            <Header />

            <main className="w-full">
                {/* ── Page header ─────────────────────────────── */}
                <section className="w-full bg-slate-50 pt-32 md:pt-40">
                    <div className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                            News
                        </span>
                        <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                            THE LATEST FROM{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                                VERITAS
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                            Milestones, team stories, and updates from across
                            the organisation.
                        </p>
                    </div>
                </section>

                {/* ── Post feed + Archive ──────────────────────── */}
                <section className="w-full bg-slate-50 pb-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
                        {/* Left — paginated post feed */}
                        <div className="lg:col-span-3">
                            {posts.length === 0 ? (
                                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                                    <p className="text-sm text-slate-500">
                                        No news published yet — check back soon.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-5">
                                        {visiblePosts.map((post, i) => (
                                            <Link
                                                key={post.id}
                                                to={`/news/${post.slug}`}
                                                className="group flex gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-300 hover:border-indigo-200 sm:gap-5 sm:p-5"
                                            >
                                                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 sm:w-44">
                                                    {imgSrc(post.images[0]) ? (
                                                        <img
                                                            src={imgSrc(
                                                                post.images[0],
                                                            )}
                                                            alt={post.title}
                                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                                        />
                                                    ) : (
                                                        <span className="absolute bottom-1.5 left-2 font-mono text-[8px] font-medium uppercase tracking-widest text-white/70 sm:text-[10px]">
                                                            No image
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex min-w-0 flex-col justify-center">
                                                    <div className="flex items-center gap-2">
                                                        {i === 0 && (
                                                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-indigo-600">
                                                                Latest
                                                            </span>
                                                        )}
                                                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                                            {dayLabel(
                                                                parseDate(
                                                                    post.published_at,
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                    <h2 className="mt-2 text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-lg">
                                                        {post.title.trim()}
                                                    </h2>
                                                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500 line-clamp-2">
                                                        {
                                                            post.description.split(
                                                                "\n",
                                                            )[0]
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {hasMore && (
                                        <div className="mt-8 flex justify-center">
                                            <button
                                                onClick={() =>
                                                    setVisibleCount(
                                                        (c) => c + PAGE_SIZE,
                                                    )
                                                }
                                                className="rounded-lg border border-slate-300 bg-white px-7 py-3 text-sm font-semibold tracking-wide text-slate-900 transition-colors duration-300 hover:border-indigo-400 hover:text-indigo-700"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Right — archive index, grouped by month */}
                        <aside className="border-t border-slate-200 pt-10 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                All Posts
                            </h2>

                            <div className="mt-6 flex flex-col gap-8">
                                {[...archive.entries()].map(
                                    ([month, monthPosts]) => (
                                        <div key={month}>
                                            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                                                {month}
                                            </p>
                                            <ul className="mt-3 flex flex-col">
                                                {monthPosts.map((post) => (
                                                    <li key={post.id}>
                                                        <Link
                                                            to={`/news/${post.slug}`}
                                                            className="group flex items-baseline justify-between gap-4 border-b border-slate-200 py-3"
                                                        >
                                                            <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-700">
                                                                {post.title.trim()}
                                                            </span>
                                                            <span className="shrink-0 font-mono text-[11px] text-slate-400">
                                                                {parseDate(
                                                                    post.published_at,
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    },
                                                                )}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ),
                                )}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
