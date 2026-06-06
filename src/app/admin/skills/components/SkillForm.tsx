"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface SkillFormProps {
  initialData?: {
    id?: number;
    name: string;
    level: number;
    categoryId: number;
    isLearning: boolean;
  };
}

export default function SkillForm({ initialData }: SkillFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    level: initialData?.level || 50,
    categoryId: initialData?.categoryId || 0,
    isLearning: initialData?.isLearning || false,
  });

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/skills/categories");
        setCategories(res.data);
        // Set default category if creating new and categories exist
        if (!initialData?.categoryId && res.data.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: res.data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        level: Number(formData.level),
        categoryId: Number(formData.categoryId),
      };

      const url = initialData?.id
        ? `/api/skills/${initialData.id}`
        : "/api/skills";

      const method = initialData?.id ? "put" : "post";

      await axios({
        method,
        url,
        data: payload,
      });

      router.push("/admin/skills");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-6">
          {initialData ? "Edit Skill" : "New Skill Details"}
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Skill Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value={0} disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                No categories found. Please check your database.
              </p>
            )}
          </div>

          {/* Level */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium">Proficiency Level</label>
              <span className="text-sm text-gray-500">{formData.level}%</span>
            </div>
            <input
              type="range"
              name="level"
              min="0"
              max="100"
              value={formData.level}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          {/* Is Learning */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <input
              type="checkbox"
              id="isLearning"
              name="isLearning"
              checked={formData.isLearning}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <label htmlFor="isLearning" className="cursor-pointer">
              <span className="block font-medium text-gray-900 dark:text-gray-100">
                Currently Learning
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                Mark this skill as something you are currently learning.
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
                Save Skill
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
