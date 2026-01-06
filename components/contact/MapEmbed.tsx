"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  embedUrl,
  title = "Location Map",
  className,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
        {/* Tech Frame overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border border-neutral-200 dark:border-white/10" />
        
        {/* Map Container */}
        <div className="w-full h-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <iframe
                src={embedUrl}
                title={title}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // The filter grayscale makes it blend into the dark theme better until interaction
                className="w-full h-full opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
        </div>

        {/* Floating Label */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full border border-neutral-200 dark:border-white/10 shadow-sm pointer-events-none">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-contact-tech uppercase tracking-widest font-bold text-neutral-900 dark:text-white">
                    RVCE Campus
                </span>
            </div>
        </div>
    </div>
  );
};

export default MapEmbed;