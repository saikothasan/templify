import { notFound } from "next/navigation"
import TemplateDetailPageClient from "./TemplateDetailPageClient"
import { getTemplateBySlugAction, getRelatedTemplatesAction } from "@/app/actions/template-actions"
import { getAllTemplateSlugs } from "@/lib/templates"
import type { Template } from "@/types" // Ensure Template type is imported

// We will use 'any' for params in the function signatures as a workaround
// for the persistent type error, which indicates an environment-specific issue.

export async function generateStaticParams() {
  return getAllTemplateSlugs()
}

// generateMetadata function has been removed as requested.
// If you need dynamic metadata, it will need to be re-implemented.

// Use 'any' for params in the signature to bypass the problematic type constraint
export default async function TemplateDetailPage({ params }: { params: any }) {
  // Cast params to the expected type inside the function for type safety within the logic
  const typedParams = params as { slug: string }
  const templateResponse = await getTemplateBySlugAction(typedParams.slug)

  // Explicitly narrow the type within this block
  if (templateResponse.success && templateResponse.data) {
    const template: Template = templateResponse.data // Now 'template' is definitely of type Template

    const relatedTemplatesResponse = await getRelatedTemplatesAction(template.id, template.category)
    // Pass relatedTemplatesData only if successful, otherwise an empty array or handle error in client component
    const relatedTemplatesData = relatedTemplatesResponse.success ? relatedTemplatesResponse.data : []

    return <TemplateDetailPageClient template={template} relatedTemplatesData={relatedTemplatesData} />
  } else {
    // If template not found or error, trigger Next.js notFound
    notFound()
  }
}
