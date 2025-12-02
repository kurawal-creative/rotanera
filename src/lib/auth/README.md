# Authentication System Documentation

## 🔐 Overview

This authentication system uses **Supabase Auth** with Next.js 16 App Router, providing:

- ✅ Email/Password authentication
- ✅ OAuth (Google) authentication
- ✅ Session management with cookies
- ✅ Protected routes via middleware
- ✅ Server and Client components support
- ✅ TypeScript support
- ✅ Form validation

---

## 📁 File Structure

```
rotanera/
├── middleware.ts                          # Root middleware (route protection)
├── src/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Browser client (Client Components)
│   │   │   ├── server.ts                 # Server client (Server Components/API)
│   │   │   └── middleware.ts             # Middleware client (session refresh)
│   │   └── auth/
│   │       ├── middleware-helpers.ts     # Route protection logic
│   │       └── README.md                 # This file
│   ├── hooks/
│   │   └── use-auth.tsx                  # Client-side auth hook
│   ├── components/
│   │   └── auth-page/
│   │       ├── auth-provider.tsx         # Auth context provider
│   │       ├── sign-in-form.tsx          # Login form
│   │       ├── sign-up-form.tsx          # Registration form
│   │       ├── oauth-buttons.tsx         # OAuth login buttons
│   │       └── index.ts                  # Exports
│   └── app/
│       ├── (api)/
│       │   └── auth/
│       │       ├── login/route.ts        # Login API endpoint
│       │       ├── signup/route.ts       # Signup API endpoint
│       │       └── signout/route.ts      # Signout API endpoint
│       └── (auth)/
│           ├── auth/callback/route.ts    # OAuth callback handler
│           ├── login/page.tsx            # Login page
│           └── register/page.tsx         # Register page
```

---

## 🚀 Quick Start

### 1. Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Optional (admin operations)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Configure Supabase Dashboard

1. Go to Supabase Dashboard > Authentication
2. Enable **Email** provider
3. Enable **Google** OAuth provider
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
5. Configure email templates (optional)

### 3. Update Protected Routes

Edit `src/lib/auth/middleware-helpers.ts`:

```typescript
export const routeConfig = {
  protected: ['/dashboard', '/profile', '/app', '/settings'],
  auth: ['/login', '/register'],
  public: ['/', '/about', '/contact'],
  defaultAuthRedirect: '/dashboard',  // Where authenticated users go
  defaultLoginRedirect: '/login',     // Where unauthenticated users go
};
```

---

## 📖 Usage Examples

### Client Component (Using Hook)

```tsx
'use client'

import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
```

### Server Component

```tsx
import { getCurrentUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  return <div>Dashboard for {user.email}</div>
}
```

### API Route Handler

```typescript
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ user })
}
```

### Using Auth Components

```tsx
'use client'

import { SignInForm, OAuthButtons } from '@/components/auth-page'

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <SignInForm redirectTo="/dashboard" />
      
      <div className="divider">atau</div>
      
      <OAuthButtons redirectTo="/dashboard" />
    </div>
  )
}
```

### Using Auth Provider

Wrap your app in `layout.tsx`:

```tsx
import { AuthProvider } from '@/components/auth-page'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

Then use context anywhere:

```tsx
'use client'

import { useAuthContext } from '@/components/auth-page'

