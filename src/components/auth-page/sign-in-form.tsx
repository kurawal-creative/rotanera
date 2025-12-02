"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface SignInFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

/**
 * SignInForm Component
 * Complete login form with validation
 *
 * @example
 * <SignInForm redirectTo="/dashboard" />
 */
export function SignInForm({ onSuccess, redirectTo }: SignInFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validate single field
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email harus diisi";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Format email tidak valid";
        return "";

      case "password":
        if (!value) return "Password harus diisi";
        return "";

      default:
        return "";
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });

    // Clear error for this field when user types
    if (errors[key]) {
      setErrors({ ...errors, [key]: undefined });
    }
  };

  // Handle input blur (validate on blur)
  const handleBlur = (key: keyof FormData) => {
    const error = validateField(key, formData[key]);
    if (error) {
      setErrors({ ...errors, [key]: error });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Mohon perbaiki kesalahan pada form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login gagal");
        return;
      }

      // Success
      toast.success(data.message || "Login berhasil");
      onSuccess?.();

      // Get redirect URL from query params or use default
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect") || redirectTo || "/app/test";

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect
      router.push(redirect);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      {/* Email Field */}
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-neutral-900">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="Masukan email kamu"
          className={`h-10 rounded-xl border-2 bg-white px-3 text-sm text-neutral-900 placeholder:text-gray-400 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
          autoComplete="email"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="password"
          className="text-sm font-medium text-neutral-900"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="Masukan password kamu"
            className={`h-10 rounded-xl border-2 bg-white px-3 pr-10 text-sm text-neutral-900 placeholder:text-gray-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
            autoComplete="current-password"
          />
          {formData.password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="text-purp -mt-2 ml-auto w-fit text-sm font-medium underline-offset-2 hover:underline">
        <Link href="/forgot-password">Lupa password?</Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-purp hover:bg-purp-darker mt-2 h-10 w-full rounded-2xl"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Masuk...</span>
          </div>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
