import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Navigate Local Government Compliance with Confidence
            </h1>
            <p className="hero-subtitle">
              Your complete guide to state-specific regulatory requirements, 
              product capabilities, and compliance best practices across all 50 states.
            </p>
            <div className="hero-cta">
              <Link href="/states" className="btn btn-primary btn-lg">
                Explore State Guides
              </Link>
              <Link href="/articles" className="btn btn-outline btn-lg">
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Compliance Solutions</h2>
            <p>Everything you need to stay compliant across all jurisdictions</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Financial Management</h3>
              <p>
                GASB-compliant financial tracking, reporting, and audit-ready 
                documentation for complete fiscal transparency.
              </p>
              <Link href="/products/financial" className="feature-link">
                Learn More →
              </Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Budgeting & Planning</h3>
              <p>
                Strategic budget development tools with scenario modeling and 
                performance tracking capabilities.
              </p>
              <Link href="/products/budgeting" className="feature-link">
                Learn More →
              </Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Procurement</h3>
              <p>
                Streamlined procurement processes with vendor management and 
                compliance tracking built-in.
              </p>
              <Link href="/products/procurement" className="feature-link">
                Learn More →
              </Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>State-Specific Guides</h3>
              <p>
                Detailed compliance requirements and best practices for all 
                50 states, regularly updated.
              </p>
              <Link href="/states" className="feature-link">
                Browse States →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">50</div>
              <div className="stat-label">States Covered</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Governments Served</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Compliance Monitoring</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Simplify Your Compliance?</h2>
            <p>
              Join thousands of government organizations using OpenGov to stay 
              compliant and operate more efficiently.
            </p>
            <div className="cta-buttons">
              <Link href="/demo" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
