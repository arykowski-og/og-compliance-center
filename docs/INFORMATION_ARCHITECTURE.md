# OpenGov Compliance Center - Information Architecture & Wireframes

**Date:** December 14, 2025  
**Phase:** Phase 2 (Days 4-6)  
**Status:** Detailed IA Diagrams, Wireframes, Flow Maps

---

## Table of Contents

1. [Information Architecture Diagrams](#information-architecture-diagrams)
2. [Sitemap](#sitemap)
3. [Wireframes - MVP Screens](#wireframes---mvp-screens)
4. [User Flow Diagrams](#user-flow-diagrams)
5. [Responsive Considerations](#responsive-considerations)

---

## Information Architecture Diagrams

### Master Navigation Structure (Top-Down)

```
                         OpenGov Compliance Center
                                  |
          ______________|_______________|______________
         |              |               |              |
    Home/Dashboard   By State       By Topic      Search/Tools
         |              |               |              |
    [4 Cards]     [State Select]  [Topic List]  [Search Box]
         |              |               |              |
         +-----State    +-----Topic   +-----Comparison
             Profile      Browser        Tool
                  |           |              |
             [Topic List] [State Compare] [Results]
                  |           |
             [Content]   [Detail]


Tertiary Navigation: Account → Saved Items, Alerts, Settings, Team
```

### State-Centric Flow

```
Homepage (State Selector)
    ↓
State Profile Page
├── State Overview Card
├── Topic Categories
│   ├── Financial Management
│   │   ├── Budget Adoption
│   │   ├── Financial Reporting
│   │   ├── Audits
│   │   ├── Tax Levy
│   │   └── Debt Management
│   ├── Procurement & Purchasing
│   │   ├── Competitive Bidding
│   │   ├── Procurement Methods
│   │   ├── Vendor Management
│   │   └── Local Preference
│   ├── Open Government & Transparency
│   ├── Human Resources & Employment
│   └── [More Topics...]
├── Related Updates
└── Subscribe to State
    ↓
Topic Category Page (e.g., Budget Adoption)
├── Category Overview
├── Content List
│   ├── [Content Item 1]
│   ├── [Content Item 2]
│   └── [Content Item N]
└── Related Topics
    ↓
Content Detail Page
├── Main Content
├── Related Resources
└── Action Items (Save, Share, Export, Alert)
```

### Topic-Centric Flow

```
Homepage (Topic Search/Browse)
    ↓
Topic Browser Page
├── Topic Categories
│   ├── Budget Adoption
│   ├── Financial Reporting
│   ├── Competitive Bidding
│   └── [More Topics...]
└── Recent Articles
    ↓
Topic Overview Page
├── Topic Definition
├── "50-State Survey" Link
├── Key Content Items
│   ├── By Topic
│   ├── By State
│   └── Compare States
└── Subscribe to Topic
    ↓
Content Detail Page (for specific state/topic)
    OR
Comparison Page (multi-state for same topic)
```

### Search-Driven Flow

```
Homepage (Search)
    ↓
Search Query Entered
    ↓
Search Results Page
├── Filters Sidebar
│   ├── State (multi-select)
│   ├── Topic/Category
│   ├── Content Type
│   ├── Date Range
│   └── Sort Options
└── Results List
    ├── Result Item 1
    ├── Result Item 2
    ├── Result Item N
    └── Pagination
    ↓
Content Detail Page
    OR
Comparison (for multi-state results)
```

### Comparison-Driven Flow

```
Homepage or Content Page
    ↓
Initiate Comparison
├── Select 2-5 States
└── Select Topic/Requirement
    ↓
Comparison Results Page
├── Table View (States vs. Requirements)
├── Key Differences Highlighted
├── Export Options
└── Related Content Links
    ↓
Deep Dive into State-Specific Content
    ↓
Implement Changes
└── Checklist, Templates, Guides
```

### Account & Personalization Flow

```
Homepage
    ↓
Sign Up / Log In
    ↓
Onboarding
├── Select Role (Finance Director, Compliance Officer, etc.)
├── Select Operating States
├── Select Topics of Interest
└── Configure Alerts
    ↓
Dashboard / My Account
├── Updates Card (New regulations)
├── Saved Items
├── Active Subscriptions
├── Team Collaboration
└── Quick Actions
    ↓
Settings
├── Alert Preferences
├── Notification Frequency
├── States/Topics to Monitor
├── Team Management
└── Export Preferences
```

---

## Sitemap

### Visual Sitemap (Tree Structure)

```
├── HOME (/)
│   └── Landing Page
│
├── PUBLIC PAGES
│   ├── /about
│   ├── /pricing
│   ├── /features
│   ├── /contact
│   ├── /faq
│   └── /resources
│
├── AUTHENTICATED PAGES
│   ├── /dashboard
│   │   ├── /dashboard/updates
│   │   ├── /dashboard/saved
│   │   └── /dashboard/alerts
│   │
│   ├── /states
│   │   ├── /states/[state-slug]
│   │   │   ├── /states/[state-slug]/overview
│   │   │   ├── /states/[state-slug]/[topic]
│   │   │   ├── /states/[state-slug]/[topic]/[article-slug]
│   │   │   └── /states/[state-slug]/updates
│   │   └── /states/browse
│   │
│   ├── /topics
│   │   ├── /topics/browse
│   │   ├── /topics/[topic-slug]
│   │   │   ├── /topics/[topic-slug]/overview
│   │   │   ├── /topics/[topic-slug]/compare-states
│   │   │   ├── /topics/[topic-slug]/articles
│   │   │   └── /topics/[topic-slug]/[article-slug]
│   │   └── /topics/recent
│   │
│   ├── /search
│   │   ├── /search?q=[query]
│   │   └── /search/advanced
│   │
│   ├── /tools
│   │   ├── /tools/compare
│   │   ├── /tools/compare/results
│   │   ├── /tools/deadline-calendar
│   │   ├── /tools/compliance-checklist
│   │   └── /tools/document-templates
│   │
│   ├── /account
│   │   ├── /account/profile
│   │   ├── /account/settings
│   │   ├── /account/alerts
│   │   │   ├── /account/alerts/new
│   │   │   └── /account/alerts/[id]
│   │   ├── /account/saved
│   │   ├── /account/exports
│   │   ├── /account/team
│   │   │   ├── /account/team/members
│   │   │   ├── /account/team/settings
│   │   │   └── /account/team/invite
│   │   ├── /account/billing
│   │   └── /account/support
│   │
│   ├── /resources
│   │   ├── /resources/templates
│   │   ├── /resources/checklists
│   │   ├── /resources/guides
│   │   ├── /resources/webinars
│   │   ├── /resources/best-practices
│   │   └── /resources/[resource-slug]
│   │
│   └── /support
│       ├── /support/help
│       ├── /support/contact
│       ├── /support/tickets
│       └── /support/chat
│
├── ADMIN PAGES
│   ├── /admin
│   ├── /admin/content
│   ├── /admin/users
│   ├── /admin/analytics
│   └── /admin/settings
│
└── ERROR PAGES
    ├── /404
    ├── /500
    └── /unauthorized
```

### Page Inventory

| Page | URL Pattern | Purpose | Key Content | Users |
|------|-------------|---------|-------------|-------|
| Homepage | / | Discovery, entry point | State selector, popular topics, sign-up | All |
| State Profile | /states/[state] | State overview | Topics, recent updates, subscribe | All |
| Topic Browser | /states/[state]/[topic] | Topic content | Articles, guides, templates | All |
| Content Detail | /states/[state]/[topic]/[article] | Full article | Regulation details, resources | All |
| Topic Overview | /topics/[topic] | Topic across all states | Overview, state comparison link | All |
| State Comparison | /topics/[topic]/compare-states | Compare requirements | Side-by-side table, export | Authenticated |
| Search Results | /search?q=... | Search results | Filtered results, refinement options | All |
| Advanced Search | /search/advanced | Complex search | Boolean operators, advanced filters | Power users |
| Comparison Tool | /tools/compare | Start comparison | State/topic selectors | Authenticated |
| Comparison Results | /tools/compare/results | Comparison output | Multi-state table, highlights | Authenticated |
| Dashboard | /dashboard | User home | Updates, saved items, quick actions | Authenticated |
| Saved Items | /account/saved | Bookmarked content | Organized collections, search | Authenticated |
| Alerts Manager | /account/alerts | Alert management | Create, edit, delete subscriptions | Authenticated |
| Account Settings | /account/settings | User preferences | Email, notification settings | Authenticated |
| Team Management | /account/team | Team collaboration | Members, permissions, invites | Authenticated |
| Templates | /resources/templates | Document templates | Searchable template library | Authenticated |
| Checklists | /resources/checklists | Interactive checklists | Downloadable, trackable checklists | Authenticated |
| Help & FAQ | /support/help | Self-service support | FAQs, tutorials, knowledge base | All |
| Contact Support | /support/contact | Support request | Contact form, ticket tracking | All |
| Admin Dashboard | /admin | Admin overview | Analytics, content management | Admin |
| Content Management | /admin/content | Content CRUD | Article editor, publishing | Admin/Editor |

---

## Wireframes - MVP Screens

### Wireframe 1: Homepage

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] OpenGov Compliance Center    [Search] [Sign In] │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                                                          │
│         Find Your State & Compliance Requirements        │
│                                                          │
│         [   State Selector Dropdown / Map   ]            │
│                                                          │
│                    [ Get Started ]                       │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Popular Topics This Week                              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐         │
│  │ Budget    │  │Procurement│ │ Open Mtg  │         │
│  │ Adoption  │  │  Methods  │ │  Laws     │         │
│  │           │  │           │ │           │         │
│  │ 1,234 ►   │  │ 892 ►     │ │ 567 ►     │         │
│  └───────────┘  └───────────┘  └───────────┘         │
│                                                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐         │
│  │ Tax Levy  │  │ Financial │  │ Vendor    │         │
│  │ Limits    │  │ Reporting │  │ Management│         │
│  │           │  │           │  │           │         │
│  │ 445 ►     │  │ 721 ►     │  │ 334 ►     │         │
│  └───────────┘  └───────────┘  └───────────┘         │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Recent Updates                                         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  🆕 Colorado: New tax levy calculation rules            │
│     Updated 2 hours ago  [ Read More ] [ Save ]       │
│                                                          │
│  🆕 Texas: Open meetings exemption clarified            │
│     Updated 5 hours ago  [ Read More ] [ Save ]       │
│                                                          │
│  🆕 California: Procurement threshold increased         │
│     Updated 1 day ago   [ Read More ] [ Save ]        │
│                                                          │
│  ▼ View All Recent Updates                             │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  How It Works                                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣  Select Your State                                  │
│  2️⃣  Browse or Search Topics                            │
│  3️⃣  Get Plain-Language Explanations                    │
│  4️⃣  Download Templates & Guides                        │
│  5️⃣  Get Alerts When Laws Change                        │
│                                                          │
│                    [ Create Free Account ]              │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ © 2025 OpenGov  | Privacy | Terms | Contact | Careers │
└──────────────────────────────────────────────────────────┘
```

### Wireframe 2: State Profile & Topic Browser

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]        [ Dashboard ] [ Saved ] [ Account ▼ ] │
└─────────────────────────────────────────────────────────┘

[ Home > States > Colorado ]

┌──────────────────────────────────────────────────────────┐
│                                                          │
│                      🏔️  Colorado                        │
│                                                          │
│         State Compliance Requirements & Guides          │
│                                                          │
│                  [ Subscribe to Updates ]               │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────────┐
│  QUICK REFERENCE    │   TOPIC CATEGORIES            │
├─────────────────────┼────────────────────────────────┤
│                     │                                 │
│ Fiscal Year: 7/1    │ 📊 Financial Management      │
│ (Colorado fiscal    │   12 articles                 │
│  year runs 7/1-6/30)│   ⬍ Updated Jan 15            │
│                     │                                 │
│ Key Deadline:       │ 🛒 Procurement & Purchasing  │
│ Budget Adoption     │   8 articles                  │
│ Sept 30             │   ⬍ Updated Jan 10            │
│ (30 days left)      │                                 │
│                     │ 📢 Open Government            │
│ Recent Update:      │   6 articles                  │
│ ⭐ Tax Calculations  │   ⬍ Updated Jan 5             │
│ (2 weeks ago)       │                                 │
│                     │ 👥 HR & Employment            │
│ ⭐ Open Meetings     │   10 articles                 │
│ (3 weeks ago)       │   ⬍ Updated Dec 28            │
│                     │                                 │
│ [ View Calendar ]   │ 🏗️ Land Use & Development    │
│ [ Set Alerts ]      │   5 articles                  │
│                     │   ⬍ Updated Dec 15            │
│                     │                                 │
│                     │ 🌍 Environmental & Health     │
│                     │   9 articles                  │
│                     │   ⬍ Updated Dec 1             │
│                     │                                 │
│                     │ ✓ All 12 Topic Categories     │
│                     │   Browse or Search...         │
│                     │                                 │
└─────────────────────┴────────────────────────────────┘
```

### Wireframe 3: Search Results with Filtering

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]   [Search: "budget adoption"] [Sign In] │
└─────────────────────────────────────────────────────────┘

[ Home > Search Results ]

┌──────────────────────────────────────────────────────────┐
│  Search Results for "budget adoption" (247 results)     │
│  [ Clear Filters ]  [ Save Search ]  [ Export Results ] │
└──────────────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────────┐
│   FILTERS           │   RESULTS                      │
├─────────────────────┼────────────────────────────────┤
│                     │                                 │
│  STATE              │  Sort: [Relevance ▼]          │
│  ☑ All States       │                                 │
│  ☐ Colorado         │  1️⃣ Colorado: Budget          │
│  ☐ Texas            │     Adoption Deadlines         │
│  ☐ California       │     Financial Management       │
│  ☐ New York         │     Updated: 2 days ago        │
│  ☐ [All states...]  │     [Regulation Summary]       │
│                     │     [ Save ] [ Share ] [ ► ]  │
│  CONTENT TYPE       │                                 │
│  ☑ Regulation       │  2️⃣ Texas: Budget Process &   │
│  ☑ Guide            │     Adoption Timeline          │
│  ☑ Template         │     Financial Management       │
│  ☑ Video            │     Updated: 1 week ago        │
│  ☑ Checklist        │     [Regulation Summary]       │
│                     │     [ Save ] [ Share ] [ ► ]  │
│  TOPIC              │                                 │
│  Financial          │  3️⃣ California: Annual        │
│   Management        │     Budget Adoption Reqs       │
│  Procurement        │     Financial Management       │
│  Open Government    │     Updated: 2 weeks ago       │
│  HR & Employment    │     [Regulation Summary]       │
│  [Other]            │     [ Save ] [ Share ] [ ► ]  │
│                     │                                 │
│  DATE RANGE         │  [ Load More Results ]         │
│  Last 7 days        │                                 │
│  Last 30 days       │  Showing 1-3 of 247            │
│  Last Year          │  [ ◄ 1 2 3 4 5 ... ► ]        │
│  All Time           │                                 │
│                     │                                 │
│  [ Apply Filters ]  │                                 │
│                     │                                 │
└─────────────────────┴────────────────────────────────┘
```

### Wireframe 4: Content Detail Page

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]        [ Dashboard ] [ Account ▼ ]            │
└─────────────────────────────────────────────────────────┘

[ Home > States > Colorado > Financial Management > Budget Adoption ]

┌──────────────────────────────────────────────────────────┐
│  Colorado Budget Adoption Deadlines                      │
│                                                          │
│  📍 Colorado  |  💰 Financial Management  | ⏰ Updated: Jan 1 │
│                                                          │
│  [ ❤️ Save ] [ 📤 Share ] [ 📥 Export ] [ 🔔 Alert ]  │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌────────────────────────────────────┬──────────────────┐
│                                    │  QUICK REFERENCE │
│  What You Need to Know             ├──────────────────┤
│  ┌──────────────────────────────┐  │                  │
│  │ Colorado requires all        │  │ 🗓️ Key Dates    │
│  │ jurisdictions to adopt a     │  │                  │
│  │ formal budget by September   │  │ May 1: Notice   │
│  │ 30 each fiscal year. The     │  │ deadline        │
│  │ fiscal year runs from July 1 │  │                  │
│  │ to June 30.                  │  │ Sept 30:        │
│  └──────────────────────────────┘  │ Adoption        │
│                                    │ deadline        │
│  Key Requirements                  │                  │
│  • Public hearing required         │ ⚠️ URGENT       │
│  • At least 10 days' notice        │ 30 days until  │
│  • Budget must include all         │ deadline        │
│    estimates of expenditure        │                  │
│  • Tax mill levy limits apply      │ 📋 References   │
│  • Amendment procedures defined    │                  │
│                                    │ CRS § 29-1-1103 │
│  Step-by-Step Implementation       │ CRS § 29-1-1109 │
│  1. Prepare preliminary budget     │                  │
│  2. Hold pre-hearing public        │ 🔗 Related      │
│     meeting with council           │ Topics          │
│  3. Publish notice 10 days prior   │                  │
│  4. Hold public hearing            │ • Tax Mill Levy │
│  5. Adopt formal budget resolution │ • Fund Structure│
│  6. Submit to state (deadline: ?)  │ • Amendments    │
│                                    │                  │
│  Official Source                   │ 📄 Templates    │
│  Read full statute: [Colorado      │                  │
│  Revised Statutes 29-1-1103]       │ • Budget        │
│                                    │   Resolution    │
│  Practical Examples                │ • Public Hearing│
│  View sample budget from:          │   Notice        │
│  • City of Denver                  │                  │
│  • Jefferson County                │                  │
│  • Boulder County                  │                  │
│                                    │ 💬 Ask Expert   │
│  Related Regulations               │                  │
│  ► Tax Mill Levy Limits (CRS §...) │ Schedule a call  │
│  ► Fund Structure Requirements     │ with a Colorado │
│  ► Budget Amendment Procedures     │ government law  │
│  ► Open Budget Meetings            │ specialist      │
│                                    │                  │
└────────────────────────────────────┴──────────────────┘

Was this helpful? 👍 👎
[ Send Feedback ] [ Report Error ] [ Contact Support ]

┌──────────────────────────────────────────────────────────┐
│  You May Also Like                                       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ▸ Colorado Tax Levy Limits & Procedures                │
│  ▸ Colorado Fund Accounting Requirements                 │
│  ▸ Colorado Public Hearing Procedures                    │
│  ▸ Colorado CAFR Requirements                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Wireframe 5: Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]  [Search] [Compare]  Sarah Smith ▼           │
│                                    [Logout]          │
└─────────────────────────────────────────────────────────┘

[ Home > Dashboard ]

┌──────────────────────────────────────────────────────────┐
│  Welcome Back, Sarah! 👋                                 │
│                                                          │
│  You're monitoring: Colorado, New Mexico, Wyoming       │
│  Last logged in: 2 hours ago                            │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌────────────────────────────┬────────────────────────────┐
│  NEW UPDATES (5)           │  SAVED ITEMS (12)          │
├────────────────────────────┼────────────────────────────┤
│                            │                            │
│ 🆕 Colorado: Tax Levy      │ ★ CO: Budget Adoption     │
│    Calculation Rules       │   (Updated today)         │
│    Updated 2 hours ago     │                            │
│ [ Read ] [ Save ] [ ✕ ]   │ ★ CO: Procurement Manual  │
│                            │   (Updated 3 days ago)    │
│ 🆕 Wyoming: Procurement    │                            │
│    Threshold Increase      │ ★ TX: Tax Levy Limits     │
│    Updated 8 hours ago     │   (Updated 1 week ago)    │
│ [ Read ] [ Save ] [ ✕ ]   │                            │
│                            │ [ View All 12 ]           │
│ 🆕 NM: Open Meeting        │                            │
│    Exemptions Clarified    │                            │
│    Updated 1 day ago       │                            │
│ [ Read ] [ Save ] [ ✕ ]   │                            │
│                            │                            │
│ [ View All 5 Updates ]     │                            │
│                            │                            │
└────────────────────────────┴────────────────────────────┘

┌────────────────────────────┬────────────────────────────┐
│  ACTIVE SUBSCRIPTIONS      │  UPCOMING DEADLINES        │
├────────────────────────────┼────────────────────────────┤
│                            │                            │
│ ✓ Colorado - All Topics    │ 🗓️ Feb 15 (30 days)       │
│   (Email digest, weekly)   │    Colorado: Budget       │
│   [ Edit ] [ Remove ]      │    Adoption Deadline      │
│                            │                            │
│ ✓ TX: Procurement          │ 🗓️ Mar 1 (45 days)        │
│   (Immediate alerts)       │    Wyoming: Procurement   │
│   [ Edit ] [ Remove ]      │    Report Due             │
│                            │                            │
│ ✓ NM: Budget Topics        │ 🗓️ Mar 15 (60 days)       │
│   (Daily digest)           │    New Mexico: Audit      │
│   [ Edit ] [ Remove ]      │    Deadline               │
│                            │                            │
│ [ Create New ]             │ [ View Calendar ]         │
│                            │                            │
└────────────────────────────┴────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Quick Actions                                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [ Compare States ]  [ Create Checklist ]               │
│  [ Download Template ]  [ Schedule Support Call ]       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Wireframe 6: Comparison Tool

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]        [ Dashboard ] [ Account ▼ ]            │
└─────────────────────────────────────────────────────────┘

[ Home > Tools > Comparison ]

┌──────────────────────────────────────────────────────────┐
│  Compare Compliance Requirements Across States          │
│                                                          │
│  Easily see how regulations differ between states       │
│                                                          │
└──────────────────────────────────────────────────────────┘

STEP 1: SELECT STATES
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Choose up to 5 states to compare:                      │
│                                                          │
│  ☑ Colorado      ☐ Texas         ☐ California          │
│  ☐ New Mexico    ☐ Wyoming       ☐ Utah                │
│  ☐ New York      ☐ Florida       ☐ Illinois            │
│  [Show all 50 states]                                  │
│                                                          │
│  Selected: 1/5 states                                   │
│                                                          │
└──────────────────────────────────────────────────────────┘

STEP 2: SELECT TOPIC / REQUIREMENT
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  What would you like to compare?                        │
│                                                          │
│  Category: [Financial Management ▼]                     │
│  Requirement: [Budget Adoption Deadlines ▼]             │
│                                                          │
│  [ Previous Step ]  [ Next: View Results ]              │
│                                                          │
└──────────────────────────────────────────────────────────┘

STEP 3: COMPARISON RESULTS
┌──────────────────────────────────────────────────────────┐
│  Budget Adoption Deadlines: Colorado vs. Other States   │
│                                                          │
│  [ Change States ] [ Change Topic ]                     │
│  [ Export to Excel ] [ Export to PDF ] [ Print ]        │
│                                                          │
├──────────────────┬──────────────┬──────────────┐        │
│ Requirement      │ Colorado     │ New Mexico   │        │
├──────────────────┼──────────────┼──────────────┤        │
│ Adoption         │ Sept 30      │ June 30      │        │
│ Deadline         │ (Key Date)   │ (Key Date)   │        │
│                  │              │              │        │
│ Fiscal Year      │ July 1 -     │ July 1 -     │        │
│ Dates            │ June 30      │ June 30      │        │
│                  │              │              │        │
│ Public Hearing   │ Required     │ Required     │        │
│ Required         │ (Match)      │ (Match)      │        │
│                  │              │              │        │
│ Hearing Notice   │ 10 days      │ 5 days       │        │
│ Period           │ (Longer)     │ (Shorter)    │        │
│                  │              │              │        │
│ Can Amend        │ Yes, with    │ Yes          │        │
│ After Adoption   │ restrictions │ (Easier)     │        │
│                  │ (Harder)     │              │        │
│                  │              │              │        │
│ Submission       │ State?       │ State?       │        │
│ Required         │ (Unclear)    │ (Unclear)    │        │
│                  │              │              │        │
└──────────────────┴──────────────┴──────────────┘        │
│                                                          │
│ 🟢 = Consistent across states                           │
│ 🟡 = Similar with variations                            │
│ 🔴 = Significant difference                             │
│                                                          │
│ [ Save This Comparison ]  [ Share ]                     │
│ [ Create Checklist ]      [ Notes ]                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Wireframe 7: Alerts & Subscriptions

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]        [ Dashboard ] [ Account ▼ ]            │
└─────────────────────────────────────────────────────────┘

[ Home > Account > Alerts ]

┌──────────────────────────────────────────────────────────┐
│  Manage Your Alerts & Subscriptions                     │
│                                                          │
│  You have 3 active subscriptions                        │
│                                                          │
│  [ Create New Alert ]                                   │
│                                                          │
└──────────────────────────────────────────────────────────┘

ACTIVE SUBSCRIPTIONS
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  1. Colorado - All Topics                              │
│     ─────────────────────────────────────────────────   │
│     States: Colorado                                    │
│     Topics: All (12 topics)                             │
│     Frequency: Weekly Email Digest                      │
│     Last Alert: 3 days ago (2 new items)                │
│     [ Edit ] [ View Alerts ] [ Remove ]                │
│                                                          │
│  2. Texas: Procurement & Purchasing                    │
│     ─────────────────────────────────────────────────   │
│     States: Texas                                       │
│     Topics: Procurement & Purchasing                    │
│     Frequency: Immediate Email                          │
│     Last Alert: Yesterday (0 new items)                 │
│     [ Edit ] [ View Alerts ] [ Remove ]                │
│                                                          │
│  3. Budget Topics - All States                         │
│     ─────────────────────────────────────────────────   │
│     States: All 50 States                               │
│     Topics: Budget & Financial Management               │
│     Frequency: Daily Digest                             │
│     Last Alert: Today (1 new item: CO)                  │
│     [ Edit ] [ View Alerts ] [ Remove ]                │
│                                                          │
└──────────────────────────────────────────────────────────┘

CREATE NEW ALERT
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Select States to Monitor:                              │
│  ☑ Colorado  ☐ New Mexico  ☐ Wyoming  ☐ Utah           │
│  [+ Select More States]                                 │
│                                                          │
│  Select Topics of Interest:                             │
│  ☐ All Topics                                           │
│  ☐ Financial Management                                 │
│  ☐ Procurement & Purchasing                             │
│  ☐ Open Government & Transparency                       │
│  [+ Select More Topics]                                 │
│                                                          │
│  Notification Frequency:                                │
│  ○ Immediate Email (for urgent changes)                 │
│  ○ Daily Digest                                         │
│  ● Weekly Digest                                        │
│  ○ Monthly Digest                                       │
│                                                          │
│  Email Address: sarah@county.gov                        │
│  [Edit Email Preferences]                               │
│                                                          │
│  [ Create Subscription ]  [ Cancel ]                    │
│                                                          │
└──────────────────────────────────────────────────────────┘

NOTIFICATION SETTINGS
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Global Settings:                                       │
│                                                          │
│  ☑ Send me email digests                                │
│  ☑ Send urgent alerts immediately                       │
│  ☐ Send push notifications (mobile app)                 │
│                                                          │
│  Unsubscribe from all alerts: [ Unsubscribe ]          │
│                                                          │
└──────────────────────────────────────────────────────────┘

ALERT HISTORY
┌──────────────────────────────────────────────────────────┐
│  Recent Alerts                                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Today - Weekly Budget Digest                           │
│  • Colorado: New tax levy calculation rules             │
│  (View Alert)  (View Content)  (Archive)                │
│                                                          │
│  Yesterday - Texas Procurement Alert                    │
│  • New bidding threshold effective date                 │
│  (View Alert)  (View Content)  (Archive)                │
│                                                          │
│  3 Days Ago - Colorado All Topics                       │
│  • Open meeting exemptions updated                      │
│  • Procurement manual version 2025                      │
│  (View Alert)  (View Content)  (Archive)                │
│                                                          │
│  [ View All Alerts ]                                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## User Flow Diagrams

### Flow 1: First-Time User Onboarding

```
START: Visit Homepage
  ↓
Sign Up Form
├─ Email Address
├─ Password
├─ Name
└─ Organization
  ↓
Email Verification
  ↓
Role Selection
├─ Finance Director
├─ Compliance Officer
├─ City/County Manager
├─ IT Manager
└─ Other
  ↓
Select Operating States
├─ Multi-select (1-10 states)
└─ "I need all 50 states" option
  ↓
Select Topics of Interest
├─ Multi-select
├─ "Select all" option
└─ "I'm not sure - show recommendations" option
  ↓
Alert Preferences
├─ Email frequency (immediate/daily/weekly/monthly)
├─ Notification channels (email, in-app, sms)
└─ Urgent alerts (immediate)
  ↓
Onboarding Tour
├─ 3-minute guided tour video OR
├─ Interactive 5-step walkthrough
└─ Skip option
  ↓
Dashboard
├─ Welcome card
├─ Recommended content for role
└─ Quick start resources
  ↓
COMPLETE
```

### Flow 2: Finding Specific Regulation

```
START: User needs to find a regulation

Option A: Browse by State
  ↓
Select State
  ↓
Browse Topic Categories
  ↓
View Topic Content
  ↓
Read Article / Access Resource
  ↓
END

Option B: Search
  ↓
Enter Search Query
  ↓
View Results
  ↓
Filter/Refine if needed
  ↓
Click Result
  ↓
Read Article / Access Resource
  ↓
END

Option C: Topic Path
  ↓
Browse by Topic
  ↓
Select Topic (e.g., "Budget Adoption")
  ↓
View 50-State Overview
  ↓
Select State or Compare States
  ↓
View Content
  ↓
END
```

### Flow 3: Comparison Workflow

```
START: User wants to compare requirements

Entry Point Options:
├─ From Content (See "Compare across states" CTA)
├─ From Dashboard (Click "Compare" button)
├─ From Navigation (Select "Comparison Tool")
└─ From Search (Check "Compare selected" items)
  ↓
Step 1: Select States
├─ Multi-select (2-5 states)
├─ Pre-populated if coming from state context
└─ "Quick compare" vs "Full compare" option
  ↓
Step 2: Select Topic/Requirement
├─ Pre-populated if coming from content
├─ Category → Specific requirement
└─ Search to find requirement
  ↓
Generate Comparison
├─ Build table
├─ Highlight key differences
└─ Show related content
  ↓
View Results
├─ Side-by-side table
├─ Highlighted differences
├─ Related resources
└─ Key takeaways
  ↓
Action Options:
├─ Export to Excel
├─ Export to PDF
├─ Print
├─ Share via link
├─ Save for later
├─ Create checklist
├─ Set alert for changes
└─ Create new comparison
  ↓
END
```

### Flow 4: Alert Setup & Management

```
START: User wants alerts

Trigger Options:
├─ "Subscribe to updates" on content
├─ "Create Alert" from sidebar
├─ "Manage Alerts" from account
└─ "Turn on alerts" from onboarding
  ↓
Create Alert Modal/Page
├─ State selector (pre-filled if from state context)
├─ Topic selector (pre-filled if from content)
├─ Frequency selector
│  ├─ Immediate (urgent changes only)
│  ├─ Daily digest
│  ├─ Weekly digest (default)
│  └─ Monthly digest
└─ Email verification
  ↓
Confirm & Save
├─ Show confirmation
├─ Option to create another
└─ Link to manage alerts page
  ↓
Alert Delivery
├─ User receives alerts per frequency
├─ Each alert links to content
└─ Unsubscribe option in email
  ↓
Manage Later (On-Demand)
├─ View all subscriptions
├─ Edit frequency
├─ Add/remove states or topics
├─ Change email
├─ View alert history
└─ Delete subscription
  ↓
END
```

---

## Responsive Considerations

### Mobile Breakpoints

**Mobile (320px - 767px):**
- Single-column layout
- Stacked cards
- Hamburger navigation
- Touch-friendly tap targets (44x44px min)
- Simplified tables (scrollable or collapsed)

**Tablet (768px - 1023px):**
- Two-column layout for content + sidebar
- Optimized cards for wider display
- Drawer navigation or standard nav
- Hybrid table display

**Desktop (1024px+):**
- Full three-column layout (sidebar, content, right panel)
- Multi-state comparison tables
- Advanced filters
- Standard navigation

### Mobile Navigation

```
Mobile (320-767px)
├─ Top Bar
│  ├─ Logo (clickable, goes home)
│  ├─ Search icon
│  └─ Hamburger menu (≡)
│
├─ Hamburger Menu Contents
│  ├─ Dashboard
│  ├─ Find State
│  ├─ Search
│  ├─ My Account
│  │  ├─ Profile
│  │  ├─ Saved Items
│  │  ├─ Alerts
│  │  ├─ Settings
│  │  └─ Logout
│  ├─ Resources
│  └─ Support
│
├─ Bottom Tab Bar (Optional)
│  ├─ Home
│  ├─ Search
│  ├─ Compare
│  ├─ Saved
│  └─ Account
│
└─ Collapsible Sections
   (Use expand/collapse for filters, categories)
```

### Comparison Table Responsiveness

**Desktop (1024px+):**
```
┌───────────────────────────────────────────────────────────┐
│ Requirement        │ Colorado │ Texas    │ California     │
├───────────────────────────────────────────────────────────┤
│ Adoption Deadline  │ Sept 30  │ June 30  │ July 15        │
│ Public Hearing     │ Required │ Required │ Required       │
│ Notice Period      │ 10 days  │ 5 days   │ 10 days        │
└───────────────────────────────────────────────────────────┘
```

**Tablet (768-1023px):**
```
Two columns + scrollable:
┌──────────────────┬──────────────────┐
│ Requirement      │ Colorado │ Texas │
├──────────────────┼──────────┬────────┤
│ Adoption Deadline│ Sept 30  │ June30 │
│ Public Hearing   │ Required │ Req'd  │
│ Notice Period    │ 10 days  │ 5 days │
└──────────────────┴──────────┴────────┘
[→ Swipe for more]
```

**Mobile (320-767px):**
```
Collapsed rows with expand:

Colorado
├─ Adoption Deadline: Sept 30
├─ Public Hearing: Required
└─ Notice Period: 10 days

Texas [Swipe →]
├─ Adoption Deadline: June 30
├─ Public Hearing: Required
└─ Notice Period: 5 days

OR

Accordion:
┌──────────────────────────────┐
│ ▼ Adoption Deadline          │
│   Colorado: Sept 30          │
│   Texas: June 30             │
│   California: July 15        │
└──────────────────────────────┘
┌──────────────────────────────┐
│ ► Public Hearing             │
│  [Tap to expand]             │
└──────────────────────────────┘
```

### Mobile-Optimized Patterns

**Search on Mobile:**
```
┌─────────────────────────┐
│ [Search] [Filter ≡]     │
└─────────────────────────┘
Results:
┌─────────────────────────┐
│ Title                   │
│ State | Topic           │
│ Short summary...        │
│ [Save] [Share] [More]   │
└─────────────────────────┘
```

**Filters on Mobile:**
```
┌──────────────────┐
│ [Filter ≡] Hide  │
├──────────────────┤
│                  │
│ STATE            │
│ ☑ All States    │
│ ☐ Colorado      │
│ ☐ Texas         │
│ [More...]        │
│                  │
│ CONTENT TYPE     │
│ ☑ Regulation    │
│ ☑ Guide         │
│ ☑ Template      │
│ [More...]        │
│                  │
│ TOPIC            │
│ ☐ Financial Mgmt│
│ ☐ Procurement  │
│ [More...]        │
│                  │
│ [ Apply ] [Clear]│
│                  │
└──────────────────┘
```

---

## Summary: Phase 2 Deliverables (Days 4-6)

✅ **Information Architecture Diagrams** - 5 navigation flows visualized  
✅ **Comprehensive Sitemap** - All 40+ pages mapped hierarchically  
✅ **7 Core MVP Wireframes** - Detailed low-fidelity layouts  
✅ **4 User Flow Diagrams** - Complete workflows visualized  
✅ **Responsive Breakpoints** - Mobile, tablet, desktop strategies  

**Ready for:** Phase 3 - Interactive Prototype & Visual Design (Days 7-9)

---

**Document Version:** 1.0  
**Last Updated:** December 14, 2025
