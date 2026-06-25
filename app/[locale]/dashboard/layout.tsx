import { DashboardShell } from './components/dashboard-shell';
import type { ReactNode } from 'react';
import type { Project, DashboardUser } from '@/types/dashboard';

export default function DashboardLayout({ children }: {
    children: ReactNode;
}) {
    const mockUser: DashboardUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0555123456',
        is_verified: true,
        imagePath: null,
        role: 'user',
        plan: 'free',
        wallet: {
            balance: '0.00',
            currency: 'DZD',
            is_free: true,
        },
    };

    const mockProjects: Project[] = [
        { id: '1', name: 'My App Production', status: 'active', environment: 'production', createdAt: '2024-01-15', lastActive: '2m ago' },
        { id: '2', name: 'E-Commerce API', status: 'active', environment: 'production', createdAt: '2024-02-20', lastActive: '5m ago' },
        { id: '3', name: 'Auth Service v2', status: 'active', environment: 'staging', createdAt: '2024-03-10', lastActive: '1h ago' },
        { id: '4', name: 'Payment Gateway', status: 'inactive', environment: 'production', createdAt: '2024-01-28', lastActive: '3d ago' },
        { id: '5', name: 'Notification Worker', status: 'active', environment: 'development', createdAt: '2024-04-05', lastActive: '10m ago' },
        { id: '6', name: 'Analytics Pipeline', status: 'suspended', environment: 'production', createdAt: '2023-11-12', lastActive: '2w ago' },
        { id: '7', name: 'User Dashboard', status: 'active', environment: 'staging', createdAt: '2024-05-18', lastActive: '1m ago' },
    ];

    return (
        <DashboardShell
            user={mockUser}
            projects={mockProjects}
            initialProject={mockProjects[0]}
        >
            {children}
        </DashboardShell>
    );
}