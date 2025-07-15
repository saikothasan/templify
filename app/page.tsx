import HeroSection from "@/components/hero-section"
import FeaturedTemplatesSection from "@/components/featured-templates-section"
import FreeTemplatesSection from "@/components/free-templates-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VENDOR_NAME } from "@/types"
import { CheckCircle, Zap, TrendingUp } from "lucide-react"
import { getAllTemplates, getCategories as getCategoriesFromLib } from "@/lib/templates" // Import from new utility

// Server-side data fetching for static sections
async function getHomePageData() {
  const allTemplates = await getAllTemplates()
  const featured = allTemplates.filter((t) => t.isFeatured).slice(0, 3)
  const freeTemplates = allTemplates.filter((t) => t.isFree).slice(0, 3)
  const categories = (await getCategoriesFromLib()).filter((c) => c !== "All" && c !== "Free").slice(0, 5) // Exclude "All" and "Free" from category showcase

  return { featured, freeTemplates, categories }
}

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700 ease-out">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose {VENDOR_NAME}?</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;re dedicated to providing top-tier templates that accelerate your journey to success.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-200">
        {[
          {
            icon: <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />,
            title: "Premium Quality",
            description: "Pixel-perfect, thoughtfully crafted, and feature-rich templates.",
          },
          {
            icon: <Zap className="h-12 w-12 text-primary mx-auto mb-4" />,
            title: "Launch Faster",
            description: "Save valuable time with our ready-to-use, customizable solutions.",
          },
          {
            icon: <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />,
            title: "Growth-Oriented",
            description: "Designed to help you scale and achieve your business goals.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="p-6 bg-background dark:bg-slate-700/50 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-300">
        <p className="text-muted-foreground">
          At {VENDOR_NAME}, we are passionate about crafting high-quality, modern, and easy-to-use templates that
          empower creators, developers, and businesses to build stunning online presences quickly and efficiently.
        </p>
      </div>
    </div>
  </section>
)

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Let&apos;s Build Something Amazing</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
        Have questions, feedback, or need a custom solution? We&apos;re here to help you succeed.
      </p>
      <Button
        size="lg"
        asChild
        className="bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transform transition-transform"
      >
        <Link href="/contact">Get In Touch</Link>
      </Button>
    </div>
  </section>
)

export default async function HomePage() {
  const { featured, freeTemplates, categories } = await getHomePageData()

  return (
    <>
      <HeroSection />
      <FeaturedTemplatesSection featuredTemplates={featured} /> {/* Pass data as prop */}
      <FreeTemplatesSection freeTemplates={freeTemplates} /> {/* Pass data as prop */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground animate-in fade-in slide-in-from-top-10 duration-700 ease-out">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-200">
            {categories.map((category) => (
              <Link key={category} href={`/templates?category=${encodeURIComponent(category)}`} passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background hover:bg-primary/10 hover:text-primary dark:bg-slate-700 dark:hover:bg-slate-600 dark:hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out delay-300">
            <Link href="/templates" passHref>
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 active:scale-95">
                View All Categories &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <AboutSection />
      <ContactSection />
    </>
  )
}
