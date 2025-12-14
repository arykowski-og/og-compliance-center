'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-text">OpenGov</span>
            <span className="logo-subtitle">Compliance Center</span>
          </Link>
          
          <div className="nav-menu">
            <Link href="/states" className="nav-link">
              State Guides
            </Link>
            <Link href="/articles" className="nav-link">
              Articles
            </Link>
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
      
      <style jsx>{`
        .site-header {
          background: var(--og-white);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: var(--spacing-md) 0;
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--og-primary);
        }
        
        .logo-subtitle {
          font-size: 0.75rem;
          color: var(--og-gray-700);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .nav-menu {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }
        
        .nav-link {
          color: var(--og-gray-900);
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        
        .nav-link:hover {
          color: var(--og-primary);
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
