import type { Metadata } from "next";

export type Locale = "en" | "fr";
export const LOCALES: Locale[] = ["en", "fr"];
export const BASE_URL = "https://axedz.com";

export const DEFAULT_TITLE = "AxeDz";

export const DEFAULT_DESCRIPTION = "AxeDz is Algeria's Cloud Communication Platform (CPaaS) for developers and businesses. Send SMS, emails, manage cloud services, and monitor wallet usage through one unified API.";

export const DEFAULT_KEYWORDS = [
    "CPaaS",
    "SMS API",
    "Email API",
    "model tokens",
    "Algeria",
    "Cloud Communication",
    "Developer Platform",
    "AxeDz",
    "Node SDK",
    "Python SDK",
    "Local Billing",
];
export const DEFAULT_IMAGE = "/icon.svg";

export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

export const PAGE_METADATA = {
    "/": {
        title: "AxeDz",
        description:
            "AxeDz helps Algerian developers send SMS, email, and store files with one API and a DZD wallet.",
        keywords: ["AxeDz", "Algeria", "CPaaS", "SMS", "Email", "Cloud Storage", "DZD"],
        path: "/",
    },
    "/pricing": {
        title: "Pricing",
        description:
            "Compare AxeDz plans and calculate local Algerian DZD pricing for SMS, email, storage, and AI tokens.",
        keywords: ["AxeDz pricing", "DZD pricing", "SMS billing", "Email billing", "Cloud storage pricing"],
        path: "/pricing",
    },
    "/dashboard": {
        title: "Dashboard",
        description:
            "View your wallet balance, usage history, API keys, and system analytics from the AxeDz dashboard.",
        keywords: ["AxeDz dashboard", "wallet balance", "usage analytics", "API keys"],
        path: "/dashboard",
    },
    "/dashboard/settings": {
        title: "Project Settings",
        description:
            "Manage your project details, rename or delete projects, and configure project-level preferences for your AxeDz workspace.",
        keywords: ["AxeDz project settings", "project management", "rename project", "delete project"],
        path: "/dashboard/settings",
    },
    "/setting": {
        title: "Settings ",
        description:
            "Manage your user profile, security settings, and account preferences for your AxeDz workspace.",
        keywords: ["AxeDz settings", "security settings", "profile management", "account preferences"],
        path: "/setting",
    },
    "/login": {
        title: "Login",
        description:
            "Sign in to your AxeDz account to manage APIs, billing, and cloud services from one secure dashboard.",
        keywords: ["AxeDz login", "developer portal", "secure login", "CPaaS login"],
        path: "/login",
    },
    "/signup": {
        title: "Sign Up ",
        description:
            "Create a new AxeDz account and get started with SMS, email, and cloud storage APIs in Algeria.",
        keywords: ["AxeDz signup", "create account", "CPaaS registration", "developer onboarding"],
        path: "/signup",
    },
    "/forget-password": {
        title: "Forgot Password ",
        description:
            "Request a reset code to recover access to your AxeDz account and keep your communications secure.",
        keywords: ["AxeDz forgot password", "password recovery", "reset code", "account recovery"],
        path: "/forget-password",
    },
    "/reset-password": {
        title: "Reset Password ",
        description:
            "Reset your AxeDz password using the code sent to your email and regain access to your account.",
        keywords: ["AxeDz reset password", "password reset", "account security", "recover account"],
        path: "/reset-password",
    },
    "/verify-phone": {
        title: "Verify Phone ",
        description:
            "Confirm your phone number for stronger account protection and reliable SMS delivery with AxeDz.",
        keywords: ["AxeDz verify phone", "SMS verification", "2FA", "account verification"],
        path: "/verify-phone",
    },
    "/help": {
        title: "Help Center",
        description:
            "Find answers, troubleshooting guides, and support resources for AxeDz SMS, email, and billing APIs.",
        keywords: ["AxeDz help", "support center", "FAQs", "API help"],
        path: "/help",
    },
    "/docs": {
        title: "Docs ",
        description:
            "Explore AxeDz developer docs, API reference, SDK examples, and onboarding guides for CPaaS integration.",
        keywords: ["AxeDz docs", "API reference", "developer guide", "SDK docs"],
        path: "/docs",
    },
    "/terms": {
        title: "Terms of Service",
        description: "Terms of Service for AxeDz messaging platform.",
        keywords: ["terms", "legal", "AxeDz"],
        path: "/terms",
    },
    "/privacy": {
        title: "Privacy Policy",
        description: "Privacy Policy for AxeDz.",
        keywords: ["privacy", "legal", "AxeDz"],
        path: "/privacy",
    },
} as const;

export const SITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DEFAULT_TITLE,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
        "@type": "Organization",
        name: DEFAULT_TITLE,
        logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}${DEFAULT_IMAGE}`,
        },
    },
    potentialAction: [
        {
            "@type": "SearchAction",
            target: `${BASE_URL}/en/docs?search={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    ],
};

