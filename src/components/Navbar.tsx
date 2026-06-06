"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];



const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  // Close mobile menu when screen resizes to desktop to avoid layout issues
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed w-full z-50 top-4 start-0 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-full pointer-events-auto border border-gray-200/50 dark:border-gray-800/50 relative">

        {/* Logo */}
        <Link
          href="#hero"
          className="px-4 hover:opacity-80 transition-opacity font-dancing-script"
          style={{ fontFamily: 'var(--font-dancing-script)' }}
        >
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            Aarti Bhutra
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-1 items-center bg-gray-100 dark:bg-gray-800/50 p-1 rounded-full">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:text-black dark:hover:text-white"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-2">
          <Link
            href="/blogs"
            className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blogs
          </Link>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto", display: "block" },
          closed: { opacity: 0, height: 0, transitionEnd: { display: "none" } }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden absolute top-full left-0 right-0 px-4 mt-2 pointer-events-auto"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="block sm:hidden px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Blogs
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
