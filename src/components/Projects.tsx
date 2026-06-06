import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

const Projects = async () => {
  const projects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, side projects, and experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-600 text-lg font-medium">
                      No Preview
                    </span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all hover:scale-110"
                      title="View Code"
                    >
                      <Github size={24} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-all hover:scale-110 shadow-lg shadow-blue-600/30"
                      title="Live Demo"
                    >
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
