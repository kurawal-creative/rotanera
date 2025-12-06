"use client";

import { useState, useEffect } from "react";
import { UserStatistics } from "@/types/statistics";
import { dummyUserStatistics } from "@/store/statisticStore";
import { useAuth } from "@/hooks/use-auth";

interface UseStatisticsReturn {
    statistics: UserStatistics | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook to fetch user statistics (using dummy data for now)
 *
 * @example
 * const { statistics, loading } = useStatistics();
 */
export function useStatistics(): UseStatisticsReturn {
    const [statistics, setStatistics] = useState<UserStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        // Wait for auth to finish loading
        if (authLoading) {
            return;
        }

        // Simulate API loading delay
        const timer = setTimeout(() => {
            // Merge dummy data with actual user data
            const actualStatistics = {
                ...dummyUserStatistics,
                // Use actual user's created_at date if available
                joinDate: user?.created_at || dummyUserStatistics.joinDate,
                // Update last active to current time
                lastActive: new Date().toISOString(),
            };

            console.log("User created_at:", user?.created_at);
            console.log("Statistics joinDate:", actualStatistics.joinDate);

            setStatistics(actualStatistics);
            setLoading(false);
        }, 500);

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
    }, [user, authLoading]);

    const refetch = () => {
        setLoading(true);
        setTimeout(() => {
            const actualStatistics = {
                ...dummyUserStatistics,
                joinDate: user?.created_at || dummyUserStatistics.joinDate,
                lastActive: new Date().toISOString(),
            };

            setStatistics(actualStatistics);
            setLoading(false);
        }, 500);
    };

    return { statistics, loading, error, refetch };
}
