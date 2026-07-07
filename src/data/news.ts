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
