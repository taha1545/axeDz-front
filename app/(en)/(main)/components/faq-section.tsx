'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 'services',
        question: 'What services does AxeDz provide?',
        answer:
            'AxeDz is built to serve developers and businesses across all Algerian wilayas, providing reliable access to communication infrastructure wherever they operate. By removing barriers related to payments, integrations, and scalability, the platform ensures that teams can build and deploy services efficiently at a national level.',
    },
    {
        id: 'built-for',
        question: 'Who is AxeDz built for?',
        answer:
            'AxeDz is designed for startups, SMEs, and enterprise teams who need reliable SMS, email, voice, and billing APIs with local DZD currency support. Whether you are building a notification system or a full communication suite, our platform scales with you.',
    },
    {
        id: 'billing',
        question: 'How does billing work?',
        answer:
            'We operate on a pay-as-you-go model with transparent pricing in Algerian Dinars (DZD). You can top up your wallet via local payment methods, create invoices, and track every transaction in real-time through the dashboard.',
    },
    {
        id: 'test',
        question: 'Can I test the platform before scaling?',
        answer:
            'Absolutely. Every new account comes with free sandbox credits so you can integrate and test all APIs in a staging environment before going live. No credit card is required to start building.',
    },
];

export function FAQSection() {
    const [openId, setOpenId] = useState<string>('services');

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? '' : id));
    };

    return (
        <section className="py-15 px-4 md:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <span className="inline-block w-fit rounded-lg bg-foreground px-4 py-4 text-medium md:text-2xl font-bold tracking-wide text-background">
                            Q&A
                        </span>
                        <h2 className="max-w-xs text-center text-base font-semibold py-4 text-foreground sm:text-left sm:text-lg">
                            Solutions for frequently asked queries
                        </h2>
                    </div>
                </motion.div>


                {/* Accordion */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div key={faq.id} className="flex flex-col">
                                {/* Trigger */}
                                <button
                                    onClick={() => toggle(faq.id)}
                                    className={cn(
                                        'w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 rounded-full text-left transition-all duration-300',
                                        isOpen
                                            ? 'bg-foreground text-background shadow-lg'
                                            : 'bg-primary text-primary-foreground hover:brightness-110'
                                    )}
                                >
                                    <span className="font-semibold text-base md:text-lg">
                                        {faq.question}
                                    </span>
                                    <span className="shrink-0">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                {/* Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 py-6">
                                                <p className="text-muted-foreground leading-relaxed max-w-4xl text-base">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}