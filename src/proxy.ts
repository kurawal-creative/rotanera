import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { isProtectedRoute, isAuthRoute } from "@/lib/auth/utils";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create Supabase client with cookie handling
  const { supabase, response } = await createMiddlewareClient(request);

  if (!supabase) {
    return response;
  }

  // Check authentication status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const loginUrl = new URL(AUTH_CONFIG.defaultLoginRedirect, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.defaultAuthRedirect, request.url),
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
