"use server"

import type { Template } from "@/types"

// Define a type for the structured response from server actions
type TemplatesActionResponse =
  | { success: true; data: Template[]; error: null }
  | { success: false; data: null; error: string }

type TemplateActionResponse =
  | { success: true; data: Template | null; error: null }
  | { success: false; data: null; error: string }

export async function getTemplateBySlugAction(slug: string): Promise<TemplateActionResponse> {
  // Simulate a delay as if fetching from a database
  await new Promise((resolve) => setTimeout(resolve, 50)) // 50ms delay

  try {
    // Call the API route to get a single template by slug
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/templates?slug=${encodeURIComponent(slug)}`)
    const data: TemplatesActionResponse = await response.json()

    if (data.success && data.data && data.data.length > 0) {
      // The API returns an array, so we take the first item
      return { success: true, data: data.data[0], error: null }
    } else if (data.success && data.data && data.data.length === 0) {
      return { success: true, data: null, error: null } // Template not found
    } else {
      return { success: false, data: null, error: data.error || `Failed to load template for slug: ${slug}` }
    }
  } catch (err: any) {
    console.error(`Error fetching template by slug (${slug}) via API:`, err)
    return { success: false, data: null, error: `Failed to load template: ${err.message || "Unknown error"}` }
  }
}

export async function getRelatedTemplatesAction(
  currentTemplateId: string,
  currentCategory: string,
): Promise<TemplatesActionResponse> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  try {
    // Fetch related templates using the new API route
    const params = new URLSearchParams()
    params.set("category", currentCategory)
    params.set("excludeId", currentTemplateId)
    params.set("sort", "featured") // Or any other relevant sort for related templates

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/templates?${params.toString()}`)
    const data: TemplatesActionResponse = await response.json()

    if (data.success) {
      // Limit to 3 related templates
      return { success: true, data: data.data.slice(0, 3), error: null }
    } else {
      return { success: false, data: null, error: data.error || "Failed to load related templates." }
    }
  } catch (err: any) {
    console.error("Error fetching related templates:", err)
    return { success: false, data: null, error: `Failed to load related templates: ${err.message || "Unknown error"}` }
  }
}

// New action to get all templates for listing pages
// Made parameters optional to allow calling without filters
export async function getAllTemplatesAction(
  searchTerm?: string, // Made optional
  selectedCategory?: string, // Made optional
  sortBy?: string, // Made optional
): Promise<TemplatesActionResponse> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 50))
  try {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (selectedCategory === "Free") {
      params.set("filter", "free")
    } else if (selectedCategory && selectedCategory !== "All") {
      // Check if selectedCategory exists before setting
      params.set("category", selectedCategory)
    }
    if (sortBy) params.set("sort", sortBy)

    // Call the new API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/templates?${params.toString()}`)
    const data: TemplatesActionResponse = await response.json()

    if (data.success) {
      return { success: true, data: data.data, error: null }
    } else {
      return { success: false, data: null, error: data.error || "Failed to load templates." }
    }
  } catch (err: any) {
    console.error("Error in getAllTemplatesAction:", err)
    return { success: false, data: null, error: `Failed to load templates: ${err.message || "Unknown error"}` }
  }
}
