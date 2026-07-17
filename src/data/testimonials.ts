export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    rating: number; // 1–5
    quote: string;
    avatar?: string; // filename in src/assets/images/testimonials/
}

/* PLACEHOLDER CONTENT — replace with real, client-supplied testimonials before launch. */
export const TESTIMONIALS: Testimonial[] = [
    {
        id: "t1",
        name: "[Client Name]",
        role: "[Job Title]",
        company: "[Company Name]",
        rating: 5,
        quote: "[Awaiting real testimonial from client — placeholder text sized to approximate a two-to-three line quote about working with Veritas.]",
    },
    {
        id: "t2",
        name: "[Client Name]",
        role: "[Job Title]",
        company: "[Company Name]",
        rating: 5,
        quote: "[Awaiting real testimonial from client — placeholder text sized to approximate a two-to-three line quote about results delivered.]",
    },
    {
        id: "t3",
        name: "[Client Name]",
        role: "[Job Title]",
        company: "[Company Name]",
        rating: 5,
        quote: "[Awaiting real testimonial from client — placeholder text sized to approximate a two-to-three line quote about the partnership.]",
    },
];

/* Avatar resolver — same pattern as products/news */
const avatarImages = import.meta.glob("../assets/images/testimonials/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const avatarSrc = (file?: string): string | undefined =>
    file ? avatarImages[`../assets/images/testimonials/${file}`] : undefined;

export const initialsOf = (name: string): string =>
    name
        .replace(/[[\]]/g, "")
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
