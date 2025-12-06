"use client";

import { useState, useEffect } from "react";
import { UserStatistics } from "@/types/statistics";
import { dummyUserStatistics } from "@/store/statisticStore";

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

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setStatistics(dummyUserStatistics);
      setLoading(false);
    }, 500);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setStatistics(dummyUserStatistics);
      setLoading(false);
    }, 500);
  };

  return { statistics, loading, error, refetch };
}
