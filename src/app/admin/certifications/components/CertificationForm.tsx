"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import axios from "axios";

interface CertificationFormProps {
  initialData?: {
    id?: number;
    title: string;
    issuer: string;
    issueDate: string; // ISO date string
    credentialId?: string | null;
    credentialUrl?: string | null;
  };
}

export default function CertificationForm({ initialData }: CertificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Helper to format date for input (YYYY-MM-DD)
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issueDate: formatDate(initialData?.issueDate),
    credentialId: initialData?.credentialId || "",
    credentialUrl: initialData?.credentialUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        issuer: formData.issuer,
        issueDate: new Date(formData.issueDate).toISOString(),
        credentialId: formData.credentialId || null,
        credentialUrl: formData.credentialUrl || null,
      };

      const url = initialData?.id
        ? `/api/certifications/${initialData.id}`
        : "/api/certifications";

      const method = initialData?.id ? "put" : "post";

      await axios({
        method,
        url,
        data: payload,
      });

      router.push("/admin/certifications");
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
          {initialData ? "Edit Certification" : "New Certification"}
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Certification Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block text-sm font-medium mb-1">Issuing Organization</label>
            <input
              type="text"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Credential ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Credential ID (Optional)</label>
            <input
              type="text"
              name="credentialId"
              value={formData.credentialId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Credential URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Credential URL (Optional)</label>
            <input
              type="url"
              name="credentialUrl"
              value={formData.credentialUrl}
              onChange={handleChange}
              placeholder="https://..."
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
                Save Certification
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
