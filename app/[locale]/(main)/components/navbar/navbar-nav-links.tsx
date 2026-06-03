"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavLink } from "../../hooks/use-navbar";
import { motion } from "framer-motion";

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
          ? "items-center justify-center gap-3 lg:gap-8 flex-nowrap"
          : "flex-col gap-4"
      )}
    >
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => {
              // Handle smooth scrolling
              if (link.href.startsWith("#")) {
                const target = document.querySelector(link.href);
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }
              if (onLinkClick) onLinkClick();
            }}
            className={cn(
              "relative whitespace-nowrap text-sm md:text-base lg:text-[17px] font-semibold transition-colors duration-200 shrink-0 py-1.5",
              orientation === "vertical" && "px-4 py-2.5 rounded-lg text-lg",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
              orientation === "vertical" && active && "bg-primary/10 text-primary"
            )}
          >
            <span className="relative z-10">{link.label}</span>
            {orientation === "horizontal" && active && (
              <motion.span
                layoutId="activeNavTab"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}