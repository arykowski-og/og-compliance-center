'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Products</h4>
            <ul className="footer-links">
              <li><Link href="/products/financial">Financial Management</Link></li>
              <li><Link href="/products/budgeting">Budgeting & Planning</Link></li>
              <li><Link href="/products/procurement">Procurement</Link></li>
              <li><Link href="/products/reporting">Reporting & Analytics</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link href="/states">State Guides</Link></li>
              <li><Link href="/articles">Articles & Insights</Link></li>
              <li><Link href="/webinars">Webinars</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/security">Security</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} OpenGov Compliance Center. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="https://twitter.com/opengov" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com/company/opengov" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .site-footer {
          background: var(--og-gray-900);
          color: var(--og-white);
          padding: var(--spacing-3xl) 0 var(--spacing-xl);
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }
        
        .footer-col h4 {
          color: var(--og-white);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: var(--spacing-sm);
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.75) !important;
          transition: color var(--transition-fast);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 400;
        }
        
        .footer-links a:hover {
          color: var(--og-white) !important;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--og-gray-700);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }
        
        .footer-copyright {
          color: rgba(255, 255, 255, 0.65) !important;
          margin: 0;
          font-size: 0.875rem;
        }
        
        .footer-social {
          display: flex;
          gap: var(--spacing-lg);
        }
        
        .footer-social a {
          color: rgba(255, 255, 255, 0.75) !important;
          transition: color var(--transition-fast);
          text-decoration: none;
          font-weight: 500;
        }
        
        .footer-social a:hover {
          color: var(--og-white) !important;
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
