'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LoginAside() {
  const t = useTranslations('auth.login');

  const features = [
    'feature1',
    'feature2',
    'feature3',
    'feature4',
  ] as const;

  return (
    <aside className="flex w-full flex-col gap-5 px-6 py-10 sm:px-10 lg:w-1/2 lg:px-20">
      <h1 className="text-2xl font-bold text-primary mx-auto md:mx-0">AxeDz</h1>

      <h2 className="text-3xl font-bold">{t('asideTitle')}</h2>

      <ul className="list-inside list-disc space-y-8 py-4 text-muted-foreground">
        {features.map((key) => (
          <li key={key}>{t(`features.${key}`)}</li>
        ))}
      </ul>

      <Link
        href="/signup"
        className="rounded-3xl bg-foreground py-3 font-bold text-center text-base text-background transition-colors hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90"
      >
        {t('createAccount')}
      </Link>
    </aside>
  );
}