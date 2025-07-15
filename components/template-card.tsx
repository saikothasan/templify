import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Template } from "@/types"
import { Button } from "./ui/button"

interface TemplateCardProps {
  template: Template
  staggerDelay?: number // Optional delay for staggered animation
}

export default function TemplateCard({ template, staggerDelay = 0 }: TemplateCardProps) {
  const animationDelay = `${staggerDelay}ms`
  return (
    <Card
      className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 h-full flex flex-col bg-card animate-in fade-in zoom-in-95 duration-300 ease-out"
      style={{ animationDelay }}
    >
      <Link href={`/templates/${template.slug}`} className="block flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/10] relative overflow-hidden">
            <Image
              src={template.imageUrl || "/placeholder.svg"}
              alt={template.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {template.isNew && (
              <Badge variant="default" className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-md">
                NEW
              </Badge>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="font-medium text-primary">
              {template.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-1 fill-accent text-accent" />
              <span>
                {template.rating} ({template.reviewsCount})
              </span>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {template.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{template.description}</p>
        </CardContent>
        <CardFooter className="p-5 border-t mt-auto">
          <div className="flex justify-between items-center w-full">
            <p className="text-2xl font-bold text-primary">
              {typeof template.price === "number" ? `$${template.price}` : template.price}
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="group-hover:text-primary group-hover:bg-primary/10 active:scale-95"
            >
              View Details{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
