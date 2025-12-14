import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

/**
 * Convert markdown to Lexical JSON format for Payload CMS
 * This is a simplified converter for the article structure
 */
function markdownToLexical(markdown: string): any {
  const lines = markdown.split('\n')
  const children: any[] = []
  
  let currentList: any = null
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let codeBlockLanguage = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Skip empty lines between list items
    if (line.trim() === '' && currentList) {
      continue
    }
    
    // Code block
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockLanguage = line.slice(3).trim()
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
      }
      continue
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }
    
    // Heading
    if (line.startsWith('# ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h1',
        children: [{ type: 'text', text: line.slice(2) }]
      })
    } else if (line.startsWith('## ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: line.slice(3) }]
      })
    } else if (line.startsWith('### ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: line.slice(4) }]
      })
    } else if (line.startsWith('#### ')) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      children.push({
        type: 'heading',
        tag: 'h4',
        children: [{ type: 'text', text: line.slice(5) }]
      })
    }
    // List item
    else if (line.match(/^[-*]\s+\*\*/) || line.match(/^[-*]\s+/)) {
      // Handle bold in list items
      let text = line.replace(/^[-*]\s+/, '')
      const hasBold = text.includes('**')
      
      const listItem: any = {
        type: 'listitem',
        children: []
      }
      
      if (hasBold) {
        // Parse bold text
        const parts = text.split('**')
        const textChildren: any[] = []
        for (let j = 0; j < parts.length; j++) {
          if (j % 2 === 1) {
            // This is bold text
            textChildren.push({
              type: 'text',
              text: parts[j],
              format: 'bold'
            })
          } else if (parts[j]) {
            textChildren.push({
              type: 'text',
              text: parts[j]
            })
          }
        }
        listItem.children.push({
          type: 'paragraph',
          children: textChildren
        })
      } else {
        listItem.children.push({
          type: 'paragraph',
          children: [{ type: 'text', text }]
        })
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
    else if (line.trim()) {
      if (currentList) {
        children.push(currentList)
        currentList = null
      }
      
      // Handle bold text in paragraphs
      if (line.includes('**')) {
        const parts = line.split('**')
        const textChildren: any[] = []
        for (let j = 0; j < parts.length; j++) {
          if (j % 2 === 1) {
            textChildren.push({
              type: 'text',
              text: parts[j],
              format: 'bold'
            })
          } else if (parts[j]) {
            textChildren.push({
              type: 'text',
              text: parts[j]
            })
          }
        }
        children.push({
          type: 'paragraph',
          children: textChildren
        })
      } else {
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: line }]
        })
      }
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

async function checkDatabase() {
  const payload = await getPayload({ config })
  
  console.log('\n📊 Checking database status...\n')
  
  // Check users
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 10,
  })
  console.log(`👥 Users: ${users.length} found`)
  
  // Check states
  const { docs: states } = await payload.find({
    collection: 'states',
    limit: 100,
  })
  console.log(`🗺️  States: ${states.length} found`)
  
  // Check articles
  const { docs: articles } = await payload.find({
    collection: 'articles',
    limit: 100,
  })
  console.log(`📄 Articles: ${articles.length} found`)
  
  if (articles.length > 0) {
    console.log('\n📑 Existing articles:')
    articles.forEach((article: any, idx: number) => {
      console.log(`   ${idx + 1}. ${article.title} (${article.slug})`)
    })
  }
  
  return { users, states, articles }
}

async function importMarkdownArticle() {
  const payload = await getPayload({ config })
  
  console.log('\n🌱 Starting markdown article import...\n')
  
  // Check database first
  const { users, states, articles } = await checkDatabase()
  
  if (users.length === 0) {
    console.error('\n❌ No users found. Please run basic seed first: npm run seed')
    process.exit(1)
  }
  
  // Read the markdown article
  const articlePath = path.join(process.cwd(), 'docs/articles/california-single-audit-support.md')
  
  if (!fs.existsSync(articlePath)) {
    console.error(`\n❌ Article not found at: ${articlePath}`)
    process.exit(1)
  }
  
  const markdown = fs.readFileSync(articlePath, 'utf-8')
  console.log(`✅ Read markdown file (${markdown.length} characters)\n`)
  
  // Extract title from first line
  const firstLine = markdown.split('\n')[0]
  const title = firstLine.replace(/^#\s+/, '')
  const slug = 'california-single-audit-support'
  
  // Check if article already exists
  const { docs: existingArticles } = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  
  if (existingArticles.length > 0) {
    console.log(`⚠️  Article "${title}" already exists with slug: ${slug}`)
    console.log(`   Article ID: ${existingArticles[0].id}`)
    console.log(`   Do you want to update it? (This script will skip for now)`)
    return
  }
  
  // Convert markdown to Lexical format
  console.log('🔄 Converting markdown to Lexical format...')
  const content = markdownToLexical(markdown)
  
  // Find California state
  const { docs: californiaStates } = await payload.find({
    collection: 'states',
    where: {
      abbreviation: {
        equals: 'CA',
      },
    },
    limit: 1,
  })
  
  if (californiaStates.length === 0) {
    console.warn('⚠️  California state not found. Article will not be linked to a state.')
  }
  
  // Create the article
  const articleData = {
    title,
    slug,
    excerpt: 'A comprehensive guide to Single Audit requirements for California local governments that spend federal grant money, including step-by-step implementation, compliance requirements, and enforcement details.',
    content,
    status: 'published' as const,
    publishedDate: new Date().toISOString(),
    author: users[0].id,
    category: 'regulatory' as const,
    relatedStates: californiaStates.length > 0 ? [californiaStates[0].id] : [],
    tags: [
      { tag: 'single-audit' },
      { tag: 'california' },
      { tag: 'federal-grants' },
      { tag: 'compliance' },
      { tag: 'financial-management' },
    ],
  }
  
  try {
    const newArticle = await payload.create({
      collection: 'articles',
      data: articleData,
    })
    
    console.log(`\n✅ Successfully created article!`)
    console.log(`   ID: ${newArticle.id}`)
    console.log(`   Title: ${newArticle.title}`)
    console.log(`   Slug: ${newArticle.slug}`)
    console.log(`   URL: /articles/${newArticle.slug}`)
    console.log(`   State: ${californiaStates.length > 0 ? 'California' : 'None'}`)
    
  } catch (error) {
    console.error('\n❌ Failed to create article:', error)
    throw error
  }
  
  console.log('\n🎉 Import completed!')
}

// Main execution
importMarkdownArticle()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })
