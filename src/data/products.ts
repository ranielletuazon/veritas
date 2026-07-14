export interface ProductCategory {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    benefitsLabel: string;
    benefits: string[];
    category: string;
    featured_image: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        id: "electricity",
        slug: "electricity",
        name: "Electricity Solutions",
        tagline: "Energy",
        description:
            "Competitive electricity plans for homes and businesses through our trusted energy partners.",
        benefitsLabel: "Benefits",
        benefits: [
            "Cost savings",
            "Reliable providers",
            "Hassle-free switching",
            "Personalized recommendations",
        ],
        category: "Electricity",
        featured_image: "electricity.png",
    },
    {
        id: "printer",
        slug: "printer-solutions",
        name: "Printer Solutions",
        tagline: "Office Equipment",
        description:
            "Professional printing, managed print services, and equipment support via trusted printer partners.",
        benefitsLabel: "Benefits",
        benefits: [
            "Business-grade printers",
            "Cost-efficient solutions",
            "Managed print services",
            "Ongoing technical support",
        ],
        category: "Printer",
        featured_image: "printer.png",
    },
    {
        id: "residential",
        slug: "residential-services",
        name: "Residential Services",
        tagline: "Home",
        description:
            "Essential home services that improve everyday convenience, efficiency, and quality of life.",
        benefitsLabel: "Benefits",
        benefits: [
            "Trusted service providers",
            "Professional consultation",
            "Reliable customer support",
            "Tailored solutions",
        ],
        category: "Residential",
        featured_image: "residential.png",
    },
    {
        id: "business-dev",
        slug: "business-development",
        name: "Business Development & Lead Generation",
        tagline: "Growth",
        description:
            "Targeted lead generation and customer acquisition campaigns that expand your customer base.",
        benefitsLabel: "Services Include",
        benefits: [
            "Lead Generation",
            "Sales Outsourcing",
            "Customer Acquisition",
            "Appointment Setting",
            "Market Expansion",
            "Revenue Growth Strategies",
        ],
        category: "Business",
        featured_image: "business.png",
    },
];

/* Resolve product image filenames against bundled assets.
   Folder assumed: src/assets/images/products/ — adjust glob path if different. */
const productImages = import.meta.glob("../assets/images/products/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const productImgSrc = (file: string): string | undefined =>
    productImages[`../assets/images/products/${file}`];
