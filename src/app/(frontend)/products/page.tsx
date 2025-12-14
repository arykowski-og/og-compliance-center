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
        .page-hero {
          background: linear-gradient(135deg, var(--og-primary-dark) 0%, var(--og-primary) 100%);
          padding: var(--spacing-3xl) 0;
          text-align: center;
          color: var(--og-white);
        }

        .page-hero h1 {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-white);
        }

        .lead {
          font-size: 1.25rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.95;
          color: var(--og-white);
          font-weight: 300;
        }

        .products-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .product-card {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-2xl);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-fast);
        }

        .product-card:hover {
          border-color: var(--og-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .product-icon {
          margin-bottom: var(--spacing-lg);
        }

        .product-card h2 {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .product-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-lg);
          flex: 1;
        }

        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .feature-badge {
          padding: 0.375rem 0.75rem;
          background: var(--og-gray-100);
          color: var(--og-gray-700);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .learn-more {
          color: var(--og-primary);
          font-weight: 600;
        }

        .why-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-gray-100);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--og-gray-600);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-2xl);
        }

        .feature-item {
          text-align: center;
        }

        .feature-icon-large {
          margin-bottom: var(--spacing-lg);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .feature-item h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .feature-item p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--og-gray-700);
        }

        .cta-section {
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
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
        }

        @media (max-width: 768px) {
          .page-hero h1 {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            max-width: 300px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  )
}
