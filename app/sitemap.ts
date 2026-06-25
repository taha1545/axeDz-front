import type { MetadataRoute } from "next";
import { BASE_URL, LOCALES, PAGE_METADATA } from "@/lib/metadata";

const staticRoutes = Object.values(PAGE_METADATA).map((page) => page.path);

export default function sitemap(): MetadataRoute.Sitemap {
    //
    const now = new Date();

    return LOCALES.flatMap((locale) =>
        staticRoutes.map((path) => ({
            url: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
            lastModified: now,
        }))
    );
}