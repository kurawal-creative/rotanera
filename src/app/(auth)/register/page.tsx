"use client";

import Link from "next/link";
import AuthCarousel from "@/components/auth-carousel";
import { SignUpForm, OAuthButtons } from "@/components/auth-page";

export default function RegisterPage() {
  return (
    <main className="flex h-screen max-w-screen bg-[#F9FAFB]">
      <section className="mx-auto flex min-h-screen w-full flex-row">
        <AuthCarousel />

        <div className="flex flex-1">
          <div className="flex flex-1 flex-col bg-white">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-md flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-3xl font-semibold text-neutral-900">
                    Hai, selamat bergabung!
                  </div>
                  <div className="text-sm text-neutral-600">
                    Buat akunmu sekarang, unggah ide desain rotanmu, dan biarkan
                    AI kami bantu wujudkan blueprint kreatif yang menakjubkan.
                  </div>
                </div>

                {/* Use the new SignUpForm component */}
                <SignUpForm />

                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                  <div className="text-sm text-neutral-600">atau</div>
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Use the new OAuthButtons component */}
                <OAuthButtons redirectTo="/dashboard" />

                <div className="mt-5 text-center font-medium text-neutral-600">
                  <p className="hidden lg:inline">{"Sudah punya akun? "}</p>
                  <Link
                    href={"/login"}
                    className="text-purp underline-offset-2 hover:underline"
                  >
                    Masuk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
