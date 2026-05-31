'use client';

import { motion } from 'framer-motion';
import { ServiceCard, ServiceItem } from '@/app/(en)/(main)/components/services/service-card';

const services: ServiceItem[] = [
    {
        id: 'sms-api',
        title: 'SMS API optimization',
        image: '/services/sms.svg',
        href: '#',
        variant: 'white',
    },
    {
        id: 'email-marketing',
        title: 'Email Marketing',
        image: '/services/email.svg',
        href: '#',
        variant: 'blue',
    },
    {
        id: 'cloud-storage',
        title: 'Cloud Storage',
        image: '/services/storage.svg',
        href: '#',
        variant: 'blue',
    },
    {
        id: 'ai-tokens',
        title: ' Models Tokens',
        image: '/services/api.svg',
        href: '#',
        variant: 'white',
    },
    {
        id: 'local-billing',
        title: 'Local Billing (DZD)',
        image: '/services/billing.svg',
        href: '#',
        variant: 'white',
    },

    {
        id: 'developer-dashboard',
        title: 'Developer Dashboard',
        image: '/services/dashboard.svg',
        href: '#',
        variant: 'blue',
    },

];

export function ServicesSection() {
    return (
        <section id="services" className="bg-background px-4 py-24 md:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl ">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <div className=" w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <span className="inline-block w-fit rounded-lg bg-foreground px-4 py-4 text-medium md:text-2xl font-bold tracking-wide text-background">
                            Services
                        </span>
                        <h2 className="max-w-xs text-center text-base font-semibold text-foreground sm:text-left sm:text-lg">
                            manage your communications with a single platform.
                        </h2>
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-7xl">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}