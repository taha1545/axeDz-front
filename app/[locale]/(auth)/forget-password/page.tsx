'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

import { useSendResetOtp } from '@/hooks/use-otp';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';
import { getErrorMessage } from '@/lib/get-error-message';

export default function ForgotPasswordPage() {
  //
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  const sendResetOtp = useSendResetOtp();

  const { register, handleSubmit, formState: { errors }, setError, clearErrors, } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    clearErrors('root');
    try {
      await sendResetOtp.mutateAsync(data);
      router.push(
        `/reset-password?email=${encodeURIComponent(data.email)}`
      );
    } catch (err) {
      setError('root', {
        message: getErrorMessage(err, t('sendFailed')),
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <Logo size="lg" priority withLink />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6 sm:max-w-md sm:gap-8">
        <div className="space-y-2 text-center sm:space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t('title')}
          </h1>

          <p className="text-sm text-muted-foreground sm:text-base">
            {t('description')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 sm:gap-6"
        >
          {errors.root && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
              disabled={sendResetOtp.isPending}
              {...register('email')}
            />

            {errors.email && (
              <p className="px-3 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-4xl sm:py-6 sm:text-lg"
            disabled={sendResetOtp.isPending}
          >
            {sendResetOtp.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                {t('sending')}
              </span>
            ) : (
              t('sendCode')
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t('rememberPassword')}{' '}
            <Link href="/login" className="text-primary underline">
              {t('login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}