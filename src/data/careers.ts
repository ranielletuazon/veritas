import careersData from "./careers.json";

export interface Career {
    id: number;
    slug: string;
    title: string;
    type: string;
    location: string;
    team: string;
    summary: string;
    duties: string[];
    requirements: string[];
    perks: string[];
}

export const CAREERS: Career[] = careersData as Career[];

export const findCareerBySlug = (slug: string): Career | undefined =>
    CAREERS.find((c) => c.slug === slug);
