import TemplateCard from "./template-card"
import type { Template } from "@/types" // Import Template type

interface FeaturedTemplatesSectionProps {
  featuredTemplates: Template[]
}

export default function FeaturedTemplatesSection({ featuredTemplates }: FeaturedTemplatesSectionProps) {
  if (featuredTemplates.length === 0) return null

  return (
    <section id="featured" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700 ease-out">
          Featured Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-200">
          {featuredTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} staggerDelay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
