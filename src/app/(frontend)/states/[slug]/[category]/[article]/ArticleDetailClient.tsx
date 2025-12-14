'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { useState } from 'react'

interface ArticleDetailProps {
  stateName: string
  stateSlug: string
  categoryName: string
  articleTitle: string
}

// Sample article data - would come from CMS in production
const SAMPLE_ARTICLE = {
  title: 'Colorado Budget Adoption Deadlines',
  category: 'Financial Management',
  state: 'Colorado',
  stateAbbr: 'CO',
  lastUpdated: 'January 1, 2025',
  reviewedBy: 'Sarah Johnson, CPA, Government Finance Expert',
  readingTime: '8 min read',
  
  whatYouNeedToKnow: 'Colorado requires all jurisdictions to adopt a formal budget by September 30 each fiscal year. The fiscal year runs from July 1 to June 30. Public hearings are mandatory with at least 10 days notice.',
  
  keyRequirements: [
    'Public hearing required before budget adoption',
    'At least 10 days advance notice must be published',
    'Budget must include all estimates of expenditure and revenue',
    'Tax mill levy limits apply (Article X, Section 20)',
    'Budget amendment procedures must be followed for changes',
    'Final adopted budget must be filed with the state'
  ],
  
  implementationSteps: [
    {
      number: 1,
      title: 'Prepare preliminary budget',
      description: 'Work with department heads to compile revenue estimates and expenditure requests. Ensure compliance with fund accounting requirements (GASB 54).'
    },
    {
      number: 2,
      title: 'Hold pre-hearing public meeting with council',
      description: 'Present preliminary budget to governing body. Address questions and make adjustments based on feedback.'
    },
    {
      number: 3,
      title: 'Publish notice 10 days prior',
      description: 'Publish public hearing notice in newspaper of record. Include date, time, location, and purpose of hearing. Notice must run at least 10 days before hearing.'
    },
    {
      number: 4,
      title: 'Hold public hearing',
      description: 'Conduct public hearing allowing citizens to provide input. Document all comments received. Hearing must comply with Colorado Open Meetings Law.'
    },
    {
      number: 5,
      title: 'Adopt formal budget resolution',
      description: 'Governing body votes to adopt budget by resolution. Resolution must include appropriations by fund and organizational unit.'
    },
    {
      number: 6,
      title: 'Submit to state by deadline',
      description: 'File certified copy of adopted budget with Colorado Division of Local Government within 30 days of adoption.'
    }
  ],
  
  officialSources: [
    { name: 'Colorado Revised Statutes § 29-1-1103', url: 'https://leg.colorado.gov/sites/default/files/images/olls/crs2023-title-29.pdf' },
    { name: 'Colorado Revised Statutes § 29-1-1109', url: 'https://leg.colorado.gov/sites/default/files/images/olls/crs2023-title-29.pdf' },
    { name: 'Colorado Constitution Article X, Section 20 (TABOR)', url: 'https://www.colorado.gov/dola/tabor' }
  ],
  
  practicalExamples: [
    { name: 'City of Denver - Sample Budget Resolution', url: '#' },
    { name: 'Jefferson County - Public Hearing Notice Template', url: '#' },
    { name: 'Boulder County - Budget Adoption Timeline', url: '#' }
  ],
  
  commonQuestions: [
    {
      question: 'What happens if we miss the September 30 deadline?',
      answer: 'Missing the deadline can result in serious consequences including inability to levy taxes, potential legal action, and loss of state funding. Contact the Division of Local Government immediately if you anticipate missing the deadline.'
    },
    {
      question: 'Can we amend the budget after adoption?',
      answer: 'Yes, budget amendments are allowed but must follow specific procedures. Supplemental appropriations require a public hearing with 10 days notice. Emergency appropriations may be passed immediately but must be ratified at the next regular meeting.'
    },
    {
      question: 'Do we need to publish the entire budget in the newspaper?',
      answer: 'No, you only need to publish notice of the public hearing. However, the full budget must be available for public inspection and posted on your website if required by your jurisdiction size.'
    }
  ],
  
  relatedRequirements: [
    'Tax Mill Levy Limits & TABOR Compliance',
    'Fund Structure Requirements (GASB 54)',
    'Budget Amendment Procedures',
    'Open Budget Meetings & Transparency Laws'
  ],
  
  templates: [
    'Budget Resolution Template',
    'Public Hearing Notice Template',
    'Budget Amendment Form'
  ],
  
  enforcement: {
    agency: 'Colorado Division of Local Government',
    penalties: 'Failure to adopt a budget by the deadline may result in inability to levy taxes, loss of state funding, and potential legal action by the state or citizens.'
  }
}

