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
          background: linear-gradient(135deg, var(--og-primary-dark) 0%, var(--og-primary) 100%);
          padding: var(--spacing-3xl) 0;
          text-align: center;
          color: var(--og-white);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid var(--og-white);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-lg);
          color: var(--og-white);
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-white);
        }

        .lead {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-2xl);
          opacity: 0.95;
          color: var(--og-white);
          font-weight: 300;
        }

        .hero-cta {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
        }

        .features-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
        }

        .feature-card {
          padding: var(--spacing-xl);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .feature-card:hover {
          border-color: var(--og-primary);
          box-shadow: var(--shadow-md);
        }

        .feature-icon {
          margin-bottom: var(--spacing-lg);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .feature-card > p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-lg);
        }

        .feature-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .feature-list li {
          padding-left: var(--spacing-lg);
          position: relative;
          color: var(--og-gray-700);
        }

        .feature-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--og-primary);
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
          padding: var(--spacing-xl);
          background: var(--og-white);
          border-radius: var(--radius-lg);
          border-left: 4px solid var(--og-primary);
        }

        .gasb-card h3 {
          font-size: 1.5rem;
          color: var(--og-primary);
          margin-bottom: var(--spacing-sm);
        }

        .gasb-card h4 {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-md);
          color: var(--og-dark);
        }

        .gasb-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-lg);
        }

        .gasb-link {
          color: var(--og-primary);
          font-weight: 600;
          text-decoration: none;
        }

        .gasb-link:hover {
          text-decoration: underline;
        }

        .states-section {
          padding: var(--spacing-3xl) 0;
          background: var(--og-white);
        }

        .states-cta {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .states-cta p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-xl);
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
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-cta {
            flex-direction: column;
            max-width: 300px;
            margin: 0 auto;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .gasb-grid {
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
