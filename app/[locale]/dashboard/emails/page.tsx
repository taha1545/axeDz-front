import { getPageMetadata, type Locale } from '@/lib/metadata';
import { mockEmailRecords } from './data/mock-email-records';
import { EmailsPage } from './components/emails-page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata('/dashboard', locale as Locale);
}

export default function EmailsPageRoute() {
    return <EmailsPage records={mockEmailRecords} />;
}
