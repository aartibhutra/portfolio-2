import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidebar from "./components/Sidebar";
import VisitorChart from "./components/VisitorChart";
import { Users, Code, Briefcase, FileText, ArrowUpRight } from "lucide-react";

export default async function Dashboard() {
  // CHECK GOOGLE ADMIN LOGIN
  const session = await getServerSession(authOptions);
  const isGoogleAdmin =
    session?.user?.email === process.env.ALLOWED_GOOGLE_ADMIN;

  // CHECK ENV EMAIL/PASS LOGIN (JWT COOKIE)
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token")?.value;

  let isEnvAdmin = false;

  if (token) {
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
      );
      isEnvAdmin = true;
    } catch { }
  }

  // FINAL AUTH CHECK
  if (!isGoogleAdmin && !isEnvAdmin) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-medium text-gray-600">
        Access Denied
      </div>
    );
  }

  // FETCH COUNTS
  const skillsCount = await prisma.skill.count();
  const projectsCount = await prisma.project.count();
  const blogsCount = await prisma.blog.count();

  // Visitors data placeholder (replace later with analytics)
  const visitors = 0;

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-gray-100 font-sans w-full">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-white dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Visitors"
            value={visitors}
            icon={Users}
            trend="+12.5%"
            color="blue"
          />
          <StatCard
            title="Total Skills"
            value={skillsCount}
            icon={Code}
            trend="+2"
            color="green"
          />
          <StatCard
            title="Projects"
            value={projectsCount}
            icon={Briefcase}
            trend="+1"
            color="purple"
          />
          <StatCard
            title="Published Blogs"
            value={blogsCount}
            icon={FileText}
            trend="+3"
            color="rose"
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Visitor Analytics</h3>
              <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm rounded-lg px-3 py-1 focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <VisitorChart />
          </div>

          {/* Recent Activity / Quick Actions Placeholder */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group">
                <span className="font-medium text-sm">Add New Project</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group">
                <span className="font-medium text-sm">Write a Blog Post</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group">
                <span className="font-medium text-sm">Update Skills</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  trend: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
        <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{title}</p>
      </div>
    </div>
  );
}
