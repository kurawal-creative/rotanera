import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { isAuthenticated, handleAuthRedirect } from '@/lib/auth/middleware-helpers';

export async function middleware(request: NextRequest) {
  // 1. Update Supabase session (handles cookie refresh)
  const response = await updateSession(request);

  // 2. Check if user is authenticated
  const isAuth = isAuthenticated(request);

  // 3. Handle route protection and redirects
  const redirect = handleAuthRedirect(request, isAuth);

  return redirect || response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
