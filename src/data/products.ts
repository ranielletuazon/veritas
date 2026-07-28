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

export interface ProductSubgroup {
    id: string;
    name: string;
    items: ProductItem[];
}

export interface ProductGroup {
    id: string;
    name: string;
    items?: ProductItem[];
    subgroups?: ProductSubgroup[];
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
    items?: ProductItem[];
    groups?: ProductGroup[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] =
    productsData as ProductCategory[];

export const findCategoryBySlug = (slug: string): ProductCategory | undefined =>
    PRODUCT_CATEGORIES.find((c) => c.slug === slug);

/** Total leaf-item count regardless of flat vs. nested structure — used by the Products grid. */
export const countItems = (cat: ProductCategory): number => {
    if (cat.items) return cat.items.length;
    if (cat.groups) {
        return cat.groups.reduce((total, g) => {
            const groupCount = g.items?.length ?? 0;
            const subCount =
                g.subgroups?.reduce((s, sg) => s + sg.items.length, 0) ?? 0;
            return total + groupCount + subCount;
        }, 0);
    }
    return 0;
};

const productImages = import.meta.glob("../assets/images/products/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const productImgSrc = (file?: string): string | undefined =>
    file ? productImages[`../assets/images/products/${file}`] : undefined;
