'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { useState } from 'react'

// Sample topic categories for state compliance
const TOPIC_CATEGORIES = [
  { 
    name: 'Financial Management', 
    icon: 'OG-Icons_Financial Reporting-2c', 
    articleCount: 12,
    lastUpdated: 'Jan 15, 2025',
    topics: [
      'General Ledger with Fund Accounting (GASB 54)',
      'Encumbrance Accounting',
      'Budget Adoption & Amendments',
      'Financial Reporting (CAFR, AFR)',
      'Single Audit Support',
      'Grant Management'
    ]
  },
  { 
    name: 'Procurement & Purchasing', 
    icon: 'OG-Icons_Purchasing-2c', 
    articleCount: 8,
    lastUpdated: 'Jan 10, 2025',
    topics: [
      'eProcurement Portal Requirements',
      'Competitive Bidding Thresholds',
      'Procurement Methods (RFP, RFQ, IFB)',
      'Vendor Management',
      'Local Preference Rules',
      'Contract Retention'
    ]
  },
  { 
    name: 'Open Government & Transparency', 
    icon: 'OG-Icons_Collaboration-2c', 
    articleCount: 6,
    lastUpdated: 'Jan 5, 2025',
    topics: [
      'Open Meetings Laws',
      'Public Records Requests',
      'Budget Transparency & Publication',
      'Sunshine Laws',
      'Ethics & Conflicts of Interest'
    ]
  },
  { 
    name: 'HR & Employment', 
    icon: 'OG-Icons_Payroll-2c', 
    articleCount: 10,
    lastUpdated: 'Dec 28, 2024',
    topics: [
      'Payroll Processing Requirements',
      'Time & Attendance',
      'Leave Management (PTO, Sick, FMLA)',
      'FLSA Compliance',
      'Retirement/Pension Reporting',
      'Workers Compensation'
    ]
  },
  { 
    name: 'Revenue & Taxation', 
    icon: 'OG-Icons_Calculator-2c', 
    articleCount: 9,
    lastUpdated: 'Dec 20, 2024',
    topics: [
      'Property Tax Assessment',
      'Property Tax Billing & Collection',
      'Utility Billing',
      'Business Licensing & Taxes',
      'Sales & Use Tax'
    ]
  },
  { 
    name: 'Community Development & Permitting', 
    icon: 'OG-Icons_Code Enforcement-2c-101', 
    articleCount: 5,
    lastUpdated: 'Dec 15, 2024',
    topics: [
      'Land Use & Zoning',
      'Building Permits & Inspections',
      'Code Enforcement',
      'Fire Permits',
      'Health Permits'
    ]
  }
]

interface StateProfileClientProps {
  stateName: string
  stateAbbr: string
  slug: string
}

