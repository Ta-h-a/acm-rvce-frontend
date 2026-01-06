"use client";

import React from "react";
import { motion } from "framer-motion";
import ContactHero from "@/components/contact/ContactHero";
import MultiStepContactForm from "@/components/contact/MultiStepContactForm";
import ImprovedContactInfo from "@/components/contact/ImprovedContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";
import { contactConfig } from "@/lib/config/contact";

// --- Font Injection (Matching Footer) ---
const ContactFonts = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-contact { font-family: 'Manrope', sans-serif; }
    .font-contact-tech { font-family: 'Space Grotesk', monospace; }
  `,
    }}
  />
);

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#050505] font-contact overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-500">
      <ContactFonts />

      {/* Global Background Grid (Consistent with Footer) */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />
         <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050505] via-transparent to-transparent h-full" />
      </div>

      {/* Hero Section */}
      <ContactHero
        title={contactConfig.hero.title}
        subtitle={contactConfig.hero.subtitle}
      />

      <section className="relative z-10 px-6 lg:px-12 pb-24">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Form (Larger focus) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease
              className="lg:col-span-7"
            >
               <div className="mb-12">
                  <h3 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                    Send us a message
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
                    {contactConfig.form.description}
                  </p>
               </div>
              <MultiStepContactForm />
            </motion.div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}