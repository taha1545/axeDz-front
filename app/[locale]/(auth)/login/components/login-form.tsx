'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/hooks/use-auth';
import { getErrorMessage } from '@/lib/get-error-message';
import { loginSchema, type LoginInput } from '@/schemas/auth';

export default function LoginForm() {
  //
  const t = useTranslations('auth.login');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  //
  const { login, isLoggingIn } = useAuth();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });
  //
  const onSubmit = async (data: LoginInput) => {
    clearErrors('root');
    try {
      await login(data);
      router.push('/dashboard');
    } catch (err) {
      setError('root', {
        message: getErrorMessage(err, t('loginFailed')),
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex md:h-[80vh]  w-full flex-col justify-center gap-3 border-b-2 border-r-foreground border-border  px-6 py-10 md:py-2 sm:px-10 lg:w-1/2 lg:border-r-2 lg:border-b-0 lg:px-20"
      >
        <h1 className="mx-auto mb-2 rounded-xl bg-foreground px-6 py-2  text-3xl font-semibold text-background">
          {t('title')}
        </h1>

        {errors.root && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
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
              onClick={() => setShowPassword((prev) => !prev)}
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
          className="rounded-3xl h-12.5 text-base font-semibold"
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
          className="rounded-3xl h-12 text-base"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
          }}
        >
          <FcGoogle size={20} />
          {t('continueGoogle')}
        </Button>

        <Button
          type="button"
          size="lg"
          className="rounded-3xl bg-foreground h-12 flex items-center justify-center font-bold text-base text-background transition-colors hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github`;
          }}
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