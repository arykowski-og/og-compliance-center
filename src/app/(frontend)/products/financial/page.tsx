'use client'

import Link from 'next/link'
import { Icon } from '@/components/Icon'

export default function FinancialManagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="product-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Financial Management</div>
            <h1>Complete Financial Transparency</h1>
            <p className="lead">
              GASB-compliant financial management software that gives you complete 
              control, real-time visibility, and audit-ready documentation.
            </p>
            <div className="hero-cta">
              <Link href="/demo" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Financial Management</h2>
            <p>Everything you need for complete fiscal transparency and control</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_Validate-2c-71" size={56} alt="GASB Compliance" />
              </div>
              <h3>GASB Compliance</h3>
              <p>
                Automatically comply with all GASB standards including GASB 34, 
                GASB 54, GASB 87, and GASB 96.
              </p>
              <ul className="feature-list">
                <li>Fund accounting</li>
                <li>Subscription tracking (GASB 96)</li>
                <li>Lease management (GASB 87)</li>
                <li>Financial reporting</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_General Ledger-2c" size={56} alt="General Ledger" />
              </div>
              <h3>General Ledger</h3>
              <p>
                Powerful general ledger with multi-fund accounting and real-time 
                transaction processing.
              </p>
              <ul className="feature-list">
                <li>Multi-fund structure</li>
                <li>Real-time posting</li>
                <li>Automated reconciliation</li>
                <li>Journal entry templates</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_Accounts Payable-2c" size={56} alt="Accounts Payable" />
              </div>
              <h3>Accounts Payable</h3>
              <p>
                Streamline invoice processing, approvals, and payments with 
                automated workflows.
              </p>
              <ul className="feature-list">
                <li>Invoice scanning & OCR</li>
                <li>Approval workflows</li>
                <li>ACH & check printing</li>
                <li>1099 management</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_Accounts Receivable-2c" size={56} alt="Accounts Receivable" />
              </div>
              <h3>Accounts Receivable</h3>
              <p>
                Manage billing, collections, and revenue tracking with automated 
                reminders and reporting.
              </p>
              <ul className="feature-list">
                <li>Online payments</li>
                <li>Automated invoicing</li>
                <li>Payment plans</li>
                <li>Collection tracking</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_Financial Reporting-2c" size={56} alt="Financial Reporting" />
              </div>
              <h3>Financial Reporting</h3>
              <p>
                Generate comprehensive financial reports instantly with real-time 
                data and customizable templates.
              </p>
              <ul className="feature-list">
                <li>CAFR automation</li>
                <li>Budget vs. actual</li>
                <li>Custom reports</li>
                <li>Export to Excel/PDF</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="OG-Icons_Inquiry-2c" size={56} alt="Audit Support" />
              </div>
              <h3>Audit Support</h3>
              <p>
                Complete audit trails and documentation to make audits fast, 
                easy, and stress-free.
              </p>
              <ul className="feature-list">
                <li>Complete audit trails</li>
                <li>Document management</li>
                <li>Audit-ready reports</li>
                <li>PBC list automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GASB Standards */}
      <section className="gasb-section">
        <div className="container">
          <div className="section-header">
            <h2>Built for GASB Compliance</h2>
            <p>Automatically comply with the latest standards</p>
          </div>

          <div className="gasb-grid">
            <div className="gasb-card">
              <h3>GASB 96</h3>
              <h4>Subscription-Based IT Arrangements</h4>
              <p>
                Automatically track and report on all subscription-based 
                information technology arrangements (SBITAs).
              </p>
              <Link href="/articles/understanding-gasb-96" className="gasb-link">
                Learn About GASB 96 →
              </Link>
            </div>

            <div className="gasb-card">
              <h3>GASB 87</h3>
              <h4>Lease Accounting</h4>
              <p>
                Complete lease management and reporting for all operating and 
                capital leases.
              </p>
              <Link href="/articles" className="gasb-link">
                Learn About GASB 87 →
              </Link>
            </div>

            <div className="gasb-card">
              <h3>GASB 54</h3>
              <h4>Fund Balance Reporting</h4>
              <p>
                Proper classification and reporting of fund balances with 
                automated calculations.
              </p>
              <Link href="/articles" className="gasb-link">
                Learn About GASB 54 →
              </Link>
            </div>

            <div className="gasb-card">
              <h3>GASB 34</h3>
              <h4>Government-Wide Statements</h4>
              <p>
                Automated generation of government-wide financial statements 
                and MD&A.
              </p>
              <Link href="/articles" className="gasb-link">
                Learn About GASB 34 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* State Compliance */}
      <section className="states-section">
        <div className="container">
          <div className="section-header">
            <h2>State-Specific Compliance</h2>
            <p>Navigate unique requirements for your state</p>
          </div>

          <div className="states-cta">
            <p>
              Every state has specific financial management requirements. Our 
              platform is configured to meet your state's unique needs.
            </p>
            <Link href="/states" className="btn btn-primary btn-lg">
              View Your State's Requirements
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Financial Operations?</h2>
            <p>
              See how OpenGov Financial Management can save you time, reduce 
              errors, and improve transparency.
            </p>
            <div className="cta-buttons">
              <Link href="/demo" className="btn btn-primary btn-lg">
                Schedule a Demo
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .product-hero {
          background: linear-gradient(135deg, var(--og-primary) 0%, var(--og-primary-dark) 100%);
          color: var(--og-white);
          padding: var(--spacing-3xl) 0;
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }

        .product-hero h1 {
          color: var(--og-white);
          margin-bottom: var(--spacing-md);
        }

        .features-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin-top: var(--spacing-md);
        }

        .feature-list li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .feature-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--og-success);
          font-weight: 700;
        }

        .gasb-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-gray-100);
        }

        .gasb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-xl);
        }

        .gasb-card {
          background: var(--og-white);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          border: 2px solid var(--og-gray-300);
          transition: all var(--transition-base);
        }

        .gasb-card:hover {
          border-color: var(--og-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .gasb-card h3 {
          color: var(--og-primary);
          margin-bottom: var(--spacing-sm);
        }

        .gasb-card h4 {
          color: var(--og-gray-700);
          font-size: 1rem;
          margin-bottom: var(--spacing-md);
        }

        .gasb-link {
          display: inline-block;
          margin-top: var(--spacing-md);
          color: var(--og-primary);
          font-weight: 700;
        }

        .states-section {
          padding: var(--spacing-3xl) 0;
        }

        .states-cta {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .states-cta p {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-xl);
        }

        @media (max-width: 768px) {
          .gasb-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
