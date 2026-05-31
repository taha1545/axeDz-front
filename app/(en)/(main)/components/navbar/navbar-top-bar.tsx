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
import Link from "next/link";
import { useTheme } from "next-themes";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "العربية", code: "ar" },
  { label: "Français", code: "fr" },
];

export function NavbarTopBar() {
  //
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  return (
    <div className="w-full border-b border-border/40 bg-background/40 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 py-2 px-4 sm:px-6 lg:px-8 text-sm">
        {/* Docs Link */}
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm py-1.5"
        >
          Docs
        </Link>

        {/* Separator */}
        <span className="h-4 w-px bg-border/40" />

        {/* Login Link */}
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm py-1.5"
        >
          Login
        </Link>

        {/* Separator */}
        <span className="h-4 w-px bg-border/40" />

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1.5 px-0 gap-1 text-muted-foreground font-medium hover:text-foreground hover:bg-transparent transition-colors text-sm"
            >
              {selectedLang.label}
              <ChevronDown className="size-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-30 z-100">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
                className="cursor-pointer"
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Separator */}
        <span className="h-4 w-px bg-border/40" />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {mounted ? (
            currentTheme === "dark" ? (
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