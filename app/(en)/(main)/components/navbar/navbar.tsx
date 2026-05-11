"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarTopBar } from "./navbar-top-bar";
import { NavbarMobileMenu } from "./mobile-menu";
import { NavbarNavLinks } from "./navbar-nav-links";
import { useNavbar } from "../../hooks/use-navbar";
import Image from "next/image";

export function Navbar() {
  const { navLinks, isScrolled, isActive } = useNavbar();

  return (
    <header className="w-full px-1 sticky top-0 z-50 bg-background pointer-events-auto">

      <NavbarTopBar />

      {/* Main */}
      <div
        className={cn(
          "max-w-xl md:max-w-7xl mx-auto flex items-center justify-between gap-6 ",
          "border border-foreground rounded-full pl-7 pr-2 py-2 bg-background",
          "transition-shadow duration-300",
          isScrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="AxeDz Logo" width={32} height={32} className="rounded-full  md:w-full md:h-full w-[80%] h-[80%]" />
        </Link>

        {/* links */}
        <div className="hidden md:flex ">
          <NavbarNavLinks links={navLinks} isActive={isActive} />
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 lg:gap-2">
          <Button
            variant="ghost"
            className="rounded-full h-10 lg:h-14 px-4 lg:px-6 text-sm lg:text-base font-semibold border-2 border-foreground/60 text-foreground hover:bg-foreground/20 shadow-none whitespace-nowrap"
            asChild
          >
            <Link href="/start">Start Building</Link>
          </Button>

          <Button
            className="rounded-full h-10 lg:h-14 px-5 lg:px-8 text-sm lg:text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-none whitespace-nowrap"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile */}
        <NavbarMobileMenu />

      </div>
    </header>
  );
}