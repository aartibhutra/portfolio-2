"use client";

import { useState } from "react";
import { Mail, Send, Loader2, Phone, Linkedin, Github } from "lucide-react";
import axios from "axios";

// Force recompile
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Contact Me
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                <a href="mailto:aartimaheshwari160@gmail.com" className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  aartimaheshwari160@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                <a href="tel:+916378807160" className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +91 6378807160
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <Linkedin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/aartibhutra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  View Profile
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">GitHub</h3>
                <a
                  href="https://github.com/aartibhutra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-gray-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className={`group w-full py-4 rounded-full font-bold text-lg text-white flex items-center justify-center gap-2 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg ${success
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                  }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : success ? (
                  "Message Sent Successfully!"
                ) : (
                  <>
                    Send Message <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
