import Link from 'next/link'
import Image from 'next/image'
import './articles.css'

async function getArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/articles?limit=100&where[status][equals]=published`, {
      next: { revalidate: 60 } // Revalidate every minute
    })
    
    if (!res.ok) {
      console.error('Failed to fetch articles:', res.statusText)
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()
  
  // Group articles by state
  const articlesByState = articles.reduce((acc: any, article: any) => {
    const stateName = article.state?.name || 'Other'
    if (!acc[stateName]) {
      acc[stateName] = []
    }
    acc[stateName].push(article)
    return acc
  }, {})
  
  const states = Object.keys(articlesByState).sort()
  
  return (
    <div className="articles-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">Compliance Articles</span>
          </nav>
          
          <h1>Compliance Requirements by State</h1>
          <p className="page-intro">
            Browse compliance requirements, regulations, and implementation guides for local governments across all 50 states.
          </p>
          
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-number">{articles.length}</div>
              <div className="stat-label">Articles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{states.length}</div>
              <div className="stat-label">States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles by State */}
      <section className="articles-content">
        <div className="container">
          {states.length === 0 ? (
            <div className="no-articles">
              <h2>No articles available yet</h2>
              <p>Check back soon for compliance requirements and guides.</p>
            </div>
          ) : (
            states.map(stateName => (
              <div key={stateName} className="state-section">
                <h2 className="state-heading">{stateName}</h2>
                <div className="articles-grid">
                  {articlesByState[stateName].map((article: any) => (
                    <Link 
                      key={article.id} 
                      href={`/articles/${article.slug}`}
                      className="article-card"
                    >
                      <div className="article-header">
                        <div className="article-badges">
                          <span className={`compliance-badge ${article.complianceLevel || 'required'}`}>
                            {(article.complianceLevel || 'required').toUpperCase()}
                          </span>
                          <span className="category-badge">
                            {article.category?.replace(/-/g, ' ') || 'General'}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="article-title">{article.title}</h3>
                      
                      <p className="article-excerpt">
                        {article.summary || article.excerpt || 'Learn about this compliance requirement.'}
                      </p>
                      
                      <div className="article-footer">
                        <span className="read-more">Read More →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
