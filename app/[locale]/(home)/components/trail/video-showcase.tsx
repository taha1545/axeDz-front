"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoShowcaseProps {
    videoSrc: string;
    poster?: string;
    className?: string;
    playLabel: string;
    loadingLabel: string;
}

export function VideoShowcase({
    videoSrc,
    poster,
    className,
    playLabel,
    loadingLabel,
}: VideoShowcaseProps) {
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl",
                className
            )}
        >
            <div className="relative aspect-video overflow-hidden bg-card">
                <AnimatePresence mode="wait">
                    {!started && (
                        <motion.button
                            key="poster"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setStarted(true)}
                            aria-label={playLabel}
                            className="group absolute inset-0 z-20 flex items-center justify-center"
                        >
                            {poster && (
                                <img
                                    src={poster}
                                    alt="video"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-2xl transition-all duration-300 group-hover:scale-110">
                                <Play className="ml-1 h-8 w-8 fill-current text-foreground" />
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {started && (
                    <>
                        {loading && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    {loadingLabel}
                                </span>
                            </div>
                        )}

                        <motion.video
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full w-full object-cover"
                            controls
                            autoPlay
                            playsInline
                            preload="metadata"
                            onLoadedData={() => setLoading(false)}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </motion.video>
                    </>
                )}
            </div>
        </div>
    );
}