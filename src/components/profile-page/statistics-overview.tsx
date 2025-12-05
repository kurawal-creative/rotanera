"use client";

import { useStatistics } from "@/hooks/use-statistics";
import { StatisticsCards } from "./statistics-cards";
import { ProjectBreakdown } from "./project-breakdown";
import { MostUsedTemplate } from "./most-used-template";
import { RecentActivity } from "./recent-activity";
import { AccountInfo } from "./account-info";

export function StatisticsOverview() {
  const { statistics, loading, error } = useStatistics();

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />
          <p className="text-sm text-neutral-500">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-center text-sm text-red-600">
          ❌ Gagal memuat statistik. Silakan coba lagi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatisticsCards statistics={statistics} />

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <MostUsedTemplate statistics={statistics} />
          <ProjectBreakdown statistics={statistics} />
        </div>

        <div className="space-y-6">
          <RecentActivity statistics={statistics} />
          <AccountInfo statistics={statistics} />
        </div>
      </div>
    </div>
  );
}
