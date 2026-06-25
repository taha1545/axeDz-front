"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";


import { NormalButton, InverseButton } from "@/components/custom-button";
import { NavbarNavLinks } from "./navbar-nav-links";
import { useNavbar } from "../../hooks/use-navbar";
import { Logo } from "@/components/logo";

export function NavbarMobileMenu() {
  //
  const [open, setOpen] = useState(false);
  const { navLinks, isActive } = useNavbar();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  //
  const t = useTranslations("home.navbar");
  //
  useEffect(() => {
    const mount = () => {
      setMounted(true);
    }
    mount();
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
      <SheetContent className="flex flex-col z-100 w-[80%] max-w-2xl px-6 pt-8 pb-6 bg-background border-l border-border">
        <DialogTitle className="sr-only">{t("menuTitle")}</DialogTitle>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 my-5 mb-6">
          <Logo size="lg" withLink={false} priority />
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
                {t("appearance")}
              </span>

              <NormalButton
                styleType="soft"
                size="sm"
                className="gap-2 h-8 rounded-lg text-foreground hover:bg-muted font-semibold transition"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                iconStart={
                  resolvedTheme === "dark" ? (
                    <Sun className="size-4 text-primary" />
                  ) : (
                    <Moon className="size-4 text-primary" />
                  )
                }
                text={resolvedTheme === "dark" ? t("light") : t("dark")}
              />
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5">
            <NormalButton
              text={t("startBuilding")}
              asChild
              className="h-11 w-full rounded-full text-sm font-semibold border-2 border-foreground/60 text-foreground hover:bg-foreground/20 shadow-none transition"
            >
              <Link href="/dashboard" onClick={() => setOpen(false)} />
            </NormalButton>

            <InverseButton
              text={t("readDocs")}
              asChild
              className="h-11 w-full rounded-full text-sm font-semibold shadow-none transition"
            >
              <Link href="/docs" onClick={() => setOpen(false)} />
            </InverseButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}