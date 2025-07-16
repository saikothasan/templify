import type { Template } from "@/types"
import { allTemplatesData } from "./template-data" // Import the pre-generated data

// Function to get all templates with their frontmatter and HTML content
export async function getAllTemplates(): Promise<Template[]> {
  // Data is already loaded from template-data.ts at build time
  return allTemplatesData
}

// Function to get a single template by slug with its frontmatter and HTML content
export async function getTemplateBySlug(slug: string): Promise<Template | undefined> {
  // Find the template in the pre-generated data
  return allTemplatesData.find((template) => template.slug === slug)
}

// Function to get all template slugs for static path generation
export function getAllTemplateSlugs(): { slug: string }[] {
  // Derive slugs from the pre-generated data
  return allTemplatesData.map((template) => {
    return {
      slug: template.slug,
    }
  })
}

// Function to get all unique categories including "All" and "Free"
export async function getCategories(): Promise<string[]> {
  const categories = allTemplatesData.map((template) => template.category)
  // Add "Free" as a special filter option, ensuring "All" is first.
  return ["All", "Free", ...new Set(categories.filter((cat) => cat !== "Free"))]
}
