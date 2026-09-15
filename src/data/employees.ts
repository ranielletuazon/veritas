import veritasLogo from "../assets/images/new-veritas-logo-new.png";

export interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    /** Filename in src/assets/images/team/ — omit to show the placeholder state. */
    photo?: string;
    /** Marks the top leadership row for slightly larger treatment. */
    featured?: boolean;
}

export const EMPLOYEES: Employee[] = [
    {
        id: "jerome",
        name: "Jerome",
        role: "Director, Admin and Operations",
        department: "Admin",
        photo: "jerome.jpg",
        featured: true,
    },

    {
        id: "cza",
        name: "Cza",
        role: "Financial Controller",
        department: "Admin",
        photo: "cza.jpg",
    },

    {
        id: "jen",
        name: "Jen",
        role: "CRM & Data Manager",
        department: "Admin",
        photo: "jen.jpg",
    },

    {
        id: "erin",
        name: "Erin",
        role: "HR & Compliance Manager",
        department: "Admin",
        photo: "erin.jpeg",
    },

    {
        id: "raejan",
        name: "Raejan",
        role: "Channel Sales Director, Copier Sales",
        department: "Copier/Printer",
        photo: "raejan.jpg",
    },

    {
        id: "copier-admin",
        name: "",
        role: "Administrative Manager - Copier Team",
        department: "Copier/Printer",
        photo: "veritas-logo",
    },
    {
        id: "joshua",
        name: "Joshua",
        role: "Channel Sales Director, Energy Sales",
        department: "Energy Sales",
        photo: "joshua.jpg",
        featured: true,
    },
    {
        id: "copier-admin",
        name: "",
        role: "Key Account Manager, Energy Sales",
        department: "Energy Sales",
        photo: "veritas-logo",
    },
];

/** Groups employees by department, preserving first-appearance order —
 * same pattern used for the News archive-by-month grouping. */
export const groupByDepartment = (): Map<string, Employee[]> =>
    EMPLOYEES.reduce<Map<string, Employee[]>>((map, employee) => {
        const group = map.get(employee.department);
        if (group) group.push(employee);
        else map.set(employee.department, [employee]);
        return map;
    }, new Map());

/** Resolve team photo filenames against bundled assets. */
const teamImages = import.meta.glob("../assets/images/team/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export const employeePhotoSrc = (file?: string): string | undefined => {
    if (!file) return undefined;

    if (file === "veritas-logo") {
        return veritasLogo;
    }

    return teamImages[`../assets/images/team/${file}`];
};

export const initialsOf = (name: string): string =>
    name
        .replace(/[\[\]\\]/g, "")
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
