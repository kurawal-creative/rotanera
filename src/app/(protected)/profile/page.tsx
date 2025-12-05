"use client";

import { Topbar } from "@/components/app-topbar";
import { StatisticsOverview } from "@/components/profile-page/statistics-overview";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Calendar, ChartColumnBig } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-neutral-50">
      <Topbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-xl border bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                {user?.user_metadata?.full_name || "User"}
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div>
          <div className="flex flex-row gap-3">
            <ChartColumnBig className=""></ChartColumnBig>
            <h2 className="mb-6 text-xl font-bold text-neutral-900">
              Statistik Penggunaan
            </h2>
          </div>
          <StatisticsOverview />
        </div>
      </div>
    </div>
  );
}
