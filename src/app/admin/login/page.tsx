"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEnvLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/admin-login", {
        email,
        password,
      });

      if (res.request.responseURL && res.request.responseURL !== window.location.href) {
        window.location.href = res.request.responseURL;
        return;
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-800 p-8"
      >
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-dancing-script text-4xl font-bold text-gray-900 dark:text-white mb-2 hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-dancing-script)' }}
          >
            Aarti Bhutra
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-outfit uppercase tracking-widest">
            Admin Access
          </p>
        </div>

        <form onSubmit={handleEnvLogin} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>


      </motion.div>
    </div>
  );
}
