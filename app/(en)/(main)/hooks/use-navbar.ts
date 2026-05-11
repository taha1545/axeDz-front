"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Use Cases", href: "/use-cases", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export function useNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    const link = NAV_LINKS.find((l) => l.href === href);
    return link?.active || pathname === href || pathname.startsWith(href + "/");
  };

  return { navLinks: NAV_LINKS, isScrolled, isActive };
}
