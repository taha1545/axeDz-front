"use client";

import { useEffect, useState, useRef } from "react";

interface RotatingWordsProps {
    words: string[];
    holdDuration?: number;
    transitionDuration?: number;
    className?: string;
}

export function RotatingWords({
    words,
    holdDuration = 2000,
    transitionDuration = 600,
    className = "",
}: RotatingWordsProps) {
    //
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState<number | null>(null);
    const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

    useEffect(() => {
        if (words.length <= 1) return;

        const scheduleNext = () => {
            timeoutRef.current = setTimeout(() => {
                const next = (currentIndex + 1) % words.length;
                setNextIndex(next);
                setPhase("out");
            }, holdDuration);
        };

        scheduleNext();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, words.length, holdDuration]);

    useEffect(() => {
        if (phase === "out") {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex(nextIndex!);
                setNextIndex(null);
                setPhase("in");
            }, transitionDuration);
        } else if (phase === "in") {
            timeoutRef.current = setTimeout(() => {
                setPhase("idle");
            }, transitionDuration);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [phase]);

    const currentWord = words[currentIndex];


    const getStyle = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            transition: `opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                   transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                   filter ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
            willChange: "opacity, transform, filter",
        };

        if (phase === "idle") {
            return { ...base, opacity: 1, transform: "translateY(0)", filter: "blur(0px)" };
        }
        if (phase === "out") {
            return { ...base, opacity: 0, transform: "translateY(-6px)", filter: "blur(4px)" };
        }
        return { ...base, opacity: 1, transform: "translateY(0)", filter: "blur(0px)" };
    };

    const incomingStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        transition: `opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                 transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1),
                 filter ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
        willChange: "opacity, transform, filter",
        // 
        opacity: phase === "in" ? 1 : 0,
        transform: phase === "in" ? "translateY(0)" : "translateY(6px)",
        filter: phase === "in" ? "blur(0px)" : "blur(4px)",
    };

    return (
        <span
            className={`relative inline-block align-bottom ${className}`}
            style={{ height: "1.2em", verticalAlign: "bottom" }}
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Ghost span — keeps container width stable */}
            <span
                className="invisible font-bold whitespace-nowrap"
                aria-hidden="true"
                style={{ display: "inline-block" }}
            >
                {longestWord}
            </span>

            {/* Current word */}
            <span style={getStyle()}>
                <span className="font-bold text-primary whitespace-nowrap">{currentWord}</span>
            </span>

            {/* Incoming word (only rendered during transition) */}
            {nextIndex !== null && (
                <span style={incomingStyle}>
                    <span className="font-bold text-primary whitespace-nowrap">
                        {words[nextIndex]}
                    </span>
                </span>
            )}
        </span>
    );
}