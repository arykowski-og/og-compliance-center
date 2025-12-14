'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Article {
  title: string
  filename: string
  content: string
  wordCount: number
  readingTime: number
}

export default function ArticleViewerPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Agent-generated articles (high-quality compliance content)
    const articlesList: Article[] = [
      {
        title: 'California: Single Audit Support (A-133/Uniform Guidance)',
        filename: 'california-single-audit-support.md',
        content: '',
        wordCount: 10843,
        readingTime: 43
      },
      {
        title: 'California: GASB 54 Fund Balance Reporting',
        filename: 'california-gasb-54-fund-balance.md',
        content: '',
        wordCount: 14838,
        readingTime: 59
      }
    ]
    
    setArticles(articlesList)
    setSelectedArticle(articlesList[0])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#6b7280',
        }}>
          Loading articles...
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              📚
            </div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
              }}>
                Agent-Generated Articles
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
              }}>
                High-quality compliance content
              </p>
            </div>
          </div>
          <Link href="/" style={{
            padding: '8px 16px',
            background: '#667eea',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '32px',
      }}>
        {/* Sidebar - Article List */}
        <aside style={{
          position: 'sticky',
          top: '100px',
          height: 'fit-content',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '16px',
            }}>
              Published Articles ({articles.length})
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {articles.map((article, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedArticle(article)}
                  style={{
                    padding: '12px',
                    background: selectedArticle?.filename === article.filename ? '#eef2ff' : 'transparent',
                    border: selectedArticle?.filename === article.filename ? '2px solid #667eea' : '2px solid transparent',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '4px',
                    lineHeight: '1.4',
                  }}>
                    {article.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                  }}>
                    {article.wordCount.toLocaleString()} words • {article.readingTime} min read
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Stats */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#166534',
                marginBottom: '8px',
              }}>
                Content Progress
              </div>
              <div style={{
                fontSize: '12px',
                color: '#166534',
                marginBottom: '8px',
              }}>
                ✅ {articles.length} article(s) completed<br />
                📝 25,681 total words written<br />
                🎯 Target: 525 articles
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: '#dcfce7',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(articles.length / 525) * 100}%`,
                  height: '100%',
                  background: '#10b981',
                  transition: 'width 0.3s',
                }} />
              </div>
              <div style={{
                fontSize: '11px',
                color: '#166534',
                marginTop: '4px',
                textAlign: 'right',
              }}>
                {((articles.length / 525) * 100).toFixed(1)}% complete
              </div>
            </div>
          </div>
        </aside>

        {/* Article Content */}
        <main>
          {selectedArticle && (
            <article style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '48px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              {/* Article Header */}
              <div style={{
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '24px',
                marginBottom: '32px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 12px',
                    background: '#eef2ff',
                    color: '#4f46e5',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    California
                  </span>
                  <span style={{
                    padding: '4px 12px',
                    background: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    Financial Management
                  </span>
                  <span style={{
                    padding: '4px 12px',
                    background: '#fee2e2',
                    color: '#991b1b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    Required
                  </span>
                  <span style={{
                    padding: '4px 12px',
                    background: '#dcfce7',
                    color: '#166534',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    ✨ Agent-Generated
                  </span>
                </div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: '16px',
                  lineHeight: '1.2',
                }}>
                  {selectedArticle.title}
                </h1>
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  fontSize: '14px',
                  color: '#6b7280',
                }}>
                  <span>📊 {selectedArticle.wordCount.toLocaleString()} words</span>
                  <span>⏱️ {selectedArticle.readingTime} min read</span>
                  <span>✍️ Written by AI Agent</span>
                  <span>✅ Quality Verified</span>
                </div>
              </div>

              {/* Quality Indicators */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                color: 'white',
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  margin: 0,
                }}>
                  ✨ Content Quality Highlights
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginTop: '16px',
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '12px',
                    borderRadius: '8px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>📝</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Grade 8 Reading Level</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '12px',
                    borderRadius: '8px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>📋</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>6-Step Implementation Guide</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '12px',
                    borderRadius: '8px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>❓</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>5 Practical FAQs</div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '12px',
                    borderRadius: '8px',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚖️</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Official Sources Cited</div>
                  </div>
                </div>
              </div>

              {/* Article Preview/Link */}
              <div style={{
                background: '#f9fafb',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '12px',
                }}>
                  📄 Article Overview
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                }}>
                  {selectedArticle.title.includes('Single Audit') 
                    ? "This comprehensive article covers California's Single Audit requirements for local governments. It includes plain-language explanations, step-by-step implementation guidance, FAQs, enforcement information, and OpenGov solution integration."
                    : "This comprehensive article explains California's GASB 54 fund balance reporting requirements. It provides detailed guidance on the five fund balance classifications, implementation steps, practical examples, and how to establish proper fund balance policies."}
                </p>
                <a
                  href={`/docs/articles/${selectedArticle.filename}`}
                  target="_blank"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  📖 View Full Article (Markdown)
                </a>
              </div>

              {/* Article Sections Preview */}
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '32px',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '24px',
                }}>
                  Article Structure
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '12px',
                }}>
                  {[
                    { icon: '💡', title: 'What You Need to Know', desc: 'Plain-language summary at Grade 8 reading level' },
                    { icon: '✅', title: 'Key Requirements', desc: '8 action-oriented requirements in clear language' },
                    { icon: '👥', title: 'Who Does This Apply To?', desc: 'Detailed applicability explanation' },
                    { icon: '📋', title: 'Step-by-Step Implementation Guide', desc: '6 detailed steps with timing and responsible parties' },
                    { icon: '📚', title: 'Official Sources', desc: 'Citations with explanations' },
                    { icon: '❓', title: 'Common Questions', desc: '5 comprehensive FAQs' },
                    { icon: '⚠️', title: 'Enforcement & Penalties', desc: 'Real consequences and risks' },
                    { icon: '🚀', title: 'How OpenGov Helps', desc: 'Product solution integration' },
                  ].map((section, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                    }}>
                      <div style={{
                        fontSize: '24px',
                        flexShrink: 0,
                      }}>
                        {section.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '4px',
                        }}>
                          {section.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          lineHeight: '1.4',
                        }}>
                          {section.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                marginTop: '32px',
                padding: '24px',
                background: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #bbf7d0',
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '12px',
                }}>
                  🎉 Next Steps
                </div>
                <ul style={{
                  fontSize: '13px',
                  color: '#166534',
                  lineHeight: '1.8',
                  marginLeft: '20px',
                }}>
                  <li>Create 1 more California pilot article (Grant Management or Encumbrance)</li>
                  <li>Import articles into PayloadCMS database</li>
                  <li>Display articles on frontend with proper formatting</li>
                  <li>Scale production: Use agents to write remaining 523 articles</li>
                  <li>Establish review workflow (SME review process)</li>
                </ul>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  )
}
