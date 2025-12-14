import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const payload = await getPayload({ config })
  
  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 50,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Articles & Insights</h1>
          <p className="lead">
            Expert guidance on government compliance, GASB standards, and best practices
          </p>
        </div>
      </section>

      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="article-card"
              >
                <div className="article-category">
                  {article.category}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </span>
                  {typeof article.author === 'object' && (
                    <span className="article-author">
                      By {article.author.name}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .articles-section {
          padding: var(--spacing-3xl) 0;
        }
        
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-xl);
        }
        
        .article-card {
          background: var(--og-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          border: 1px solid var(--og-gray-300);
          transition: all var(--transition-base);
        }
        
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--og-primary);
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
          margin-bottom: var(--spacing-md);
        }
        
        .article-meta {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
          font-size: 0.875rem;
          color: var(--og-gray-500);
        }
        
        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </>
  )
}
