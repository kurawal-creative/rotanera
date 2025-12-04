import { AUTH_CONFIG } from "./config";

export function matchesRoute(
  pathname: string,
  routes: readonly string[],
): boolean {
  return routes.some((route) => pathname.startsWith(route));
}

export function isProtectedRoute(pathname: string): boolean {
  return matchesRoute(pathname, AUTH_CONFIG.protected);
}

export function isAuthRoute(pathname: string): boolean {
  return matchesRoute(pathname, AUTH_CONFIG.auth);
}

export function isPublicRoute(pathname: string): boolean {
  return AUTH_CONFIG.public.some(
    (route: string) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
