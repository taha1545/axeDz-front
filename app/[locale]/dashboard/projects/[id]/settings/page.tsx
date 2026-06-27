'use client';

import { useParams, useRouter } from 'next/navigation';
import { useApiKeyDetail, useUpdateApiKeyName, useDeleteApiKey } from '@/hooks/use-key';
import { SettingsPage } from './components/settings-page';

export default function SettingsPageRoute() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);
    const router = useRouter();

    const { data: apiKey, isLoading } = useApiKeyDetail(numericId);
    const renameMutation = useUpdateApiKeyName();
    const deleteMutation = useDeleteApiKey();

    if (isLoading) return null;

    const handleRename = async (name: string) => {
        await renameMutation.mutateAsync({ id: numericId, project_name: name });
    };

    const handleDelete = async () => {
        await deleteMutation.mutateAsync(numericId);
        router.push('/dashboard');
    };

    return (
        <SettingsPage
            apiKey={apiKey}
            onRenameProject={handleRename}
            onDeleteProject={handleDelete}
            isRenaming={renameMutation.isPending}
            isDeleting={deleteMutation.isPending}
        />
    );
}