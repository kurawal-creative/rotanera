# 🔐 Authentication Setup TODO

## ✅ Completed Tasks

- [x] Created Supabase client utilities (client.ts, server.ts, middleware.ts)
- [x] Implemented middleware for route protection
- [x] Created auth API routes (login, signup, signout, callback)
- [x] Built reusable auth components (forms, OAuth buttons)
- [x] Created useAuth hook for client-side auth
- [x] Added AuthProvider context
- [x] Implemented form validation
- [x] Added error handling and user feedback
- [x] TypeScript type safety configured
- [x] Documentation created

---

## 🚧 Pending Setup Tasks

### 1. Environment Configuration (CRITICAL - Do First!)

- [ ] Create `.env.local` file in root directory
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` from Supabase Dashboard
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase Dashboard
- [ ] Add `NEXT_PUBLIC_SITE_URL` (http://localhost:3000 for dev)
- [ ] Add `.env.local` to `.gitignore` (already done)
- [ ] Restart dev server after env setup

**Where to find Supabase keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings > API
4. Copy Project URL and anon/public key

---

### 2. Supabase Dashboard Configuration

#### A. Enable Email Authentication
- [ ] Go to Authentication > Providers
- [ ] Enable "Email" provider
- [ ] (Optional for dev) Disable "Confirm email" checkbox
- [ ] Save changes

#### B. Setup Google OAuth (Optional but Recommended)
- [ ] Go to Authentication > Providers > Google
- [ ] Enable Google provider
- [ ] Get OAuth credentials from Google Cloud Console:
  - [ ] Visit https://console.cloud.google.com/
  - [ ] Create new project or select existing
  - [ ] Enable Google+ API
  - [ ] Create OAuth 2.0 Client ID
  - [ ] Add authorized redirect URI: `https://[your-project].supabase.co/auth/v1/callback`
- [ ] Paste Client ID and Client Secret in Supabase
- [ ] Save changes

#### C. Configure Redirect URLs
- [ ] Go to Authentication > URL Configuration
- [ ] Add Site URL: `http://localhost:3000` (for dev)
- [ ] Add Redirect URLs:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `http://localhost:3000/**` (wildcard for dev)
- [ ] For production, add your domain URLs later

#### D. Customize Email Templates (Optional)
- [ ] Go to Authentication > Email Templates
- [ ] Customize "Confirm signup" template
- [ ] Customize "Magic Link" template
- [ ] Customize "Change Email Address" template
- [ ] Customize "Reset Password" template

---

### 3. Update Your Pages

#### A. Update Login Page
- [ ] Open `src/app/(auth)/login/page.tsx`
- [ ] Replace old form with:
  ```tsx
  import { SignInForm, OAuthButtons } from "@/components/auth-page";
  ```
- [ ] Add `<SignInForm redirectTo="/app/test" />`
- [ ] Add `<OAuthButtons redirectTo="/app/test" />`
- [ ] Remove old form state management code
- [ ] Test login functionality

#### B. Update Register Page
- [ ] Open `src/app/(auth)/register/page.tsx`
- [ ] Replace old form with:
  ```tsx
  import { SignUpForm, OAuthButtons } from "@/components/auth-page";
  ```
- [ ] Add `<SignUpForm />`
- [ ] Add `<OAuthButtons redirectTo="/app/test" />`
- [ ] Remove old form state management code
- [ ] Test registration functionality

#### C. Add Toaster to Root Layout
- [ ] Open `src/app/layout.tsx`
- [ ] Import: `import { Toaster } from "sonner";`
- [ ] Add `<Toaster position="top-right" richColors />` before closing body tag
- [ ] Verify toast notifications work

---

### 4. Test Authentication Flow

#### Email/Password Tests
- [ ] Test signup with new email
- [ ] Check if verification email is sent (if enabled)
- [ ] Test login with correct credentials
- [ ] Test login with wrong credentials (should show error)
- [ ] Test password field toggle visibility
- [ ] Test form validation (empty fields, invalid email, weak password)

