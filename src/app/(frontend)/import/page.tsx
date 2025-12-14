'use client'

import { useState } from 'react'

interface ArticleFile {
  filename: string
  title: string
  wordCount: number
  status: 'pending' | 'importing' | 'success' | 'error'
  message?: string
}

export default function ArticleImporterPage() {
  const [articles] = useState<ArticleFile[]>([
    {
      filename: 'california-single-audit-support.md',
      title: 'California: Single Audit Support',
      wordCount: 10843,
      status: 'pending'
    },
    {
      filename: 'california-gasb-54-fund-balance.md',
      title: 'California: GASB 54 Fund Balance Reporting',
      wordCount: 14838,
      status: 'pending'
    }
  ])

  const [articleStates, setArticleStates] = useState<Record<string, ArticleFile>>(
    articles.reduce((acc, article) => ({...acc, [article.filename]: article}), {})
  )

  const importArticle = async (filename: string) => {
    setArticleStates(prev => ({
      ...prev,
      [filename]: { ...prev[filename], status: 'importing' }
    }))

    try {
      const response = await fetch('/api/import-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      })

      const data = await response.json()

      if (response.ok) {
        setArticleStates(prev => ({
          ...prev,
          [filename]: { 
            ...prev[filename], 
            status: 'success',
            message: data.message 
          }
        }))
      } else {
        setArticleStates(prev => ({
          ...prev,
          [filename]: { 
            ...prev[filename], 
            status: 'error',
            message: data.error 
          }
        }))
      }
    } catch (error: any) {
      setArticleStates(prev => ({
        ...prev,
        [filename]: { 
          ...prev[filename], 
          status: 'error',
          message: error.message 
        }
      }))
    }
  }

  const importAll = async () => {
    for (const article of articles) {
      if (articleStates[article.filename].status === 'pending') {
        await importArticle(article.filename)
        // Small delay between imports
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'importing': return '🔄'
      case 'success': return '✅'
      case 'error': return '❌'
      default: return '⏳'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#6b7280'
      case 'importing': return '#f59e0b'
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const allImported = Object.values(articleStates).every(a => a.status === 'success')
  const anyImporting = Object.values(articleStates).some(a => a.status === 'importing')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '32px 24px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}>
              📥
            </div>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#111827',
                margin: 0,
              }}>
                Article Importer
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '4px 0 0 0',
              }}>
                Import agent-generated articles into PayloadCMS
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}>
            <div style={{
              fontSize: '14px',
              color: '#1e40af',
              lineHeight: '1.6',
            }}>
              <strong>How it works:</strong><br />
              1. Click "Import" on each article to import it into PayloadCMS<br />
              2. The markdown content is parsed and converted to PayloadCMS format<br />
              3. Articles are created via the PayloadCMS API<br />
              4. View imported articles in the <a href="/admin" style={{color: '#1e40af', textDecoration: 'underline'}}>Admin Panel</a>
            </div>
          </div>

          {/* Batch Import Button */}
          <button
            onClick={importAll}
            disabled={anyImporting || allImported}
            style={{
              width: '100%',
              padding: '16px',
              background: allImported ? '#10b981' : anyImporting ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: anyImporting || allImported ? 'not-allowed' : 'pointer',
              opacity: anyImporting || allImported ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
          >
            {allImported ? '🎉 All Articles Imported!' : anyImporting ? '⏳ Importing...' : '🚀 Import All Articles'}
          </button>
        </div>

        {/* Articles List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {articles.map((article) => {
            const state = articleStates[article.filename]
            return (
              <div
                key={article.filename}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: `2px solid ${state.status === 'success' ? '#bbf7d0' : state.status === 'error' ? '#fecaca' : '#e5e7eb'}`,
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      fontSize: '32px',
                    }}>
                      {getStatusIcon(state.status)}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#111827',
                        margin: 0,
                      }}>
                        {article.title}
                      </h3>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginTop: '4px',
                      }}>
                        {article.wordCount.toLocaleString()} words • {article.filename}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => importArticle(article.filename)}
                    disabled={state.status === 'importing' || state.status === 'success'}
                    style={{
                      padding: '10px 24px',
                      background: state.status === 'success' ? '#10b981' : state.status === 'importing' ? '#f59e0b' : '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: state.status === 'importing' || state.status === 'success' ? 'not-allowed' : 'pointer',
                      opacity: state.status === 'importing' || state.status === 'success' ? 0.7 : 1,
                      minWidth: '120px',
                    }}
                  >
                    {state.status === 'success' ? '✓ Imported' : state.status === 'importing' ? 'Importing...' : 'Import'}
                  </button>
                </div>

                {/* Status Message */}
                {state.message && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: state.status === 'success' ? '#f0fdf4' : '#fef2f2',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: state.status === 'success' ? '#166534' : '#991b1b',
                  }}>
                    {state.message}
                  </div>
                )}

                {/* Progress for importing state */}
                {state.status === 'importing' && (
                  <div style={{
                    marginTop: '12px',
                    width: '100%',
                    height: '4px',
                    background: '#fee2e2',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f59e0b',
                      animation: 'progress 1.5s ease-in-out infinite',
                    }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Success Message */}
        {allImported && (
          <div style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: 'white',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 16px 0',
            }}>
              All Articles Imported Successfully!
            </h2>
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              opacity: 0.9,
            }}>
              Your articles are now available in PayloadCMS
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
            }}>
              <a
                href="/admin/collections/articles"
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: '#059669',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                📋 View in Admin
              </a>
              <a
                href="/articles"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                📰 View on Frontend
              </a>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
