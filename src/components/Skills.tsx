import { prisma } from "@/lib/prisma";
import { BookOpen } from "lucide-react";

const Skills = async () => {
  const categories = await prisma.skillCategory.findMany({
    include: {
      skills: {
        orderBy: { id: "asc" },
      },
    },
    orderBy: { id: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Technical <span className="text-blue-600">Profiency</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">
                  {category.name}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          {skill.isLearning && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                              <BookOpen size={10} strokeWidth={2.5} />
                              Learning
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
