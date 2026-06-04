"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "./use-active-section";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(["about", "services", "use-cases", "pricing", "contact"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return href === `#${activeSection}`;
  };

  return { navLinks: NAV_LINKS, isScrolled, isActive };
}
