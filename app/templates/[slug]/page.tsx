import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VENDOR_NAME } from "@/types"
import TemplateDetailPageClient from "./TemplateDetailPageClient"
import { getTemplateBySlugAction, getRelatedTemplatesAction } from "@/app/actions/template-actions"
import { getAllTemplateSlugs } from "@/lib/templates" // Import from new utility

export const runtime = "edge"

// For SSG: generateStaticParams now uses the new utility to get slugs
export async function generateStaticParams() {
  return getAllTemplateSlugs()
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const template = await getTemplateBySlugAction(params.slug)
  if (!template) {
    return {
      title: `Template Not Found | ${VENDOR_NAME}`,
      description: `The template you are looking for could not be found on ${VENDOR_NAME}.`,
    }
  }

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

export default async function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const template = await getTemplateBySlugAction(params.slug)

  if (!template) {
    notFound()
  }

  const relatedTemplates = await getRelatedTemplatesAction(template.id, template.category)

  return <TemplateDetailPageClient template={template} relatedTemplatesData={relatedTemplates} />
}
