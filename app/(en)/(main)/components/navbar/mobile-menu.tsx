"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { NavbarNavLinks } from "./navbar-nav-links";
import { useNavbar } from "../../hooks/use-navbar";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const { navLinks, isActive } = useNavbar();

  return (
    <Sheet open={open} onOpenChange={setOpen}>

      {/* Trigger */}
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-muted transition"
          aria-label="Open menu"
        >
          <Image src="/menu.svg" alt="Menu" width={24} height={24} />
        </button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent
        className="flex flex-col z-99 w-[85%] max-w-sm px-6 pt-8 pb-6 bg-background border-l"
      >

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/logo.svg"
            alt="AxeDz Logo"
            width={45}
            height={45}
            className="rounded-full"
          />

          <span className="text-2xl font-bold tracking-tight">
            AxeDz
          </span>
        </div>

        {/* Nav */}
        <NavbarNavLinks
          links={navLinks}
          isActive={isActive}
          onLinkClick={() => setOpen(false)}
          orientation="vertical"
        />

        {/* CTA */}
        <div className="mt-auto pt-6 border-t border-border flex flex-col gap-3">

          <Button
            variant="outline"
            className="h-12 w-full rounded-full text-base font-semibold border-2 shadow-none"
            asChild
          >
            <Link href="/start" onClick={() => setOpen(false)}>
              Start Building
            </Link>
          </Button>

          <Button
            className="h-12 w-full rounded-full text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-none"
            asChild
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </Button>

        </div>

      </SheetContent>
    </Sheet>
  );
}