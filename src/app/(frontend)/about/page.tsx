'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About OpenGov Compliance Center</h1>
          <p className="lead">
            Empowering local governments with the tools and knowledge to operate 
            with transparency, efficiency, and full regulatory compliance.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container-narrow">
          <h2>Our Mission</h2>
          <p>
            OpenGov Compliance Center exists to bridge the gap between complex 
            regulatory requirements and practical implementation. We provide local 
            governments with comprehensive, state-specific compliance guidance and 
            modern software tools to simplify operations.
          </p>

          <h2>What We Do</h2>
          <p>
            We maintain the most comprehensive database of state-by-state compliance 
            requirements for local governments across all 50 US states. Our platform 
            combines this knowledge with powerful software tools for financial 
            management, budgeting, procurement, and reporting.
          </p>

          <h2>Why It Matters</h2>
          <p>
            Local governments face an ever-increasing burden of regulatory compliance. 
            From GASB standards to state-specific requirements, staying compliant 
            while serving citizens effectively is challenging. We make it easier.
          </p>

          <div className="cta-box">
            <h3>Ready to Learn More?</h3>
            <p>Discover how we can help your organization.</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container-narrow {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .content-section {
          padding: var(--spacing-3xl) 0;
        }

        .content-section h2 {
          margin-top: var(--spacing-2xl);
          margin-bottom: var(--spacing-md);
        }

        .content-section p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--og-gray-700);
        }

        .cta-box {
          margin-top: var(--spacing-3xl);
          padding: var(--spacing-2xl);
          background: linear-gradient(135deg, var(--og-primary-light) 0%, var(--og-gray-100) 100%);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .cta-box h3 {
          margin-bottom: var(--spacing-md);
        }

        .cta-box p {
          margin-bottom: var(--spacing-lg);
        }
      `}</style>
    </>
  )
}
