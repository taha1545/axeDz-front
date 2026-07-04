'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { SectionHeader } from '@/components/section-header';
import { useContact } from '@/hooks/use-contact';
import { contactSchema, type ContactInput } from '@/schemas/contact';
import { cn } from '@/lib/utils';
import { customToast } from '@/components/custom-toast';

export function ContactSection() {
    //
    const t = useTranslations('home.contact');
    //
    const { mutateAsync, isPending } = useContact();
    const { register, handleSubmit, reset, formState: { errors }, setError: setFormError, clearErrors, } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });
    //
    const onSubmit = async (data: ContactInput) => {
        clearErrors();
        try {
            await mutateAsync(data);
            reset();
            customToast.success({
                title: "succses",
                description: t('form.success'),
            });
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? t('form.error')
                : t('form.error');
            //
            setFormError('root', { message });
            customToast.error({
                title: t('form.error'),
                description: message,
            });
        }
    };

    const inputBase = cn(
        'w-full px-5 py-2.5 md:my-1',
        'bg-background',
        'text-foreground',
        'border border-border',
        'placeholder:text-muted-foreground/80',
        'focus:outline-none',
        'focus:ring-2 focus:ring-primary/20',
        'focus:border-primary',
        'transition-all duration-200'
    );
    const inputError = 'border-destructive focus:border-destructive focus:ring-destructive/20';
    const inputNormal = 'border';

    return (
        <section
            id="contact"
            className="scroll-mt-24 bg-background px-4 py-16 md:px-6 md:py-24 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <SectionHeader
                    badge={t('badge')}
                    title={t('title')}
                    subtitle={t('subtitle')}
                />

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className={cn(
                        'relative overflow-hidden rounded-[2rem] border border-border bg-card',
                        'shadow-xl shadow-primary/10'
                    )}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Form Side */}
                        <div className="px-6 py-6 md:px-10 lg:px-12">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 " >
                                {/* Name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {t('form.name')}
                                        <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder={t('form.placeholders.name')}
                                        className={cn(
                                            inputBase,
                                            'rounded-full',
                                            errors.name ? inputError : inputNormal
                                        )}
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <p className="text-sm font-medium text-destructive">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {t('form.email')}
                                        <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder={t('form.placeholders.email')}
                                        className={cn(
                                            inputBase,
                                            'rounded-full',
                                            errors.email ? inputError : inputNormal
                                        )}
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="text-sm font-medium text-destructive">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {t('form.subject')}
                                        <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        placeholder={t('form.placeholders.subject')}
                                        className={cn(
                                            inputBase,
                                            'rounded-full',
                                            errors.subject ? inputError : inputNormal
                                        )}
                                        {...register('subject')}
                                    />
                                    {errors.subject && (
                                        <p className="text-sm font-medium text-destructive">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {t('form.message')}
                                        <span className="text-destructive">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder={t('form.placeholders.message')}
                                        className={cn(
                                            inputBase,
                                            'rounded-2xl resize-none max-h-30',
                                            errors.message ? inputError : inputNormal
                                        )}
                                        {...register('message')}
                                    />
                                    {errors.message && (
                                        <p className="text-sm font-medium text-destructive">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={cn(
                                        'mt-4 w-full rounded-full py-4 text-sm font-semibold',
                                        'bg-primary text-primary-foreground',
                                        'hover:opacity-90',
                                        'active:scale-[0.98]',
                                        'transition-all duration-200',
                                        'disabled:cursor-not-allowed disabled:opacity-60'
                                    )}
                                >
                                    {isPending ? t('form.sending') : t('form.submit')}
                                </button>
                            </form>
                        </div>

                        {/* Image Side */}
                        <div className="relative hidden h-full w-full items-center   justify-center max-h-145 lg:flex">
                            <div className="relative aspect-square w-full h-full">
                                <Image
                                    src="/contact-image.svg"
                                    alt={t('imageAlt')}
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