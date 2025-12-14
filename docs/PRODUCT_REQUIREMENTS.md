# OpenGov Compliance Center - Product Requirements Document

**Version:** 1.0  
**Date:** December 14, 2025  
**Status:** Ready for Development  
**Product Type:** SaaS Platform - State Compliance Guidance for Local Government

---

## Executive Summary

The OpenGov Compliance Center is a first-of-its-kind platform providing state-by-state regulatory compliance guidance for local government administrators. This PRD synthesizes market research, customer feedback analysis, UX research, and state compliance data to define comprehensive product requirements.

### Product Vision

To become the definitive source of state compliance guidance for local governments, helping finance directors, compliance officers, and administrators confidently navigate complex regulatory requirements through plain-language explanations, practical tools, and proactive alerts.

### Market Opportunity

- **Addressable Market:** 50,000+ local governments (counties, cities, special districts)
- **Market Gap:** No existing competitors providing centralized state compliance guidance
- **Customer Pain:** Compliance information fragmented across 50 states, complex legal language, manual tracking
- **Revenue Potential:** $1.2M-2.5M ARR Year 1; $12M-20M ARR Year 3

---

## Table of Contents

1. [User Personas & Use Cases](#user-personas--use-cases)
2. [Product Architecture](#product-architecture)
3. [Functional Requirements](#functional-requirements)
4. [Content Requirements](#content-requirements)
5. [Technical Requirements](#technical-requirements)
6. [Success Metrics](#success-metrics)
7. [Roadmap & Priorities](#roadmap--priorities)

---

## User Personas & Use Cases

### Primary Personas

#### Persona 1: Sarah - County Finance Director
**Demographics:**
- Age: 45-55
- Experience: 15+ years in government finance
- Technical Proficiency: Intermediate
- Organization: Mid-sized county (50-200 employees)

**Goals:**
- Stay current with budget adoption deadlines and reporting requirements
- Share compliance information with finance staff
- Ensure county meets all state requirements
- Avoid audit findings and penalties

**Pain Points:**
- Complex legal language difficult to interpret
- Information scattered across multiple sources (state websites, legal databases, associations)
- Manual tracking of deadlines using spreadsheets/calendars
- Uncertainty about interpretation of requirements
- Time-consuming research (8-10 hours/month)

**Key Use Cases:**
1. Find budget adoption deadline for current fiscal year
2. Download budget resolution template
3. Set up alerts for budget-related regulation changes
4. Share compliance checklist with finance team
5. Export deadline calendar to Outlook

**Success Criteria:**
- Can find information in <2 minutes
- Understands requirements without legal background
- Saves 5+ hours/month on compliance research
- Feels confident meeting deadlines

---

#### Persona 2: Marcus - City Compliance Officer
**Demographics:**
- Age: 32-40
- Experience: 5-10 years in compliance/audit
- Technical Proficiency: High
- Organization: Large city (500+ employees, multiple departments)

**Goals:**
- Proactively identify compliance gaps across departments
- Monitor regulation changes affecting multiple areas
- Compare requirements across jurisdictions (operating in multiple states)
- Document compliance processes for audit readiness
- Train department heads on compliance requirements

**Pain Points:**
- Managing compliance across multiple domains (finance, procurement, HR, permitting)
- Tracking changes to regulations in real-time
- Comparing requirements when city operates in multiple jurisdictions
- Creating documentation that translates legal requirements to operational procedures
- Coordinating compliance across decentralized departments

**Key Use Cases:**
1. Compare procurement bidding thresholds across 3 states
2. Create comprehensive compliance dashboard for leadership
3. Set up immediate alerts for high-priority regulation changes
4. Generate compliance reports for audit preparation
5. Identify gaps between current practices and requirements

**Success Criteria:**
- Can compare multi-state requirements in <5 minutes
- Receives alerts within 24 hours of regulation changes
- Reduces compliance research time by 40%
- Zero audit findings related to regulatory compliance
- Successfully trains 20+ department heads annually

---

#### Persona 3: Jennifer - Small Town IT Manager
**Demographics:**
- Age: 28-35
- Experience: 8 years in IT, 3 in local government
- Technical Proficiency: Very High
- Organization: Small town (25-50 employees)

**Goals:**
- Understand technical compliance requirements (data security, records retention)
- Ensure IT systems support compliance needs
- Integrate compliance deadlines with town systems
- Provide technical guidance to non-technical colleagues
- Work within limited budget constraints

**Pain Points:**
- Unclear technical requirements in legal language
- Limited IT resources (solo or 2-person department)
- Balancing compliance with other IT priorities
- Explaining technical compliance to non-technical leadership
- Finding affordable solutions that meet requirements
- Coordinating across multiple departments with different needs

**Key Use Cases:**
1. Find data retention requirements for financial records
2. Understand cybersecurity standards for government systems
3. Implement open records request process
4. Configure alert system to notify multiple departments
5. Export compliance data for integration with town calendar

**Success Criteria:**
- Understands technical requirements without legal consultation
- Successfully implements compliant systems within budget
- Reduces legal consultation costs by $5K+/year
- Can explain requirements to non-technical staff
- Integrates compliance into existing systems

---

#### Persona 4: Robert - Rural County Administrator
**Demographics:**
- Age: 50-60
- Experience: 20+ years in public service, 10+ as administrator
- Technical Proficiency: Low-to-Intermediate
- Organization: Small rural county (15-30 employees)

**Goals:**
- Understand basic compliance requirements across all areas
- Make informed decisions with limited staff/expertise
- Ensure county meets minimum requirements
- Find practical guidance without hiring consultants
- Maintain good standing with state oversight agencies

**Pain Points:**
- Complex regulations overwhelming without legal/finance expertise
- No dedicated compliance or finance staff
- Limited budget for consultants or training
- Wears multiple hats (finance, HR, operations, compliance)
- Risk-averse - worries about penalties and liability
- Geographic isolation from peer support

**Key Use Cases:**
1. Find plain-language explanation of budget adoption process
2. Access step-by-step implementation guides
3. Download pre-filled templates for common requirements
4. Connect with peers facing similar challenges
5. Get email reminders 30 days before major deadlines

**Success Criteria:**
- Can understand requirements without legal/finance background
- Implements compliance processes without consultant costs
- Receives timely reminders for all major deadlines
- Saves $10K-20K/year on consultant fees
- Feels confident county is meeting requirements

---

## Product Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenGov Compliance Center                 │
│                         (Next.js App)                        │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Frontend   │  │   Payload    │  │  External    │
    │  Components  │  │     CMS      │  │  Services    │
    └──────────────┘  └──────────────┘  └──────────────┘
            │                 │                 │
            │                 ▼                 │
            │         ┌──────────────┐          │
            │         │  PostgreSQL  │          │
            │         │   Database   │          │
            │         └──────────────┘          │
            │                                   │
            ▼                                   ▼
    ┌──────────────┐                  ┌──────────────┐
    │   Seamstress │                  │  Email/SMS   │
    │  Components  │                  │   Alerts     │
    └──────────────┘                  └──────────────┘
```

### Core Modules

#### 1. Content Management System (Payload CMS)
- State content management
- Topic/category taxonomy
- Article/regulation content
- Template and checklist library
- Media asset management
- Version control and audit trail
- Editorial workflow (draft → review → publish)
- Content scheduling

#### 2. Search & Discovery
- Full-text search across all content
- Faceted filtering (state, topic, content type, date)
- Relevance ranking
- Search suggestions and autocomplete
- Related content recommendations
- Recent searches (per user)
- Popular content tracking

#### 3. State-by-State Navigation
- 50 state profiles
- State-specific topic organization
- State comparison functionality
- State subscription/alerts
- Recent updates per state
- State-specific resources

#### 4. Topic Navigation
- 6-8 primary topic domains
- 15-20 topic categories
- 50+ specific requirements
- Cross-state topic comparison
- Topic subscription/alerts
- Topic-specific resources

#### 5. Comparison Tool
- Multi-state selection (2-5 states)
- Topic/requirement selection
- Side-by-side table view
- Difference highlighting
- Export functionality (Excel, PDF)
- Save comparison for later
- Share comparison via link

#### 6. Alerts & Notifications
- State-based subscriptions
- Topic-based subscriptions
- Combined state + topic subscriptions
- Frequency options (immediate, daily, weekly, monthly)
- Delivery channels (email, in-app, SMS optional)
- Alert history and archive
- Unsubscribe management

#### 7. User Dashboard
- Recent updates feed
- Saved/bookmarked items
- Active subscriptions
- Upcoming deadlines
- Quick actions
- Personalized recommendations
- Team activity (for team accounts)

#### 8. Resource Library
- Document templates (Word, Excel, PDF)
- Interactive checklists
- Implementation guides
- Video tutorials
- Best practice articles
- Webinar recordings
- Case studies

#### 9. Account Management
- User profile and preferences
- Organization settings
- Team member management
- Role-based access control
- Billing and subscription
- Usage analytics
- Support ticket history

---

## Functional Requirements

### FR-1: Homepage & Entry Points

#### FR-1.1: Homepage
**Priority:** P0 (MVP)

**Requirements:**
- Hero section with state selector (dropdown or interactive map)
- Popular topics section (6-8 cards with icons)
- Recent updates feed (3-5 latest items)
- "How It Works" section (5-step process)
- Value proposition messaging
- Call-to-action: "Get Started" / "Sign Up"
- Search bar in header

**Acceptance Criteria:**
- [ ] State selector loads all 50 states alphabetically
- [ ] Popular topics display with icons, titles, and article counts
- [ ] Recent updates show state, title, date, and preview
- [ ] All CTAs navigate to appropriate pages
- [ ] Mobile-responsive design (320px+)
- [ ] Page loads in <2 seconds

---

### FR-2: State Navigation

#### FR-2.1: State Profile Page
**Priority:** P0 (MVP)

**Requirements:**
- State name and visual identifier (outline icon, color)
- Quick reference sidebar (fiscal year, key deadlines, recent updates)
- Topic categories list (accordion or grid)
- Article count per category
- Last updated date per category
- "Subscribe to [State]" button
- "View All Updates" link

**Acceptance Criteria:**
- [ ] State profile displays all topic categories
- [ ] Topic categories expandable/collapsible
- [ ] Quick reference shows most important dates
- [ ] Subscribe button opens alert modal
- [ ] Page is accessible (WCAG 2.1 AA)
- [ ] Breadcrumb navigation shows: Home > States > [State]

#### FR-2.2: State Topic Category Page
**Priority:** P0 (MVP)

**Requirements:**
- Category name and description
- List of articles within category
- Filter options (content type, date)
- Sort options (relevance, date, title)
- "Compare with Other States" button
- Related topics sidebar
- Subscription option for category

**Acceptance Criteria:**
- [ ] All articles in category displayed
- [ ] Filters work in real-time
- [ ] Sort persists across page navigation
- [ ] Comparison button pre-fills state and category
- [ ] Related topics link to appropriate pages

---

### FR-3: Content Detail Pages

#### FR-3.1: Regulation/Article Page
**Priority:** P0 (MVP)

**Requirements:**
- Article title and metadata (state, category, last updated)
- "What You Need to Know" summary box (plain language, 2-3 sentences)
- Key requirements section (bullet points)
- Step-by-step implementation guide
- Official source links (statute citations with URLs)
- Practical examples (sample documents from real jurisdictions)
- Related regulations (cross-links)
- Sidebar with:
  - Quick reference dates
  - Citation information
  - Related topics
  - Templates/resources
  - "Ask Expert" CTA
- Action buttons:
  - Save/bookmark
  - Share (link, email, team)
  - Export (PDF)
  - Alert (subscribe to updates)
- Feedback mechanism ("Was this helpful?")
- "Report an Error" button
- Related content recommendations

**Acceptance Criteria:**
- [ ] Plain language summary understandable at 8th grade reading level
- [ ] All statute citations link to official source
- [ ] Step-by-step guide provides actionable instructions
- [ ] Save button adds to user's saved items
- [ ] Share generates shareable link
- [ ] Export creates PDF with proper formatting
- [ ] Alert button opens subscription modal pre-filled
- [ ] Feedback submitted to admin dashboard
- [ ] Error reports create support tickets
- [ ] Related content algorithmically relevant

---

### FR-4: Search Functionality

#### FR-4.1: Global Search
**Priority:** P0 (MVP)

**Requirements:**
- Search box in header (always visible)
- Autocomplete suggestions (5-10 results)
- Search on Enter key or button click
- Search history (last 5 searches per user)
- Popular searches display (optional)

**Acceptance Criteria:**
- [ ] Search box visible on all pages
- [ ] Autocomplete appears after 3 characters
- [ ] Search executes in <1 second
- [ ] Empty search shows helpful message
- [ ] Search history clearable by user

#### FR-4.2: Search Results Page
**Priority:** P0 (MVP)

**Requirements:**
- Search query display
- Result count
- Filters sidebar:
  - State (multi-select, all 50 states)
  - Topic/Category (multi-select)
  - Content Type (regulation, guide, template, video, checklist)
  - Date Range (last 7/30/90 days, all time)
- Sort options:
  - Relevance (default)
  - Date (newest first)
  - Title (A-Z)
- Result items:
  - Title (link to content)
  - State and category badges
  - Preview snippet (2-3 lines)
  - Last updated date
  - Save/share buttons
- Pagination (25 results per page)
- "No results" state with suggestions
- "Save Search" functionality (optional)
- "Export Results" functionality (optional)

**Acceptance Criteria:**
- [ ] Filters apply in real-time without page reload
- [ ] Multiple filters combine with AND logic
- [ ] Sort maintains applied filters
- [ ] Result snippets highlight search terms
- [ ] Pagination maintains search context
- [ ] Mobile-responsive filter drawer
- [ ] Filter counts show number of results per option

---

### FR-5: Comparison Tool

#### FR-5.1: Comparison Setup
**Priority:** P1 (Post-MVP)

**Requirements:**
- Step 1: Select States
  - Multi-select checkboxes (2-5 states)
  - "Select All" / "Clear All" options
  - Visual indicator of selection count
- Step 2: Select Topic/Requirement
  - Category dropdown
  - Requirement dropdown (filtered by category)
  - Search to find requirement
- Navigation: "Previous" / "Next" / "Cancel" buttons
- Progress indicator (Step 1 of 2, Step 2 of 2)

**Acceptance Criteria:**
- [ ] Minimum 2 states required to proceed
- [ ] Maximum 5 states enforced
- [ ] Topic selection required to proceed
- [ ] Previous button maintains selections
- [ ] Cancel button confirms before clearing

#### FR-5.2: Comparison Results
**Priority:** P1 (Post-MVP)

**Requirements:**
- Comparison title (e.g., "Budget Adoption: Colorado vs. Texas vs. California")
- Action buttons:
  - Change States
  - Change Topic
  - Export to Excel
  - Export to PDF
  - Print
  - Save Comparison
  - Share Link
- Side-by-side table:
  - Requirement column (left)
  - State columns (one per selected state)
  - Difference highlighting:
    - Green: Consistent across states
    - Yellow: Similar with variations
    - Red: Significant differences
- Key takeaways section (auto-generated or manual)
- Related resources section
- Action options:
  - Create checklist from comparison
  - Set alert for changes to any state
  - Share with team

**Acceptance Criteria:**
- [ ] Table responsive on tablet (horizontal scroll)
- [ ] Table accordion on mobile (one state at a time)
- [ ] Export to Excel maintains formatting
- [ ] Export to PDF includes headers/footers
- [ ] Share link generates unique URL
- [ ] Saved comparisons appear in user dashboard
- [ ] Highlighting algorithm correctly identifies differences

---

### FR-6: Alerts & Subscriptions

#### FR-6.1: Create Alert
**Priority:** P0 (MVP)

**Requirements:**
- State selection (multi-select or "All States")
- Topic selection (multi-select or "All Topics")
- Frequency options:
  - Immediate (only for urgent changes)
  - Daily Digest
  - Weekly Digest (default)
  - Monthly Digest
- Email address (pre-filled from profile)
- Confirmation message
- Option to create another alert

**Acceptance Criteria:**
- [ ] At least one state OR one topic required
- [ ] Default frequency is Weekly Digest
- [ ] Confirmation email sent after creation
- [ ] Alert appears in "Manage Alerts" page
- [ ] First alert sent according to frequency schedule

#### FR-6.2: Manage Alerts
**Priority:** P0 (MVP)

**Requirements:**
- List of active subscriptions with:
  - Alert name/description
  - States monitored
  - Topics monitored
  - Frequency
  - Last alert sent date
  - Number of items in last alert
  - Edit button
  - Delete button
- "Create New Alert" button
- Alert history section:
  - Date sent
  - Subject line
  - Link to view alert content
  - Archive button
- Global settings:
  - Email preferences
  - Notification channels
  - "Unsubscribe from all" option

**Acceptance Criteria:**
- [ ] Edit opens alert in edit mode with current settings
- [ ] Delete requires confirmation
- [ ] Alert history shows last 30 days by default
- [ ] Archived alerts removable from history
- [ ] Unsubscribe from all requires confirmation

#### FR-6.3: Alert Delivery
**Priority:** P0 (MVP)

**Requirements:**
- Email format:
  - Subject: "[State/Topic] Compliance Update - [Frequency]"
  - Header with logo and branding
  - Summary: "X new updates since [last alert date]"
  - Content items:
    - State badge
    - Title (link to article)
    - Category
    - Brief summary (2-3 lines)
    - "Read More" link
  - Footer:
    - "Manage Alerts" link
    - "Unsubscribe" link
    - Support contact
- Delivery schedule:
  - Immediate: Within 1 hour of content publish
  - Daily: 7:00 AM user's timezone
  - Weekly: Monday 7:00 AM user's timezone
  - Monthly: 1st of month 7:00 AM user's timezone
- Unsubscribe functionality (one-click)

**Acceptance Criteria:**
- [ ] Email renders correctly in major clients (Gmail, Outlook, Apple Mail)
- [ ] Links trackable for analytics
- [ ] Unsubscribe takes effect immediately
- [ ] Timezone correctly calculated per user
- [ ] No alert sent if no new content since last alert

---

### FR-7: User Dashboard

#### FR-7.1: Dashboard Overview
**Priority:** P0 (MVP)

**Requirements:**
- Welcome message with user name
- Monitoring summary (states and topics subscribed)
- Last login date/time
- Four primary sections:
  1. **New Updates** (card):
     - Count of new items
     - List of 3-5 most recent
     - For each: state, title, date, preview, actions (read, save, dismiss)
     - "View All Updates" link
  2. **Saved Items** (card):
     - Count of saved items
     - List of 3-5 most recent
     - For each: state, title, category, date saved
     - "View All Saved" link
  3. **Active Subscriptions** (card):
     - Count of subscriptions
     - List of 3-5 subscriptions
     - For each: description, frequency, last alert, edit/remove
     - "Manage Alerts" link
  4. **Upcoming Deadlines** (card):
     - Count of deadlines in next 90 days
     - List of 3-5 nearest deadlines
     - For each: date, state, requirement, days remaining
     - "View Calendar" link
- Quick actions toolbar:
  - Compare States
  - Create Checklist
  - Download Template
  - Schedule Support Call
  - Search (focus on search bar)

**Acceptance Criteria:**
- [ ] Dashboard loads in <2 seconds
- [ ] Personalization based on user's states/topics
- [ ] Empty states show helpful onboarding messages
- [ ] All cards responsive on mobile (stack vertically)
- [ ] Quick actions open appropriate tools/pages

---

### FR-8: Saved Items & Collections

#### FR-8.1: Save Functionality
**Priority:** P0 (MVP)

**Requirements:**
- "Save" button on all content pages
- Visual indicator when item already saved (filled heart icon)
- Instant save (no page reload)
- Confirmation message (toast notification)
- Remove from saved (click filled heart again)

**Acceptance Criteria:**
- [ ] Save button works without login (prompts to sign in)
- [ ] Save persists across sessions
- [ ] Saved items sync across devices
- [ ] Visual state updates immediately

#### FR-8.2: Saved Items Page
**Priority:** P0 (MVP)

**Requirements:**
- List of all saved items with:
  - Title (link to content)
  - State and category badges
  - Date saved
  - Remove button
- Filter options:
  - State
  - Category
  - Content Type
  - Date Saved
- Sort options:
  - Date Saved (newest first, default)
  - Title (A-Z)
  - State (A-Z)
- Search within saved items
- Bulk actions:
  - Select multiple items
  - Remove selected
  - Export selected (PDF)
  - Share selected
- Empty state message and CTA

**Acceptance Criteria:**
- [ ] Filters and sort work without page reload
- [ ] Search searches titles and content
- [ ] Bulk actions confirm before executing
- [ ] Export generates organized PDF
- [ ] Empty state encourages exploration

---

### FR-9: Templates & Resources

#### FR-9.1: Template Library
**Priority:** P1 (Post-MVP)

**Requirements:**
- Template categories:
  - Budget Templates
  - Procurement Templates
  - Meeting Notice Templates
  - Resolution Templates
  - Checklist Templates
  - Report Templates
- Template items with:
  - Title and description
  - State(s) applicable
  - File type (Word, Excel, PDF)
  - Last updated date
  - Download button
  - Preview (if applicable)
- Filter by state, category, file type
- Search templates
- "Request Template" form (for missing templates)

**Acceptance Criteria:**
- [ ] All templates downloadable without errors
- [ ] Templates editable in native applications
- [ ] File names descriptive (e.g., "CO_Budget_Resolution_Template_2025.docx")
- [ ] Download tracking for analytics
- [ ] Request form creates admin notification

#### FR-9.2: Interactive Checklists
**Priority:** P1 (Post-MVP)

**Requirements:**
- Checklist categories aligned with topics
- Checklist items with:
  - Title and description
  - State(s) applicable
  - Number of items
  - Estimated completion time
  - Start button
- Checklist interface:
  - Step-by-step progression
  - Checkbox for each item
  - Description and guidance per item
  - Related resources links
  - "Mark as Complete" / "Save Progress"
  - Progress indicator (X of Y complete)
  - Print/Export functionality
- Saved checklists in user account
- Assign to team members (team accounts)

**Acceptance Criteria:**
- [ ] Progress saves automatically
- [ ] Completed checklists archived
- [ ] Checklists resettable
- [ ] Print includes completed status
- [ ] Team assignments send notification

---

### FR-10: Account & Team Management

#### FR-10.1: User Profile
**Priority:** P0 (MVP)

**Requirements:**
- Personal information:
  - Name
  - Email
  - Phone (optional)
  - Job Title/Role
  - Organization Name
  - Organization Type (county, city, special district, etc.)
  - Organization Size
- Operating states selection (multi-select)
- Primary topics of interest (multi-select)
- Timezone
- Password change
- Profile photo (optional)
- Email preferences:
  - Product updates
  - Educational content
  - Event invitations
- Notification preferences:
  - Email
  - In-app
  - SMS (optional)

**Acceptance Criteria:**
- [ ] All changes save successfully
- [ ] Email change requires verification
- [ ] Password change requires current password
- [ ] States and topics impact recommendations
- [ ] Timezone affects alert delivery

#### FR-10.2: Team Management (Enterprise Feature)
**Priority:** P2 (Future)

**Requirements:**
- Team dashboard:
  - Total team members
  - Active members
  - Pending invitations
  - Team activity feed
- Add team members:
  - Email invitation
  - Role assignment (Admin, Editor, Member)
  - Department assignment (optional)
- Member management:
  - Edit role
  - Deactivate member
  - Transfer ownership
- Shared resources:
  - Team saved items
  - Team comparisons
  - Team checklists
- Permissions:
  - Admin: Full access, billing, team management
  - Editor: Create/edit shared resources
  - Member: View shared resources, manage own content

**Acceptance Criteria:**
- [ ] Invitations expire after 7 days
- [ ] Role changes take effect immediately
- [ ] Deactivated members lose access immediately
- [ ] Ownership transfer requires confirmation
- [ ] Audit log tracks team actions

---

### FR-11: Admin & Content Management

#### FR-11.1: Payload CMS Integration
**Priority:** P0 (MVP)

**Requirements:**
- Admin access at `/admin`
- Content collections:
  - **States**: 50 state records with metadata
  - **Articles**: Regulation and guidance content
  - **Topics**: Category taxonomy
  - **Resources**: Templates and checklists
  - **Media**: Images, PDFs, videos
  - **Users**: User accounts
- Editorial workflow:
  - Draft → Review → Published
  - Version history
  - Content scheduling
  - Bulk publish/unpublish
- Rich text editor with:
  - Formatting (bold, italic, lists, links)
  - Headings (H2-H5)
  - Tables
  - Code blocks
  - Embeds (YouTube, etc.)
  - Custom components (callout boxes, etc.)
- Media library:
  - Upload images, PDFs, videos
  - Organize in folders
  - Alt text for accessibility
  - File size limits (images: 5MB, videos: 100MB)

**Acceptance Criteria:**
- [ ] Admin only accessible to authorized users
- [ ] All collections editable via CMS
- [ ] Draft content not visible to public
- [ ] Scheduled content publishes automatically
- [ ] Version history allows rollback
- [ ] Rich text editor renders correctly on frontend

#### FR-11.2: Content Quality & Currency
**Priority:** P0 (MVP)

**Requirements:**
- Content metadata:
  - Last reviewed date
  - Next review date (auto-calculated: +1 year)
  - Reviewer name/credentials
  - Source citations (statute, regulation)
  - Effective date
  - Confidence level (verified, unverified, needs review)
- Review workflow:
  - Content flagged 30 days before review date
  - Review assigns to subject matter expert
  - Expert updates content and confirms accuracy
  - Admin approves and publishes
- User feedback integration:
  - "Report an Error" creates admin task
  - "Was this helpful?" tracked per article
  - Low ratings trigger review
- Automated monitoring (future):
  - Bill tracking services integration
  - State legislature RSS feeds
  - Alert admin on potential changes

**Acceptance Criteria:**
- [ ] Review dates auto-calculate
- [ ] Overdue reviews flagged in admin dashboard
- [ ] User feedback visible in admin interface
- [ ] Low-rated content prioritized for review
- [ ] All content has source citations

---

## Content Requirements

### CR-1: State Coverage

#### CR-1.1: State Profile Content
**Priority:** P0 (MVP)

**Required for Each State:**
- State name and abbreviation
- State outline SVG (already available in `/public/states/`)
- State color (unique per state for visual identification)
- Fiscal year dates
- Key characteristics:
  - Population
  - Number of local governments
  - State oversight agency (name, website)
  - Unique compliance characteristics (e.g., Colorado TABOR, Louisiana criminal penalties)
- Quick reference information:
  - Common deadlines
  - Filing requirements
  - Helpful resources (state association links)

**Data Source:**
- State compliance data JSON (525 records across all states)
- State legislature websites
- State association websites (NACo, NLC state leagues)

**Acceptance Criteria:**
- [ ] All 50 states have complete profiles
- [ ] Fiscal year dates verified for accuracy
- [ ] Oversight agencies link to official websites
- [ ] Quick reference updated annually

---

#### CR-1.2: Initial State Priorities (MVP)
**Priority:** P0 (MVP)

**Phase 1 States (5-10 states):**
1. **Colorado** - High OpenGov presence, unique TABOR requirements
2. **Texas** - Large market, complex requirements
3. **California** - Largest market, strict requirements
4. **Florida** - Large market, growing population
5. **New York** - Complex requirements, large market
6. **Illinois** - Strong OpenGov presence
7. **Washington** - High OpenGov presence
8. **North Carolina** - Comprehensive LGC oversight
9. **Ohio** - Large market
10. **Georgia** - Growing market

**Phase 2 States (Remaining 40):**
- Prioritize by OpenGov customer concentration
- Expand to all 50 states by Month 12

**Acceptance Criteria:**
- [ ] Phase 1 states fully populated with content
- [ ] Phase 2 states scheduled for completion
- [ ] Content reviewed by state-specific SMEs

---

### CR-2: Topic Coverage

#### CR-2.1: Primary Topic Domains
**Priority:** P0 (MVP)

Based on state compliance data, prioritize these domains:

1. **Financial Management** (highest priority)
   - General Ledger with Fund Accounting (GASB 54)
   - Encumbrance Accounting
   - Budget Adoption & Amendments
   - Financial Reporting (CAFR, AFR)
   - Single Audit Support (A-133/Uniform Guidance)
   - Grant Management (Federal, State, Foundation)
   - Tax Levy & Revenue Limits
   - Debt Management
   - Asset Management (GASB Fixed Asset Requirements)

2. **Procurement & Contracting** (high priority)
   - eProcurement Portal Requirements
   - Competitive Bidding Thresholds
   - Procurement Methods (RFP, RFQ, IFB)
   - Vendor Management
   - Local Preference Rules
   - Conflict of Interest
   - Contract Retention & Audit Standards

3. **Revenue & Taxation** (high priority)
   - Property Tax Assessment & CAMA Integration
   - Property Tax Billing & Collection
   - Utility Billing (Water, Sewer, Electric, Gas, Trash)
   - Business Licensing & Taxes
   - Sales & Use Tax
   - Transient Occupancy Tax (Hotel/Lodging)
   - Cannabis Licensing & Tax (where applicable)

4. **Human Resources & Employment** (medium priority)
   - Payroll Processing Requirements
   - Time & Attendance (Clock In/Out)
   - Leave Management (PTO, Sick, FMLA)
   - FLSA Compliance (Overtime, Public Safety)
   - Retirement/Pension Reporting
   - Workers Compensation
   - Employment Law Compliance

5. **Open Government & Transparency** (medium priority)
   - Open Meetings Laws
   - Public Records Requests
   - Budget Transparency & Publication
   - Sunshine Laws (State-Specific)
   - Financial Statement Publication
   - Ethics & Conflicts of Interest

6. **Community Development & Permitting** (lower priority for MVP)
   - Land Use & Zoning
   - Building Permits & Inspections
   - Business Licensing
   - Code Enforcement
   - Fire Permits
   - Health Permits
   - Environmental Permits

**Content per Topic:**
- Regulation summary (plain language, 200-300 words)
- Key requirements (bullet points, 5-10 items)
- Step-by-step implementation guide
- Common pitfalls and FAQs
- Official source citations (statute, regulation)
- Practical examples (sample documents from real jurisdictions)
- Templates (where applicable)
- Related topics (cross-links)

**Acceptance Criteria:**
- [ ] All topics covered for Phase 1 states
- [ ] Content reviewed for accuracy
- [ ] Plain language tested for readability (Grade 8 level)
- [ ] All source citations link to official sources
- [ ] Templates provided where applicable

---

### CR-3: Content Types

#### CR-3.1: Regulation Articles
**Priority:** P0 (MVP)

**Template Structure:**
```
# [State]: [Requirement Title]

**State:** [State Name]  
**Category:** [Topic Category]  
**Last Updated:** [Date]  
**Reviewed By:** [SME Name, Credentials]  
**Effective Date:** [Date Law Takes Effect]

## What You Need to Know
[2-3 sentence plain-language summary in callout box]

## Key Requirements
- [Bullet point requirement 1]
- [Bullet point requirement 2]
- [Bullet point requirement 3]
- [Bullet point requirement 4]
- [Bullet point requirement 5]

## Step-by-Step Implementation
1. [Step 1 with details]
2. [Step 2 with details]
3. [Step 3 with details]
...

## Official Sources
- [Statute Name and Number] ([Link to official source])
- [Regulation Name] ([Link to official source])

## Practical Examples
- [Link to sample document from City/County A]
- [Link to sample document from City/County B]

## Common Questions
**Q: [Question 1]**  
A: [Answer 1]

**Q: [Question 2]**  
A: [Answer 2]

## Related Requirements
- [Link to related requirement 1]
- [Link to related requirement 2]

## Templates & Resources
- [Download template 1]
- [Download checklist 1]

## Enforcement & Penalties
[Description of who enforces and what penalties apply]

## Updates & History
- [Date]: [Description of change]
- [Date]: [Description of change]
```

**Content Quality Standards:**
- Plain language (Grade 8 reading level)
- Accurate citations
- Links to official sources
- Reviewed by SME
- Updated at least annually
- Version controlled

---

#### CR-3.2: Implementation Guides
**Priority:** P1 (Post-MVP)

**Content:**
- Comprehensive how-to guide (2,000-4,000 words)
- Screenshots or diagrams where helpful
- Step-by-step procedures
- Common mistakes to avoid
- Troubleshooting section
- Estimated time to complete
- Prerequisites and dependencies
- Tools/software needed

**Example Topics:**
- "How to Prepare an Annual Budget in [State]"
- "Setting Up Encumbrance Accounting in [State]"
- "Conducting a Compliant Bid Process in [State]"
- "Preparing for Single Audit in [State]"

---

#### CR-3.3: Templates
**Priority:** P1 (Post-MVP)

**Template Types:**
1. **Budget Templates**
   - Budget resolution template
   - Budget worksheet template
   - Budget amendment template
   - Public hearing notice template

2. **Procurement Templates**
   - RFP template
   - Bid tabulation template
   - Contract template
   - Vendor qualification form

3. **Meeting Templates**
   - Meeting agenda template
   - Meeting minutes template
   - Public hearing notice template
   - Resolution template

4. **Reporting Templates**
   - Monthly financial report template
   - Quarterly report template
   - Annual report template
   - Dashboard template

**Template Standards:**
- Available in editable formats (Word, Excel)
- State-specific fields pre-filled
- Instructions embedded in comments
- Version number and date
- Disclaimer stating template nature

---

#### CR-3.4: Interactive Checklists
**Priority:** P1 (Post-MVP)

**Checklist Types:**
1. **Budget Adoption Checklist** (per state)
   - 15-25 items
   - Deadline for each item
   - Responsible party field
   - Notes field
   - Resources per item

2. **Procurement Compliance Checklist** (per state)
   - Pre-bid checklist
   - Bid evaluation checklist
   - Contract execution checklist
   - Post-award compliance checklist

3. **Annual Audit Readiness Checklist** (per state)
   - Financial records checklist
   - Documentation checklist
   - Internal controls checklist
   - Compliance verification checklist

4. **Monthly Close Checklist** (general)
   - GL reconciliation items
   - AP/AR items
   - Payroll items
   - Reporting items

**Checklist Features:**
- Printable (PDF with checkboxes)
- Interactive (online with progress tracking)
- Assignable (to team members)
- Deadline reminders
- Completion certificates

---

### CR-4: Data Accuracy & Currency

#### CR-4.1: Content Review Process
**Priority:** P0 (MVP)

**Requirements:**
- Initial content creation by legal research team
- Review by state-specific SME (licensed attorney with government law expertise, 10+ years)
- Annual re-review of all content
- Update within 30 days of law changes
- User feedback integration ("Report an Error")
- Version control and change tracking

**Review Checklist:**
- [ ] Verified against primary source (statute/regulation)
- [ ] Plain language accurate
- [ ] Citations current and linked
- [ ] Effective dates correct
- [ ] Examples relevant and recent
- [ ] Templates updated
- [ ] Reviewer credentials documented

---

#### CR-4.2: Change Monitoring
**Priority:** P1 (Post-MVP)

**Requirements:**
- Subscribe to state bill tracking services (StateScape, LexisNexis State Tracking, etc.)
- Monitor state legislature websites during sessions
- Track administrative rule changes
- Review state oversight agency updates
- Monitor government association newsletters (GFOA, NIGP, NACo, NLC)
- Quarterly proactive review of high-impact topics

**Update Workflow:**
- Change identified → Admin notified → Content flagged → SME assigned review → Content updated → Subscribers notified

---

## Technical Requirements

### TR-1: Technology Stack

#### TR-1.1: Core Technologies
**Priority:** P0 (MVP)

**Requirements:**
- **Frontend:** Next.js 14+ (App Router)
- **Backend/CMS:** Payload CMS 2.0+
- **Database:** PostgreSQL 14+
- **Hosting:** Vercel (frontend), Vercel Postgres or AWS RDS (database)
- **Language:** TypeScript
- **UI Components:** Seamstress (OpenGov Capital Design System)
- **Styling:** Tailwind CSS
- **Authentication:** Payload Auth or NextAuth.js
- **Email:** SendGrid or AWS SES
- **Search:** PostgreSQL full-text search (MVP), Algolia or Elasticsearch (future)
- **Analytics:** Google Analytics 4, Mixpanel (optional)
- **Monitoring:** Vercel Analytics, Sentry (error tracking)

**Rationale:**
- Next.js: Modern React framework, excellent performance, SEO-friendly
- Payload CMS: Flexible, TypeScript-native, excellent developer experience
- PostgreSQL: Reliable, scalable, supports full-text search
- Vercel: Easy deployment, excellent performance, auto-scaling
- Seamstress: Consistent with OpenGov design system

---

#### TR-1.2: Architecture Patterns
**Priority:** P0 (MVP)

**Requirements:**
- **Project Structure:**
  ```
  /src
    /app
      /(frontend)      # Public-facing site
        /page.tsx
        /states
        /topics
        /search
        /tools
        /account
      /(payload)       # Admin CMS
        /admin
        /api
    /collections       # Payload collections
    /components        # React components
    /lib              # Utilities
    /styles           # Global styles
  /public            # Static assets
  ```

- **API Routes:** Next.js API routes for custom endpoints
- **Server Components:** Use React Server Components for better performance
- **Client Components:** Mark client-only components explicitly
- **Data Fetching:** Server-side when possible, client-side for dynamic data
- **Caching:** Leverage Next.js caching, Redis for session/frequency-limited data (optional)

**Acceptance Criteria:**
- [ ] Project structure follows Next.js 14 App Router conventions
- [ ] Clear separation of concerns (frontend, CMS, API)
- [ ] TypeScript strict mode enabled
- [ ] ESLint and Prettier configured

---

### TR-2: Performance Requirements

#### TR-2.1: Page Load Performance
**Priority:** P0 (MVP)

**Requirements:**
- **Homepage:** <2 seconds initial load, <1 second subsequent
- **State Profile:** <2 seconds
- **Content Detail:** <2 seconds
- **Search Results:** <1 second after query submitted
- **Dashboard:** <2 seconds
- **Time to Interactive (TTI):** <3 seconds
- **Largest Contentful Paint (LCP):** <2.5 seconds
- **First Input Delay (FID):** <100ms
- **Cumulative Layout Shift (CLS):** <0.1

**Optimization Strategies:**
- Server-side rendering (SSR) for SEO-critical pages
- Static generation for content pages where possible
- Image optimization (WebP, responsive images, lazy loading)
- Code splitting and lazy loading
- CDN for static assets
- Database query optimization (indexes, caching)
- Bundle size monitoring (keep under 200KB gzipped for main bundle)

**Acceptance Criteria:**
- [ ] Lighthouse Performance score ≥90
- [ ] Core Web Vitals pass for all pages
- [ ] Load testing with 1000 concurrent users
- [ ] Performance monitoring dashboard

---

#### TR-2.2: Scalability
**Priority:** P1 (Post-MVP)

**Requirements:**
- Support 10,000+ concurrent users
- Database: 1M+ articles, 100K+ users, 1M+ saved items
- API: 1,000 requests/second peak
- Search: Sub-second query time with 50K+ articles
- Auto-scaling infrastructure
- Database replication for read-heavy workloads
- CDN for global distribution

**Acceptance Criteria:**
- [ ] Load testing passes at 10K concurrent users
- [ ] Database queries <100ms at scale
- [ ] API response time <200ms p95
- [ ] Search queries <500ms p95
- [ ] Zero downtime during deploys

---

### TR-3: Security Requirements

#### TR-3.1: Authentication & Authorization
**Priority:** P0 (MVP)

**Requirements:**
- **Authentication:**
  - Email/password authentication
  - Email verification required
  - Password requirements (8+ chars, uppercase, lowercase, number, special)
  - Password reset via email
  - Session management (7-day expiry, optional "Remember Me" for 30 days)
  - Logout functionality

- **Authorization:**
  - Role-based access control (Admin, Editor, User)
  - Admin-only access to `/admin`
  - Team-based permissions (Enterprise feature)
  - API authentication for programmatic access (future)

- **Security Measures:**
  - HTTPS only (HTTP redirects to HTTPS)
  - CSRF protection
  - Rate limiting (login attempts, API calls)
  - Password hashing (bcrypt or Argon2)
  - SQL injection prevention (parameterized queries)
  - XSS protection (Content Security Policy)
  - Session token rotation
  - Secure cookie flags (httpOnly, secure, sameSite)

**Acceptance Criteria:**
- [ ] Authentication flows tested (signup, login, reset, logout)
- [ ] Unauthorized users cannot access protected pages
- [ ] Rate limiting blocks brute force attempts
- [ ] Security audit passes (OWASP Top 10)
- [ ] Penetration testing completed

---

#### TR-3.2: Data Privacy & Compliance
**Priority:** P0 (MVP)

**Requirements:**
- **GDPR Compliance:**
  - Privacy policy and terms of service
  - Cookie consent banner
  - User data export functionality
  - User account deletion ("Right to be Forgotten")
  - Data retention policies
  - Data processing agreements (for EU users)

- **CCPA Compliance:**
  - California privacy policy disclosures
  - "Do Not Sell My Personal Information" option
  - User data access and deletion

- **Data Handling:**
  - Encrypt data in transit (TLS 1.2+)
  - Encrypt sensitive data at rest (database encryption)
  - No storage of credit card data (use Stripe/payment processor)
  - Minimal data collection (only what's necessary)
  - Audit logging for admin actions
  - Regular data backups (daily, retained 30 days)

**Acceptance Criteria:**
- [ ] Privacy policy and ToS reviewed by legal
- [ ] Cookie consent implemented
- [ ] Data export generates complete user data JSON
- [ ] Account deletion permanently removes PII
- [ ] Security audit confirms encryption

---

### TR-4: Accessibility Requirements

#### TR-4.1: WCAG 2.1 AA Compliance
**Priority:** P0 (MVP)

**Requirements:**
- **Perceivable:**
  - All images have meaningful alt text
  - Color contrast ratio ≥4.5:1 (normal text), ≥3:1 (large text)
  - Color not sole method of conveying information
  - Text resizable to 200% without loss of functionality
  - No flashing content (seizure risk)

- **Operable:**
  - All functionality accessible via keyboard
  - Logical tab order
  - Visible focus indicators
  - No keyboard traps
  - Sufficient time for time-based actions (or disable timer)
  - Skip navigation link

- **Understandable:**
  - Page language declared (`<html lang="en">`)
  - Consistent navigation across pages
  - Clear error messages
  - Form labels associated with inputs
  - Instructions provided for complex interactions

- **Robust:**
  - Valid HTML
  - ARIA landmarks and roles
  - Compatible with assistive technologies (NVDA, JAWS, VoiceOver)
  - Semantic HTML (headings, lists, tables)

**Testing:**
- Automated: WAVE, axe DevTools, Lighthouse
- Manual: Keyboard-only navigation, screen reader testing
- User: Testing with users with disabilities (quarterly)

**Acceptance Criteria:**
- [ ] WAVE scan shows zero errors
- [ ] axe DevTools scan shows zero critical issues
- [ ] Lighthouse Accessibility score ≥95
- [ ] Manual keyboard navigation passes all flows
- [ ] Screen reader testing passes (NVDA on Windows, VoiceOver on Mac)

---

### TR-5: SEO Requirements

#### TR-5.1: Technical SEO
**Priority:** P0 (MVP)

**Requirements:**
- **Meta Tags:**
  - Title tags (unique per page, <60 chars)
  - Meta descriptions (unique per page, 150-160 chars)
  - Open Graph tags (for social sharing)
  - Twitter Card tags
  - Canonical URLs

- **Structured Data:**
  - Schema.org markup for articles (Article schema)
  - BreadcrumbList schema
  - Organization schema (homepage)
  - FAQPage schema (for FAQ content)

- **Technical:**
  - XML sitemap (auto-generated, submitted to Google)
  - robots.txt configured
  - Clean URLs (no query parameters for main content)
  - Mobile-friendly (responsive design)
  - Fast page speed (Core Web Vitals)
  - HTTPS only
  - Internal linking strategy

- **Content:**
  - Descriptive headings (H1-H6 hierarchy)
  - Alt text on images
  - Descriptive link text (no "click here")
  - Original, high-quality content
  - Regular content updates

**Acceptance Criteria:**
- [ ] Google Search Console verified
- [ ] Sitemap submitted and indexed
- [ ] Mobile-Friendly Test passes
- [ ] Rich Results Test passes for structured data
- [ ] Lighthouse SEO score ≥95
- [ ] Core Web Vitals pass

---

#### TR-5.2: Content SEO Strategy
**Priority:** P1 (Post-MVP)

**Target Keywords:**
- "[State] budget adoption requirements"
- "[State] procurement compliance"
- "[State] [topic] regulations"
- "Local government compliance [state]"
- "Government compliance center"
- "State compliance guide [topic]"

**Content Strategy:**
- Long-tail keywords targeting specific state + requirement combinations
- Educational blog content (best practices, how-to guides)
- Thought leadership articles
- State-specific guides (e.g., "Complete Guide to Colorado Budget Compliance")
- Topic-specific guides (e.g., "Procurement Compliance: 50-State Comparison")

**Link Building:**
- Partner with government associations (NACo, NLC, GFOA, NIGP)
- Guest posts on government websites/blogs
- Resource links from state oversight agencies
- Citations from academic institutions
- Press releases for product launches

**Acceptance Criteria:**
- [ ] Rank on page 1 for 50+ target keywords within 12 months
- [ ] Domain Authority ≥30 within 12 months
- [ ] 100+ quality backlinks within 12 months
- [ ] 10,000+ organic monthly visitors within 12 months

---

## Success Metrics

### SM-1: User Acquisition Metrics

**Month 3 Targets:**
- Organizations: 100-200
- Registered Users: 300-500
- Monthly Active Users: 200-300

**Month 6 Targets:**
- Organizations: 300-500
- Registered Users: 1,000-1,500
- Monthly Active Users: 700-1,000

**Month 12 Targets:**
- Organizations: 800-1,000
- Registered Users: 2,500-3,000
- Monthly Active Users: 1,800-2,000

**Tracking:**
- Signups per day/week/month
- Signups by source (organic, referral, direct, paid)
- Signups by state
- Activation rate (% of signups completing onboarding)
- Time to first value (time from signup to first saved item or alert)

---

### SM-2: Engagement Metrics

**Targets:**
- Average searches per user per month: 10+
- Pages per session: 5+
- Average session duration: 8+ minutes
- Return visit rate (30-day): 60%+
- Comparison tool usage: 20%+ of users
- Alert subscription rate: 50%+ of users
- Save rate: 30%+ of users save at least one item
- Template download rate: 20%+ of users download template

**Tracking:**
- Daily/weekly/monthly active users
- Feature usage (search, compare, save, alert, download)
- Content performance (views, saves, shares per article)
- User flows (drop-off points, conversion rates)
- Cohort retention (Week 1, Week 4, Month 3, Month 6)

---

### SM-3: Quality Metrics

**Targets:**
- Content accuracy: 95%+ (measured by error reports)
- User satisfaction (SUS): 70+ (MVP), 80+ (Maturity)
- Task completion rate: 80%+ (usability testing)
- Search success rate: 75%+ (users find what they're looking for)
- Support ticket volume: <5% of monthly active users
- Page load time: <2 seconds (p95)
- Uptime: 99.9%+
- Accessibility: WCAG 2.1 AA compliant (zero critical issues)

**Tracking:**
- Error reports per article
- User feedback ratings ("Was this helpful?")
- SUS surveys (quarterly)
- Usability testing results (semi-annual)
- Support ticket categorization
- Performance monitoring (Core Web Vitals)
- Uptime monitoring (pingdom, StatusCake)
- Accessibility audits (quarterly)

---

### SM-4: Business Metrics

**Year 1 Targets (Conservative):**
- Organizations: 300-500
- Average Contract Value: $4,000-5,000/year
- Annual Recurring Revenue (ARR): $1.2M-2.5M
- Customer Acquisition Cost (CAC): <$500
- Lifetime Value (LTV): $10K+
- LTV:CAC Ratio: 10+:1
- Monthly Recurring Revenue (MRR) Growth: 15%+ month-over-month
- Churn Rate: <5% monthly

**Year 3 Targets (Conservative):**
- Organizations: 2,000-3,000
- Average Contract Value: $6,000-7,000/year
- ARR: $12M-20M
- Services Revenue: $500K-1M
- CAC: <$400
- LTV: $15K+
- LTV:CAC Ratio: 15+:1
- MRR Growth: 10%+ month-over-month
- Churn Rate: <3% monthly

**Tracking:**
- New customers per month
- Upgrades/downgrades
- Expansion revenue (team seats, services)
- Churn (customer count and revenue)
- NPS (Net Promoter Score)
- Customer satisfaction (CSAT)
- Support ticket resolution time
- Time to value (days from signup to first saved alert)

---

## Roadmap & Priorities

### Phase 1: MVP Launch (Months 1-6)

**Objectives:**
- Validate product-market fit
- Launch with core features
- Build initial content for 5-10 states
- Recruit beta customers (50-100 organizations)

**Features:**
- ✅ Homepage with state selector
- ✅ State profiles with topic categories
- ✅ Content detail pages with plain-language summaries
- ✅ Search with filters (state, topic, content type, date)
- ✅ Basic 2-state comparison
- ✅ Alert subscriptions (email digest: weekly, daily)
- ✅ User dashboard (updates, saved items, alerts)
- ✅ Saved items functionality
- ✅ Account management (profile, settings)
- ✅ Mobile-responsive design
- ✅ WCAG 2.1 AA accessibility
- ✅ Payload CMS for content management

**Content:**
- 5-10 core states (Colorado, Texas, California, Florida, New York, Illinois, Washington, North Carolina, Ohio, Georgia)
- 3-5 high-value topics per state (Budget, Financial Reporting, Procurement, Open Meetings, HR basics)
- Plain-language summaries with primary source links
- 2-3 templates per topic (budget resolution, procurement templates)

**Success Criteria:**
- 500+ registered organizations
- 80%+ task completion in usability testing
- 70+ SUS score
- 90%+ content accuracy
- 99.9% uptime

**Month-by-Month:**
- **Month 1-3:** Foundation
  - Finalize product requirements
  - Set up development environment
  - Build core MVP features
  - Create initial content for 3-5 states
  - Recruit usability test participants

- **Month 4-6:** Testing & Refinement
  - Complete MVP feature development
  - Conduct usability testing (5-8 participants)
  - Accessibility audit (WCAG 2.1 AA)
  - Expand content to 10 states
  - Security and performance testing
  - Soft launch with beta users (50-100 organizations)

---

### Phase 2: Expansion (Months 7-12)

**Objectives:**
- Expand to all 50 states
- Add advanced features based on beta feedback
- Scale customer base to 800-1,000 organizations
- Launch revenue-generating features

**Features:**
- ✅ AI-powered natural language search
- ✅ Advanced comparison (3-5 states, multiple topics)
- ✅ Email digest with trend analysis
- ✅ Team collaboration (share, assign, permissions)
- ✅ Interactive checklists (trackable progress)
- ✅ Template library (downloadable, filterable)
- ✅ Calendar integration (iCal export)
- ✅ Mobile app (iOS/Android) - optional
- ✅ API access (Enterprise tier) - optional

**Content:**
- All 50 states covered
- 10-15 topic categories per state
- Implementation guides (comprehensive how-to, 2,000-4,000 words)
- Best practice examples (case studies)
- Video tutorials (10-15 minutes each)

**Revenue:**
- 1,000+ customers
- $5M ARR
- 5,000+ monthly active users

**Success Criteria:**
- All 50 states have complete content
- 85%+ task completion rate
- 75+ SUS score
- API successfully used by 5+ customers
- Mobile app (if launched) has 500+ downloads

**Month-by-Month:**
- **Month 7-9:** Feature Enhancement
  - Launch advanced comparison tool
  - Build template library
  - Create interactive checklists
  - Expand content to 30 states
  - Activate association partnerships

- **Month 10-12:** Scale & Optimize
  - Complete all 50 states
  - Launch team collaboration features
  - Optimize performance and search
  - Implement AI-powered features (if feasible)
  - Plan Phase 3 features

---

### Phase 3: Platform Maturity (Months 13-24)

**Objectives:**
- Establish as category leader
- Add enterprise-grade features
- Launch advisory services
- Reach 2,000-3,000 customers
- Achieve $15M-25M ARR

**Enterprise Features:**
- Advanced analytics and reporting
- Custom admin dashboards
- Role-based access control (granular permissions)
- Department-specific paths
- Custom compliance frameworks
- API for third-party integrations
- White-label option (for associations, consultants)
- SSO (Single Sign-On) via SAML/OAuth

**Services:**
- Compliance consulting (hourly or project-based)
- Implementation support (on-site or virtual)
- Training programs (webinars, certifications)
- Expert review services (document review, audit prep)
- Custom research (state-specific, topic-specific)

**Revenue:**
- 3,000-5,000 customers
- $15-25M ARR
- 20,000+ monthly active users
- Multiple revenue streams (subscriptions + services)

**Success Criteria:**
- 100+ enterprise customers (using advanced features)
- 50+ customers using API
- $1M+ services revenue
- 90+ NPS
- Market leader status (press, awards, recognition)

**Year 2 Priorities:**
- Q1: Launch API and SSO for enterprise
- Q2: Build custom dashboards and analytics
- Q3: Launch advisory services practice
- Q4: White-label offering for associations

---

## Appendix

### A. Glossary

**CAFR:** Comprehensive Annual Financial Report  
**CAMA:** Computer-Assisted Mass Appraisal  
**GASB:** Governmental Accounting Standards Board  
**GFOA:** Government Finance Officers Association  
**LGC:** Local Government Commission (North Carolina)  
**NACo:** National Association of Counties  
**NIGP:** National Institute of Governmental Purchasing  
**NLC:** National League of Cities  
**SEFA:** Schedule of Expenditures of Federal Awards  
**TABOR:** Taxpayer's Bill of Rights (Colorado)  
**WCAG:** Web Content Accessibility Guidelines

---

### B. Reference Documents

This PRD synthesizes the following documents:
1. `/docs/AHA_IDEAS_CUSTOMER_FEEDBACK_ANALYSIS.md` - Customer feedback research
2. `/docs/UX_STRATEGY_COMPLETE.md` - UX design strategy and roadmap
3. `/docs/UX_DESIGN_EXECUTIVE_SUMMARY.md` - UX design overview
4. `/docs/INFORMATION_ARCHITECTURE.md` - Information architecture and wireframes
5. `/docs/USABILITY_TESTING_PLAN.md` - Usability testing protocols
6. `/state-compliance-data.json` - 525 state compliance records across all 50 states

---

### C. State Compliance Data Summary

From `state-compliance-data.json`:
- **Total Records:** 525
- **States Covered:** All 50 US states
- **Categories:** Financial Management, HR, Procurement, Revenue
- **Features:** 11 core features tracked:
  1. Encumbrance Accounting
  2. General Ledger with Fund Accounting (GASB 54)
  3. Grant Management (Federal, State, Foundation)
  4. Leave Management (PTO, Sick, FMLA)
  5. Payroll Processing (Full-Service)
  6. Property Tax Assessment (CAMA Integration)
  7. Property Tax Billing & Collection
  8. Single Audit Support (A-133/Uniform Guidance)
  9. Time & Attendance (Clock In/Out)
  10. Utility Billing (Water, Sewer, Electric, Gas, Trash)
  11. eProcurement Portal (Supplier Self-Service)

**Compliance Levels:**
- **Required:** Mandated by state statute or regulation
- **Recommended:** Best practice or strongly encouraged
- **Optional:** Not required but may be beneficial

**OpenGov Readiness:**
- **Full:** OpenGov products fully support the requirement
- **Partial:** OpenGov products partially support the requirement
- **None:** OpenGov products do not currently support the requirement

**Key Insights:**
- **Encumbrance Accounting:** Required in AZ, HI, IL, IN, LA, MA, MI, MN, NE, NV, NJ, NM, NY, NC, OH, OK, OR, PA, SC, TX, UT, WA, WI (23 states)
- **GASB 54 Fund Accounting:** Required in all 50 states
- **Single Audit:** Required federally for $750K+ federal expenditures (all states)
- **Uniform Chart of Accounts:** Required in IL, IN, LA, MI, MN, NJ, NM, NY, NC, OH, TX, WI (12 states with strict mandates)
- **State Oversight:** Varies significantly by state (e.g., LA Legislative Auditor, NY State Comptroller, NC Local Government Commission)

---

### D. Competitive Landscape

**Direct Competitors:** None identified

**Indirect Competitors:**
1. **Legal Research Platforms** (Westlaw, LexisNexis)
   - Strengths: Comprehensive legal databases
   - Weaknesses: Expensive, complex, not government-focused, no plain language

2. **Government Associations** (NACo, NLC, GFOA)
   - Strengths: Trusted, member networks
   - Weaknesses: Fragmented resources, not comprehensive, no centralized platform

3. **State Oversight Agencies** (State Comptrollers, Auditors)
   - Strengths: Authoritative, free
   - Weaknesses: State-specific only, complex language, hard to navigate

4. **Government Consultants**
   - Strengths: Personalized guidance
   - Weaknesses: Expensive ($150-300/hour), not scalable, limited availability

**Competitive Advantages:**
- First-mover in centralized compliance guidance
- Plain-language explanations (non-lawyers can understand)
- Practical tools (templates, checklists, comparisons)
- Proactive alerts (stay ahead of changes)
- OpenGov ecosystem integration
- Government expertise (deep understanding of workflows)
- Affordable pricing (fraction of consultant costs)

---

### E. Customer Personas Summary

| Persona | Role | Org Size | Tech Level | Primary Goal | Key Pain | Time Saved |
|---------|------|----------|------------|--------------|----------|------------|
| Sarah | Finance Director | Medium (50-200) | Intermediate | Meet deadlines | Complex language | 5+ hrs/mo |
| Marcus | Compliance Officer | Large (500+) | High | Proactive gaps | Multi-domain tracking | 10+ hrs/mo |
| Jennifer | IT Manager | Small (25-50) | Very High | Technical clarity | Limited resources | $5K+/yr |
| Robert | County Admin | Small (15-30) | Low | Basic understanding | No expertise | $10-20K/yr |

---

### F. Content Priority Matrix

| State | Priority | Rationale | Phase |
|-------|----------|-----------|-------|
| Colorado | High | High OpenGov presence, unique TABOR | Phase 1 |
| Texas | High | Large market, complex requirements | Phase 1 |
| California | High | Largest market, strict requirements | Phase 1 |
| Florida | High | Large market, growing | Phase 1 |
| New York | High | Complex requirements, large market | Phase 1 |
| Illinois | Medium | Strong OpenGov presence | Phase 1 |
| Washington | Medium | High OpenGov presence | Phase 1 |
| North Carolina | Medium | Comprehensive LGC oversight | Phase 1 |
| Ohio | Medium | Large market | Phase 1 |
| Georgia | Medium | Growing market | Phase 1 |
| [40 other states] | Lower | Expand by Month 12 | Phase 2 |

| Topic | Priority | Rationale | Content Depth |
|-------|----------|-----------|---------------|
| Budget Adoption | Highest | Universal requirement, frequent need | Comprehensive |
| Financial Reporting | Highest | Universal requirement, audit critical | Comprehensive |
| Procurement Thresholds | High | Frequent transactions, compliance risk | Comprehensive |
| Single Audit | High | Federal requirement, complex | Comprehensive |
| Encumbrance Accounting | High | Required in 23 states | Detailed |
| Open Meetings | Medium | Important but less frequent | Standard |
| HR/Payroll | Medium | Important but often outsourced | Standard |
| Permitting | Lower | Specialized, department-specific | Basic |

---

### G. Development Checklist

#### Pre-Development
- [ ] Executive approval of PRD
- [ ] Development team assigned
- [ ] Design system (Seamstress) access confirmed
- [ ] Development environment set up (Next.js, Payload, PostgreSQL)
- [ ] Vercel account and project created
- [ ] Domain registered (e.g., compliance.opengov.com)
- [ ] Third-party services configured (SendGrid, analytics)

#### Phase 1: MVP (Months 1-6)
- [ ] Homepage built and tested
- [ ] State profile pages functional
- [ ] Content detail pages rendering correctly
- [ ] Search with filters working
- [ ] Alert subscription functional
- [ ] User dashboard displaying data
- [ ] Saved items functionality working
- [ ] Account management complete
- [ ] Mobile responsive on all pages
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Performance targets met (<2s page load)
- [ ] Security audit passed
- [ ] Content for 5-10 states created and reviewed
- [ ] Usability testing completed (5-8 participants)
- [ ] Beta customer recruitment started
- [ ] Soft launch with beta users

#### Phase 2: Expansion (Months 7-12)
- [ ] Advanced comparison tool built
- [ ] Template library functional
- [ ] Interactive checklists working
- [ ] Team collaboration features complete
- [ ] Calendar integration (iCal export) working
- [ ] AI-powered search implemented (if feasible)
- [ ] Content for all 50 states complete
- [ ] Implementation guides created
- [ ] Video tutorials recorded
- [ ] Public launch marketing campaign
- [ ] Association partnerships activated
- [ ] Customer base scaled to 800-1,000 orgs

#### Phase 3: Maturity (Months 13-24)
- [ ] API for third-party integrations launched
- [ ] SSO (SAML/OAuth) implemented
- [ ] Custom dashboards and analytics built
- [ ] White-label option developed
- [ ] Advisory services practice launched
- [ ] Enterprise customer success program established
- [ ] 3,000-5,000 customer milestone reached
- [ ] $15M+ ARR milestone reached

---

**Document Version:** 1.0  
**Last Updated:** December 14, 2025  
**Status:** Ready for Development  
**Next Steps:** Executive approval → Development kickoff → Phase 1 implementation
