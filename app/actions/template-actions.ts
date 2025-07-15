"use server"

import type { Template } from "@/types"
import { getAllTemplates, getTemplateBySlug } from "@/lib/templates" // Import from new utility

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
    const template = await getTemplateBySlug(slug) // Use the new utility
    return { success: true, data: template || null, error: null }
  } catch (err: any) {
    console.error(`Error fetching template by slug (${slug}):`, err)
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
    const allTemplates = await getAllTemplates() // Get all templates
    const related = allTemplates
      .filter((template) => template.category === currentCategory && template.id !== currentTemplateId)
      .slice(0, 3)
    return { success: true, data: related, error: null }
  } catch (err: any) {
    console.error("Error fetching related templates:", err)
    return { success: false, data: null, error: `Failed to load related templates: ${err.message || "Unknown error"}` }
  }
}

// New action to get all templates for listing pages
export async function getAllTemplatesAction(): Promise<TemplatesActionResponse> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 50))
  try {
    const templates = await getAllTemplates()
    return { success: true, data: templates, error: null }
  } catch (err: any) {
    console.error("Error in getAllTemplatesAction:", err)
    // Provide a more specific error message if possible
    if (err.code === "ENOENT") {
      return {
        success: false,
        data: null,
        error:
          "Template content directory not found. Please ensure 'content/templates' exists and contains markdown files.",
      }
    }
    return { success: false, data: null, error: `Failed to load templates: ${err.message || "Unknown error"}` }
  }
}
