import type { Metadata } from 'next'
import ArticleDetailClient from './ArticleDetailClient'

// Mock state data
const STATES_DATA: Record<string, { name: string; abbr: string }> = {
  'colorado': { name: 'Colorado', abbr: 'CO' },
  'texas': { name: 'Texas', abbr: 'TX' },
  'california': { name: 'California', abbr: 'CA' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string; article: string }>
}): Promise<Metadata> {
  const { slug, category, article } = await params
  const stateData = STATES_DATA[slug]
  
  if (!stateData) {
    return {
      title: 'Article Not Found - OpenGov Compliance Center'
    }
  }

  const articleTitle = article.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `${articleTitle} - ${stateData.name} - OpenGov`,
    description: `Detailed compliance guide for ${articleTitle} in ${stateData.name}`,
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string; category: string; article: string }> 
}) {
  const { slug, category, article } = await params
  const stateData = STATES_DATA[slug]

  if (!stateData) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist in our system.</p>
      </div>
    )
  }

  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const articleTitle = article.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <ArticleDetailClient
      stateName={stateData.name}
      stateSlug={slug}
      categoryName={categoryName}
      articleTitle={articleTitle}
    />
  )
}
