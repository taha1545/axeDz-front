'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { customToast } from '@/components/custom-toast';
import type { Project } from '@/types/dashboard';

interface SettingsPageProps {
    project: Project;
    onRenameProject: (name: string) => Promise<void>;
    onDeleteProject: () => Promise<void>;
}

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    inactive: 'warning',
    suspended: 'danger',
};

const envVariant: Record<string, 'default' | 'purple' | 'sky'> = {
    production: 'default',
    development: 'purple',
    staging: 'sky',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.02 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 110, damping: 14 },
    },
};

export function SettingsPage({ project, onRenameProject, onDeleteProject }: SettingsPageProps) {
    const t = useTranslations('dashboard.settings');

    const [newName, setNewName] = useState(project.name);
    const [nameError, setNameError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    const validateName = useCallback((name: string): string | null => {
        if (!name.trim()) return t('actions.changeName.validation.required');
        if (name.trim().length < 2) return t('actions.changeName.validation.minLength');
        if (name.trim().length > 50) return t('actions.changeName.validation.maxLength');
        return null;
    }, [t]);

    const handleNameChange = useCallback((value: string) => {
        setNewName(value);
        if (nameError) setNameError(null);
    }, [nameError]);

    const handleSave = useCallback(async () => {
        const error = validateName(newName);
        if (error) {
            setNameError(error);
            return;
        }

        setIsSaving(true);
        try {
            await onRenameProject(newName.trim());
            customToast.success({ title: 'Project name updated successfully!' });
        } catch {
            customToast.error({ title: 'Failed to update project name.' });
        } finally {
            setIsSaving(false);
        }
    }, [newName, validateName, onRenameProject]);

    const handleDelete = useCallback(async () => {
        setIsDeleting(true);
        try {
            await onDeleteProject();
            customToast.success({ title: 'Project deleted successfully.' });
            setShowDeleteDialog(false);
        } catch {
            customToast.error({ title: 'Failed to delete project.' });
        } finally {
            setIsDeleting(false);
        }
    }, [onDeleteProject]);

    // Click outside to close dialog
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                setShowDeleteDialog(false);
            }
        };
        if (showDeleteDialog) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showDeleteDialog]);

    return (
        <div className="mx-auto max-w-6xl space-y-12 pb-20 pt-1">
            {/* Page Header */}
            <div className="space-y-1 mx-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {t('title')}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {t('description')}
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10"
            >
                {/* Project Details */}
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        'group relative overflow-hidden rounded-[2rem] border border-foreground p-6 sm:px-12 sm:py-10',
                        'transition-all duration-300',
                        'bg-primary text-primary-foreground shadow-md shadow-foreground/50 hover:shadow-foreground'
                    )}
                >
                    <h3 className="text-xl font-bold text-foreground mb-5">
                        {t('projectDetails.title')}
                    </h3>
                    <div className="grid gap-8 sm:grid-cols-2  w-full ">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                                {t('projectDetails.nameLabel')}
                            </p>
                            <p className="text-xl font-bold text-primary-foreground">
                                {project.name}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                                {t('projectDetails.statusLabel')}
                            </p>
                            <Badge variant={statusVariant[project.status]} className='text-primary-foreground  rounded-sm text-md px-3 py-2 bg-foreground/40'>
                                {t(`status.${project.status}`)}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                                {t('projectDetails.environmentLabel')}
                            </p>
                            <Badge variant={envVariant[project.environment]} className='text-primary-foreground text-md rounded-sm px-4 py-2 bg-foreground/40'>
                                {t(`environmentType.${project.environment}`)}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                                {t('projectDetails.createdAtLabel')}
                            </p>
                            <p className='text-primary-foreground text-md rounded-sm px-4 py-2 bg-foreground/40 w-fit'>
                                {project.createdAt}
                            </p>
                        </div>
                    </div>
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
                        <h3 className="text-base font-bold text-foreground">
                            {t('actions.changeName.title')}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {t('actions.changeName.description')}
                        </p>
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
                                    'w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none',
                                    'transition-all placeholder:text-muted-foreground/60',
                                    'focus:border-primary focus:ring-1 focus:ring-primary',
                                    nameError
                                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
                                        : 'border-border'
                                )}
                            />
                            {nameError && (
                                <p className="text-xs font-medium text-destructive mx-2">
                                    {nameError}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={cn(
                                'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold',
                                'bg-primary text-primary-foreground transition-all duration-200',
                                'hover:shadow-lg hover:shadow-primary/30 active:scale-95',
                                'disabled:cursor-not-allowed disabled:opacity-60'
                            )}
                        >
                            {isSaving
                                ? t('actions.changeName.saving')
                                : t('actions.changeName.save')}
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
                        <h3 className="text-base font-bold text-foreground">
                            {t('actions.deleteProject.title')}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {t('actions.deleteProject.description')}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowDeleteDialog(true)}
                        className={cn(
                            'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold',
                            'bg-destructive/10 text-destructive transition-all duration-200',
                            'hover:bg-destructive/20 hover:shadow-lg hover:shadow-destructive/20 active:scale-95'
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
                        <h3 className="text-base font-bold text-foreground">
                            {t('contactSupport.title')}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            support@axedz.com
                        </p>
                    </div>

                    <a
                        href={`mailto:${t('contactSupport.email')}`}
                        className={cn(
                            'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold',
                            'bg-primary text-primary-foreground transition-all duration-200',
                            'hover:shadow-lg hover:shadow-primary/30 active:scale-95'
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
                                    className={cn(
                                        'flex-1 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground',
                                        'transition-all hover:border-foreground/20 hover:text-foreground active:scale-[0.98]'
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
