"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/auth-client";
import { showToast, showAlert } from "../../lib/notify";
import {
  Wrench,
  User,
  Mail,
  Lock,
  Upload,
  Link as LinkIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // 'customer' | 'owner'
  const [photoType, setPhotoType] = useState("url"); // 'url' | 'upload'
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Google Social Login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const { signIn } = await import("../../lib/auth-client");
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      showToast("error", "Failed to initiate Google authentication.");
      setGoogleLoading(false);
    }
  };

  // Handle direct file upload to imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      showToast(
        "error",
        "imgbb API key not configured. Please use Image URL option."
      );
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setPhotoUrl(data.data.url);
        showToast("success", "Photo uploaded to imgbb successfully!");
      } else {
        showToast("error", data.error?.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("imgbb upload error:", err);
      showToast("error", "Error uploading image to imgbb");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("error", "Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    // Password validation rule: min 6 chars, 1 uppercase, 1 lowercase
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
      showToast(
        "error",
        "Password must be at least 6 characters and contain at least 1 uppercase and 1 lowercase letter."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: photoUrl || "",
        role: role, // user-selected role: 'customer' or 'owner'
      });

      if (res?.error) {
        showToast("error", res.error.message || "Registration failed.");
        return;
      }

      await showAlert({
        title: "Registration Successful!",
        text: "Your JontroBazar account has been created. Redirecting...",
        icon: "success",
      });

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Registration error:", err);
      showToast(
        "error",
        err.message || "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/20 via-white to-white dark:from-[#0d121c] dark:via-[#090d16] dark:to-[#090d16] transition-colors">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#0c1017] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-neutral-950/50">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 items-center justify-center shadow-sm">
            <Wrench className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Join JontroBazar to browse, book, or list commercial equipment
          </p>
        </div>

        {/* Google Social Login Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 text-neutral-700 dark:text-neutral-200 text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {googleLoading ? "Connecting Google..." : "Continue with Google"}
            </span>
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <span className="relative px-3 bg-white dark:bg-[#0c1017] text-neutral-400 text-xs uppercase tracking-wider font-semibold">
              Or with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="register-name"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahim Ahmed"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Profile Photo Selector (URL or imgbb) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="register-photo-url"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
              >
                Profile Photo
              </label>
              <div className="flex text-[11px] font-semibold gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoType("url")}
                  className={`cursor-pointer ${
                    photoType === "url"
                      ? "text-orange-600 dark:text-orange-400 underline font-bold"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  URL
                </button>
                <span className="text-neutral-400">|</span>
                <button
                  type="button"
                  onClick={() => setPhotoType("upload")}
                  className={`cursor-pointer ${
                    photoType === "upload"
                      ? "text-orange-600 dark:text-orange-400 underline font-bold"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {photoType === "url" ? (
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="register-photo-url"
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
                />
              </div>
            ) : (
              <div className="relative">
                <label
                  htmlFor="register-photo-upload"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-orange-500 rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-colors"
                >
                  <Upload className="w-4 h-4 text-orange-500" />
                  <span>
                    {uploadingImage
                      ? "Uploading to imgbb..."
                      : photoUrl
                      ? "Change Selected Image"
                      : "Choose file to upload"}
                  </span>
                </label>
                <input
                  id="register-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </div>
            )}

            {photoUrl && (
              <div className="mt-2 flex items-center gap-2 p-1.5 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="Avatar preview"
                  className="w-8 h-8 rounded-full object-cover border border-orange-500"
                />
                <span className="text-[11px] text-neutral-500 truncate max-w-[280px]">
                  {photoUrl}
                </span>
              </div>
            )}
          </div>

          {/* Role Selector */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Register As
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "customer"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    role === "customer"
                      ? "bg-orange-500"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  }`}
                >
                  <User className={`w-5 h-5 ${role === "customer" ? "text-white" : "text-neutral-600 dark:text-neutral-400"}`} />
                </div>
                <div className="text-center">
                  <span className={`text-sm font-semibold ${role === "customer" ? "text-orange-600 dark:text-orange-400" : "text-neutral-700 dark:text-neutral-300"}`}>
                    Customer
                  </span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Browse & book equipment</p>
                </div>
                {role === "customer" && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "owner"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    role === "owner"
                      ? "bg-orange-500"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  }`}
                >
                  <Briefcase className={`w-5 h-5 ${role === "owner" ? "text-white" : "text-neutral-600 dark:text-neutral-400"}`} />
                </div>
                <div className="text-center">
                  <span className={`text-sm font-semibold ${role === "owner" ? "text-orange-600 dark:text-orange-400" : "text-neutral-700 dark:text-neutral-300"}`}>
                    Owner
                  </span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">List & rent out equipment</p>
                </div>
                {role === "owner" && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 chars (1 upper, 1 lower)"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-neutral-400">
              Must be at least 6 characters with 1 uppercase &amp; 1 lowercase
              letter.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Already have a JontroBazar account?{" "}
            <Link
              href="/login"
              className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
