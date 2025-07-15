const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")
const { remark } = require("remark")
const html = require("remark-html")

const templatesDirectory = path.join(process.cwd(), "content/templates")
const outputFilePath = path.join(process.cwd(), "lib/template-data.ts")

async function generateTemplateData() {
  console.log("Generating template data for Cloudflare deployment...")

  if (!fs.existsSync(templatesDirectory)) {
    console.error(`Error: Templates directory not found at ${templatesDirectory}`)
    console.error("Please ensure 'content/templates' exists and contains markdown files.")
    process.exit(1)
  }

  const fileNames = fs.readdirSync(templatesDirectory)
  const allTemplatesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(templatesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      const { data, content } = matter(fileContents)

      // Convert markdown content to HTML
      const processedContent = await remark().use(html).process(content)
      const contentHtml = processedContent.toString()

      return {
        slug,
        content: contentHtml,
        ...data, // Frontmatter data
      }
    }),
  )

  // Sort templates by a relevant field, e.g., lastUpdated (newest first)
  allTemplatesData.sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime()
    const dateB = new Date(b.lastUpdated).getTime()
    return dateB - dateA
  })

  // Write the data to a TypeScript file
  const fileContent = `import { Template } from "@/types";\n\nexport const allTemplatesData: Template[] = ${JSON.stringify(allTemplatesData, null, 2)};\n`
  fs.writeFileSync(outputFilePath, fileContent, "utf8")

  console.log(`Successfully generated template data to ${outputFilePath}`)
}

generateTemplateData().catch(console.error)
