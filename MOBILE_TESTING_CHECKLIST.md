# Mobile Layout Testing Checklist

## Testing Instructions

### Quick Test (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl/Cmd + Shift + M)
3. Test at these widths: 375px, 390px, 768px
4. Check each page below

## Pages to Test

### ✅ Homepage (/)
- [ ] Hero title doesn't wrap awkwardly
- [ ] State selector dropdown is full width
- [ ] "Get Started" button is full width
- [ ] Topic cards stack vertically
- [ ] Topic names wrap properly (e.g., "Procurement & Purchasing")
- [ ] Step cards display in single column
- [ ] Stats display in 2 columns
- [ ] "Request a Demo" button is full width
- [ ] No horizontal scrolling

### ✅ State Profile (/states/arizona)
- [ ] State title "Arizona" displays properly
- [ ] "Subscribe to Updates" button is full width and wraps if needed
- [ ] Category cards stack vertically
- [ ] Category names wrap properly:
  - [ ] "Financial Management"
  - [ ] "Procurement & Purchasing"
  - [ ] "Open Government & Transparency"
  - [ ] "Community Development & Permitting" (longest name)
- [ ] Article count and update date don't break awkwardly
- [ ] "12 articles • Updated Jan 15, 2025" wraps properly
- [ ] Expand buttons (+/−) stay on right side
- [ ] Sidebar appears below main content on mobile
- [ ] Quick Reference card text wraps properly
- [ ] Fiscal year information is readable
- [ ] No text overflows container

### ✅ States List (/states)
- [ ] Hero title displays properly
- [ ] State cards display in responsive grid
- [ ] State names don't wrap awkwardly
- [ ] State abbreviations display properly

### ✅ Articles (/articles)
- [ ] Search bar is full width
- [ ] Filters display properly
- [ ] Article cards stack vertically
- [ ] Article titles wrap properly
- [ ] Badges wrap without breaking layout

### ✅ Products (/products/financial)
- [ ] Hero section displays properly
- [ ] "Request a Demo" button is full width
- [ ] Feature cards stack vertically
- [ ] Feature titles wrap properly

## Specific Elements to Check

### Typography
- [ ] No text extends beyond container
- [ ] Headings break at appropriate points
- [ ] Long words use hyphenation when needed
- [ ] Line heights are comfortable to read

### Buttons
- [ ] All buttons are full width on mobile
- [ ] Button text wraps if needed
- [ ] Buttons have adequate touch targets (44x44px minimum)
- [ ] Button text is centered

### Cards & Containers
- [ ] Cards don't overflow
- [ ] Padding is consistent
- [ ] Gaps between elements are appropriate
- [ ] Border radius looks good at all sizes

### Navigation
- [ ] Header logo is visible
- [ ] Navigation is hidden/collapsed on mobile (as expected)
- [ ] Footer stacks properly
- [ ] Footer links are readable

## Breakpoint Testing

### 480px (Small Phone)
- [ ] All text is readable
- [ ] Buttons are touchable
- [ ] No horizontal overflow

### 768px (Tablet)
- [ ] Layout transitions properly
- [ ] Sidebars reposition correctly
- [ ] Grid layouts adjust appropriately

## Browser Testing (if available)

### iOS Safari
- [ ] All pages render correctly
- [ ] Touch targets work properly
- [ ] Font sizes are comfortable

### Chrome Mobile
- [ ] All pages render correctly
- [ ] Touch targets work properly

### Samsung Internet
- [ ] All pages render correctly
- [ ] Touch targets work properly

## Known Issues to Verify Fixed

### Primary Issue: Word Wrapping
- [x] Category name "Community Development & Permitting" wraps properly
- [x] "12 articles • Updated Jan 15, 2025" doesn't break awkwardly
- [x] Button text "Subscribe to Updates" wraps if needed
- [x] All long text uses proper word breaking
- [x] No awkward mid-word breaks (unless hyphenated)

## Testing URLs
- Homepage: http://127.0.0.1:3000/
- Arizona State: http://127.0.0.1:3000/states/arizona
- Colorado State: http://127.0.0.1:3000/states/colorado
- States List: http://127.0.0.1:3000/states
- Articles: http://127.0.0.1:3000/articles
- Products: http://127.0.0.1:3000/products/financial

## Chrome DevTools Shortcuts
- Toggle device toolbar: `Ctrl/Cmd + Shift + M`
- Refresh page: `Ctrl/Cmd + R`
- Hard refresh: `Ctrl/Cmd + Shift + R`
- Screenshot: Click "..." menu → "Capture screenshot"

## Success Criteria
✅ All checkboxes above are checked
✅ No horizontal scrolling on any page
✅ All text is readable without zooming
✅ All interactive elements are easily tappable
✅ Layout looks professional and polished
✅ No content extends beyond viewport
