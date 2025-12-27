"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const steps = [
  {
    id: 1,
    title: "Personal Info",
    description: "Tell us who you are",
    icon: User,
    fields: ["fullName", "email"],
  },
  {
    id: 2,
    title: "Contact Details",
    description: "How can we reach you?",
    icon: Phone,
    fields: ["phone", "subject"],
  },
  {
    id: 3,
    title: "Your Message",
    description: "What's on your mind?",
    icon: MessageSquare,
    fields: ["message"],
  },
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
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors: Partial<FormData> = {};

    currentFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      if (!value || value.trim() === "") {
        newErrors[field as keyof FormData] = "This field is required";
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Please enter a valid email";
      } else if (field === "phone" && !/^\d{10}$/.test(value)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 sm:p-8 md:p-10 rounded-xl border border-green-200 dark:border-green-800/30 shadow-lg">
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground"
          >
            Message Sent Successfully!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-md"
          >
            Thank you for reaching out. We'll get back to you as soon as
            possible.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => {
                setFormStatus("idle");
                setCurrentStep(0);
              }}
              className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
            >
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (formStatus === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 p-6 sm:p-8 md:p-10 rounded-xl border border-red-200 dark:border-red-800/30 shadow-lg">
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Oops! Something went wrong
          </h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't send your message. Please try again or contact us directly.
          </p>
          <Button
            onClick={() => setFormStatus("idle")}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  const CurrentStepIcon = steps[currentStep].icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Compact Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6 px-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 relative z-10",
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50"
                        : isCompleted
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
                    )}
                    animate={{
                      scale: isActive ? 1.15 : 1,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </motion.div>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex items-center mx-3 sm:mx-6">
                    <motion.svg
                      className={cn(
                        "w-8 h-8 sm:w-12 sm:h-12 transition-all duration-300",
                        isCompleted
                          ? "text-green-500"
                          : "text-neutral-300 dark:text-neutral-700"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: isCompleted ? 1 : 0.5,
                        scale: isCompleted ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Step Info */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">
            Step {currentStep + 1} of {steps.length}
          </p>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {steps[currentStep].title}
          </h3>
        </div>
      </div>

      {/* Form Card */}
      <motion.div
        className="relative overflow-hidden bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
        
        <div className="p-4 sm:p-6 md:p-8">
          {/* Form Fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-5 mb-6 sm:mb-8"
            >
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <>
                  <div>
                    <Label htmlFor="fullName" className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4 text-blue-600" />
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={cn(
                        "h-12 text-base",
                        errors.fullName && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={cn(
                        "h-12 text-base",
                        errors.email && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 1 && (
                <>
                  <div>
                    <Label htmlFor="phone" className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      maxLength={10}
                      className={cn(
                        "h-12 text-base",
                        errors.phone && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="subject" className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      className={cn(
                        "h-12 text-base",
                        errors.subject && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Message */}
              {currentStep === 2 && (
                <div>
                  <Label htmlFor="message" className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className={cn(
                      "flex w-full rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                      errors.message && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              size="lg"
              className={cn(
                "flex items-center gap-2",
                currentStep === 0 && "invisible"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={formStatus === "submitting"}
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {formStatus === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
