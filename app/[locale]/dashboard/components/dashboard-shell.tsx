'use client';

import { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar/navbar';
import { ProjectSelectModal } from './navbar/project-select-modal';
import { useDashboardContext } from '@/providers/dashboard-provider';
import type { Project, DashboardUser } from '@/types/dashboard';

interface DashboardShellProps {
    children: React.ReactNode;
    user?: DashboardUser | null;
    projects: Project[];
    initialProject?: Project;
}

export function DashboardShell({
    children,
    user,
    projects,
    initialProject,
}: DashboardShellProps) {
    const { setCurrentProject } = useDashboardContext();

    const [currentProject, setCurrentProjectLocal] = useState<Project | undefined>(initialProject);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const mount = () => {
            setCurrentProjectLocal(initialProject);
        }
        mount();
    }, [initialProject]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setCurrentPage(1);
        setSearchQuery('');
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const handleSelect = useCallback((project: Project) => {
        setCurrentProjectLocal(project);
        setCurrentProject(project);
        setIsModalOpen(false);
    }, [setCurrentProject]);

    return (
        <div className="flex relative h-screen w-full overflow-hidden bg-background">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar
                    user={user}
                    projects={projects}
                    currentProject={currentProject}
                    onOpenProjectModal={openModal}
                />

                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            <ProjectSelectModal
                open={isModalOpen}
                onClose={closeModal}
                projects={projects}
                currentProject={currentProject}
                onSelect={handleSelect}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
