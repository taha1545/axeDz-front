"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Français", code: "fr" },
];

export function NavbarTopBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLang =
    LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log({
      locale,
      pathname,
    });
  }, []);

  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <div className="w-full border-b border-border/40 bg-background/40 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 py-2 px-4 sm:px-6 lg:px-8 text-sm">
        <a
          href="/docs"
          className="text-foreground hover:text-foreground font-bold transition-colors text-sm py-1.5"
        >
          Docs
        </a>

        <span className="h-4 w-px bg-border/40" />

        <a
          href="/login"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm py-1.5"
        >
          Login
        </a>

        <span className="h-4 w-px bg-border/40" />

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

          <DropdownMenuContent align="end" className="min-w-30 z-50">
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

        <span className="h-4 w-px bg-border/40" />

        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
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