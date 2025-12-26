"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Minus, HelpCircle } from "lucide-react";

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
    <div className="border-b border-neutral-200 dark:border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className={cn(
          "text-lg font-medium transition-colors duration-300",
          isOpen ? "text-blue-600 dark:text-blue-400" : "text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}>
          {faq.question}
        </span>
        <div className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
          isOpen 
            ? "border-blue-600 bg-blue-600 text-white rotate-180" 
            : "border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm md:text-base font-primary">
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
    <section className="w-full bg-neutral-50 dark:bg-[#080808] py-24 px-6 font-primary">
      <FontStyles />
      <div className="mx-auto max-w-3xl">
        
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 mb-6">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Common Queries
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked <span className="text-neutral-400 dark:text-neutral-600">Questions</span>
          </h2>
        </div>

        <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-2 md:p-8 shadow-sm">
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