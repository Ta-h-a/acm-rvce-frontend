"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

// --- Utility: Wrap Function (Replaces @motionone/utils) ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

// --- Data ---
const projects = [
  {
    id: 1,
    title: "Fintech Core",
    category: "System Arch",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Neuro Interface",
    category: "AI Research",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Urban Pulse",
    category: "IoT Network",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cipher Vault",
    category: "Cybersec",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Quant Ledger",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
  },
];

// --- Sub-Component: Moving Card ---
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className="group relative mx-4 h-[300px] w-[450px] shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 cursor-pointer">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

      {/* Floating Info */}
      <div className="absolute top-4 right-4 z-10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg">
            <ArrowUpRight className="h-5 w-5 text-black" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <span className="font-tech text-xs text-blue-400 uppercase tracking-widest mb-1 block">
            {project.category}
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight">
            {project.title}
        </h3>
      </div>
    </div>
  );
};

// --- Sub-Component: Velocity Strip ---
interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Use the local wrap function
  // We want to wrap between -20% and -45% to create the infinite loop effect
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// --- Main Component ---
const ProjectVelocity = () => {
  return (
    <section className="w-full bg-white dark:bg-[#050505] py-24 border-t border-neutral-200 dark:border-white/10 font-primary overflow-hidden">
      <FontStyles />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                <span className="font-tech text-xs uppercase tracking-widest text-neutral-500">Selected Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
                Impact in <br/> Motion.
            </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            From experimental prototypes to deployed production systems, our projects define the bleeding edge of student innovation.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <ParallaxText baseVelocity={-2}>
            {projects.map((project) => (
                <ProjectCard key={`row1-${project.id}`} project={project} />
            ))}
        </ParallaxText>
        
        <ParallaxText baseVelocity={2}>
            {projects.map((project) => (
                <ProjectCard key={`row2-${project.id}`} project={project} />
            ))}
        </ParallaxText>
      </div>

    </section>
  );
};

export default ProjectVelocity;