#### Google OAuth Tests
- [ ] Click "Login with Google" button
- [ ] Verify redirect to Google consent screen
- [ ] Approve and verify redirect back to app
- [ ] Check if user is logged in after OAuth
- [ ] Verify user data is saved

#### Route Protection Tests
- [ ] Try accessing `/app/test` without login (should redirect to /login)
- [ ] Login and access `/app/test` (should work)
- [ ] Try accessing `/login` while logged in (should redirect to /app/test)
- [ ] Test logout functionality
- [ ] Verify cookies are cleared after logout

#### Session Persistence Tests
- [ ] Login and refresh page (should stay logged in)
- [ ] Login and close browser, reopen (should stay logged in)
- [ ] Check if token auto-refreshes after expiry

---

### 5. Customize Configuration (Optional)

#### Update Protected Routes
- [ ] Open `src/lib/auth/middleware-helpers.ts`
- [ ] Modify `routeConfig.protected` array with your protected routes
- [ ] Modify `routeConfig.auth` array with your auth pages
- [ ] Update `defaultAuthRedirect` destination
- [ ] Update `defaultLoginRedirect` destination

#### Adjust Password Requirements
- [ ] Open `src/components/auth-page/sign-up-form.tsx`
- [ ] Find the password validation section
- [ ] Adjust minimum length, complexity rules as needed
- [ ] Update error messages

#### Customize Toast Messages
- [ ] Search for `toast.` in component files
- [ ] Update messages to match your brand voice
- [ ] Change Indonesian to English if needed

---

### 6. Production Preparation (Do Before Deploy)

#### Security
- [ ] Set up Row Level Security (RLS) in Supabase:
  ```sql
  -- Example: Users can only read their own data
  CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);
  ```
- [ ] Review and restrict service role key usage
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Add rate limiting (recommended: use Upstash)

#### Environment Variables
- [ ] Add production env vars to hosting platform (Vercel/Netlify)
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Update Supabase redirect URLs to production domain
- [ ] Update Google OAuth redirect URLs to production

#### Testing
- [ ] Test all auth flows in production
- [ ] Test email delivery in production
- [ ] Test OAuth in production
- [ ] Monitor Supabase logs for errors

---

### 7. Additional Features (Nice to Have)

- [ ] Implement "Forgot Password" functionality
- [ ] Add email change functionality
- [ ] Add password change functionality
- [ ] Create user profile page
- [ ] Add avatar upload
- [ ] Implement "Remember Me" option
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Add social login (GitHub, Facebook, etc.)
- [ ] Create admin panel for user management
- [ ] Add user roles and permissions

---

## 📋 Quick Start Checklist (Minimum Viable)

If you want to get auth working ASAP, do these in order:

1. [ ] Create `.env.local` with Supabase credentials
2. [ ] Restart dev server
3. [ ] Enable Email provider in Supabase Dashboard
4. [ ] Disable email confirmation (for dev testing)
5. [ ] Update login page to use `<SignInForm />`
6. [ ] Update register page to use `<SignUpForm />`
7. [ ] Add `<Toaster />` to root layout
8. [ ] Test signup, login, and logout

**That's it! You now have working authentication.** ✅

---

## 🆘 Troubleshooting Resources

If you encounter issues:

1. Check `AUTH_SETUP_GUIDE.md` - comprehensive setup guide
2. Check `src/lib/auth/README.md` - detailed documentation
3. Review code comments in each file
4. Check browser console for errors
5. Check Supabase Dashboard > Authentication > Logs
6. Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`

---

## 📝 Notes

- All auth logic is in `src/lib/supabase/` and `src/components/auth-page/`
- Forms include built-in validation (client + server side)
- Toast notifications use `sonner` (already in package.json)
- Middleware automatically protects routes (configured in `middleware.ts`)
- TypeScript types provided by `@supabase/supabase-js`

---

**Last Updated:** 2024
**Status:** Ready for implementation ✅