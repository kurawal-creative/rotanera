export const AUTH_CONFIG = {
  // Protected routes (require authentication)
  protected: ["/dashboard", "/profile", "/settings", "/app"],

  // Auth routes (login/register)
  auth: ["/login", "/register", "/forgot-password"],

  // Public routes (accessible to all)
  public: ["/", "/about", "/contact", "/pricing"],

  // Redirect URLs
  defaultAuthRedirect: "/dashboard",
  defaultLoginRedirect: "/login",
} as const;

export type AuthConfig = typeof AUTH_CONFIG;
