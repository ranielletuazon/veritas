import newsData from "../data/news.json";

export interface NewsPost {
    id: number;
    slug: string;
    title: string;
    description: string;
    status: "published" | "draft";
    published_at: string;
    created_at: string;
    images: string[];
}

/* Resolve image filenames against bundled assets. */
const newsImages = import.meta.glob("../assets/images/news/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const imgSrc = (file: string): string | undefined =>
    newsImages[`../assets/images/news/${file}`];

/* Safari-safe: "2026-05-07 09:00:00" is not ISO — space must become "T". */
export const parseDate = (s: string) => new Date(s.replace(" ", "T"));

export const fullDateLabel = (d: Date) =>
    d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

/* Single publish rule — used by BOTH the list and detail pages so they can never disagree.
   Using the defensive variant: hidden only if explicitly draft. */
export const publishedPosts = (): NewsPost[] =>
    (newsData as NewsPost[])
        .filter((p) => p.status !== "draft")
        .sort(
            (a, b) =>
                parseDate(b.published_at).getTime() -
                parseDate(a.published_at).getTime(),
        );

export const findPostBySlug = (slug: string): NewsPost | undefined =>
    publishedPosts().find((p) => p.slug === slug);
