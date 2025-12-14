import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface ArticleMetadata {
  title: string
  state: string
  stateCode: string
  featureName: string
  category: string
  complianceLevel: string
  summary: string
  keyRequirements: string[]
  whoDoesThisApplyTo?: string
  implementationSteps: Array<{
    stepTitle: string
    stepDescription: string
    timing?: string
    responsible?: string
  }>
  officialSources?: Array<{
    sourceName: string
    sourceUrl?: string
    sourceType?: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  enforcementAndPenalties?: {
    enforcingAgency?: string
    potentialPenalties?: string[]
    riskLevel?: string
  }
  opengovNotes?: string
}

function parseMarkdownArticle(content: string): ArticleMetadata {
  const lines = content.split('\n')
  const result: ArticleMetadata = {
    title: '',
    state: '',
    stateCode: '',
    featureName: '',
    category: 'financial-management',
    complianceLevel: 'required',
    summary: '',
    keyRequirements: [],
    implementationSteps: [],
    faqs: [],
  }

  const titleMatch = lines[0].match(/^# (.+)$/)
  if (titleMatch) {
    result.title = titleMatch[1]
    
    const parts = result.title.split(':')
    if (parts.length >= 2) {
      result.state = parts[0].trim()
      result.featureName = parts[1].trim()
      result.stateCode = result.state.substring(0, 2).toUpperCase()
    }
  }

  let currentSection = ''
  let currentContent: string[] = []
  let currentStep: any = null
  let currentFaq: any = null

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## What You Need to Know')) {
      currentSection = 'summary'
      currentContent = []
    } else if (line.startsWith('## Key Requirements')) {
      currentSection = 'keyRequirements'
      currentContent = []
    } else if (line.startsWith('## Who Does This Apply To?')) {
      currentSection = 'whoDoesThisApplyTo'
      currentContent = []
    } else if (line.startsWith('## Step-by-Step Implementation Guide')) {
      currentSection = 'implementationSteps'
    } else if (line.startsWith('### Step ')) {
      if (currentStep) {
        result.implementationSteps.push(currentStep)
      }
      currentStep = {
        stepTitle: line.replace(/^### /, ''),
        stepDescription: '',
        timing: '',
        responsible: '',
      }
      currentContent = []
    } else if (line.startsWith('## Official Sources')) {
      currentSection = 'officialSources'
      if (currentStep) {
        result.implementationSteps.push(currentStep)
        currentStep = null
      }
    } else if (line.startsWith('## Common Questions')) {
      currentSection = 'faqs'
      if (currentStep) {
        result.implementationSteps.push(currentStep)
        currentStep = null
      }
    } else if (line.startsWith('**Q: ')) {
      if (currentFaq) {
        result.faqs.push(currentFaq)
      }
      currentFaq = {
        question: line.replace(/^\*\*Q: /, '').replace(/\*\*$/, ''),
        answer: '',
      }
      currentContent = []
    } else if (line.startsWith('## Enforcement & Penalties')) {
      currentSection = 'enforcement'
      if (currentFaq) {
        result.faqs.push(currentFaq)
        currentFaq = null
      }
      currentContent = []
    } else if (line.startsWith('## How OpenGov')) {
      currentSection = 'opengov'
      currentContent = []
    } else {
      if (line.trim()) {
        if (currentSection === 'summary' && line.trim() && !line.startsWith('#')) {
          currentContent.push(line)
        } else if (currentSection === 'keyRequirements' && line.startsWith('- **')) {
          const req = line.replace(/^- \*\*/, '').replace(/\*\*.*$/, '')
          result.keyRequirements.push(req)
        } else if (currentSection === 'whoDoesThisApplyTo' && line.trim() && !line.startsWith('#')) {
          currentContent.push(line)
        } else if (currentStep) {
          if (line.startsWith('**Timing:**')) {
            currentStep.timing = line.replace('**Timing:**', '').trim()
          } else if (line.startsWith('**Responsible Party:**') || line.startsWith('**Responsible party:**')) {
            currentStep.responsible = line.replace(/^\*\*Responsible [Pp]arty:\*\*/, '').trim()
          } else if (line.trim() && !line.startsWith('**')) {
            currentContent.push(line)
          }
        } else if (currentFaq && line.startsWith('A: ')) {
          currentContent.push(line.replace(/^A: /, ''))
        } else if (currentFaq && currentContent.length > 0) {
          currentContent.push(line)
        } else if (currentSection === 'opengov' && line.trim() && !line.startsWith('#')) {
          currentContent.push(line)
        } else if (currentSection === 'enforcement' && line.trim() && !line.startsWith('#')) {
          currentContent.push(line)
        }
      }

      if (currentSection === 'summary' && (lines[i + 1]?.startsWith('##') || i === lines.length - 1)) {
        result.summary = currentContent.join(' ').trim().substring(0, 500)
      } else if (currentSection === 'whoDoesThisApplyTo' && (lines[i + 1]?.startsWith('##') || i === lines.length - 1)) {
        result.whoDoesThisApplyTo = currentContent.join('\n').trim()
      } else if (currentStep && currentContent.length > 0 && (lines[i + 1]?.startsWith('###') || lines[i + 1]?.startsWith('##'))) {
        currentStep.stepDescription = currentContent.join('\n').trim()
        currentContent = []
      } else if (currentFaq && currentContent.length > 0 && (lines[i + 1]?.startsWith('**Q:') || lines[i + 1]?.startsWith('##'))) {
        currentFaq.answer = currentContent.join('\n').trim()
        currentContent = []
      } else if (currentSection === 'opengov' && (lines[i + 1]?.startsWith('##') || i === lines.length - 1)) {
        result.opengovNotes = currentContent.join('\n').trim()
      }
    }
  }

  if (currentStep) {
    result.implementationSteps.push(currentStep)
  }
  if (currentFaq) {
    result.faqs.push(currentFaq)
  }

  return result
}

export async function POST(request: NextRequest) {
  try {
    const { filename } = await request.json()

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    const articlesDir = path.join(process.cwd(), 'docs', 'articles')
    const filePath = path.join(articlesDir, filename)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const metadata = parseMarkdownArticle(content)

    const payload = await getPayload({ config })

    const stateQuery = await payload.find({
      collection: 'states',
      where: {
        code: {
          equals: metadata.stateCode,
        },
      },
    })

    let stateId = stateQuery.docs[0]?.id

    if (!stateId) {
      const createdState = await payload.create({
        collection: 'states',
        data: {
          name: metadata.state,
          code: metadata.stateCode,
          slug: metadata.state.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
      })
      stateId = createdState.id
    }

    const slug = metadata.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const article = await payload.create({
      collection: 'articles',
      data: {
        title: metadata.title,
        slug,
        state: stateId,
        stateCode: metadata.stateCode,
        featureName: metadata.featureName,
        category: metadata.category,
        complianceLevel: metadata.complianceLevel,
        summary: metadata.summary,
        keyRequirements: metadata.keyRequirements.map((req) => ({ requirement: req })),
        whoDoesThisApplyTo: metadata.whoDoesThisApplyTo || '',
        implementationSteps: metadata.implementationSteps,
        faqs: metadata.faqs,
        opengovNotes: metadata.opengovNotes || '',
        status: 'published',
        publishedDate: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      articleId: article.id,
      title: article.title,
    })
  } catch (error: any) {
    console.error('Import error:', error)
    return NextResponse.json({ error: error.message || 'Failed to import article' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'docs', 'articles')

    if (!fs.existsSync(articlesDir)) {
      return NextResponse.json({ files: [] })
    }

    const files = fs.readdirSync(articlesDir).filter((file) => file.endsWith('.md'))

    const articles = files.map((filename) => {
      const filePath = path.join(articlesDir, filename)
      const content = fs.readFileSync(filePath, 'utf-8')
      const stats = fs.statSync(filePath)

      const titleMatch = content.match(/^# (.+)$/m)
      const title = titleMatch ? titleMatch[1] : filename.replace('.md', '')

      const wordCount = content.split(/\s+/).length

      return {
        filename,
        title,
        wordCount,
        size: stats.size,
        modified: stats.mtime,
      }
    })

    return NextResponse.json({ files: articles })
  } catch (error: any) {
    console.error('Error reading articles:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
