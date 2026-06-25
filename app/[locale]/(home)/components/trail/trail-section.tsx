"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { VideoShowcase } from "./video-showcase";
import { SectionHeader } from "@/components/section-header";

export function TrailSection() {
    //
    const t = useTranslations("home.trial");
    //
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <SectionHeader
                    badge={t("badge")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <VideoShowcase
                        videoSrc="/video.mp4"
                        poster="/video-poster.webp"
                        playLabel={t("playVideo")}
                        loadingLabel={t("loading")}
                    />
                </motion.div>
            </div>
        </section>
    );
}