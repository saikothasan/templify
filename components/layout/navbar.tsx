"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VENDOR_NAME, VENDOR_LOGO_URL } from "@/types"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const moreNavLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/license", label: "License" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${VENDOR_NAME} homepage`}>
          <Image
            src={VENDOR_LOGO_URL || "/placeholder.svg"}
            alt={`${VENDOR_NAME} Logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-md"
            priority // Prioritize logo loading
          />
          <span className="text-xl font-semibold text-foreground">{VENDOR_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-5 text-sm font-medium">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary pb-1",
                pathname === link.href
                  ? "text-primary border-b-2 border-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none pb-1 data-[state=open]:text-primary">
              More{" "}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreNavLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className={cn(pathname === link.href && "font-semibold text-primary")}>
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex text-muted-foreground hover:text-primary"
            aria-label="Search templates"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 text-base font-medium">
            {[...mainNavLinks, ...moreNavLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "transition-colors hover:text-primary py-2.5 rounded-md px-3",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted/50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border/40"></div>
            <Link
              href="/privacy-policy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-primary py-2.5 rounded-md px-3 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-primary py-2.5 rounded-md px-3 text-sm"
            >
              Terms of Service
            </Link>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="w-full pl-10 py-2.5"
                aria-label="Search templates mobile"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
