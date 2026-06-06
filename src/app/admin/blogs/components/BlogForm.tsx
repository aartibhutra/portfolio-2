"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogFormProps {
  initialData?: {
    id: number;
    title: string;
    slug: string;
    content: string;
    coverImage: string | null;
    published: boolean;
  };
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    published: initialData?.published || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if creating new
    if (name === "title" && !initialData) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await axios.put(`/api/blogs/${initialData.id}`, formData);
      } else {
        await axios.post("/api/blogs", formData);
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            {initialData ? "Edit Blog Post" : "New Blog Post"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Post
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        {/* Title and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              required
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Cover Image URL
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            {formData.coverImage && (
              <div className="relative w-20 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={formData.coverImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Content (Markdown supported)
          </label>
          <textarea
            name="content"
            rows={15}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
            placeholder="# Write your blog post here..."
            required
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
          />
          <label
            htmlFor="published"
            className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
          >
            Publish this post
          </label>
        </div>
      </div>
    </form>
  );
}
