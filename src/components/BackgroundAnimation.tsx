"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const BackgroundAnimation = () => {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effects for blobs
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  // Rotate effects based on scroll
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -45]);

  // Additional scroll effects (moved to top level to fix Hook rules)
  const y4 = useTransform(scrollY, [0, 500], [100, -100]);
  const opacity4 = useTransform(scrollY, [0, 300], [0, 0.1]);

  const y5 = useTransform(scrollY, [0, 800], [200, -200]);
  const opacity5 = useTransform(scrollY, [200, 600], [0, 0.15]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Gradient Blobs */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-purple-400 dark:bg-purple-600 rounded-full blur-[100px] opacity-50 mix-blend-multiply dark:mix-blend-normal"
      />

      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-400 dark:bg-blue-600 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:mix-blend-normal"
      />

      <motion.div
        style={{ y: y3 }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-cyan-400 dark:bg-cyan-500 rounded-full blur-[80px] opacity-40 mix-blend-multiply dark:mix-blend-normal"
      />

      {/* Additional scroll-revealed elements */}
      <motion.div
        style={{
          y: y4,
          opacity: opacity4
        }}
        className="absolute top-[20%] right-[20%] w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-pink-400 dark:bg-pink-500 rounded-full blur-[60px]"
      />

      <motion.div
        style={{
          y: y5,
          opacity: opacity5
        }}
        className="absolute bottom-[30%] left-[10%] w-[125px] h-[125px] md:w-[250px] md:h-[250px] bg-orange-400 dark:bg-orange-500 rounded-full blur-[70px]"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] invert dark:invert-0" />
    </div>
  );
};