export const ORGANIZATION_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: DEFAULT_TITLE,
    url: BASE_URL,
    logo: `${BASE_URL}${DEFAULT_IMAGE}`,
    sameAs: [
        "https://www.facebook.com/axedz",
        "https://twitter.com/axedz",
        "https://www.linkedin.com/company/axedz",
    ],
    contactPoint: [
        {
            "@type": "ContactPoint",
            telephone: "+213673442786",
            contactType: "support@axedz.com",
            areaServed: "DZ",
            availableLanguage: ["English", "French"],
        },
    ],
};

export const LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    telephone: "+213673442786",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Algiers Business Hub",
        addressLocality: "Algiers",
        addressCountry: "DZ",
    },
    openingHours: ["Mo-Fr 09:00-18:00"],
    image: `${BASE_URL}${DEFAULT_IMAGE}`,
};

export const PRODUCT_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AxeDz CPaaS Platform",
    description: DEFAULT_DESCRIPTION,
    brand: {
        "@type": "Organization",
        name: DEFAULT_TITLE,
    },
    url: BASE_URL,
    image: [`${BASE_URL}${DEFAULT_IMAGE}`],
    offers: {
        "@type": "Offer",
        priceCurrency: "DZD",
        price: "0.00",
        availability: "https://schema.org/InStock",
        url: BASE_URL,
    },
};

export const SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    provider: {
        "@type": "Organization",
        name: DEFAULT_TITLE,
        url: BASE_URL,
    },
    areaServed: "DZ",
    serviceType: [
        "SMS API",
        "Email API",
        "Cloud Storage",
        "Local Billing",
        "Developer Dashboard",
        "AI Token Usage",
    ],
};

export const BREADCRUMB_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Docs",
            item: `${BASE_URL}/docs`,
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "Help",
            item: `${BASE_URL}/help`,
        },
    ],
};

export function buildCanonical(locale: Locale, pathname: string): string {
    const route = pathname === "/" ? "" : pathname;
    return `${BASE_URL}/${locale}${route}`;
}

export function buildAlternates(pathname: string): Metadata["alternates"] {
    const route = pathname === "/" ? "" : pathname;
    return {
        canonical: `${BASE_URL}${route}`,
        languages: {
            en: `${BASE_URL}/en${route}`,
            fr: `${BASE_URL}/fr${route}`,
        },
    };
}

export function getPageMetadata(pathname: string, locale: Locale): Metadata {
    const page = PAGE_METADATA[pathname as keyof typeof PAGE_METADATA] ?? PAGE_METADATA["/"];
    const canonical = buildCanonical(locale, page.path);

    return {
        metadataBase: new URL(BASE_URL),
        title: page.title,
        description: page.description,
        keywords: [...page.keywords],
        authors: [{ name: DEFAULT_TITLE }],
        creator: DEFAULT_TITLE,
        publisher: DEFAULT_TITLE,
        openGraph: {
            title: page.title,
            description: page.description,
            url: canonical,
            siteName: DEFAULT_TITLE,
            locale: locale === "fr" ? "fr_FR" : "en_US",
            type: "website",
            images: [
                {
                    url: DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: DEFAULT_TITLE,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description: page.description,
            images: [DEFAULT_IMAGE],
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical,
            languages: {
                en: buildCanonical("en", page.path),
                fr: buildCanonical("fr", page.path),
            },
        },
        verification: GOOGLE_SITE_VERIFICATION
            ? { google: GOOGLE_SITE_VERIFICATION }
            : undefined,
        manifest: "/manifest.json",
        icons: {
            icon: "/icon.svg",
            shortcut: "/icon.ico",
            apple: "/icon.svg",
        },
    };
}

export const defaultMetadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: DEFAULT_TITLE,
        template: "%s | AxeDz",
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: DEFAULT_TITLE }],
    creator: DEFAULT_TITLE,
    publisher: DEFAULT_TITLE,
    openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: BASE_URL,
        siteName: DEFAULT_TITLE,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: DEFAULT_IMAGE,
                width: 1200,
                height: 630,
                alt: DEFAULT_TITLE,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: [DEFAULT_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: BASE_URL,
        languages: {
            en: `${BASE_URL}/en`,
            fr: `${BASE_URL}/fr`,
            ar: `${BASE_URL}/ar`,
        },
    },
    verification: GOOGLE_SITE_VERIFICATION
        ? { google: GOOGLE_SITE_VERIFICATION }
        : undefined,
    manifest: "/manifest.json",
    icons: {
        icon: "/icon.svg",
        shortcut: "/icon.ico",
        apple: "/icon.svg",
    },
};

export const ROOT_SCHEMA = [
    ORGANIZATION_SCHEMA,
    LOCAL_BUSINESS_SCHEMA,
    SITE_SCHEMA,
    PRODUCT_SCHEMA,
    SERVICE_SCHEMA,
    BREADCRUMB_SCHEMA,
];

export function getFAQSchema(
    faqItems: Array<{ question: string; answer: string }>,
    pageUrl: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
        url: pageUrl,
    };
}