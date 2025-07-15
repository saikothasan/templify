"use client"

import { cn } from "@/lib/utils"
import SkeletonCard from "@/components/skeleton-card"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getAllTemplatesAction } from "@/app/actions/template-actions"
import TemplateCard from "@/components/template-card"
import CategoryPills from "@/components/category-pills"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ListFilter, LayoutGrid, LayoutList, Sparkles, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Template } from "@/types"

export default function TemplatesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize states with defaults, then update from searchParams in useEffect
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPill, setSelectedPill] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [templates, setTemplates] = useState<Template[]>([]) // Renamed from allTemplates
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Effect to read search params and update state after hydration
  useEffect(() => {
    const initialCategoryQuery = searchParams.get("category")
    const initialFilterQuery = searchParams.get("filter")
    const initialSearchTerm = searchParams.get("search")
    const initialSortBy = searchParams.get("sort")

    // Only update state if the value from searchParams is different to avoid unnecessary re-renders
    if (initialSearchTerm !== searchTerm) setSearchTerm(initialSearchTerm || "")
    if (initialSortBy !== sortBy) setSortBy(initialSortBy || "featured")

    let newSelectedPill = "All"
    if (initialFilterQuery === "free") {
      newSelectedPill = "Free"
    } else if (initialCategoryQuery) {
      newSelectedPill = initialCategoryQuery
    }
    if (newSelectedPill !== selectedPill) setSelectedPill(newSelectedPill)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]) // Only re-run if searchParams object changes

  // Effect to fetch templates based on filters and sort
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true)
      setError(null) // Clear previous errors
      try {
        // Pass current filter/sort/search states to the server action
        const response = await getAllTemplatesAction(searchTerm, selectedPill, sortBy)
        if (response.success) {
          setTemplates(response.data || []) // Set the filtered and sorted data
        } else {
          setError(response.error) // Set the specific error message
        }
      } catch (err) {
        console.error("Failed to fetch templates:", err)
        setError("An unexpected error occurred while fetching templates.")
      } finally {
        setIsLoadingTemplates(false)
      }
    }
    fetchTemplates()
  }, [searchTerm, selectedPill, sortBy]) // Re-fetch whenever these states change

  // Effect to update URL search params
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

  // Helper function to get categories from client-side data (only for display, not filtering)
  const getCategoriesFromClientData = useCallback((templatesData: Template[]): string[] => {
    const categories = templatesData.map((template) => template.category).filter(Boolean)
    return ["All", "Free", ...new Set(categories.filter((cat) => cat !== "Free"))]
  }, [])

  // Categories for the pills are now derived from the *fetched* templates
  const categoriesAndFilters = useMemo(() => {
    return getCategoriesFromClientData(templates)
  }, [templates, getCategoriesFromClientData])

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

      {error ? (
        <div className="text-center py-16 text-destructive">
          <Info className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Error Loading Templates</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : isLoadingTemplates ? (
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
      ) : templates.length > 0 ? (
        <div
          className={cn(
            "grid gap-6 md:gap-8",
            layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
          )}
        >
          {templates.map((template, index) =>
            template.id ? <TemplateCard key={template.id} template={template} staggerDelay={index * 50} /> : null,
          )}
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
