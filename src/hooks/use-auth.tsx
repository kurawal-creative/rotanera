"use client";

import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Custom hook for client-side authentication
 * Provides user state, session, and auth methods
 *
 * @example
 * const { user, loading, signOut } = useAuth();
 *
 * if (loading) return <div>Loading...</div>;
 * if (!user) return <div>Not authenticated</div>;
 *
 * return <button onClick={signOut}>Logout</button>;
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Refresh user data
  const refreshUser = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);

      // Call the signout API
      await fetch("/auth/signout", {
        method: "POST",
      });

      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear local state
      setUser(null);
      setSession(null);

      // Redirect to home
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: string, currentSession: Session | null) => {
        console.log("Auth state changed:", event);

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);

        // Handle specific events
        if (event === "SIGNED_IN") {
          router.refresh();
        }

        if (event === "SIGNED_OUT") {
          router.push("/");
          router.refresh();
        }

        if (event === "TOKEN_REFRESHED") {
          console.log("Token refreshed");
        }

        if (event === "USER_UPDATED") {
          console.log("User updated");
        }
      },
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return {
    user,
    session,
    loading,
    signOut,
    refreshUser,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 *
 * @example
 * const { user, loading } = useRequireAuth();
 *
 * if (loading) return <div>Loading...</div>;
 * // User is guaranteed to be authenticated here
 */
export function useRequireAuth(redirectTo: string = "/login"): UseAuthReturn {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push(redirectTo);
    }
  }, [auth.loading, auth.user, router, redirectTo]);

  return auth;
}
