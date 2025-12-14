import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { config as dotenvConfig } from 'dotenv'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Load environment variables
dotenvConfig({ path: path.resolve(process.cwd(), '.env.development.local') })
dotenvConfig({ path: path.resolve(process.cwd(), '.env.local') })

// Import collections
import { Users } from '../collections/Users'
import { States } from '../collections/States'
import { Articles } from '../collections/Articles'
import { Pages } from '../collections/Pages'
import { Media } from '../collections/Media'

// Create custom config
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
 * Parse markdown into structured sections
 */
function parseMarkdownSections(markdown: string) {
  const lines = markdown.split('\n')
  const sections: Record<string, string[]> = {}
  let currentSection = 'intro'
  let currentSubsection: string | null = null
  
  for (const line of lines) {
    // Level 1 heading (main title)
    if (line.startsWith('# ')) {
      sections['title'] = [line.slice(2).trim()]
      currentSection = 'intro'
      continue
    }
    
    // Level 2 headings (main sections)
    if (line.startsWith('## ')) {
      currentSection = line.slice(3).trim().toLowerCase()
      currentSubsection = null
      sections[currentSection] = []
      continue
    }
    
    // Level 3 headings (subsections)
    if (line.startsWith('### ')) {
      currentSubsection = line.slice(4).trim()
      if (!sections[currentSection]) {
        sections[currentSection] = []
      }
      sections[currentSection].push(`### ${currentSubsection}`)
      continue
    }
    
    // Regular content
    if (!sections[currentSection]) {
      sections[currentSection] = []
    }
    sections[currentSection].push(line)
  }
  
  return sections
}

/**
 * Extract list items from markdown lines
 */
function extractListItems(lines: string[]): string[] {
  const items: string[] = []
  
  for (const line of lines) {
    const match = line.match(/^[-*]\s+\*\*(.+?)\*\*(.*)$/)
    if (match) {
      items.push(match[1] + match[2])
    } else if (line.match(/^[-*]\s+/)) {
      items.push(line.replace(/^[-*]\s+/, ''))
    }
  }
  
  return items
}

/**
 * Convert plain text to simple Lexical format for rich text fields
 */
function textToLexical(text: string): any {
  if (!text) {
    return {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [{ type: 'text', text: '' }]
        }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    }
  }
  
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  
  return {
    root: {
      type: 'root',
      children: paragraphs.map(para => ({
        type: 'paragraph',
        children: [{ type: 'text', text: para.trim() }]
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    }
  }
}

/**
 * Parse implementation steps from markdown
 */
function parseImplementationSteps(sections: Record<string, string[]>): any[] {
  const steps: any[] = []
  const guideSectionName = Object.keys(sections).find(k => 
    k.includes('implementation') || k.includes('step-by-step')
  )
  
  if (!guideSectionName) return steps
  
  const lines = sections[guideSectionName]
  let currentStep: any = null
  
  for (const line of lines) {
    if (line.startsWith('### Step ')) {
      if (currentStep) {
        steps.push(currentStep)
      }
      currentStep = {
        stepTitle: line.replace('### ', ''),
        stepDescription: textToLexical(''),
        timing: '',
        responsible: '',
        content: []
      }
    } else if (currentStep) {
      if (line.startsWith('**Timing:**')) {
        currentStep.timing = line.replace('**Timing:**', '').trim()
      } else if (line.startsWith('**Responsible Party:**')) {
        currentStep.responsible = line.replace('**Responsible Party:**', '').trim()
      } else if (line.trim()) {
        currentStep.content.push(line)
      }
    }
  }
  
  if (currentStep) {
    steps.push(currentStep)
  }
  
  // Convert content to description
  return steps.map(step => ({
    stepTitle: step.stepTitle,
    stepDescription: textToLexical(step.content.join('\n')),
    timing: step.timing,
    responsible: step.responsible
  }))
}

/**
 * Parse FAQs from markdown
 */
function parseFAQs(sections: Record<string, string[]>): any[] {
  const faqs: any[] = []
  const faqSectionName = Object.keys(sections).find(k => 
    k.includes('common questions') || k.includes('faq')
  )
  
  if (!faqSectionName) return faqs
  
  const lines = sections[faqSectionName]
  let currentQuestion = ''
  let currentAnswer: string[] = []
  
  for (const line of lines) {
    if (line.startsWith('**Q:')) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: textToLexical(currentAnswer.join('\n'))
        })
      }
      currentQuestion = line.replace('**Q:', '').replace('**', '').trim()
      currentAnswer = []
    } else if (line.startsWith('**A:')) {
      currentAnswer.push(line.replace('**A:**', '').trim())
    } else if (currentQuestion && line.trim()) {
      currentAnswer.push(line)
    }
  }
  
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: textToLexical(currentAnswer.join('\n'))
    })
  }
  
  return faqs
}

