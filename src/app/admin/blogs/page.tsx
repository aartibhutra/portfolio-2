import { prisma } from "@/lib/prisma";
import { Plus, Search, FileText, Calendar, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import DeleteBlogButton from "./components/DeleteBlogButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your articles and publications
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Blog List */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Search Bar - Visual only for now */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {blogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                No articles yet
              </p>
              <p className="text-sm">Start writing your first blog post</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate pr-4">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${blog.published
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
                            : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900"
                          }`}
                      >
                        {blog.published ? (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteBlogButton id={blog.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
