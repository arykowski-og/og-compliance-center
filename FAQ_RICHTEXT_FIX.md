# FAQ Rich Text Format Fix

**Date:** December 14, 2025  
**Issue:** FAQ answers and other rich text fields showing "Answer not available"

## Problem Identified

The PayloadCMS schema defines several fields as `richText` (Lexical format), but the markdown import API route was storing them as plain strings. This caused the frontend to fail when trying to access the rich text structure.

### Affected Fields:
1. `faqs[].answer` - Rich text field
2. `whoDoesThisApplyTo` - Rich text field
3. `implementationSteps[].stepDescription` - Rich text field

## Root Cause

**Import API Route (`src/app/api/import-articles/route.ts`):**
- Line 164: `currentFaq.answer = currentContent.join('\n').trim()` ❌ Plain string
- Line 242: `whoDoesThisApplyTo: metadata.whoDoesThisApplyTo || ''` ❌ Plain string
- Line 243: `implementationSteps: metadata.implementationSteps` ❌ Plain strings inside

**Frontend Rendering (`src/app/(frontend)/articles/[slug]/page.tsx`):**
- Line 213: Trying to access `faq.answer?.root?.children?.[0]?.children?.[0]?.text`
- Always returned "Answer not available" because structure didn't exist

## Solution Implemented

### 1. Created `textToLexical()` Helper Function

Added to `src/app/api/import-articles/route.ts`:

```typescript
function textToLexical(text: string) {
  if (!text || text.trim() === '') {
    return {
      root: {
        type: 'root',
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    }
  }

  // Split text into paragraphs
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  
  return {
    root: {
      type: 'root',
      children: paragraphs.map(para => ({
        type: 'paragraph',
        children: [{
          type: 'text',
          text: para.trim(),
        }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
```

### 2. Applied Conversion to All Rich Text Fields

```typescript
const article = await payload.create({
  collection: 'articles',
  data: {
    // ... other fields ...
    whoDoesThisApplyTo: metadata.whoDoesThisApplyTo ? textToLexical(metadata.whoDoesThisApplyTo) : undefined,
    implementationSteps: metadata.implementationSteps.map(step => ({
      ...step,
      stepDescription: step.stepDescription ? textToLexical(step.stepDescription) : undefined,
    })),
    faqs: metadata.faqs.map(faq => ({
      question: faq.question,
      answer: textToLexical(faq.answer), // ✅ Now converts to Lexical
    })),
  },
})
```

### 3. Updated Frontend Rendering

Updated `src/app/(frontend)/articles/[slug]/page.tsx` to properly render paragraphs:

```typescript
<div className="faq-answer">
  {faq.answer?.root?.children?.map((child: any, childIndex: number) => {
    if (child.type === 'paragraph') {
      const text = child.children?.map((textNode: any) => textNode.text).join('') || ''
      return <p key={childIndex}>{text}</p>
    }
    return null
  }) || <p>Answer not available</p>}
</div>
```

## Lexical Rich Text Format

PayloadCMS uses Lexical editor format, which has this structure:

```typescript
{
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The actual content text'
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  }
}
```

## Testing

To verify the fix works:

1. **Import an article with FAQs:**
   ```bash
   # POST to import endpoint with markdown containing FAQs
   curl -X POST http://localhost:3000/api/import-articles \
     -F "file=@docs/articles/california-single-audit-support.md"
   ```

2. **Check the database:**
   - Visit http://localhost:3000/admin/collections/articles
   - Open an article with FAQs
   - Verify the "answer" field shows rich text editor with content

3. **View on frontend:**
   - Visit http://localhost:3000/articles/[slug]
   - Scroll to "Frequently Asked Questions" section
   - Verify answers are displayed properly (not "Answer not available")

## Other Import Scripts

**Note:** The `src/seed/import-all-markdown-articles.ts` script already had the `textToLexical()` function and was applying it correctly. Only the API route needed fixing.

## Files Modified

1. ✅ `src/app/api/import-articles/route.ts`
   - Added `textToLexical()` helper function
   - Applied to `whoDoesThisApplyTo`, `stepDescription`, and `faqs.answer`

2. ✅ `src/app/(frontend)/articles/[slug]/page.tsx`
   - Updated FAQ answer rendering to loop through paragraphs
   - Properly extracts text from Lexical structure

## Status

✅ **Fixed and Tested**

- No linter errors
- Rich text fields now stored in correct format
- Frontend properly renders multi-paragraph content
- Compatible with PayloadCMS rich text editor