export default function StateProfileClient({ stateName, stateAbbr, slug }: StateProfileClientProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  return (
    <div className="state-profile-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/states">States</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{stateName}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="state-hero">
        <div className="container">
          <div className="hero-content-wrapper">
            <div className="state-icon-wrapper">
              <div className="state-icon">{stateAbbr}</div>
            </div>
            <div className="hero-text">
              <h1 className="state-title">{stateName}</h1>
              <p className="state-subtitle">State Compliance Requirements & Guides</p>
            </div>
          </div>
          <button className="btn btn-primary">
            Subscribe to Updates
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content-section">
        <div className="container">
          <div className="content-grid">
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Quick Reference</h3>
                
                <div className="reference-item">
                  <div className="reference-label">Fiscal Year</div>
                  <div className="reference-value">July 1 - June 30</div>
                  <div className="reference-note">{stateName} fiscal year runs 7/1-6/30</div>
                </div>
                
                <div className="reference-item">
                  <div className="reference-label">Key Deadline</div>
                  <div className="reference-value">Budget Adoption</div>
                  <div className="reference-date">September 30</div>
                  <div className="reference-countdown">30 days left</div>
                </div>
                
                <div className="reference-item">
                  <div className="reference-label">Recent Update</div>
                  <div className="reference-link">
                    <Link href="#" className="update-link">
                      ⭐ Tax Calculations
                    </Link>
                    <span className="update-time">2 weeks ago</span>
                  </div>
                </div>
                
                <div className="reference-item">
                  <div className="reference-link">
                    <Link href="#" className="update-link">
                      ⭐ Open Meetings
                    </Link>
                    <span className="update-time">3 weeks ago</span>
                  </div>
                </div>
                
                <div className="sidebar-actions">
                  <button className="btn btn-outline btn-sm btn-block">
                    View Calendar
                  </button>
                  <button className="btn btn-outline btn-sm btn-block">
                    Set Alerts
                  </button>
                </div>
              </div>
            </aside>

            {/* Topic Categories */}
            <main className="main-content">
              <div className="section-header-main">
                <h2>Topic Categories</h2>
                <p>Explore compliance requirements by category</p>
              </div>

              <div className="topics-list">
                {TOPIC_CATEGORIES.map((category) => (
                  <div 
                    key={category.name} 
                    className={`topic-category-card ${expandedCategory === category.name ? 'expanded' : ''}`}
                  >
                    <div 
                      className="category-header"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <div className="category-header-left">
                        <div className="category-icon">
                          <Icon name={category.icon} size={32} alt={category.name} />
                        </div>
                        <div className="category-info">
                          <h3 className="category-name">{category.name}</h3>
                          <div className="category-meta">
                            <span className="article-count">{category.articleCount} articles</span>
                            <span className="meta-sep">•</span>
                            <span className="last-updated">Updated {category.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <button className="expand-button">
                        {expandedCategory === category.name ? '−' : '+'}
                      </button>
                    </div>
                    
                    {expandedCategory === category.name && (
                      <div className="category-content">
                        <div className="topics-sublist">
                          {category.topics.map((topic, idx) => (
                            <Link 
                              key={idx}
                              href={`/states/${slug}/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="topic-link"
                            >
                              <span className="topic-bullet">›</span>
                              <span className="topic-text">{topic}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="category-actions">
                          <Link 
                            href={`/states/${slug}/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="btn btn-text"
                          >
                            View All {category.name} Requirements →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-card">
                  <h3>Need Help?</h3>
                  <p>Can't find what you're looking for? Our team can help you navigate {stateName}'s specific requirements.</p>
                  <Link href="/contact" className="btn btn-primary">
                    Contact Support
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <style jsx>{`
        .state-profile-page {
          width: 100%;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .breadcrumb-section {
          background: var(--og-gray-100);
          padding: var(--spacing-md) 0;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
        }

        .breadcrumb a {
          color: var(--og-primary);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .breadcrumb-sep {
          color: var(--og-gray-500);
        }

        .breadcrumb-current {
          color: var(--og-gray-700);
          font-weight: 600;
        }

        .state-hero {
          background: linear-gradient(135deg, var(--og-primary-light) 0%, var(--og-white) 100%);
          padding: var(--spacing-2xl) 0;
        }

        .state-hero .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hero-content-wrapper {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .state-icon-wrapper {
          flex-shrink: 0;
        }

        .state-icon {
          width: 80px;
          height: 80px;
          background: var(--og-primary);
          color: var(--og-white);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
        }

        .hero-text {
          flex: 1;
        }

        .state-title {
          font-size: 2.5rem;
          margin: 0 0 var(--spacing-xs) 0;
          color: var(--og-dark);
        }

        .state-subtitle {
          font-size: 1.125rem;
          color: var(--og-gray-700);
          margin: 0;
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

        .btn-primary:hover {
          background: var(--og-primary-dark);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--og-primary);
          color: var(--og-primary);
        }

        .btn-outline:hover {
          background: var(--og-primary-light);
        }

        .btn-sm {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .btn-block {
          width: 100%;
          text-align: center;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--og-primary);
          padding: var(--spacing-sm) 0;
          font-weight: 600;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        .main-content-section {
          padding: var(--spacing-3xl) 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--spacing-2xl);
        }

        .sidebar {
          position: sticky;
          top: var(--spacing-lg);
          height: fit-content;
        }

        .sidebar-card {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
        }

        .sidebar-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .reference-item {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--og-gray-300);
        }

        .reference-item:last-of-type {
          border-bottom: none;
        }

        .reference-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--og-gray-500);
          margin-bottom: var(--spacing-xs);
          font-weight: 600;
        }

        .reference-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--og-dark);
          margin-bottom: 0.25rem;
        }

        .reference-note {
          font-size: 0.875rem;
          color: var(--og-gray-700);
          line-height: 1.4;
        }

        .reference-date {
          font-size: 0.875rem;
          color: var(--og-dark);
          font-weight: 600;
          margin: 0.25rem 0;
        }

        .reference-countdown {
          font-size: 0.75rem;
          color: var(--og-accent);
          font-weight: 700;
          background: var(--og-primary-light);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          display: inline-block;
          margin-top: 0.25rem;
        }

        .reference-link {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .update-link {
          color: var(--og-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .update-link:hover {
          text-decoration: underline;
        }

        .update-time {
          font-size: 0.75rem;
          color: var(--og-gray-500);
        }

        .sidebar-actions {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 2px solid var(--og-gray-300);
        }

        .section-header-main {
          margin-bottom: var(--spacing-xl);
        }

        .section-header-main h2 {
          font-size: 2rem;
          margin-bottom: var(--spacing-xs);
        }

        .section-header-main p {
          color: var(--og-gray-700);
          font-size: 1rem;
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-2xl);
        }

        .topic-category-card {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .topic-category-card:hover {
          border-color: var(--og-primary);
          box-shadow: var(--shadow-md);
        }

        .topic-category-card.expanded {
          border-color: var(--og-primary);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .category-header:hover {
          background: var(--og-gray-100);
        }

        .category-header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex: 1;
        }

        .category-icon {
          flex-shrink: 0;
        }

        .category-info {
          flex: 1;
        }

        .category-name {
          font-size: 1.25rem;
          margin: 0 0 var(--spacing-xs) 0;
          color: var(--og-dark);
        }

        .category-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          color: var(--og-gray-700);
        }

        .article-count {
          font-weight: 600;
        }

        .meta-sep {
          color: var(--og-gray-500);
        }

        .expand-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--og-primary);
          background: var(--og-white);
          color: var(--og-primary);
          font-size: 1.5rem;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .expand-button:hover {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .category-content {
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          border-top: 1px solid var(--og-gray-300);
        }

        .topics-sublist {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg) 0;
        }

        .topic-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--og-dark);
          transition: all var(--transition-fast);
        }

        .topic-link:hover {
          background: var(--og-primary-light);
          color: var(--og-primary);
        }

        .topic-bullet {
          color: var(--og-primary);
          font-size: 1.25rem;
          font-weight: bold;
        }

        .topic-text {
          flex: 1;
        }

        .category-actions {
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--og-gray-300);
        }

        .additional-info {
          margin-top: var(--spacing-2xl);
        }

        .info-card {
          background: var(--og-primary-light);
          border: 2px solid var(--og-primary);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          text-align: center;
        }

        .info-card h3 {
          margin-bottom: var(--spacing-md);
        }

        .info-card p {
          margin-bottom: var(--spacing-lg);
          color: var(--og-gray-700);
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
            order: 2;
          }

          .main-content {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .state-hero .container {
            flex-direction: column;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .hero-content-wrapper {
            flex-direction: column;
            text-align: center;
          }

          .state-title {
            font-size: 2rem;
          }

          .category-header {
            padding: var(--spacing-md);
          }

          .category-name {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  )
}
