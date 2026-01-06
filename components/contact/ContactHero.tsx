"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-start justify-end",
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-blue-600" />
             <span className="font-contact-tech text-sm font-semibold uppercase tracking-widest text-blue-600">
               Contact
             </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9] mb-8">
            Let's <span className="text-neutral-400 dark:text-neutral-600">Build</span> <br />
            The Future.
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Decorative large text background */}
      {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.03] select-none pointer-events-none overflow-hidden w-full">
         <span className="text-[20vw] font-bold leading-none whitespace-nowrap text-right block pr-10 font-contact-tech">
            GET IN TOUCH
         </span>
      </div> */}
    </section>
  );
};

export default ContactHero;