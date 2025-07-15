"use client"

import { Twitter, Facebook, Linkedin, Mail, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast" // Assuming you have a toast hook

interface SocialShareButtonsProps {
  url: string
  title: string
}

export default function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const { toast } = useToast()

  if (!url) return null // Don't render if URL is not yet available

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: `mailto:?subject=${encodedTitle}&body=Check out this template: ${encodedUrl}`,
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({ title: "Success", description: "Link copied to clipboard!" })
      },
      (err) => {
        toast({
          title: "Error",
          description: "Failed to copy link.",
          variant: "destructive",
        })
        console.error("Failed to copy: ", err)
      },
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-border/50 hover:bg-muted/50">
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {shareOptions.map((option) => (
          <DropdownMenuItem key={option.name} asChild>
            <a
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              {option.icon}
              <span>Share on {option.name}</span>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={copyToClipboard} className="flex items-center gap-2 cursor-pointer">
          <Copy className="h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
