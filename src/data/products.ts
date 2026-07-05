export interface ProductCategory {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    benefitsLabel: string;
    benefits: string[];
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
    },
];
