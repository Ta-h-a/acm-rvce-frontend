"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BrainCircuit, 
  Code2, 
  Smartphone, 
  ShieldCheck, 
  Cpu, 
  Palette, 
  ArrowUpRight,
  Terminal,
  Globe,
  Wifi,
  Layers
} from "lucide-react";

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

// --- Visual Widgets for Cards ---

const AIVisual = () => (
  <div className="absolute right-4 top-4 w-32 h-32 opacity-20 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-blue-500"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
    <svg className="absolute inset-0 w-full h-full stroke-blue-500/50" strokeWidth="1">
      <path d="M16 16 L48 48 M80 16 L48 48 M16 80 L48 48 M80 80 L48 48" />
    </svg>
  </div>
);

const CodeVisual = () => (
  <div className="absolute right-[-20px] bottom-[-20px] w-48 h-32 bg-neutral-900/90 rounded-tl-xl border-l border-t border-white/10 p-4 font-tech text-[8px] text-emerald-400 opacity-60 backdrop-blur-sm pointer-events-none select-none">
    <div className="flex gap-1 mb-2">
      <div className="w-2 h-2 rounded-full bg-red-500"/>
      <div className="w-2 h-2 rounded-full bg-yellow-500"/>
      <div className="w-2 h-2 rounded-full bg-green-500"/>
    </div>
    <div className="flex flex-col gap-1">
      <p><span className="text-purple-400">const</span> <span className="text-blue-400">future</span> = <span className="text-yellow-300">await</span> build();</p>
      <p><span className="text-purple-400">if</span> (innovate) {"{"}</p>
      <p className="pl-2">deploy(<span className="text-orange-400">"next-gen"</span>);</p>
      <p>{"}"}</p>
    </div>
  </div>
);

const SecurityVisual = () => (
  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-dashed border-pink-500/30 animate-[spin_10s_linear_infinite] pointer-events-none">
    <div className="absolute inset-2 rounded-full border border-pink-500/20 animate-[spin_5s_linear_infinite_reverse]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <ShieldCheck className="w-8 h-8 text-pink-500/50" />
    </div>
  </div>
);

const IoTVisual = () => (
  <div className="absolute bottom-4 right-4 flex gap-1 items-end h-16 pointer-events-none opacity-40">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-3 bg-cyan-500/50 rounded-t-sm"
        animate={{ height: ["20%", "80%", "40%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
      />
    ))}
  </div>
);

const DesignVisual = () => (
  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-30">
    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-yellow-500 blur-xl" />
    <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-orange-500 mix-blend-multiply blur-xl" />
  </div>
);

// --- Types & Data ---
type DomainItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  className?: string; 
  gradient: string;
  VisualComponent?: React.FC;
};

const domains: DomainItem[] = [
  {
    id: "01",
    title: "AI & Machine Intelligence",
    subtitle: "Predictive Systems",
    description: "Building the brains of tomorrow through deep learning, neural networks, and generative AI research.",
    icon: BrainCircuit,
    className: "md:col-span-2 md:row-span-2 min-h-[320px]", 
    gradient: "from-blue-500/10 via-indigo-500/10 to-transparent",
    VisualComponent: AIVisual
  },
  {
    id: "02",
    title: "Full Stack Web",
    subtitle: "Digital Architectures",
    description: "Crafting immersive, high-performance web experiences using modern frameworks and edge computing.",
    icon: Globe,
    className: "md:col-span-1 md:row-span-1 min-h-[280px]",
    gradient: "from-emerald-500/10 via-teal-500/10 to-transparent",
    VisualComponent: CodeVisual
  },
  {
    id: "03",
    title: "App Development",
    subtitle: "Mobile Ecosystems",
    description: "Engineering native and cross-platform solutions that put power in the palm of your hand.",
    icon: Smartphone,
    className: "md:col-span-1 md:row-span-1 min-h-[280px]",
    gradient: "from-orange-500/10 via-red-500/10 to-transparent",
  },
  {
    id: "04",
    title: "Cybersecurity",
    subtitle: "Network Defense",
    description: "Securing the digital frontier through ethical hacking, cryptography, and systems analysis.",
    icon: ShieldCheck,
    className: "md:col-span-2 md:row-span-1 min-h-[280px]",
    gradient: "from-purple-500/10 via-pink-500/10 to-transparent",
    VisualComponent: SecurityVisual
  },
  {
    id: "05",
    title: "IoT & Embedded",
    subtitle: "Connected Hardware",
    description: "Bridging the physical and digital worlds with smart sensors and automation.",
    icon: Cpu,
    className: "md:col-span-1 md:row-span-1 min-h-[280px]",
    gradient: "from-cyan-500/10 via-blue-500/10 to-transparent",
    VisualComponent: IoTVisual
  },
  {
    id: "06",
    title: "Product Design",
    subtitle: "UI/UX & Art",
    description: "Where aesthetics meet function. Designing interfaces that delight and inspire.",
    icon: Palette,
    className: "md:col-span-1 md:row-span-1 min-h-[280px]",
    gradient: "from-yellow-500/10 via-amber-500/10 to-transparent",
    VisualComponent: DesignVisual
  },
];

// --- Sub-Component: Spotlight Card ---
const SpotlightCard = ({ children, className, gradient }: { children: React.ReactNode; className?: string; gradient: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden rounded-3xl transition-all duration-500 hover:border-neutral-300 dark:hover:border-white/20",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br", gradient)} />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Main Component ---
const DomainsBento = () => {
  return (
    <section className="relative w-full bg-neutral-50 dark:bg-black py-24 px-6 lg:px-12 font-primary overflow-hidden">
      <FontStyles />
      
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fafafa_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Terminal className="h-3 w-3" />
              </span>
              <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                / Our Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Technical <br className="hidden md:block" /> Domains.
            </h2>
          </div>
          
          <div className="max-w-xs">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              We explore the cutting edge of technology. From AI research to systems engineering, our chapters cover the entire digital spectrum.
            </p>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
          {domains.map((domain) => (
            <SpotlightCard 
              key={domain.title} 
              className={domain.className}
              gradient={domain.gradient}
            >
              <div className="flex flex-col h-full justify-between p-8 relative z-10">
                
                {/* Top: Icon & ID */}
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm">
                    <domain.icon className="h-6 w-6 text-neutral-900 dark:text-white" />
                  </div>
                  <span className="font-tech text-xs text-neutral-400/50 group-hover:text-neutral-400 transition-colors">
                    {domain.id}
                  </span>
                </div>

                {/* Bottom: Text Content */}
                <div className="mt-8">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform">
                      {domain.title}
                    </h3>
                    <p className="font-tech text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 opacity-80">
                      {domain.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[90%] opacity-80 group-hover:opacity-100 transition-opacity">
                    {domain.description}
                  </p>

                  <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <div className="p-2 rounded-full bg-neutral-100 dark:bg-white/10">
                       <ArrowUpRight className="h-4 w-4 text-neutral-900 dark:text-white" />
                    </div>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DomainsBento;