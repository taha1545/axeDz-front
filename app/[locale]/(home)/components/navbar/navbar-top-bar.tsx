"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Link from "next/link";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sun, Moon } from "lucide-react";


const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Français", code: "fr" },
];

export function NavbarTopBar() {
  //
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("home.navbar");
  //
  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];
  //
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  //
  useEffect(() => {
    function mount() {
      setMounted(true);
    }
    mount();
  }, []);
  //
  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <div className="w-full  bg-background/80  transition-colors duration-300 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-2 md:gap-4 py-1.5 px-4 sm:px-6 lg:px-8 text-sm relative">
        <Link
          href="/docs"
          className="text-foreground hover:text-foreground font-bold transition-colors text-sm py-1.5"
        >
          Docs
        </Link>

        <span className="h-4 w-px bg-card dark:bg-border/40" />

        <span className="h-4 w-px bg-card dark:bg-border/40" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1.5 px-0 gap-1 text-muted-foreground font-medium hover:text-foreground hover:bg-transparent transition-colors text-sm"
            >
              {currentLang.label}
              <ChevronDown className="size-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-30 bg-card space-y-1 border-primary/20 border py-2 z-50">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="h-4 w-px bg-card dark:bg-border/40" />

        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full  text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          aria-label="Toggle theme"
        >
          {mounted ? (
            resolvedTheme === "dark" ? (
              <Sun className="size-4 animate-in fade-in zoom-in duration-300" />
            ) : (
              <Moon className="size-4 animate-in fade-in zoom-in duration-300" />
            )
          ) : (
            <div className="size-4 rounded-full bg-muted-foreground/20 animate-pulse" />
          )}
        </Button>
      </div>
    </div>
  );
}
