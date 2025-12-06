"use client";

import { FolderOpen } from "lucide-react";
import { UserStatistics } from "@/types/statistics";

interface ProjectBreakdownProps {
  statistics: UserStatistics;
}

export function ProjectBreakdown({ statistics }: ProjectBreakdownProps) {
  const total = statistics.totalProjects;
  const draftPercent = total > 0 ? (statistics.draftProjects / total) * 100 : 0;
  const publishedPercent =
    total > 0 ? (statistics.publishedProjects / total) * 100 : 0;
  const archivedPercent =
    total > 0 ? (statistics.archivedProjects / total) * 100 : 0;

  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
        <FolderOpen className="h-5 w-5 text-green-500" />
        Status Proyek
      </h3>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="group cursor-pointer rounded-lg bg-yellow-50 p-4 text-center transition hover:bg-yellow-100">
          <p className="text-2xl font-bold text-yellow-600">
            {statistics.draftProjects}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-600">Draft</p>
          <p className="mt-1 text-xs text-neutral-400">
            {draftPercent.toFixed(0)}%
          </p>
        </div>

        <div className="group cursor-pointer rounded-lg bg-green-50 p-4 text-center transition hover:bg-green-100">
          <p className="text-2xl font-bold text-green-600">
            {statistics.publishedProjects}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-600">
            Dipublikasi
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            {publishedPercent.toFixed(0)}%
          </p>
        </div>

        <div className="group cursor-pointer rounded-lg bg-gray-50 p-4 text-center transition hover:bg-gray-100">
          <p className="text-2xl font-bold text-gray-600">
            {statistics.archivedProjects}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-600">
            Diarsipkan
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            {archivedPercent.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
