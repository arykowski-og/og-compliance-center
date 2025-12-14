'use client'

import Link from 'next/link'
import Image from 'next/image'
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
            <button className="search-button">
              <Image src="/icons/search.svg" alt="" width={18} height={18} />
              Search
            </button>
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
                          <button className="btn-icon-sm">
                            <Image src="/icons/heart.svg" alt="" width={14} height={14} />
                            Save
                          </button>
                          <button className="btn-icon-sm">
                            <Image src="/icons/share.svg" alt="" width={14} height={14} />
                            Share
                          </button>
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
          background: var(--og-white);
        }

        .search-header {
          background: linear-gradient(135deg, var(--og-primary-dark) 0%, var(--og-primary) 100%);
          padding: var(--spacing-2xl) 0;
          color: var(--og-white);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xl);
          font-size: 0.875rem;
        }

        .breadcrumb a {
          color: var(--og-white);
          text-decoration: none;
          opacity: 0.9;
        }

        .breadcrumb a:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .breadcrumb-sep {
          opacity: 0.7;
        }

        .breadcrumb-current {
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
          border: 2px solid var(--og-white);
          border-radius: var(--radius-md);
          font-size: 1rem;
        }

        .search-button {
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--og-white);
          color: var(--og-primary);
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          transition: all var(--transition-fast);
        }

        .search-button:hover {
          background: var(--og-gray-100);
        }

        .search-meta h1 {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-white);
        }

        .result-count {
          font-size: 1.125rem;
          opacity: 0.9;
          color: var(--og-white);
          font-weight: 300;
        }

        .clear-filters-btn {
          margin-top: var(--spacing-md);
          padding: var(--spacing-sm) var(--spacing-lg);
          background: rgba(255, 255, 255, 0.2);
          color: var(--og-white);
          border: 1px solid var(--og-white);
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .clear-filters-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .search-content {
          padding: var(--spacing-3xl) 0;
        }

        .search-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--spacing-2xl);
        }

        .filters-sidebar {
          position: sticky;
          top: calc(90px + var(--spacing-md));
          height: fit-content;
          max-height: calc(100vh - 90px - var(--spacing-md) * 2);
          overflow-y: auto;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .filters-header h2 {
          font-size: 1.5rem;
          color: var(--og-dark);
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--og-primary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        .filter-group {
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-xl);
          border-bottom: 1px solid var(--og-gray-300);
        }

        .filter-group:last-child {
          border-bottom: none;
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

        .filter-checkbox,
        .filter-radio {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          font-size: 0.875rem;
        }

        .filter-checkbox input,
        .filter-radio input {
          cursor: pointer;
        }

        .search-results {
          min-width: 0;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-xl);
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .sort-controls label {
          font-weight: 600;
          color: var(--og-dark);
        }

        .sort-select {
          padding: var(--spacing-sm) var(--spacing-md);
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
          font-size: 2rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .no-results p {
          font-size: 1.125rem;
          color: var(--og-gray-600);
          margin-bottom: var(--spacing-xl);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .result-card {
          padding: var(--spacing-xl);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .result-card:hover {
          border-color: var(--og-primary);
          box-shadow: var(--shadow-md);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .result-badges {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .state-badge,
        .category-badge,
        .content-type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .state-badge {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .category-badge {
          background: var(--og-gray-200);
          color: var(--og-gray-700);
        }

        .content-type-badge {
          background: var(--og-accent-light);
          color: var(--og-accent);
        }

        .result-title {
          font-size: 1.5rem;
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
          font-size: 1rem;
          line-height: 1.7;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-md);
        }

        .result-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .result-date {
          font-size: 0.875rem;
          color: var(--og-gray-500);
        }

        .result-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .btn-icon-sm {
          background: none;
          border: none;
          color: var(--og-gray-600);
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .btn-icon-sm:hover {
          background: var(--og-gray-100);
          color: var(--og-primary);
        }

        @media (max-width: 1024px) {
          .search-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            position: static;
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .search-bar-wrapper {
            flex-direction: column;
          }

          .search-button {
            justify-content: center;
          }

          .result-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  )
}
