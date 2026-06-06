import { prisma } from "@/lib/prisma";
import { Calendar, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

const Experience = async () => {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <section id="experience" className="bg-gray-50 dark:bg-black/20 py-20 transition-colors">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Career Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Professional Experience
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp) => {
            const isCurrent = !exp.endDate;
            return (
              <div key={exp.id} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <span
                  className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 transition-all duration-300 ${isCurrent
                      ? "bg-blue-600 border-blue-100 dark:border-blue-900 ring-4 ring-blue-50 dark:ring-blue-900/30 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 border-white dark:border-gray-900 group-hover:bg-blue-500 group-hover:scale-110"
                    }`}
                />

                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${isCurrent
                      ? "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800 shadow-lg shadow-blue-900/5 ring-1 ring-blue-500/10"
                      : "bg-white dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md"
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3
                        className={`text-xl font-bold ${isCurrent ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                          }`}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                        <Building2 size={16} />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full w-fit ${isCurrent
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                    >
                      <Calendar size={14} />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString(undefined, {
                          month: "short",
                          year: "numeric",
                        })}
                        {" - "}
                        {isCurrent
                          ? "Present"
                          : new Date(exp.endDate!).toLocaleDateString(undefined, {
                            month: "short",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${isCurrent
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {experiences.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              Details available upon request.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
