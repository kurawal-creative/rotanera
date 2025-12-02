"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface SignUpFormProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/**
 * SignUpForm Component
 * Complete registration form with validation
 *
 * @example
 * <SignUpForm onSuccess={() => router.push('/dashboard')} />
 */
export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validate single field
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Nama harus diisi";
        if (value.trim().length < 2) return "Nama minimal 2 karakter";
        return "";

      case "email":
        if (!value.trim()) return "Email harus diisi";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Format email tidak valid";
        return "";

      case "password":
        if (!value) return "Password harus diisi";
        if (value.length < 8) return "Password minimal 8 karakter";
        if (!/[A-Z]/.test(value))
          return "Password harus mengandung huruf besar";
        if (!/[a-z]/.test(value))
          return "Password harus mengandung huruf kecil";
        if (!/[0-9]/.test(value)) return "Password harus mengandung angka";
        return "";

      case "confirmPassword":
        if (!value) return "Konfirmasi password harus diisi";
        if (value !== formData.password) return "Password tidak sama";
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
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Gagal membuat akun");
        return;
      }

      // Success
      if (data.requiresEmailConfirmation) {
        toast.success(data.message || "Silakan cek email untuk verifikasi");
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login?verified=pending");
        }, 2000);
      } else {
        toast.success(data.message || "Akun berhasil dibuat");
        onSuccess?.();
        router.push("/app/test");
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      {/* Name Field */}
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-neutral-900">
          Username
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="Masukan username kamu"
          className={`h-10 rounded-xl border-2 bg-white px-3 text-sm text-neutral-900 placeholder:text-gray-400 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
          autoComplete="name"
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

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
            autoComplete="new-password"
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

      {/* Confirm Password Field */}
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-neutral-900"
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="Masukan password kamu"
            className={`h-10 rounded-xl border-2 bg-white px-3 pr-10 text-sm text-neutral-900 placeholder:text-gray-400 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
            autoComplete="new-password"
          />
          {formData.confirmPassword && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
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
            <span>Membuat Akun...</span>
          </div>
        ) : (
          "Buat Akun"
        )}
      </Button>
    </form>
  );
}
