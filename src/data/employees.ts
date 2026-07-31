export interface Employee {
    id: string;
    name: string;
    role: string;
    department?: string;
    /** Filename in src/assets/images/team/ — omit to show the placeholder state. */
    photo?: string;
    /** Marks the top leadership row for slightly larger treatment. */
    featured?: boolean;
}

/* PLACEHOLDER CONTENT (except entry 1) — replace with the real employee roster before launch. */
export const EMPLOYEES: Employee[] = [
    {
        id: "gerald-lee",
        name: "Gerald Lee",
        role: "Founder & CEO",
        photo: "boss.jpeg",
        featured: true,
    },
    {
        id: "employee-2",
        name: "[Employee Name]",
        role: "[Role Title]",
        department: "[Department]",
    },
    {
        id: "employee-3",
        name: "[Employee Name]",
        role: "[Role Title]",
        department: "[Department]",
    },
    {
        id: "employee-4",
        name: "[Employee Name]",
        role: "[Role Title]",
        department: "[Department]",
    },
    {
        id: "employee-5",
        name: "[Employee Name]",
        role: "[Role Title]",
        department: "[Department]",
    },
    {
        id: "employee-6",
        name: "[Employee Name]",
        role: "[Role Title]",
        department: "[Department]",
    },
];

/* Resolve team photo filenames against bundled assets. */
const teamImages = import.meta.glob("../assets/images/team/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const employeePhotoSrc = (file?: string): string | undefined =>
    file ? teamImages[`../assets/images/team/${file}`] : undefined;

export const initialsOf = (name: string): string =>
    name
        .replace(/[[\]]/g, "")
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
