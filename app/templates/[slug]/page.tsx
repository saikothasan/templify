import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VENDOR_NAME } from "@/types"
import TemplateDetailPageClient from "./TemplateDetailPageClient"
import { getTemplateBySlugAction, getRelatedTemplatesAction } from "@/app/actions/template-actions"
import { getAllTemplateSlugs } from "@/lib/templates"

// We will remove the explicit PageProps interface and cast directly as a workaround
// due to persistent type errors indicating an environment-specific issue.

export async function generateStaticParams() {
  return getAllTemplateSlugs()
}

// Cast params directly to the expected type
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const typedParams = params as { slug: string } // Explicit cast
  const template = await getTemplateBySlugAction(typedParams.slug)
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

// Cast params directly to the expected type for the page component
export default async function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const typedParams = params as { slug: string } // Explicit cast
  const template = await getTemplateBySlugAction(typedParams.slug)

  if (!template) {
    notFound()
  }

  const relatedTemplates = await getRelatedTemplatesAction(template.id, template.category)

  return <TemplateDetailPageClient template={template} relatedTemplatesData={relatedTemplates} />
}
