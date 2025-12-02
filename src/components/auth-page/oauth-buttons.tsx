"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface OAuthButtonsProps {
  redirectTo?: string;
}

/**
 * OAuthButtons Component
 * Provides Google OAuth authentication button
 *
 * @example
 * <OAuthButtons redirectTo="/dashboard" />
 */
export function OAuthButtons({ redirectTo = "/app/test" }: OAuthButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("OAuth error:", error);
        toast.error("Gagal login dengan Google. Silakan coba lagi");
      }
    } catch (error) {
      console.error("OAuth error:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi");
    } finally {
      // Don't set loading to false as user will be redirected
      // setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-[#E0E1E2] bg-[#F9FAFB] transition duration-200 hover:border-[#C7C9CB] hover:bg-[#E8ECF1] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path
                fill="#fbc02d"
                d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z"
              />
              <path
                fill="#e53935"
                d="M6.3 14.6l6.6 4.8C14.4 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.3 0-13.6 3.9-17.1 9.6z"
              />
              <path
                fill="#4caf50"
                d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.6 35.7 26.9 37 24 37c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10.3 39.6 16.7 44 24 44z"
              />
              <path
                fill="#1565c0"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.1 7.2l6.2 5.2c-0.4 0.3 6.6-4.8 6.6-13.9 0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>
            <p className="font-medium text-neutral-900">Login dengan Google</p>
          </>
        )}
      </button>
    </div>
  );
}

/**
 * GoogleIcon Component
 * Reusable Google icon SVG
 */
export function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path
        fill="#fbc02d"
        d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#e53935"
        d="M6.3 14.6l6.6 4.8C14.4 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.3 0-13.6 3.9-17.1 9.6z"
      />
      <path
        fill="#4caf50"
        d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.6 35.7 26.9 37 24 37c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10.3 39.6 16.7 44 24 44z"
      />
      <path
        fill="#1565c0"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.1 7.2l6.2 5.2c-0.4 0.3 6.6-4.8 6.6-13.9 0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
