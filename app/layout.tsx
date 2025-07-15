import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script" // Import the Script component
import "./globals.css"
import "./theme.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { VENDOR_NAME } from "@/types"
import { Toaster } from "@/components/ui/toaster" // Assuming you have Toaster for useToast
import { cn } from "@/lib/utils" // Assuming cn is a utility function for class names

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${VENDOR_NAME} - Premium & Free Web Templates`,
    template: `%s | ${VENDOR_NAME}`, // For page-specific titles
  },
  description: `Discover high-quality, professional, and free web templates from ${VENDOR_NAME}. Accelerate your projects with modern designs.`,
  keywords: [
    "web templates",
    "Next.js templates",
    "React templates",
    "Tailwind CSS templates",
    "free templates",
    VENDOR_NAME,
  ],
  authors: [{ name: VENDOR_NAME, url: "https://templify.pages.dev" }], // Replace with actual domain
  creator: VENDOR_NAME,
  publisher: VENDOR_NAME,
  // Add Open Graph and Twitter metadata defaults
  openGraph: {
    title: `${VENDOR_NAME} - Premium & Free Web Templates`,
    description: `Discover high-quality, professional, and free web templates from ${VENDOR_NAME}.`,
    url: "https://templify.pages.dev", // Replace with actual domain
    siteName: VENDOR_NAME,
    images: [
      {
        url: "https://templify.pages.dev/og-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: `${VENDOR_NAME} Templates`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${VENDOR_NAME} - Premium & Free Web Templates`,
    description: `Discover high-quality, professional, and free web templates from ${VENDOR_NAME}.`,
    // site: "@yourtwitterhandle", // Replace with your Twitter handle
    // creator: "@yourtwitterhandle", // Replace with your Twitter handle
    images: ["https://templify.pages.dev/twitter-image.png"], // Replace with your actual Twitter image URL
  },
  icons: {
    // Add favicon links
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // For PWA capabilities
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  // Added viewport configuration
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(224 71.4% 4.1%)" }, // Match dark background
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Script */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive" // Load after the page becomes interactive
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Other head elements */}
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Navbar />
            <main className="flex-grow flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster /> {/* Ensure Toaster is here if using useToast */}
        </ThemeProvider>
      </body>
    </html>
  )
}
