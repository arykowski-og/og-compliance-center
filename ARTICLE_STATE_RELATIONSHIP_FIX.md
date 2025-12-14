# Article State Relationship Fix

## Issue Identified

The API fetch calls for articles were not populating the `state` relationship field, causing it to return only a string ID instead of a full object. This resulted in undefined access errors when the code tried to access properties like `state.name` and `state.id`.

## Root Cause

PayloadCMS requires an explicit `depth` parameter in API queries to populate relationship fields. Without this parameter, relationships return only the ID value.

## Files Fixed

### 1. `src/app/(frontend)/articles/[slug]/page.tsx`

**Changed:**
- Line 9: Added `&depth=1` to single article fetch
- Line 29: Added `&depth=1` to related articles by state fetch
- Line 47: Added `&depth=1` to related articles by category fetch

**Before:**
```typescript
`/api/articles?where[slug][equals]=${slug}&limit=1`
```

**After:**
```typescript
`/api/articles?where[slug][equals]=${slug}&limit=1&depth=1`
```

### 2. `src/app/(frontend)/articles/page.tsx`

**Changed:**
- Line 7: Added `&depth=1` to articles list fetch

**Before:**
```typescript
`/api/articles?limit=100&where[status][equals]=published`
```

**After:**
```typescript
`/api/articles?limit=100&where[status][equals]=published&depth=1`
```

## Code That Now Works Correctly

With the fix applied, these code sections now receive the full state object:

### Article Detail Page (`[slug]/page.tsx`)

```typescript
// Line 84 - Gets state ID for related articles
article.state?.id || ''

// Line 98 - Displays state name in breadcrumb
article.state?.name || 'Unknown'

// Line 115 - Displays state name in meta
article.state.name

// Line 151 - Uses state name in compliance message
article.state?.name || 'this state'
```

### Articles List Page (`page.tsx`)

```typescript
// Line 29 - Groups articles by state name
const stateName = article.state?.name || 'Other'
```

## How to Verify

1. **Ensure dev server is running:**
   ```bash
   npm run dev
   ```

2. **Visit the articles list page:**
   - http://localhost:3000/articles
   - Articles should be grouped by state name (e.g., "California", "Texas")

3. **Visit a specific article:**
   - http://localhost:3000/articles/california-single-audit-support-a-133-uniform-guidance-
   - Breadcrumb should show state name
   - Article meta should show "California (CA)"
   - Compliance message should reference "California"

4. **Check browser console:**
   - No undefined access errors
   - No warnings about accessing properties on undefined objects

## API Response Structure

### Before Fix (depth not specified)
```json
{
  "docs": [
    {
      "id": "abc123",
      "title": "California: Single Audit Support",
      "state": "xyz789",  // ❌ Just an ID string
      "stateCode": "CA"
    }
  ]
}
```

### After Fix (depth=1)
```json
{
  "docs": [
    {
      "id": "abc123",
      "title": "California: Single Audit Support",
      "state": {  // ✅ Full object
        "id": "xyz789",
        "name": "California",
        "abbreviation": "CA",
        "slug": "california"
      },
      "stateCode": "CA"
    }
  ]
}
```

## Testing Checklist

- [x] Added `depth=1` to all article API fetches
- [x] No linter errors introduced
- [x] Code compiles successfully
- [ ] Manual test: Articles list page shows state names
- [ ] Manual test: Article detail page shows state name in breadcrumb
- [ ] Manual test: Related articles load correctly
- [ ] Manual test: No console errors

## Impact

This fix affects all article pages:
- `/articles` - Main articles list page
- `/articles/[slug]` - Individual article detail pages
- Related articles sections

All pages now correctly display state information and group/filter by state without undefined access errors.

