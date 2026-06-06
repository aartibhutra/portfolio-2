import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, Calendar, Building2 } from "lucide-react";
import DeleteExperienceButton from "./components/DeleteExperienceButton";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
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
            <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your work history.
            </p>
          </div>
          <Link
            href="/admin/experience/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus size={18} />
            Add New Experience
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        <Building2 size={14} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>
                      {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      {" - "}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
                        : "Present"
                      }
                    </span>
                  </div>

                  {exp.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {exp.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.techUsed.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-4 justify-end md:justify-start">
                  <Link
                    href={`/admin/experience/${exp.id}`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <Edit size={18} />
                  </Link>
                  <DeleteExperienceButton id={exp.id} />
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              No experience entries found. Click "Add New Experience" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
