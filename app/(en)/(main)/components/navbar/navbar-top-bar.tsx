"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "العربية", code: "ar" },
  { label: "Français", code: "fr" },
];

export function NavbarTopBar() {
  //
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  //
  return (
    <div className="flex mx-auto items-center justify-end gap-6 py-3 text-[20px] max-w-xl md:max-w-7xl md:mt-2 pr-2">
      <Button
        variant="ghost"
        size="sm"
        className="font-bold text-foreground h-auto p-0 hover:text-primary transition-colors text-base"
        asChild
      >
        <Link href="/login">Login</Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 gap-1 text-foreground font-medium hover:text-primary transition-colors text-base"
          >
            {selectedLang.label}
            <ChevronDown className="size-3.5 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-30 z-99">
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
    </div>
  );
}