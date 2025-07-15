"use server"

import type { Template } from "@/types"
import { getAllTemplates, getTemplateBySlug } from "@/lib/templates" // Import from new utility

export async function getTemplateBySlugAction(slug: string): Promise<Template | null> {
  // Simulate a delay as if fetching from a database
  await new Promise((resolve) => setTimeout(resolve, 50)) // 50ms delay

  const template = await getTemplateBySlug(slug) // Use the new utility
  return template || null
}

export async function getRelatedTemplatesAction(
  currentTemplateId: string,
  currentCategory: string,
): Promise<Template[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const allTemplates = await getAllTemplates() // Get all templates
  const related = allTemplates
    .filter((template) => template.category === currentCategory && template.id !== currentTemplateId)
    .slice(0, 3)
  return related
}

// New action to get all templates for listing pages
export async function getAllTemplatesAction(): Promise<Template[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 50))
  return await getAllTemplates()
}
