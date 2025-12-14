import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Return empty array to skip static generation at build time
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const article = docs[0]
  if (!article) {
    return {}
  }

  return {
    title: article.seo?.metaTitle || `${article.title} - OpenGov`,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const article = docs[0]

  if (!article || article.status !== 'published') {
    notFound()
  }

  return (
    <>
      {/* Article Header */}
      <article className="article-container">
        <header className="article-header">
          <div className="container-narrow">
            <div className="article-meta-top">
              <Link href="/articles" className="back-link">
                ← Back to Articles
              </Link>
              <span className="article-category">{article.category}</span>
            </div>
            
            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-meta">
              <time dateTime={article.publishedDate}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {typeof article.author === 'object' && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="article-author">By {article.author.name}</span>
                </>
              )}
            </div>

            {article.excerpt && (
              <p className="article-excerpt">{article.excerpt}</p>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="article-content">
          <div className="container-narrow">
            {article.content && (
              <div 
                className="rich-content"
                dangerouslySetInnerHTML={{ 
                  __html: JSON.stringify(article.content) 
                }}
              />
            )}
          </div>
        </div>

        {/* Related Content */}
        {article.relatedStates && article.relatedStates.length > 0 && (
          <aside className="article-related">
            <div className="container-narrow">
              <h3>Related States</h3>
              <div className="related-states-grid">
                {article.relatedStates.map((state: any) => (
                  <Link
                    key={state.id}
                    href={`/states/${state.slug}`}
                    className="related-state-card"
                  >
                    <span className="state-name">{state.name}</span>
                    <span className="state-abbr">{state.abbreviation}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="article-tags">
            <div className="container-narrow">
              <h4>Tags</h4>
              <div className="tags-list">
                {article.tags.map((tagObj: any, index: number) => (
                  <span key={index} className="tag">
                    {tagObj.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Stay Updated on Compliance</h2>
            <p>
              Subscribe to our newsletter for the latest compliance insights, 
              regulatory updates, and best practices.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact an Expert
              </Link>
              <Link href="/articles" className="btn btn-outline-light btn-lg">
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .article-container {
          background: var(--og-white);
        }

        .article-header {
          background: linear-gradient(135deg, var(--og-gray-100) 0%, var(--og-white) 100%);
          padding: var(--spacing-2xl) 0 var(--spacing-xl);
        }

        .container-narrow {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .article-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .back-link {
          color: var(--og-primary);
          font-weight: 600;
          transition: transform var(--transition-fast);
        }

        .back-link:hover {
          transform: translateX(-4px);
        }

        .article-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--og-primary-light);
          color: var(--og-primary);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .article-title {
          margin-bottom: var(--spacing-md);
        }

        .article-meta {
          display: flex;
          gap: var(--spacing-sm);
          align-items: center;
          color: var(--og-gray-500);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-lg);
        }

        .meta-separator {
          color: var(--og-gray-300);
        }

        .article-excerpt {
          font-size: 1.25rem;
          color: var(--og-gray-700);
          line-height: 1.8;
        }

        .article-content {
          padding: var(--spacing-3xl) 0;
        }

        .rich-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--og-gray-900);
        }

        .article-related {
          background: var(--og-gray-100);
          padding: var(--spacing-2xl) 0;
        }

        .related-states-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .related-state-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background: var(--og-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--og-gray-300);
          transition: all var(--transition-fast);
        }

        .related-state-card:hover {
          border-color: var(--og-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .state-abbr {
          background: var(--og-primary);
          color: var(--og-white);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .article-tags {
          padding: var(--spacing-xl) 0;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
        }

        .tag {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--og-gray-100);
          color: var(--og-gray-700);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .related-states-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}} />
    </>
  )
}
