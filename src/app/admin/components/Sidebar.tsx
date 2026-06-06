"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LayoutDashboard,
  Edit,
  User,
  Code,
  Briefcase,
  FileText,
  Award,
  Trophy,
  Clock,
  MessageSquare,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Edit Hero", href: "/admin/hero", icon: Edit },
  { name: "Edit About", href: "/admin/about", icon: User },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Experience", href: "/admin/experience", icon: Clock },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleLogout = async () => {
    // 1. Logout from NextAuth (Google)
    await signOut({ redirect: false });

    // 2. Logout from Custom Auth (Cookie)
    await axios.post("/api/admin/logout");

    // 3. Redirect to login
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-800/50 p-6 flex flex-col z-40 shadow-xl">
      {/* ... existing Logo ... */}
      <div className="mb-8 px-2">
        <Link
          href="/"
          className="font-dancing-script text-3xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'var(--font-dancing-script)' }}
        >
          Aarti Bhutra
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1 font-outfit uppercase tracking-widest">
          Admin Panel
        </p>
      </div>

      {/* ... existing Navigation ... */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar pb-4">
        {links.map((link, index) => {
          const isActive = path === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Active/Hover Background */}
              {(isActive || hoveredIndex === index) && (
                <motion.div
                  layoutId="sidebar-pill"
                  className={`absolute inset-0 rounded-xl ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "bg-gray-100 dark:bg-gray-800/50"
                    }`}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}

              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto pt-6 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col gap-4 px-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            View Site
          </Link>
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors w-full"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
