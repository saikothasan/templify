import { VENDOR_NAME } from "@/types"
import type { Metadata } from "next"
import ContactForm from "./ContactForm"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: `Contact Us | ${VENDOR_NAME}`,
  description: `Get in touch with ${VENDOR_NAME}. We're here to help with any questions or inquiries you may have.`,
}

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground animate-in fade-in duration-500 ease-out">
      <header className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact {VENDOR_NAME}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We&apos;d love to hear from you! Whether you have a question about our templates, need support, or just want
            to say hello, feel free to reach out.
          </p>
        </div>
      </header>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-in fade-in slide-in-from-left-10 duration-700 ease-out delay-200">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700 ease-out delay-300">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Alternatively, you can reach us through the following channels:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a href="mailto:support@nullbite.com" className="text-primary hover:underline">
                        support@nullbite.com
                      </a>
                      <p className="text-sm text-muted-foreground">For general inquiries and support.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Phone (Optional)</h3>
                      <a href="tel:+1234567890" className="text-primary hover:underline">
                        +1 (234) 567-890
                      </a>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Office Address (Optional)</h3>
                      <p className="text-muted-foreground">123 Tech Avenue, Innovation City, CA 90210</p>
                      <p className="text-sm text-muted-foreground">Visits by appointment only.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Optional: Map Embed */}
              {/* <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
              <div className="aspect-video bg-muted rounded-lg">
                Replace with Google Maps embed iframe
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
