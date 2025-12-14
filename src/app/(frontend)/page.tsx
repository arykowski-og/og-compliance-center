'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { useState, useRef, useEffect } from 'react'

const POPULAR_TOPICS = [
  { name: 'Budget Adoption', icon: 'OG-Icons_B&P-2c', articleCount: 234, slug: 'budget-adoption' },
  { name: 'Procurement Methods', icon: 'OG-Icons_Purchasing-2c', articleCount: 189, slug: 'procurement-methods' },
  { name: 'Financial Reporting', icon: 'OG-Icons_Financial Reporting-2c', articleCount: 156, slug: 'financial-reporting' },
  { name: 'Open Meetings', icon: 'OG-Icons_Collaboration-2c', articleCount: 143, slug: 'open-meetings' },
  { name: 'Tax Levy Limits', icon: 'OG-Icons_Calculator-2c', articleCount: 121, slug: 'tax-levy' },
  { name: 'Vendor Management', icon: 'OG-Icons_Vendor Engagement-2c', articleCount: 98, slug: 'vendor-management' }
]

const RECENT_UPDATES = [
  { 
    state: 'Colorado', 
    title: 'New tax levy calculation rules',
    time: '2 hours ago',
    category: 'Financial Management'
  },
  { 
    state: 'Texas', 
    title: 'Open meetings exemption clarified',
    time: '5 hours ago',
    category: 'Open Government'
  },
  { 
    state: 'California', 
    title: 'Procurement threshold increased',
    time: '1 day ago',
    category: 'Procurement'
  }
]

const HOW_IT_WORKS_STEPS = [
  { number: 1, title: 'Select Your State', description: 'Choose from all 50 states to see relevant compliance requirements' },
  { number: 2, title: 'Browse or Search Topics', description: 'Find specific requirements or explore by category' },
  { number: 3, title: 'Get Plain-Language Explanations', description: 'Understand complex regulations without legal expertise' },
  { number: 4, title: 'Download Templates & Guides', description: 'Access ready-to-use resources for implementation' },
  { number: 5, title: 'Get Alerts When Laws Change', description: 'Stay informed with automatic notifications' }
]

