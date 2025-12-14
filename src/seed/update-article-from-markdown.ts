import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { config as dotenvConfig } from 'dotenv'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Load .env.development.local
dotenvConfig({ path: path.resolve(process.cwd(), '.env.development.local') })
dotenvConfig({ path: path.resolve(process.cwd(), '.env.local') })

// Import collections
import { Users } from '../collections/Users'
import { States } from '../collections/States'
import { Articles } from '../collections/Articles'
import { Pages } from '../collections/Pages'
import { Media } from '../collections/Media'

// Create a custom config that handles SSL properly
const customConfig = buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- OpenGov Compliance Center',
    },
  },
  collections: [Users, States, Articles, Pages, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),
  sharp,
  plugins: [],
})

/**
 * Convert markdown to Lexical JSON format for Payload CMS
 * Enhanced version with better parsing
 */
function markdownToLexical(markdown: string): any {
  const lines = markdown.split('\n')
  const children: any[] = []
  
  let currentList: any = null
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let codeBlockLanguage = ''
  let skipNextEmpty = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Handle empty lines
    if (trimmed === '') {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      if (!skipNextEmpty && !inCodeBlock) {
        // Add empty paragraph for spacing
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '' }]
        })
      }
      skipNextEmpty = false
      continue
    }
    
    // Code block
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockLanguage = trimmed.slice(3).trim()
        codeBlockContent = []
      } else {
        inCodeBlock = false
        children.push({
          type: 'code',
          language: codeBlockLanguage || 'text',
          children: [{
            type: 'text',
            text: codeBlockContent.join('\n')
          }]
        })
        codeBlockContent = []
        skipNextEmpty = true
      }
      continue
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }
    
    // Headings
    if (trimmed.startsWith('#### ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h4',
        children: [{ type: 'text', text: trimmed.slice(5) }]
      })
      skipNextEmpty = true
    } else if (trimmed.startsWith('### ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: trimmed.slice(4) }]
      })
      skipNextEmpty = true
    } else if (trimmed.startsWith('## ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: trimmed.slice(3) }]
      })
      skipNextEmpty = true
    } else if (trimmed.startsWith('# ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h1',
        children: [{ type: 'text', text: trimmed.slice(2) }]
      })
      skipNextEmpty = true
    }
    // List items (both - and * bullets)
    else if (trimmed.match(/^[-*]\s+/)) {
      let text = trimmed.replace(/^[-*]\s+/, '')
      
      // Parse inline formatting
      const textChildren = parseInlineFormatting(text)
      
      const listItem: any = {
        type: 'listitem',
        children: [{
          type: 'paragraph',
          children: textChildren
        }]
      }
      
      if (!currentList) {
        currentList = {
          type: 'list',
          listType: 'bullet',
          children: []
        }
      }
      currentList.children.push(listItem)
    }
    // Regular paragraph
    else {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      
      const textChildren = parseInlineFormatting(trimmed)
      children.push({
        type: 'paragraph',
        children: textChildren
      })
    }
  }
  
  // Don't forget to add the last list if exists
  if (currentList) {
    children.push(currentList)
  }
  
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    }
  }
}

/**
 * Parse inline formatting like **bold** and *italic*
 */
function parseInlineFormatting(text: string): any[] {
  const children: any[] = []
  
  if (!text) {
    return [{ type: 'text', text: '' }]
  }
  
  // Handle bold (**text**)
  const boldRegex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match
  
  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      if (beforeText) {
        children.push({ type: 'text', text: beforeText })
      }
    }
    
    // Add bold text
    children.push({
      type: 'text',
      text: match[1],
      format: 'bold'
    })
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    if (remainingText) {
      children.push({ type: 'text', text: remainingText })
    }
  }
  
  // If no formatting found, return plain text
  if (children.length === 0) {
    return [{ type: 'text', text }]
  }
  
  return children
}

