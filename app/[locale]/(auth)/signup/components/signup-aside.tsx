'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SignupAside() {
  const t = useTranslations('auth.signup');

  const features = [
    'feature1',
    'feature2',
    'feature3',
    'feature4',
  ] as const;

  return (
    <aside className="hidden lg:flex lg:w-1/2 border-l-2 h-[90vh] my-auto border-foreground bg-background">
      <div className="flex w-full flex-col justify-center px-20">
        <h1 className="text-2xl font-bold text-primary">
          AxeDz
        </h1>

        <h2 className="mt-7 text-3xl font-bold tracking-tight">
          {t('asideTitle')}
        </h2>

        <ul className="mt-12 list-inside list-disc space-y-8 text-muted-foreground">
          {features.map((key) => (
            <li key={key}>{t(`features.${key}`)}</li>
          ))}
        </ul>

        <Link
          href="/login"
          className="mt-7 rounded-3xl bg-foreground py-3 text-center text-base font-bold text-background transition-colors hover:bg-foreground/90"
        >
          {t('login')}
        </Link>
      </div>
    </aside>
  );
}