import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Template } from "@/types"

const templatesDirectory = path.join(process.cwd(), "content/templates")

// Function to get all templates with their frontmatter and HTML content
export async function getAllTemplates(): Promise<Template[]> {
  const fileNames = fs.readdirSync(templatesDirectory)
  const allTemplatesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(templatesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      const { data, content } = matter(fileContents)

      // Convert markdown content to HTML
      const processedContent = await remark().use(html).process(content)
      const contentHtml = processedContent.toString()

      return {
        slug,
        content: contentHtml,
        ...(data as Omit<Template, "slug" | "content">), // Cast frontmatter data to Template type
      } as Template
    }),
  )

  // Sort templates by a relevant field, e.g., lastUpdated or name
  return allTemplatesData.sort((a, b) => {
    // Example sorting by lastUpdated (newest first)
    const dateA = new Date(a.lastUpdated).getTime()
    const dateB = new Date(b.lastUpdated).getTime()
    return dateB - dateA
  })
}

// Function to get a single template by slug with its frontmatter and HTML content
export async function getTemplateBySlug(slug: string): Promise<Template | undefined> {
  const fullPath = path.join(templatesDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return undefined
  }
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  // Convert markdown content to HTML
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    content: contentHtml,
    ...(data as Omit<Template, "slug" | "content">),
  } as Template
}

// Function to get all template slugs for static path generation
export function getAllTemplateSlugs(): { slug: string }[] {
  const fileNames = fs.readdirSync(templatesDirectory)
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ""),
    }
  })
}

// Function to get all unique categories including "All" and "Free"
export async function getCategories(): Promise<string[]> {
  const allTemplates = await getAllTemplates()
  const categories = allTemplates.map((template) => template.category)
  // Add "Free" as a special filter option, ensuring "All" is first.
  return ["All", "Free", ...new Set(categories.filter((cat) => cat !== "Free"))]
}
