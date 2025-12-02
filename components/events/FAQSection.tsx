"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, HelpCircle } from "lucide-react";

// --- Types ---
export interface FAQ {
  question: string;
  answer: string;
}

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

const AccordionItem = ({ 
  faq, 
  isOpen, 
  onClick 
}: { 
  faq: FAQ; 
  isOpen: boolean; 
  onClick: () => void 
}) => {
  return (
    <div className={cn(
        "border-b border-neutral-200 dark:border-neutral-800 last:border-0 transition-colors duration-300",
        isOpen ? "bg-neutral-50/50 dark:bg-white/[0.02]" : "bg-transparent"
    )}>
      <button
        onClick={onClick}
        className="flex w-full items-start justify-between py-5 px-4 md:px-6 text-left group"
      >
        <span className={cn(
          "text-lg font-semibold tracking-tight transition-colors duration-300 pr-8",
          isOpen ? "text-blue-600 dark:text-blue-400" : "text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}>
          {faq.question}
        </span>
        <span className={cn(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
          isOpen 
            ? "border-blue-600 bg-blue-600 text-white rotate-45" 
            : "border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}>
          <Plus className="h-5 w-5" />
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: "anticipate" }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 md:px-6 pr-12 text-neutral-600 dark:text-neutral-400 leading-relaxed text-base font-primary">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-[#050505] py-24 px-6 font-primary">
      <FontStyles />
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 mb-6">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Support
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Everything you need to know about the club, our events, and how to get involved.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-sm">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              faq={faq} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};