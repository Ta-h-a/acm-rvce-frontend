"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Clock,
  Building2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Clock,
  Building2,
};

interface ContactInfoProps {
  title: string;
  items: Array<{
    icon: string;
    label: string;
    value: string;
    link?: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  className?: string;
}

export default function ImprovedContactInfo({
  title,
  items,
  socialLinks,
  className,
}: ContactInfoProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Main Info Cards - Grid Layout - Filter out address */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {items.filter(item => item.label !== "Address").map((item, index) => {
          const Icon = iconMap[item.icon] || MapPin;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/10 p-4 sm:p-5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm sm:text-base text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium block break-words leading-relaxed"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed whitespace-pre-line">{item.value}</p>
                    )}
                  </div>

                  {/* Arrow indicator for links */}
                  {item.link && (
                    <div className="flex-shrink-0 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Row: Social Links, Office Hours, and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Social Links Section */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: items.length * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30 p-4 sm:p-6"
          >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">Connect With Us</h3>
              <p className="text-xs text-muted-foreground">
                Stay updated with our latest news
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Follow us on social media for updates, events, and more
          </p>

          <div className="space-y-2.5 sm:space-y-3">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (items.length + index) * 0.1 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.platform}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Follow us for updates
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Response Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (items.length + socialLinks.length) * 0.1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/30 p-4 sm:p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white shadow-lg">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">Quick Response</h3>
            <p className="text-xs text-muted-foreground">
              We're always here for you
            </p>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-start gap-3 p-3 sm:p-4 bg-white dark:bg-neutral-800/50 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Average Response Time</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                &lt; 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 sm:p-4 bg-white dark:bg-neutral-800/50 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Best Time to Reach</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Monday - Friday, 9 AM - 5 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 sm:p-4 bg-white dark:bg-neutral-800/50 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-purple-600 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Active Community</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                150+ members
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Map with Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (items.length + socialLinks.length + 1) * 0.1 }}
        className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden shadow-lg"
      >
        {/* Address Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">Visit Us</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {items.find(item => item.label === "Address")?.value || "R.V. College of Engineering, Mysore Road, Bengaluru, Karnataka 560059"}
              </p>
              <a
                href={items.find(item => item.label === "Address")?.link || "https://maps.google.com/?q=R.V.+College+of+Engineering"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
              >
                <span>Get Directions</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-neutral-100 dark:bg-neutral-800">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.4969%2C12.9224%2C77.5009%2C12.9264&layer=mapnik&marker=12.9244%2C77.4989"
            className="w-full h-full border-0"
            loading="lazy"
            title="RVCE Location Map"
          />
        </div>
      </motion.div>
      </div>
    </div>
  );
}
