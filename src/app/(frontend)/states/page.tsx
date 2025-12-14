'use client'

import Link from 'next/link'
import Image from 'next/image'

const ALL_STATES = [
  { name: 'Alabama', slug: 'alabama', abbr: 'AL' },
  { name: 'Alaska', slug: 'alaska', abbr: 'AK' },
  { name: 'Arizona', slug: 'arizona', abbr: 'AZ' },
  { name: 'Arkansas', slug: 'arkansas', abbr: 'AR' },
  { name: 'California', slug: 'california', abbr: 'CA' },
  { name: 'Colorado', slug: 'colorado', abbr: 'CO' },
  { name: 'Connecticut', slug: 'connecticut', abbr: 'CT' },
  { name: 'Delaware', slug: 'delaware', abbr: 'DE' },
  { name: 'Florida', slug: 'florida', abbr: 'FL' },
  { name: 'Georgia', slug: 'georgia', abbr: 'GA' },
  { name: 'Hawaii', slug: 'hawaii', abbr: 'HI' },
  { name: 'Idaho', slug: 'idaho', abbr: 'ID' },
  { name: 'Illinois', slug: 'illinois', abbr: 'IL' },
  { name: 'Indiana', slug: 'indiana', abbr: 'IN' },
  { name: 'Iowa', slug: 'iowa', abbr: 'IA' },
  { name: 'Kansas', slug: 'kansas', abbr: 'KS' },
  { name: 'Kentucky', slug: 'kentucky', abbr: 'KY' },
  { name: 'Louisiana', slug: 'louisiana', abbr: 'LA' },
  { name: 'Maine', slug: 'maine', abbr: 'ME' },
  { name: 'Maryland', slug: 'maryland', abbr: 'MD' },
  { name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA' },
  { name: 'Michigan', slug: 'michigan', abbr: 'MI' },
  { name: 'Minnesota', slug: 'minnesota', abbr: 'MN' },
  { name: 'Mississippi', slug: 'mississippi', abbr: 'MS' },
  { name: 'Missouri', slug: 'missouri', abbr: 'MO' },
  { name: 'Montana', slug: 'montana', abbr: 'MT' },
  { name: 'Nebraska', slug: 'nebraska', abbr: 'NE' },
  { name: 'Nevada', slug: 'nevada', abbr: 'NV' },
  { name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH' },
  { name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ' },
  { name: 'New Mexico', slug: 'new-mexico', abbr: 'NM' },
  { name: 'New York', slug: 'new-york', abbr: 'NY' },
  { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC' },
  { name: 'North Dakota', slug: 'north-dakota', abbr: 'ND' },
  { name: 'Ohio', slug: 'ohio', abbr: 'OH' },
  { name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK' },
  { name: 'Oregon', slug: 'oregon', abbr: 'OR' },
  { name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI' },
  { name: 'South Carolina', slug: 'south-carolina', abbr: 'SC' },
  { name: 'South Dakota', slug: 'south-dakota', abbr: 'SD' },
  { name: 'Tennessee', slug: 'tennessee', abbr: 'TN' },
  { name: 'Texas', slug: 'texas', abbr: 'TX' },
  { name: 'Utah', slug: 'utah', abbr: 'UT' },
  { name: 'Vermont', slug: 'vermont', abbr: 'VT' },
  { name: 'Virginia', slug: 'virginia', abbr: 'VA' },
  { name: 'Washington', slug: 'washington', abbr: 'WA' },
  { name: 'West Virginia', slug: 'west-virginia', abbr: 'WV' },
  { name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI' },
  { name: 'Wyoming', slug: 'wyoming', abbr: 'WY' }
]

export default function StatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>State Compliance Guides</h1>
          <p className="hero-subtitle">
            Select your state to view specific compliance requirements, 
            regulations, and best practices for local government operations.
          </p>
        </div>
      </section>

      {/* States Grid */}
      <section className="states-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse All States</h2>
            <p>Click any state to view detailed compliance information</p>
          </div>
          <div className="states-grid-enhanced">
            {ALL_STATES.map((state) => {
              // Convert slug to filename format (replace hyphens with spaces for SVG lookup)
              const svgFileName = state.name.toLowerCase()
              
              return (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}`}
                  className="state-card-enhanced"
                >
                  <div className="state-icon-wrapper">
                    <Image
                      src={`/states/solid/${svgFileName}.svg`}
                      alt={state.name}
                      width={80}
                      height={80}
                      className="state-icon"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%)'
                      }}
                    />
                  </div>
                  <div className="state-card-content">
                    <h3 className="state-name">{state.name}</h3>
                    <span className="state-abbr-badge">{state.abbr}</span>
                  </div>
                </Link>
              )
            })}
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

        .hero-subtitle {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.95;
          color: var(--og-white);
          font-weight: 300;
        }

        .states-grid-section {
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

        .states-grid-enhanced {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .state-card-enhanced {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--spacing-xl);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
          text-decoration: none;
          color: inherit;
        }

        .state-card-enhanced:hover {
          border-color: var(--og-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .state-icon-wrapper {
          margin-bottom: var(--spacing-md);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .state-icon {
          display: block;
        }

        .state-card-content {
          text-align: center;
        }

        .state-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--og-dark);
          margin-bottom: var(--spacing-xs);
        }

        .state-abbr-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--og-primary-light);
          color: var(--og-primary);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .page-hero h1 {
            font-size: 2rem;
          }

          .states-grid-enhanced {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-md);
          }

          .state-card-enhanced {
            padding: var(--spacing-md);
          }
        }
      `}</style>
    </>
  )
}
