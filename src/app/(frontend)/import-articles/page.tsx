'use client'

import { useState, useEffect } from 'react'

interface ArticleFile {
  filename: string
  title: string
  wordCount: number
  size: number
  modified: string
}

interface ImportResult {
  success: boolean
  articleId?: string
  title?: string
  error?: string
}

export default function ImportArticles() {
  const [articles, setArticles] = useState<ArticleFile[]>([])
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, ImportResult>>({})

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/import-articles')
      const data = await response.json()
      setArticles(data.files || [])
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const importArticle = async (filename: string) => {
    setImporting(filename)
    try {
      const response = await fetch('/api/import-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })
      const result = await response.json()
      setResults((prev) => ({ ...prev, [filename]: result }))
    } catch (error: any) {
      setResults((prev) => ({
        ...prev,
        [filename]: { success: false, error: error.message },
      }))
    } finally {
      setImporting(null)
    }
  }

  const getStatusBadge = (filename: string) => {
    const result = results[filename]
    if (!result) return null

    if (result.success) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Imported Successfully
        </div>
      )
    }

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        {result.error || 'Import Failed'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Import Compliance Articles
          </h1>
          <p className="text-gray-600">
            Import agent-generated markdown articles into PayloadCMS
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Articles</h2>
              <p className="text-gray-600 mt-1">
                {articles.length} markdown {articles.length === 1 ? 'article' : 'articles'} ready to
                import
              </p>
            </div>
            <a
              href="/admin/collections/articles"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              View in Admin Panel
            </a>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Place markdown files in docs/articles/ to import them
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.filename}
                  className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                          <span>{article.filename}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{article.wordCount.toLocaleString()} words</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Modified {new Date(article.modified).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(article.filename)}
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => importArticle(article.filename)}
                        disabled={importing === article.filename || results[article.filename]?.success}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          importing === article.filename
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : results[article.filename]?.success
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                        }`}
                      >
                        {importing === article.filename ? (
                          <span className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Importing...
                          </span>
                        ) : results[article.filename]?.success ? (
                          '✓ Imported'
                        ) : (
                          'Import Article'
                        )}
                      </button>
                    </div>
                  </div>

                  {results[article.filename]?.success && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={`/admin/collections/articles/${results[article.filename].articleId}`}
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View in Admin Panel
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  )}

                  {results[article.filename]?.error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Error:</strong> {results[article.filename].error}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How it works</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Articles are scanned from <code className="bg-white px-1 rounded">docs/articles/</code>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Click "Import Article" to parse markdown and create PayloadCMS article entry
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-purple-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Imported articles are automatically published and appear in the admin panel
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
