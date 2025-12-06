"use client";

import { Activity, Clock } from "lucide-react";
import { UserStatistics } from "@/types/statistics";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface RecentActivityProps {
    statistics: UserStatistics;
}

export function RecentActivity({ statistics }: RecentActivityProps) {
    const displayedActivities = statistics.recentActivity.slice(0, 5);

    return (
        <div className="rounded-xl border bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
                <Activity className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                Aktivitas Terbaru
            </h3>

            <div className="mt-4 space-y-3">
                {displayedActivities.map((activity, index) => (
                    <div key={activity.id} className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition hover:border-purple-100 hover:bg-purple-50/50 dark:hover:border-purple-800 dark:hover:bg-purple-900/20">
                        {/* Icon */}
                        <div className="shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-pink-100 text-lg">{activity.icon}</div>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">{activity.description}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                <Clock className="h-3 w-3" />
                                <span>
                                    {formatDistanceToNow(new Date(activity.timestamp), {
                                        addSuffix: true,
                                        locale: localeId,
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Badge (optional) */}
                        {index === 0 && <span className="shrink-0 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">Terbaru</span>}
                    </div>
                ))}

                {statistics.recentActivity.length > 5 && (
                    <button className="w-full rounded-lg border border-dashed border-neutral-300 py-2 text-sm text-neutral-500 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400">Lihat semua aktivitas ({statistics.recentActivity.length})</button>
                )}

                {statistics.recentActivity.length === 0 && <p className="py-8 text-center text-sm text-neutral-400 dark:text-neutral-500">Belum ada aktivitas</p>}
            </div>
        </div>
    );
}
