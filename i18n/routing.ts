// i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["en", "fr"],
    defaultLocale: "en",
    localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Create locale-aware Link, usePathname, useRouter, etc.
export const { Link, usePathname, useRouter, redirect, permanentRedirect } = createNavigation(routing);