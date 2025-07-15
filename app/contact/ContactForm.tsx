"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

// Define an interface for the expected API response
interface ContactApiResponse {
  message?: string
  error?: string
}

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })

      // Cast the response data to the defined interface
      const data: ContactApiResponse = await response.json()

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: data.message || "Thanks for reaching out. We'll get back to you soon.",
        })
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        console.error("API Error:", data.error)
        toast({
          title: "Error Sending Message",
          description: data.error || "Something went wrong. Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Network or unexpected error:", error)
      toast({
        title: "Error Sending Message",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="John Doe"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="Regarding template..."
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="Your message here..."
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full py-3 text-base" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Remember to set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as environment variables.
      </p>
    </form>
  )
}
