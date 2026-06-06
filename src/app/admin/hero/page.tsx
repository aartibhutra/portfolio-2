"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Save, Loader2, ImageIcon, Type, Link as LinkIcon } from "lucide-react";

interface HeroData {
  id?: number;
  headline: string;
  subheadline: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  imageUrl: string;
}

export default function AdminHeroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<HeroData>({
    headline: "",
    subheadline: "",
    primaryBtnText: "",
    primaryBtnLink: "",
    secondaryBtnText: "",
    secondaryBtnLink: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("/api/hero");
        const data = res.data;
        if (data) {
          setFormData({
            headline: data.headline || "",
            subheadline: data.subheadline || "",
            primaryBtnText: data.primaryBtnText || "",
            primaryBtnLink: data.primaryBtnLink || "",
            secondaryBtnText: data.secondaryBtnText || "",
            secondaryBtnLink: data.secondaryBtnLink || "",
            imageUrl: data.imageUrl || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("/api/hero", formData);

      router.back();
      // Optional: Add toast notification here
      alert("Hero section updated successfully!");
    } catch (error) {
      console.error("Error saving hero data:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Hero Section</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Update the main introduction section of your portfolio.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <Type size={20} />
            <h2 className="font-semibold text-lg">Text Content</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subheadline
              </label>
              <textarea
                name="subheadline"
                value={formData.subheadline}
                onChange={handleChange}
                rows={3}
                placeholder="..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Buttons Configuration */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-2 mb-4 text-purple-600 dark:text-purple-400">
            <LinkIcon size={20} />
            <h2 className="font-semibold text-lg">Call to Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Button */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Primary Button</h3>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Text</label>
                <input
                  type="text"
                  name="primaryBtnText"
                  value={formData.primaryBtnText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Link</label>
                <input
                  type="text"
                  name="primaryBtnLink"
                  value={formData.primaryBtnLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Secondary Button */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Secondary Button</h3>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Text</label>
                <input
                  type="text"
                  name="secondaryBtnText"
                  value={formData.secondaryBtnText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Link</label>
                <input
                  type="text"
                  name="secondaryBtnLink"
                  value={formData.secondaryBtnLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Handling */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-400">
            <ImageIcon size={20} />
            <h2 className="font-semibold text-lg">Hero Image</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-sm"
              />
            </div>

            {formData.imageUrl && (
              <div className="mt-4 relative aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
