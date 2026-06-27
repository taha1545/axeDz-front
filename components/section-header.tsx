"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    badge: string;
    title: string;
    subtitle?: string;
}

export function SectionHeader({
    badge,
    title,
    subtitle,
}: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-center"
        >
            <div className="mx-auto flex rounded-xl bg-foreground px-6 py-4 text-2xl font-bold text-background md:mx-0 md:px-6 md:py-4 md:text-4xl">
                {badge}
            </div>

            <div>
                <h2 className="mx-auto text-center text-xl font-bold tracking-tight md:mx-0 md:text-start md:text-2xl">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mx-auto mt-2 text-center text-muted-foreground md:mx-0 md:text-start">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
}