export default function ArticleDetailClient({ stateName, stateSlug, categoryName, articleTitle }: ArticleDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'faqs'>('overview')
  const [savedArticle, setSavedArticle] = useState(false)

  return (
    <div className="article-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/states">States</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href={`/states/${stateSlug}`}>{stateName}</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href={`/states/${stateSlug}/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>{categoryName}</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{articleTitle}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="article-header">
        <div className="container">
          <div className="header-meta">
            <span className="state-badge">{SAMPLE_ARTICLE.stateAbbr}</span>
            <span className="category-badge">{SAMPLE_ARTICLE.category}</span>
            <span className="meta-item">Updated: {SAMPLE_ARTICLE.lastUpdated}</span>
          </div>
          
          <h1 className="article-title">{SAMPLE_ARTICLE.title}</h1>
          
          <div className="article-meta-bar">
            <div className="meta-left">
              <span className="meta-item">
                <Icon name="OG-Icons_Time Savings-2c" size={16} alt="Reading time" />
                {SAMPLE_ARTICLE.readingTime}
              </span>
              <span className="meta-item">
                Reviewed by: {SAMPLE_ARTICLE.reviewedBy}
              </span>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`btn-icon ${savedArticle ? 'active' : ''}`}
                onClick={() => setSavedArticle(!savedArticle)}
                title="Save article"
              >
                {savedArticle ? '❤️' : '🤍'} Save
              </button>
              <button className="btn-icon" title="Share article">
                📤 Share
              </button>
              <button className="btn-icon" title="Export to PDF">
                📥 Export
              </button>
              <button className="btn-icon btn-primary" title="Get alerts">
                🔔 Alert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content-section">
        <div className="container">
          <div className="content-layout">
            {/* Main Article Content */}
            <article className="article-content">
              {/* What You Need to Know */}
              <div className="info-box info-box-primary">
                <h2 className="info-box-title">What You Need to Know</h2>
                <p className="info-box-content">{SAMPLE_ARTICLE.whatYouNeedToKnow}</p>
              </div>

              {/* Tab Navigation */}
              <div className="tab-navigation">
                <button 
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === 'implementation' ? 'active' : ''}`}
                  onClick={() => setActiveTab('implementation')}
                >
                  Implementation Guide
                </button>
                <button 
                  className={`tab-button ${activeTab === 'faqs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('faqs')}
                >
                  Common Questions
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="tab-content">
                  {/* Key Requirements */}
                  <section className="content-section">
                    <h2>Key Requirements</h2>
                    <ul className="requirements-list">
                      {SAMPLE_ARTICLE.keyRequirements.map((req, idx) => (
                        <li key={idx} className="requirement-item">
                          <span className="requirement-bullet">✓</span>
                          <span className="requirement-text">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Official Sources */}
                  <section className="content-section">
                    <h2>Official Sources</h2>
                    <ul className="sources-list">
                      {SAMPLE_ARTICLE.officialSources.map((source, idx) => (
                        <li key={idx}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                            📄 {source.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Practical Examples */}
                  <section className="content-section">
                    <h2>Practical Examples</h2>
                    <ul className="examples-list">
                      {SAMPLE_ARTICLE.practicalExamples.map((example, idx) => (
                        <li key={idx}>
                          <a href={example.url} className="example-link">
                            📋 {example.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Enforcement & Penalties */}
                  <section className="content-section">
                    <h2>Enforcement & Penalties</h2>
                    <div className="enforcement-box">
                      <div className="enforcement-item">
                        <strong>Enforcing Agency:</strong> {SAMPLE_ARTICLE.enforcement.agency}
                      </div>
                      <div className="enforcement-item">
                        <strong>Penalties:</strong> {SAMPLE_ARTICLE.enforcement.penalties}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'implementation' && (
                <div className="tab-content">
                  <section className="content-section">
                    <h2>Step-by-Step Implementation</h2>
                    <div className="implementation-steps">
                      {SAMPLE_ARTICLE.implementationSteps.map((step) => (
                        <div key={step.number} className="step-card">
                          <div className="step-number-circle">{step.number}</div>
                          <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="tab-content">
                  <section className="content-section">
                    <h2>Common Questions</h2>
                    <div className="faq-list">
                      {SAMPLE_ARTICLE.commonQuestions.map((qa, idx) => (
                        <div key={idx} className="faq-item">
                          <h3 className="faq-question">Q: {qa.question}</h3>
                          <p className="faq-answer">A: {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Related Requirements */}
              <section className="content-section related-section">
                <h2>Related Requirements</h2>
                <div className="related-links">
                  {SAMPLE_ARTICLE.relatedRequirements.map((req, idx) => (
                    <Link key={idx} href="#" className="related-link">
                      › {req}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Feedback */}
              <section className="feedback-section">
                <h3>Was this helpful?</h3>
                <div className="feedback-buttons">
                  <button className="btn-feedback">👍 Yes</button>
                  <button className="btn-feedback">👎 No</button>
                </div>
                <div className="feedback-actions">
                  <button className="btn-text">Send Feedback</button>
                  <button className="btn-text">Report Error</button>
                  <button className="btn-text">Contact Support</button>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Quick Reference */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Quick Reference</h3>
                <div className="quick-ref-item">
                  <div className="ref-label">Key Dates</div>
                  <div className="ref-value">May 1: Notice deadline</div>
                  <div className="ref-value">Sept 30: Adoption deadline</div>
                </div>
                <div className="quick-ref-item urgent">
                  <div className="ref-label">⚠️ URGENT</div>
                  <div className="ref-value">30 days until deadline</div>
                </div>
              </div>

              {/* References */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">📋 References</h3>
                <ul className="ref-list">
                  <li><a href="#">CRS § 29-1-1103</a></li>
                  <li><a href="#">CRS § 29-1-1109</a></li>
                </ul>
              </div>

              {/* Related Topics */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">🔗 Related Topics</h3>
                <ul className="ref-list">
                  <li><Link href="#">Tax Mill Levy</Link></li>
                  <li><Link href="#">Fund Structure</Link></li>
                  <li><Link href="#">Amendments</Link></li>
                </ul>
              </div>

              {/* Templates */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">📄 Templates</h3>
                <ul className="template-list">
                  {SAMPLE_ARTICLE.templates.map((template, idx) => (
                    <li key={idx}>
                      <button className="template-download">
                        📥 {template}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ask Expert CTA */}
              <div className="sidebar-card sidebar-cta">
                <h3 className="sidebar-title">💬 Ask Expert</h3>
                <p>Schedule a call with a Colorado government law specialist</p>
                <button className="btn btn-primary btn-block">
                  Schedule Call
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style jsx>{`
        .article-detail-page {
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
          flex-wrap: wrap;
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

        .article-header {
          background: var(--og-white);
          padding: var(--spacing-2xl) 0 var(--spacing-xl);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          flex-wrap: wrap;
        }

        .state-badge {
          background: var(--og-primary);
          color: var(--og-white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 700;
        }

        .category-badge {
          background: var(--og-gray-300);
          color: var(--og-dark);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .meta-item {
          color: var(--og-gray-700);
          font-size: 0.875rem;
        }

        .article-title {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-lg);
          color: var(--og-dark);
          line-height: 1.2;
        }

        .article-meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .btn-icon {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          color: var(--og-gray-900);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-icon:hover {
          border-color: var(--og-primary);
          background: var(--og-primary-light);
        }

        .btn-icon.active {
          border-color: var(--og-accent);
          background: var(--og-accent);
          color: var(--og-white);
        }

        .btn-icon.btn-primary {
          background: var(--og-primary);
          border-color: var(--og-primary);
          color: var(--og-white);
        }

        .btn-icon.btn-primary:hover {
          background: var(--og-primary-dark);
        }

        .main-content-section {
          padding: var(--spacing-3xl) 0;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--spacing-2xl);
        }

        .article-content {
          min-width: 0;
        }

        .info-box {
          background: var(--og-primary-light);
          border-left: 4px solid var(--og-primary);
          padding: var(--spacing-xl);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-2xl);
        }

        .info-box-title {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .info-box-content {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--og-gray-900);
        }

        .tab-navigation {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xl);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .tab-button {
          background: none;
          border: none;
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: 1rem;
          font-weight: 600;
          color: var(--og-gray-700);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all var(--transition-fast);
          margin-bottom: -2px;
        }

        .tab-button:hover {
          color: var(--og-primary);
        }

        .tab-button.active {
          color: var(--og-primary);
          border-bottom-color: var(--og-primary);
        }

        .tab-content {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .content-section {
          margin-bottom: var(--spacing-2xl);
        }

        .content-section h2 {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-lg);
          color: var(--og-dark);
        }

        .requirements-list {
          list-style: none;
          padding: 0;
        }

        .requirement-item {
          display: flex;
          gap: var(--spacing-md);
          padding: var(--spacing-md) 0;
          border-bottom: 1px solid var(--og-gray-300);
        }

        .requirement-bullet {
          color: var(--og-success);
          font-size: 1.25rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .requirement-text {
          flex: 1;
          font-size: 1rem;
          line-height: 1.6;
        }

        .sources-list, .examples-list, .ref-list {
          list-style: none;
          padding: 0;
        }

        .sources-list li, .examples-list li, .ref-list li {
          margin-bottom: var(--spacing-md);
        }

        .source-link, .example-link {
          color: var(--og-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .source-link:hover, .example-link:hover {
          text-decoration: underline;
        }

        .enforcement-box {
          background: var(--og-gray-100);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
        }

        .enforcement-item {
          margin-bottom: var(--spacing-md);
          line-height: 1.6;
        }

        .enforcement-item:last-child {
          margin-bottom: 0;
        }

        .implementation-steps {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .step-card {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
        }

        .step-number-circle {
          width: 48px;
          height: 48px;
          background: var(--og-primary);
          color: var(--og-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-dark);
        }

        .step-description {
          line-height: 1.6;
          color: var(--og-gray-700);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .faq-item {
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--og-gray-300);
        }

        .faq-question {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .faq-answer {
          line-height: 1.6;
          color: var(--og-gray-700);
        }

        .related-section {
          padding: var(--spacing-xl);
          background: var(--og-gray-100);
          border-radius: var(--radius-lg);
        }

        .related-links {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .related-link {
          color: var(--og-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .related-link:hover {
          text-decoration: underline;
        }

        .feedback-section {
          text-align: center;
          padding: var(--spacing-2xl);
          background: var(--og-gray-100);
          border-radius: var(--radius-lg);
        }

        .feedback-section h3 {
          margin-bottom: var(--spacing-lg);
        }

        .feedback-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          margin-bottom: var(--spacing-lg);
        }

        .btn-feedback {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-feedback:hover {
          border-color: var(--og-primary);
          background: var(--og-primary-light);
        }

        .feedback-actions {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--og-primary);
          font-weight: 600;
          cursor: pointer;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        .article-sidebar {
          position: sticky;
          top: var(--spacing-lg);
          height: fit-content;
        }

        .sidebar-card {
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
        }

        .sidebar-title {
          font-size: 1rem;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--og-gray-300);
        }

        .quick-ref-item {
          margin-bottom: var(--spacing-md);
        }

        .quick-ref-item.urgent {
          background: var(--og-accent);
          color: var(--og-white);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          font-weight: 700;
        }

        .ref-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--og-gray-500);
          margin-bottom: 0.25rem;
        }

        .quick-ref-item.urgent .ref-label {
          color: var(--og-white);
        }

        .ref-value {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .ref-list {
          font-size: 0.875rem;
        }

        .ref-list li {
          margin-bottom: var(--spacing-sm);
        }

        .ref-list a {
          color: var(--og-primary);
          text-decoration: none;
        }

        .ref-list a:hover {
          text-decoration: underline;
        }

        .template-list {
          list-style: none;
          padding: 0;
        }

        .template-list li {
          margin-bottom: var(--spacing-sm);
        }

        .template-download {
          background: var(--og-primary-light);
          border: 1px solid var(--og-primary);
          color: var(--og-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          width: 100%;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .template-download:hover {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .sidebar-cta {
          background: var(--og-primary-light);
          border-color: var(--og-primary);
        }

        .sidebar-cta p {
          font-size: 0.875rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-gray-700);
        }

        .btn {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
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

        .btn-block {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .content-layout {
            grid-template-columns: 1fr;
          }

          .article-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .article-title {
            font-size: 1.75rem;
          }

          .article-meta-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .action-buttons {
            width: 100%;
            flex-wrap: wrap;
          }

          .btn-icon {
            flex: 1;
            justify-content: center;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .tab-button {
            border-bottom: none;
            border-left: 3px solid transparent;
            text-align: left;
          }

          .tab-button.active {
            border-left-color: var(--og-primary);
            border-bottom-color: transparent;
          }
        }
      `}</style>
    </div>
  )
}
