'use client'

import { useState } from 'react'

export default function SeedStatusPage() {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'complete' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [articlesCreated, setArticlesCreated] = useState(0)

  const runSeed = async () => {
    setStatus('seeding')
    setMessage('Starting compliance articles seed...')
    
    try {
      const response = await fetch('/api/seed-compliance', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('complete')
        setMessage(data.message)
        setArticlesCreated(data.created || 0)
      } else {
        setStatus('error')
        setMessage(data.error || 'Seed failed')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Network error')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '48px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          background: status === 'idle' ? '#667eea' : 
                      status === 'seeding' ? '#f59e0b' :
                      status === 'complete' ? '#10b981' : '#ef4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
        }}>
          {status === 'idle' && '📊'}
          {status === 'seeding' && '⏳'}
          {status === 'complete' && '✅'}
          {status === 'error' && '❌'}
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '16px',
        }}>
          Compliance Articles Seeder
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          {status === 'idle' && 'Ready to populate the database with compliance articles from all 50 states.'}
          {status === 'seeding' && 'Seeding in progress... Please wait.'}
          {status === 'complete' && `Successfully created ${articlesCreated} compliance articles!`}
          {status === 'error' && 'An error occurred during seeding.'}
        </p>

        {message && (
          <div style={{
            background: status === 'error' ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${status === 'error' ? '#fecaca' : '#bbf7d0'}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: status === 'error' ? '#991b1b' : '#166534',
            textAlign: 'left',
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {message}
            </pre>
          </div>
        )}

        {status === 'idle' && (
          <button
            onClick={runSeed}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🚀 Start Seeding
          </button>
        )}

        {status === 'seeding' && (
          <div style={{
            width: '100%',
            height: '4px',
            background: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              animation: 'progress 2s ease-in-out infinite',
            }} />
          </div>
        )}

        {status === 'complete' && (
          <div style={{ marginTop: '24px' }}>
            <a
              href="/admin"
              style={{
                display: 'inline-block',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                marginRight: '12px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📋 View Admin
            </a>
            <a
              href="/articles"
              style={{
                display: 'inline-block',
                background: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📰 View Articles
            </a>
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={runSeed}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🔄 Retry
          </button>
        )}

        <style jsx>{`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
