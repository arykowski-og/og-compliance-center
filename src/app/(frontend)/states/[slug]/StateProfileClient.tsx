'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                      <span className="update-icon">
                        <Image src="/icons/star.svg" alt="" width={14} height={14} />
                      </span>
                      Tax Calculations
                    </Link>
                    <span className="update-time">2 weeks ago</span>
                  </div>
                </div>
                
                <div className="reference-item">
                  <div className="reference-link">
                    <Link href="#" className="update-link">
                      <span className="update-icon">
                        <Image src="/icons/star.svg" alt="" width={14} height={14} />
                      </span>
                      Open Meetings
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
          background: var(--og-white);
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
          background: linear-gradient(135deg, var(--og-primary-dark) 0%, var(--og-primary) 100%);
          padding: var(--spacing-3xl) 0;
          color: var(--og-white);
        }

        .hero-content-wrapper {
          display: flex;
          align-items: center;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
        }

        .state-icon-wrapper {
          flex-shrink: 0;
        }

        .state-icon {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          border: 3px solid var(--og-white);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--og-white);
        }

        .hero-text {
          flex: 1;
        }

        .state-title {
          font-size: 3rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-white);
        }

        .state-subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
          color: var(--og-white);
          font-weight: 300;
        }

        .main-content-section {
          padding: var(--spacing-3xl) 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: var(--spacing-2xl);
        }

        .sidebar {
          position: sticky;
          top: calc(90px + var(--spacing-md));
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
          color: var(--og-dark);
        }

        .reference-item {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--og-gray-300);
        }

        .reference-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .reference-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--og-gray-500);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .reference-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--og-dark);
          margin-bottom: 0.25rem;
        }

        .reference-note {
          font-size: 0.875rem;
          color: var(--og-gray-600);
        }

        .reference-date {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--og-primary);
          margin-bottom: 0.25rem;
        }

        .reference-countdown {
          font-size: 0.875rem;
          color: var(--og-accent);
          font-weight: 600;
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
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .update-link:hover {
          text-decoration: underline;
        }

        .update-icon {
          display: flex;
          align-items: center;
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
        }

        .main-content {
          min-width: 0;
        }

        .section-header-main {
          margin-bottom: var(--spacing-2xl);
        }

        .section-header-main h2 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .section-header-main p {
          font-size: 1.125rem;
          color: var(--og-gray-600);
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .topic-category-card {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-fast);
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
          padding: var(--spacing-xl);
          cursor: pointer;
        }

        .category-header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          flex: 1;
        }

        .category-icon {
          flex-shrink: 0;
        }

        .category-info {
          flex: 1;
        }

        .category-name {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-dark);
        }

        .category-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          color: var(--og-gray-600);
        }

        .article-count {
          font-weight: 600;
        }

        .meta-sep {
          color: var(--og-gray-400);
        }

        .last-updated {
          color: var(--og-gray-500);
        }

        .expand-button {
          width: 40px;
          height: 40px;
          background: var(--og-primary-light);
          color: var(--og-primary);
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .expand-button:hover {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .category-content {
          padding: 0 var(--spacing-xl) var(--spacing-xl);
        }

        .topics-sublist {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .topic-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--og-gray-100);
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
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--og-primary);
        }

        .topic-text {
          flex: 1;
          font-weight: 600;
        }

        .category-actions {
          display: flex;
          justify-content: flex-end;
        }

        .additional-info {
          margin-top: var(--spacing-2xl);
        }

        .info-card {
          background: var(--og-primary-light);
          border-left: 4px solid var(--og-primary);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .info-card h3 {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .info-card p {
          font-size: 1.125rem;
          line-height: 1.7;
          margin-bottom: var(--spacing-xl);
          color: var(--og-gray-700);
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

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
            font-size: 1.75rem;
          }

          .state-subtitle {
            font-size: 1rem;
          }

          .btn {
            width: 100%;
            white-space: normal;
            text-align: center;
          }

          .category-header {
            padding: var(--spacing-sm);
          }

          .category-header-left {
            gap: var(--spacing-sm);
            min-width: 0;
            flex: 1;
          }

          .category-icon {
            flex-shrink: 0;
            width: 32px;
          }

          .category-info {
            min-width: 0;
            flex: 1;
          }

          .category-name {
            font-size: 1rem;
            line-height: 1.3;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }

          .category-meta {
            flex-wrap: wrap;
            gap: 0.25rem var(--spacing-sm);
            font-size: 0.8125rem;
          }

          .expand-button {
            width: 32px;
            height: 32px;
            font-size: 1.25rem;
            flex-shrink: 0;
          }

          .sidebar-card {
            padding: var(--spacing-md);
          }

          .reference-value,
          .reference-note,
          .reference-date {
            font-size: 0.875rem;
            word-wrap: break-word;
          }

          .update-link {
            font-size: 0.8125rem;
          }
        }

        @media (max-width: 480px) {
          .category-name {
            font-size: 0.9375rem;
          }

          .category-meta {
            font-size: 0.75rem;
          }

          .state-title {
            font-size: 1.5rem;
          }

          .article-count,
          .last-updated {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  )
}
