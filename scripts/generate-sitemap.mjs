// Regenerates public/sitemap.xml from the same JSON data the site renders,
// so static and dynamic routes (products, careers, news) never drift.
// Runs automatically before `npm run build` (see package.json "prebuild").
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const readJson = (relPath) =>
    JSON.parse(readFileSync(path.join(rootDir, relPath), "utf-8"));

const SITE_URL = "https://veritasorganisation.com";
const today = new Date().toISOString().slice(0, 10);

const products = readJson("src/data/products.json");
const careers = readJson("src/data/careers.json");
const news = readJson("src/data/news.json");

/** Some news entries share a slug — only the first is reachable at its URL, so skip repeats. */
const seenNewsSlugs = new Set();
const publishedNews = news.filter((n) => {
    if (n.status === "draft") return false;
    if (seenNewsSlugs.has(n.slug)) {
        console.warn(
            `[sitemap] Skipping duplicate news slug "${n.slug}" (only the first entry is reachable at /news/${n.slug}) — give it a unique slug.`,
        );
        return false;
    }
    seenNewsSlugs.add(n.slug);
    return true;
});

const staticUrls = [
    { loc: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
    {
        loc: "/products",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: today,
    },
    {
        loc: "/about-us",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
    },
    { loc: "/careers", priority: "0.8", changefreq: "weekly", lastmod: today },
    { loc: "/news", priority: "0.7", changefreq: "weekly", lastmod: today },
    {
        loc: "/contact-us",
        priority: "0.6",
        changefreq: "yearly",
        lastmod: today,
    },
    {
        loc: "/privacy",
        priority: "0.3",
        changefreq: "yearly",
        lastmod: today,
    },
];

const productUrls = products.map((p) => ({
    loc: `/products/${p.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: today,
}));

const careerUrls = careers.map((c) => ({
    loc: `/careers/${c.slug}`,
    priority: "0.6",
    changefreq: "weekly",
    lastmod: today,
}));

const newsUrls = publishedNews.map((n) => ({
    loc: `/news/${n.slug}`,
    priority: "0.5",
    changefreq: "monthly",
    lastmod: (n.published_at ?? today).slice(0, 10),
}));

const urls = [...staticUrls, ...productUrls, ...careerUrls, ...newsUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (u) =>
            `    <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join("\n")}
</urlset>
`;

writeFileSync(path.join(rootDir, "public/sitemap.xml"), xml);
console.log(`[sitemap] Wrote ${urls.length} URLs to public/sitemap.xml`);
