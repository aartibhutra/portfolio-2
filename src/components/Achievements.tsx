import { prisma } from "@/lib/prisma";
import { Trophy, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

const Achievements = async () => {
  const achievements = await prisma.achievement.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-black/20">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Recognition
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Honors & Achievements
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 dark:bg-yellow-900/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

              <div className="relative">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:rotate-6 transition-transform">
                  <Trophy size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                {item.detail && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {item.detail}
                  </p>
                )}

                {item.date && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Calendar size={14} />
                    <span>
                      {new Date(item.date).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {achievements.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              Additional honors available upon request.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
