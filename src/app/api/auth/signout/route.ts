import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: "Gagal logout. Silakan coba lagi" },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Logout berhasil" }, { status: 200 });
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi" },
      { status: 500 },
    );
  }
}

// Also support GET method for simple logout links
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      // Redirect to home with error
      return NextResponse.redirect(
        new URL(
          "/?error=logout-failed",
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        ),
      );
    }

    // Redirect to home page after successful logout
    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    );
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.redirect(
      new URL(
        "/?error=server-error",
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      ),
    );
  }
}
