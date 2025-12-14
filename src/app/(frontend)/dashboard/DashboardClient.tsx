'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
            <span className="icon">
              <Image src="/icons/refresh.svg" alt="" width={20} height={20} />
            </span>
            Compare States
          </button>
          <button className="action-btn">
            <span className="icon">
              <Image src="/icons/check.svg" alt="" width={20} height={20} />
            </span>
            Create Checklist
          </button>
          <button className="action-btn">
            <span className="icon">
              <Image src="/icons/download.svg" alt="" width={20} height={20} />
            </span>
            Download Template
          </button>
          <button className="action-btn">
            <span className="icon">
              <Image src="/icons/message.svg" alt="" width={20} height={20} />
            </span>
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
                <div className="empty-icon">
                  <Image src="/icons/party.svg" alt="" width={48} height={48} />
                </div>
                <p>You're all caught up!</p>
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
                          <Image 
                            src={savedUpdateIds.includes(update.id) ? "/icons/heart-filled.svg" : "/icons/heart.svg"} 
                            alt="Save" 
                            width={18} 
                            height={18} 
                          />
                        </button>
                        <button 
                          className="icon-btn"
                          onClick={() => handleDismiss(update.id)}
                          title="Dismiss"
                        >
                          <Image src="/icons/x.svg" alt="Dismiss" width={18} height={18} />
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
                      <Image src="/icons/x.svg" alt="Remove" width={18} height={18} />
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
                        <Image 
                          src={sub.type === 'state' ? "/icons/map-pin.svg" : "/icons/folder.svg"} 
                          alt={sub.type} 
                          width={20} 
                          height={20} 
                        />
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
          background: var(--og-gray-100);
          min-height: 100vh;
          padding: var(--spacing-xl) 0;
        }

        .dashboard-header {
          background: var(--og-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
          margin-bottom: var(--spacing-xl);
        }

        .welcome-section h1 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-sm);
          color: var(--og-dark);
        }

        .subtitle {
          font-size: 1.125rem;
          color: var(--og-gray-600);
          margin-bottom: var(--spacing-xl);
        }

        .quick-actions {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          border-color: var(--og-primary);
          background: var(--og-primary-light);
        }

        .action-btn.primary {
          background: var(--og-primary);
          border-color: var(--og-primary);
          color: var(--og-white);
        }

        .action-btn.primary:hover {
          background: var(--og-primary-dark);
        }

        .icon {
          display: flex;
          align-items: center;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: var(--spacing-xl);
        }

        .main-column {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .sidebar-column {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .dashboard-section {
          background: var(--og-white);
          padding: var(--spacing-2xl);
          border-radius: var(--radius-lg);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-xl);
        }

        .section-header h2 {
          font-size: 1.75rem;
          color: var(--og-dark);
        }

        .badge-count {
          padding: 0.375rem 0.75rem;
          background: var(--og-accent);
          color: var(--og-white);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 700;
        }

        .count {
          color: var(--og-gray-500);
          font-size: 0.875rem;
        }

        .empty-state {
          text-align: center;
          padding: var(--spacing-3xl);
        }

        .empty-icon {
          margin-bottom: var(--spacing-lg);
        }

        .empty-state p {
          font-size: 1.125rem;
          color: var(--og-dark);
          margin-bottom: var(--spacing-sm);
        }

        .empty-subtitle {
          font-size: 1rem;
          color: var(--og-gray-500);
        }

        .updates-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .update-card {
          padding: var(--spacing-lg);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .update-card:hover {
          border-color: var(--og-primary);
          box-shadow: var(--shadow-sm);
        }

        .update-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .update-badges {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .state-badge {
          background: var(--og-primary);
          color: var(--og-white);
        }

        .category-badge {
          background: var(--og-gray-200);
          color: var(--og-gray-700);
        }

        .new-badge {
          background: var(--og-accent);
          color: var(--og-white);
        }

        .update-date {
          font-size: 0.875rem;
          color: var(--og-gray-500);
        }

        .update-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-sm);
        }

        .update-title a {
          color: var(--og-dark);
          text-decoration: none;
        }

        .update-title a:hover {
          color: var(--og-primary);
        }

        .update-summary {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--og-gray-700);
          margin-bottom: var(--spacing-md);
        }

        .update-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .read-more-btn {
          color: var(--og-primary);
          font-weight: 600;
          text-decoration: none;
        }

        .read-more-btn:hover {
          text-decoration: underline;
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.375rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          opacity: 0.7;
        }

        .icon-btn:hover {
          opacity: 1;
          background: var(--og-gray-100);
        }

        .icon-btn.active {
          opacity: 1;
        }

        .saved-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .saved-item-card {
          padding: var(--spacing-lg);
          background: var(--og-white);
          border: 2px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .saved-item-card:hover {
          border-color: var(--og-primary);
        }

        .saved-item-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: var(--spacing-md);
        }

        .saved-item-badges {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.5;
          transition: opacity var(--transition-fast);
        }

        .remove-btn:hover {
          opacity: 1;
        }

        .saved-item-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
        }

        .saved-item-title a {
          color: var(--og-dark);
          text-decoration: none;
        }

        .saved-item-title a:hover {
          color: var(--og-primary);
        }

        .saved-date {
          font-size: 0.875rem;
          color: var(--og-gray-500);
        }

        .deadlines-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .deadline-item {
          display: flex;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--og-gray-100);
          border-radius: var(--radius-md);
        }

        .deadline-countdown {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 60px;
        }

        .days-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--og-primary);
        }

        .days-count.urgent {
          color: var(--og-accent);
        }

        .days-label {
          font-size: 0.75rem;
          color: var(--og-gray-500);
          text-transform: uppercase;
        }

        .deadline-details {
          flex: 1;
        }

        .deadline-state {
          font-size: 0.75rem;
          color: var(--og-gray-500);
          text-transform: uppercase;
          font-weight: 600;
        }

        .deadline-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--og-dark);
        }

        .deadline-date {
          font-size: 0.875rem;
          color: var(--og-gray-600);
        }

        .view-all-btn,
        .manage-btn {
          width: 100%;
          padding: var(--spacing-md);
          margin-top: var(--spacing-lg);
          background: var(--og-primary);
          color: var(--og-white);
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .view-all-btn:hover,
        .manage-btn:hover {
          background: var(--og-primary-dark);
        }

        .subscriptions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .subscription-item {
          padding: var(--spacing-md);
          background: var(--og-gray-100);
          border-radius: var(--radius-md);
        }

        .subscription-info {
          margin-bottom: var(--spacing-md);
        }

        .subscription-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .subscription-type {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
        }

        .subscription-type.state {
          background: var(--og-primary-light);
        }

        .subscription-type.topic {
          background: var(--og-accent-light);
        }

        .subscription-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--og-dark);
        }

        .subscription-frequency {
          font-size: 0.875rem;
          color: var(--og-gray-600);
          margin-bottom: 0.25rem;
        }

        .subscription-last-alert {
          font-size: 0.75rem;
          color: var(--og-gray-500);
        }

        .unsubscribe-btn {
          width: 100%;
          padding: var(--spacing-sm);
          background: var(--og-white);
          border: 1px solid var(--og-gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--og-gray-700);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .unsubscribe-btn:hover {
          border-color: var(--og-accent);
          color: var(--og-accent);
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .saved-items-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: var(--spacing-lg);
          }

          .welcome-section h1 {
            font-size: 2rem;
          }

          .quick-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .dashboard-section {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </div>
  )
}
