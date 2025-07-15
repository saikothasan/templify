import Link from "next/link"
import TemplateCard from "./template-card"
import { Button } from "@/components/ui/button"
import { Gift, ArrowRight } from "lucide-react"
import type { Template } from "@/types" // Import Template type

interface FreeTemplatesSectionProps {
  freeTemplates: Template[]
}

export default function FreeTemplatesSection({ freeTemplates }: FreeTemplatesSectionProps) {
  if (freeTemplates.length === 0) return null

  return (
    <section
      id="free-templates"
      className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-background dark:from-accent/10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700 ease-out">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground inline-flex items-center">
              <Gift className="mr-3 h-8 w-8 text-accent" />
              Grab Our Free Templates
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              High-quality templates to get you started, completely free!
            </p>
          </div>
          <Link href="/templates?filter=free" passHref>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 hover:text-accent active:scale-95 bg-transparent"
            >
              View All Free Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-200">
          {freeTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} staggerDelay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
