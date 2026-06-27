import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';


interface CaseStudyCardProps {
    title: string;
    description: string;
    href: string;
    learnMore: string;
    index: number;
}

export  function CaseStudyCard({
    title,
    description,
    href,
    learnMore,
    index,
}: CaseStudyCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col"
        >
            <h3 className="mb-2 text-lg font-semibold  text-background dark:text-foreground">
                {title}
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed  text-muted/80 dark:text-muted-foreground sm:text-base">
                {description}
            </p>
            <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-medium  text-background dark:text-foreground transition-colors hover:text-muted/60 dark:hover:text-muted-foreground"
            >
                {learnMore}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
        </motion.article>
    );
}