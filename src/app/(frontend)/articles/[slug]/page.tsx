import Link from 'next/link'
import Image from 'next/image'
import './article.css'
import { notFound } from 'next/navigation'

async function getArticle(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/articles?where[slug][equals]=${slug}&limit=1&depth=1`,
      { next: { revalidate: 60 } }
    )
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(stateId: string, category: string, currentId: string) {
  try {
    // First try to get articles from the same state (most relevant)
    const stateRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/articles?where[state][equals]=${stateId}&where[id][not_equals]=${currentId}&limit=3&depth=1`,
      { next: { revalidate: 60 }}
    )
    
    if (!stateRes.ok) {
      return []
    }
    
    const stateData = await stateRes.json()
    const stateArticles = stateData.docs || []
    
    // If we have 3 articles from the same state, return them
    if (stateArticles.length >= 3) {
      return stateArticles.slice(0, 3)
    }
    
    // Otherwise, supplement with articles from the same category
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/articles?where[category][equals]=${category}&where[id][not_equals]=${currentId}&limit=${3 - stateArticles.length}&depth=1`,
      { next: { revalidate: 60 }}
    )
    
    if (!categoryRes.ok) {
      return stateArticles
    }
    
    const categoryData = await categoryRes.json()
    const categoryArticles = categoryData.docs || []
    
    // Combine and deduplicate
    const combined = [...stateArticles]
    const existingIds = new Set(stateArticles.map((a: any) => a.id))
    
    for (const article of categoryArticles) {
      if (!existingIds.has(article.id) && combined.length < 3) {
        combined.push(article)
      }
    }
    
    return combined
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = article ? await getRelatedArticles(
    article.state?.id || '',
    article.category,
    article.id
  ) : []
  
  return (
    <article className="article-detail">
      <header className="article-header">
        <div className="container-narrow">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/articles">Articles</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{article.state?.name || 'Unknown'}</span>
          </div>

          <div className="article-badges">
            <span className={`compliance-badge ${article.complianceLevel || 'required'}`}>
              {(article.complianceLevel || 'required').toUpperCase()}
            </span>
            <span className="category-badge">
              {article.category?.replace(/-/g, ' ') || 'General'}
            </span>
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta">
            <span>Last Updated: {new Date(article.updatedAt || article.publishedDate).toLocaleDateString()}</span>
            {article.state && (
              <span> • {article.state.name} ({article.stateCode})</span>
            )}
          </div>
        </div>
      </header>

      <section className="content-section summary-section">
        <div className="container-narrow">
          <h2 className="section-title">What You Need to Know</h2>
          <div className="callout-box">
            <p className="summary-text">{article.summary}</p>
          </div>
        </div>
      </section>

      {article.keyRequirements && article.keyRequirements.length > 0 && (
        <section className="content-section">
          <div className="container-narrow">
            <h2 className="section-title">Key Requirements</h2>
            <ul className="requirements-list">
              {article.keyRequirements.map((req: any, index: number) => (
                <li key={index} className="requirement-item">{req.requirement}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="content-section highlight-section">
        <div className="container-narrow">
          <h2 className="section-title">Compliance Level</h2>
          <div className="compliance-info">
            <div className="compliance-level-large">
              <span className={`level-badge ${article.complianceLevel || 'required'}`}>
                {(article.complianceLevel || 'required').toUpperCase()}
              </span>
              <p>This requirement is <strong>{article.complianceLevel || 'required'}</strong> for local governments in {article.state?.name || 'this state'}.</p>
            </div>
          </div>
        </div>
      </section>

      {article.implementationSteps && article.implementationSteps.length > 0 && (
        <section className="content-section">
          <div className="container-narrow">
            <h2 className="section-title">Implementation Guide</h2>
            {article.implementationSteps.map((step: any, index: number) => (
              <div key={index} className="implementation-step">
                <h3 className="step-title">{step.stepTitle}</h3>
                {step.timing && (
                  <div className="step-meta">
                    <strong>Timing:</strong> {step.timing}
                  </div>
                )}
                {step.responsible && (
                  <div className="step-meta">
                    <strong>Responsible Party:</strong> {step.responsible}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {article.officialSources && article.officialSources.length > 0 && (
        <section className="content-section">
          <div className="container-narrow">
            <h2 className="section-title">Official Sources</h2>
            <ul className="sources-list">
              {article.officialSources.map((source: any, index: number) => (
                <li key={index}>
                  {source.sourceUrl ? (
                    <a href={source.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {source.sourceName}
                    </a>
                  ) : (
                    source.sourceName
                  )}
                  {source.sourceType && (
                    <span className="source-type"> ({source.sourceType})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {article.faqs && article.faqs.length > 0 && (
        <section className="content-section">
          <div className="container-narrow">
            <h2 className="section-title">Frequently Asked Questions</h2>
            {article.faqs.map((faq: any, index: number) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <div className="faq-answer">
                  {faq.answer?.root?.children?.map((child: any, childIndex: number) => {
                    if (child.type === 'paragraph') {
                      const text = child.children?.map((textNode: any) => textNode.text).join('') || ''
                      return <p key={childIndex}>{text}</p>
                    }
                    return null
                  }) || <p>Answer not available</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {article.opengovNotes && (
        <section className="content-section solution-section">
          <div className="container-narrow">
            <h2 className="section-title">OpenGov Solution</h2>
            <div className="solution-box">
              <div className="solution-icon">
                <Image src="/icons/check.svg" alt="" width={24} height={24} />
              </div>
              <p className="solution-text">{article.opengovNotes}</p>
            </div>
          </div>
        </section>
      )}

      <section className="article-actions">
        <div className="container-narrow">
          <div className="actions-grid">
            <button className="action-btn">
              <Image src="/icons/heart.svg" alt="" width={20} height={20} />
              Save to Library
            </button>
            <button className="action-btn">
              <Image src="/icons/share.svg" alt="" width={20} height={20} />
              Share Article
            </button>
            <button className="action-btn">
              <Image src="/icons/download.svg" alt="" width={20} height={20} />
              Export PDF
            </button>
            <button className="action-btn">
              <Image src="/icons/bell.svg" alt="" width={20} height={20} />
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="content-section related-section">
          <div className="container-narrow">
            <h2 className="section-title">Related Compliance Articles</h2>
            <div className="related-grid">
              {relatedArticles.map((related: any) => (
                <Link key={related.id} href={`/articles/${related.slug}`} className="related-card">
                  <div className="related-badges">
                    <span className="state-badge">{related.stateCode}</span>
                    <span className={`compliance-badge ${related.complianceLevel || 'required'}`}>
                      {related.complianceLevel || 'required'}
                    </span>
                  </div>
                  <h3 className="related-title">{related.title}</h3>
                  <p className="related-excerpt">{related.summary?.substring(0, 120)}...</p>
                  <div className="related-link">Read More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Help with Compliance?</h2>
            <p>Our team of experts can help you understand and implement these requirements.</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">Contact an Expert</Link>
              <Link href="/articles" className="btn btn-outline-light btn-lg">More Articles</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
