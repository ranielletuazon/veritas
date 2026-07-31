export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    rating: number; // 1–5
    quote: string;
    avatar?: string; // filename in src/assets/images/testimonials/
    photo?: string; // review/product photo, filename in src/assets/images/testimonials/
}

/* PLACEHOLDER CONTENT — replace with real, client-supplied testimonials before launch. */
export const TESTIMONIALS: Testimonial[] = [
    {
        id: "t1",
        name: "Daryil Ian Rajoo ",
        role: "Director - Genco Energy Pte Ltd",
        company: "Genco Energy Pte Ltd",
        rating: 5,
        quote: "Veritas Organisation has been an absolute game-changer since becoming a Business Partner of Genco Energy. From the very beginning, Veritas entered the partnership with a clear mission: to capture Singapore’s highly competitive and diverse energy market. In a remarkably short period, the team has exceeded every expectation.",
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

/* Image resolver — same pattern as products/news. Serves both avatar and photo. */
const testimonialImages = import.meta.glob("../assets/images/testimonials/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const avatarSrc = (file?: string): string | undefined =>
    file
        ? testimonialImages[`../assets/images/testimonials/${file}`]
        : undefined;

export const photoSrc = (file?: string): string | undefined =>
    file
        ? testimonialImages[`../assets/images/testimonials/${file}`]
        : undefined;

export const initialsOf = (name: string): string =>
    name
        .replace(/[[\]]/g, "")
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
