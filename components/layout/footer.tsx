import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VENDOR_NAME, VENDOR_LOGO_URL } from "@/types"
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const footerLinkSections = [
  {
    title: "Explore",
    links: [
      {
        href: "/templates",
        label: "Templates",
        icon: <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />,
      },
      {
        href: "/#featured",
        label: "Featured",
        icon: <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />,
      },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog (Coming Soon)" }, // Example of a future link
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/license", label: "License" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t border-border/40 bg-muted/20 dark:bg-background/50">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label={`${VENDOR_NAME} homepage`}>
              <Image
                src={VENDOR_LOGO_URL || "/placeholder.svg"}
                alt={`${VENDOR_NAME} Logo`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-md"
              />
              <span className="text-lg font-semibold text-foreground">{VENDOR_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering your vision with fresh, tech-forward templates for positive growth.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                aria-label={`${VENDOR_NAME} on Twitter`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label={`${VENDOR_NAME} on GitHub`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label={`${VENDOR_NAME} on LinkedIn`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {footerLinkSections.map((section) => (
            <div key={section.title} className="md:col-span-2 lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      {link.label} {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-semibold text-foreground mb-3">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get the latest templates and news directly in your inbox.
            </p>
            <form className="flex gap-2">
              <label htmlFor="footer-email-signup" className="sr-only">
                Email for newsletter
              </label>
              <Input
                id="footer-email-signup"
                type="email"
                placeholder="Enter your email"
                className="flex-grow text-sm bg-background"
                aria-label="Email for newsletter"
              />
              <Button type="submit" variant="default" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-xs text-muted-foreground">
          © {currentYear} {VENDOR_NAME}. All rights reserved. Built with passion and Next.js.
        </div>
      </div>
    </footer>
  )
}
