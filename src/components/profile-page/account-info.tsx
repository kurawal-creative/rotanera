"use client";

import { Calendar, Clock } from "lucide-react";
import { UserStatistics } from "@/types/statistics";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface AccountInfoProps {
  statistics: UserStatistics;
}

export function AccountInfo({ statistics }: AccountInfoProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="text-lg font-semibold text-neutral-900">Informasi Akun</h3>

      <div className="mt-4 space-y-4">
        {/* Join Date */}
        <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-neutral-500">
              Bergabung sejak
            </p>
            <p className="mt-0.5 text-sm font-semibold text-neutral-900">
              {format(new Date(statistics.joinDate), "dd MMMM yyyy", {
                locale: localeId,
              })}
            </p>
          </div>
        </div>

        {/* Last Active */}
        <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-neutral-500">
              Terakhir aktif
            </p>
            <p className="mt-0.5 text-sm font-semibold text-neutral-900">
              {format(new Date(statistics.lastActive), "dd MMM yyyy, HH:mm", {
                locale: localeId,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
