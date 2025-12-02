import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Creates Supabase client for middleware
 * This is optimized for edge runtime and handles cookie management
 *
 * @param request - The incoming Next.js request
 * @returns Tuple of [supabase client, response object]
 */
export async function createMiddlewareClient(request: NextRequest) {
  // Create response object to modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables in middleware");
    return { supabase: null, response };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Set cookies on the request for immediate access
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );

        // Update response with new cookies
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });

        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
    },
  });

  return { supabase, response };
}

/**
 * Helper to refresh session in middleware
 * Call this in your root middleware.ts
 */
export async function updateSession(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request);

  if (!supabase) {
    return response;
  }

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If there's an error or no user, let the request proceed
  // Individual pages can handle authentication
  if (error || !user) {
    console.warn("No authenticated user in middleware:", error?.message);
  }

  return response;
}
