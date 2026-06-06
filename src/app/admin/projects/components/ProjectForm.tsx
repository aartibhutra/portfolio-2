"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface ProjectFormProps {
  initialData?: {
    id?: number;
    title: string;
    description: string;
    techStack: string[];
    github: string | null;
    liveUrl: string | null;
    image: string | null;
    visible?: boolean;
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    techStack: initialData?.techStack?.join(", ") || "",
    github: initialData?.github || "",
    liveUrl: initialData?.liveUrl || "",
    image: initialData?.image || "",
    visible: initialData?.visible ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const url = initialData?.id
        ? `/api/projects/${initialData.id}`
        : "/api/projects";

      const method = initialData?.id ? "put" : "post";

      await axios({
        method,
        url,
        data: payload,
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-6">
          {initialData ? "Edit Project" : "New Project Details"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Live Demo URL</label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Image URL */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {formData.image && (
              <div className="mt-4 relative h-64 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Visibility Toggle */}
          <div className="col-span-2 flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <input
              type="checkbox"
              id="visible"
              name="visible"
              checked={formData.visible}
              onChange={(e) => setFormData((prev) => ({ ...prev, visible: e.target.checked }))}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <label htmlFor="visible" className="cursor-pointer">
              <span className="block font-medium text-gray-900 dark:text-gray-100">
                Publicly Visible
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                Uncheck to hide this project from the homepage.
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
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
                Save Project
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
