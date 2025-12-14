'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

// Sample articles data
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'Colorado Budget Adoption Deadlines',
    state: 'Colorado',
    stateSlug: 'colorado',
    category: 'Financial Management',
    excerpt: 'Colorado requires all jurisdictions to adopt a formal budget by September 30 each fiscal year. The fiscal year runs from July 1 to June 30.',
    lastUpdated: '2025-01-15',
    contentType: 'Regulation'
  },
  {
    id: 2,
    title: 'Texas Encumbrance Accounting Requirements',
    state: 'Texas',
    stateSlug: 'texas',
    category: 'Financial Management',
    excerpt: 'Texas statutorily requires encumbrance accounting for all local governments. This is mandatory under Texas Local Government Code Chapter 140.',
    lastUpdated: '2025-01-12',
    contentType: 'Regulation'
  },
  {
    id: 3,
    title: 'California Procurement Bidding Thresholds',
    state: 'California',
    stateSlug: 'california',
    category: 'Procurement & Purchasing',
    excerpt: 'California has specific bidding thresholds that vary by jurisdiction type. Counties, cities, and special districts have different requirements.',
    lastUpdated: '2025-01-10',
    contentType: 'Guide'
  },
  {
    id: 4,
    title: 'Colorado Open Meetings Law Compliance',
    state: 'Colorado',
    stateSlug: 'colorado',
    category: 'Open Government & Transparency',
    excerpt: 'Colorado Sunshine Law requires most government meetings to be open to the public with proper notice. Learn about requirements and exceptions.',
    lastUpdated: '2025-01-08',
    contentType: 'Regulation'
  },
  {
    id: 5,
    title: 'Texas Property Tax Assessment Guide',
    state: 'Texas',
    stateSlug: 'texas',
    category: 'Revenue & Taxation',
    excerpt: 'Comprehensive guide to property tax assessment requirements in Texas, including CAMA integration and Truth in Taxation requirements.',
    lastUpdated: '2025-01-05',
    contentType: 'Guide'
  },
  {
    id: 6,
    title: 'GASB 96 Implementation Checklist',
    state: 'All States',
    stateSlug: 'all',
    category: 'Financial Management',
    excerpt: 'Step-by-step checklist for implementing GASB 96 Subscription-Based IT Arrangements (SBITAs). Includes identification, measurement, and reporting.',
    lastUpdated: '2025-01-03',
    contentType: 'Checklist'
  }
]

