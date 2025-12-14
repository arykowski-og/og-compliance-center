# Payload CMS User Guide

> Complete guide for managing content in OpenGov Compliance Center

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Managing States](#managing-states)
3. [Creating Articles](#creating-articles)
4. [Building Pages](#building-pages)
5. [Media Library](#media-library)
6. [User Management](#user-management)
7. [Best Practices](#best-practices)

---

## Getting Started

### Accessing the Admin Panel

1. Navigate to `/admin` on your site
2. Login with your credentials
3. You'll see the main dashboard

### Dashboard Overview

The dashboard shows:
- Recent activity
- Quick actions
- Collection shortcuts
- Media uploads

---

## Managing States

### Viewing States

1. Click "States" in the sidebar
2. See all 50 US states
3. Filter by status (Draft/Published)
4. Search by name or abbreviation

### Editing a State

1. Click on any state to edit
2. You'll see 5 tabs:
   - **Overview**
   - **Financial Management**
   - **Budgeting & Planning**
   - **Procurement**
   - **Resources**

### Overview Tab

#### Hero Section
- **Title:** Main heading for the state page
- **Subtitle:** Supporting text (2-3 sentences)
- **Last Updated:** Date of last content update

#### Quick Stats
Add up to 4 key statistics:
- **Label:** What the stat represents
- **Value:** The number or metric
- **Icon:** Emoji or icon class

**Example:**
```
Label: Local Governments
Value: 500+
Icon: 🏛️
```

### Financial Management Tab

#### Requirements
Use the rich text editor to add:
- GASB standards
- State-specific regulations
- Reporting requirements
- Deadlines and schedules

#### Key Features
Add feature cards:
- **Title:** Feature name
- **Description:** What it does
- **Icon:** Optional emoji/icon

### Budgeting & Planning Tab

Similar structure to Financial Management:
- Requirements (rich text)
- Key Features (array of cards)

### Procurement Tab

Add procurement-specific information:
- Bidding requirements
- Vendor registration
- Approval processes
- Compliance checklists

### Resources Tab

#### Related Articles
Link existing articles from your content library

#### External Resources
Add links to external sites:
- **Title:** Link text
- **URL:** Full URL
- **Description:** What the resource provides

#### Downloadable Resources
Upload PDFs, spreadsheets, etc.:
- **Title:** File name
- **File:** Upload from media library
- **Description:** What's in the file

### Publishing a State

1. Fill in all required fields
2. Set **Status** to "Published"
3. Click "Save"
4. View on frontend: `/states/[slug]`

---

## Creating Articles

### Start a New Article

1. Click "Articles" → "Create New"
2. Fill in basic information

### Article Fields

#### Title & Slug
- **Title:** Main article headline
- **Slug:** URL-friendly version (auto-generated)

Example:
```
Title: Understanding GASB 96
Slug: understanding-gasb-96
URL: /articles/understanding-gasb-96
```

#### Category
Choose one:
- GASB Standards
- Best Practices
- Case Studies
- Regulatory Updates
- Technology

#### Excerpt
Write a 1-2 sentence summary (max 200 characters)
This appears in article listings.

#### Content
Use the rich text editor to write your article:

**Formatting Options:**
- Headings (H2, H3, H4)
- Bold, italic, underline
- Bullet lists, numbered lists
- Block quotes
- Links
- Images

**Writing Tips:**
1. Start with a strong opening paragraph
2. Use headings to break up content
3. Add images to illustrate points
4. Link to related states and articles
5. End with actionable takeaways

#### Featured Image
Upload a cover image:
- Recommended size: 1200×630px
- Formats: JPG, PNG, WebP
- Max size: 2MB

#### Related States
Link states this article applies to:
- Click "Add Relationship"
- Select one or more states
- They'll appear on both pages

#### Tags
Add relevant tags for organization:
- gasb-96
- subscription-based
- financial-reporting
- etc.

#### SEO Section
Optimize for search engines:
- **Meta Title:** 60 characters max
- **Meta Description:** 160 characters max
- **Keywords:** Comma-separated

### Publishing an Article

1. Fill in all required fields
2. Set **Status** to "Published"
3. Set **Published Date**
4. Click "Save"
5. View at `/articles/[slug]`

---

## Building Pages

### Create a Flexible Page

1. Click "Pages" → "Create New"
2. Add a title and slug
3. Build your page with blocks

### Available Blocks

#### Hero Section
Perfect for page headers:
- **Title:** Main heading
- **Subtitle:** Supporting text
- **CTA Button:** Optional call-to-action
- **Background Image:** Optional hero image

#### Content Block
Rich text editor for standard content:
- Paragraphs
- Headings
- Lists
- Media

#### Features Grid
Showcase key features:
- **Heading:** Section title
- **Features:** Array of feature cards
  - Title
  - Description
  - Icon

#### Call to Action
Prominent CTA section:
- **Heading:** Main message
- **Description:** Supporting text
- **Primary Button:** Main action
- **Secondary Button:** Alternative action

### Building a Page

1. Click "Add Block"
2. Choose block type
3. Fill in content
4. Reorder blocks by dragging
5. Preview as you go

### Example: About Page

```
1. Hero Block
   - Title: "About OpenGov Compliance Center"
   - Subtitle: "Our mission..."

2. Content Block
   - Rich text with mission statement
   - Team photos

3. Features Block
   - Heading: "What We Offer"
   - 3-4 feature cards

4. CTA Block
   - "Ready to Get Started?"
   - Contact Us button
```

---

## Media Library

### Uploading Files

1. Click "Media" → "Upload"
2. Drag & drop or click to browse
3. Supports:
   - Images: JPG, PNG, WebP, SVG
   - Documents: PDF
   - Max size: 10MB per file

### Organizing Media

#### Alt Text
Always add descriptive alt text:
- Describes the image content
- Important for accessibility
- Helps with SEO

**Good Alt Text:**
```
"Chart showing GASB 96 implementation timeline"
```

**Bad Alt Text:**
```
"image.jpg"
```

### Using Media

#### In Articles
1. Place cursor where you want image
2. Click image icon in editor
3. Choose from media library or upload new

#### In Pages
1. Select block with image field
2. Click "Choose from library"
3. Select existing or upload new

### Image Sizes

The system auto-generates:
- **Thumbnail:** 400×300px
- **Card:** 768×1024px
- **Tablet:** 1024px wide
- **Desktop:** 1920px wide

---

## User Management

### User Roles

#### Admin
Full access to:
- All collections
- All settings
- User management
- Can delete content

#### Editor
Can:
- Create and edit all content
- Upload media
- Publish content
- Cannot manage users

#### Viewer
Can only:
- View published content
- No editing capabilities

### Adding Users

1. Click "Users" → "Create New"
2. Fill in:
   - **Name:** Full name
   - **Email:** Login email
   - **Password:** Temporary password
   - **Role:** Select appropriate role
3. Click "Save"
4. New user receives email to set password

### Managing Users

#### Edit User
- Update name, email
- Change role
- Reset password

#### Delete User
- Only Admins can delete
- Cannot delete yourself
- Confirm deletion

---

## Best Practices

### Content Strategy

#### States
- Update quarterly
- Keep requirements current
- Link to official sources
- Add downloadable checklists

#### Articles
- Publish weekly or bi-weekly
- Focus on timely topics
- Link related content
- Use clear, concise language

#### Media
- Optimize images before upload
- Use descriptive filenames
- Always add alt text
- Keep file sizes under 2MB

### SEO Optimization

#### Every Page Should Have:
- Unique meta title
- Compelling meta description
- Relevant keywords
- Internal links

#### Article SEO:
- Title includes main keyword
- Excerpt is engaging
- Content is 800+ words
- Links to related content
- Images have alt text

### Accessibility

#### Writing:
- Use clear headings hierarchy (H2 → H3 → H4)
- Keep paragraphs short (3-5 sentences)
- Use bullet points for lists
- Write in active voice

#### Images:
- Always add alt text
- Describe content, not appearance
- Don't say "image of" or "picture of"

#### Links:
- Use descriptive link text
- Don't use "click here"
- Indicate external links

### Workflow

#### Before Publishing:
- [ ] Content is complete
- [ ] Spelling and grammar checked
- [ ] Links tested
- [ ] Images optimized
- [ ] SEO fields filled
- [ ] Preview reviewed
- [ ] Stakeholders approved

#### After Publishing:
- [ ] Test live page
- [ ] Share on social media
- [ ] Monitor analytics
- [ ] Respond to comments
- [ ] Update as needed

---

## Keyboard Shortcuts

In the admin panel:
- `Cmd/Ctrl + S` - Save
- `Cmd/Ctrl + P` - Preview
- `Cmd/Ctrl + K` - Insert link
- `Cmd/Ctrl + B` - Bold
- `Cmd/Ctrl + I` - Italic

In the rich text editor:
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Shift + Z` - Redo
- `Cmd/Ctrl + A` - Select all

---

## Common Tasks

### Update State Information

1. Go to States collection
2. Find and click state
3. Navigate to relevant tab
4. Update content
5. Save
6. Changes appear immediately

### Add New Article

1. Articles → Create New
2. Write title (slug auto-generates)
3. Choose category
4. Write excerpt
5. Add content with editor
6. Upload featured image
7. Link related states
8. Set to Published
9. Save

### Upload Multiple Images

1. Media → Upload
2. Select multiple files
3. Upload all at once
4. Edit each to add alt text
5. Use in content

### Create Landing Page

1. Pages → Create New
2. Add Hero block (headline, CTA)
3. Add Features block (key benefits)
4. Add Content blocks (details)
5. Add CTA block (conversion)
6. Set to Published
7. Share URL

---

## Troubleshooting

### Can't Upload Images
- Check file size (max 10MB)
- Verify format (JPG, PNG, WebP)
- Try different browser
- Clear cache

### Changes Not Appearing
- Refresh the page
- Clear browser cache
- Check page is Published
- Verify slug is correct

### Rich Text Editor Issues
- Try different browser
- Disable browser extensions
- Clear editor and re-type
- Copy/paste as plain text

---

## Getting Help

### Resources
- **This Guide:** Reference for common tasks
- **Payload Docs:** https://payloadcms.com/docs
- **Video Tutorials:** [Your training videos]
- **Support Email:** support@yourdomain.com

### Reporting Issues
1. Note what you were doing
2. Take screenshot if relevant
3. Email support with details
4. Include browser and OS version

---

**Happy content managing! 🎉**

*Document Version: 1.0*  
*Last Updated: December 14, 2025*