export function UserMenu() {
  const { user, signOut } = useAuthContext()
  
  return (
    <div>
      {user?.email}
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
```

---

## 🔒 Security Best Practices

### ✅ DO's

1. **Use PKCE flow** (already configured)
   ```typescript
   auth: {
     flowType: 'pkce', // More secure than implicit
   }
   ```

2. **Validate inputs server-side** (already implemented)
   - All API routes validate email format
   - Password strength validation
   - SQL injection protection via Supabase

3. **Use Row Level Security (RLS)** in Supabase
   ```sql
   -- Example RLS policy
   CREATE POLICY "Users can only see their own data"
   ON users FOR SELECT
   USING (auth.uid() = auth_id);
   ```

4. **Never expose service role key** on client
   - Only use in server-side code
   - Never commit to version control

5. **Implement rate limiting** (recommended)
   ```typescript
   // Use Upstash or Vercel KV for rate limiting
   import { Ratelimit } from "@upstash/ratelimit"
   ```

### ❌ DON'Ts

1. **Don't store passwords in your database**
   - Supabase handles this securely
   - Never hash passwords manually

2. **Don't trust client-side validation alone**
   - Always validate on server

3. **Don't expose sensitive user data**
   - Only return necessary fields

4. **Don't use `createServerSupabaseAdmin()` unnecessarily**
   - It bypasses Row Level Security

---

## 🛠️ API Endpoints

### POST /auth/signup

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "message": "Akun berhasil dibuat",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Response (400):**
```json
{
  "error": "Email sudah terdaftar"
}
```

---

### POST /auth/login

Authenticate user with email/password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "message": "Login berhasil",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Response (401):**
```json
{
  "error": "Email atau password salah"
}
```

---

### POST /auth/signout

Logout the current user.

**Response (200):**
```json
{
  "message": "Logout berhasil"
}
```

---

### GET /auth/callback

OAuth callback handler (automatic redirect).

**Query Parameters:**
- `code`: OAuth authorization code
- `next`: Redirect URL after authentication (optional)
- `error`: Error message (if OAuth failed)

---

## 🔄 Authentication Flow

### Email/Password Registration

1. User fills signup form
2. Client validates inputs
3. POST to `/auth/signup`
4. Server validates and creates Supabase Auth user
5. Supabase sends verification email (if enabled)
6. User clicks email link
7. Redirected to `/auth/callback`
8. Session established

### Email/Password Login

1. User fills login form
2. Client validates inputs
3. POST to `/auth/login`
4. Server validates credentials via Supabase
5. Session cookies set automatically
6. User redirected to dashboard

### Google OAuth

1. User clicks "Login with Google"
2. `supabase.auth.signInWithOAuth()` called
3. Redirected to Google consent screen
4. User approves
5. Google redirects to `/auth/callback?code=xxx`
6. Server exchanges code for session
7. Session established
8. User redirected to app

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:** Check `.env.local` has correct variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

---

### Issue: OAuth redirect not working

**Solution:** 
1. Check Supabase Dashboard > Authentication > URL Configuration
2. Add redirect URLs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
3. Ensure callback route exists at `app/(auth)/auth/callback/route.ts`

---

### Issue: "Email not confirmed" error

**Solution:**
1. Check Supabase Dashboard > Authentication > Email Templates
2. Enable email confirmation or disable it for development:
   - Dashboard > Authentication > Settings
   - Uncheck "Enable email confirmations"

---

### Issue: User logged in but middleware redirects to login

**Solution:** Check cookie names in middleware-helpers.ts:
```typescript
const accessToken = request.cookies.get('sb-access-token')
const refreshToken = request.cookies.get('sb-refresh-token')
```

Cookie names might be different. Inspect browser cookies to verify.

---

### Issue: Session not persisting after refresh

**Solution:** Ensure `middleware.ts` is calling `updateSession()`:
```typescript
export async function middleware(request: NextRequest) {
  const response = await updateSession(request) // This is required!
  // ...
  return response
}
```

---

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase SSR Package](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

## 🔐 Helper Functions Reference

### Server-Side

```typescript
// Get current authenticated user
const user = await getCurrentUser()

// Get current session
const session = await getCurrentSession()

// Create Supabase client
const supabase = await createServerSupabaseClient()

// Admin operations (bypasses RLS)
const adminClient = createServerSupabaseAdmin()
```

### Client-Side

```typescript
// Get Supabase client
const supabase = createClient()

// Use auth hook
const { user, loading, signOut, refreshUser } = useAuth()

// Require auth (with redirect)
const auth = useRequireAuth('/login')

// Use context
const { user, session, signOut } = useAuthContext()
```

---

## 📝 TypeScript Types

```typescript
import { User, Session } from '@supabase/supabase-js'

// User object
interface User {
  id: string
  email: string
  user_metadata: {
    name?: string
    avatar_url?: string
  }
  // ... more fields
}

// Session object
interface Session {
  access_token: string
  refresh_token: string
  user: User
  expires_at?: number
}
```

---

## ✅ Checklist for Production

- [ ] Environment variables configured in production
- [ ] Supabase URL allowlist updated with production domain
- [ ] OAuth redirect URLs configured for production
- [ ] Email templates customized
- [ ] Row Level Security (RLS) policies enabled
- [ ] Rate limiting implemented
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] HTTPS enabled
- [ ] Cookie security flags set (`secure`, `httpOnly`, `sameSite`)

---

**Last Updated:** 2024
**Maintainer:** Rotanera Team