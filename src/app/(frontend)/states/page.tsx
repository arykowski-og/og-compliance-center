import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { StateMap } from '@/components/StateMap'

export default async function StatesPage() {
  const payload = await getPayload({ config })
  
  const { docs: states } = await payload.find({
    collection: 'states',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: 'name',
    limit: 100,
  })

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>State Compliance Guides</h1>
          <p className="lead">
            Select your state to view specific compliance requirements, 
            regulations, and best practices for local government operations.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            <StateMap states={states as any} />
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="states-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse All States</h2>
            <p>Click any state to view detailed compliance information</p>
          </div>
          <div className="states-grid">
            {states.map((state) => (
              <Link
                key={state.id}
                href={`/states/${state.slug}`}
                className="state-card"
              >
                <div className="state-card-header">
                  <h3>{state.name}</h3>
                  <span className="state-abbr">{state.abbreviation}</span>
                </div>
                {state.hero?.lastUpdated && (
                  <div className="state-card-meta">
                    Last updated: {new Date(state.hero.lastUpdated).toLocaleDateString()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
