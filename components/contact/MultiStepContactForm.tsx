"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const steps = [
  { id: 1, title: "Identity", fields: ["fullName", "email"] },
  { id: 2, title: "Coordinates", fields: ["phone", "subject"] },
  { id: 3, title: "Transmission", fields: ["message"] },
];

export default function MultiStepContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Input styles
  const inputClasses = "w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-4 text-xl md:text-2xl text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors font-light";
  const labelClasses = "block text-xs font-contact-tech font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (!value || value.trim() === "") {
        newErrors[field as keyof FormData] = "REQUIRED";
        isValid = false;
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "INVALID EMAIL";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
        setFormStatus("success");
    }, 1500);
  };

  // Success State
  if (formStatus === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        className="h-full flex flex-col items-center justify-center p-12 border border-neutral-200 dark:border-white/10 rounded-3xl bg-neutral-50 dark:bg-white/5 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
            <Icons.Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Message Received</h3>
        <p className="text-neutral-500 dark:text-neutral-400">We'll be in touch shortly.</p>
        <button 
            onClick={() => { setFormStatus("idle"); setCurrentStep(0); setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" }); }}
            className="mt-8 text-sm font-contact-tech uppercase tracking-widest border-b border-transparent hover:border-neutral-900 dark:hover:border-white transition-colors"
        >
            Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Progress / Step Header */}
      <div className="flex items-end justify-between mb-12 border-b border-neutral-200 dark:border-white/10 pb-6">
         <div className="flex flex-col gap-1">
            <span className="text-xs font-contact-tech uppercase tracking-widest text-neutral-400">Step {currentStep + 1} / {steps.length}</span>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white">{steps[currentStep].title}</h2>
         </div>
         <div className="flex gap-2">
            {steps.map((_, idx) => (
                <div 
                    key={idx}
                    className={cn(
                        "h-1 w-8 rounded-full transition-colors duration-300",
                        idx <= currentStep ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-800"
                    )}
                />
            ))}
         </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12"
            >
              {currentStep === 0 && (
                <>
                  <div className="group">
                    <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={inputClasses}
                      autoFocus
                    />
                    {errors.fullName && <span className="text-red-500 text-xs mt-2 block font-contact-tech">{errors.fullName}</span>}
                  </div>
                  <div className="group">
                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className={inputClasses}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-2 block font-contact-tech">{errors.email}</span>}
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="group">
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={inputClasses}
                      autoFocus
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="subject" className={labelClasses}>Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      className={inputClasses}
                    />
                    {errors.subject && <span className="text-red-500 text-xs mt-2 block font-contact-tech">{errors.subject}</span>}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="group">
                  <label htmlFor="message" className={labelClasses}>Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={4}
                    className={cn(inputClasses, "resize-none h-40")}
                    autoFocus
                  />
                  {errors.message && <span className="text-red-500 text-xs mt-2 block font-contact-tech">{errors.message}</span>}
                </div>
              )}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-12">
        <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
                "group flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors",
                currentStep === 0 ? "opacity-0 pointer-events-none" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            )}
        >
            <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
        </button>

        {currentStep < steps.length - 1 ? (
             <button
                onClick={handleNext}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 dark:bg-white px-8 font-medium text-white dark:text-black transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
                <span className="relative flex items-center gap-2">
                    Next Step <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
        ) : (
            <button
                onClick={handleSubmit}
                disabled={formStatus === "submitting"}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-medium text-white transition-all hover:bg-blue-700"
            >
                <span className="relative flex items-center gap-2">
                    {formStatus === "submitting" ? "Transmitting..." : "Send Message"} 
                    {!formStatus && <Icons.Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
            </button>
        )}
      </div>
    </div>
  );
}