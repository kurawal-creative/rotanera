import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") || "/project";
    const error = requestUrl.searchParams.get("error");
    const errorDescription = requestUrl.searchParams.get("error_description");

    // Handle OAuth errors
    if (error) {
        console.error("OAuth error:", error, errorDescription);
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorDescription || "Authentication failed")}`, request.url));
    }

    // Exchange code for session
    if (code) {
        const supabase = await createServerSupabaseClient();

        try {
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

            if (exchangeError) {
                console.error("Code exchange error:", exchangeError);
                return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent("Could not authenticate. Please try again")}`, request.url));
            }

            if (data.session) {
                console.log("User authenticated:", data.user.email);

                if (data.user?.email) {
                    await prisma.user.upsert({
                        where: { email: data.user.email },
                        update: { name: data.user.user_metadata?.name || "", avatar: data.user.user_metadata?.avatar_url || null },
                        create: {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.user_metadata?.name || "",
                            avatar: data.user.user_metadata?.avatar_url || null,
                        },
                    });
                }

                return NextResponse.redirect(new URL(next, request.url));
            }
        } catch (error) {
            console.error("Callback error:", error);
            return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent("Authentication failed")}`, request.url));
        }
    }

    // No code provided, redirect to login
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent("Invalid authentication request")}`, request.url));
}
