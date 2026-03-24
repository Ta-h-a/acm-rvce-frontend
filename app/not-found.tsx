import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Aurora Background Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"
        aria-hidden="true"
      />
      
      {/* Animated Blue Aurora Glow */}
      <div
        className="absolute top-[-20%] left-1/2 transform -translate-x-1/2 w-[150%] h-[60%] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-[120px] opacity-60 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.05) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />
      
      <div
        className="absolute bottom-[-20%] right-1/4 w-[100%] h-[40%] bg-gradient-radial from-primary/15 via-transparent to-transparent blur-[100px] opacity-40"
        style={{
          background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />
      
      {/* Large 404 Background Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span 
          className="text-[25rem] font-bold opacity-[0.03] dark:opacity-[0.05]"
          style={{ 
            fontFamily: 'Space Grotesk, monospace',
            color: 'hsl(var(--foreground))'
          }}
        >
          404
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8">
        
        {/* Error Code Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary font-tech">ERROR 404</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight font-primary">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="group relative overflow-hidden">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        {/* Additional Help Text */}
        <div className="pt-8 text-sm text-muted-foreground">
          <p>If you believe this is an error, please contact our team at{" "}
            <a 
              href="mailto:acm@rvce.edu.in" 
              className="text-primary hover:underline font-medium"
            >
              acm@rvce.edu.in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
