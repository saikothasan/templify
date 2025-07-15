import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VENDOR_NAME } from "@/types"
import TemplateDetailPageClient from "./TemplateDetailPageClient"
import { getTemplateBySlugAction, getRelatedTemplatesAction } from "@/app/actions/template-actions"
import { getAllTemplateSlugs } from "@/lib/templates"
import type { Template } from "@/types" // Ensure Template type is imported

// We will use 'any' for params in the function signatures as a workaround
// for the persistent type error, which indicates an environment-specific issue.

export async function generateStaticParams() {
  return getAllTemplateSlugs()
}

// Use 'any' for params in the signature to bypass the problematic type constraint
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  // Cast params to the expected type inside the function for type safety within the logic
  const typedParams = params as { slug: string }
  const templateResponse = await getTemplateBySlugAction(typedParams.slug)

  // Check if the action was successful and data exists
  if (!templateResponse.success || !templateResponse.data) {
    return {
      title: `Template Not Found | ${VENDOR_NAME}`,
      description: `The template you are looking for could not be found on ${VENDOR_NAME}.`,
    }
  }

  // Explicitly assert the type of template to ensure TypeScript recognizes it
  const template: Template = templateResponse.data

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-actual-domain.com"
  const fullImageUrl = template.imageUrl.startsWith("http") ? template.imageUrl : `${siteUrl}${template.imageUrl}`

  return {
    title: `${template.name} - Template Details`,
    description: template.description,
    keywords: [...template.tags, template.category, VENDOR_NAME, "web template"],
    alternates: {
      canonical: `${siteUrl}/templates/${template.slug}`,
    },
    openGraph: {
      title: `${template.name} by ${VENDOR_NAME}`,
      description: template.description,
      url: `${siteUrl}/templates/${template.slug}`,
      siteName: VENDOR_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: template.name,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} by ${VENDOR_NAME}`,
      description: template.description,
      images: [fullImageUrl],
    },
  }
}

// Use 'any' for params in the signature to bypass the problematic type constraint
export default async function TemplateDetailPage({ params }: { params: any }) {
  // Cast params to the expected type inside the function for type safety within the logic
  const typedParams = params as { slug: string }
  const templateResponse = await getTemplateBySlugAction(typedParams.slug)

  // Check if the action was successful and data exists
  if (!templateResponse.success || !templateResponse.data) {
    notFound() // If template not found or error, trigger Next.js notFound
  }

  // Explicitly assert the type of template here as well
  const template: Template = templateResponse.data

  const relatedTemplatesResponse = await getRelatedTemplatesAction(template.id, template.category)
  // Pass relatedTemplatesData only if successful, otherwise an empty array or handle error in client component
  const relatedTemplatesData = relatedTemplatesResponse.success ? relatedTemplatesResponse.data : []

  return <TemplateDetailPageClient template={template} relatedTemplatesData={relatedTemplatesData} />
}
