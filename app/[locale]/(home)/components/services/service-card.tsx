'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from "@/hooks/use-mobile";

export interface ServiceItem {
    id: string;
    title: string;
    image: string;
    href: string;
    variant: 'blue' | 'white';
    mobilevariant: 'blue' | 'white';
}

interface ServiceCardProps {
    service: ServiceItem;
    index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    //
    const isMobile = useIsMobile();
    const isBlue = isMobile
        ? service.mobilevariant === 'blue'
        : service.variant === 'blue';
    //
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={cn(
                'group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-xl border  p-5 transition-shadow duration-300 hover:shadow-base sm:p-8',
                isBlue
                    ? 'border-primary bg-primary text-primary-foreground hover:shadow-foreground'
                    : 'border-border bg-card text-card-foreground hover:shadow-primary'
            )}
        >
            <div className="flex flex-col items-center gap-5 min-h-30 sm:h-55 sm:min-h-0 sm:flex-row sm:items-center sm:gap-6">
                {/* Text */}
                <div className="flex h-full flex-1 flex-col justify-between self-stretch py-1 sm:py-2">
                    <span
                        className={cn(
                            'inline-flex w-fit self-start rounded-lg px-3 py-1.5 font-semibold',
                            'text-xl sm:text-2xl md:text-3xl',
                            isBlue
                                ? 'bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm'
                                : 'bg-muted text-foreground'
                        )}
                    >
                        {service.title}
                    </span>

                    <a
                        href={service.href}
                        className={cn(
                            'mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors sm:mt-auto',
                            isBlue
                                ? 'text-primary-foreground/80 hover:text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Image */}
                <div className="relative h-35 w-full shrink-0 sm:h-full sm:w-[65%]">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain object-center"
                    />
                </div>
            </div>
        </motion.article>
    );
}