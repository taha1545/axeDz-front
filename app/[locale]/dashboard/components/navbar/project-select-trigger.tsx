'use client';

import { useTranslations } from 'next-intl';
import { ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/dashboard';

interface ProjectSelectTriggerProps {
    currentProject?: Project;
    onClick: () => void;
}

export function ProjectSelectTrigger({ currentProject, onClick }: ProjectSelectTriggerProps) {
    //
    const t = useTranslations('dashboard.navbar');
    //
    return (
        <button
            onClick={onClick}
            className={cn(
                'group flex items-center gap-2.5 rounded-xl px-4 py-2.5',
                'text-sm font-medium shadow-sm border border-foreground/40  bg-card',
                'text-foreground transition-all duration-200',
                'hover:shadow-md hover:border-foreground hover:bg-card/80',
                'active:scale-[0.98]'
            )}
        >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="max-w-35 truncate">
                {currentProject?.name || t('projects')}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
    );
}