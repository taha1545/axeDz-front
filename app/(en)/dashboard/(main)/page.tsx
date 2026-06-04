"use client";

import { DashboardPageHeader } from "../components/dashboard-page-header";
import { useDashboard } from "../components/dashboard-provider";

export default function DashboardPage() {
  const { activeProject, wallet } = useDashboard();

  return (
    <>
      <DashboardPageHeader
        title="Home"
        description={`Overview for ${activeProject.name} — ${activeProject.mode} mode`}
      />
    </>
  );
}
