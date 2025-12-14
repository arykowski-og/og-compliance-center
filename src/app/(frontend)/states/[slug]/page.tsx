import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: states } = await payload.find({
    collection: 'states',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return states.map((state) => ({
    slug: state.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'states',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const state = docs[0]
  if (!state) {
    return {}
  }

  return {
    title: `${state.name} Compliance Guide - OpenGov`,
    description: state.hero?.subtitle || `Compliance information for ${state.name}`,
  }
}

export default async function StatePage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  
  const { docs } = await payload.find({
    collection: 'states',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const state = docs[0]

  if (!state || state.status !== 'published') {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="state-hero">
        <div className="container">
          <div className="state-header">
            <div className="state-title-group">
              <h1>{state.hero?.title || state.name}</h1>
              <span className="state-badge">{state.abbreviation}</span>
            </div>
            {state.hero?.subtitle && (
              <p className="lead">{state.hero.subtitle}</p>
            )}
            {state.hero?.lastUpdated && (
              <div className="state-meta">
                <span className="meta-label">Last Updated:</span>
                <span className="meta-value">
                  {new Date(state.hero.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {state.quickStats && state.quickStats.length > 0 && (
            <div className="quick-stats">
              {state.quickStats.map((stat, index) => (
                <div key={index} className="quick-stat">
                  {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="state-nav">
        <div className="container">
          <nav className="tab-nav">
            <a href="#financial" className="tab-link active">Financial Management</a>
            <a href="#budgeting" className="tab-link">Budgeting & Planning</a>
            <a href="#procurement" className="tab-link">Procurement</a>
            <a href="#resources" className="tab-link">Resources</a>
          </nav>
        </div>
      </section>

      {/* Financial Management */}
      <section id="financial" className="content-section">
        <div className="container">
          <h2>Financial Management</h2>
          {state.financialManagement?.requirements && (
            <div 
              className="rich-content"
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(state.financialManagement.requirements) 
              }}
            />
          )}
          {state.financialManagement?.keyFeatures && 
           state.financialManagement.keyFeatures.length > 0 && (
            <div className="features-list">
              <h3>Key Features</h3>
              <div className="features-grid">
                {state.financialManagement.keyFeatures.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {feature.icon && <div className="feature-icon">{feature.icon}</div>}
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Budgeting & Planning */}
      <section id="budgeting" className="content-section bg-light">
        <div className="container">
          <h2>Budgeting & Planning</h2>
          {state.budgeting?.requirements && (
            <div 
              className="rich-content"
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(state.budgeting.requirements) 
              }}
            />
          )}
          {state.budgeting?.keyFeatures && 
           state.budgeting.keyFeatures.length > 0 && (
            <div className="features-list">
              <h3>Key Features</h3>
              <div className="features-grid">
                {state.budgeting.keyFeatures.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Procurement */}
      <section id="procurement" className="content-section">
        <div className="container">
          <h2>Procurement</h2>
          {state.procurement?.requirements && (
            <div 
              className="rich-content"
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(state.procurement.requirements) 
              }}
            />
          )}
          {state.procurement?.keyFeatures && 
           state.procurement.keyFeatures.length > 0 && (
            <div className="features-list">
              <h3>Key Features</h3>
              <div className="features-grid">
                {state.procurement.keyFeatures.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="content-section bg-light">
        <div className="container">
          <h2>Resources</h2>
          
          {/* Related Articles */}
          {state.relatedArticles && state.relatedArticles.length > 0 && (
            <div className="resources-section">
              <h3>Related Articles</h3>
              <div className="articles-grid">
                {state.relatedArticles.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="article-card"
                  >
                    <h4>{article.title}</h4>
                    <p>{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* External Resources */}
          {state.externalResources && state.externalResources.length > 0 && (
            <div className="resources-section">
              <h3>External Resources</h3>
              <ul className="resources-list">
                {state.externalResources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {resource.title}
                    </a>
                    {resource.description && (
                      <p className="resource-description">{resource.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Downloadable Resources */}
          {state.downloadableResources && state.downloadableResources.length > 0 && (
            <div className="resources-section">
              <h3>Downloads</h3>
              <ul className="downloads-list">
                {state.downloadableResources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={typeof resource.file === 'object' ? resource.file.url : '#'}
                      className="download-link"
                      download
                    >
                      📥 {resource.title}
                    </a>
                    {resource.description && (
                      <p className="download-description">{resource.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Help with {state.name} Compliance?</h2>
            <p>
              Our team of experts can help you navigate {state.name}'s specific 
              regulatory requirements and ensure full compliance.
            </p>
            <div className="cta-buttons">
              <Link href="/demo" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                Contact an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
