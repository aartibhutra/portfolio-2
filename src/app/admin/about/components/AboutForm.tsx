"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import axios from "axios";

interface AboutFormProps {
  initialData: {
    id?: number;
    shortIntro: string;
    description: string;
    imageUrl?: string | null;
    btnText?: string | null;
    btnLink?: string | null;
    highlights: string[];
  };
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shortIntro: initialData.shortIntro || "",
    description: initialData.description || "",
    imageUrl: initialData.imageUrl || "",
    btnText: initialData.btnText || "",
    btnLink: initialData.btnLink || "",
    highlights: initialData.highlights || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put("/api/about", formData);
      router.refresh();
      alert("Updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-6">About Section Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Content Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Short Intro / Headline</label>
              <input
                type="text"
                name="shortIntro"
                value={formData.shortIntro}
                onChange={handleChange}
                placeholder="e.g. Hi, I'm Aarti..."
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Configuration Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://test.com/image.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              {formData.imageUrl && (
                <div className="mt-4 relative aspect-[3/4] w-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full grayscale" />
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">Call to Action</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input
                  type="text"
                  name="btnText"
                  value={formData.btnText}
                  onChange={handleChange}
                  placeholder="e.g. Hire Me"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Link</label>
                <input
                  type="text"
                  name="btnLink"
                  value={formData.btnLink}
                  onChange={handleChange}
                  placeholder="#contact or https://..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
