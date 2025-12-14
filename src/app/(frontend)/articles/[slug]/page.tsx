'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import './article.css'

// Comprehensive compliance articles data
const COMPLIANCE_ARTICLES: Record<string, any> = {
  'california-single-audit-support-a-133-uniform-guidance': {
    title: 'California: Single Audit Support (A-133/Uniform Guidance)',
    state: 'California',
    stateCode: 'CA',
    category: 'Financial Management',
    complianceLevel: 'required',
    lastUpdated: '2025-12-14',
    summary: 'Single Audit is a federal requirement for local governments in California that spend more than $750,000 in federal grants per year. This audit ensures your organization is using federal funds correctly and following all compliance rules.',
    requirements: [
      'Required for entities expending $750,000+ in federal awards annually',
      'Must comply with federal Single Audit Act requirements',
      'State Controller Office reporting requirements',
      'Schedule of Expenditures of Federal Awards (SEFA) preparation'
    ],
    laws: ['California Government Code Section 8546.7'],
    regulations: ['2 CFR Part 200 (Federal Uniform Guidance)', 'OMB Compliance Supplement'],
    notes: 'CA has additional state-level single audit requirements beyond federal mandates',
    opengovSolution: 'OpenGov Financials supports Single Audit requirements with federal compliance reporting and SEFA generation.'
  },
  'texas-encumbrance-accounting': {
    title: 'Texas: Encumbrance Accounting',
    state: 'Texas',
    stateCode: 'TX',
    category: 'Financial Management',
    complianceLevel: 'required',
    lastUpdated: '2025-12-14',
    summary: 'Encumbrance accounting helps Texas local governments track purchase orders and commitments before money is actually spent. This gives you better budget control by reserving funds when you commit to a purchase.',
    requirements: [
      'Encumbrance tracking required by Texas statute',
      'Purchase order commitment tracking mandatory',
      'Year-end encumbrance carry-forward required',
      'Budget vs. actual reporting must include encumbrances'
    ],
    laws: ['Texas Local Government Code Chapter 140'],
    regulations: ['Texas Comptroller requirements', 'GAAP for governments'],
    notes: 'Texas is one of few states that statutorily requires encumbrance accounting',
    opengovSolution: 'OpenGov Financials supports encumbrance accounting with automatic purchase order tracking.'
  },
  'colorado-encumbrance-accounting': {
    title: 'Colorado: Encumbrance Accounting',
    state: 'Colorado',
    stateCode: 'CO',
    category: 'Financial Management',
    complianceLevel: 'required',
    lastUpdated: '2025-12-14',
    summary: 'Encumbrance accounting helps Colorado local governments track purchase orders before money is spent. Required for maintaining accurate budget tracking.',
    requirements: [
      'Encumbrance tracking required for budget control',
      'Purchase order commitment tracking',
      'Year-end encumbrance carry-forward procedures'
    ],
    laws: ['Colorado Revised Statutes Title 29'],
    regulations: ['Colorado Office of the State Auditor guidance'],
    notes: 'Colorado requires encumbrance accounting for budget compliance',
    opengovSolution: 'OpenGov Financials supports encumbrance accounting for budget control with real-time tracking.'
  }
}

export default function ArticlePage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  
  const article = useMemo(() => {
    return COMPLIANCE_ARTICLES[slug] || null
  }, [slug])

  if (!article) {
    return (
      <div className="not-found-container">
        <div className="container">
          <h1>Article Not Found</h1>
          <p>The compliance article you are looking for does not exist.</p>
          <Link href="/articles" className="btn btn-primary">Browse All Articles</Link>
        </div>
      </div>
    )
  }

  return (
    <article className="article-detail">
      <header className="article-header">
        <div className="container-narrow">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/articles">Articles</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{article.state}</span>
          </div>

          <div className="article-badges">
            <span className={`compliance-badge ${article.complianceLevel}`}>
              {article.complianceLevel.toUpperCase()}
            </span>
            <span className="category-badge">{article.category}</span>
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta">
            <span>Last Updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      <section className="content-section summary-section">
        <div className="container-narrow">
          <h2 className="section-title">What You Need to Know</h2>
          <div className="callout-box">
            <p className="summary-text">{article.summary}</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-narrow">
          <h2 className="section-title">Key Requirements</h2>
          <ul className="requirements-list">
            {article.requirements.map((req: string, index: number) => (
              <li key={index} className="requirement-item">{req}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section highlight-section">
        <div className="container-narrow">
          <h2 className="section-title">Compliance Level</h2>
          <div className="compliance-info">
            <div className="compliance-level-large">
              <span className={`level-badge ${article.complianceLevel}`}>
                {article.complianceLevel.toUpperCase()}
              </span>
              <p>This requirement is <strong>{article.complianceLevel}</strong> for local governments in {article.state}.</p>
            </div>
          </div>
        </div>
      </section>

      {(article.laws.length > 0 || article.regulations.length > 0) && (
        <section className="content-section">
          <div className="container-narrow">
            <h2 className="section-title">Official Sources</h2>
            
            {article.laws.length > 0 && (
              <>
                <h3 className="subsection-title">Applicable Laws</h3>
                <ul className="sources-list">
                  {article.laws.map((law: string, index: number) => (
                    <li key={index}>{law}</li>
                  ))}
                </ul>
              </>
            )}
            
            {article.regulations.length > 0 && (
              <>
                <h3 className="subsection-title">Regulations</h3>
                <ul className="sources-list">
                  {article.regulations.map((reg: string, index: number) => (
                    <li key={index}>{reg}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {article.opengovSolution && (
        <section className="content-section solution-section">
          <div className="container-narrow">
            <h2 className="section-title">OpenGov Solution</h2>
            <div className="solution-box">
              <div className="solution-icon">✓</div>
              <p className="solution-text">{article.opengovSolution}</p>
            </div>
          </div>
        </section>
      )}

      <section className="article-actions">
        <div className="container-narrow">
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">💾</span>
              Save to Library
            </button>
            <button className="action-btn">
              <span className="action-icon">🔗</span>
              Share Article
            </button>
            <button className="action-btn">
              <span className="action-icon">📄</span>
              Export PDF
            </button>
            <button className="action-btn">
              <span className="action-icon">🔔</span>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Help with Compliance?</h2>
            <p>Our team of experts can help you understand and implement these requirements.</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">Contact an Expert</Link>
              <Link href="/articles" className="btn btn-outline-light btn-lg">More Articles</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
