# Content Development Plan - OpenGov Compliance Center

> **Purpose:** Comprehensive plan for content development, link validation, and knowledge base creation for state compliance regulatory guidance

**Last Updated:** December 14, 2025 - 2:00 PM  
**Status:** Ready for Execution  
**Content Source:** state-compliance-data.json (525 records across 50 states)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Part A: Link Validation & Slug Verification](#part-a-link-validation--slug-verification)
3. [Part B: Knowledge Base Development](#part-b-knowledge-base-development)
4. [Content Quality Standards](#content-quality-standards)
5. [Review & Approval Process](#review--approval-process)
6. [Timeline & Resources](#timeline--resources)

---

## Executive Summary

This plan addresses two critical content development needs:

### Part A: Technical Validation
Ensure all prototype links, slugs, and navigation paths work correctly across the application.

### Part B: Knowledge Base Development
Transform 525 compliance records from state-compliance-data.json into comprehensive, plain-language regulatory guidance articles for all 50 US states.

### Scope
- **525 compliance records** across 50 states
- **11 core features** (Encumbrance Accounting, GASB 54, Grant Management, Payroll, Property Tax, Single Audit, Time & Attendance, Utility Billing, eProcurement, Leave Management)
- **4 categories** (Financial Management, HR, Procurement, Revenue)
- **6-8 topic domains** (Financial Mgmt, Procurement, Revenue, HR, Open Government, Community Development)

---

## Part A: Link Validation & Slug Verification

### Objective
Ensure zero broken links in the prototype and verify all URL slugs, navigation paths, and internal links are functional.

---

### A.1: Navigation Structure Validation

#### A.1.1: Global Navigation Links
**Priority:** Critical

**Checklist:**
- [ ] Header navigation menu
  - [ ] Logo link → `/` (Homepage)
  - [ ] States link → `/states` (State directory)
  - [ ] Topics link → `/topics` (Topic directory)
  - [ ] Resources link → `/resources` (Templates & checklists)
  - [ ] About link → `/about` (About page)
  - [ ] Contact link → `/contact` (Contact page)
  - [ ] Login/Signup link → `/login` (Authentication)
  - [ ] Dashboard link → `/dashboard` (User dashboard - logged in only)
  - [ ] Search bar → `/search?q=` (Search results)

- [ ] Footer navigation
  - [ ] All footer links functional
  - [ ] Social media links (if applicable)
  - [ ] Privacy Policy → `/privacy` 
  - [ ] Terms of Service → `/terms`
  - [ ] Support → `/support`
  - [ ] Sitemap → `/sitemap.xml`

**Testing Method:**
1. Click every link in header and footer
2. Verify correct page loads
3. Check for 404 errors
4. Verify back button returns to previous page

**Acceptance Criteria:**
- [ ] Zero broken links in global navigation
- [ ] All pages load in <2 seconds
- [ ] Breadcrumb trails correct on all pages

---

#### A.1.2: Homepage Links
**Priority:** Critical

**Checklist:**
- [ ] Hero section
  - [ ] State selector dropdown → `/states/[slug]`
  - [ ] "Get Started" button → Selected state page or `/states` if none selected
  - [ ] Search bar → `/search?q=`

- [ ] Popular topics section
  - [ ] Financial Management → `/topics/financial-management`
  - [ ] Procurement & Purchasing → `/topics/procurement-purchasing`
  - [ ] Open Government & Transparency → `/topics/open-government`
  - [ ] HR & Employment → `/topics/hr-employment`
  - [ ] Revenue & Taxation → `/topics/revenue-taxation`
  - [ ] Community Development → `/topics/community-development`

- [ ] Recent updates section
  - [ ] Each update → `/articles/[slug]`
  - [ ] "View All Updates" → `/updates`

- [ ] Call-to-action buttons
  - [ ] "Sign Up" → `/signup`
  - [ ] "Request Demo" → `/contact?type=demo`
  - [ ] "Learn More" → `/about`

**Testing Method:**
1. Start at homepage
2. Click each element systematically
3. Document any broken links
4. Verify slug formats are consistent

**Acceptance Criteria:**
- [ ] All homepage links functional
- [ ] State selector populates all 50 states
- [ ] Topic cards link to correct pages
- [ ] Recent updates link to actual articles

---

#### A.1.3: State Profile Pages (50 states)
**Priority:** Critical

**Checklist for Each State:**
- [ ] State page URL structure: `/states/[slug]`
  - [ ] Alabama: `/states/alabama`
  - [ ] Alaska: `/states/alaska`
  - [ ] Arizona: `/states/arizona`
  - [ ] Arkansas: `/states/arkansas`
  - [ ] California: `/states/california`
  - [ ] Colorado: `/states/colorado`
  - [ ] Connecticut: `/states/connecticut`
  - [ ] Delaware: `/states/delaware`
  - [ ] Florida: `/states/florida`
  - [ ] Georgia: `/states/georgia`
  - [ ] Hawaii: `/states/hawaii`
  - [ ] Idaho: `/states/idaho`
  - [ ] Illinois: `/states/illinois`
  - [ ] Indiana: `/states/indiana`
  - [ ] Iowa: `/states/iowa`
  - [ ] Kansas: `/states/kansas`
  - [ ] Kentucky: `/states/kentucky`
  - [ ] Louisiana: `/states/louisiana`
  - [ ] Maine: `/states/maine`
  - [ ] Maryland: `/states/maryland`
  - [ ] Massachusetts: `/states/massachusetts`
  - [ ] Michigan: `/states/michigan`
  - [ ] Minnesota: `/states/minnesota`
  - [ ] Mississippi: `/states/mississippi`
  - [ ] Missouri: `/states/missouri`
  - [ ] Montana: `/states/montana`
  - [ ] Nebraska: `/states/nebraska`
  - [ ] Nevada: `/states/nevada`
  - [ ] New Hampshire: `/states/new-hampshire`
  - [ ] New Jersey: `/states/new-jersey`
  - [ ] New Mexico: `/states/new-mexico`
  - [ ] New York: `/states/new-york`
  - [ ] North Carolina: `/states/north-carolina`
  - [ ] North Dakota: `/states/north-dakota`
  - [ ] Ohio: `/states/ohio`
  - [ ] Oklahoma: `/states/oklahoma`
  - [ ] Oregon: `/states/oregon`
  - [ ] Pennsylvania: `/states/pennsylvania`
  - [ ] Rhode Island: `/states/rhode-island`
  - [ ] South Carolina: `/states/south-carolina`
  - [ ] South Dakota: `/states/south-dakota`
  - [ ] Tennessee: `/states/tennessee`
  - [ ] Texas: `/states/texas`
  - [ ] Utah: `/states/utah`
  - [ ] Vermont: `/states/vermont`
  - [ ] Virginia: `/states/virginia`
  - [ ] Washington: `/states/washington`
  - [ ] West Virginia: `/states/west-virginia`
  - [ ] Wisconsin: `/states/wisconsin`
  - [ ] Wyoming: `/states/wyoming`

- [ ] Within each state page:
  - [ ] Breadcrumb: Home > States > [State Name]
  - [ ] "Subscribe to Updates" button → Opens modal or `/subscribe?state=[slug]`
  - [ ] Quick reference sidebar:
    - [ ] "View Calendar" → `/states/[slug]/calendar`
    - [ ] "Set Alerts" → `/subscribe?state=[slug]`
  - [ ] Topic category cards (6-8 per state):
    - [ ] Financial Management → `/states/[slug]/financial-management`
    - [ ] Procurement & Purchasing → `/states/[slug]/procurement-purchasing`
    - [ ] Open Government → `/states/[slug]/open-government`
    - [ ] HR & Employment → `/states/[slug]/hr-employment`
    - [ ] Revenue & Taxation → `/states/[slug]/revenue-taxation`
    - [ ] Community Development → `/states/[slug]/community-development`
  - [ ] "View All Requirements" → `/states/[slug]/all`
  - [ ] Recent updates per state → Links to articles

**Testing Method:**
1. Create automated script to visit all 50 state URLs
2. Check HTTP status codes (should all be 200)
3. Verify breadcrumbs render correctly
4. Click each topic category link
5. Document any 404s or broken links

**Acceptance Criteria:**
- [ ] All 50 state URLs return 200 status
- [ ] Breadcrumbs functional on all state pages
- [ ] Topic categories link correctly
- [ ] State slug format consistent (lowercase, hyphenated)

---

#### A.1.4: Article Detail Pages
**Priority:** Critical

**URL Structure:** `/articles/[slug]`

**Checklist:**
- [ ] Article page loads correctly
- [ ] Breadcrumb: Home > [State] > [Topic] > [Article Title]
- [ ] State badge links to state page
- [ ] Category badge links to topic page
- [ ] "Save" button (heart icon) functional
- [ ] "Share" button opens share modal
- [ ] "Export PDF" button triggers download
- [ ] "Subscribe to Updates" button opens modal
- [ ] Official source citations are hyperlinked
- [ ] Related articles section links functional
- [ ] Sidebar links:
  - [ ] Related topics
  - [ ] Templates
  - [ ] Resources
  - [ ] "Ask Expert" CTA

**Testing Method:**
1. Sample 20-30 articles across different states
2. Click all internal links
3. Verify external links (citations) open in new tab
4. Test action buttons (save, share, export)
5. Check related articles load correctly

**Acceptance Criteria:**
- [ ] All sampled articles load without errors
- [ ] Internal links navigate correctly
- [ ] External citation links valid and open in new tab
- [ ] Related articles algorithmically relevant
- [ ] Action buttons trigger expected behavior

---

#### A.1.5: Search Results Page
**Priority:** Critical

**URL Structure:** `/search?q=[query]&state=[state]&topic=[topic]&type=[type]`

**Checklist:**
- [ ] Search results page loads
- [ ] Search query displayed correctly
- [ ] Result count accurate
- [ ] Each result item:
  - [ ] Title links to article page
  - [ ] State badge links to state page
  - [ ] Category badge links to topic page
  - [ ] Preview snippet displays
- [ ] Filter sidebar:
  - [ ] State filters (multi-select) apply correctly
  - [ ] Topic filters (multi-select) apply correctly
  - [ ] Content type filters apply correctly
  - [ ] Date range filters apply correctly
- [ ] Sort options:
  - [ ] Relevance (default)
  - [ ] Date (newest first)
  - [ ] Title (A-Z)
- [ ] Pagination links (1, 2, 3, ... Next)
- [ ] "No results" state displays when appropriate

**Testing Method:**
1. Execute various search queries
2. Apply filters and verify results update
3. Test sort options
4. Navigate pagination
5. Test "no results" scenario

**Acceptance Criteria:**
- [ ] Search returns relevant results
- [ ] Filters apply correctly without page reload
- [ ] Sorting maintains filters
- [ ] Pagination works correctly
- [ ] Query parameters in URL update correctly

---

#### A.1.6: User Dashboard
**Priority:** High

**URL Structure:** `/dashboard`

**Checklist:**
- [ ] Dashboard loads (authentication required)
- [ ] Welcome message displays user name
- [ ] Quick actions toolbar:
  - [ ] "Compare States" → `/tools/compare`
  - [ ] "Create Checklist" → `/checklists/new`
  - [ ] "Download Template" → `/templates`
  - [ ] "Contact Expert" → `/contact?type=expert`
- [ ] New Updates section:
  - [ ] Each update links to article
  - [ ] "View All Updates" → `/updates`
- [ ] Saved Items section:
  - [ ] Each item links to article
  - [ ] "View All Saved" → `/saved`
- [ ] Active Subscriptions section:
  - [ ] "Manage Alerts" → `/account/subscriptions`
- [ ] Upcoming Deadlines section:
  - [ ] "View Calendar" → `/calendar`

**Testing Method:**
1. Log in as test user
2. Click each link systematically
3. Verify cards display correctly
4. Test empty states (new user with no data)

**Acceptance Criteria:**
- [ ] Dashboard requires authentication
- [ ] All cards render correctly
- [ ] All links navigate to correct pages
- [ ] Empty states display for new users

---

#### A.1.7: Comparison Tool
**Priority:** High

**URL Structure:** `/tools/compare?states=[state1,state2]&topic=[topic]`

**Checklist:**
- [ ] Comparison setup page loads → `/tools/compare`
- [ ] Step 1: State selection (2-5 states)
- [ ] Step 2: Topic selection
- [ ] "Previous" and "Next" buttons work
- [ ] Comparison results page loads
- [ ] "Change States" → Returns to step 1
- [ ] "Change Topic" → Returns to step 2
- [ ] "Export to Excel" triggers download
- [ ] "Export to PDF" triggers download
- [ ] "Save Comparison" saves to dashboard
- [ ] "Share Link" generates unique URL
- [ ] Table columns display correctly
- [ ] Related resources links functional

**Testing Method:**
1. Walk through comparison setup
2. Generate comparison results
3. Test all action buttons
4. Verify exports download correctly
5. Test share link functionality

**Acceptance Criteria:**
- [ ] Comparison wizard completes successfully
- [ ] Results display in side-by-side table
- [ ] Exports functional (Excel, PDF)
- [ ] Share link generates unique URL
- [ ] Saved comparison appears in dashboard

---

#### A.1.8: Templates & Resources
**Priority:** Medium

**URL Structure:** `/templates` and `/resources`

**Checklist:**
- [ ] Template library page loads → `/templates`
- [ ] Filter by state functional
- [ ] Filter by category functional
- [ ] Filter by file type functional
- [ ] Each template:
  - [ ] Download button triggers file download
  - [ ] Preview button (for PDFs) opens modal
- [ ] "Request Template" form → Submits successfully
- [ ] Checklists page loads → `/checklists`
- [ ] Each checklist:
  - [ ] "Start" button → `/checklists/[slug]`
  - [ ] Progress tracked per user
  - [ ] Print/Export buttons functional

**Testing Method:**
1. Browse template library
2. Apply filters
3. Download sample templates
4. Submit request form
5. Start and complete a checklist
6. Test print/export functions

**Acceptance Criteria:**
- [ ] All templates downloadable
- [ ] Filters work correctly
- [ ] Request form submits
- [ ] Checklists track progress
- [ ] Print/export functional

---

#### A.1.9: Account Pages
**Priority:** High

**Checklist:**
- [ ] Login page → `/login`
- [ ] Signup page → `/signup`
- [ ] Password reset → `/reset-password`
- [ ] Profile settings → `/account/profile`
- [ ] Email preferences → `/account/preferences`
- [ ] Subscription management → `/account/subscriptions`
- [ ] Saved items → `/saved`
- [ ] Logout → Clears session and redirects to homepage

**Testing Method:**
1. Test authentication flows
2. Update profile settings
3. Manage subscriptions
4. View saved items
5. Test logout

**Acceptance Criteria:**
- [ ] All account pages require authentication
- [ ] Settings save correctly
- [ ] Logout clears session
- [ ] Redirects work correctly

---

### A.2: External Link Validation

#### A.2.1: Official Source Citations
**Priority:** Critical

**Objective:** Verify all statute and regulation citation links point to valid, official government sources.

**Checklist:**
- [ ] Extract all external URLs from Articles collection (ComplianceSources)
- [ ] Categorize by state and source type
- [ ] Test each URL:
  - [ ] Returns 200 status code
  - [ ] Points to official government website (.gov domain preferred)
  - [ ] Content is relevant to citation
  - [ ] No broken redirects
- [ ] Document any broken or invalid links
- [ ] Find replacement URLs for broken links
- [ ] Update database with corrected URLs

**Testing Method:**
1. Export all citation URLs from database
2. Use automated link checker (e.g., `broken-link-checker`, `linkchecker`)
3. Manual spot-check 10-20% of links
4. Document findings in spreadsheet

**Sample Citations to Validate:**
- California Government Code Section 8546.7
- 2 CFR Part 200 (Federal Uniform Guidance)
- Louisiana R.S. 39:1301 (Local Government Budget Act)
- New York General Municipal Law
- North Carolina General Statutes Chapter 159

**Acceptance Criteria:**
- [ ] 95%+ of citation links valid and functional
- [ ] All .gov sources verified
- [ ] Broken links replaced with working alternatives
- [ ] Database updated with corrected URLs

---

#### A.2.2: State Oversight Agency Links
**Priority:** High

**Objective:** Verify links to state oversight agencies are current and functional.

**Checklist for Each State:**
- [ ] Alabama Examiner of Public Accounts
- [ ] Alaska Department of Commerce
- [ ] Arizona Auditor General
- [ ] Arkansas Legislative Audit
- [ ] California State Controller
- [ ] Colorado Office of the State Auditor
- [ ] Connecticut Office of Policy and Management
- [ ] Delaware Auditor of Accounts
- [ ] Florida Auditor General
- [ ] Georgia Department of Audits and Accounts
- [ ] Hawaii Department of Accounting and General Services
- [ ] Idaho State Controller
- [ ] Illinois Comptroller
- [ ] Indiana State Board of Accounts
- [ ] Iowa Auditor of State
- [ ] Kansas Department of Administration
- [ ] Kentucky State Local Finance Officer
- [ ] Louisiana Legislative Auditor
- [ ] Maine State Auditor
- [ ] Maryland Comptroller
- [ ] Massachusetts Department of Revenue Division of Local Services
- [ ] Michigan Department of Treasury
- [ ] Minnesota State Auditor
- [ ] Mississippi State Auditor
- [ ] Missouri State Auditor
- [ ] Montana Department of Administration
- [ ] Nebraska Auditor of Public Accounts
- [ ] Nevada Department of Taxation
- [ ] New Hampshire Department of Revenue Administration
- [ ] New Jersey Division of Local Government Services
- [ ] New Mexico Department of Finance and Administration
- [ ] New York Office of the State Comptroller
- [ ] North Carolina Local Government Commission
- [ ] North Dakota State Auditor
- [ ] Ohio Auditor of State
- [ ] Oklahoma State Auditor
- [ ] Oregon Secretary of State Audits Division
- [ ] Pennsylvania Department of Community and Economic Development
- [ ] Rhode Island Department of Revenue
- [ ] South Carolina Comptroller General
- [ ] South Dakota Department of Legislative Audit
- [ ] Tennessee Comptroller of the Treasury
- [ ] Texas Comptroller of Public Accounts
- [ ] Utah State Auditor
- [ ] Vermont State Auditor
- [ ] Virginia Auditor of Public Accounts
- [ ] Washington State Auditor
- [ ] West Virginia State Auditor
- [ ] Wisconsin Department of Revenue
- [ ] Wyoming State Auditor

**Testing Method:**
1. Visit each oversight agency link
2. Verify homepage loads correctly
3. Check for updated URLs (agencies may rebrand/reorganize)
4. Document any changes

**Acceptance Criteria:**
- [ ] All 50 oversight agency links functional
- [ ] URLs updated to reflect current agency structure
- [ ] Quick reference sidebars display correct agency info

---

### A.3: Slug Consistency Validation

#### A.3.1: Slug Format Standards
**Priority:** High

**Objective:** Ensure all URL slugs follow consistent formatting rules.

**Slug Standards:**
- All lowercase
- Hyphen-separated (kebab-case)
- No special characters (except hyphens)
- No trailing slashes in database (added by Next.js routing)
- No spaces (convert to hyphens)
- Abbreviations consistent (e.g., "hr" not "h-r", "gasb" not "g-a-s-b")

**Examples:**
- ✅ Good: `/states/new-york`
- ❌ Bad: `/states/New_York`
- ✅ Good: `/topics/hr-employment`
- ❌ Bad: `/topics/HR_&_Employment`
- ✅ Good: `/articles/gasb-54-fund-accounting`
- ❌ Bad: `/articles/GASB_54_Fund_Accounting`

**Checklist:**
- [ ] State slugs (50 states)
- [ ] Topic slugs (6-8 topics)
- [ ] Article slugs (525+ articles)
- [ ] Template slugs
- [ ] Checklist slugs

**Testing Method:**
1. Export all slugs from database
2. Run validation script to check format
3. Identify non-conforming slugs
4. Generate corrected slugs
5. Update database with corrections
6. Update any hardcoded links in code

**Validation Script (Pseudocode):**
```javascript
function validateSlug(slug) {
  // Check lowercase
  if (slug !== slug.toLowerCase()) return false;
  
  // Check for spaces
  if (slug.includes(' ')) return false;
  
  // Check for special characters (except hyphens)
  if (!/^[a-z0-9-]+$/.test(slug)) return false;
  
  // Check for trailing slashes
  if (slug.endsWith('/')) return false;
  
  return true;
}
```

**Acceptance Criteria:**
- [ ] 100% of slugs conform to standards
- [ ] Database updated with corrected slugs
- [ ] No broken links after slug corrections

---

### A.4: Link Validation Automation

#### A.4.1: Automated Testing Script
**Priority:** High

**Objective:** Create automated scripts to continuously test for broken links.

**Tools:**
- `broken-link-checker` (npm package)
- `playwright` (E2E testing)
- Custom Node.js scripts

**Script Features:**
1. Crawl all pages starting from homepage
2. Check HTTP status codes for all links
3. Identify broken links (404, 500, timeout)
4. Generate report (CSV or JSON)
5. Send alerts for critical failures

**Implementation:**
```javascript
// Example: Link checker script
const blc = require('broken-link-checker');

const options = {
  filterLevel: 3,
  honorRobotExclusions: false
};

const siteChecker = new blc.SiteChecker(options, {
  link: (result) => {
    if (result.broken) {
      console.log(`Broken link: ${result.url.original} on ${result.base.original}`);
    }
  },
  end: () => {
    console.log('Link checking complete');
  }
});

siteChecker.enqueue('https://compliance.opengov.com');
```

**Schedule:**
- Run nightly on staging environment
- Run before each production deployment
- Alert development team of failures

**Deliverables:**
- [ ] Automated link checking script
- [ ] CI/CD integration (GitHub Actions or Vercel)
- [ ] Email/Slack alerts for broken links
- [ ] Monthly link audit report

**Acceptance Criteria:**
- [ ] Script runs without errors
- [ ] Identifies all broken links correctly
- [ ] Generates actionable reports
- [ ] Integrated into deployment pipeline

---

### A.5: Link Validation Checklist Summary

**Pre-Launch Checklist:**
- [ ] All global navigation links tested
- [ ] All 50 state profile pages functional
- [ ] Article detail pages load correctly
- [ ] Search functionality works
- [ ] User dashboard links functional
- [ ] Comparison tool operational
- [ ] Templates & resources downloadable
- [ ] Account pages functional
- [ ] External citation links validated (95%+ working)
- [ ] State oversight agency links verified (100%)
- [ ] Slug format standardized (100% compliant)
- [ ] Automated link checking script deployed
- [ ] Zero critical broken links

**Responsibility:**
- **QA Specialist:** Execute manual testing
- **Frontend Developer:** Fix broken internal links
- **Backend Developer:** Update database slugs and URLs
- **Content Team:** Verify external citation links

**Timeline:** 5-7 business days

---

## Part B: Knowledge Base Development

### Objective
Transform 525 compliance records from state-compliance-data.json into comprehensive, plain-language regulatory guidance articles accessible to government administrators without legal backgrounds.

---

### B.1: Content Inventory Analysis

#### B.1.1: Current State Assessment
**Source:** state-compliance-data.json

**Inventory:**
- **Total Records:** 525
- **States Covered:** 50 (all US states)
- **Features:** 11 core features
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

- **Categories:** 4
  1. Financial Management
  2. HR
  3. Procurement
  4. Revenue

**Data Fields per Record:**
- State code (e.g., "CA", "TX")
- Feature name
- Category
- Compliance level (required, recommended, optional)
- OpenGov readiness (full, partial, none)
- OpenGov notes
- Applicable laws (array of statute citations)
- Regulations (array of regulation citations)
- Requirements (array of specific requirements)
- Context notes
- Source document reference

**Sample Record (California Single Audit):**
```json
{
  "stateCode": "CA",
  "featureName": "Single Audit Support (A-133/Uniform Guidance)",
  "category": "Financial Mgmt",
  "complianceLevel": "required",
  "opengovReadiness": "full",
  "opengovNotes": "OpenGov Financials supports Single Audit requirements with federal compliance reporting and SEFA generation.",
  "laws": ["California Government Code Section 8546.7"],
  "regulations": [
    "2 CFR Part 200 (Federal Uniform Guidance)",
    "OMB Compliance Supplement"
  ],
  "requirements": [
    "Required for entities expending $750,000+ in federal awards annually",
    "Must comply with federal Single Audit Act requirements",
    "State Controller's Office reporting requirements",
    "Schedule of Expenditures of Federal Awards (SEFA) preparation"
  ],
  "notes": "CA has additional state-level single audit requirements beyond federal mandates"
}
```

---

#### B.1.2: Content Gap Analysis
**Priority:** Critical

**Current Gaps:**
1. **No plain-language summaries** - Data is technical and legal
2. **No implementation guides** - Requirements listed but no "how-to"
3. **No practical examples** - No sample documents or case studies
4. **No FAQ sections** - Common questions not addressed
5. **No visual aids** - No diagrams, flowcharts, or infographics
6. **No deadline information** - Missing fiscal year dates and filing deadlines
7. **No penalty information** - Enforcement and consequences not detailed
8. **No templates or checklists** - No downloadable resources
9. **No related content links** - No cross-references between related requirements
10. **No update history** - No tracking of law changes over time

**Target State (After Development):**
1. ✅ Plain-language "What You Need to Know" summary (2-3 sentences, Grade 8 reading level)
2. ✅ Key requirements (5-10 bullet points, simplified)
3. ✅ Step-by-step implementation guide (actionable instructions)
4. ✅ Official source citations with hyperlinks
5. ✅ Practical examples (sample documents from real jurisdictions)
6. ✅ FAQ section (3-5 common questions)
7. ✅ Related regulations (cross-links)
8. ✅ Templates and checklists (downloadable)
9. ✅ Enforcement and penalties section
10. ✅ Update history (version control)

---

### B.2: Content Development Process

#### B.2.1: Article Template Structure
**Priority:** Critical

**Template for Each Compliance Article:**

```markdown
# [State]: [Requirement Title]

**State:** [State Name]  
**Category:** [Topic Category]  
**Last Updated:** [Date]  
**Reviewed By:** [SME Name, Credentials]  
**Effective Date:** [Date Law Takes Effect]  
**Compliance Level:** [Required / Recommended / Optional]

---

## What You Need to Know
[2-3 sentence plain-language summary in callout box. Grade 8 reading level. Answers: What is this? Why does it matter? Who does it apply to?]

**Example:**
> Single Audit is a federal requirement for local governments that spend more than $750,000 in federal grants per year. This audit ensures your organization is using federal funds correctly and following all compliance rules. If your government receives federal money, you'll need to track it carefully and have an independent auditor review your spending annually.

---

## Key Requirements
- [Requirement 1 - simplified, plain language]
- [Requirement 2 - simplified, plain language]
- [Requirement 3 - simplified, plain language]
- [Requirement 4 - simplified, plain language]
- [Requirement 5 - simplified, plain language]

**Example:**
- Track all federal grants your government receives during the fiscal year
- Identify which federal programs you spent more than $750,000 on
- Hire an independent auditor who's qualified to perform Single Audits
- Prepare a Schedule of Expenditures of Federal Awards (SEFA)
- Submit your completed audit report within 9 months of fiscal year-end

---

## Who Does This Apply To?
[Clear description of which entities must comply]

**Example:**
This requirement applies to:
- Counties, cities, towns, and special districts
- Schools and educational institutions
- Any local government entity that expends $750,000 or more in federal awards in a fiscal year
- Organizations receiving federal pass-through grants from the state

---

## Step-by-Step Implementation Guide

### Step 1: [Action Title]
[Detailed description of what to do, when to do it, and how to do it. Include specific instructions, forms needed, and common pitfalls to avoid.]

### Step 2: [Action Title]
[Continue for 5-10 steps covering the complete implementation process]

**Example:**

### Step 1: Set Up Grant Tracking System (Before Receiving Federal Funds)
Before you receive any federal grants, set up a system to track them. This can be as simple as an Excel spreadsheet or a module in your accounting software. You'll need to record:
- Federal agency providing the funds
- CFDA number (Catalog of Federal Domestic Assistance)
- Grant amount received
- Expenditures by month
- Program compliance requirements

**Tip:** Start tracking from Day 1 of receiving federal funds. It's much harder to reconstruct this information months later.

### Step 2: Monitor Your Federal Spending Throughout the Year
At the end of each month, total up your federal expenditures across all programs. Once you cross the $750,000 threshold, you'll know a Single Audit is required for that fiscal year.

**Timing:** Monthly reconciliation (last day of each month)  
**Responsible:** Finance Director or Grants Manager

---

## Official Sources
- [Law/Statute Name and Number] ([Link to official source - opens in new tab])
- [Regulation Name] ([Link to official source - opens in new tab])

**Example:**
- [California Government Code Section 8546.7](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=8546.7&lawCode=GOV) (State requirement)
- [2 CFR Part 200 - Uniform Administrative Requirements](https://www.ecfr.gov/current/title-2/subtitle-A/chapter-II/part-200) (Federal requirement)
- [OMB Compliance Supplement](https://www.whitehouse.gov/omb/management/office-federal-financial-management/) (Audit guidance)

---

## Practical Examples

### Example 1: [Jurisdiction Name]
[Link to sample document or describe how a real jurisdiction implements this requirement]

### Example 2: [Jurisdiction Name]
[Link to sample document or describe how a real jurisdiction implements this requirement]

**Example:**
- **City of San Diego SEFA:** [Download PDF](link) - Example of a comprehensive Schedule of Expenditures of Federal Awards
- **Alameda County Single Audit Report:** [Download PDF](link) - Full audit report showing all required sections

---

## Common Questions

**Q: [Question 1]**  
A: [Answer in plain language with actionable guidance]

**Q: [Question 2]**  
A: [Answer in plain language with actionable guidance]

**Q: [Question 3]**  
A: [Answer in plain language with actionable guidance]

**Example:**

**Q: What happens if we cross the $750,000 threshold mid-year?**  
A: The requirement is based on your total federal expenditures for the entire fiscal year. Even if you cross $750,000 in June, you'll still need to audit the full fiscal year. Start preparing immediately by ensuring your grant tracking is accurate from July 1 (or your fiscal year start date).

**Q: Can we use our regular auditor for Single Audit?**  
A: Your auditor must be qualified to perform Single Audits. This means they need specific training and certification in federal compliance auditing. Ask your current auditor if they're qualified, or search the [AICPA directory](link) for qualified auditors in your area.

---

## Related Requirements
- [Link to related requirement 1 in this state]
- [Link to related requirement 2 in this state]
- [Link to related federal/national requirement]

**Example:**
- [California: GASB 54 Fund Accounting](/articles/california-gasb-54-fund-accounting)
- [California: Grant Management Requirements](/articles/california-grant-management)
- [Federal: OMB Uniform Guidance Overview](/articles/federal-omb-uniform-guidance)

---

## Templates & Resources

### Templates
- [Download: Single Audit Checklist (Excel)](/templates/single-audit-checklist.xlsx)
- [Download: SEFA Template (Excel)](/templates/sefa-template.xlsx)
- [Download: Federal Grant Tracking Log (Excel)](/templates/federal-grant-tracking.xlsx)

### Checklists
- [Interactive: Single Audit Preparation Checklist (25 items)](/checklists/single-audit-preparation)

### Videos
- [Video: Understanding Single Audit Requirements (12 min)](/videos/single-audit-overview)

### External Resources
- [GFOA: Single Audit Resources](https://www.gfoa.org/single-audit)
- [Federal Audit Clearinghouse](https://facweb.census.gov/)

---

## Enforcement & Penalties

**Who Enforces:**
- Federal: Office of Inspector General (OIG) for each federal agency
- State: [State oversight agency name]

**Potential Penalties:**
- Federal funding suspension or termination
- Requirement to repay federal funds (disallowed costs)
- Debarment from future federal grants
- State sanctions (varies by state)
- Reputational damage and loss of public trust

**Risk Level:**
- **High Risk:** Missing the audit deadline or failing to complete the audit
- **Medium Risk:** Audit findings related to internal controls
- **Low Risk:** Minor reporting errors (correctable)

**Example:**
In 2022, a California city lost $2.3M in federal CARES Act funding due to missing their Single Audit deadline. The city had to repay the funds and was barred from receiving additional federal grants for 2 years.

---

## Updates & History

**Version History:**
- **v1.2 (December 2025):** Updated threshold from $500,000 to $750,000 per 2 CFR 200.501 amendment
- **v1.1 (March 2024):** Added California-specific reporting requirements per SB 123
- **v1.0 (January 2023):** Initial publication

**Upcoming Changes:**
- No pending legislative changes as of December 2025
- Next review scheduled: December 2026

---

## Was This Helpful?
[Thumbs up/down feedback buttons]

[Report an Error] [Save to My Library] [Share] [Print/Export PDF] [Subscribe to Updates]

---

*Disclaimer: This guidance is provided for informational purposes only and does not constitute legal advice. Always consult with your attorney, auditor, or state oversight agency for specific guidance on compliance requirements.*
```

---

#### B.2.2: Content Development Workflow
**Priority:** Critical

**Step 1: Content Structuring (Week 1-2)**
- [ ] Transform JSON data into article drafts using template
- [ ] Generate article slugs based on state + feature name
- [ ] Populate Articles collection in PayloadCMS
- [ ] Link to States and Topics collections
- [ ] Create ComplianceSources records for all citations

**Step 2: Plain-Language Translation (Week 3-6)**
- [ ] Rewrite technical requirements in plain language
- [ ] Create "What You Need to Know" summaries (Grade 8 reading level)
- [ ] Simplify key requirements (remove legalese)
- [ ] Write "Who Does This Apply To?" sections
- [ ] Use Hemingway Editor to verify readability

**Step 3: Implementation Guide Creation (Week 7-10)**
- [ ] Research implementation processes per state
- [ ] Write step-by-step guides (5-10 steps per requirement)
- [ ] Include timing, responsible parties, and forms needed
- [ ] Add common pitfalls and tips
- [ ] Review with SME for accuracy

**Step 4: Practical Examples & Resources (Week 11-12)**
- [ ] Research sample documents from real jurisdictions
- [ ] Request permission to use or create anonymized versions
- [ ] Upload to Media library
- [ ] Link from articles
- [ ] Create downloadable templates (Excel, Word, PDF)

**Step 5: FAQ Development (Week 13-14)**
- [ ] Brainstorm common questions per requirement
- [ ] Draft answers in plain language
- [ ] Review with SME
- [ ] Add to articles
- [ ] Create standalone FAQ pages for popular topics

**Step 6: Citation Verification (Week 15)**
- [ ] Find official URLs for all statute and regulation citations
- [ ] Verify links are functional
- [ ] Add to ComplianceSources collection
- [ ] Link from articles
- [ ] Set up quarterly review schedule

**Step 7: Internal Linking (Week 16)**
- [ ] Identify related requirements within each state
- [ ] Identify related requirements across states (for comparison)
- [ ] Add "Related Requirements" sections
- [ ] Implement algorithmic recommendations based on user behavior

**Step 8: SME Review (Week 17-18)**
- [ ] Assign articles to subject matter experts by state
- [ ] Experts review for accuracy, completeness, and clarity
- [ ] Incorporate feedback
- [ ] Mark as "verified" in database

**Step 9: Content QA (Week 19)**
- [ ] Proofread all articles
- [ ] Check for broken links
- [ ] Verify formatting is consistent
- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Run accessibility audit (WCAG 2.1 AA)

**Step 10: Publication (Week 20)**
- [ ] Set status to "published" in PayloadCMS
- [ ] Generate sitemap
- [ ] Submit to Google Search Console
- [ ] Announce to beta users
- [ ] Monitor for errors and user feedback

---

#### B.2.3: Content Prioritization
**Priority:** Critical

**Phase 1 States (Weeks 1-12):**
Complete all content for 5-10 high-priority states:
1. **Colorado** - 11 records
2. **Texas** - 11 records
3. **California** - 11 records
4. **Florida** - 11 records
5. **New York** - 11 records
6. **Illinois** - 11 records
7. **Washington** - 11 records
8. **North Carolina** - 11 records
9. **Ohio** - 11 records
10. **Georgia** - 11 records

**Total Phase 1:** ~110 articles

**Phase 2 States (Weeks 13-24):**
Complete next 20 states (220 articles)

**Phase 3 States (Weeks 25-36):**
Complete remaining 20 states (220 articles)

**Total:** 525+ articles across all 50 states

---

#### B.2.4: Topic-Based Grouping
**Priority:** High

**Group articles by topic for knowledge base organization:**

**1. Financial Management (highest priority)**
   - General Ledger with Fund Accounting (GASB 54) - 50 articles (1 per state)
   - Encumbrance Accounting - 23 articles (required states only)
   - Single Audit Support - 50 articles (1 per state)
   - Grant Management - 50 articles (1 per state)

**2. Procurement & Contracting**
   - eProcurement Portal - 50 articles (1 per state)
   - [Additional procurement topics to be researched]

**3. Revenue & Taxation**
   - Property Tax Assessment (CAMA Integration) - 50 articles
   - Property Tax Billing & Collection - 50 articles
   - Utility Billing - 50 articles
   - [Additional revenue topics to be researched]

**4. HR & Employment**
   - Payroll Processing - 50 articles
   - Time & Attendance - 50 articles
   - Leave Management (PTO, Sick, FMLA) - 50 articles
   - [Additional HR topics to be researched]

**5. Open Government & Transparency**
   - [Topics to be researched based on state data]

**6. Community Development & Permitting**
   - [Topics to be researched based on state data]

---

### B.3: Knowledge Base Structure

#### B.3.1: Navigation Hierarchy
**Priority:** High

**URL Structure:**

```
/knowledge-base
  /by-state
    /alabama
      /financial-management
        /gasb-54-fund-accounting
        /single-audit-support
        /grant-management
        [...]
      /procurement
        /eprocurement-portal
        [...]
      /revenue
        /property-tax-assessment
        /property-tax-billing
        /utility-billing
        [...]
      /hr-employment
        /payroll-processing
        /time-attendance
        /leave-management
        [...]
    /alaska
      [same structure]
    [... all 50 states]
  
  /by-topic
    /financial-management
      /gasb-54-fund-accounting
        [All 50 states listed]
      /encumbrance-accounting
        [23 states where required]
      /single-audit-support
        [All 50 states]
      [...]
    /procurement
      /eprocurement-portal
        [All 50 states]
      [...]
    /revenue
      [topics]
    /hr-employment
      [topics]
  
  /by-compliance-level
    /required
      [All requirements marked "required" across all states]
    /recommended
      [All requirements marked "recommended"]
    /optional
      [All requirements marked "optional"]
```

**Landing Pages:**
- `/knowledge-base` - Overview with search and filters
- `/knowledge-base/by-state/[state]` - State-specific knowledge base hub
- `/knowledge-base/by-topic/[topic]` - Topic-specific hub with multi-state view
- `/knowledge-base/by-compliance-level/required` - All required compliance items

---

#### B.3.2: Search & Discovery
**Priority:** High

**Search Features:**
1. **Full-text search across all articles**
   - Index: Title, summary, requirements, implementation steps, FAQs
   - Search operators: AND, OR, NOT, phrase search (" ")
   - Auto-suggest based on popular searches

2. **Faceted filters:**
   - State (multi-select, all 50)
   - Topic/Category (multi-select, 6-8 topics)
   - Compliance Level (required, recommended, optional)
   - Content Type (regulation, guide, template, video, checklist)
   - Last Updated (7/30/90 days, all time)

3. **Related content recommendations:**
   - Based on current article
   - Based on user's saved items
   - Based on user's states of interest
   - Algorithmic (collaborative filtering)

4. **Popular content:**
   - Most viewed articles (last 7/30/90 days)
   - Most saved articles
   - Trending topics (surge in views)

---

#### B.3.3: Content Tagging System
**Priority:** Medium

**Tag Categories:**

**1. Primary Tags (auto-generated from data):**
- State (e.g., `california`, `texas`)
- Topic (e.g., `financial-management`, `procurement`)
- Feature (e.g., `gasb-54`, `single-audit`, `encumbrance-accounting`)
- Compliance Level (e.g., `required`, `recommended`, `optional`)

**2. Secondary Tags (manual):**
- Keywords (e.g., `budget`, `audit`, `grant`, `payroll`, `tax`)
- Personas (e.g., `finance-director`, `compliance-officer`, `it-manager`)
- Use Cases (e.g., `annual-audit-prep`, `budget-season`, `grant-application`)

**3. Content Type Tags:**
- `article` - Full regulatory guidance
- `quick-reference` - One-page summary
- `implementation-guide` - Step-by-step how-to
- `faq` - Frequently asked questions
- `case-study` - Practical example
- `template` - Downloadable resource
- `checklist` - Interactive task list
- `video` - Video tutorial

---

### B.4: Content Quality Standards

#### B.4.1: Writing Style Guide
**Priority:** Critical

**Tone:**
- Professional yet conversational
- Helpful and empowering (not condescending)
- Clear and direct (no jargon or legalese unless necessary)
- Respectful of user's time and intelligence

**Voice:**
- Active voice (preferred)
- Second person ("you") when addressing the user
- Third person ("local governments", "entities") for general statements

**Readability:**
- Grade 8 reading level (Flesch-Kincaid or Hemingway)
- Short sentences (avg 15-20 words)
- Short paragraphs (3-4 sentences max)
- Bullet points for lists
- Subheadings for scannability

**Example (Before - Technical):**
> "Pursuant to California Government Code Section 8546.7, governmental entities expending federal financial assistance in excess of the threshold amount delineated in 2 CFR Part 200, Subpart F, shall procure and submit a single audit conducted in accordance with Generally Accepted Government Auditing Standards."

**Example (After - Plain Language):**
> "If your local government spends more than $750,000 in federal grants per year, you're required to have a Single Audit. This is an independent audit that checks whether you're following all the rules for using federal money. You'll need to hire a qualified auditor and submit your completed audit report within 9 months of your fiscal year-end."

---

#### B.4.2: Fact-Checking & Citation Standards
**Priority:** Critical

**Requirements:**
1. **Every factual claim must be cited**
   - Threshold amounts (e.g., "$750,000")
   - Deadlines (e.g., "9 months after fiscal year-end")
   - Legal requirements (e.g., "required by federal law")
   - Penalties (e.g., "funding suspension")

2. **Primary sources only**
   - Statutes (state law)
   - Regulations (administrative code)
   - Official agency guidance (comptroller, auditor)
   - Court rulings (if applicable)

3. **No tertiary sources**
   - ❌ Wikipedia
   - ❌ Blogs or opinion articles
   - ❌ Other compliance websites (unless citing as example)
   - ✅ Official .gov websites
   - ✅ State legislature websites
   - ✅ Federal regulations (ecfr.gov)

4. **Citation format:**
   - **In-text:** [California Government Code Section 8546.7](link)
   - **Official Sources section:** Full citation with hyperlink
   - **Effective date noted:** "Effective January 1, 2023"

---

#### B.4.3: Review & Approval Process
**Priority:** Critical

**4-Stage Review:**

**Stage 1: Content Creation (Legal Researcher)**
- Research state laws and regulations
- Draft article using template
- Cite all sources
- Submit for review

**Stage 2: Plain-Language Review (Content Editor)**
- Verify readability (Grade 8 level)
- Simplify complex language
- Check for consistency with style guide
- Ensure actionable guidance
- Submit for SME review

**Stage 3: Subject Matter Expert Review (Attorney or CPA)**
- **Qualifications:** Licensed attorney or CPA with 10+ years government law/finance experience
- Verify legal accuracy
- Check statute citations
- Confirm effective dates
- Validate compliance requirements
- Approve or request revisions

**Stage 4: Final QA (Content Manager)**
- Check formatting
- Verify links functional
- Test on multiple devices
- Run accessibility scan
- Publish to production

**Metadata:**
- **Author:** Legal Researcher name
- **Reviewer:** SME name and credentials
- **Last Reviewed:** Date
- **Next Review:** Date (annual)
- **Confidence Level:** Verified / Unverified / Needs Review

---

#### B.4.4: Content Maintenance Schedule
**Priority:** High

**Annual Review (All Content):**
- Every article reviewed at least once per year
- Check for law changes
- Update statistics and examples
- Verify citation links still functional
- Update "Last Reviewed" date

**Quarterly Review (High-Traffic Content):**
- Top 100 most-viewed articles
- Articles with user-reported errors
- Recently changed laws

**Monthly Review (New Laws):**
- Monitor state legislatures during sessions
- Subscribe to bill tracking services
- Check state oversight agency newsletters
- Update affected articles within 30 days

**User-Triggered Reviews:**
- "Report an Error" submissions
- Low helpfulness ratings (<3 stars)
- High bounce rates (users leaving quickly)

---

### B.5: Technology & Tools

#### B.5.1: Content Management Tools
**Priority:** High

**Primary CMS:** PayloadCMS 3.0
- Rich text editor (Lexical)
- Version control (track changes)
- Draft/review/publish workflow
- Scheduled publishing
- Media library
- Role-based access control

**Writing Tools:**
- **Hemingway Editor** - Check readability (Grade 8 level)
- **Grammarly** - Grammar and spelling
- **Google Docs** - Collaborative drafting
- **Notion** - Content planning and task management

**Research Tools:**
- **State legislature websites** - Find statutes
- **ecfr.gov** - Federal regulations
- **StateScape** - Bill tracking service (paid)
- **LexisNexis State Tracking** - Legal research (paid)

**Citation Management:**
- **Zotero** - Organize citations and sources
- Custom ComplianceSources collection in PayloadCMS

---

#### B.5.2: Content Generation Assistance (AI)
**Priority:** Medium

**Appropriate Uses:**
- Drafting initial summaries (requires human review)
- Simplifying complex legal language (requires verification)
- Generating FAQ questions (requires validation)
- Suggesting related content (requires curation)

**Inappropriate Uses:**
- ❌ Generating final content without human review
- ❌ Citing sources without verification
- ❌ Creating legal interpretations
- ❌ Determining compliance requirements

**Tools:**
- OpenAI GPT-4 or Claude 3 (for drafting assistance)
- Custom prompts for plain-language translation
- Human-in-the-loop workflow (always human final review)

**Example Prompt:**
> "Translate this legal requirement into plain language suitable for a government administrator without a legal background. Reading level: Grade 8. Tone: Helpful and clear. Format: 2-3 sentences.
> 
> Legal text: [paste requirement]"

---

### B.6: Content Development Team

#### B.6.1: Team Structure
**Priority:** Critical

**Content Team (Full-Time):**
1. **Content Manager (1)**
   - Oversee content development
   - Manage workflow and deadlines
   - Coordinate with SMEs
   - Quality assurance
   - $80K-100K/year

2. **Legal Researchers (2)**
   - Research state laws and regulations
   - Draft articles using template
   - Cite sources accurately
   - $50K-60K/year each

3. **Content Editor (1)**
   - Plain-language translation
   - Style guide enforcement
   - Proofreading and formatting
   - $50K-60K/year

**Subject Matter Experts (Contractors):**
4. **State-Specific Attorneys (5-10 contractors)**
   - Licensed attorney in specific state
   - 10+ years government law experience
   - Review articles for legal accuracy
   - $150-250/hour (review only, not drafting)
   - ~5-10 hours per state

5. **Government Finance CPAs (2-3 contractors)**
   - CPA with government finance expertise
   - GFOA or GASB knowledge
   - Review financial management articles
   - $150-200/hour
   - ~20-40 hours total

**Support Team (Part-Time):**
6. **Fact-Checker (1 part-time)**
   - Verify citations and sources
   - Check for broken links
   - $30-40/hour, 10-20 hours/week

---

#### B.6.2: Content Production Capacity
**Priority:** High

**Assumptions:**
- 1 Legal Researcher can draft 2-3 articles per week (includes research time)
- 1 Content Editor can edit 5-7 articles per week
- 1 SME can review 3-5 articles per week (as contractor, limited hours)

**Phase 1 (10 states, ~110 articles):**
- **Timeline:** 12 weeks
- **Production rate:** ~9 articles per week
- **Team:** 2 Legal Researchers + 1 Content Editor + 2 SME reviewers

**Phase 2 (20 states, ~220 articles):**
- **Timeline:** 12 weeks
- **Production rate:** ~18 articles per week
- **Team:** Expand to 3 Legal Researchers + 2 Content Editors + 4 SME reviewers

**Phase 3 (20 states, ~220 articles):**
- **Timeline:** 12 weeks
- **Production rate:** ~18 articles per week
- **Team:** Same as Phase 2

**Total Timeline:** 36 weeks (~9 months) for complete knowledge base

---

### B.7: Content Development Checklist

#### B.7.1: Per-Article Checklist
**Priority:** Critical

**For Each of 525+ Articles:**
- [ ] Article drafted using template
- [ ] "What You Need to Know" summary (Grade 8 level)
- [ ] Key requirements simplified (5-10 bullets)
- [ ] "Who Does This Apply To?" section
- [ ] Step-by-step implementation guide (5-10 steps)
- [ ] Official sources cited with working hyperlinks
- [ ] Practical examples included (2-3 per article)
- [ ] FAQ section (3-5 questions)
- [ ] Related requirements cross-linked
- [ ] Templates and resources linked (if applicable)
- [ ] Enforcement and penalties section
- [ ] Update history documented
- [ ] Readability check (Hemingway Grade 8)
- [ ] Grammar check (Grammarly)
- [ ] SME review completed
- [ ] Approved and published to production
- [ ] Added to sitemap
- [ ] Indexed by Google

**Estimated Time per Article:**
- Research and drafting: 4-6 hours
- Plain-language editing: 1-2 hours
- SME review: 1-2 hours
- Final QA and publishing: 0.5-1 hour
- **Total:** 7-11 hours per article

**Total Effort:**
- 525 articles × 9 hours avg = **4,725 hours**
- At 40 hours/week = **118 weeks** (single person)
- With 5-person team = **24 weeks** (~6 months)

---

#### B.7.2: Knowledge Base Completion Milestones
**Priority:** High

**Milestone 1: Phase 1 States Complete (Week 12)**
- [ ] 10 states fully populated (110 articles)
- [ ] All articles reviewed by SMEs
- [ ] Templates created for top 10 requirements
- [ ] Beta users can navigate knowledge base
- [ ] Search functionality tested

**Milestone 2: Phase 2 States Complete (Week 24)**
- [ ] 30 states fully populated (330 articles total)
- [ ] Checklists created for top 20 requirements
- [ ] Video tutorials for top 5 topics
- [ ] User feedback incorporated

**Milestone 3: Phase 3 States Complete (Week 36)**
- [ ] All 50 states fully populated (525+ articles)
- [ ] Complete template library (50+ templates)
- [ ] Complete checklist library (30+ checklists)
- [ ] 10+ video tutorials
- [ ] Knowledge base fully searchable and cross-linked

**Milestone 4: Ongoing Maintenance (Post-Launch)**
- [ ] Annual review process established
- [ ] Quarterly reviews of top content
- [ ] Monthly monitoring for law changes
- [ ] User feedback system operational
- [ ] "Report an Error" workflow functional

---

## Content Quality Standards

### Readability Standards
**Target:** Grade 8 reading level (Flesch-Kincaid)

**Tools:**
- Hemingway Editor
- Readable.com
- Grammarly readability score

**Benchmarks:**
- ✅ Grade 8 or below (accessible)
- ⚠️ Grade 9-10 (acceptable for complex topics, but simplify if possible)
- ❌ Grade 11+ (too complex - rewrite required)

---

### Accuracy Standards
**Target:** 95%+ accuracy (measured by error reports)

**Quality Assurance:**
- All factual claims cited with primary sources
- SME review by licensed attorney or CPA (10+ years experience)
- Annual re-review of all content
- User "Report an Error" mechanism
- Low error rate (<5% of articles have reported errors)

---

### Completeness Standards
**Target:** 100% of articles have all required sections

**Required Sections (per template):**
- What You Need to Know (summary)
- Key Requirements
- Who Does This Apply To?
- Step-by-Step Implementation Guide
- Official Sources
- Practical Examples
- Common Questions (FAQ)
- Related Requirements
- Templates & Resources
- Enforcement & Penalties
- Update History

**Optional Sections:**
- Videos
- Case Studies
- Comparison with other states
- Historical context

---

## Review & Approval Process

### Content Workflow States

**1. Draft**
- Article created by Legal Researcher
- In progress, not yet complete
- Not visible to public

**2. Ready for Review**
- Complete draft with all sections
- Citations verified
- Submitted for Content Editor review

**3. In Editing**
- Content Editor simplifying language
- Checking readability and style
- May send back to researcher for revisions

**4. Ready for SME Review**
- Plain language complete
- Sent to Subject Matter Expert (attorney or CPA)
- Awaiting expert approval

**5. SME Review in Progress**
- Expert reviewing for accuracy
- May request revisions or corrections

**6. Approved**
- SME has approved content
- Ready for final QA and publication

**7. Final QA**
- Content Manager final check
- Verify formatting, links, accessibility
- Prepare for publication

**8. Scheduled**
- Set for publication on specific date
- Awaiting publish time

**9. Published**
- Live on production site
- Visible to users
- Indexed by search engines

**10. Needs Update**
- Flagged for review due to:
  - Law change
  - User error report
  - Annual review cycle
  - Low helpfulness rating
- Moves back to Draft for revision

---

### Review Cycle

**Annual Review (All Content):**
- Every article reviewed once per year
- Check for law changes
- Verify citation links
- Update statistics and examples
- Mark "Last Reviewed" date

**Quarterly Review (High-Priority Content):**
- Top 100 most-viewed articles
- Articles with reported errors
- Recently changed laws

**Monthly Monitoring:**
- State legislature sessions
- Bill tracking services
- State agency newsletters
- Federal regulation changes

**User-Triggered Reviews:**
- "Report an Error" submissions
- Low helpfulness ratings (<60% positive)
- High bounce rates (user leaves within 30 seconds)

---

## Timeline & Resources

### Overall Timeline

| Phase | Duration | States | Articles | Team Size | Deliverables |
|-------|----------|--------|----------|-----------|--------------|
| **Phase 1** | Weeks 1-12 | 10 states | 110 articles | 4-5 people | Phase 1 states complete, templates, beta ready |
| **Phase 2** | Weeks 13-24 | 20 states | 220 articles | 6-7 people | 30 states total, checklists, videos |
| **Phase 3** | Weeks 25-36 | 20 states | 195 articles | 6-7 people | All 50 states, complete knowledge base |
| **Ongoing** | Post-launch | All states | Continuous updates | 3-4 people | Maintenance, updates, new content |

---

### Budget Estimate

**Content Development (9 months):**
- Content Manager (1): $60K-75K
- Legal Researchers (2-3): $100K-180K total
- Content Editor (1-2): $50K-120K total
- SME Reviewers (contractors): $50K-80K total (review hours)
- Fact-Checker (part-time): $10K-15K
- **Total:** $270K-470K

**Tools & Services:**
- StateScape bill tracking: $5K-10K/year
- LexisNexis research: $10K-15K/year (if needed)
- Content tools (Grammarly, etc.): $1K-2K/year
- **Total:** $16K-27K/year

**Total Year 1 Content Budget:** $285K-500K

---

### Success Metrics

**Quantitative Metrics:**
- [ ] 525+ articles published (100% of initial content)
- [ ] 50 states covered (100% coverage)
- [ ] 95%+ accuracy (error reports <5% of articles)
- [ ] Grade 8 readability (100% of articles)
- [ ] 100% SME review completion
- [ ] 95%+ citation link validity
- [ ] 50+ templates available
- [ ] 30+ interactive checklists
- [ ] 10+ video tutorials

**Qualitative Metrics:**
- [ ] User satisfaction: 70%+ "Helpful" ratings
- [ ] Task completion rate: 80%+ in usability testing
- [ ] Search success rate: 75%+ find what they need
- [ ] Positive user feedback in surveys
- [ ] Low support ticket volume (<5% of MAU)

**Business Impact:**
- [ ] Supports 500-1,000 organizations (Year 1)
- [ ] Drives user engagement (10+ searches/user/month)
- [ ] Reduces customer support load (FAQs answer common questions)
- [ ] Establishes OpenGov as compliance thought leader
- [ ] Generates PR and media coverage

---

## Appendix: Sample Content Examples

### Example 1: High-Quality Article Structure
[See detailed template in Section B.2.1]

### Example 2: Plain-Language Translation

**Before (Legal):**
> "Pursuant to GASB Statement No. 54, governmental entities shall classify fund balance amounts as nonspendable, restricted, committed, assigned, or unassigned based on the extent to which constraints are imposed upon the use of resources reported in governmental funds."

**After (Plain Language):**
> "When you report your fund balance (the money left over in your budget), you need to label it based on what it can be used for. GASB 54 gives you five labels: nonspendable (like inventory), restricted (can only be used for specific things by law), committed (your board voted to set it aside), assigned (you intend to use it for something), or unassigned (completely flexible). This helps everyone understand what money is truly available to spend."

---

## Status Legend
- ✅ Completed
- 🔄 In Progress
- ⬜ Pending
- ❌ Blocked / Issue

---

*This content development plan is a living document and will be updated as content is created and the knowledge base evolves. Last updated: December 14, 2025.*
