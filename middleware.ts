import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({ locales: ['en', 'fr'], defaultLocale: 'en', localePrefix: 'always', });


export default createMiddleware(routing);


export const config = { matcher: ['/', '/((?!_next|api|.*\\..*).*)',], };