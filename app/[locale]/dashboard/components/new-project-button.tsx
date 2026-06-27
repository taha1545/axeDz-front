'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { useDashboardContext } from '@/providers/dashboard-provider';
import { InfoDialog } from '@/components/custom-dialog';

interface NewProjectForm {
    name: string;
}

export function NewProjectButton() {
    const t = useTranslations('dashboard.newProject');
    const { createProject, isCreatingProject, canCreateProject } = useDashboardContext();

    const [open, setOpen] = useState(false);
    const [verifyOpen, setVerifyOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewProjectForm>({
        defaultValues: { name: '' },
    });

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleOpen = () => {
        if (!canCreateProject) {
            setVerifyOpen(true);
            return;
        }
        setOpen(true);
    };

    const onSubmit = async (data: NewProjectForm) => {
        try {
            await createProject({ name: data.name.trim() });
            reset();
            setOpen(false);
        } catch (err) {
            toast.error(t('error'));
        }
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleClose();
        }
    };

    return (
        <div className='pb-3 border-b border-foreground/20'>
            {/* Trigger Button */}
            <button
                onClick={handleOpen}
                className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-xl',
                    'h-11.5 px-4 text-[16px] font-semibold text-background',
                    'bg-foreground transition-all duration-200',
                    'hover:bg-foreground/90 hover:shadow-md hover:shadow-primary/20',
                    'active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'
                )}
            >
                <Plus className="h-3 w-3" strokeWidth={3} />
                <span>{t('button')}</span>
            </button>

            {/* Verify Info Dialog */}
            <InfoDialog
                open={verifyOpen}
                onOpenChange={setVerifyOpen}
                title={
                    <div className="flex flex-col items-center gap-3">
                        <Logo size="lg" priority />
                        <span className="text-xl font-bold text-primary">{t('verifyRequired')}</span>
                    </div>
                }
                description={t('verifyDescription')}
                confirmText={t('verifyLink')}
                onConfirm={() => {
                    setVerifyOpen(false);
                    window.location.href = '/setting';
                }}
                hideCancel
            />

            {/* Create Project Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-foreground/40 dark:bg-background/30 backdrop-blur-xs transition-opacity" />

                    {/* Card */}
                    <div
                        ref={modalRef}
                        className={cn(
                            'relative z-10 w-full max-w-md',
                            'rounded-3xl border border-primary/50 bg-card',
                            'px-12 py-8 shadow-md shadow-primary/40',
                            'animate-in fade-in zoom-in-95 duration-200'
                        )}
                    >
                        {/* Logo */}
                        <div className="mb-6 flex justify-center">
                            <Logo size="lg" priority />
                        </div>

                        {/* Header */}
                        <div className="text-center space-y-3">
                            <h2 className="text-xl font-bold text-primary">
                                {t('title')}
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {t('description')}
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 flex flex-col gap-5"
                        >
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-medium mx-2 text-foreground">
                                    {t('nameLabel')}
                                </Label>
                                <Input
                                    placeholder={t('namePlaceholder')}
                                    autoFocus
                                    className={cn(
                                        'h-12 rounded-2xl border-foreground/40 bg-muted/50 px-5',
                                        'text-foreground placeholder:text-muted-foreground/60',
                                        'transition-colors focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/20'
                                    )}
                                    disabled={isCreatingProject}
                                    {...register('name', {
                                        required: t('nameRequired'),
                                        minLength: { value: 2, message: t('nameMinLength') },
                                        maxLength: { value: 50, message: t('nameMaxLength') },
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isCreatingProject}
                                className={cn(
                                    'flex h-12 w-full items-center justify-center gap-2 rounded-2xl',
                                    'text-sm font-semibold text-background',
                                    'bg-foreground transition-all duration-200',
                                    'hover:bg-foreground/90 hover:shadow-lg hover:shadow-primary/20',
                                    'disabled:cursor-not-allowed disabled:opacity-60',
                                    'active:scale-[0.98]'
                                )}
                            >
                                {isCreatingProject ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>{t('creating')}</span>
                                    </>
                                ) : (
                                    t('create')
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}