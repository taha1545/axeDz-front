'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import type { Project } from '@/types/dashboard';

interface ProjectSelectModalProps {
    open: boolean;
    onClose: () => void;
    projects: Project[];
    currentProject?: Project;
    onSelect: (project: Project) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 15;

const STATUS_CONFIG = {
    active: {
        dot: 'bg-emerald-500',
        text: 'text-emerald-700 dark:text-emerald-400',
    },
    blocked: {
        dot: 'bg-amber-500',
        text: 'text-amber-700 dark:text-amber-400',
    },
    suspended: {
        dot: 'bg-red-500',
        text: 'text-red-700 dark:text-red-400',
    },
} as const;

export function ProjectSelectModal({
    open,
    onClose,
    projects,
    currentProject,
    onSelect,
    searchQuery,
    onSearchChange,
    currentPage,
    onPageChange,
}: ProjectSelectModalProps) {
    const t = useTranslations('dashboard.navbar');

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    const handleSelect = useCallback(
        (project: Project) => {
            onSelect(project);
            onClose();
        },
        [onSelect, onClose]
    );

    const filteredProjects = useMemo(() => {
        if (!searchQuery.trim()) return projects;
        const q = searchQuery.toLowerCase();
        return projects.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.environment?.toLowerCase().includes(q)
        );
    }, [projects, searchQuery]);

    // Pin current project to top, then the rest below
    const orderedProjects = useMemo(() => {
        if (!currentProject) return filteredProjects;

        const others = filteredProjects.filter((p) => p.id !== currentProject.id);
        const current = filteredProjects.find((p) => p.id === currentProject.id);

        return current ? [current, ...others] : filteredProjects;
    }, [filteredProjects, currentProject]);

    const totalPages = Math.ceil(orderedProjects.length / ITEMS_PER_PAGE);

    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return orderedProjects.slice(start, start + ITEMS_PER_PAGE);
    }, [orderedProjects, currentPage]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
                onClick={onClose}
            />

            {/* Card */}
            <div
                className={cn(
                    'relative w-full max-w-2xl px-8 py-4',
                    'rounded-xl border border-primary bg-background',
                    'shadow-lg shadow-primary/20',
                    'flex flex-col max-h-[90vh]',
                    'animate-in fade-in zoom-in-95 duration-200'
                )}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex flex-col items-center gap-3 border-b border-foreground/10 p-6 pb-4 shrink-0">
                    <Logo size="lg" priority />
                    <h2 className="text-lg font-semibold text-foreground">
                        {t('selectProject')}
                    </h2>
                </div>

                {/* Search */}
                <div className="p-4 pb-2 shrink-0 px-8 ">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={t('searchProjects')}
                            className={cn(
                                'h-11 rounded-2xl border-foreground/20 bg-muted/40 pl-10 pr-4',
                                'text-sm text-foreground placeholder:text-muted-foreground/50',
                                'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0'
                            )}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Projects List */}
                <div className="flex-1 overflow-y-auto min-h-0 px-8 py-3">
                    {orderedProjects.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                            <FolderOpen className="h-10 w-10 opacity-40" />
                            <p className="text-sm font-medium">{t('noProjects')}</p>
                            <p className="text-xs opacity-60">
                                {t('tryDifferentSearch')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {paginatedProjects.map((project) => {
                                const isCurrent = currentProject?.id === project.id;
                                const status = STATUS_CONFIG[project.status];

                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => handleSelect(project)}
                                        className={cn(
                                            'group relative w-full rounded-2xl border px-6 py-3.5 text-left',
                                            'transition-all duration-200',
                                            isCurrent
                                                ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                                                : 'border-primary/20 bg-card/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-px'
                                        )}
                                    >
                                        {isCurrent && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-full bg-primary" />
                                        )}

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                                    <span
                                                        className={cn(
                                                            'text-sm font-semibold truncate',
                                                            isCurrent && 'text-foreground font-bold'
                                                        )}
                                                    >
                                                        {project.name}
                                                    </span>

                                                    {isCurrent && (
                                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                                                            {t('current')}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                                                        <span className={cn('font-medium', status.text)}>
                                                            {t(`status.${project.status}`)}
                                                        </span>
                                                    </span>
                                                    <span className="opacity-40">|</span>
                                                    <span>
                                                        {new Date(project.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {isCurrent && (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border/50 p-4 shrink-0">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={cn(
                                'flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all',
                                currentPage === 1
                                    ? 'text-muted-foreground/30 cursor-not-allowed'
                                    : 'text-foreground hover:bg-muted active:scale-95'
                            )}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            {t('prev')}
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => onPageChange(p)}
                                    className={cn(
                                        'h-8 w-8 rounded-lg text-sm font-medium transition-all',
                                        p === currentPage
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={cn(
                                'flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all',
                                currentPage === totalPages
                                    ? 'text-muted-foreground/30 cursor-not-allowed'
                                    : 'text-foreground hover:bg-muted active:scale-95'
                            )}
                        >
                            {t('next')}
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="border-t border-border/50 p-3 text-center shrink-0">
                    <p className="text-xs text-muted-foreground">
                        {orderedProjects.length > 0
                            ? t('showingResults', {
                                from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                                to: Math.min(currentPage * ITEMS_PER_PAGE, orderedProjects.length),
                                total: orderedProjects.length,
                            })
                            : t('noResults')}
                    </p>
                </div>
            </div>
        </div>
    );
}