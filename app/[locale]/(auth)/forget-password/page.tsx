'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSendResetOtp } from '@/hooks/use-otp';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';
import { Logo } from '@/components/logo';

export default function ForgotPasswordPage() {
  //
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  const sendResetOtp = useSendResetOtp();
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });
  //
  const onSubmit = async (data: ForgotPasswordInput) => {
    clearErrors('root');
    try {
      await sendResetOtp.mutateAsync(data);
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      let message = t('sendFailed');
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object'
      ) {
        const res = err.response.data as Record<string, unknown>;
        if (
          'errors' in res &&
          Array.isArray(res.errors) &&
          res.errors.length > 0 &&
          res.errors[0] &&
          typeof res.errors[0] === 'object' &&
          'message' in res.errors[0] &&
          typeof res.errors[0].message === 'string'
        ) {
          message = res.errors[0].message;
        } else if ('message' in res && typeof res.message === 'string') {
          message = res.message;
        }
      }
      setError('root', { message });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Logo size="lg" priority withLink />
      </div>

      <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-6 sm:gap-8">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">{t('title')}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t('description')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
          {errors.root && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
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
              <p className="px-3 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="rounded-4xl w-full sm:py-6 sm:text-lg"
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
            <Link href="/login" className="underline text-primary">
              {t('login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}