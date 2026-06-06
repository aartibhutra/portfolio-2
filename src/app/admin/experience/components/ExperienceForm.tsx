"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import axios from "axios";

interface ExperienceFormProps {
  initialData?: {
    id?: number;
    role: string;
    company: string;
    startDate: string; // ISO date string or YYYY-MM-DD
    endDate?: string | null;
    description?: string | null;
    techUsed: string[];
  };
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Helper to format date for input (YYYY-MM-DD)
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    role: initialData?.role || "",
    company: initialData?.company || "",
    startDate: formatDate(initialData?.startDate),
    endDate: formatDate(initialData?.endDate),
    description: initialData?.description || "",
    techUsed: initialData?.techUsed?.join(", ") || "",
    isCurrent: !initialData?.endDate && !!initialData?.startDate, // Basic logic for "Current"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      // If setting to current, clear end date
      if (name === "isCurrent" && (e.target as HTMLInputElement).checked) {
        setFormData((prev) => ({ ...prev, endDate: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        role: formData.role,
        company: formData.company,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.isCurrent ? null : (formData.endDate ? new Date(formData.endDate).toISOString() : null),
        description: formData.description,
        techUsed: formData.techUsed.split(",").map(t => t.trim()).filter(Boolean),
      };

      const url = initialData?.id
        ? `/api/experience/${initialData.id}`
        : "/api/experience";

      const method = initialData?.id ? "put" : "post";

      await axios({
        method,
        url,
        data: payload,
      });

      router.push("/admin/experience");
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
          {initialData ? "Edit Experience" : "New Experience Details"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">Role / Job Title</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">End Date</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isCurrent"
                  name="isCurrent"
                  checked={formData.isCurrent}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <label htmlFor="isCurrent" className="text-xs text-gray-500 cursor-pointer">Currently Working</label>
              </div>
            </div>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.isCurrent}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Tech Stack / Skills Used (comma separated)
            </label>
            <input
              type="text"
              name="techUsed"
              value={formData.techUsed}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
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
                Save Experience
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
