'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaArrowLeft } from 'react-icons/fa';
import { EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { loginSchema, type LoginInput } from '@/schemas/auth';

export default function LoginForm() {
  const t = useTranslations('auth.login');

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    clearErrors('root');

    try {
      await login(data);

      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      const message =
        err &&
          typeof err === 'object' &&
          'response' in err &&
          err.response &&
          typeof err.response === 'object' &&
          'data' in err.response &&
          err.response.data &&
          typeof err.response.data === 'object' &&
          'message' in err.response.data &&
          typeof err.response.data.message === 'string'
          ? err.response.data.message
          : t('loginFailed');

      setError('root', { message });
    }
  };

  return (
    <>
      <Link
        href="/"
        className="absolute top-0 left-0 flex items-center gap-2 p-3 text-sm text-foreground/80"
      >
        <FaArrowLeft />
        {t('home')}
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5 border-b-2 h-[90vh] justify-center border-r-foreground border-border bg-background px-6 py-10 md:py-2 sm:px-10 lg:w-1/2 lg:border-b-0 lg:border-r-2 lg:px-20"
      >
        <h1 className="mx-auto  mb-2 rounded-xl bg-foreground px-5 py-3 text-2xl font-bold text-background">
          {t('title')}
        </h1>

        {errors.root && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.root.message}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Label className="px-3 text-sm text-foreground">
            {t('emailOrPhone')}
          </Label>

          <Input
            type="text"
            placeholder={t('emailOrPhonePlaceholder')}
            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
            {...register('identifier')}
          />

          {errors.identifier && (
            <p className="px-3 text-xs text-destructive">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-3">
            <Label className="text-sm text-foreground">
              {t('password')}
            </Label>

            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              {showPassword ? t('hide') : t('show')}
            </button>
          </div>

          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('passwordPlaceholder')}
            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
            {...register('password')}
          />

          {errors.password && (
            <p className="px-3 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}

          <Link
            href="/forget-password"
            className="w-fit px-3.5 py-0.5 text-sm text-muted-foreground underline"
          >
            {t('resetPassword')}
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="rounded-3xl py-6 text-base"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? t('loggingIn') : t('loginButton')}
        </Button>

        <div className="my-2 flex items-center gap-1 text-sm text-muted-foreground">
          <div className="flex-1 border-t border-border" />
          {t('or')}
          <div className="flex-1 border-t border-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-3xl py-5 text-base"
          onClick={() =>
          (window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/google`)
          }
        >
          <FcGoogle size={20} />
          {t('continueGoogle')}
        </Button>

        <Button
          type="button"
          size="lg"
          className="rounded-3xl bg-foreground py-5 text-base text-muted hover:bg-foreground/90"
          onClick={() =>
          (window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/github`)
          }
        >
          <FaGithub size={20} />
          {t('continueGithub')}
        </Button>

        <p className="mx-auto mt-1 text-xs text-muted-foreground">
          {t('agreement')}{' '}
          <Link href="/privacy" className="underline">
            {t('privacyPolicy')}
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="underline">
            {t('termsOfService')}
          </Link>
          .
        </p>
      </form>
    </>
  );
}
