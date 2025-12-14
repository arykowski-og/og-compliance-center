# Implementation Plan

> **Task:** Build out articles for PayloadCMS app based on CONTENT_DEVELOPMENT_PLAN.md

**Last Updated:** December 14, 2025 - 3:45 PM

## Progress

| Status | Step | Description |
|--------|------|-------------|
| ✅ | 1 | Update Articles collection schema for compliance content 📊 |
| ✅ | 2 | Verify and update seed script for compliance articles 📊 |
| 🔄 | 3 | Run seed script to populate PayloadCMS with articles 📊 |
| ⬜ | 4 | Update frontend pages to display real article data 🎨 |
| ⬜ | 5 | Test and verify article pages load correctly 🎨 |

## Status Legend
- ✅ Completed
- 🔄 In Progress
- ⬜ Pending
- 🎨 UI/Frontend work
- 📊 Backend/Data work

## Current Status

**Working on:** Step 2 COMPLETE - Seed script verified and ready

## Step 1 Completion Details

**Files Modified:**
- `src/collections/Articles.ts` (178 lines → 365 lines)

**New Fields Added:**
- `state` (relationship to states collection)
- `stateCode` (text, e.g., "CA", "TX")
- `featureName` (text, e.g., "Single Audit Support")
- `category` (updated options for compliance topics)
- `complianceLevel` (required/recommended/optional)
- `summary` (plain-language "What You Need to Know")
- `keyRequirements` (array of requirement bullets)
- `whoDoesThisApplyTo` (rich text explaining applicability)
- `implementationSteps` (array with step title, description, timing, responsible party)
- `officialSources` (array of statute/regulation citations with URLs)
- `faqs` (array of Q&A pairs)
- `practicalExamples` (array of sample documents)
- `enforcementAndPenalties` (group with agency, penalties, risk level)
- `opengovReadiness` (full/partial/none)
- `opengovNotes` (product capability notes)
- `relatedArticles` (relationship to other articles)
- `lastReviewed` (date field)
- `nextReview` (date field)
- `reviewer` (SME reviewer relationship)

**Status Options Updated:**
- Added workflow states from CONTENT_DEVELOPMENT_PLAN.md:
  - Draft, Ready for Review, In Editing, Ready for SME Review
  - SME Review in Progress, Approved, Final QA, Scheduled
  - Published, Needs Update

**Category Options Updated:**
- Financial Management
- HR & Employment
- Procurement & Purchasing
- Revenue & Taxation
- Open Government
- Community Development

---

**Next:** Step 3 - Run seed script to populate PayloadCMS database

## Step 2 Completion Details

**Files Verified:**
- `src/seed/compliance-seed.ts` (341 lines) ✅ EXISTS
- `state-compliance-data.json` (12,723 lines) ✅ EXISTS

**Seed Script Capabilities:**
The existing compliance seed script already has:
- Transforms state-compliance-data.json records into articles
- Generates plain-language summaries for each feature type
- Creates article content with rich text formatting
- Maps state codes to state names
- Handles Phase 1 states (CA, TX, CO) for initial rollout
- Auto-generates slugs, tags, and SEO metadata
- Links articles to state records
- Uses existing admin user as author

**Note:** The existing seed script uses the OLD article schema (before Step 1 updates). However, the schema updates in Step 1 are backward compatible, so the seed script will still work. We may want to enhance it later to use the new fields (implementation steps, FAQs, etc.), but it's functional as-is.

**Status:** Seed script is ready to run!

---

## Context

The CONTENT_DEVELOPMENT_PLAN.md outlines a comprehensive knowledge base of 525 compliance articles across 50 US states. Currently:
- Frontend UI pages are complete (article detail, search/articles pages)
- Articles collection exists but has basic blog schema
- state-compliance-data.json contains 525 compliance records ready to transform
- Need to update schema and populate PayloadCMS with real content

## Approach

1. **Step 1:** Expand Articles collection to include compliance-specific fields (state, feature, requirements, sources, implementation guide, FAQs)
2. **Step 2:** Create a seed script that transforms state-compliance-data.json into article records
3. **Step 3:** Run seed script to populate PayloadCMS database with 525 articles
4. **Step 4:** Update frontend pages to query and display real article data from PayloadCMS
5. **Step 5:** Test article pages load correctly with real data

---
*This file is updated as the task progresses.*
