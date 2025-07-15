"use client"

import { useState, useEffect } from "react"
import type { Template } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Download, Eye, Tag, Layers, FileText, CalendarDays, CheckCircle, ChevronRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import RelatedTemplates from "@/components/related-templates"
import SocialShareButtons from "@/components/social-share-buttons"

interface TemplateDetailPageClientProps {
  template: Template
  relatedTemplatesData: Template[]
}

export default function TemplateDetailPageClient({ template, relatedTemplatesData }: TemplateDetailPageClientProps) {
  const [mainDisplayImage, setMainDisplayImage] = useState(template.imageGallery?.[0] || template.imageUrl)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  return (
    <div className="bg-background animate-in fade-in duration-500 ease-out">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="inline-block h-4 w-4 mx-1" />
          <Link href="/templates" className="hover:text-primary">
            Templates
          </Link>
          <ChevronRight className="inline-block h-4 w-4 mx-1" />
          <span className="font-medium text-foreground">{template.name}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="aspect-[16/10] relative rounded-xl overflow-hidden shadow-2xl mb-4 border border-border/20">
                <Image
                  src={mainDisplayImage || "/placeholder.svg"}
                  alt={`Main preview for ${template.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-300 ease-in-out"
                />
              </div>
              {template.imageGallery && template.imageGallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                  {template.imageGallery.map((imgUrl, index) => (
                    <button
                      key={index}
                      className={cn(
                        "animate-in fade-in zoom-in-95 duration-300 ease-out",
                        "aspect-square relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 hover:opacity-100 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        imgUrl === mainDisplayImage
                          ? "border-primary opacity-100 shadow-md"
                          : "border-transparent opacity-70",
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => setMainDisplayImage(imgUrl)}
                    >
                      <Image
                        src={imgUrl || "/placeholder.svg"}
                        alt={`${template.name} thumbnail ${index + 1}`}
                        fill
                        sizes="10vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold py-1 px-3 mb-2">
                    {template.category}
                  </Badge>
                  <SocialShareButtons url={currentUrl} title={template.name} />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{template.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-accent text-accent" />
                    <span>
                      {template.rating} ({template.reviewsCount} reviews)
                    </span>
                  </div>
                  <span className="text-muted-foreground/50">|</span>
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    <span>Updated: {template.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <Card className="shadow-lg border-border/20">
                <CardContent className="p-6 space-y-5">
                  <p className="text-4xl font-bold text-primary">
                    {typeof template.price === "number" ? `$${template.price.toFixed(2)}` : template.price}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="w-full text-base py-3 h-auto shadow-md hover:shadow-primary/40 transition-shadow"
                      asChild
                    >
                      <Link href={template.downloadUrl}>
                        <Download className="mr-2 h-5 w-5" />
                        {typeof template.price === "number" && template.price > 0 ? "Purchase Now" : "Download Free"}
                      </Link>
                    </Button>
                    {template.previewUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-base py-3 h-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-primary dark:border-primary/40 dark:text-primary dark:hover:bg-primary/20 bg-transparent"
                        asChild
                      >
                        <Link href={template.previewUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-2 h-5 w-5" />
                          Live Preview
                        </Link>
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment | Instant download | License details
                  </p>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-primary" />
                  Template Information
                </h3>
                <div className="space-y-2 text-sm animate-in fade-in slide-in-from-left-8 duration-500 ease-out delay-300">
                  <div className="flex items-start">
                    <Layers className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground/90">Tech Stack:</strong> {template.techStack.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground/90">Files Included:</strong>{" "}
                      {template.filesIncluded.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Tag className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground/90">Tags:</strong>{" "}
                      {template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="mr-1.5 mb-1.5 text-xs py-0.5 px-1.5 border-primary/30 text-primary/80 bg-primary/5 hover:bg-primary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-border/20">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted/50 p-1.5 rounded-lg">
              <TabsTrigger
                value="overview"
                className="py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                Key Features
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-6 rounded-lg border border-border/20 bg-card text-card-foreground shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">Template Overview</h3>
              {/* Render HTML content from markdown. The 'prose' classes handle the typography. */}
              <div dangerouslySetInnerHTML={{ __html: template.content }} />
            </TabsContent>
            <TabsContent
              value="features"
              className="p-6 rounded-lg border border-border/20 bg-card text-card-foreground shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
            >
              <h3 className="text-xl font-semibold mb-6 text-foreground">What&apos;s Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {template.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-background/50 dark:bg-muted/20 rounded-md border border-border/30"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Related Templates section is already implemented and uses initialData from server */}
        <RelatedTemplates
          currentTemplateId={template.id}
          currentCategory={template.category}
          initialData={relatedTemplatesData}
        />
      </div>
    </div>
  )
}
