import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json({ error: "Email, password, dan nama harus diisi" }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
        }

        // Validate password strength
        if (password.length < 8) {
            return NextResponse.json({ error: "Password minimal 8 karakter" }, { status: 400 });
        }

        // Validate name length
        if (name.length < 2) {
            return NextResponse.json({ error: "Nama minimal 2 karakter" }, { status: 400 });
        }

        const supabase = await createServerSupabaseClient();

        // Check if user already exists
        const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single();

        if (existingUser) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
        }

        // Sign up user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name, // Store name in Supabase user metadata
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback`,
            },
        });

        if (error) {
            // Handle specific error cases
            if (error.message.includes("already registered")) {
                return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
            }

            if (error.message.includes("Password should be at least")) {
                return NextResponse.json({ error: "Password terlalu lemah" }, { status: 400 });
            }

            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!data.user) {
            return NextResponse.json({ error: "Gagal membuat akun. Silakan coba lagi" }, { status: 400 });
        }

        // Create or update user in database
        await prisma.user.upsert({
            where: { email },
            update: { name },
            create: { id: data.user.id, name, email },
        });

        // Check if email confirmation is required
        if (data.user && !data.session) {
            return NextResponse.json(
                {
                    message: "Akun berhasil dibuat. Silakan cek email untuk verifikasi",
                    requiresEmailConfirmation: true,
                    user: {
                        id: data.user.id,
                        email: data.user.email,
                    },
                },
                { status: 201 },
            );
        }

        // If auto-confirm is enabled (no email confirmation required)
        return NextResponse.json(
            {
                message: "Akun berhasil dibuat",
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.name,
                },
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server. Silakan coba lagi" }, { status: 500 });
    }
}
