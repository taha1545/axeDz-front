"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarTopBar } from "./navbar-top-bar";
import { NavbarMobileMenu } from "./mobile-menu";
import { NavbarNavLinks } from "./navbar-nav-links";
import { useNavbar } from "../../hooks/use-navbar";
import Image from "next/image";
import { useEffect, useRef } from "react";


export function Navbar() {
  //
  const { navLinks, isScrolled, isActive } = useNavbar();
  const headerRef = useRef<HTMLElement>(null);
  //
  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${headerRef.current.offsetHeight}px`
      );
    }
  }, []);

  return (
    //
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 bg-transparent transition-all duration-300 pointer-events-none"
    >
      <div className="pointer-events-auto ">
        <NavbarTopBar />
      </div>

      {/* Main Floating Pill */}
      <div className="w-full py-0 px-4 sm:px-6 lg:px-10 pointer-events-auto">
        <div
          className={cn(
            "max-w-xl md:max-w-7xl mx-auto flex items-center justify-between gap-6",
            "border border-foreground rounded-full pl-7 pr-2 py-1.5 bg-background/70 backdrop-blur-md",
            "transition-shadow duration-300",
            isScrolled ? "shadow-md " : "shadow-sm"
          )}
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="AxeDz Logo"
              width={32}
              height={32}
              className="rounded-full md:w-full md:h-full w-[80%] h-[80%] dark:invert"
            />
          </Link>

          {/* links */}
          <div className="hidden md:flex">
            <NavbarNavLinks links={navLinks} isActive={isActive} />
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2">
            <Button
              variant="ghost"
              className="rounded-full h-10 lg:h-14 px-4 lg:px-6 text-sm lg:text-base font-semibold border-2 border-foreground/60 text-foreground hover:bg-foreground/20 shadow-none whitespace-nowrap transition-all duration-200"
              asChild
            >
              <Link href="/dashboard">Start Building</Link>
            </Button>

            <Button
              className="rounded-full h-10 lg:h-14 px-5 lg:px-8 text-sm lg:text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-none whitespace-nowrap transition-all duration-200"
              asChild
            >
              <Link href="/docs">Explore API</Link>
            </Button>
          </div>

          {/* Mobile */}
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}