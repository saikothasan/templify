"use client"

import { useState, useEffect } from "react"
import type { Template } from "@/types"
import TemplateCard from "./template-card"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import SkeletonCard from "./skeleton-card"
import { getAllTemplatesAction } from "@/app/actions/template-actions" // Import the action

interface RelatedTemplatesProps {
  currentTemplateId: string
  currentCategory: string
  initialData?: Template[] // Optional initial data from server
}

export default function RelatedTemplates({ currentTemplateId, currentCategory, initialData }: RelatedTemplatesProps) {
  const [related, setRelated] = useState<Template[]>(initialData || [])
  const [isLoading, setIsLoading] = useState(!initialData)

  useEffect(() => {
    if (!initialData) {
      setIsLoading(true)
      const fetchRelated = async () => {
        // Use the server action to fetch all templates, then filter client-side
        const allTemplates = await getAllTemplatesAction()
        const filteredRelated = allTemplates
          .filter((template) => template.category === currentCategory && template.id !== currentTemplateId)
          .slice(0, 3)
        setRelated(filteredRelated)
        setIsLoading(false)
      }
      fetchRelated()
    } else {
      setIsLoading(false)
    }
  }, [currentTemplateId, currentCategory, initialData])

  if (isLoading) {
    return (
      <section className="mt-16 pt-12 border-t border-border/20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">You Might Also Like</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    )
  }

  if (related.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-border/20 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">You Might Also Like</h2>
        <Link href={`/templates?category=${encodeURIComponent(currentCategory)}`} passHref>
          <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
            View All in {currentCategory}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map((template, index) => (
          <TemplateCard key={template.id} template={template} staggerDelay={index * 100} />
        ))}
      </div>
    </section>
  )
}
