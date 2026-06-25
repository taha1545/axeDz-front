'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Copy, RotateCcw, Pause, Eye, EyeOff } from 'lucide-react';
import type { ApiKey } from '@/types/api-key';

interface ApiKeySectionProps {
    apiKey: ApiKey;
    onRotate?: () => void;
    onSuspend?: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 110,
            damping: 14,
        },
    },
};

export function ApiKeySection({ apiKey, onRotate, onSuspend }: ApiKeySectionProps) {
    const t = useTranslations('dashboard.overview.apiKey');
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);

    const isActive = apiKey.status === 'active';
    const maskedKey = apiKey.key.slice(0, 8) + '•'.repeat(24);
    const displayKey = showKey ? apiKey.key : maskedKey;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(apiKey.key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 mx-1">
            {/* Section Header */}
            <div className="space-y-1.5 mx-3 ">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('title', { fallback: 'API Key' })}
                </h2>
                <p className="text-sm mx-1 font-medium text-muted-foreground">
                    {t('description', { fallback: 'Manage your project API key and access controls.' })}
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
                {/* Left — API Key Info Card (spans 2 rows) */}
                <motion.div
                    variants={itemVariants}
                    className={cn(
                        'relative overflow-hidden rounded-[2rem] border-foreground border p-6 sm:p-8',
                        'bg-primary text-primary-foreground shadow-md shadow-foreground/50',
                        'lg:row-span-2 flex flex-col'
                    )}
                >
                    <div className="relative z-10 flex flex-col h-full space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-4  mx-1 flex-wrap">
                            <div className="space-y-2">
                                <span className="text-base font-bold uppercase tracking-wider text-foreground/80">
                                    {t('projectLabel', { fallback: 'Project' })}
                                </span>
                                <h3 className="text-xl  text-white font-semibold tracking-tight">
                                    {apiKey.project_name}
                                </h3>
                            </div>
                            <span
                                className={cn(
                                    'inline-flex items-center rounded-xl border bg-foreground text-background border-background px-5 py-2 text-xs font-bold uppercase tracking-wide',
                                    apiKey.status
                                )}
                            >
                                {apiKey.status}
                            </span>
                        </div>

                        {/* Key Display */}
                        <div className="space-y-2 mt-1">
                            <span className="text-sm mx-2 font-bold uppercase tracking-wider text-foreground/90">
                                {t('keyLabel', { fallback: 'Secret Key' })}
                            </span>
                            <div
                                className={cn(
                                    'flex items-center gap-3 rounded-2xl border border-foreground/40',
                                    'bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm'
                                )}
                            >
                                <code className="flex-1 font-mono text-sm font-semibold tracking-wide truncate text-primary-foreground">
                                    {displayKey}
                                </code>
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="rounded-full p-2 transition-colors hover:bg-primary-foreground/20"
                                    aria-label={showKey ? 'Hide key' : 'Show key'}
                                >
                                    {showKey ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="rounded-full p-2 transition-colors hover:bg-primary-foreground/20"
                                    aria-label="Copy key"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                                {copied && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-xs font-bold"
                                    >
                                        {t('copied', { fallback: 'Copied!' })}
                                    </motion.span>
                                )}
                            </div>
                        </div>

                        {/* Meta — pushed to bottom */}
                        <div className="mt-auto  mx-auto pt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-white">
                            <span>
                                {t('created', { fallback: 'Created' })}: {new Date(apiKey.created_at).toLocaleDateString()}
                            </span>
                            <span>
                                {t('updated', { fallback: 'Updated' })}: {new Date(apiKey.updated_at).toLocaleDateString()}
                            </span>
                            <span>ID: {apiKey.id}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right — Rotate Key Row */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className={cn(
                        'flex items-center justify-between gap-4 rounded-[2rem] border p-5 sm:p-6',
                        'bg-card text-card-foreground shadow-md shadow-primary/20',
                        'transition-all duration-300 hover:shadow-primary/40 h-full'
                    )}
                >
                    <div className="space-y-1 min-w-0">
                        <h4 className="text-base font-bold tracking-tight">
                            {t('rotate.title', { fallback: 'Rotate Key' })}
                        </h4>
                        <p className="text-sm font-medium text-muted-foreground">
                            {t('rotate.description', { fallback: 'Generate a new secret key. The old key will expire in 24 hours.' })}
                        </p>
                    </div>
                    <button
                        onClick={onRotate}
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 rounded-full',
                            'bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground',
                            'transition-all duration-200 hover:shadow-lg hover:shadow-primary/30',
                            'active:scale-95'
                        )}
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('rotate.action', { fallback: 'Rotate' })}</span>
                    </button>
                </motion.div>

                {/* Right — Suspend Key Row */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className={cn(
                        'flex items-center justify-between gap-4 rounded-[2rem] border p-5 sm:p-6',
                        'bg-card text-card-foreground shadow-md shadow-primary/20',
                        'transition-all duration-300 hover:shadow-primary/40 h-full'
                    )}
                >
                    <div className="space-y-1 min-w-0">
                        <h4 className="text-base font-bold tracking-tight">
                            {isActive
                                ? t('suspend.title', { fallback: 'Suspend Key' })
                                : t('activate.title', { fallback: 'Activate Key' })}
                        </h4>
                        <p className="text-sm font-medium text-muted-foreground">
                            {isActive
                                ? t('suspend.description', { fallback: 'Temporarily disable API access. You can reactivate anytime.' })
                                : t('activate.description', { fallback: 'Resume API access immediately.' })}
                        </p>
                    </div>
                    <button
                        onClick={onSuspend}
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 rounded-full',
                            'px-5 py-2.5 text-sm font-bold transition-all duration-200',
                            'active:scale-95',
                            isActive
                                ? 'bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/30'
                                : 'bg-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-500/30'
                        )}
                    >
                        <Pause className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            {isActive
                                ? t('suspend.action', { fallback: 'Suspend' })
                                : t('activate.action', { fallback: 'Activate' })}
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}