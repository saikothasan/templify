"use client"

import { cn } from "@/lib/utils"
import SkeletonCard from "@/components/skeleton-card" // Import SkeletonCard

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getAllTemplatesAction } from "@/app/actions/template-actions" // Import the new action
import TemplateCard from "@/components/template-card"
import CategoryPills from "@/components/category-pills"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ListFilter, LayoutGrid, LayoutList, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Template } from "@/types" // Import Template type

export default function TemplatesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategoryQuery = searchParams.get("category")
  const initialFilterQuery = searchParams.get("filter")

  let initialSelected = "All"
  if (initialFilterQuery === "free") {
    initialSelected = "Free"
  } else if (initialCategoryQuery) {
    initialSelected = initialCategoryQuery
  }

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedPill, setSelectedPill] = useState(initialSelected)
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured")
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [allTemplates, setAllTemplates] = useState<Template[]>([]) // State to hold all templates
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true) // Loading state for templates

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true)
      const templatesData = await getAllTemplatesAction()
      setAllTemplates(templatesData)
      setIsLoadingTemplates(false)
    }
    fetchTemplates()
  }, []) // Fetch all templates once on component mount

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (sortBy !== "featured") params.set("sort", sortBy)

    if (selectedPill === "Free") {
      params.set("filter", "free")
    } else if (selectedPill !== "All") {
      params.set("category", selectedPill)
    }
    router.replace(`/templates?${params.toString()}`, { scroll: false })
  }, [searchTerm, selectedPill, sortBy, router])

  const categoriesAndFilters = useMemo(() => {
    // This needs to be async or pre-fetched if getCategories is async
    // For now, we'll assume getCategories can be called directly or memoized with a dependency on allTemplates
    // If getCategories is truly async, it should be called in useEffect and stored in state.
    // For this example, I'll make a synchronous version for client-side use or assume it's pre-fetched.
    // Given the previous `getCategories` was synchronous, I'll keep it that way for now.
    return getCategoriesFromClientData(allTemplates) // Use a client-side helper
  }, [allTemplates])

  // Helper function to get categories from client-side data
  const getCategoriesFromClientData = (templatesData: Template[]): string[] => {
    const categories = templatesData.map((template) => template.category)
    return ["All", "Free", ...new Set(categories.filter((cat) => cat !== "Free"))]
  }

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = allTemplates

    if (selectedPill === "Free") {
      filtered = filtered.filter((template) => template.isFree)
    } else if (selectedPill !== "All") {
      filtered = filtered.filter((template) => template.category === selectedPill)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "new":
          const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0
          const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0
          return dateB - dateA
        case "price-asc":
          const priceA = a.price === "Free" || a.isFree ? 0 : (a.price as number)
          const priceB = b.price === "Free" || b.isFree ? 0 : (b.price as number)
          return priceA - priceB
        case "price-desc":
          const priceADesc = a.price === "Free" || a.isFree ? 0 : (a.price as number)
          const priceBDesc = b.price === "Free" || b.isFree ? 0 : (b.price as number)
          return priceBDesc - priceADesc
        case "rating":
          return b.rating - a.rating
        case "featured":
        default:
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.rating - a.rating
      }
    })
  }, [searchTerm, selectedPill, sortBy, allTemplates])

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Explore Our Templates</h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
          Find the perfect template for your next project. Filter by category, search, and sort to discover your ideal
          match.
        </p>
      </div>

      <CategoryPills
        categories={categoriesAndFilters}
        selectedCategory={selectedPill}
        onSelectCategory={setSelectedPill}
        iconMap={{ Free: <Sparkles className="mr-1.5 h-4 w-4 text-accent" /> }}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates (e.g., 'landing page', 'react')"
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden sm:flex">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setLayout("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={layout === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setLayout("list")}
              aria-label="List view"
            >
              <LayoutList className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {isLoadingTemplates ? (
        <div
          className={cn(
            "grid gap-6 md:gap-8",
            layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
          )}
        >
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filteredAndSortedTemplates.length > 0 ? (
        <div
          className={cn(
            "grid gap-6 md:gap-8",
            layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
          )}
        >
          {filteredAndSortedTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} staggerDelay={index * 50} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Templates Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
