'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { customToast } from '@/components/custom-toast';
import type { ApiKey, ApiKeyStatus } from '@/types';

interface SettingsPageProps {
    apiKey?: ApiKey;
    onRenameProject: (name: string) => Promise<void>;
    onDeleteProject: () => Promise<void>;
    isRenaming?: boolean;
    isDeleting?: boolean;
}

const statusVariant: Record<ApiKeyStatus, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    blocked: 'danger',
    suspended: 'danger',
};

const statusDot: Record<ApiKeyStatus, string> = {
    active: 'bg-emerald-400',
    blocked: 'bg-rose-400',
    suspended: 'bg-amber-400',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 110, damping: 14 } },
};

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function maskKey(key: string) {
    if (key.length <= 12) return key;
    return `${key.slice(0, 6)}••••••••••••${key.slice(-4)}`;
}

export function SettingsPage({
    apiKey,
    onRenameProject,
    onDeleteProject,
    isRenaming = false,
    isDeleting = false,
}: SettingsPageProps) {
    const t = useTranslations('dashboard.settings');

    // All hooks must be called unconditionally before any return
    const [newName, setNewName] = useState(apiKey?.project_name ?? '');
    const [nameError, setNameError] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = () => {
            if (apiKey) setNewName(apiKey.project_name);
        }
        mount();
    }, [apiKey?.project_name]);

    const validateName = useCallback(
        (name: string): string | null => {
            const trimmed = name.trim();
            if (!trimmed) return t('actions.changeName.validation.required');
            if (trimmed.length < 2) return t('actions.changeName.validation.minLength');
            if (trimmed.length > 50) return t('actions.changeName.validation.maxLength');
            return null;
        },
        [t]
    );

    const handleNameChange = useCallback(
        (value: string) => {
            setNewName(value);
            if (nameError) setNameError(null);
        },
        [nameError]
    );

    const handleSave = useCallback(async () => {
        const error = validateName(newName);
        if (error) {
            setNameError(error);
            return;
        }
        try {
            await onRenameProject(newName.trim());
            customToast.success({ title: 'Project name updated successfully!' });
        } catch {
            customToast.error({ title: 'Failed to update project name.' });
        }
    }, [newName, validateName, onRenameProject]);

    const handleDelete = useCallback(async () => {
        try {
            await onDeleteProject();
            customToast.success({ title: 'Project deleted successfully.' });
        } catch {
            customToast.error({ title: 'Failed to delete project.' });
        } finally {
            setShowDeleteDialog(false);
        }
    }, [onDeleteProject]);

    const copyKey = useCallback(async () => {
        if (!apiKey) return;
        try {
            await navigator.clipboard.writeText(apiKey.key);
            customToast.success({ title: 'API key copied!' });
        } catch {
            customToast.error({ title: 'Failed to copy API key.' });
        }
    }, [apiKey]);

    useEffect(() => {
        if (!showDeleteDialog) return;
        const handleClick = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                setShowDeleteDialog(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showDeleteDialog]);

    // Safe to return after all hooks
    if (!apiKey) return null;

    return (
        <div className="mx-auto max-w-6xl space-y-10 pb-20 pt-1">
            {/* Page Header */}
            <div className="space-y-1 mx-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
                {/* API Key Details */}
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        'relative overflow-hidden rounded-[2rem] border border-primary-foreground/10',
                        'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
                        'p-6 sm:p-10'
                    )}
                >
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 mb-1">
                                    {t('projectDetails.nameLabel')}
                                </p>
                                <h2 className="text-2xl font-bold">{apiKey.project_name}</h2>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5">
                                <span className={cn('h-2 w-2 rounded-full', statusDot[apiKey.status])} />
                                <span className="text-xs font-semibold capitalize">{apiKey.status}</span>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 mb-2">
                                    API Key
                                </p>
                                <div className="flex items-center gap-3">
                                    <code className="text-sm font-mono bg-black/20 px-3 py-1.5 rounded-lg">
                                        {maskKey(apiKey.key)}
                                    </code>
                                    <button
                                        onClick={copyKey}
                                        className="rounded-lg bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold hover:bg-primary-foreground/20 transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 mb-1">
                                    {t('projectDetails.statusLabel')}
                                </p>
                                <Badge
                                    variant={statusVariant[apiKey.status]}
                                    className="rounded-md border-0 bg-primary-foreground/10 px-3 py-1 text-sm font-semibold text-primary-foreground"
                                >
                                    {t(`status.${apiKey.status}`)}
                                </Badge>
                            </div>

                            <div className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 mb-1">
                                    {t('projectDetails.createdAtLabel')}
                                </p>
                                <p className="text-sm font-medium">{formatDate(apiKey.created_at)}</p>
                            </div>

                            <div className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 mb-1">
                                    Last Updated
                                </p>
                                <p className="text-sm font-medium">{formatDate(apiKey.updated_at)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/5 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-foreground/5 blur-3xl" />
                </motion.div>

                {/* Change Project Name */}
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        'rounded-[2rem] border border-primary/50 bg-card p-6 sm:p-8',
                        'shadow-sm transition-all duration-200 hover:shadow-md'
                    )}
                >
                    <div className="space-y-1 mb-5">
                        <h3 className="text-base font-bold text-foreground">{t('actions.changeName.title')}</h3>
                        <p className="text-xs text-muted-foreground">{t('actions.changeName.description')}</p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="flex-1 flex flex-col space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mx-2">
                                {t('actions.changeName.nameLabel')}
                            </label>
                            <input
                                value={newName}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder={t('actions.changeName.namePlaceholder')}
                                className={cn(
                                    'w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-all',
                                    'placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary',
                                    nameError
                                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                                        : 'border-border'
                                )}
                            />
                            {nameError && (
                                <p className="text-xs font-medium text-destructive mx-2">{nameError}</p>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isRenaming}
                            className={cn(
                                'inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold',
                                'bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95',
                                'disabled:cursor-not-allowed disabled:opacity-60'
                            )}
                        >
                            {isRenaming ? t('actions.changeName.saving') : t('actions.changeName.save')}
                        </button>
                    </div>
                </motion.div>

                {/* Delete Project */}
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        'rounded-[2rem] border border-destructive/30 bg-card p-6 sm:p-8',
                        'shadow-sm transition-all duration-200 hover:shadow-md'
                    )}
                >
                    <div className="space-y-1 mb-5">
                        <h3 className="text-base font-bold text-foreground">{t('actions.deleteProject.title')}</h3>
                        <p className="text-xs text-muted-foreground">{t('actions.deleteProject.description')}</p>
                    </div>
                    <button
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={isDeleting}
                        className={cn(
                            'inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold',
                            'bg-destructive/10 text-destructive transition-all hover:bg-destructive/20 active:scale-95',
                            'disabled:cursor-not-allowed disabled:opacity-60'
                        )}
                    >
                        {t('actions.deleteProject.deleteButton')}
                    </button>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        'rounded-[2rem] border border-primary/50 bg-card p-6 sm:p-8',
                        'shadow-sm transition-all duration-200 hover:shadow-md'
                    )}
                >
                    <div className="space-y-1 mb-4">
                        <h3 className="text-base font-bold text-foreground">{t('contactSupport.title')}</h3>
                        <p className="text-xs text-muted-foreground">support@axedz.com</p>
                    </div>
                    <a
                        href={`mailto:${t('contactSupport.email')}`}
                        className={cn(
                            'inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold',
                            'bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95'
                        )}
                    >
                        {t('contactSupport.email')}
                    </a>
                </motion.div>
            </motion.div>

            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
                {showDeleteDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    >
                        <motion.div
                            ref={dialogRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className={cn(
                                'w-full max-w-xl rounded-[2rem] border border-foreground bg-card p-8',
                                'shadow-md shadow-primary/20 sm:p-10'
                            )}
                        >
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                                    {t('actions.deleteProject.title')}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {t('actions.deleteProject.confirmText')}
                                </p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    disabled={isDeleting}
                                    className={cn(
                                        'flex-1 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground',
                                        'transition-all hover:border-foreground/20 hover:text-foreground active:scale-[0.98]',
                                        'disabled:opacity-60'
                                    )}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className={cn(
                                        'flex-1 rounded-xl py-3 text-sm font-bold transition-all active:scale-[0.98]',
                                        'bg-destructive text-destructive-foreground shadow-md shadow-destructive/25',
                                        'hover:shadow-lg hover:shadow-destructive/30',
                                        'disabled:cursor-not-allowed disabled:opacity-60'
                                    )}
                                >
                                    {isDeleting
                                        ? t('actions.deleteProject.deleting')
                                        : t('actions.deleteProject.deleteButton')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}