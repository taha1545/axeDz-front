'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useContact } from "../hooks/useContact";

interface FormData {
    name: string;
    phone?: string;
    email: string;
    subject: string;
    message: string;
}

export function ContactSection() {
    //
    const [form, setForm] = useState<FormData>({ name: '', email: '', message: '', subject: '' });
    const { sendMessage, loading } = useContact();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await sendMessage(form);
        setForm({
            name: "",
            email: "",
            message: "",
            subject: ""
        });
    };

    return (
        <section id="contact" className="py-15 px-4 md:px-6 lg:px-8 bg-background scroll-mt-24">
            <div className="max-w-7xl mx-auto md:px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <span className="inline-block w-fit rounded-lg bg-foreground px-4 py-4 text-medium text-2xl font-bold tracking-wide text-background">
                            Contact US
                        </span>
                        <h2 className="max-w-xs text-center py-4 text-base font-semibold text-foreground sm:text-left sm:text-lg">
                            Let&apos;s Discuss Your Needs
                        </h2>
                    </div>
                </motion.div>


                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className={cn(
                        'relative overflow-hidden rounded-[2.5rem] border bg-card',
                        'shadow-sm shadow-primary/40',
                    )}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Form Side */}
                        <div className="p-8 md:p-12 lg:p-16">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium text-foreground "
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className={cn(
                                            'w-full px-6 py-3.5 rounded-full border bg-background text-foreground',
                                            'placeholder:text-muted-foreground/60',
                                            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                            'transition-all duration-200'
                                        )}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Email<span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className={cn(
                                            'w-full px-6 py-3.5 rounded-full border bg-background text-foreground',
                                            'placeholder:text-muted-foreground/60',
                                            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                            'transition-all duration-200'
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Subject<span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Subject"
                                        className={cn(
                                            'w-full px-6 py-3.5 rounded-full border bg-background text-foreground',
                                            'placeholder:text-muted-foreground/60',
                                            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                            'transition-all duration-200'
                                        )}
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-4">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Message<span className="text-destructive">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Message"
                                        rows={5}
                                        className={cn(
                                            'w-full max-h-30 px-6 py-4 rounded-2xl border bg-background text-foreground resize-none',
                                            'placeholder:text-muted-foreground/60',
                                            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                            'transition-all duration-200'
                                        )}
                                    />
                                </div>
                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={cn(
                                        'w-full py-4 rounded-full font-semibold text-sm',
                                        'bg-foreground text-background',
                                        'hover:bg-foreground/90 active:scale-[0.98]',
                                        'transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed',
                                        'mt-2'
                                    )}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Image Side */}
                        <div className="relative hidden h-full  items-center justify-end lg:flex">
                            <div className=" relative ml-auto aspect-square w-full h-full max-w-md  ">
                                <Image
                                    src="/contact-image.svg"
                                    alt="Contact decoration"
                                    fill
                                    className="object-contain object-right invert-0 dark:invert"
                                    priority={false}
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}