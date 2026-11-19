"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { showToast } from "../../../../../../lib/notify";
import {
  Upload,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

const CATEGORIES = [
  "Construction",
  "Photography",
  "Vehicles & Transportation",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];

const CONDITIONS = ["new", "excellent", "good", "fair"];
const RENTAL_TYPES = ["daily", "weekly", "monthly"];

export default function EditEquipmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { api } = useApi();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Construction",
    location: "",
    price: "",
    rentalType: "daily",
    quantity: "1",
    condition: "excellent",
    brand: "",
    model: "",
    image: "",
    terms: "",
  });

  const [photoType, setPhotoType] = useState("url");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEquipment = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await api(`/equipment/${id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Equipment not found");
      }

      const eq = data.data;
      setFormData({
        name: eq.name || "",
        description: eq.description || "",
        category: eq.category || "Construction",
        location: eq.location || "",
        price: eq.price != null ? String(eq.price) : "",
        rentalType: eq.rentalType || "daily",
        quantity: eq.quantity != null ? String(eq.quantity) : "1",
        condition: eq.condition || "excellent",
        brand: eq.brand || "",
        model: eq.model || "",
        image: eq.image || "",
        terms: eq.terms || "",
      });
      setError("");
    } catch (err) {
      console.error("Load equipment error:", err);
      setError(err.message || "Could not load equipment details.");
    } finally {
      setLoading(false);
    }
  }, [api, id]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      showToast("error", "imgbb API key not configured. Please use Image URL option.");
      return;
    }

    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        showToast("success", "New equipment photo uploaded!");
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

    if (!formData.name || !formData.description || !formData.price || !formData.location || !formData.image) {
      showToast("error", "Please fill in all required fields including image.");
      return;
    }

    try {
      setSaving(true);
      const res = await api(`/equipment/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity, 10),
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");

      await import("sweetalert2").then(async ({ default: Swal }) => {
        await Swal.fire({
          title: data.message || "Equipment updated.",
          icon: "success",
          confirmButtonColor: "#ea580c",
        });
      });

      router.push("/dashboard/owner/equipment");
      router.refresh();
    } catch (err) {
      console.error("Update equipment error:", err);
      showToast("error", err.message || "Failed to update equipment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{error}</p>
        <button
          onClick={fetchEquipment}
          className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/owner/equipment")}
            className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Back to My Equipment"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              Update Equipment
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Editing listing: <span className="font-semibold">{formData.name || "Loading..."}</span>
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Equipment Name &amp; Title *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Location / Yard *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Rental Rate (BDT) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">৳</span>
              <input
                type="number"
                name="price"
                required
                min="1"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Rental Unit *
            </label>
            <select
              name="rentalType"
              value={formData.rentalType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              {RENTAL_TYPES.map((type) => (
                <option key={type} value={type}>Per {type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Available Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Brand / Manufacturer
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Model Number / Spec
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Equipment Image *
              </label>
              <div className="flex text-xs font-semibold gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoType("url")}
                  className={`cursor-pointer ${
                    photoType === "url" ? "text-orange-600 underline font-bold" : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Image URL
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setPhotoType("upload")}
                  className={`cursor-pointer ${
                    photoType === "upload" ? "text-orange-600 underline font-bold" : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Upload to imgbb
                </button>
              </div>
            </div>

            {photoType === "url" ? (
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            ) : (
              <div>
                <label className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-orange-500 rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-950 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-colors">
                  <Upload className="w-4 h-4 text-orange-500" />
                  <span>
                    {uploadingImage ? "Uploading to imgbb..." : "Choose file to upload (replaces current image)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {formData.image && (
              <div className="mt-2 flex items-center gap-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.image}
                  alt="Equipment preview"
                  className="w-12 h-12 rounded object-cover border border-orange-500"
                />
                <span className="text-xs text-neutral-500 truncate">{formData.image}</span>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Detailed Description &amp; Specifications *
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Rental Terms &amp; Conditions (Optional)
            </label>
            <textarea
              name="terms"
              rows="2"
              value={formData.terms}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/owner/equipment")}
            className="px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploadingImage}
            className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            {saving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}