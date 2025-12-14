# OpenGov Compliance Center - UX Design System

**Date:** December 14, 2025  
**Status:** Phase 1 - Foundation (Day 1-3)  
**Timeline:** 2-week delivery cycle with daily milestones

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Personas](#user-personas)
3. [End-to-End User Journeys](#end-to-end-user-journeys)
4. [Information Architecture](#information-architecture)
5. [Core MVP Screens](#core-mvp-screens)
6. [Interaction Patterns](#interaction-patterns)
7. [Accessibility Standards](#accessibility-standards)
8. [Design System Components](#design-system-components)

---

## Executive Summary

The OpenGov Compliance Center targets local government professionals who need to find, understand, and comply with state-specific regulations across all 50 US states. This UX design system establishes patterns for a user-centered compliance platform built on the research foundation that identified no direct competitors in this space.

**Key Objectives:**
- Make compliance information discoverable and easy to understand
- Support users across different roles and technical expertise
- Enable efficient state-by-state comparisons
- Provide timely alerts and practical implementation tools
- Ensure WCAG AA accessibility throughout

---

## User Personas

### Persona 1: Sarah - County Finance Director

**Demographics:**
- Age: 45-55
- Experience: 15+ years in government finance
- Technical Comfort: Intermediate (comfortable with spreadsheets, some cloud tools)
- Role: Manages annual budget process, financial reporting, audit compliance

**Goals:**
- Stay current with budget adoption deadlines and reporting requirements
- Quickly reference state-specific requirements during budget season
- Ensure compliance with new regulations
- Share information with finance staff and elected officials

**Pain Points:**
- Budget deadlines change frequently; hard to track across states
- Regulations are written in complex legal language
- No single source of truth for state requirements
- Manual tracking of changes means missed updates
- Limited time to research complex compliance issues

**Platform Needs:**
- Fast access to deadline calendars
- Plain-language explanations of complex rules
- Export capabilities for board meetings
- Notification when regulations change
- Templates for compliance documentation

**Key Behaviors:**
- Uses platform seasonally (budget prep, fiscal year-end)
- Searches by state first, then topic
- Prefers downloadable resources
- Shares findings with colleagues
- Values reliability and accuracy

---

### Persona 2: Marcus - City Compliance Officer

**Demographics:**
- Age: 32-40
- Experience: 5-10 years in government compliance
- Technical Comfort: High (works with multiple software systems daily)
- Role: Ensures city compliance with state/federal laws, manages risk

**Goals:**
- Proactively identify compliance gaps
- Monitor changes in state regulations across multiple jurisdictions
- Document compliance activities for audits
- Reduce compliance risk for the city
- Quickly compare requirements across similar jurisdictions

**Pain Points:**
- Must track compliance across multiple regulatory domains
- Changes in one state affect operations in another
- Difficult to know which regulations apply to small cities
- Limited resources to research every requirement
- Auditors expect comprehensive compliance documentation

**Platform Needs:**
- Alerts when regulations change in monitored states
- Comparison tools to benchmark against similar cities
- Compliance checklist tracking
- Evidence/documentation storage
- Integration with calendar and task management

**Key Behaviors:**
- Proactive user who explores platform deeply
- Creates custom alerts for multiple states and topics
- Uses comparison features frequently
- Values comprehensive coverage
- Shares dashboards with colleagues

---

### Persona 3: Jennifer - Small Town IT Manager

**Demographics:**
- Age: 28-35
- Experience: 8 years in government IT
- Technical Comfort: High (manages systems, understands APIs)
- Role: Technical oversight for compliance systems, supports multiple departments

**Goals:**
- Understand state IT/data security compliance requirements
- Find solutions that integrate with existing systems
- Stay informed about technology compliance changes
- Support other departments' compliance needs
- Reduce IT security risk

**Pain Points:**
- IT compliance requirements vary by state and are often unclear
- Need technical documentation, not legal language
- Limited resources for compliance research
- Must coordinate across departments with different needs
- Regulations affect multiple systems and departments

**Platform Needs:**
- Technical summaries of IT/data regulations
- API access for integration with other systems
- Role-based content filtering (IT-specific)
- Implementation guidance from technical perspective
- Integration capabilities

**Key Behaviors:**
- Advanced user comfortable with technical documentation
- Values API access and integration possibilities
- Shares information with colleagues across departments
- Looks for practical implementation guidance
- Evaluates tools for team-wide adoption

---

### Persona 4: Robert - Rural County Administrator

**Demographics:**
- Age: 50-60
- Experience: 20+ years in government
- Technical Comfort: Low-to-intermediate (limited use of technology)
- Role: Small county with limited staff; oversees multiple functions

**Goals:**
- Understand basic compliance requirements
- Make informed decisions despite limited staff resources
- Avoid penalties and maintain good standing
- Get practical advice on implementation
- Find resources he can use without specialized knowledge

**Pain Points:**
- Limited budget and staff for compliance functions
- Complex regulations beyond his expertise
- Hard to know what information is reliable
- No time for extensive research
- Needs guidance on implementation, not just regulations

**Platform Needs:**
- Simple, clear interface that doesn't require training
- Plain-language explanations
- "What to do" guidance, not just "what the law says"
- Access to templates and sample documents
- Phone/email support option

**Key Behaviors:**
- Infrequent user, searches for specific problems
- Prefers clear answers over detailed analysis
- Values practical guidance and templates
- Calls support when confused
- Shares resources with staff

---

## End-to-End User Journeys

### Journey 1: Finding State Regulations

**Scenario:** Sarah (Finance Director) starts new job at a county and needs to understand the budget adoption deadline.

**Steps:**

1. **Discovery** → Landing page → "Find your state"
   - User sees state selector or map
   - Clicks on their state (Colorado)
   - Sees state overview card

2. **Exploration** → State Profile → Topic Browser
   - Reviews available topics for Colorado
   - Clicks "Budget & Financial Management"
   - Sees category overview and sub-topics

3. **Search** → Search Results
   - Sees several results about budget deadlines
   - Clicks "Annual Budget Adoption Deadlines"
   - Reads requirement summary

4. **Content Review** → Content Detail Page
   - Reads plain-language explanation
   - Sees key dates and requirements
   - Downloads related template

5. **Action** → Share & Document
   - Exports content to PDF
   - Adds to calendar
   - Shares with accounting team via email link

**Emotional Journey:**
- Confused → Guided → Informed → Confident
- Time to complete: 2-3 minutes

**Success Metric:** User finds regulation and exports within 3 minutes

---

### Journey 2: Comparing State Requirements

**Scenario:** Marcus (Compliance Officer) manages compliance for two similar cities in different states and needs to understand how requirements differ.

**Steps:**

1. **Entry** → Search Page → Comparison Intent
   - User searches "Budget adoption deadlines"
   - Sees "Compare across states" option
   - Clicks to start comparison

2. **Selection** → State Selector
   - Selects first state (Texas)
   - Selects second state (New Mexico)
   - Optionally adds Colorado for 3-state comparison
   - Clicks "Compare"

3. **Comparison View** → Side-by-Side Table
   - Sees requirements for all three states
   - Key differences highlighted
   - Can expand each for more details

4. **Analysis** → Export & Documentation
   - Downloads comparison table as spreadsheet
   - Adds notes about city-specific implications
   - Shares with city managers

5. **Follow-Up** → Bookmark & Alert
   - Bookmarks comparison for reference
   - Sets alert for changes in these states/topics
   - Receives notification if any state updates

**Emotional Journey:**
- Uncertain → Organized → Empowered → Vigilant
- Time to complete: 5-7 minutes

**Success Metric:** Comparison generated and exported in under 5 minutes

---

### Journey 3: Staying Updated on Changes

**Scenario:** Jennifer (IT Manager) needs to stay informed about data security compliance changes in states where the city operates.

**Steps:**

1. **Onboarding** → Account Setup → Alert Preferences
   - Creates account with work email
   - Specifies "IT and Data Security" as area of interest
   - Selects states where city operates (CA, WA, OR)

2. **Configuration** → Alert Settings
   - Enables email notifications for new regulations
   - Sets frequency to weekly digest
   - Chooses to receive urgent alerts immediately
   - Customizes digest preferences

3. **Daily Usage** → Dashboard
   - Sees dashboard with recent changes
   - "New Regulations" card shows 2 new items
   - Clicks to review new requirements

4. **Content Review** → New Requirement Article
   - Reads summary of new requirement
   - Reviews implementation guidance
   - Clicks through to official statute
   - Saves article to "Follow Up" list

5. **Action** → Create Implementation Plan
   - Marks as "Needs Implementation"
   - Assigns to colleague
   - Sets reminder for review meeting

**Emotional Journey:**
- Anxious about missing updates → Organized → Confident → Proactive
- Time to complete: Setup 5 min; Daily digest review 3-5 min

**Success Metric:** User discovers regulation updates within 1 day of publication

---

### Journey 4: Implementing Compliance

**Scenario:** Robert (Small County Administrator) needs to set up a basic compliance program for procurement requirements.

**Steps:**

1. **Problem Recognition** → Search
   - Searches "Procurement requirements"
   - Filters by "How to implement"
   - Finds "Competitive Bidding Requirements - Implementation Guide"

2. **Overview** → Implementation Checklist
   - Sees checklist with key steps
   - Checkboxes for tracking progress
   - Understands timeline (phases 1-3)

3. **Phase 1** → First Requirement
   - Clicks "Establish procurement policy"
   - Reads "What you need to do"
   - Downloads sample procurement policy template

4. **Reference** → Example Documents
   - Reviews sample from similar county
   - Adapts template to local needs
   - Uses templates and guidelines provided

5. **Completion** → Document Tracking
   - Checks off completed items
   - Saves as "Completed - 2025-01-15"
   - Uses saved version for audit documentation

**Emotional Journey:**
- Overwhelmed → Guided → Capable → Satisfied
- Time to complete: Initial 30-45 min; Implementation 2-4 weeks

**Success Metric:** User completes checklist; implements requirements within 30 days

---

### Journey 5: Onboarding New Users

**Scenario:** New compliance officer joins the city and needs to get up to speed quickly.

**Steps:**

1. **Welcome** → Guided Tour
   - Receives welcome email with setup link
   - Completes quick (2 min) onboarding questionnaire
   - Platform recommends relevant content based on role/state

2. **Profile Setup** → Role & Interests
   - Selects "Compliance Officer" role
   - Confirms operating states
   - Identifies high-priority topics

3. **Quick Start** → Recommended Resources
   - Sees "New to Compliance? Start Here" section
   - Reviews 5 essential topics for their role
   - Video walkthroughs of key features

4. **Self-Guided** → Exploring Content
   - Uses search to find specific requirements
   - Reviews a few key regulations
   - Takes notes in platform

5. **Support** → Help Resources
   - Finds FAQ for common questions
   - Watches 3-minute feature tutorials
   - Can request 1-on-1 training call

**Emotional Journey:**
- Uncertain → Welcomed → Oriented → Capable
- Time to complete: Initial 15-20 min; Full orientation 1-2 hours

**Success Metric:** New user completes setup and finds first resource within 20 minutes

---

## Information Architecture

### Primary Navigation Model

```
OpenGov Compliance Center (Root)
├── Home / Dashboard
├── By State
│   ├── [Select State]
│   ├── State Overview
│   ├── Topics by State
│   │   ├── Financial Management
│   │   ├── Procurement & Purchasing
│   │   ├── Open Government
│   │   ├── HR & Employment
│   │   └── [Additional Topics]
│   └── Recent Updates
├── By Topic
│   ├── [Select Topic]
│   ├── Topic Overview
│   ├── State Comparison
│   ├── Recent Articles
│   └── Implementation Resources
├── Search
│   ├── Search Results
│   ├── Filters (State, Topic, Content Type)
│   └── Advanced Search
├── Comparison Tools
│   ├── State vs. State
│   ├── Topic Across States
│   └── Saved Comparisons
├── My Account
│   ├── Dashboard
│   ├── Saved Items
│   ├── Alerts & Subscriptions
│   ├── Team Management
│   ├── Export History
│   └── Settings
└── Resources
    ├── Templates & Checklists
    ├── Webinars & Training
    ├── Best Practices
    ├── Help & FAQ
    └── Contact Support
```

### Topic Taxonomy

**Tier 1: Domains** (High-level government functions)
- Financial Management
- Procurement & Purchasing
- Open Government & Transparency
- Human Resources & Employment
- Public Safety & Operations
- Land Use & Development
- Environmental & Health
- Elections Administration
- Technology & Data
- Other

**Tier 2: Categories** (Specific regulatory areas)
- Financial Management → Budget Adoption, Financial Reporting, Audits, Tax Levy, Debt Management
- Procurement → Competitive Bidding, Procurement Methods, Vendor Management, Local Preference

**Tier 3: Topics** (Specific requirements)
- Budget Adoption → Adoption Deadlines, Public Hearing Requirements, Amendment Procedures
- Competitive Bidding → Threshold Amounts, Bid Notice Requirements, Protest Procedures

**Tier 4: Content** (Specific articles/resources)
- Article: "Colorado Budget Adoption Deadlines 2025"
- Checklist: "Budget Adoption Compliance Checklist - Colorado"
- Template: "Budget Resolution Template"

### Content Types

- **Regulations Summary** - Plain-language explanation of state requirement
- **Implementation Guide** - Step-by-step how-to for compliance
- **Checklist** - Interactive tracking document
- **Template** - Sample document to customize locally
- **Comparison Report** - Multi-state comparison table
- **Deadline Calendar** - Upcoming compliance deadlines
- **Best Practice** - How other jurisdictions handle requirement
- **FAQ** - Common questions answered
- **Video Tutorial** - 3-5 minute explanation
- **News & Updates** - Recent regulatory changes

---

## Core MVP Screens

### Screen 1: Homepage / Landing Page

**Key Elements:**
- Hero section with value proposition
- "Find Your State" prominent selector (map or dropdown)
- Popular topics carousel
- Recent updates section
- Sign-up call-to-action
- Quick links to main sections

**Visual Hierarchy:**
1. Hero with state selector (top priority)
2. Popular topics (secondary discovery)
3. Recent updates (credibility/freshness)
4. Sign-up (conversion)

**User Actions:**
- Search (prominent search box)
- Select state
- Browse topics
- Sign up for account
- View recent updates

---

### Screen 2: State Profile & Topic Browser

**Breadcrumb:** Home > States > Colorado

**Key Elements:**
- State header (name, icon, visual)
- State overview summary card
- Topic categories grid or list
- Related updates and alerts
- Quick reference sidebar
  - Key deadlines for current period
  - Subscribe to updates button

**Topic Category Card:**
- Category name
- Number of regulations covered
- Most recent update date
- Browse link

**Information Scent:**
- User immediately understands what topics are available
- Can see if there are recent updates
- Sidebar shows current deadlines

**User Actions:**
- Browse category
- Search within state
- Subscribe to state updates
- View all recent updates
- Share state profile

---

### Screen 3: Search Results with Filtering

**Breadcrumb:** Home > Search Results

**Key Elements:**

**Left Sidebar (Filters):**
- State selector (multi-select)
- Topic/Category (hierarchical dropdown)
- Content Type (checkboxes: Regulation, Guide, Template, etc.)
- Date Range (Last 30 days, Last year, All time)
- Sort options (Relevance, Recency, Popularity)

**Main Content Area:**
- Search box with current query
- Results count
- Results list with:
  - Title
  - State badge
  - Topic tag
  - 2-line summary
  - "Save" icon
  - Last updated date
  - Content type icon

**Comparison Prompt:**
- "Comparing across states? Try our Comparison Tool"
- Link to comparison feature

**User Actions:**
- Refine search with filters
- Click result to view detail
- Save result for later
- Subscribe to similar results
- Compare selected results

---

### Screen 4: Content Detail Page

**Breadcrumb:** Home > [State] > [Topic] > [Article]

**Key Elements:**

**Header Section:**
- Headline (e.g., "Colorado Budget Adoption Deadlines")
- Metadata bar (State, Topic, Last Updated, Authority)
- Quick action buttons:
  - Save / Bookmark
  - Share
  - Export (PDF)
  - Print

**Main Content:**
- Plain-language summary (expandable "What you need to know" box)
- Key deadlines / dates (highlighted box)
- Step-by-step requirements
- Links to official sources
- Related regulations

**Right Sidebar:**
- Related checklist (if available)
- Related template (if available)
- Related comparison tool
- Subscribe to updates for this topic

**Bottom Section:**
- Related articles
- Next recommended article
- Was this helpful? (thumbs up/down)
- Contact expert / Ask question link

**User Actions:**
- Read content
- Save / bookmark
- Share via email/link
- Export to PDF
- View related items
- Create checklist from content
- Download template
- Request expert help

---

### Screen 5: Dashboard / My Account

**Key Sections:**

**Header:**
- User name greeting
- Quick actions: Search, New comparison, View alerts

**Main Content:**

**Updates & Alerts Widget:**
- New regulations in your states (count)
- Recent changes
- View all button
- Subscribe options

**Saved Items Widget:**
- Recent bookmarks
- Quick access to favorites
- Organize folders
- Search saved items

**Comparisons Widget:**
- Recent comparisons
- Quick recreate button
- Save new comparison

**Team Collaboration (if enabled):**
- Shared items from colleagues
- Team activity feed
- Pending items for review
- Team settings link

**Settings Panel:**
- Edit profile information
- Alert preferences
- Notification frequency
- Manage states/topics
- Team management
- Billing/Subscription
- Support

**User Actions:**
- View recent updates
- Review saved items
- Manage alerts
- Invite team members
- Change notification settings
- Update profile
- Download reports

---

### Screen 6: Alerts & Subscriptions Manager

**Key Sections:**

**Active Subscriptions:**
- List of current alert subscriptions
- State(s) being monitored
- Topics being monitored
- Frequency (email digest, immediate, weekly, etc.)
- Last alert sent (timestamp)
- Edit / Remove options

**Create New Subscription:**
- State selector (multi-select)
- Topic selector (multi-select)
- Frequency dropdown
- Email address
- Add subscription button

**Notification Settings:**
- Email digest frequency
- Urgent alert delivery (immediate / daily)
- Notification preferences per subscription
- Opt-in/out global notifications

**Alert History:**
- Recent alerts sent (with links to content)
- Filter by subscription
- Search alert content

**User Actions:**
- Create new subscription
- Edit subscription
- Remove subscription
- Change notification frequency
- View alert history
- Test notification

---

### Screen 7: Comparison Tool

**Step 1: Select States (if not pre-selected)**
- Multi-select state picker
- "Add another state" option
- Max 5 states for clarity
- Next button

**Step 2: Select Topic**
- Topic dropdown (pre-filtered if in-state context)
- Category selector
- Specific requirement selector
- Narrow or broaden scope
- Compare button

**Step 3: Comparison Results**

**Header:**
- Show states selected
- Topic being compared
- Change selections link
- Export button
- Print button

**Table View:**
- States as columns
- Requirements/dimensions as rows
- Key cells highlighted in different colors
- Notes field for each state
- Links to full articles

**Key Differences Highlighted:**
- Use visual design (colors, icons) to show:
  - Match across states
  - Significant differences
  - Unique requirements

**Related Items:**
- Similar comparisons
- Deep-dive articles for each state
- Implementation guides

**User Actions:**
- Export to Excel/PDF
- Print
- Save comparison
- Adjust selections
- Share via link
- Create checklist
- Set alerts for changes

---

## Interaction Patterns

### Pattern 1: Save & Bookmark

**Trigger:** User clicks heart/bookmark icon on any content

**Flow:**
1. Icon fills/animates
2. Toast notification: "Saved to [collection]"
3. Item appears in "Saved Items"
4. Optional: Quick folder selection modal

**Variants:**
- Already saved: Icon filled, tooltip shows "Remove bookmark"
- Logged out: Prompt to log in with "Save this" pre-filled
- Team sharing: "Save for team" option with folder selector

### Pattern 2: Social Share

**Trigger:** User clicks share icon

**Options:**
- Copy link (copies URL)
- Share via email (pre-filled subject/message)
- Share to team folder
- Generate QR code

**Display:**
- Modal with copy-to-clipboard button
- Pre-filled message with title + link
- Tracking to see sharing patterns

### Pattern 3: Export / Download

**Trigger:** User clicks export button

**Options:**
- PDF (formatted, branded)
- Excel/CSV (for tables/comparisons)
- Word (for templates)
- iCal (for calendars/deadlines)

**Flow:**
1. Export format selector appears
2. User selects format
3. File generates (may take 2-5 seconds)
4. Download starts
5. Toast confirms successful download

### Pattern 4: Filtering & Refining

**Trigger:** User clicks filter on search or browse page

**Flow:**
1. Sidebar expands with filter options
2. User selects/deselects filters
3. Results update in real-time or with "Apply" button
4. Active filters show as pills/tags
5. "Clear all filters" option available

**Visual Design:**
- Selected filters highlighted
- Count of results shown
- Number of active filters on sidebar toggle

### Pattern 5: Comparing Content

**Trigger:** User clicks "Compare" or checks comparison checkboxes

**Flow:**
1. Comparison mode activates
2. Checkboxes appear on results
3. User selects 2-5 items
4. "Compare selected" button appears
5. Click to view side-by-side comparison

**Variants:**
- Pre-selected for comparison (from detail page)
- Quick compare (2-item) vs. full compare (2-5 items)
- Saved comparisons available as templates

### Pattern 6: Team Collaboration

**Trigger:** User clicks "Share with team" or mentions colleague

**Flow:**
1. Team member selector appears
2. User chooses team member(s)
3. Optional note field
4. Share button
5. Team member receives notification
6. Item appears in team member's shared section

**Permissions:**
- View/read: Team member sees shared item
- Comment: Team member can add notes
- Edit: Team member can modify (optional)
- Collaborate: Multiple edits and versions tracked

### Pattern 7: Alert Creation

**Trigger:** User clicks "Subscribe to updates" on content

**Flow:**
1. Alert configuration modal appears
2. Pre-filled with current state/topic
3. User confirms or adjusts
4. Selects frequency (immediate, daily, weekly, monthly)
5. Confirms email address
6. Save alert button
7. Confirmation: "You'll receive [frequency] alerts"

**Variants:**
- Create alert from within alert manager
- Quick alert from detail page
- Batch alert for multiple topics

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

#### Color Contrast

**Requirements:**
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Implementation:**
- All text on backgrounds must meet minimum ratios
- Color should not be sole method of conveying information
- Use additional visual indicators (icons, text labels)
- Avoid problematic color combinations (red/green for colorblind users)

#### Keyboard Navigation

**Requirements:**
- All functionality available via keyboard
- Focus visible and logical
- No keyboard traps
- Skip links for repeated content

**Implementation:**
- Tab order follows visual hierarchy
- Focus indicators visible (outline or highlight)
- All interactive elements keyboard accessible
- Escape key closes modals/menus
- Enter/Space activate buttons and links
- Arrow keys for navigation within components

#### Screen Reader Support

**Requirements:**
- All images have meaningful alt text
- Form labels associated with inputs
- Semantic HTML structure
- ARIA attributes where needed
- Live regions for dynamic content

**Implementation:**
- Page landmarks (nav, main, region roles)
- Heading hierarchy (H1-H6, skip levels)
- Form inputs with labels and error messages
- Icons with aria-label or aria-hidden
- Tables with th and caption
- Alert updates announced via aria-live

#### Motion & Animation

**Requirements:**
- No animations that flash more than 3x/second
- Respect prefers-reduced-motion
- Animations should not distract from content

**Implementation:**
- Limit animations to enhance, not distract
- Provide @media (prefers-reduced-motion) CSS
- Users can disable animations in settings
- Critical information doesn't rely on animation

#### Language & Clarity

**Requirements:**
- Clear, simple language (Grade 8 reading level)
- Abbreviations explained on first use
- Instructions clear and unambiguous
- Error messages specific and helpful

**Implementation:**
- Use plain English, avoid jargon
- Define terms on first use
- Provide examples and context
- Error messages specific and actionable
- Help text available for complex topics

#### Responsive Design

**Requirements:**
- Works on mobile, tablet, desktop
- Content accessible at all zoom levels (up to 200%)
- No horizontal scrolling at 320px width
- Touch targets at least 44x44px

**Implementation:**
- Mobile-first responsive design
- Touch-friendly interface on mobile
- Adequate spacing between elements
- Viewport meta tag configured

#### Form Accessibility

**Requirements:**
- Visible labels for all inputs
- Error identification and suggestions
- Confirmation for important actions
- Required fields indicated

**Implementation:**
- <label> element associated with <input>
- Error messages in color + text + icon
- Password hints or show/hide toggle
- CAPTCHA alternatives provided
- Success confirmation for submissions

### Specific Compliance Strategies

**Homepage:**
- Skip to main content link
- Clear heading hierarchy (H1 for page title)
- Form labels visible and associated
- State selector keyboard accessible

**State Profile:**
- Semantic HTML for page structure
- Topic cards keyboard navigable
- Focus management when switching tabs
- Alt text for state icons/maps

**Search Results:**
- Filters keyboard operable
- Active filters announced
- Results announced as updated
- Sort options clearly labeled

**Content Detail:**
- Heading hierarchy consistent
- Links have descriptive text (not "click here")
- Tables accessible (th, caption)
- Code examples have proper markup

**Comparison Table:**
- Table has proper headers
- Complex headers use scope attribute
- Color differences supplemented with icons/text
- Keyboard navigation for selecting rows/columns

**Interactive Tools:**
- Checklists: Checkboxes keyboard operable
- Calculators: All inputs have labels, output announced
- Forms: Clear labels, error messages
- Modals: Focus management, escape to close

### Accessibility Testing Plan

**Automated Testing:**
- WAVE browser extension
- Lighthouse accessibility audit
- axe DevTools
- Pa11y command-line tool
- Weekly CI/CD integration

**Manual Testing:**
- Keyboard-only navigation (no mouse)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification
- Zoom testing (up to 200%)
- Mobile testing with accessibility features

**User Testing:**
- Participants with various disabilities
- Users with low vision using screen magnification
- Users with motor impairments using keyboard/voice
- Deaf/hard of hearing users (captions on videos)

**Accessibility Checklist:**

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] All forms have labels
- [ ] Keyboard navigation works
- [ ] Focus visible
- [ ] No keyboard traps
- [ ] Headings are semantic
- [ ] Links have descriptive text
- [ ] Error messages clear
- [ ] Mobile works at 200% zoom
- [ ] Animations respect prefers-reduced-motion
- [ ] Video has captions
- [ ] Tables properly marked up
- [ ] Modals trap focus
- [ ] Escape closes modals

---

## Design System Components

### Component Library (Seamstress/Capital Design System)

The platform should use OpenGov's Seamstress component library built on Capital Design System for consistency with other OpenGov products.

#### Button States

**Primary Button**
- Default: Capital color, no shadow
- Hover: Darker shade, slight shadow
- Active: Pressed appearance
- Disabled: 50% opacity, no pointer
- Focus: Focus ring outline

**Secondary Button**
- Default: Outline style, Capital border
- Hover: Light background fill
- Active: Darker fill
- Disabled: 50% opacity

**Tertiary Button**
- Default: Text only
- Hover: Text underline
- Active: Color darkened
- Disabled: 50% opacity

#### Form Components

**Text Input**
- Label above
- Placeholder for example
- Border on focus
- Error state: Red border + error icon + message
- Success state: Green checkmark
- Helper text below (muted)
- Disabled state: Grayed out

**Select Dropdown**
- Label above
- Closed state: Shows current selection
- Open state: Shows all options
- Hover state: Highlighted option
- Selected state: Checkmark + highlighted
- Keyboard navigation: Arrow keys
- Multi-select variant: Checkboxes in dropdown

**Checkbox & Radio**
- Large touch targets (minimum 44px)
- Label to the right
- Checked/unchecked clear visual difference
- Focus indicator visible
- Disabled state: Grayed out

**State/Province Selector**
- Visual map option
- Dropdown option
- Multi-select capability
- Search field for large lists
- Currently selected highlighted

#### Information Display

**Card**
- White background with subtle shadow
- Rounded corners (4px)
- Padding (16px/24px)
- Optional header
- Optional footer/actions
- Hover effect (slight shadow increase)

**Badge**
- Inline label for metadata
- Small size (12px text)
- Color-coded by type (state, status, topic)
- Icon + text or text only

**Alert/Toast**
- Success: Green background
- Warning: Orange/yellow
- Error: Red background
- Info: Blue background
- Auto-dismiss after 4 seconds
- Dismiss button available
- Icon + message + action (optional)

**Modal**
- Overlay background
- Centered dialog box
- Header with title
- Close button (X)
- Content area with scrolling if needed
- Footer with action buttons
- Focus trap (keyboard stays within modal)
- Escape key closes modal

#### Navigation Components

**Top Navigation Bar**
- Logo on left
- Main navigation links
- Search box on right
- User menu (logged-in state)
- Mobile hamburger menu
- Sticky behavior on scroll

**Breadcrumb**
- Shows page hierarchy
- Links to parent pages
- Current page not clickable
- Mobile: Collapse/expand option

**Sidebar Navigation**
- Vertical menu
- Current page highlighted
- Sub-nav expands/collapses
- Keyboard accessible
- Mobile: Slides out on tap

**Tab Navigation**
- Horizontal tabs
- Active tab highlighted
- Tab content changes on click
- Keyboard: Arrow keys to navigate
- Semantic <tab> role

#### Data Display

**Table**
- Header row with sort indicators
- Rows with alternating background (optional)
- Clickable rows (with pointer)
- Column sorting
- Pagination if > 10 rows
- Responsive: Stack on mobile
- Accessible: Semantic th/td

**List/Grid**
- Cards or rows
- Consistent spacing
- Lazy loading if large dataset
- Filter controls above
- Sort options
- Load more / pagination

**Chart/Visualization**
- High contrast colors
- Legend clearly labeled
- Accessible table alternative
- Interactive elements keyboard operable
- SVG or canvas with fallback

#### Status Indicators

**Progress Bar**
- Visual representation of progress
- Percentage labeled
- Color coded (neutral → warning → success)
- ARIA attributes for screen readers

**Status Badge**
- Published: Green
- Draft: Gray
- Updated: Blue
- Pending: Yellow
- Error: Red
- Color + icon + text

#### Date/Time Components

**Date Picker**
- Calendar widget
- Keyboard navigable
- Touch-friendly
- Format selector
- Min/max date constraints

**Deadline Display**
- Date with visual hierarchy
- Relative time (e.g., "in 30 days")
- Status indicator (approaching, urgent, past due)
- Color coding

### Typography System

**Headings**
- H1: 32px, bold, Capital primary color (page titles)
- H2: 24px, bold (section headings)
- H3: 20px, semibold (subsections)
- H4: 16px, semibold (small sections)
- H5-H6: 14px (rarely used)

**Body Text**
- Regular: 16px, 1.5 line height
- Small: 14px (metadata, labels)
- Extra small: 12px (footer, helper text)

**Line Height:**
- Headings: 1.2
- Body: 1.5
- Density: 1.4

**Font Family:**
- Headings: Capital Design sans-serif (Segoe UI or system)
- Body: Capital Design sans-serif
- Monospace: Code blocks (Monaco, monospace stack)

### Color System

**Primary Colors**
- Capital Brand Color: Used for interactive elements, links, CTAs
- Hover state: Darker shade
- Disabled: 50% opacity

**Status Colors**
- Success: Green (#22c55e)
- Warning: Orange (#f97316)
- Error: Red (#ef4444)
- Info: Blue (#3b82f6)

**Neutral Colors**
- Dark text: #1f2937
- Gray text: #6b7280
- Light gray: #d1d5db
- Very light gray: #f3f4f6
- White: #ffffff
- Black: #000000

**State Badge Colors**
- AL: Unique color per state (visual identification)
- CO: Different from AL
- TX: Different from AL & CO
- Etc. (all 50 states)

### Spacing System

**Base Unit: 8px**
- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px
- Gutters: 24px/32px
- Container max-width: 1200px

### Shadow System

**Elevation Levels**
- No shadow: Background elements
- Subtle shadow: Cards, dropdowns
- Medium shadow: Modals, popovers
- Deep shadow: Floating buttons (if used)

**Implementation:**
- Subtle: 0 1px 3px rgba(0,0,0,0.12)
- Medium: 0 4px 6px rgba(0,0,0,0.15)
- Deep: 0 10px 20px rgba(0,0,0,0.15)

---

## Summary: Phase 1 Deliverables (Days 1-3)

✅ **User Personas:** 4 detailed personas with goals, pain points, needs  
✅ **User Journeys:** 5 end-to-end journeys with emotional arcs  
✅ **Information Architecture:** 3-tier taxonomy and navigation structure  
✅ **Core Screens:** 7 MVP screens detailed with interactions  
✅ **Interaction Patterns:** 7 key patterns for consistency  
✅ **Accessibility Standards:** WCAG AA compliance framework  
✅ **Design System:** Component library mapped to Seamstress

**Next Phase (Days 4-6):** Information architecture diagrams, detailed wireframes, and prototype development.

---

**Document Version:** 1.0  
**Last Updated:** December 14, 2025  
**Prepared by:** UX Design System Team
