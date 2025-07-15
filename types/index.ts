export type Template = {
  id: string
  slug: string
  name: string
  category: string
  description: string // Short description for cards
  price: number | "Free"
  imageUrl: string
  imageGallery?: string[] // For template detail page
  previewUrl?: string // Link to live preview
  downloadUrl: string // Direct download link or link to purchase page
  tags: string[]
  features: string[]
  rating: number // 1-5
  reviewsCount: number
  lastUpdated: string // e.g., "June 2025"
  techStack: string[]
  filesIncluded: string[]
  isFeatured?: boolean
  isNew?: boolean
  isFree?: boolean
  content: string // This will hold the HTML content parsed from Markdown
}

export const VENDOR_NAME = "NULLBITE"
export const VENDOR_LOGO_URL = "/nullbite-logo.png"
