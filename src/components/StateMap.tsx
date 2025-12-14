'use client'

import { useState } from 'react'
import Link from 'next/link'

interface State {
  id: string
  name: string
  abbreviation: string
  slug: string
}

export function StateMap({ states }: { states: State[] }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="state-map-wrapper">
      <div className="map-header">
        <h3>Select Your State</h3>
        <input
          type="text"
          placeholder="Search states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="state-search"
        />
      </div>
      
      {/* Simplified state grid for now - you can add SVG map later */}
      <div className="states-list-grid">
        {filteredStates.map((state) => (
          <Link
            key={state.id}
            href={`/states/${state.slug}`}
            className="state-list-item"
            onMouseEnter={() => setHoveredState(state.abbreviation)}
            onMouseLeave={() => setHoveredState(null)}
          >
            <span className="state-name">{state.name}</span>
            <span className="state-abbr-badge">{state.abbreviation}</span>
          </Link>
        ))}
      </div>
      
      {hoveredState && (
        <div className="state-tooltip">
          Viewing: {hoveredState}
        </div>
      )}
      
      <style jsx>{`
        .state-map-wrapper {
          position: relative;
        }
        
        .map-header {
          margin-bottom: var(--spacing-xl);
          text-align: center;
        }
        
        .map-header h3 {
          margin-bottom: var(--spacing-md);
        }
        
        .state-search {
          width: 100%;
          max-width: 400px;
          padding: var(--spacing-md);
          font-size: 1rem;
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast);
        }
        
        .state-search:focus {
          outline: none;
          border-color: var(--og-primary);
        }
        
        .states-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-sm);
          max-height: 500px;
          overflow-y: auto;
        }
        
        .state-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background: var(--og-white);
          border: 1px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        
        .state-list-item:hover {
          background: var(--og-primary-light);
          border-color: var(--og-primary);
          transform: translateX(4px);
        }
        
        .state-name {
          font-weight: 600;
          color: var(--og-gray-900);
        }
        
        .state-abbr-badge {
          background: var(--og-primary);
          color: var(--og-white);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .state-tooltip {
          position: fixed;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg);
          background: var(--og-dark);
          color: var(--og-white);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .states-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
