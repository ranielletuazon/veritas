import productsData from "./products.json";

export interface ProductItem {
    id: string;
    name: string;
    badge?: string;
    summary: string;
    /** Filename in src/assets/images/products/ — omit for non-unit (service) items. */
    image?: string;
    specs: string[];
}

export interface ProductCategory {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    category: string;
    featured_image: string;
    description: string;
    overview: string;
    benefitsLabel: string;
    benefits: string[];
    itemsLabel: string;
    items: ProductItem[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] =
    productsData as ProductCategory[];

export const findCategoryBySlug = (slug: string): ProductCategory | undefined =>
    PRODUCT_CATEGORIES.find((c) => c.slug === slug);

const productImages = import.meta.glob("../assets/images/products/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const productImgSrc = (file?: string): string | undefined =>
    file ? productImages[`../assets/images/products/${file}`] : undefined;
