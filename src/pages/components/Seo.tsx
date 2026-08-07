import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://veritasorganisation.com";
export const SITE_NAME = "Veritas Organisation";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/** Resolves a bundler-emitted asset path (e.g. "/assets/foo.hash.jpg") into an absolute URL for OG/Twitter cards. */
export const absoluteUrl = (src?: string): string =>
    src ? (src.startsWith("http") ? src : `${SITE_URL}${src}`) : DEFAULT_IMAGE;

interface SeoProps {
    title: string;
    description: string;
    /** Route path, e.g. "/products/energy-solutions". Used to build the canonical + og:url. */
    path: string;
    image?: string;
    type?: "website" | "article";
    noindex?: boolean;
}

export default function Seo({
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    type = "website",
    noindex = false,
}: SeoProps) {
    const url = `${SITE_URL}${path}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta
                name="robots"
                content={noindex ? "noindex, nofollow" : "index, follow"}
            />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
