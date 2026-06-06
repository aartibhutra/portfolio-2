import { prisma } from "@/lib/prisma";
import AboutForm from "./components/AboutForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  // Fetch existing or create default
  let about = await prisma.aboutSection.findFirst();

  if (!about) {
    about = await prisma.aboutSection.create({
      data: {
        shortIntro: "",
        description: "",
      }
    })
  }

  const initialData = {
    id: about.id,
    shortIntro: about.shortIntro,
    description: about.description,
    imageUrl: about.imageUrl,
    btnText: about.btnText,
    btnLink: about.btnLink,
    highlights: about.highlights,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Me Configuration</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal introduction and photo.
        </p>
      </div>
      <AboutForm initialData={initialData} />
    </div>
  );
}
