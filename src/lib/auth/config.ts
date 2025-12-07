export const AUTH_CONFIG = {
    // Protected routes (require authentication)
    protected: ["/project", "/profile", "/settings", "/galeri", "/app", "project-baru", "template-project", "koleksi"],

    // Auth routes (login/register)
    auth: ["/login", "/register", "/forgot-password"],

    // Public routes (accessible to all)
    public: ["/", "/about", "/contact", "/pricing"],

    // Redirect URLs
    defaultAuthRedirect: "/project",
    defaultLoginRedirect: "/login",
} as const;

export type AuthConfig = typeof AUTH_CONFIG;
