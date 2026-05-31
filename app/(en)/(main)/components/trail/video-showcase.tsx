'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoShowcaseProps {
    videoSrc: string;
    className?: string;
}

export function VideoShowcase({ videoSrc, className }: VideoShowcaseProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef < HTMLIFrameElement > (null);

    const getEmbedUrl = (src: string) => {
        if (src.includes('youtube.com/embed')) return src;
        const match = src.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        if (match) {
            return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
        }
        return src;
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div
            className={cn(
                ' relative w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl',
                className
            )}
        >
            {/* Video Stage */}
            <div className="relative aspect-video w-full bg-black max-h-120">
                <AnimatePresence mode="wait">
                    {!isPlaying ? (
                        <motion.div
                            key="poster"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-background"
                            onClick={handlePlay}
                        >
                            {/* Play Button */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform duration-200 hover:scale-110 md:h-20 md:w-20">
                                <Play className="ml-1 h-6 w-6 fill-current md:h-8 md:w-8" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="video"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <iframe
                                ref={iframeRef}
                                src={getEmbedUrl(videoSrc)}
                                className="h-full w-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="Video showcase"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Control Bar */}
            <div className="flex h-12 items-center gap-4 bg-foreground px-5 md:h-14 md:px-6">
                {!isPlaying ? (
                    <Play className="h-4 w-4 fill-background text-background" />
                ) : (
                    <button
                        onClick={handlePause}
                        className="flex items-center justify-center"
                    >
                        <Pause className="h-4 w-4 fill-background text-background" />
                    </button>
                )}
                <div className="h-px flex-1 bg-background/30" />
                {isPlaying && (
                    <button
                        onClick={() => iframeRef.current?.requestFullscreen()}
                        className="text-background/70 transition-colors hover:text-background"
                    >
                        <Maximize className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}