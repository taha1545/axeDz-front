'use client';

import { motion } from 'framer-motion';
import { VideoShowcase } from '@/app/(en)/(main)/components/trail/video-showcase';

export function TrailSection() {
    return (
        <section className=" px-4 py-6 md:py-16 md:px-10 lg:px-16 ">
            <div className="mx-auto max-w-7xl  sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <span className="inline-block w-fit rounded-lg bg-foreground px-6 py-4 text-medium md:text-2xl font-bold tracking-wide text-background">
                            Specific
                        </span>
                        <h2 className="max-w-xs text-center text-base font-semibold text-foreground sm:text-left sm:text-lg">
                            Built for Developers  A Tailored Solution for Your Needs
                        </h2>
                    </div>
                </motion.div>

                {/* Video */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <VideoShowcase videoSrc="https://www.youtube.com/watch?v=KmEsh9C4ZUo" />
                </motion.div>
            </div>
        </section>
    );
}