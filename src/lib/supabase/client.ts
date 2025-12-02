import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Creates or returns existing Supabase browser client (singleton pattern)
 * Use this in Client Components only
 *
 * @example
 * const supabase = createClient()
 * const { data, error } = await supabase.auth.signIn(...)
 */
export function createClient() {
  // Singleton pattern - reuse client instance
  if (client) return client;

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: "pkce", // More secure than implicit flow
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
    // Optional: Add global fetch options
    global: {
      headers: {
        "x-application-name": "rotanera",
      },
    },
  });

  return client;
}

/**
 * Reset client instance (useful for testing)
 */
export function resetClient() {
  client = null;
}