/**
 * Parse official sources from markdown
 */
function parseOfficialSources(sections: Record<string, string[]>): any[] {
  const sources: any[] = []
  const sourceSectionName = Object.keys(sections).find(k => 
    k.includes('official sources') || k.includes('citations')
  )
  
  if (!sourceSectionName) return sources
  
  const lines = sections[sourceSectionName]
  let currentSource = ''
  let currentDescription: string[] = []
  
  for (const line of lines) {
    if (line.startsWith('**') && line.includes('**')) {
      if (currentSource) {
        sources.push({
          sourceName: currentSource,
          sourceUrl: '',
          sourceType: 'statute' as const
        })
      }
      currentSource = line.replace(/\*\*/g, '').trim()
      currentDescription = []
    } else if (currentSource && line.trim()) {
      currentDescription.push(line)
    }
  }
  
  if (currentSource) {
    sources.push({
      sourceName: currentSource,
      sourceUrl: '',
      sourceType: 'statute' as const
    })
  }
  
  return sources
}

async function importMarkdownArticles() {
  console.log('\n📚 Starting bulk markdown article import...\n')
  
  const articlesDir = path.join(process.cwd(), 'docs/articles')
  
  if (!fs.existsSync(articlesDir)) {
    console.error(`❌ Articles directory not found: ${articlesDir}`)
    process.exit(1)
  }
  
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} markdown file(s) to import\n`)
  
  if (files.length === 0) {
    console.log('No markdown files found in docs/articles/')
    process.exit(0)
  }
  
  console.log('🔌 Connecting to Payload CMS...')
  const payload = await getPayload({ config: customConfig })
  console.log('✅ Connected to Payload CMS\n')
  
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })
  
  if (!users || users.length === 0) {
    console.error('❌ No users found. Please run basic seed first: npm run seed')
    process.exit(1)
  }
  
  const authorId = users[0].id
  
  const { docs: states } = await payload.find({
    collection: 'states',
    limit: 100,
  })
  
  const statesMap = new Map(states.map((s: any) => [s.name.toLowerCase(), s]))
  const statesCodeMap = new Map(states.map((s: any) => [s.abbreviation, s]))
  
  let created = 0
  let updated = 0
  let errors = 0
  
  for (const filename of files) {
    console.log(`\n📄 Processing: ${filename}`)
    
    try {
      const filePath = path.join(articlesDir, filename)
      const markdown = fs.readFileSync(filePath, 'utf-8')
      
      // Parse sections
      const sections = parseMarkdownSections(markdown)
      
      // Extract title
      const title = sections['title'] ? sections['title'][0] : filename.replace('.md', '')
      console.log(`   Title: ${title}`)
      
      // Extract state and feature from title
      const titleMatch = title.match(/^([^:]+):\s*(.+)$/)
      if (!titleMatch) {
        throw new Error('Title must be in format "State: Feature Name"')
      }
      
      const stateName = titleMatch[1].trim().toLowerCase()
      const featureName = titleMatch[2].trim()
      
      // Find state
      const stateDoc = statesMap.get(stateName)
      if (!stateDoc) {
        throw new Error(`State not found: ${stateName}`)
      }
      
      console.log(`   State: ${stateDoc.name} (${stateDoc.abbreviation})`)
      console.log(`   Feature: ${featureName}`)
      
      // Generate slug
      const slug = `${stateName.replace(/\s+/g, '-')}-${featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      
      // Extract summary from "What You Need to Know"
      const summarySection = sections['what you need to know'] || []
      const summary = summarySection.filter(l => l.trim() && !l.startsWith('#')).join(' ').slice(0, 500)
      
      // Extract key requirements
      const reqSection = sections['key requirements'] || []
      const keyRequirements = extractListItems(reqSection).map(req => ({ requirement: req }))
      
      // Parse structured sections
      const implementationSteps = parseImplementationSteps(sections)
      const faqs = parseFAQs(sections)
      const officialSources = parseOfficialSources(sections)
      
      // Who Does This Apply To
      const whoSection = sections['who does this apply to?'] || []
      const whoDoesThisApplyTo = textToLexical(whoSection.filter(l => l.trim() && !l.startsWith('#')).join('\n'))
      
      // Enforcement & Penalties
      const enforcementSection = sections['enforcement & penalties'] || []
      const enforcementText = enforcementSection.filter(l => l.trim() && !l.startsWith('#')).join('\n')
      
      // OpenGov section
      const opengovSection = sections['how opengov helps'] || []
      const opengovNotes = opengovSection.filter(l => l.trim() && !l.startsWith('#')).join('\n')
      
      // Determine category
      let category = 'financial-management'
      const lowerFeature = featureName.toLowerCase()
      if (lowerFeature.includes('payroll') || lowerFeature.includes('hr') || lowerFeature.includes('leave')) {
        category = 'hr-employment'
      } else if (lowerFeature.includes('procurement') || lowerFeature.includes('purchasing')) {
        category = 'procurement-purchasing'
      } else if (lowerFeature.includes('property tax') || lowerFeature.includes('revenue') || lowerFeature.includes('utility')) {
        category = 'revenue-taxation'
      }
      
      // Check if article exists
      const { docs: existing } = await payload.find({
        collection: 'articles',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })
      
      const articleData = {
        title,
        slug,
        state: stateDoc.id,
        stateCode: stateDoc.abbreviation,
        featureName,
        category,
        complianceLevel: 'required' as const,
        summary: summary || `Learn about ${featureName} requirements in ${stateDoc.name}`,
        keyRequirements,
        whoDoesThisApplyTo,
        implementationSteps,
        officialSources,
        faqs,
        enforcementAndPenalties: {
          enforcingAgency: '',
          potentialPenalties: [],
          riskLevel: 'medium' as const
        },
        opengovReadiness: 'full' as const,
        opengovNotes: opengovNotes || '',
        status: 'published' as const,
        publishedDate: new Date().toISOString(),
        author: authorId,
        tags: [
          { tag: stateName.replace(/\s+/g, '-') },
          { tag: featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        ],
      }
      
      if (existing.length > 0) {
        await payload.update({
          collection: 'articles',
          id: existing[0].id,
          data: articleData,
        })
        console.log(`   ✅ Updated existing article (ID: ${existing[0].id})`)
        updated++
      } else {
        const newArticle = await payload.create({
          collection: 'articles',
          data: articleData,
        })
        console.log(`   ✅ Created new article (ID: ${newArticle.id})`)
        console.log(`   🔗 URL: http://localhost:3000/articles/${newArticle.slug}`)
        created++
      }
      
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`)
      errors++
    }
  }
  
  console.log(`\n${'='.repeat(60)}`)
  console.log('📊 Import Summary')
  console.log('='.repeat(60))
  console.log(`   ✅ Created: ${created}`)
  console.log(`   🔄 Updated: ${updated}`)
  console.log(`   ❌ Errors: ${errors}`)
  console.log(`   📄 Total processed: ${files.length}`)
  console.log('='.repeat(60))
  
  if (created + updated > 0) {
    console.log('\n🎉 Import completed successfully!')
    console.log('\n📱 View your articles at: http://localhost:3000/articles')
    console.log('⚙️  Admin panel at: http://localhost:3000/admin/collections/articles')
  }
}

importMarkdownArticles()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  })
