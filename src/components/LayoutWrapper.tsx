"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main
      className={
        isAdmin
          ? "w-full"
          : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      }
    >
      {children}
    </main>
  );
}
