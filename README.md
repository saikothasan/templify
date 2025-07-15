# Templify - Modern Web Template Marketplace

![Templify Logo](public/nullbite-logo.png)

Templify is a modern, responsive web template marketplace built with Next.js, Tailwind CSS, and shadcn/ui. It allows users to browse, search, filter, and view details of various web templates, including landing pages, dashboards, e-commerce themes, and portfolios. The project emphasizes clean design, excellent user experience, and developer-friendly code.

## ✨ Features

*   **Dynamic Template Listing**: Browse a collection of web templates with detailed information.
*   **Category Filtering**: Filter templates by categories like "Landing Page", "Dashboard", "E-commerce", "Portfolio", and "Blog".
*   **Search Functionality**: Easily find templates using keywords in names, descriptions, or tags.
*   **Sorting Options**: Sort templates by featured, newest, price (low to high/high to low), and rating.
*   **Template Detail Pages**: Dedicated pages for each template with image galleries, features, tech stack, and download/preview links.
*   **Markdown Content**: Template descriptions and details are rendered from Markdown files, allowing for rich text and easy content management.
*   **Responsive Design**: Optimized for seamless viewing across all devices (desktop, tablet, mobile).
*   **Contact Form**: A functional contact form powered by EmailJS for user inquiries.
*   **Informational Pages**: Includes "About Us", "FAQ", "License", "Privacy Policy", and "Disclaimer" pages.
*   **Social Sharing**: Share template links easily on social media platforms.
*   **Google Analytics Integration**: Track website performance and user behavior.
*   **Dark Mode Support**: Toggle between light and dark themes.

## 🚀 Technologies Used

*   **Next.js**: React framework for building performant web applications (App Router).
*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development (v4).
*   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React**: Beautiful and customizable open-source icons.
*   **`gray-matter`**: For parsing frontmatter from Markdown files.
*   **`remark` & `remark-html`**: For converting Markdown content to HTML.
*   **`@tailwindcss/typography`**: A Tailwind CSS plugin for beautiful, readable typography.
*   **EmailJS**: For handling contact form submissions without a backend.
*   **`@emailjs/browser`**: EmailJS SDK for browser environments.

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js (v18.18.0 or higher) and npm/yarn installed.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/saikothasan/templify.git
    cd templify
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root of your project and add the following environment variables. These are crucial for the contact form and Google Analytics.

    ```env
    # EmailJS Credentials (Required for Contact Form)
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY

    # Google Analytics (Optional)
    NEXT_PUBLIC_GA_MEASUREMENT_ID=YOUR_GA_MEASUREMENT_ID

    # Public URL for Metadata (Replace with your deployment URL)
    NEXT_PUBLIC_APP_URL=https://your-actual-domain.com
    ```

    You can obtain your EmailJS credentials from [EmailJS](https://www.emailjs.com/).
    For Google Analytics, get your Measurement ID from your Google Analytics 4 property.

### Running the Development Server

To run the project in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Project Structure

```
.
├── app/                      # Next.js App Router pages, layouts, and API routes
│   ├── actions/              # Server Actions for data fetching
│   ├── contact/              # Contact page and form component
│   ├── templates/            # Template listing and detail pages
│   └── globals.css           # Global Tailwind CSS styles
├── components/               # Reusable React components (UI, layout, specific features)
│   ├── layout/               # Navbar and Footer
│   ├── ui/                   # shadcn/ui components
│   └── ...
├── content/                  # Markdown content for templates
│   └── templates/            # Individual template markdown files
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions (e.g., template parsing)
├── public/                   # Static assets (images, favicon)
├── types/                    # TypeScript type definitions
├── .env.d.ts                 # Environment variable type declarations
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
Individual templates may have their own specific licenses; please refer to their respective detail pages.

## 🚀 Deployment

This project is designed to be easily deployed on [Vercel](https://vercel.com), the creators of Next.js.
