"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";


import { InverseButton, NormalButton } from "@/components/custom-button";

import { Logo } from "@/components/logo";
import { NavbarTopBar } from "./navbar-top-bar";
import { NavbarMobileMenu } from "./mobile-menu";
import { NavbarNavLinks } from "./navbar-nav-links";

import { useNavbar } from "../../hooks/use-navbar";


export function Navbar() {
  //
  const { navLinks, isScrolled, isActive } = useNavbar();
  const t = useTranslations("home.navbar");
  //
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
      id="Navbar"
      className="w-full sticky top-0 z-50 bg-transparent transition-all duration-300 pointer-events-none"
    >
      {/* top navbar */}
      <NavbarTopBar />

      {/* Main Floating Pill */}
      <div className="w-full  py-0 px-2 sm:px-6 lg:px-10 pointer-events-auto ">
        <div
          className={cn(
            " bg-card/50 max-w-xl md:max-w-7xl mx-auto flex items-center justify-between gap-6 overflow-hidden",
            "border  border-foreground rounded-full px-2.5  md:pl-7 md:pr-2 py-1.5  backdrop-blur-md",
            "transition-shadow duration-300",
            isScrolled ? "shadow-md " : "shadow-sm"
          )}
        >

          {/* Logo */}
          <div className="hidden lg:flex">
            <Logo size="lg" priority withLink={true} />
          </div>
          {/* Logo */}
          <div className="flex lg:hidden">
            <Logo size="sm" priority withLink={true} />
          </div>


          {/* navlinks */}
          <div className="hidden md:flex">
            <NavbarNavLinks links={navLinks} isActive={isActive} />
          </div>



          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <NormalButton
              text={t("exploreApi")}
              asChild
              className={cn("rounded-full h-10 lg:h-14  md:px-2 lg:px-5 xl:px-7 md:text-sm lg:text-base",
                "border-foreground/50 shadow-none border  whitespace-nowrap ",
                "transition-all duration-200",
                isScrolled ? "bg-card/50  shadow-md hover:bg-transparent" : " text-foreground  hover:bg-foreground/20"
              )}
            >
              <Link href="/docs" />
            </NormalButton>

            <InverseButton
              text={t("startBuilding")}
              asChild
              className="rounded-full  h-10 lg:h-14 md:px-2  lg:px-4 xl:px-7 md:text-sm lg:text-base shadow-none whitespace-nowrap transition-all duration-200"
            >
              <Link href="/dashboard" />
            </InverseButton>
          </div>


          {/* Mobile */}
          <NavbarMobileMenu />

        </div>
      </div>
    </header>
  );
}