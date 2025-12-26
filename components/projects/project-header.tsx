'use client'

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Mail } from "lucide-react"

interface ProjectHeaderProps {
  title: string;
  description: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ProjectHeader({ 
  title, 
  description, 
  searchTerm, 
  onSearchChange,
}: ProjectHeaderProps) {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing with:", email);
    alert(`Subscribed with ${email}! (Placeholder)`);
    setEmail("");
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl mt-8">
          {title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-xl flex flex-col gap-4 md:max-w-2xl md:flex-row md:gap-2 md:items-center">
        
        <div className="flex w-full items-center gap-2 rounded-full border bg-background/50 p-1.5 backdrop-blur-sm shadow-sm sm:p-2">
          <Search className="ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-grow appearance-none border-0 bg-transparent px-2 py-1 text-sm shadow-none focus:outline-none focus:ring-0"
          />
        </div>

        <form 
          onSubmit={handleSubscribe} 
          className="flex w-full items-center gap-2 rounded-full border bg-background/50 p-1.5 backdrop-blur-sm shadow-sm sm:p-2 md:w-auto"
        >
          <Mail className="ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow appearance-none border-0 bg-transparent px-2 py-1 text-sm shadow-none focus:outline-none focus:ring-0 md:w-48"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="mr-1 flex-shrink-0 rounded-full" 
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
} 
