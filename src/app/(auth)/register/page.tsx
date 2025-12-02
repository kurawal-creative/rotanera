"use client";

import { useState } from "react";
import AuthCarousel from "@/components/AuthCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <main className="flex h-screen max-w-screen bg-[#F9FAFB]">
      <section className="mx-auto flex min-h-screen w-full flex-row">
        {/* Right Panel */}
        <AuthCarousel />

        {/* Left Panel */}
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col bg-white">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-md flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-TextPrimary text-3xl font-semibold">
                    Hai, selamat bergabung!
                  </div>
                  <div className="text-TextSecondary text-sm">
                    Buat akunmu sekarang, unggah ide desain rotanmu, dan biarkan
                    AI kami bantu wujudkan blueprint kreatif yang menakjubkan.
                  </div>
                </div>

                {/* Username */}
                <div className="mt-1 flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Username
                  </div>
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Masukan username kamu"
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="flex w-full flex-col gap-1">
                  <div className="text-TextPrimary text-sm font-medium">
                    Email
                  </div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Masukan email kamu"
                    className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400"
                  />
                </div>

                {/* Password */}
                <div className="flex w-full flex-col gap-1">
                  <label className="text-TextPrimary text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Masukan password kamu"
                      className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 pr-10 text-sm placeholder:text-gray-400"
                    />

                    {/* tampil hanya jika ada input */}
                    {formData.password !== "" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex w-full flex-col gap-1">
                  <label className="text-TextPrimary text-sm font-medium">
                    Konfirmasi Password
                  </label>

                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="Masukan password kamu"
                      className="text-TextPrimary h-10 rounded-xl border-2 border-gray-300 bg-white px-3 pr-10 text-sm placeholder:text-gray-400"
                    />

                    {/* tampil hanya jika ada input */}
                    {formData.confirmPassword !== "" && (
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                      >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button className="bg-maroon hover:bg-maroon-darker mt-2 h-10 w-full rounded-2xl">
                  Buat Akun
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-6">
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                  <div className="text-TextSecondary text-sm">atau</div>
                  <div className="h-0.5 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Google Login */}
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-[#E0E1E2] bg-[#F9FAFB] transition duration-200 hover:border-[#C7C9CB] hover:bg-[#E8ECF1]">
                    <svg className="h-5 w-5" viewBox="0 0 48 48">
                      <path
                        fill="#fbc02d"
                        d="M43.6 20.5H42V20H24v8h11.3C33.3 32.3 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-3.5z"
                      />
                      <path
                        fill="#e53935"
                        d="M6.3 14.6l6.6 4.8C14.4 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.3 0-13.6 3.9-17.1 9.6z"
                      />
                      <path
                        fill="#4caf50"
                        d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.6 35.7 26.9 37 24 37c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10.3 39.6 16.7 44 24 44z"
                      />
                      <path
                        fill="#1565c0"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.1 7.2l6.2 5.2c-0.4 0.3 6.6-4.8 6.6-13.9 0-1.3-.1-2.7-.4-3.5z"
                      />
                    </svg>
                    <p className="font-medium text-neutral-900">
                      Login dengan Google
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
