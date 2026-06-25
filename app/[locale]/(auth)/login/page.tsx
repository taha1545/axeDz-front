import LoginForm from "./components/login-form";
import LoginAside from "./components/login-aside";
import { getPageMetadata, type Locale } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('/login', locale as Locale);
}

export default function LoginPage() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center items-center ">
      <LoginForm />
      <LoginAside />
    </main>
  );
}