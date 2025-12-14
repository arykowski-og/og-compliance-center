export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="lead">
            Have questions? We're here to help your organization succeed.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Whether you need compliance guidance, want to schedule a demo, 
                or have questions about our platform, we're ready to help.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <h3>Email</h3>
                  <p>info@opengovcompliance.com</p>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <h3>Phone</h3>
                  <p>1-800-GOV-HELP</p>
                  <p className="small">Monday-Friday, 8am-6pm EST</p>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <h3>Live Chat</h3>
                  <p>Available on our website</p>
                  <p className="small">Monday-Friday, 8am-8pm EST</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input 
                    type="text" 
                    id="organization" 
                    name="organization" 
                    placeholder="Your organization name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="demo">Request a Demo</option>
                    <option value="compliance">Compliance Question</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={6}
                    placeholder="How can we help?"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-section {
          padding: var(--spacing-3xl) 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-info h2 {
          margin-bottom: var(--spacing-md);
        }

        .contact-info p {
          font-size: 1.125rem;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-xl);
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .contact-method {
          padding: var(--spacing-lg);
          background: var(--og-gray-100);
          border-radius: var(--radius-md);
        }

        .method-icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }

        .contact-method h3 {
          margin-bottom: var(--spacing-xs);
          font-size: 1.25rem;
        }

        .contact-method p {
          margin: 0;
          font-size: 1rem;
        }

        .small {
          font-size: 0.875rem;
          color: var(--og-gray-500);
        }

        .contact-form {
          background: var(--og-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          border: 1px solid var(--og-gray-300);
        }

        .form-group {
          margin-bottom: var(--spacing-lg);
        }

        .form-group label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 600;
          color: var(--og-gray-900);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: var(--spacing-md);
          border: 1px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--og-primary);
        }

        .form-group textarea {
          resize: vertical;
        }

        button[type="submit"] {
          width: 100%;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

