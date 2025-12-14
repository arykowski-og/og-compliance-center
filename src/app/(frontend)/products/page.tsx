'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>OpenGov Solutions</h1>
          <p className="lead">
            Comprehensive software solutions designed specifically for local 
            government compliance, transparency, and operational efficiency.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {/* Financial Management */}
            <Link href="/products/financial" className="product-card">
              <div className="product-icon">
                <Icon name="OG-Icons_FIN-2c" size={72} alt="Financial Management" />
              </div>
              <h2>Financial Management</h2>
              <p>
                Complete financial transparency with GASB-compliant accounting, 
                reporting, and audit-ready documentation.
              </p>
              <div className="product-features">
                <span className="feature-badge">GASB Compliant</span>
                <span className="feature-badge">Real-time Reporting</span>
                <span className="feature-badge">Audit Ready</span>
              </div>
              <span className="learn-more">Learn More →</span>
            </Link>

            {/* Budgeting & Planning */}
            <Link href="/products/budgeting" className="product-card">
              <div className="product-icon">
                <Icon name="OG-Icons_B&P-2c" size={72} alt="Budgeting & Planning" />
              </div>
              <h2>Budgeting & Planning</h2>
              <p>
                Strategic budget development with scenario modeling, performance 
                tracking, and collaborative planning tools.
              </p>
              <div className="product-features">
                <span className="feature-badge">Scenario Modeling</span>
                <span className="feature-badge">Performance Tracking</span>
                <span className="feature-badge">Collaborative</span>
              </div>
              <span className="learn-more">Learn More →</span>
            </Link>

            {/* Procurement */}
            <Link href="/products/procurement" className="product-card">
              <div className="product-icon">
                <Icon name="OG-Icons_Purchasing-2c" size={72} alt="Procurement" />
              </div>
              <h2>Procurement</h2>
              <p>
                Streamlined procurement processes with vendor management, 
                compliance tracking, and automated workflows.
              </p>
              <div className="product-features">
                <span className="feature-badge">Vendor Management</span>
                <span className="feature-badge">Compliance</span>
                <span className="feature-badge">Automated</span>
              </div>
              <span className="learn-more">Learn More →</span>
            </Link>

            {/* Reporting & Analytics */}
            <Link href="/products/reporting" className="product-card">
              <div className="product-icon">
                <Icon name="OG-Icons_Financial Reporting-2c" size={72} alt="Reporting & Analytics" />
              </div>
              <h2>Reporting & Analytics</h2>
              <p>
                Powerful analytics and customizable reporting tools to make 
                data-driven decisions with confidence.
              </p>
              <div className="product-features">
                <span className="feature-badge">Custom Reports</span>
                <span className="feature-badge">Dashboards</span>
                <span className="feature-badge">Data Insights</span>
              </div>
              <span className="learn-more">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why OpenGov */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose OpenGov?</h2>
            <p>Built specifically for government, trusted by thousands</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-large">
                <Icon name="OG-Icons_Gov-2c" size={80} alt="Government-Specific" />
              </div>
              <h3>Government-Specific</h3>
              <p>
                Purpose-built for local government needs, not adapted from 
                private sector software.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-large">
                <Icon name="OG-Icons_Validate-2c-71" size={80} alt="Compliance First" />
              </div>
              <h3>Compliance First</h3>
              <p>
                Stay compliant with GASB, state regulations, and federal 
                requirements automatically.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-large">
                <Icon name="OG-Icons_Cloud-2c" size={80} alt="Cloud-Based" />
              </div>
              <h3>Cloud-Based</h3>
              <p>
                Access your data securely from anywhere, with automatic 
                updates and backups.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-large">
                <Icon name="OG-Icons_Partner-2c" size={80} alt="Expert Support" />
              </div>
              <h3>Expert Support</h3>
              <p>
                Dedicated support from government finance and compliance 
                experts who understand your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Modernize Your Operations?</h2>
            <p>
              Join over 1,000 governments already using OpenGov to operate 
              more efficiently and transparently.
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

      <style jsx>{`
        .products-section {
          padding: var(--spacing-3xl) 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .product-card {
          background: var(--og-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          border: 2px solid var(--og-gray-300);
          transition: all var(--transition-base);
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          border-color: var(--og-primary);
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .product-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
        }

        .product-card h2 {
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .product-card p {
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-lg);
          flex-grow: 1;
        }

        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-lg);
        }

        .feature-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--og-primary-light);
          color: var(--og-primary);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .learn-more {
          color: var(--og-primary);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          transition: transform var(--transition-fast);
        }

        .product-card:hover .learn-more {
          transform: translateX(4px);
        }

        .why-section {
          background: var(--og-gray-100);
          padding: var(--spacing-3xl) 0;
        }

        .feature-icon-large {
          font-size: 4rem;
          margin-bottom: var(--spacing-md);
        }

        .feature-item {
          text-align: center;
          padding: var(--spacing-lg);
        }

        .feature-item h3 {
          margin-bottom: var(--spacing-md);
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