const ALL_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export default function HomePage() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedStateName, setSelectedStateName] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleGetStarted = () => {
    if (selectedState) {
      window.location.href = `/states/${selectedState}`
    }
  }

  const handleStateSelect = (state: string) => {
    const stateSlug = state.toLowerCase().replace(' ', '-')
    setSelectedState(stateSlug)
    setSelectedStateName(state)
    setIsDropdownOpen(false)
    setSearchQuery('')
  }

  const filteredStates = ALL_STATES.filter(state => 
    state.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your State & Compliance Requirements
            </h1>
            <p className="hero-subtitle">
              Navigate local government compliance with confidence across all 50 states
            </p>
            
            <div className="state-selector-wrapper">
              <div className="custom-dropdown" ref={dropdownRef}>
                <button
                  className="dropdown-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  type="button"
                >
                  <span className={!selectedStateName ? 'placeholder' : ''}>
                    {selectedStateName || 'Select Your State'}
                  </span>
                  <svg 
                    className={`dropdown-chevron ${isDropdownOpen ? 'open' : ''}`}
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M5 7.5L10 12.5L15 7.5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-search">
                      <input
                        type="text"
                        placeholder="Search states..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        autoFocus
                      />
                    </div>
                    <div className="dropdown-options">
                      {filteredStates.length > 0 ? (
                        filteredStates.map(state => (
                          <button
                            key={state}
                            className={`dropdown-option ${selectedStateName === state ? 'selected' : ''}`}
                            onClick={() => handleStateSelect(state)}
                            type="button"
                          >
                            {state}
                            {selectedStateName === state && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path 
                                  d="M13.3333 4L6 11.3333L2.66667 8" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="no-results">No states found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="btn btn-primary btn-lg"
                disabled={!selectedState}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-topics-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Topics This Week</h2>
            <p>Most searched compliance requirements</p>
          </div>
          
          <div className="topics-grid">
            {POPULAR_TOPICS.map((topic) => (
              <Link key={topic.slug} href={`/articles?topic=${topic.slug}`} className="topic-card">
                <div className="topic-icon">
                  <Icon name={topic.icon} size={48} alt={topic.name} />
                </div>
                <h3 className="topic-name">{topic.name}</h3>
                <p className="topic-count">{topic.articleCount} articles</p>
                <span className="topic-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="recent-updates-section">
        <div className="container">
          <div className="section-header-row">
            <h2>Recent Updates</h2>
            <Link href="/articles" className="view-all-link">View All Updates →</Link>
          </div>
          
          <div className="updates-list">
            {RECENT_UPDATES.map((update, idx) => (
              <div key={idx} className="update-item">
                <div className="update-badge">New</div>
                <div className="update-content">
                  <div className="update-header">
                    <span className="update-state">{update.state}</span>
                    <span className="update-time">{update.time}</span>
                  </div>
                  <h4 className="update-title">{update.title}</h4>
                  <p className="update-category">{update.category}</p>
                </div>
                <div className="update-actions">
                  <button className="btn-text">Read More</button>
                  <button className="btn-text">Save</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get compliant in 5 simple steps</p>
          </div>
          
          <div className="steps-container">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="how-it-works-cta">
            <Link href="/about" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50</div>
              <div className="stat-label">States Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Governments Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Regulations Tracked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Daily</div>
              <div className="stat-label">Updates</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Simplify Your Compliance?</h2>
            <p>
              Join thousands of government organizations using OpenGov to stay 
              compliant and operate more efficiently
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link href="/about" className="btn btn-outline-light btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          width: 100%;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .hero-section {
          background: linear-gradient(135deg, var(--og-primary-light) 0%, var(--og-white) 100%);
          padding: var(--spacing-3xl) 0;
          text-align: center;
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-2xl);
          font-weight: 400;
        }
        
        .state-selector-wrapper {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .custom-dropdown {
          flex: 1;
          position: relative;
        }
        
        .dropdown-trigger {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: 1.125rem;
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          background: var(--og-white);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          font-family: inherit;
        }
        
        .dropdown-trigger:hover {
          border-color: var(--og-primary);
        }
        
        .dropdown-trigger:focus {
          outline: none;
          border-color: var(--og-primary);
          box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
        }
        
        .dropdown-trigger .placeholder {
          color: var(--og-gray-500);
        }
        
        .dropdown-chevron {
          transition: transform var(--transition-fast);
          color: var(--og-gray-600);
          flex-shrink: 0;
          margin-left: var(--spacing-sm);
        }
        
        .dropdown-chevron.open {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-height: 400px;
          display: flex;
          flex-direction: column;
          animation: dropdownFadeIn 0.2s ease-out;
        }
        
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .dropdown-search {
          padding: var(--spacing-sm);
          border-bottom: 1px solid var(--og-gray-200);
        }
        
        .search-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--og-gray-300);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--og-primary);
        }
        
        .dropdown-options {
          overflow-y: auto;
          max-height: 320px;
        }
        
        .dropdown-option {
          width: 100%;
          padding: var(--spacing-md) var(--spacing-lg);
          border: none;
          background: transparent;
          text-align: left;
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .dropdown-option:hover {
          background: var(--og-primary-light);
        }
        
        .dropdown-option.selected {
          background: var(--og-primary-light);
          color: var(--og-primary);
          font-weight: 600;
        }
        
        .dropdown-option svg {
          color: var(--og-primary);
        }
        
        .no-results {
          padding: var(--spacing-lg);
          text-align: center;
          color: var(--og-gray-500);
          font-style: italic;
        }

        .btn {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--og-primary-dark);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--og-primary);
          color: var(--og-primary);
        }

        .btn-outline:hover {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .btn-outline-light {
          background: transparent;
          border: 2px solid var(--og-white);
          color: var(--og-white);
        }

        .btn-outline-light:hover {
          background: var(--og-white);
          color: var(--og-primary);
        }
        
        .popular-topics-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .section-header p {
          color: var(--og-gray-700);
          font-size: 1.125rem;
        }
        
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }
        
        .topic-card {
          background: #FFFFFF;
          border: 2px solid #CCCCCC;
          border-radius: 12px;
          padding: var(--spacing-xl);
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
        
        .topic-card:hover {
          border-color: #0052CC;
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0, 82, 204, 0.3);
          background: linear-gradient(135deg, #FFFFFF 0%, #E6F0FF 100%);
        }
        
        .topic-card:hover .topic-arrow {
          transform: translateX(4px);
        }
        
        .topic-icon {
          margin-bottom: var(--spacing-md);
        }
        
        .topic-name {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-dark);
          transition: color var(--transition-base);
        }
        
        .topic-card:hover .topic-name {
          color: var(--og-primary);
        }
        
        .topic-count {
          color: var(--og-gray-700);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-md);
        }
        
        .topic-arrow {
          color: var(--og-primary);
          font-size: 1.5rem;
          font-weight: bold;
          display: inline-block;
          transition: transform var(--transition-base);
        }
        
        .recent-updates-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-gray-100);
        }
        
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-xl);
        }

        .section-header-row h2 {
          font-size: 2.5rem;
          margin: 0;
        }
        
        .view-all-link {
          color: var(--og-primary);
          font-weight: 600;
          font-size: 1rem;
        }
        
        .updates-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        
        .update-item {
          background: var(--og-white);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition-fast);
        }
        
        .update-item:hover {
          box-shadow: var(--shadow-md);
        }
        
        .update-badge {
          background: var(--og-accent);
          color: var(--og-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        
        .update-content {
          flex: 1;
        }
        
        .update-header {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xs);
        }
        
        .update-state {
          font-weight: 700;
          color: var(--og-primary);
        }
        
        .update-time {
          color: var(--og-gray-500);
          font-size: 0.875rem;
        }
        
        .update-title {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-xs);
          margin-top: 0;
        }
        
        .update-category {
          color: var(--og-gray-700);
          font-size: 0.875rem;
          margin: 0;
        }
        
        .update-actions {
          display: flex;
          gap: var(--spacing-md);
          flex-shrink: 0;
        }
        
        .btn-text {
          background: none;
          border: none;
          color: var(--og-primary);
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          transition: background-color var(--transition-fast);
        }
        
        .btn-text:hover {
          background: var(--og-primary-light);
        }
        
        .how-it-works-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
        }
        
        .steps-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-2xl);
        }
        
        .step-card {
          text-align: center;
          padding: var(--spacing-xl) var(--spacing-sm);
        }
        
        .step-card:nth-child(1),
        .step-card:nth-child(2),
        .step-card:nth-child(3) {
          grid-column: span 2;
        }
        
        .step-card:nth-child(4) {
          grid-column: 2 / span 2;
        }
        
        .step-card:nth-child(5) {
          grid-column: 4 / span 2;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          background: var(--og-primary);
          color: var(--og-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 auto var(--spacing-md);
        }
        
        .step-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-sm);
          margin-top: 0;
        }
        
        .step-description {
          color: var(--og-gray-700);
          line-height: 1.6;
          margin: 0;
        }
        
        .how-it-works-cta {
          text-align: center;
        }
        
        .stats-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-primary);
          color: var(--og-white);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
          text-align: center;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
          color: var(--og-white);
        }
        
        .stat-label {
          font-size: 1.125rem;
          opacity: 0.9;
          color: var(--og-white);
        }
        
        .final-cta-section {
          padding: var(--spacing-3xl) 0;
          background: linear-gradient(135deg, var(--og-primary-dark) 0%, var(--og-primary) 100%);
          color: var(--og-white);
          text-align: center;
        }
        
        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-white);
        }
        
        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-2xl);
          opacity: 0.95;
        }
        
        .cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .state-selector-wrapper {
            flex-direction: column;
            width: 100%;
          }
          
          .custom-dropdown {
            width: 100%;
          }
          
          .dropdown-trigger {
            width: 100%;
          }
          
          .topics-grid {
            grid-template-columns: 1fr;
          }
          
          .steps-container {
            grid-template-columns: 1fr;
          }
          
          .step-card:nth-child(1),
          .step-card:nth-child(2),
          .step-card:nth-child(3),
          .step-card:nth-child(4),
          .step-card:nth-child(5) {
            grid-column: 1;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .cta-buttons {
            flex-direction: column;
          }
          
          .section-header-row {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-sm);
          }

          .update-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .update-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  )
}
