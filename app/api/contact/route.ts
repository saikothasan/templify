import { NextResponse } from "next/server"

// Define an interface for the expected request body
interface ContactFormInput {
  name: string
  email: string
  subject: string
  message: string
}

// Set the runtime to edge for optimal performance
export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = (await request.json()) as ContactFormInput

    // Validate incoming data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram bot token or chat ID is not configured.")
      return NextResponse.json({ error: "Server configuration error: Telegram credentials missing." }, { status: 500 })
    }

    // Construct the message for Telegram
    const telegramMessage = `
*New Contact Form Submission*
---
*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}
*Message:*
\`\`\`
${message}
\`\`\`
    `

    // Send message to Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown", // Use Markdown for formatting
      }),
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Failed to send message to Telegram:", errorData)
      return NextResponse.json({ error: "Failed to send message via Telegram." }, { status: 500 })
    }

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
