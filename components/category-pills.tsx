"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type React from "react"

interface CategoryPillsProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  iconMap?: Record<string, React.ReactNode>
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
  iconMap = {},
}: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out delay-300">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "cursor-pointer px-4 py-2 text-sm transition-all duration-200 flex items-center active:scale-90 transform",
            selectedCategory === category
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md scale-105"
              : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border hover:border-accent",
            category === "Free" && selectedCategory === "Free"
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "",
            category === "Free" && selectedCategory !== "Free" ? "border-accent text-accent hover:bg-accent/10" : "",
          )}
        >
          {iconMap[category]}
          {category}
        </Badge>
      ))}
    </div>
  )
}
