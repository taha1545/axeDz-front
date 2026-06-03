'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
    id: string;
    title: string;
    description: string;
    href: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 'ecommerce',
        title: 'E-commerce Platforms',
        description: 'Send order confirmations and delivery updates via SMS and Email.',
        href: '/docs?tab=ecommerce',
    },
    {
        id: 'saas',
        title: 'SaaS Applications',
        description: 'Manage user authentication, notifications, and storage seamlessly.',
        href: '/docs?tab=saas',
    },
    {
        id: 'fintech',
        title: 'Fintech & Startups',
        description: 'Secure OTP verification and real-time alerts with local reliability.',
        href: '/docs?tab=fintech',
    },
];

export function CaseStudiesSection() {
    return (
        <section className="bg-background px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-14"
                >
                    <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:text-start sm:items-start sm:gap-5">
                        <span className="inline-block w-fit  rounded-lg bg-foreground px-3 py-3  font-bold tracking-wide text-background sm:px-4 sm:py-4  text-md lg:text-2xl">
                            Case Studies
                        </span>
                        <h2 className="max-w-lg text-sm py-2 font-medium leading-snug text-muted-foreground sm:text-base md:max-w-xl md:text-lg">
                            Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
                        </h2>
                    </div>
                </motion.div>

                {/* Dark Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={cn(
                        'relative overflow-hidden rounded-2xl sm:rounded-[2rem]',
                        'bg-card  text-card-foreground border border-primary/20 shadow-lg',
                        'px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20'
                    )}
                >
                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-80 sm:w-80 md:blur-[100px]" />

                    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                className="group flex flex-col"
                            >
                                <h3 className="mb-2 text-base font-semibold text-card-foreground sm:text-lg md:text-xl">
                                    {study.title}
                                </h3>
                                <p className="mb-5 flex-1 text-sm leading-relaxed text-card-foreground/60 sm:mb-6 sm:text-base">
                                    {study.description}
                                </p>
                                <a
                                    href={study.href}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 text-sm font-medium',
                                        'text-foreground/80 transition-colors duration-200 hover:text-foreground'
                                    )}
                                >
                                    Learn more
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}