async function updateArticleFromMarkdown() {
  console.log('\n🔄 Starting article update from markdown...\n')
  
  // Read markdown file
  const articlePath = path.join(process.cwd(), 'docs/articles/california-single-audit-support.md')
  
  if (!fs.existsSync(articlePath)) {
    console.error(`❌ Markdown file not found at: ${articlePath}`)
    process.exit(1)
  }
  
  const markdown = fs.readFileSync(articlePath, 'utf-8')
  console.log(`✅ Read markdown file (${markdown.length} characters)`)
  
  // Extract title from first line
  const firstLine = markdown.split('\n')[0]
  const title = firstLine.replace(/^#\s+/, '')
  console.log(`📝 Article title: ${title}\n`)
  
  // Initialize Payload
  console.log('🔌 Connecting to Payload CMS...')
  const payload = await getPayload({ config: customConfig })
  console.log('✅ Connected to Payload CMS\n')
  
  // Search for existing article with various possible slugs
  const possibleSlugs = [
    'california-single-audit-support',
    'california-single-audit-support-a-133-uniform-guidance',
    'california-single-audit-support-a-133uniform-guidance'
  ]
  
  let existingArticle: any = null
  let matchedSlug = ''
  
  console.log('🔍 Searching for existing article...')
  for (const slug of possibleSlugs) {
    const { docs } = await payload.find({
      collection: 'articles',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    
    if (docs.length > 0) {
      existingArticle = docs[0]
      matchedSlug = slug
      break
    }
  }
  
  if (!existingArticle) {
    console.log('❌ No existing article found with slugs:', possibleSlugs.join(', '))
    console.log('\n📋 Let me check ALL articles first...\n')
    
    const { docs: allArticlesTotal } = await payload.find({
      collection: 'articles',
      limit: 100,
    })
    
    console.log(`Total articles in database: ${allArticlesTotal.length}`)
    if (allArticlesTotal.length > 0) {
      console.log('\nFirst 10 articles:')
      allArticlesTotal.slice(0, 10).forEach((article: any, idx: number) => {
        console.log(`   ${idx + 1}. ${article.title}`)
        console.log(`      Slug: ${article.slug}`)
      })
    }
    
    console.log('\n📋 Checking California articles...\n')
    
    const { docs: allArticles } = await payload.find({
      collection: 'articles',
      where: {
        slug: {
          contains: 'california',
        },
      },
      limit: 20,
    })
    
    console.log(`Found ${allArticles.length} California articles:`)
    allArticles.forEach((article: any, idx: number) => {
      console.log(`   ${idx + 1}. ${article.title}`)
      console.log(`      Slug: ${article.slug}`)
      console.log(`      ID: ${article.id}`)
    })
    
    // Find single audit article
    const singleAuditArticle = allArticles.find((a: any) => 
      a.slug.includes('single-audit') || 
      a.title.toLowerCase().includes('single audit')
    )
    
    if (singleAuditArticle) {
      existingArticle = singleAuditArticle
      matchedSlug = singleAuditArticle.slug
      console.log(`\n✅ Found Single Audit article: ${singleAuditArticle.title}`)
    } else {
      console.log('\n❌ No Single Audit article found. Cannot update.')
      process.exit(1)
    }
  }
  
  console.log(`\n📄 Found existing article:`)
  console.log(`   ID: ${existingArticle.id}`)
  console.log(`   Title: ${existingArticle.title}`)
  console.log(`   Slug: ${matchedSlug}`)
  
  // Convert markdown to Lexical format
  console.log('\n🔄 Converting markdown to Lexical format...')
  const content = markdownToLexical(markdown)
  console.log(`✅ Converted (${content.root.children.length} content blocks)`)
  
  // Update the article
  console.log('\n💾 Updating article in Payload CMS...')
  try {
    const updatedArticle = await payload.update({
      collection: 'articles',
      id: existingArticle.id,
      data: {
        title,
        content,
        excerpt: 'A comprehensive guide to Single Audit requirements for California local governments that spend federal grant money, including step-by-step implementation, compliance requirements, and enforcement details.',
      },
    })
    
    console.log('\n✅ Successfully updated article!')
    console.log(`   ID: ${updatedArticle.id}`)
    console.log(`   Title: ${updatedArticle.title}`)
    console.log(`   Slug: ${updatedArticle.slug}`)
    console.log(`   Frontend URL: http://localhost:3000/articles/${updatedArticle.slug}`)
    console.log(`   Admin URL: http://localhost:3000/admin/collections/articles/${updatedArticle.id}`)
    
  } catch (error) {
    console.error('\n❌ Failed to update article:', error)
    throw error
  }
  
  console.log('\n🎉 Update completed!')
}

// Main execution
updateArticleFromMarkdown()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Update failed:', error)
    process.exit(1)
  })
