import { getPageMetadata, type Locale } from '@/lib/metadata';
import { mockSmsRecords } from './data/mock-sms-records';
import { SmsPage } from './components/sms-page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata('/dashboard', locale as Locale);
}

export default function SmsPageRoute() {
    return <SmsPage records={mockSmsRecords} />;
}
