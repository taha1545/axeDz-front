"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, XIcon } from "lucide-react";
import useSound from "use-sound";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
    className?: string;
    soundSrc?: string;
    enableSound?: boolean;
}

export function HeroVideoDefault({
    videoSrc,
    thumbnailSrc,
    thumbnailAlt = "Video thumbnail",
    className,
    soundSrc = "/sounds/whoosh-motion.mp3",
    enableSound = true,
}: HeroVideoProps) {
    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
    const [playSound, { sound, stop }] = useSound(soundSrc, {
        soundEnabled: enableSound,
        volume: 1,
    });

    useEffect(() => {
        console.log("Sound enabled:", enableSound);
        console.log("Sound source:", soundSrc);
        return () => {
            if (sound) {
                stop();
            }
        };
    }, [enableSound, soundSrc, sound, stop]);

    const handlePlayClick = useCallback(() => {
        console.log("Play button clicked");
        if (enableSound) {
            try {
                playSound();
                console.log("Attempting to play sound");
            } catch (error) {
                console.error("Error playing sound:", error);
            }
        }
        setIsVideoOpen(true);
    }, [enableSound, playSound]);

    return (
        <div className={cn("relative", className)}>
            <div className="group relative cursor-pointer" onClick={handlePlayClick}>
                <img
                    src={thumbnailSrc}
                    alt={thumbnailAlt}
                    width={1920}
                    height={1080}
                    className="w-full  rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
                    <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md dark:bg-[#212121]">
                        <div
                            className={`relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2] dark:from-white/10 dark:to-white/30 dark:shadow-gray-900`}
                        >
                            <Play
                                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105 dark:fill-gray-300 dark:text-gray-300"
                                style={{
                                    filter:
                                        "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsVideoOpen(false)}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "180deg" }}
                            animate={{
                                scale: 1,
                                rotate: "0deg",
                                transition: {
                                    type: "spring",
                                    bounce: 0.25,
                                },
                            }}
                            exit={{ scale: 0, rotate: "180deg" }}
                            className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
                                onClick={() => setIsVideoOpen(false)}
                            >
                                <XIcon className="size-5" />
                            </motion.button>
                            <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                                <iframe
                                    src={videoSrc}
                                    className="size-full rounded-2xl"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
