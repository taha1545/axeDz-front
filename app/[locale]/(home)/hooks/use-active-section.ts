"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {

            const scrollPosition = window.scrollY + 200;

            // 
            if (window.scrollY < 100) {
                setActiveSection("about");
                return;
            }
            // 
            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50;

            if (isAtBottom) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
                return;
            }
            // 
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(id);
                        return;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sectionIds]);

    return activeSection;
}