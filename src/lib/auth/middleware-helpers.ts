import { NextRequest, NextResponse } from 'next/server';

/**
 * Define your route configurations
 */
export const routeConfig = {
  protected: ['/dashboard', '/profile', '/app', '/settings'],
  auth: ['/login', '/register'],
  public: ['/', '/about', '/contact'],
  defaultAuthRedirect: '/app/test',  // Where to send authenticated users
  defaultLoginRedirect: '/login',     // Where to send unauthenticated users
};

/**
 * Check if user is authenticated based on cookies
 */
export function isAuthenticated(request: NextRequest): boolean {
  // Check for Supabase session cookies
  const accessToken = request.cookies.get('sb-access-token');
  const refreshToken = request.cookies.get('sb-refresh-token');

  return !!(accessToken && refreshToken);
}

/**
 * Check if the current path matches any of the given routes
 */
export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route));
}

/**
 * Handle authentication redirects
 */
export function handleAuthRedirect(
  request: NextRequest,
  isAuth: boolean
): NextResponse | null {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = matchesRoute(pathname, routeConfig.protected);
  const isAuthRoute = matchesRoute(pathname, routeConfig.auth);

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuth) {
    const loginUrl = new URL(routeConfig.defaultLoginRedirect, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuth) {
    return NextResponse.redirect(
      new URL(routeConfig.defaultAuthRedirect, request.url)
    );
  }

  return null; // No redirect needed
}
