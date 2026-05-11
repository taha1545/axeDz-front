"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavLink } from "../../hooks/use-navbar";

type NavbarNavLinksProps = {
  links: NavLink[];
  isActive: (href: string) => boolean;
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
};

export function NavbarNavLinks({
  links,
  isActive,
  onLinkClick,
  orientation = "horizontal",
}: NavbarNavLinksProps) {
  return (
    <nav
      className={cn(
        "flex w-full",
        orientation === "horizontal"
          ? "items-center justify-center gap-auto  md:gap-6 lg:gap-10 flex-nowrap "
          : "flex-col gap-5"
      )}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            `
            whitespace-nowrap
            text-sm
            md:text-base
            font-semibold
            transition-all
            duration-150
            shrink-0
            `,
            isActive(link.href)
              ? "text-primary underline underline-offset-4"
              : "text-foreground/90 hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}