"use client";

import { Flame } from "lucide-react";
import { UserStatistics } from "@/types/statistics";

interface MostUsedTemplateProps {
  statistics: UserStatistics;
}

export function MostUsedTemplate({ statistics }: MostUsedTemplateProps) {
  if (!statistics.mostUsedTemplate) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
        <Flame className="h-5 w-5 text-orange-500" />
        Template Paling Sering Digunakan
      </h3>

      <div className="mt-4 overflow-hidden rounded-lg bg-gradient-to-r from-orange-50 via-purple-50 to-pink-50 transition hover:shadow-md">
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="font-semibold text-neutral-900">
              {statistics.mostUsedTemplate.title}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Digunakan{" "}
              <span className="font-bold text-orange-600">
                {statistics.mostUsedTemplate.usageCount}x
              </span>
            </p>
          </div>
          <Flame className="h-8 w-8 animate-pulse text-orange-500" />
        </div>
      </div>
    </div>
  );
}
