import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/20 py-24 md:py-36">
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="heroPattern"
              patternUnits="userSpaceOnUse"
              width="60"
              height="60"
              patternTransform="scale(1) rotate(45)"
            >
              <circle cx="10" cy="10" r="1.5" className="fill-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroPattern)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 md:px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-in fade-in zoom-in-90 duration-500 ease-out">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Fresh Designs, Future Ready
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-200">
          Elevate Your Digital Presence
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-300">
          Discover cutting-edge, professionally designed templates to accelerate your projects and inspire growth.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-400">
          <Link href="/templates" passHref>
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-shadow duration-300 active:scale-95"
            >
              Explore Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/#featured" passHref>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-primary dark:border-primary/40 dark:text-primary dark:hover:bg-primary/20 active:scale-95"
            >
              View Featured
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
