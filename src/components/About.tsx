import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const About = async () => {
  const about = await prisma.aboutSection.findFirst();

  if (!about) return null;

  return (
    <section id="about" className="relative py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Background Signature/Title */}
      <div className="absolute top-10 left-10 md:left-20 pointer-events-none opacity-10">
      </div>

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative flex justify-center lg:justify-center">
            <div className="relative w-64 md:w-80 lg:w-96 aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl">
              {about.imageUrl ? (
                <img
                  src={about.imageUrl}
                  alt="Aarti Bhutra"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-50" />
            </div>
          </div>

          {/* Content Column - Overlapping Card Style */}
          <div className="relative lg:-ml-32 lg:mt-20">
            <div className="bg-white/90 dark:bg-blue-600/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl text-gray-900 dark:text-white relative leading-relaxed text-lg border border-gray-100 dark:border-none">
              {about.shortIntro && (
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-100">
                  {about.shortIntro}
                </h3>
              )}

              <p className="opacity-90 break-words whitespace-pre-line mb-8 text-gray-700 dark:text-gray-100">
                {about.description}
              </p>

              {about.btnText && about.btnLink && (
                <Link
                  href={about.btnLink}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-blue-600 dark:bg-black text-white font-medium rounded-full hover:scale-105 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {about.btnText}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
