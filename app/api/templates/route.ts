import { NextResponse } from "next/server"
import { getAllTemplates } from "@/lib/templates"

// Removed: export const runtime = "edge"
// This file will now run on the default Node.js runtime, allowing 'fs' access.
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("search") || ""
    const category = searchParams.get("category") || "All"
    const filter = searchParams.get("filter") // e.g., "free"
    const sortBy = searchParams.get("sort") || "featured"
    const excludeId = searchParams.get("excludeId") // Used for related templates

    const allTemplates = await getAllTemplates()

    let filteredTemplates = allTemplates

    // Apply category filter
    if (category !== "All") {
      filteredTemplates = filteredTemplates.filter((template) => template.category === category)
    }

    // Apply "free" filter
    if (filter === "free") {
      filteredTemplates = filteredTemplates.filter((template) => template.isFree)
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          template.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          template.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm)),
      )
    }

    // Exclude a specific template by ID (for related templates)
    if (excludeId) {
      filteredTemplates = filteredTemplates.filter((template) => template.id !== excludeId)
    }

    // Apply sorting
    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
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

    return NextResponse.json({ success: true, data: sortedTemplates, error: null }, { status: 200 })
  } catch (error: any) {
    console.error("API Error in /api/templates:", error)
    return NextResponse.json(
      { success: false, data: null, error: `Failed to fetch templates: ${error.message || "Unknown error"}` },
      { status: 500 },
    )
  }
}
