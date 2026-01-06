"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface ContactInfoProps {
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
  items,
  socialLinks,
  className,
}: ContactInfoProps) {
  
  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, className?: string) => {
    const Icon = (Icons as any)[iconName] || Icons.HelpCircle;
    return <Icon className={className} />;
  };

  return (
    <div className={cn("w-full space-y-8", className)}>
      
      {/* 1. Primary Contact Details */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div 
            key={item.label}
            className="group flex items-start gap-5 p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="shrink-0 h-10 w-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600 group-hover:border-blue-500/30 transition-colors">
                {renderIcon(item.icon, "w-5 h-5")}
            </div>
            <div className="flex flex-col">
                <span className="font-contact-tech text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
                    {item.label}
                </span>
                {item.link ? (
                    <a href={item.link} className="text-base font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                        {item.value}
                    </a>
                ) : (
                    <p className="text-base font-medium text-neutral-900 dark:text-white max-w-xs">
                        {item.value}
                    </p>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Social Connect */}
      <div className="pt-6 border-t border-neutral-200 dark:border-white/10">
         <h4 className="font-contact-tech text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            Digital Presence
         </h4>
         <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
               <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-transparent text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all"
               >
                  {renderIcon(link.icon, "w-4 h-4")}
                  <span>{link.platform}</span>
               </a>
            ))}
         </div>
      </div>
    </div>
  );
}