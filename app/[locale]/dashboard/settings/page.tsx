import { getPageMetadata, type Locale } from '@/lib/metadata';
import { SettingsPage } from './components/settings-page';
import type { Project } from '@/types/dashboard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata('/dashboard', locale as Locale);
}

const mockProject: Project = {
    id: 'proj_abc123',
    name: 'My App Production',
    status: 'active',
    environment: 'production',
    createdAt: '2024-01-15',
    lastActive: '2m ago',
};

export default function SettingsPageRoute() {
    const mockRenameProject = async (_name: string) => {
        'use server';
        // Mock: will be replaced with real API call
        console.log('[Mock] Rename project');
    };

    const mockDeleteProject = async () => {
        'use server';
        // Mock: will be replaced with real API call
        console.log('[Mock] Delete project');
    };

    return (
        <SettingsPage
            project={mockProject}
            onRenameProject={mockRenameProject}
            onDeleteProject={mockDeleteProject}
        />
    );
}
