import { prisma } from "@/lib/prisma";
import ProjectForm from "../components/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) return notFound();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) return notFound();

  // Convert prisma result to match ProjectFormProps
  const projectData = {
    id: project.id,
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    github: project.github,
    liveUrl: project.liveUrl,
    image: project.image,
    visible: project.visible,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update project details.
        </p>
      </div>
      <ProjectForm initialData={projectData} />
    </div>
  );
}
