"use client";

import Link from "next/link";
import AuthCarousel from "@/components/auth-carousel";
import { SignInForm, OAuthButtons } from "@/components/auth-page";

export default function LoginPage() {
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
                    Hai, senang bertemu lagi!
                  </div>
                  <div className="text-sm text-neutral-600">
                    Masuk sekarang dan lanjutkan ciptakan blueprint rotan
                    kreatifmu!
                  </div>
                </div>

                {/* Use the new SignInForm component */}
                <SignInForm redirectTo="/project" />

                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                  <div className="text-sm text-neutral-600">atau</div>
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Use the new OAuthButtons component */}
                <OAuthButtons redirectTo="/project" />

                <div className="mt-5 text-center font-medium text-neutral-600">
                  <p className="hidden lg:inline">{"Belum ada akun? "}</p>
                  <Link
                    href={"/register"}
                    className="text-purp underline-offset-2 hover:underline"
                  >
                    Daftar
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
