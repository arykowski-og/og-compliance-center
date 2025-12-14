'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Update {
  id: string;
  state: string;
  category: string;
  title: string;
  date: string;
  summary: string;
  isNew: boolean;
  url: string;
}

interface SavedItem {
  id: string;
  state: string;
  category: string;
  title: string;
  savedDate: string;
  url: string;
}

interface Subscription {
  id: string;
  type: 'state' | 'topic';
  name: string;
  frequency: string;
  lastAlert: string;
}

interface Deadline {
  id: string;
  state: string;
  title: string;
  date: string;
  daysUntil: number;
  category: string;
}

export default function DashboardClient() {
  const [dismissedUpdates, setDismissedUpdates] = useState<string[]>([]);
  const [savedUpdateIds, setSavedUpdateIds] = useState<string[]>([]);

  const updates: Update[] = [
    {
      id: 'u1',
      state: 'Colorado',
      category: 'Financial Management',
      title: 'New Budget Amendment Requirements',
      date: '2025-12-10',
      summary: 'Colorado House Bill 25-1234 introduces new requirements for mid-year budget amendments exceeding 10% of total appropriations.',
      isNew: true,
      url: '/states/colorado/financial-management/budget-amendments'
    },
    {
      id: 'u2',
      state: 'Texas',
      category: 'Procurement',
      title: 'Updated Competitive Bidding Thresholds',
      date: '2025-12-08',
      summary: 'The competitive bidding threshold for construction projects has increased from $50,000 to $75,000 effective January 1, 2026.',
      isNew: true,
      url: '/states/texas/procurement/competitive-bidding'
    },
    {
      id: 'u3',
      state: 'California',
      category: 'Transparency',
      title: 'Enhanced Public Records Request Timeline',
      date: '2025-12-05',
      summary: 'AB 2025 reduces the maximum response time for public records requests from 14 to 10 business days.',
      isNew: false,
      url: '/states/california/transparency/public-records'
    },
    {
      id: 'u4',
      state: 'Florida',
      category: 'HR & Employment',
      title: 'Minimum Wage Adjustment',
      date: '2025-12-03',
      summary: 'Florida minimum wage will increase to $14.00/hour on September 30, 2026, requiring payroll system updates.',
      isNew: false,
      url: '/states/florida/hr-employment/minimum-wage'
    },
    {
      id: 'u5',
      state: 'Colorado',
      category: 'Revenue & Taxation',
      title: 'Sales Tax Remittance Portal Update',
      date: '2025-11-28',
      summary: 'Colorado Department of Revenue launches new online portal for municipal sales tax remittance with enhanced reporting features.',
      isNew: false,
      url: '/states/colorado/revenue-taxation/sales-tax'
    }
  ];

  const savedItems: SavedItem[] = [
    {
      id: 's1',
      state: 'Colorado',
      category: 'Financial Management',
      title: 'Annual Budget Adoption Process',
      savedDate: '2025-12-12',
      url: '/states/colorado/financial-management/budget-adoption'
    },
    {
      id: 's2',
      state: 'Texas',
      category: 'Procurement',
      title: 'Encumbrance Requirements',
      savedDate: '2025-12-10',
      url: '/states/texas/procurement/encumbrance'
    },
    {
      id: 's3',
      state: 'California',
      category: 'Procurement',
      title: 'Prevailing Wage Requirements',
      savedDate: '2025-12-08',
      url: '/states/california/procurement/prevailing-wage'
    },
    {
      id: 's4',
      state: 'Colorado',
      category: 'Transparency',
      title: 'Open Meetings Act Requirements',
      savedDate: '2025-12-05',
      url: '/states/colorado/transparency/open-meetings'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: 'sub1',
      type: 'state',
      name: 'Colorado',
      frequency: 'Immediate',
      lastAlert: '2025-12-10'
    },
    {
      id: 'sub2',
      type: 'state',
      name: 'Texas',
      frequency: 'Daily digest',
      lastAlert: '2025-12-08'
    },
    {
      id: 'sub3',
      type: 'topic',
      name: 'Financial Management',
      frequency: 'Weekly digest',
      lastAlert: '2025-12-09'
    },
    {
      id: 'sub4',
      type: 'topic',
      name: 'Procurement & Purchasing',
      frequency: 'Immediate',
      lastAlert: '2025-12-08'
    }
  ];

  const deadlines: Deadline[] = [
    {
      id: 'd1',
      state: 'Colorado',
      title: 'Annual Financial Report Due',
      date: '2026-01-15',
      daysUntil: 32,
      category: 'Financial Management'
    },
    {
      id: 'd2',
      state: 'Colorado',
      title: 'Budget Amendment Deadline',
      date: '2026-01-30',
      daysUntil: 47,
      category: 'Financial Management'
    },
    {
      id: 'd3',
      state: 'Texas',
      title: 'Quarterly Encumbrance Report',
      date: '2026-01-10',
      daysUntil: 27,
      category: 'Procurement'
    },
    {
      id: 'd4',
      state: 'California',
      title: 'Public Hearing Notice Deadline',
      date: '2025-12-20',
      daysUntil: 6,
      category: 'Transparency'
    },
    {
      id: 'd5',
      state: 'Texas',
      title: 'Sales Tax Filing',
      date: '2026-01-20',
      daysUntil: 37,
      category: 'Revenue & Taxation'
    }
  ];

  const handleDismiss = (updateId: string) => {
    setDismissedUpdates([...dismissedUpdates, updateId]);
  };

  const handleSaveUpdate = (updateId: string) => {
    if (savedUpdateIds.includes(updateId)) {
      setSavedUpdateIds(savedUpdateIds.filter(id => id !== updateId));
    } else {
      setSavedUpdateIds([...savedUpdateIds, updateId]);
    }
  };

  const handleRemoveSaved = (itemId: string) => {
    alert(`Remove saved item: ${itemId}`);
  };

  const handleUnsubscribe = (subId: string) => {
    alert(`Unsubscribe: ${subId}`);
  };

  const visibleUpdates = updates.filter(u => !dismissedUpdates.includes(u.id));
  const subscribedStates = subscriptions.filter(s => s.type === 'state').length;
  const subscribedTopics = subscriptions.filter(s => s.type === 'topic').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome Back!</h1>
          <p className="subtitle">You're monitoring {subscribedStates} states and {subscribedTopics} topics</p>
        </div>

        <div className="quick-actions">
          <button className="action-btn primary">
            <span className="icon">🔄</span>
            Compare States
          </button>
          <button className="action-btn">
            <span className="icon">✓</span>
            Create Checklist
          </button>
          <button className="action-btn">
            <span className="icon">📥</span>
            Download Template
          </button>
          <button className="action-btn">
            <span className="icon">💬</span>
            Contact Expert
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>New Updates</h2>
              <span className="badge-count">{visibleUpdates.filter(u => u.isNew).length} new</span>
            </div>

            {visibleUpdates.length === 0 ? (
              <div className="empty-state">
                <p>🎉 You're all caught up!</p>
                <p className="empty-subtitle">No new updates at this time.</p>
              </div>
            ) : (
              <div className="updates-list">
                {visibleUpdates.map(update => (
                  <div key={update.id} className="update-card">
                    <div className="update-header">
                      <div className="update-badges">
                        <span className="badge state-badge">{update.state}</span>
                        <span className="badge category-badge">{update.category}</span>
                        {update.isNew && <span className="badge new-badge">NEW</span>}
                      </div>
                      <span className="update-date">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="update-title">
                      <Link href={update.url}>{update.title}</Link>
                    </h3>
                    <p className="update-summary">{update.summary}</p>
                    <div className="update-actions">
                      <Link href={update.url} className="read-more-btn">
                        Read More →
                      </Link>
                      <div className="action-buttons">
                        <button 
                          className={`icon-btn ${savedUpdateIds.includes(update.id) ? 'active' : ''}`}
                          onClick={() => handleSaveUpdate(update.id)}
                          title="Save"
                        >
                          ❤️
                        </button>
                        <button 
                          className="icon-btn"
                          onClick={() => handleDismiss(update.id)}
                          title="Dismiss"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Saved Items</h2>
              <span className="count">{savedItems.length} items</span>
            </div>

            <div className="saved-items-grid">
              {savedItems.map(item => (
                <div key={item.id} className="saved-item-card">
                  <div className="saved-item-header">
                    <div className="saved-item-badges">
                      <span className="badge state-badge">{item.state}</span>
                      <span className="badge category-badge">{item.category}</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveSaved(item.id)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="saved-item-title">
                    <Link href={item.url}>{item.title}</Link>
                  </h3>
                  <p className="saved-date">Saved on {new Date(item.savedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar-column">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Upcoming Deadlines</h2>
            </div>

            <div className="deadlines-list">
              {deadlines.sort((a, b) => a.daysUntil - b.daysUntil).map(deadline => (
                <div key={deadline.id} className="deadline-item">
                  <div className="deadline-countdown">
                    <span className={`days-count ${deadline.daysUntil <= 7 ? 'urgent' : ''}`}>
                      {deadline.daysUntil}
                    </span>
                    <span className="days-label">days</span>
                  </div>
                  <div className="deadline-details">
                    <span className="deadline-state">{deadline.state}</span>
                    <h4 className="deadline-title">{deadline.title}</h4>
                    <p className="deadline-date">{new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="view-all-btn">View Full Calendar</button>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Active Subscriptions</h2>
            </div>

            <div className="subscriptions-list">
              {subscriptions.map(sub => (
                <div key={sub.id} className="subscription-item">
                  <div className="subscription-info">
                    <div className="subscription-header">
                      <span className={`subscription-type ${sub.type}`}>
                        {sub.type === 'state' ? '📍' : '📂'}
                      </span>
                      <h4 className="subscription-name">{sub.name}</h4>
                    </div>
                    <p className="subscription-frequency">{sub.frequency}</p>
                    <p className="subscription-last-alert">
                      Last alert: {new Date(sub.lastAlert).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <button 
                    className="unsubscribe-btn"
                    onClick={() => handleUnsubscribe(sub.id)}
                  >
                    Unsubscribe
                  </button>
                </div>
              ))}
            </div>

            <button className="manage-btn">Manage Alerts</button>
          </section>
        </aside>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .dashboard-header {
          margin-bottom: 2.5rem;
        }

        .welcome-section {
          margin-bottom: 1.5rem;
        }

        .welcome-section h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.5rem 0;
        }

        .subtitle {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        .quick-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          border-color: #0066CC;
          color: #0066CC;
          transform: translateY(-1px);
        }

        .action-btn.primary {
          background: #0066CC;
          color: white;
          border-color: #0066CC;
        }

        .action-btn.primary:hover {
          background: #0052a3;
          border-color: #0052a3;
          color: white;
        }

        .action-btn .icon {
          font-size: 1.1rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        .main-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-section {
          background: white;
          border-radius: 12px;
          padding: 1.75rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .badge-count {
          background: #0066CC;
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .count {
          color: #666;
          font-size: 0.95rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-state p {
          font-size: 1.1rem;
          color: #666;
          margin: 0.5rem 0;
        }

        .empty-subtitle {
          font-size: 0.95rem !important;
          color: #999 !important;
        }

        .updates-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .update-card {
          border: 2px solid #f0f0f0;
          border-radius: 10px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .update-card:hover {
          border-color: #0066CC;
          box-shadow: 0 4px 12px rgba(0,102,204,0.1);
        }

        .update-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .update-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .state-badge {
          background: #e3f2fd;
          color: #1565c0;
        }

        .category-badge {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .new-badge {
          background: #ffebee;
          color: #c62828;
        }

        .update-date {
          color: #999;
          font-size: 0.85rem;
        }

        .update-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
        }

        .update-title a {
          color: #1a1a1a;
          text-decoration: none;
        }

        .update-title a:hover {
          color: #0066CC;
        }

        .update-summary {
          color: #555;
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }

        .update-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .read-more-btn {
          color: #0066CC;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .read-more-btn:hover {
          text-decoration: underline;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.4rem;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .icon-btn:hover {
          opacity: 1;
        }

        .icon-btn.active {
          opacity: 1;
        }

        .saved-items-grid {
          display: grid;
          gap: 1rem;
        }

        .saved-item-card {
          border: 2px solid #f0f0f0;
          border-radius: 10px;
          padding: 1.25rem;
          transition: all 0.2s;
        }

        .saved-item-card:hover {
          border-color: #0066CC;
        }

        .saved-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .saved-item-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .remove-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #999;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .remove-btn:hover {
          color: #c62828;
        }

        .saved-item-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .saved-item-title a {
          color: #1a1a1a;
          text-decoration: none;
        }

        .saved-item-title a:hover {
          color: #0066CC;
        }

        .saved-date {
          color: #999;
          font-size: 0.85rem;
          margin: 0;
        }

        .deadlines-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .deadline-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #0066CC;
        }

        .deadline-countdown {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 50px;
        }

        .days-count {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0066CC;
          line-height: 1;
        }

        .days-count.urgent {
          color: #c62828;
        }

        .days-label {
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
        }

        .deadline-details {
          flex: 1;
        }

        .deadline-state {
          color: #0066CC;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }

        .deadline-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 0.25rem 0;
        }

        .deadline-date {
          color: #666;
          font-size: 0.85rem;
          margin: 0;
        }

        .view-all-btn,
        .manage-btn {
          width: 100%;
          padding: 0.75rem;
          background: white;
          border: 2px solid #0066CC;
          border-radius: 8px;
          color: #0066CC;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-btn:hover,
        .manage-btn:hover {
          background: #0066CC;
          color: white;
        }

        .subscriptions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .subscription-item {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .subscription-info {
          margin-bottom: 0.75rem;
        }

        .subscription-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .subscription-type {
          font-size: 1.2rem;
        }

        .subscription-name {
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .subscription-frequency {
          color: #666;
          font-size: 0.85rem;
          margin: 0 0 0.25rem 0;
        }

        .subscription-last-alert {
          color: #999;
          font-size: 0.8rem;
          margin: 0;
        }

        .unsubscribe-btn {
          width: 100%;
          padding: 0.5rem;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          color: #666;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .unsubscribe-btn:hover {
          border-color: #c62828;
          color: #c62828;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-column {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1.5rem 1rem;
          }

          .dashboard-header {
            margin-bottom: 2rem;
          }

          .welcome-section h1 {
            font-size: 1.5rem;
          }

          .quick-actions {
            gap: 0.75rem;
          }

          .action-btn {
            padding: 0.65rem 1rem;
            font-size: 0.9rem;
          }

          .dashboard-section {
            padding: 1.25rem;
          }

          .section-header h2 {
            font-size: 1.2rem;
          }

          .update-card {
            padding: 1.25rem;
          }

          .update-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  );
}
