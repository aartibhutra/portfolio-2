"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

interface HeroContentProps {
  headline?: string;
  subheadline?: string | null;
  primaryBtnText?: string | null;
  primaryBtnLink?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnLink?: string | null;
}

export const HeroContent = ({
  headline,
  subheadline,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  imageUrl,
}: HeroContentProps & { imageUrl?: string | null }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden py-20"
    >
      <div className="z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white drop-shadow-xl"
          >
            {headline || ""}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed"
          >
            {subheadline || ""}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            {primaryBtnText && (
              <Link
                href={primaryBtnLink || "#projects"}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-blue-600/20"
              >
                {primaryBtnText}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {secondaryBtnText && (
              <Link
                href={secondaryBtnLink || "/resume.pdf"}
                className="group inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full backdrop-blur-sm transition-all hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/50"
              >
                {secondaryBtnText}
                <Download className="ml-2 w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          {imageUrl ? (
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl glow-border">
              <Image
                src={imageUrl}
                alt="Profile"
                fill
                className="object-cover dark:grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gray-800/50 animate-pulse" />
          )}
        </motion.div>
      </div>
    </section>
  );
};
