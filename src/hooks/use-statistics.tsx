"use client";

import { useState, useEffect, useCallback } from "react";
import { UserStatistics } from "@/types/statistics";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

interface UseStatisticsReturn {
    statistics: UserStatistics | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook to fetch user statistics from API
 *
 * @example
 * const { statistics, loading } = useStatistics();
 */
export function useStatistics(): UseStatisticsReturn {
    const [statistics, setStatistics] = useState<UserStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, loading: authLoading } = useAuth();

    const fetchStatistics = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("/api/user/statistics");
            setStatistics(response.data);
        } catch (err) {
            console.error("Error fetching statistics:", err);
            setError("Failed to load statistics");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        // Wait for auth to finish loading
        if (authLoading) {
            return;
        }

        fetchStatistics();
    }, [fetchStatistics, authLoading]);

    const refetch = () => {
        fetchStatistics();
    };

    return { statistics, loading, error, refetch };
}
