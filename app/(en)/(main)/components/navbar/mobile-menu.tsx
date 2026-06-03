"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { NavbarNavLinks } from "./navbar-nav-links";
import { useNavbar } from "../../hooks/use-navbar";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const { navLinks, isActive } = useNavbar();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-muted text-foreground transition"
          aria-label="Open menu"
        >
          <Menu className="size-6 text-foreground" />
        </button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent
        className="flex flex-col z-[100] w-[85%] max-w-sm px-6 pt-8 pb-6 bg-background border-l border-border"
      >
        <DialogTitle className="sr-only">
          Navigation Menu
        </DialogTitle>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8 dark:invert">
          <Image
            src="/logo.svg"
            alt="AxeDz Logo"
            width={75}
            height={50}
            className="rounded-full"
          />
        </div>

        {/* Nav */}
        <NavbarNavLinks
          links={navLinks}
          isActive={isActive}
          onLinkClick={() => setOpen(false)}
          orientation="vertical"
        />

        {/* Theme Settings & Actions */}
        <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
          {mounted && (
            <div className="flex items-center justify-between px-3 py-2 bg-muted/40 rounded-xl">
              <span className="text-sm font-medium text-muted-foreground">
                Appearance
              </span>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 h-8 rounded-lg text-foreground hover:bg-muted font-semibold transition"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                {resolvedTheme === "dark" ? (
                  <>
                    <Sun className="size-4 text-primary" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="size-4 text-primary" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5">
            <Button
              variant="outline"
              className="h-11 w-full rounded-full text-sm font-semibold border border-border shadow-none hover:bg-muted transition"
              asChild
            >
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Start Building
              </Link>
            </Button>

            <Button
              className="h-11 w-full rounded-full text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition shadow-none"
              asChild
            >
              <Link href="/docs" onClick={() => setOpen(false)}>
                Read Docs
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}