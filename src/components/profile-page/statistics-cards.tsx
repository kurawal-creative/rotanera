"use client";

import { Flame, Heart, FolderOpen, TrendingUp } from "lucide-react";
import { UserStatistics } from "@/types/statistics";

interface StatisticsCardsProps {
  statistics: UserStatistics;
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const statCards = [
    {
      label: "Template Digunakan",
      value: statistics.templatesUsed,
      subtitle: "Unique templates",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Total Penggunaan",
      value: statistics.totalTemplateUsage,
      subtitle: "Total uses",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Template Favorit",
      value: statistics.favoriteTemplatesCount,
      subtitle: "Saved favorites",
      icon: Heart,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Total Proyek",
      value: statistics.totalProjects,
      subtitle: "All projects",
      icon: FolderOpen,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-xl border bg-white p-6 transition hover:border-purple-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-500">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-neutral-400">{stat.subtitle}</p>
            </div>
            <div
              className={`rounded-lg ${stat.bgColor} p-3 transition group-hover:scale-110`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
