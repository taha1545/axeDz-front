"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useActiveSection } from "./use-active-section";

export type NavLink = {
    label: string;
    href: string;
};

export function useNavbar() {
    const t = useTranslations("home.navbar");
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSection = useActiveSection(["about", "services", "use-cases", "pricing", "contact"]);

    const navLinks: NavLink[] = [
        { label: t("about"), href: "#about" },
        { label: t("services"), href: "#services" },
        { label: t("useCases"), href: "#use-cases" },
        { label: t("pricing"), href: "#pricing" },
        { label: t("contact"), href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => href === `#${activeSection}`;

    return { navLinks, isScrolled, isActive };
}