const ALL_STATES = [
  'All States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

const TOPICS = [
  'Financial Management',
  'Procurement & Purchasing',
  'Open Government & Transparency',
  'Revenue & Taxation',
  'HR & Employment',
  'Community Development'
]

const CONTENT_TYPES = ['Regulation', 'Guide', 'Template', 'Checklist', 'Video']

const DATE_RANGES = [
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
  { label: 'All time', value: 0 }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [dateRange, setDateRange] = useState(0)
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance')

  // Filter articles
  const filteredArticles = useMemo(() => {
    let results = SAMPLE_ARTICLES

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      )
    }

    // State filter
    if (selectedStates.length > 0) {
      results = results.filter(article =>
        selectedStates.includes(article.state) || article.state === 'All States'
      )
    }

    // Topic filter
    if (selectedTopics.length > 0) {
      results = results.filter(article =>
        selectedTopics.includes(article.category)
      )
    }

    // Content type filter
    if (selectedTypes.length > 0) {
      results = results.filter(article =>
        selectedTypes.includes(article.contentType)
      )
    }

    // Date range filter
    if (dateRange > 0) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - dateRange)
      results = results.filter(article =>
        new Date(article.lastUpdated) >= cutoffDate
      )
    }

    // Sorting
    if (sortBy === 'date') {
      results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else if (sortBy === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title))
    }

    return results
  }, [searchQuery, selectedStates, selectedTopics, selectedTypes, dateRange, sortBy])

  const toggleState = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    )
  }

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const clearFilters = () => {
    setSelectedStates([])
    setSelectedTopics([])
    setSelectedTypes([])
    setDateRange(0)
    setSearchQuery('')
  }

  const hasActiveFilters = selectedStates.length > 0 || selectedTopics.length > 0 || 
                          selectedTypes.length > 0 || dateRange > 0 || searchQuery.length > 0

  return (
    <div className="search-page">
      {/* Search Header */}
      <section className="search-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">Search Results</span>
          </nav>
          
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search compliance requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">🔍 Search</button>
          </div>
          
          <div className="search-meta">
            <h1>Search Results for "{searchQuery || 'all articles'}"</h1>
            <p className="result-count">{filteredArticles.length} results found</p>
          </div>
          
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="search-content">
        <div className="container">
          <div className="search-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h2>Filters</h2>
                {hasActiveFilters && (
                  <button className="btn-text" onClick={clearFilters}>Clear All</button>
                )}
              </div>

              {/* State Filter */}
              <div className="filter-group">
                <h3 className="filter-title">State</h3>
                <div className="filter-options">
                  {ALL_STATES.slice(0, 10).map(state => (
                    <label key={state} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => toggleState(state)}
                      />
                      <span>{state}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div className="filter-group">
                <h3 className="filter-title">Topic</h3>
                <div className="filter-options">
                  {TOPICS.map(topic => (
                    <label key={topic} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Content Type Filter */}
              <div className="filter-group">
                <h3 className="filter-title">Content Type</h3>
                <div className="filter-options">
                  {CONTENT_TYPES.map(type => (
                    <label key={type} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="filter-group">
                <h3 className="filter-title">Date Range</h3>
                <div className="filter-options">
                  {DATE_RANGES.map(range => (
                    <label key={range.value} className="filter-radio">
                      <input
                        type="radio"
                        name="dateRange"
                        checked={dateRange === range.value}
                        onChange={() => setDateRange(range.value)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results */}
            <main className="search-results">
              <div className="results-header">
                <div className="sort-controls">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="sort-select"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date (Newest First)</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="no-results">
                  <h2>No results found</h2>
                  <p>Try adjusting your filters or search query</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="results-list">
                  {filteredArticles.map(article => (
                    <article key={article.id} className="result-card">
                      <div className="result-header">
                        <div className="result-badges">
                          <span className="state-badge">{article.state}</span>
                          <span className="category-badge">{article.category}</span>
                        </div>
                        <span className="content-type-badge">{article.contentType}</span>
                      </div>
                      
                      <h3 className="result-title">
                        <Link href={`/states/${article.stateSlug}/financial-management/budget-adoption`}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="result-excerpt">{article.excerpt}</p>
                      
                      <div className="result-footer">
                        <span className="result-date">
                          Updated: {new Date(article.lastUpdated).toLocaleDateString()}
                        </span>
                        <div className="result-actions">
                          <button className="btn-icon-sm">🤍 Save</button>
                          <button className="btn-icon-sm">📤 Share</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <style jsx>{`
        .search-page {
          width: 100%;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .search-header {
          background: var(--og-white);
          padding: var(--spacing-lg) 0 var(--spacing-xl);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          font-size: 0.875rem;
        }

        .breadcrumb a {
          color: var(--og-primary);
          text-decoration: none;
        }

        .breadcrumb-sep {
          color: var(--og-gray-500);
        }

        .breadcrumb-current {
          color: var(--og-gray-700);
          font-weight: 600;
        }

        .search-bar-wrapper {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
          max-width: 800px;
        }

        .search-input {
          flex: 1;
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: 1.125rem;
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--og-primary);
        }

        .search-button {
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--og-primary);
          color: var(--og-white);
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .search-button:hover {
          background: var(--og-primary-dark);
        }

        .search-meta h1 {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-sm);
        }

        .result-count {
          color: var(--og-gray-700);
          font-size: 1rem;
        }

        .clear-filters-btn {
          margin-top: var(--spacing-md);
          background: var(--og-gray-300);
          color: var(--og-dark);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .clear-filters-btn:hover {
          background: var(--og-gray-500);
          color: var(--og-white);
        }

        .search-content {
          padding: var(--spacing-2xl) 0;
        }

        .search-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--spacing-2xl);
        }

        .filters-sidebar {
          position: sticky;
          top: var(--spacing-lg);
          height: fit-content;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .filters-header h2 {
          font-size: 1.25rem;
          margin: 0;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--og-primary);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        .filter-group {
          margin-bottom: var(--spacing-xl);
        }

        .filter-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .filter-checkbox, .filter-radio {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          padding: 0.375rem 0;
        }

        .filter-checkbox input, .filter-radio input {
          cursor: pointer;
        }

        .filter-checkbox span, .filter-radio span {
          font-size: 0.875rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--og-gray-300);
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .sort-controls label {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .sort-select {
          padding: 0.5rem 1rem;
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          cursor: pointer;
        }

        .no-results {
          text-align: center;
          padding: var(--spacing-3xl);
        }

        .no-results h2 {
          margin-bottom: var(--spacing-md);
        }

        .no-results p {
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-xl);
        }

        .btn {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .btn-primary:hover {
          background: var(--og-primary-dark);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .result-card {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          transition: all var(--transition-fast);
        }

        .result-card:hover {
          border-color: var(--og-primary);
          box-shadow: var(--shadow-md);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .result-badges {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .state-badge {
          background: var(--og-primary);
          color: var(--og-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .category-badge {
          background: var(--og-gray-300);
          color: var(--og-dark);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .content-type-badge {
          background: var(--og-primary-light);
          color: var(--og-primary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .result-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-md);
        }

        .result-title a {
          color: var(--og-dark);
          text-decoration: none;
        }

        .result-title a:hover {
          color: var(--og-primary);
        }

        .result-excerpt {
          color: var(--og-gray-700);
          line-height: 1.6;
          margin-bottom: var(--spacing-md);
        }

        .result-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--og-gray-300);
        }

        .result-date {
          font-size: 0.875rem;
          color: var(--og-gray-700);
        }

        .result-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .btn-icon-sm {
          background: var(--og-white);
          border: 1px solid var(--og-gray-300);
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-icon-sm:hover {
          border-color: var(--og-primary);
          background: var(--og-primary-light);
        }

        @media (max-width: 1024px) {
          .search-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            position: static;
            order: 2;
          }

          .search-results {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .search-bar-wrapper {
            flex-direction: column;
          }

          .search-button {
            width: 100%;
          }

          .result-header {
            flex-direction: column;
            gap: var(--spacing-sm);
          }

          .result-footer {
            flex-direction: column;
            gap: var(--spacing-md);
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}
