"use client";

import React, { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

/**
 * Customer Profile Page
 * Editable form: name, email (read-only), image, phone, address
 * Data: GET /api/users/me, PUT /api/users/profile
 */

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CustomerProfilePage() {
  const { api } = useApi();
  const { user, refreshSession } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const res = await api("/users/me");
        const data = await res.json();

        if (data.success && data.user) {
          const u = data.user;
          setFormData({
            name: u.name || "",
            email: u.email || "",
            photo: u.photo || u.image || "",
            phone: u.phone || "",
            address: u.address || "",
          });
          if (u.photo || u.image) {
            setPreviewImage(u.photo || u.image);
          }
        } else {
          // Fallback to AuthContext user
          if (user) {
            setFormData({
              name: user.name || "",
              email: user.email || "",
              photo: user.image || "",
              phone: "",
              address: "",
            });
            if (user.image) setPreviewImage(user.image);
          }
        }
      } catch (err) {
        setError("Failed to load profile");
        // Fallback to AuthContext user
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            photo: user.image || "",
            phone: "",
            address: "",
          });
          if (user.image) setPreviewImage(user.image);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [api, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("error", "Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, photo: "" }));
  };

  // Upload image to imgbb
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      showToast("error", "imgbb API key not configured.");
      return null;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        showToast("success", "Photo uploaded to imgbb successfully!");
        return data.data.url;
      } else {
        showToast("error", data.error?.message || "Failed to upload image.");
        return null;
      }
    } catch (err) {
      console.error("imgbb upload error:", err);
      showToast("error", "Error uploading image to imgbb");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      // If there's a new image file, upload it first to imgbb
      let photoUrl = formData.photo;

      if (imageFile) {
        const uploadedUrl = await handleImageUpload();
        if (!uploadedUrl) {
          setIsSaving(false);
          return;
        }
        photoUrl = uploadedUrl;
      }

      const res = await api("/users/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: formData.name.trim(),
          photo: photoUrl,
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Profile updated successfully!");
        showToast("success", "Profile updated successfully");
        // Refresh the BetterAuth session to get updated user data
        await refreshSession();
      } else {
        setError(data.message || "Failed to update profile");
        showToast("error", data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      showToast("error", "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Profile
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account information.
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 animate-pulse">
          <div className="max-w-md mx-auto space-y-6">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Profile
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Manage your account information and contact details.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-full h-full rounded-2xl object-cover border-2 border-orange-500"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border-2 border-orange-500">
                  <User className="w-10 h-10 text-orange-500" />
                </div>
              )}
              {previewImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-neutral-600 dark:text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                JPG, PNG up to 5MB. Uploaded to imgbb.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <User className="w-4 h-4 inline-block mr-1" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <Mail className="w-4 h-4 inline-block mr-1" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <Phone className="w-4 h-4 inline-block mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="+880 1XXX XXXXXX"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <MapPin className="w-4 h-4 inline-block mr-1" />
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your full delivery address for equipment drop-off"
              />
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-400"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving || uploadingImage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : uploadingImage ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading to imgbb...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Account Info */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            Account Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
              <p className="text-neutral-500 dark:text-neutral-400">Role</p>
              <p className="font-medium text-neutral-900 dark:text-white capitalize">
                {user?.role || "customer"}
              </p>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
              <p className="text-neutral-500 dark:text-neutral-400">Member Since</p>
              <p className="font-medium text-neutral-900 dark:text-white">
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}