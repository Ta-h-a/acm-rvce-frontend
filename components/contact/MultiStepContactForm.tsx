"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {currentStep === 0 && (
                <>
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                </div>
              )}
            </motion.div>
        </AnimatePresence>
      </div>


        {currentStep < steps.length - 1 ? (
             <button
                onClick={handleNext}
    </div>
  );
}