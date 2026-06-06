import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Github, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import DeleteProjectButton from "./components/DeleteProjectButton";
import VisibilityToggle from "./components/VisibilityToggle";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your portfolio projects here.
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus size={18} />
            Add New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <VisibilityToggle id={project.id} initialVisible={project.visible} />
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteProjectButton id={project.id} />
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1.5 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No projects found. Click "Add New Project" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
