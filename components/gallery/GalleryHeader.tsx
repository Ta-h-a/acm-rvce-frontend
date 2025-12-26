"use client";

// Required libraries:
// npm install framer-motion lucide-react clsx tailwind-merge
import React, { ReactNode } from "react";
import { motion, AnimatePresence, Variants, TargetAndTransition } from "framer-motion";
import { Search } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Local utility function ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Local TextEffect Component (self-contained for this component) ---
type TextEffectProps = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
};

function TextEffect({ children, as = "p", className, delay = 0 }: TextEffectProps) {
  const MotionTag = motion[as as keyof typeof motion] as React.FC<any>;
  const words = children.split(/(\s+)/); // Split by spaces, keeping them

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, skewY: 5 },
      visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as unknown as any },
    },
  };

  return (
    <MotionTag variants={containerVariants} initial="hidden" animate="visible" className={cn("whitespace-pre-wrap", className)}>
      {words.map((word, index) => (
        <motion.span key={index} variants={itemVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}


// --- Local SearchBar Component (for styling demonstration) ---
interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => (
  <div className="relative w-full">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search events, workshops, and more..."
      className="w-full pl-12 pr-4 py-3 rounded-full bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
    />
  </div>
);


// --- Main Enhanced GalleryHeader Component ---
interface GalleryHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function GalleryHeader({ searchQuery, onSearchChange }: GalleryHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
      visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as unknown as any },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-black">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center"
      >
        <TextEffect
          as="h1"
          className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Gallery
        </TextEffect>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          A visual journey through our workshops, hackathons, and community moments.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 max-w-xl mx-auto"
        >
          <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-lg">
             <SearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
             />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
