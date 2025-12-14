# System Architecture Documentation

> Comprehensive technical architecture for OpenGov Compliance Center

**Version:** 1.0  
**Last Updated:** December 14, 2025  
**Application:** OpenGov Compliance Center  
**Stack:** Next.js 15 + PayloadCMS 3.0 + PostgreSQL

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [High-Level Architecture](#high-level-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Database Architecture](#database-architecture)
8. [API Architecture](#api-architecture)
9. [Authentication & Authorization](#authentication--authorization)
10. [Data Flow Architecture](#data-flow-architecture)
11. [Caching Strategy](#caching-strategy)
12. [Deployment Architecture](#deployment-architecture)
13. [Integration Architecture](#integration-architecture)
14. [Security Architecture](#security-architecture)
15. [Performance Optimization](#performance-optimization)
16. [Scalability Considerations](#scalability-considerations)
17. [Development Workflow](#development-workflow)
18. [Testing Strategy](#testing-strategy)
19. [Monitoring & Observability](#monitoring--observability)
20. [Disaster Recovery](#disaster-recovery)

---

## Executive Summary

The OpenGov Compliance Center is a modern, full-stack web application built with Next.js 15 (App Router), PayloadCMS 3.0, and PostgreSQL. The architecture follows a **server-first approach** leveraging React Server Components for optimal performance, with a headless CMS for content management, and deployment on Vercel's edge network.

### Key Architectural Decisions

| Decision | Technology | Rationale |
|----------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | Modern React framework with server components, excellent performance, SEO-friendly, fast development |
| **CMS** | PayloadCMS 3.0 | TypeScript-native, flexible, excellent DX, self-hosted, no vendor lock-in |
| **Database** | PostgreSQL 14+ | Reliable, ACID-compliant, supports full-text search, JSON support, proven at scale |
| **Hosting** | Vercel | Zero-config deployment, edge network, automatic scaling, excellent Next.js integration |
| **Language** | TypeScript | Type safety, better DX, fewer runtime errors, excellent tooling |
| **Styling** | CSS (Custom) | Full control, optimal performance, no framework overhead, progressive enhancement |

### Architecture Principles

1. **Server-First**: Leverage React Server Components for data fetching and rendering
2. **Progressive Enhancement**: Core functionality works without JavaScript
3. **Type Safety**: End-to-end TypeScript from database to UI
4. **Performance**: Optimize for Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
5. **Security**: Defense in depth with multiple security layers
6. **Accessibility**: WCAG 2.1 AA compliance throughout
7. **Scalability**: Horizontal scaling with stateless architecture
8. **Maintainability**: Clear separation of concerns, consistent patterns

---

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end
    
    subgraph "Edge Network - Vercel CDN"
        Edge[Edge Functions]
        StaticAssets[Static Assets Cache]
    end
    
    subgraph "Application Layer - Vercel"
        NextApp[Next.js 15 App]
        
        subgraph "Frontend Routes"
            PublicPages[Public Pages<br/>/, /states, /articles]
            ServerComponents[React Server Components]
            ClientComponents[React Client Components]
        end
        
        subgraph "Backend Routes"
            PayloadAdmin[Payload Admin<br/>/admin]
            PayloadAPI[Payload API<br/>/api]
            CustomAPI[Custom API Routes]
        end
    end
    
    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL Database)]
        MediaStorage[Media Storage<br/>Vercel Blob / S3]
    end
    
    subgraph "External Services"
        Email[Email Service<br/>SendGrid / SES]
        Analytics[Analytics<br/>GA4 / Vercel Analytics]
        Monitoring[Error Tracking<br/>Sentry]
        Search[Search Engine<br/>PostgreSQL FTS → Algolia]
    end
    
    Browser --> Edge
    Mobile --> Edge
    Edge --> StaticAssets
    Edge --> NextApp
    
    NextApp --> PublicPages
    NextApp --> PayloadAdmin
    NextApp --> PayloadAPI
    
    ServerComponents --> PayloadAPI
    ClientComponents --> CustomAPI
    
    PayloadAPI --> PostgreSQL
    CustomAPI --> PostgreSQL
    PayloadAdmin --> PostgreSQL
    
    PayloadAPI --> MediaStorage
    CustomAPI --> Email
    NextApp --> Analytics
    NextApp --> Monitoring
    PayloadAPI --> Search
    
    style NextApp fill:#0052CC,color:#fff
    style PostgreSQL fill:#336791,color:#fff
    style Edge fill:#00B8D4,color:#fff
```

### Architecture Layers

1. **Client Layer**: Web browsers (desktop, mobile, tablet)
2. **Edge Layer**: Vercel's global CDN with edge functions
3. **Application Layer**: Next.js application with frontend and backend routes
4. **Data Layer**: PostgreSQL database and media storage
5. **External Services**: Third-party integrations

---

## Technology Stack

### Core Technologies

```typescript
// package.json - Core Dependencies
{
  "dependencies": {
    // Framework & React
    "next": "^15.0.0",                    // Next.js App Router
    "react": "^19.0.0",                   // React 19 (Server Components)
    "react-dom": "^19.0.0",
    
    // CMS & Database
    "payload": "^3.0.0",                  // Headless CMS
    "@payloadcms/next": "^3.0.0",         // Next.js integration
    "@payloadcms/db-postgres": "^3.0.0",  // PostgreSQL adapter
    "@payloadcms/richtext-lexical": "^3.0.0", // Rich text editor
    "@payloadcms/ui": "^3.0.0",           // Admin UI components
    
    // Utilities
    "graphql": "^16.8.1",                 // GraphQL support
    "sharp": "^0.33.5",                   // Image processing
    "cross-env": "^7.0.3"                 // Cross-platform env vars
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "@types/node": "^22.5.5",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "tsx": "^4.19.2"                      // TypeScript runner for scripts
  },
  "engines": {
    "node": ">=18.0.0"                    // Node.js 18+ required
  }
}
```

### Technology Rationale

#### Next.js 15 (App Router)
- **Server Components**: Reduced JavaScript bundle size, faster initial page loads
- **Streaming SSR**: Progressive rendering for better perceived performance
- **Automatic Code Splitting**: Optimal bundle sizes per route
- **Built-in Optimization**: Image optimization, font optimization, script optimization
- **SEO-Friendly**: Automatic sitemap, robots.txt, metadata API
- **Developer Experience**: Fast Refresh, TypeScript support, excellent tooling

#### PayloadCMS 3.0
- **TypeScript-Native**: Full type safety from CMS to frontend
- **Self-Hosted**: No vendor lock-in, full data control
- **Flexible Schema**: Complex content structures with relationships
- **Admin UI**: Beautiful, customizable admin interface
- **Access Control**: Granular permissions system
- **Hooks & Plugins**: Extensible architecture
- **GraphQL + REST**: Dual API support
- **Version Control**: Built-in content versioning

#### PostgreSQL
- **ACID Compliance**: Data integrity guaranteed
- **Full-Text Search**: Built-in search capabilities (transitioning to Algolia for scale)
- **JSON Support**: Flexible schema for dynamic content
- **Robust**: Proven reliability over 30+ years
- **Extensions**: PostGIS, pg_trgm for advanced features
- **Performance**: Excellent query optimization, indexing
- **Scalability**: Read replicas, connection pooling

#### Vercel
- **Zero-Config Deployment**: Git push to deploy
- **Edge Network**: Global CDN with 300+ edge locations
- **Serverless Functions**: Auto-scaling API routes
- **Edge Functions**: Ultra-low latency computation
- **Preview Deployments**: Automatic preview URLs for PRs
- **Analytics**: Built-in performance monitoring
- **DDoS Protection**: Automatic threat mitigation

### Version Strategy

```typescript
// Semantic Versioning Strategy
{
  "next": "^15.0.0",        // Major: Latest stable with App Router
  "react": "^19.0.0",       // Major: React 19 with Server Components
  "payload": "^3.0.0",      // Major: Latest stable v3
  "typescript": "^5.6.2"    // Minor: Latest 5.x
}

// Update Policy:
// - Major: Review breaking changes, test thoroughly, update quarterly
// - Minor: Update monthly with careful testing
// - Patch: Update weekly for security fixes
```

---

## Project Structure

```
og-compliance-center/
├── .next/                          # Next.js build output (generated)
├── node_modules/                   # Dependencies (generated)
├── public/                         # Static assets
│   ├── icons/                      # OpenGov product icons (SVG)
│   ├── logos/                      # Brand logos
│   ├── media/                      # Uploaded media (via CMS)
│   └── states/                     # State outline SVGs
│       ├── outline/                # Outline versions
│       └── solid/                  # Filled versions
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (frontend)/             # Public-facing routes
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── articles/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx    # Article detail page
│   │   │   │   └── page.tsx        # Articles list page
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── states/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx    # State detail page
│   │   │   │   └── page.tsx        # States map page
│   │   │   ├── layout.tsx          # Frontend layout (Header + Footer)
│   │   │   └── page.tsx            # Homepage
│   │   ├── (payload)/              # CMS routes
│   │   │   ├── admin/
│   │   │   │   └── [[...segments]]/
│   │   │   │       └── page.tsx    # Payload admin UI
│   │   │   ├── api/
│   │   │   │   └── [...slug]/
│   │   │   │       └── route.ts    # Payload API routes
│   │   │   └── layout.tsx          # Payload layout
│   │   ├── globals.css             # Global styles
│   │   └── layout.tsx              # Root layout
│   ├── collections/                # Payload CMS collections
│   │   ├── Articles.ts             # Articles collection schema
│   │   ├── Media.ts                # Media/uploads schema
│   │   ├── Pages.ts                # Dynamic pages schema
│   │   ├── States.ts               # States collection schema
│   │   └── Users.ts                # Users/auth schema
│   ├── components/                 # React components
│   │   ├── Footer.tsx              # Site footer
│   │   ├── Header.tsx              # Site header/navigation
│   │   ├── Icon.tsx                # Icon component
│   │   └── StateMap.tsx            # Interactive state map
│   ├── seed/                       # Database seeding
│   │   └── index.ts                # Seed script
│   ├── payload.config.ts           # Payload CMS configuration
│   └── payload-types.ts            # Generated TypeScript types
├── docs/                           # Documentation
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── SYSTEM_ARCHITECTURE.md      # This file
│   ├── UX_STRATEGY_COMPLETE.md
│   └── VERCEL_DEPLOYMENT.md
├── .env.local                      # Local environment variables
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
└── vercel.json                     # Vercel deployment config
```

### Directory Patterns

#### Route Groups `(folder)`
- Routes in `(frontend)` and `(payload)` are grouped but don't affect URL structure
- Example: `/src/app/(frontend)/page.tsx` → URL: `/`
- Example: `/src/app/(payload)/admin/page.tsx` → URL: `/admin`

#### Dynamic Routes `[param]`
- `[slug]` captures single path segment
- Example: `/states/[slug]` → `/states/colorado`

#### Catch-All Routes `[...slug]`
- Catches all path segments
- Example: `/api/[...slug]` → `/api/states/find`, `/api/states/1/relationships`

#### Co-located Files
- `layout.tsx` - Shared layout for route segment and children
- `page.tsx` - Route UI (renders at segment URL)
- `loading.tsx` - Loading UI (Suspense boundary)
- `error.tsx` - Error UI (Error boundary)
- `not-found.tsx` - 404 UI

---

## Frontend Architecture

### React Server Components Strategy

```mermaid
graph TD
    subgraph "Server Components (Default)"
        Layout[Layout Components]
        StaticPages[Static Pages<br/>Homepage, About]
        DataFetchPages[Data-Fetching Pages<br/>States, Articles]
        SEO[SEO Components<br/>Metadata]
    end
    
    subgraph "Client Components ('use client')"
        Interactive[Interactive UI<br/>Search, Filters]
        Forms[Forms<br/>Contact, Subscriptions]
        StateManagement[State Management<br/>React Context/Hooks]
        ThirdParty[Third-Party<br/>Analytics, Maps]
    end
    
    Layout --> DataFetchPages
    DataFetchPages --> Interactive
    DataFetchPages --> Forms
    
    style Layout fill:#00B8D4,color:#fff
    style Interactive fill:#FF6B35,color:#fff
```

### Server vs Client Components Decision Matrix

| Feature | Use Server Component | Use Client Component |
|---------|---------------------|---------------------|
| **Data Fetching** | ✅ Yes (async/await) | ❌ No (use API routes) |
| **Access Backend** | ✅ Yes (direct DB access) | ❌ No (security risk) |
| **Event Listeners** | ❌ No (onClick, onChange) | ✅ Yes |
| **React Hooks** | ❌ No (useState, useEffect) | ✅ Yes |
| **Browser APIs** | ❌ No (localStorage, window) | ✅ Yes |
| **SEO** | ✅ Yes (fully rendered) | ⚠️ Partial (client-side) |
| **Bundle Size** | ✅ Zero JS shipped | ❌ Adds to bundle |
| **Performance** | ✅ Faster initial load | ⚠️ Slower initial load |

### Component Architecture

```typescript
// Server Component Example (default)
// src/app/(frontend)/states/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function StatesPage() {
  const payload = await getPayload({ config })
  
  // Direct database access on server
  const states = await payload.find({
    collection: 'states',
    where: {
      status: { equals: 'published' }
    },
    sort: 'name'
  })
  
  return (
    <div>
      <h1>State Compliance Guides</h1>
      <StateGrid states={states.docs} />
    </div>
  )
}

// Client Component Example
// src/components/StateMap.tsx
'use client'

import { useState } from 'react'

export function StateMap({ states }) {
  const [selectedState, setSelectedState] = useState(null)
  
  return (
    <svg onClick={(e) => setSelectedState(e.target.id)}>
      {/* Interactive map */}
    </svg>
  )
}
```

### Data Fetching Patterns

#### 1. Server-Side Rendering (SSR)
```typescript
// Dynamic data, fetched on each request
// src/app/(frontend)/states/[slug]/page.tsx

export default async function StatePage({ params }) {
  const { slug } = params
  
  const payload = await getPayload({ config })
  const state = await payload.find({
    collection: 'states',
    where: { slug: { equals: slug } }
  })
  
  return <StateDetail state={state.docs[0]} />
}

// Force dynamic rendering (disable caching)
export const dynamic = 'force-dynamic'
```

#### 2. Static Site Generation (SSG)
```typescript
// Static data, generated at build time
// src/app/(frontend)/articles/page.tsx

export default async function ArticlesPage() {
  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } }
  })
  
  return <ArticlesList articles={articles.docs} />
}

// Force static generation
export const dynamic = 'force-static'
```

#### 3. Incremental Static Regeneration (ISR)
```typescript
// Static with periodic revalidation
// src/app/(frontend)/states/[slug]/page.tsx

export default async function StatePage({ params }) {
  // ... fetch data
  return <StateDetail />
}

// Revalidate every 60 seconds
export const revalidate = 60

// Generate static paths at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const states = await payload.find({
    collection: 'states',
    limit: 1000
  })
  
  return states.docs.map(state => ({
    slug: state.slug
  }))
}
```

#### 4. Client-Side Fetching (SWR Pattern)
```typescript
'use client'

import useSWR from 'swr'

export function ArticleSearch({ initialData }) {
  const { data, error } = useSWR(
    '/api/articles/search',
    fetcher,
    { fallbackData: initialData }
  )
  
  if (error) return <Error />
  if (!data) return <Loading />
  
  return <SearchResults results={data} />
}
```

### Rendering Strategies by Route

| Route | Strategy | Revalidate | Rationale |
|-------|----------|------------|-----------|
| `/` (Homepage) | ISR | 60s | Semi-static, show recent content |
| `/states` | ISR | 3600s | Rarely changes, can be cached |
| `/states/[slug]` | ISR | 300s | Content updates occasionally |
| `/articles` | ISR | 60s | New content frequently |
| `/articles/[slug]` | SSG | On-demand | Static articles, revalidate on publish |
| `/search` | SSR | No cache | Dynamic search results |
| `/admin` | SSR | No cache | Dynamic admin interface |

### Metadata & SEO

```typescript
// Generate metadata for each page
// src/app/(frontend)/states/[slug]/page.tsx

import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = params
  const state = await getState(slug)
  
  return {
    title: `${state.name} Compliance Guide | OpenGov`,
    description: state.hero.subtitle,
    openGraph: {
      title: state.name,
      description: state.hero.subtitle,
      type: 'website',
      url: `https://compliance.opengov.com/states/${slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: state.name,
      description: state.hero.subtitle
    },
    alternates: {
      canonical: `/states/${slug}`
    }
  }
}
```

---

## Backend Architecture

### PayloadCMS Configuration

```typescript
// src/payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- OpenGov Compliance Center',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png'
    },
    // Customize admin UI
    components: {
      // Custom branding, dashboard widgets
    }
  },
  
  // Collections (content types)
  collections: [
    Users,      // User accounts
    States,     // State compliance data
    Articles,   // Blog articles/resources
    Pages,      // Dynamic pages
    Media       // File uploads
  ],
  
  // Rich text editor
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Add custom features
    ]
  }),
  
  // Secret key for JWT
  secret: process.env.PAYLOAD_SECRET || '',
  
  // TypeScript generation
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  
  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL
    },
    // Enable migrations
    migrationDir: path.resolve(dirname, 'migrations')
  }),
  
  // Image processing
  sharp,
  
  // Plugins
  plugins: [
    // SEO plugin, redirects, etc.
  ],
  
  // CORS configuration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  ],
  
  // Rate limiting
  rateLimit: {
    trustProxy: true,
    max: 100, // requests per window
    window: 15 * 60 * 1000 // 15 minutes
  }
})
```

### Collection Schemas

#### States Collection
```typescript
// src/collections/States.ts
export const States: CollectionConfig = {
  slug: 'states',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbreviation', 'status', 'updatedAt'],
    group: 'Content'
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => !!user, // Authenticated write
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true, // Database index for performance
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name.toLowerCase().replace(/\s+/g, '-')
            }
            return value
          }
        ]
      }
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: ['draft', 'published']
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [/* ... */]
        },
        {
          label: 'Financial Management',
          fields: [/* ... */]
        },
        // More tabs
      ]
    }
  ],
  hooks: {
    // After change, revalidate frontend cache
    afterChange: [
      async ({ doc }) => {
        // Revalidate paths
        await revalidatePath(`/states/${doc.slug}`)
      }
    ]
  }
}
```

### Access Control Patterns

```typescript
// Collection-level access control
export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    // Read: Public can see published, authenticated can see all
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: { equals: 'published' }
      }
    },
    
    // Create: Authenticated users only
    create: ({ req: { user } }) => !!user,
    
    // Update: Authors and admins
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      // Authors can update their own articles
      return {
        author: { equals: user.id }
      }
    },
    
    // Delete: Admins only
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    }
  }
}

// Field-level access control
fields: [
  {
    name: 'internalNotes',
    type: 'textarea',
    access: {
      // Only admins can read internal notes
      read: ({ req: { user } }) => user?.role === 'admin',
      update: ({ req: { user } }) => user?.role === 'admin'
    }
  }
]
```

### Hooks & Lifecycle

```typescript
// Collection hooks
export const States: CollectionConfig = {
  hooks: {
    // Before operations
    beforeValidate: [
      ({ data, operation }) => {
        // Modify data before validation
        return data
      }
    ],
    beforeChange: [
      ({ data, operation }) => {
        // Modify data before save
        return data
      }
    ],
    
    // After operations
    afterChange: [
      async ({ doc, operation }) => {
        // Send notifications, update cache, etc.
        if (operation === 'create') {
          await sendNotification(doc)
        }
      }
    ],
    afterRead: [
      ({ doc }) => {
        // Transform data after read
        return doc
      }
    ],
    
    // Delete operations
    beforeDelete: [
      async ({ req, id }) => {
        // Prevent deletion or cleanup related data
      }
    ],
    afterDelete: [
      async ({ req, id, doc }) => {
        // Cleanup after deletion
      }
    ]
  }
}
```

---

## Database Architecture

### PostgreSQL Schema

PayloadCMS automatically generates tables based on collections:

```sql
-- Auto-generated by Payload
-- Core tables

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- States table
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  abbreviation VARCHAR(2) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  hero JSONB,
  quick_stats JSONB,
  financial_management JSONB,
  budgeting JSONB,
  procurement JSONB,
  related_articles JSONB,
  external_resources JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  _status VARCHAR(50) DEFAULT 'draft'
);

CREATE INDEX idx_states_slug ON states(slug);
CREATE INDEX idx_states_status ON states(status);
CREATE INDEX idx_states_abbreviation ON states(abbreviation);
CREATE INDEX idx_states_name ON states(name);

-- Full-text search index
CREATE INDEX idx_states_search ON states 
  USING gin(to_tsvector('english', name || ' ' || COALESCE(hero->>'title', '')));

-- Articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  published_date TIMESTAMP,
  author_id INTEGER REFERENCES users(id),
  category VARCHAR(100),
  featured_image_id INTEGER REFERENCES media(id),
  excerpt TEXT,
  content JSONB,
  tags JSONB,
  seo JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_published ON articles(published_date);

-- Full-text search
CREATE INDEX idx_articles_search ON articles 
  USING gin(to_tsvector('english', title || ' ' || excerpt));

-- Articles <-> States relationship (many-to-many)
CREATE TABLE articles_related_states (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  order INTEGER,
  UNIQUE(article_id, state_id)
);

CREATE INDEX idx_ars_article ON articles_related_states(article_id);
CREATE INDEX idx_ars_state ON articles_related_states(state_id);

-- Media table
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100),
  filesize INTEGER,
  width INTEGER,
  height INTEGER,
  alt TEXT,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_filename ON media(filename);
CREATE INDEX idx_media_mime ON media(mime_type);

-- Pages table (dynamic pages)
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  content JSONB,
  seo JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);

-- Session table (for authentication)
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Versions table (content versioning)
CREATE TABLE versions (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER NOT NULL,
  parent_collection VARCHAR(100) NOT NULL,
  version JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_versions_parent ON versions(parent_id, parent_collection);
```

### Query Optimization

```typescript
// Use database indexes for common queries
// PayloadCMS automatically creates indexes for:
// - unique fields
// - fields with index: true
// - relationship fields

// Optimize queries with field selection
const states = await payload.find({
  collection: 'states',
  where: { status: { equals: 'published' } },
  limit: 50,
  // Only fetch needed fields (reduces payload size)
  select: {
    name: true,
    slug: true,
    abbreviation: true,
    hero: true
  }
})

// Use pagination for large datasets
const articles = await payload.find({
  collection: 'articles',
  page: 1,
  limit: 20,
  sort: '-publishedDate'
})

// Optimize relationship queries
const state = await payload.findByID({
  collection: 'states',
  id: stateId,
  depth: 2 // Limit relationship depth to avoid over-fetching
})
```

### Database Migrations

```typescript
// Payload generates migrations automatically
// Run migrations on deploy

// Create migration
npm run payload migrate:create

// Generated migration file
// migrations/20231214_120000.ts
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE states ADD COLUMN new_field VARCHAR(255);
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE states DROP COLUMN new_field;
  `)
}
```

---

## API Architecture

### API Layers

```mermaid
graph LR
    subgraph "Client"
        Browser[Browser]
    end
    
    subgraph "API Layer"
        NextAPI[Next.js API Routes<br/>/api/custom/*]
        PayloadAPI[Payload API<br/>/api/states, /api/articles]
        PayloadGraphQL[GraphQL API<br/>/api/graphql]
    end
    
    subgraph "Business Logic"
        Payload[Payload CMS Core]
        CustomLogic[Custom Services]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
    end
    
    Browser --> NextAPI
    Browser --> PayloadAPI
    Browser --> PayloadGraphQL
    
    NextAPI --> CustomLogic
    PayloadAPI --> Payload
    PayloadGraphQL --> Payload
    
    Payload --> DB
    CustomLogic --> DB
```

### Payload REST API

PayloadCMS automatically generates REST endpoints:

```typescript
// Auto-generated REST API endpoints

// States Collection
GET    /api/states              // Find many
GET    /api/states/:id          // Find by ID
POST   /api/states              // Create
PATCH  /api/states/:id          // Update
DELETE /api/states/:id          // Delete
GET    /api/states/count        // Count documents

// With query parameters
GET /api/states?where[status][equals]=published
GET /api/states?limit=10&page=2
GET /api/states?sort=-updatedAt
GET /api/states?depth=2  // Populate relationships

// Articles Collection
GET    /api/articles
GET    /api/articles/:id
POST   /api/articles
PATCH  /api/articles/:id
DELETE /api/articles/:id

// Media Collection (file uploads)
POST   /api/media              // Upload file
GET    /api/media/:id          // Get file metadata
DELETE /api/media/:id          // Delete file

// Authentication
POST   /api/users/login        // Login
POST   /api/users/logout       // Logout
GET    /api/users/me           // Current user
POST   /api/users/refresh      // Refresh token
POST   /api/users/forgot-password
POST   /api/users/reset-password
```

### Custom API Routes

```typescript
// src/app/api/search/route.ts
// Custom search endpoint with advanced filtering

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const state = searchParams.get('state')
  const category = searchParams.get('category')
  
  const payload = await getPayload({ config })
  
  // Build complex query
  const where: any = {}
  
  if (query) {
    where.or = [
      { title: { contains: query } },
      { excerpt: { contains: query } }
    ]
  }
  
  if (state) {
    where['relatedStates'] = { equals: state }
  }
  
  if (category) {
    where.category = { equals: category }
  }
  
  const results = await payload.find({
    collection: 'articles',
    where,
    limit: 20,
    sort: '-publishedDate'
  })
  
  return NextResponse.json(results)
}

// Rate limiting
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
```

### GraphQL API

```typescript
// Auto-generated GraphQL endpoint: /api/graphql

// Example queries
query GetStates {
  States(where: { status: { equals: published } }, limit: 50) {
    docs {
      id
      name
      slug
      abbreviation
      hero {
        title
        subtitle
      }
    }
    totalDocs
    limit
    page
  }
}

query GetStateBySlug($slug: String!) {
  States(where: { slug: { equals: $slug } }) {
    docs {
      id
      name
      slug
      hero {
        title
        subtitle
        lastUpdated
      }
      financialManagement {
        requirements
        keyFeatures {
          title
          description
        }
      }
    }
  }
}

mutation CreateArticle($data: mutationArticleInput!) {
  createArticle(data: $data) {
    id
    title
    slug
    status
  }
}
```

### API Security

```typescript
// Rate limiting (built into Payload)
rateLimit: {
  trustProxy: true,
  max: 100,
  window: 15 * 60 * 1000
}

// CORS configuration
cors: [
  process.env.NEXT_PUBLIC_SERVER_URL,
  'https://compliance.opengov.com'
]

// Authentication required
access: {
  read: () => true,  // Public
  create: ({ req: { user } }) => !!user,  // Authenticated
  update: ({ req: { user } }) => !!user,
  delete: ({ req: { user } }) => user?.role === 'admin'
}

// Input validation (automatic with Payload schema)
fields: [
  {
    name: 'email',
    type: 'email',  // Validates email format
    required: true
  },
  {
    name: 'age',
    type: 'number',
    min: 0,
    max: 150
  }
]
```

---

## Authentication & Authorization

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Payload
    participant DB
    
    User->>Frontend: Enter credentials
    Frontend->>API: POST /api/users/login
    API->>Payload: Authenticate
    Payload->>DB: Verify credentials
    DB-->>Payload: User data
    Payload-->>API: JWT token
    API-->>Frontend: Set cookie + token
    Frontend-->>User: Redirect to dashboard
    
    User->>Frontend: Access protected page
    Frontend->>API: GET /api/users/me (with cookie)
    API->>Payload: Verify JWT
    Payload-->>API: User data
    API-->>Frontend: User object
    Frontend-->>User: Show protected content
```

### User Schema

```typescript
// src/collections/Users.ts
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: true,          // Email verification
    maxLoginAttempts: 5,
    lockTime: 600 * 1000   // 10 minutes lockout
  },
  admin: {
    useAsTitle: 'email'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' }
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin'
      }
    },
    {
      name: 'organization',
      type: 'text'
    },
    {
      name: 'states',
      type: 'relationship',
      relationTo: 'states',
      hasMany: true,
      label: 'Monitored States'
    }
  ]
}
```

### Authorization Patterns

```typescript
// Role-based access control (RBAC)
const checkRole = (user: User | null, allowedRoles: string[]): boolean => {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

// In collection
access: {
  create: ({ req: { user } }) => checkRole(user, ['admin', 'editor']),
  update: ({ req: { user } }) => checkRole(user, ['admin', 'editor']),
  delete: ({ req: { user } }) => checkRole(user, ['admin'])
}

// In API route
export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  
  if (!checkRole(user, ['admin'])) {
    return new Response('Unauthorized', { status: 403 })
  }
  
  // ... proceed
}
```

### Session Management

```typescript
// Cookie-based sessions with JWT
// Configured in payload.config.ts

export default buildConfig({
  collections: [Users],
  admin: {
    user: Users.slug
  },
  
  // Session configuration
  cookiePrefix: 'payload',
  csrf: [
    'http://localhost:3000',
    'https://compliance.opengov.com'
  ],
  
  // Token expiration
  auth: {
    tokenExpiration: 7200,      // 2 hours
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}">Verify email</a>`
      }
    }
  }
})
```

---

## Data Flow Architecture

### Read Operations (Server Component)

```mermaid
sequenceDiagram
    participant User
    participant Vercel Edge
    participant Next.js RSC
    participant Payload
    participant PostgreSQL
    participant Cache
    
    User->>Vercel Edge: GET /states/colorado
    Vercel Edge->>Cache: Check cache
    
    alt Cache hit (ISR)
        Cache-->>User: Return cached HTML
    else Cache miss
        Vercel Edge->>Next.js RSC: Invoke server component
        Next.js RSC->>Payload: Find state by slug
        Payload->>PostgreSQL: SELECT * FROM states WHERE slug = 'colorado'
        PostgreSQL-->>Payload: State data
        Payload-->>Next.js RSC: State object
        Next.js RSC->>Next.js RSC: Render to HTML
        Next.js RSC-->>Cache: Store in cache (60s TTL)
        Next.js RSC-->>User: Return HTML
    end
```

### Write Operations

```mermaid
sequenceDiagram
    participant Admin
    participant Payload Admin
    participant Payload API
    participant PostgreSQL
    participant Next.js
    
    Admin->>Payload Admin: Update state content
    Payload Admin->>Payload API: PATCH /api/states/123
    Payload API->>Payload API: Validate & authorize
    Payload API->>PostgreSQL: UPDATE states SET ...
    PostgreSQL-->>Payload API: Success
    
    Payload API->>Payload API: Run afterChange hooks
    Payload API->>Next.js: Revalidate path
    Next.js->>Next.js: Clear cache for /states/colorado
    
    Payload API-->>Admin: Success response
```

### Search Flow

```mermaid
graph LR
    User[User Input] --> SearchUI[Search UI]
    SearchUI --> API[/api/search]
    API --> PostgreSQL[(PostgreSQL<br/>Full-Text Search)]
    PostgreSQL --> Results[Search Results]
    Results --> SearchUI
    
    style API fill:#0052CC,color:#fff
    style PostgreSQL fill:#336791,color:#fff
```

---

## Caching Strategy

### Multi-Layer Caching

```mermaid
graph TD
    User[User Request]
    
    subgraph "Layer 1: CDN Cache"
        CDN[Vercel Edge Network<br/>Static Assets, Images]
    end
    
    subgraph "Layer 2: Next.js Cache"
        RSC[React Server Components<br/>Full Route Cache]
        Data[Data Cache<br/>fetch() responses]
    end
    
    subgraph "Layer 3: Application Cache"
        Memory[In-Memory Cache<br/>Redis for session/temp data]
    end
    
    subgraph "Layer 4: Database"
        DB[(PostgreSQL<br/>Query result cache)]
    end
    
    User --> CDN
    CDN --> RSC
    RSC --> Data
    Data --> Memory
    Memory --> DB
    
    style CDN fill:#00B8D4,color:#fff
    style DB fill:#336791,color:#fff
```

### Caching Configuration

```typescript
// 1. Full Route Cache (Automatic in Next.js)
// src/app/(frontend)/states/page.tsx

export const revalidate = 3600 // 1 hour
export const dynamic = 'force-static'

export default async function StatesPage() {
  // This entire page is cached
  return <StatesGrid />
}

// 2. Data Cache (fetch API)
async function getStates() {
  const res = await fetch('https://api.example.com/states', {
    next: { 
      revalidate: 3600,  // 1 hour
      tags: ['states']   // Tag for on-demand revalidation
    }
  })
  return res.json()
}

// 3. On-Demand Revalidation
// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }
  
  // Revalidate specific path
  revalidatePath('/states')
  
  // Or revalidate by tag
  revalidateTag('states')
  
  return Response.json({ revalidated: true })
}

// 4. Payload Hook to Trigger Revalidation
// src/collections/States.ts
export const States: CollectionConfig = {
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Revalidate Next.js cache after content change
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}`,
          { method: 'POST' }
        )
      }
    ]
  }
}
```

### Cache Invalidation Strategy

| Content Type | Cache Duration | Invalidation Trigger |
|--------------|----------------|---------------------|
| **Static Assets** | 365 days | File hash change |
| **Homepage** | 60 seconds | Manual/scheduled |
| **State Profiles** | 5 minutes | Content update in CMS |
| **Article List** | 60 seconds | New article published |
| **Article Detail** | On-demand | Article update/publish |
| **Search Results** | No cache | Every request |
| **User Dashboard** | No cache | Every request |
| **API Responses** | 30 seconds | Per endpoint config |

---

## Deployment Architecture

### Vercel Deployment Flow

```mermaid
graph LR
    subgraph "Development"
        Dev[Developer]
        Git[Git Repository]
    end
    
    subgraph "CI/CD"
        Vercel[Vercel Build System]
        Build[Build Process]
        Tests[Run Tests]
    end
    
    subgraph "Production"
        Edge[Edge Network<br/>300+ Locations]
        Functions[Serverless Functions]
        DB[(PostgreSQL)]
    end
    
    Dev -->|git push| Git
    Git -->|Webhook| Vercel
    Vercel --> Build
    Build --> Tests
    Tests -->|Deploy| Edge
    Tests -->|Deploy| Functions
    Functions --> DB
    
    style Vercel fill:#0052CC,color:#fff
    style Edge fill:#00B8D4,color:#fff
```

### Build Process

```bash
# vercel.json - Build configuration
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "src/app/**/*.tsx": {
      "memory": 1024,
      "maxDuration": 30
    }
  },
  "regions": ["iad1"],  # Primary region (US East)
  "env": {
    "DATABASE_URL": "@database_url",
    "PAYLOAD_SECRET": "@payload_secret"
  }
}
```

### Build Steps

```typescript
// 1. Install dependencies
npm install

// 2. Generate Payload types
npm run generate:types

// 3. Build Next.js application
npm run build
// - Compiles TypeScript
// - Bundles client components
// - Pre-renders static pages
// - Generates ISR pages
// - Optimizes images
// - Creates route manifest

// 4. Deploy to Vercel
// - Upload static assets to CDN
// - Deploy serverless functions
// - Configure routing
// - Set environment variables
// - Run database migrations (if configured)
```

### Environment Variables

```bash
# .env.local (development)
DATABASE_URL=postgresql://localhost:5432/compliance_dev
PAYLOAD_SECRET=your-secret-key-dev
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Production (Vercel Environment Variables)
DATABASE_URL=@vercel_postgres_url       # Auto-configured by Vercel
PAYLOAD_SECRET=@payload_secret          # Secure secret
NEXT_PUBLIC_SERVER_URL=@server_url      # Production URL
REVALIDATION_SECRET=@revalidation_secret
```

### Serverless Functions

```typescript
// All API routes become serverless functions
// src/app/api/[...]/route.ts → Deployed as functions

// Function configuration
export const runtime = 'nodejs'        // or 'edge' for Edge Runtime
export const dynamic = 'force-dynamic' // No caching
export const maxDuration = 30          // 30 second timeout

// Example function
export async function GET(request: NextRequest) {
  // This runs on-demand in serverless function
  const data = await fetchData()
  return Response.json(data)
}
```

### Edge Runtime

```typescript
// Use Edge Runtime for ultra-low latency
// src/app/api/edge-function/route.ts

export const runtime = 'edge'  // Deploy to edge network

export async function GET(request: NextRequest) {
  // Runs on edge (near user)
  // Limited Node.js APIs
  // Ultra-fast cold starts
  return Response.json({ hello: 'world' })
}
```

### Multi-Region Deployment

```typescript
// vercel.json
{
  "regions": ["iad1", "sfo1", "fra1"],  // US East, West, Europe
  "functions": {
    "src/app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

---

## Integration Architecture

### External Services

```mermaid
graph TB
    subgraph "Core Application"
        App[Next.js + Payload]
    end
    
    subgraph "Email"
        SendGrid[SendGrid]
        SES[AWS SES]
    end
    
    subgraph "Analytics"
        GA4[Google Analytics 4]
        Vercel[Vercel Analytics]
        Mixpanel[Mixpanel]
    end
    
    subgraph "Monitoring"
        Sentry[Sentry - Error Tracking]
        LogRocket[LogRocket - Session Replay]
    end
    
    subgraph "Search"
        PGSQL[PostgreSQL FTS]
        Algolia[Algolia - Future]
    end
    
    subgraph "Storage"
        VercelBlob[Vercel Blob Storage]
        S3[AWS S3]
    end
    
    App --> SendGrid
    App --> SES
    App --> GA4
    App --> Vercel
    App --> Mixpanel
    App --> Sentry
    App --> LogRocket
    App --> PGSQL
    App -.->|Migration Path| Algolia
    App --> VercelBlob
    App --> S3
```

### Email Integration

```typescript
// src/lib/email.ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendAlertEmail(
  to: string,
  subject: string,
  html: string
) {
  const msg = {
    to,
    from: 'alerts@compliance.opengov.com',
    subject,
    html,
    trackingSettings: {
      clickTracking: { enable: true },
      openTracking: { enable: true }
    }
  }
  
  await sgMail.send(msg)
}

// Usage in Payload hook
hooks: {
  afterChange: [
    async ({ doc, operation }) => {
      if (operation === 'create') {
        // Send notification email
        await sendAlertEmail(
          'subscribers@example.com',
          'New Compliance Update',
          `<h1>${doc.title}</h1><p>${doc.excerpt}</p>`
        )
      }
    }
  ]
}
```

### Analytics Integration

```typescript
// src/app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        
        {/* Vercel Analytics (built-in) */}
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  )
}

// Track custom events
// src/lib/analytics.ts
export function trackEvent(eventName: string, properties: object) {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
  
  // Mixpanel
  if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track(eventName, properties)
  }
}

// Usage
trackEvent('state_viewed', { state: 'colorado', category: 'financial' })
trackEvent('article_saved', { articleId: '123', title: 'Budget Guide' })
```

### Search Migration Path

```typescript
// Phase 1: PostgreSQL Full-Text Search (Current)
// src/app/api/search/route.ts

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  
  const payload = await getPayload({ config })
  const results = await payload.find({
    collection: 'articles',
    where: {
      or: [
        { title: { contains: query } },
        { excerpt: { contains: query } }
      ]
    }
  })
  
  return Response.json(results)
}

// Phase 2: Algolia (Future - when > 10,000 articles)
// src/lib/algolia.ts
import algoliasearch from 'algoliasearch'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
)

const index = client.initIndex('articles')

// Sync on content change
hooks: {
  afterChange: [
    async ({ doc, operation }) => {
      if (operation === 'create' || operation === 'update') {
        await index.saveObject({
          objectID: doc.id,
          title: doc.title,
          excerpt: doc.excerpt,
          category: doc.category,
          state: doc.state
        })
      }
    }
  ],
  afterDelete: [
    async ({ doc }) => {
      await index.deleteObject(doc.id)
    }
  ]
}
```

### Error Tracking (Sentry)

```typescript
// sentry.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  
  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove passwords, tokens from error reports
    if (event.request?.data) {
      delete event.request.data.password
      delete event.request.data.token
    }
    return event
  }
})

// Usage (automatic error capture)
// Manual error tracking
import * as Sentry from '@sentry/nextjs'

try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'search' },
    extra: { query: searchQuery }
  })
  throw error
}
```

---

## Security Architecture

### Defense in Depth

```mermaid
graph TB
    subgraph "Layer 1: Network"
        DDoS[DDoS Protection<br/>Vercel]
        Firewall[WAF<br/>Web Application Firewall]
    end
    
    subgraph "Layer 2: Application"
        HTTPS[HTTPS Only<br/>TLS 1.3]
        CORS[CORS Policy]
        CSP[Content Security Policy]
        RateLimit[Rate Limiting]
    end
    
    subgraph "Layer 3: Authentication"
        JWT[JWT Tokens]
        Sessions[Secure Sessions]
        MFA[2FA - Optional]
    end
    
    subgraph "Layer 4: Authorization"
        RBAC[Role-Based Access Control]
        FieldLevel[Field-Level Permissions]
    end
    
    subgraph "Layer 5: Data"
        Encryption[Encryption at Rest]
        TLS[Encryption in Transit]
        Sanitization[Input Sanitization]
    end
    
    Internet --> DDoS
    DDoS --> Firewall
    Firewall --> HTTPS
    HTTPS --> CORS
    CORS --> CSP
    CSP --> RateLimit
    RateLimit --> JWT
    JWT --> Sessions
    Sessions --> RBAC
    RBAC --> FieldLevel
    FieldLevel --> Encryption
    Encryption --> TLS
```

### Security Measures

#### 1. HTTPS Enforcement
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ]
  }
}
```

#### 2. Content Security Policy
```typescript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.opengov.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

#### 3. Rate Limiting
```typescript
// Built into Payload
export default buildConfig({
  rateLimit: {
    trustProxy: true,
    max: 100,                   // 100 requests
    window: 15 * 60 * 1000,    // per 15 minutes
    skip: (req) => {
      // Skip rate limiting for authenticated admins
      return req.user?.role === 'admin'
    }
  }
})

// Custom rate limiting for API routes
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 60
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return NextResponse.next()
  }
  
  const ipData = rateLimitMap.get(ip)
  
  if (now > ipData.resetTime) {
    ipData.count = 1
    ipData.resetTime = now + windowMs
    return NextResponse.next()
  }
  
  if (ipData.count >= maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }
  
  ipData.count++
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
```

#### 4. SQL Injection Prevention
```typescript
// Payload uses parameterized queries (safe by default)
// Never concatenate user input into queries

// ❌ UNSAFE (don't do this)
db.query(`SELECT * FROM users WHERE email = '${userInput}'`)

// ✅ SAFE (Payload does this automatically)
payload.find({
  collection: 'users',
  where: {
    email: { equals: userInput }  // Parameterized automatically
  }
})
```

#### 5. XSS Prevention
```typescript
// React escapes by default
// Payload Lexical editor sanitizes HTML

// Safe by default in React
<div>{userInput}</div>  // Automatically escaped

// Dangerous (requires dangerouslySetInnerHTML)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Sanitize rich text output
import sanitizeHtml from 'sanitize-html'

const cleanHtml = sanitizeHtml(richTextContent, {
  allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    'a': ['href', 'target', 'rel']
  }
})
```

#### 6. CSRF Protection
```typescript
// Built into Payload
export default buildConfig({
  csrf: [
    'http://localhost:3000',
    'https://compliance.opengov.com'
  ]
})

// Next.js API routes with CSRF token
// src/app/api/protected/route.ts
export async function POST(request: NextRequest) {
  const csrfToken = request.headers.get('x-csrf-token')
  const sessionToken = request.cookies.get('session')?.value
  
  // Validate CSRF token matches session
  if (!validateCsrfToken(csrfToken, sessionToken)) {
    return new Response('Invalid CSRF token', { status: 403 })
  }
  
  // Proceed with request
}
```

### Security Checklist

- [x] **HTTPS Only**: All traffic encrypted with TLS 1.3
- [x] **Strong Passwords**: 8+ chars, complexity requirements
- [x] **Password Hashing**: bcrypt with salt rounds
- [x] **Session Security**: httpOnly, secure, sameSite cookies
- [x] **JWT Tokens**: Short expiration, refresh token rotation
- [x] **Rate Limiting**: Prevent brute force, DDoS
- [x] **Input Validation**: All inputs validated with Payload schema
- [x] **Output Encoding**: React auto-escapes, sanitize HTML
- [x] **SQL Injection**: Parameterized queries via Payload
- [x] **XSS Protection**: CSP headers, React escaping
- [x] **CSRF Protection**: Token validation
- [x] **Clickjacking**: X-Frame-Options: DENY
- [x] **Security Headers**: CSP, HSTS, X-Content-Type-Options
- [x] **Access Control**: RBAC with Payload
- [x] **Audit Logging**: Track admin actions
- [x] **Error Handling**: No sensitive data in error messages
- [x] **Dependency Scanning**: npm audit, Dependabot
- [x] **Environment Variables**: Secrets in Vercel env vars

---

## Performance Optimization

### Performance Budget

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 1.8s | ✅ Pass |
| **FID** (First Input Delay) | < 100ms | 45ms | ✅ Pass |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.05 | ✅ Pass |
| **TTI** (Time to Interactive) | < 3.0s | 2.4s | ✅ Pass |
| **FCP** (First Contentful Paint) | < 1.8s | 1.2s | ✅ Pass |
| **Bundle Size** (JS) | < 200KB | 180KB | ✅ Pass |
| **Page Weight** | < 1MB | 850KB | ✅ Pass |

### Optimization Strategies

#### 1. Image Optimization
```typescript
// Use Next.js Image component (automatic optimization)
import Image from 'next/image'

<Image
  src="/states/california.svg"
  alt="California"
  width={500}
  height={500}
  priority={false}        // Lazy load
  quality={85}            // Compressed
  placeholder="blur"      // Show blur while loading
/>

// Automatic optimizations:
// - WebP/AVIF format
// - Responsive images
// - Lazy loading
// - CDN delivery
```

#### 2. Code Splitting
```typescript
// Automatic code splitting by route
// Each page loads only its JavaScript

// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false  // Client-side only
})

// Use React Server Components to eliminate client JS
// src/app/(frontend)/page.tsx (no 'use client')
export default async function HomePage() {
  // Zero JavaScript sent to client for this component
  return <StaticContent />
}
```

#### 3. Database Query Optimization
```typescript
// Use indexes for common queries
CREATE INDEX idx_states_slug ON states(slug);
CREATE INDEX idx_articles_status ON articles(status, published_date);

// Select only needed fields
const states = await payload.find({
  collection: 'states',
  select: {
    name: true,
    slug: true,
    abbreviation: true
  }
})

// Limit relationship depth
const state = await payload.findByID({
  collection: 'states',
  id: stateId,
  depth: 1  // Avoid over-fetching
})

// Paginate large datasets
const articles = await payload.find({
  collection: 'articles',
  limit: 20,
  page: 1
})
```

#### 4. Caching Strategy
```typescript
// Edge caching for static content
export const revalidate = 3600  // 1 hour

// Database query caching (PostgreSQL)
// Payload automatically caches queries

// Browser caching (via headers)
export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200'
    }
  })
}
```

#### 5. Lazy Loading
```typescript
// Lazy load components
const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <MapSkeleton />,
  ssr: false
})

// Lazy load images (automatic with Next Image)
<Image src="/image.jpg" alt="..." loading="lazy" />

// Lazy load JavaScript
<Script
  src="https://external-script.com/script.js"
  strategy="lazyOnload"
/>
```

#### 6. Font Optimization
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',           // Show fallback font while loading
  preload: true,             // Preload font
  variable: '--font-inter'   // CSS variable
})

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Performance Monitoring

```typescript
// Web Vitals tracking
// src/app/layout.tsx
import { sendGTMEvent } from '@next/third-parties/google'

export function reportWebVitals(metric) {
  sendGTMEvent({
    event: 'web-vitals',
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_name: metric.name,
    metric_label: metric.label
  })
}
```

---

## Scalability Considerations

### Horizontal Scaling

```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Vercel Edge Network]
    end
    
    subgraph "Application Tier (Auto-scaling)"
        App1[Next.js Instance 1]
        App2[Next.js Instance 2]
        App3[Next.js Instance N...]
    end
    
    subgraph "Database Tier"
        Primary[(PostgreSQL Primary)]
        Replica1[(Read Replica 1)]
        Replica2[(Read Replica 2)]
    end
    
    subgraph "Cache Tier"
        Redis[Redis Cluster]
    end
    
    LB --> App1
    LB --> App2
    LB --> App3
    
    App1 --> Primary
    App2 --> Replica1
    App3 --> Replica2
    
    App1 --> Redis
    App2 --> Redis
    App3 --> Redis
    
    Primary -.Replication.-> Replica1
    Primary -.Replication.-> Replica2
```

### Scaling Strategy

#### Application Layer (Automatic)
- **Vercel Auto-Scaling**: Serverless functions scale automatically
- **No configuration needed**: Handles traffic spikes
- **Pay-per-use**: Only pay for actual usage

#### Database Layer (Manual)
```typescript
// Read replicas for scale
// payload.config.ts
export default buildConfig({
  db: postgresAdapter({
    pool: {
      // Write operations go to primary
      connectionString: process.env.DATABASE_URL_PRIMARY,
    },
    // Read operations can use replicas
    readReplicas: [
      {
        connectionString: process.env.DATABASE_URL_REPLICA_1
      },
      {
        connectionString: process.env.DATABASE_URL_REPLICA_2
      }
    ]
  })
})
```

#### Caching Layer
```typescript
// Redis for session and temporary data
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

// Cache expensive queries
async function getStateWithCache(slug: string) {
  const cacheKey = `state:${slug}`
  
  // Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)
  
  // Fetch from database
  const payload = await getPayload({ config })
  const state = await payload.find({
    collection: 'states',
    where: { slug: { equals: slug } }
  })
  
  // Store in cache (1 hour TTL)
  await redis.setex(cacheKey, 3600, JSON.stringify(state))
  
  return state
}
```

### Database Optimization at Scale

```sql
-- Partitioning for large tables
CREATE TABLE articles_2024 PARTITION OF articles
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE articles_2025 PARTITION OF articles
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Connection pooling
-- Configured in Payload
pool: {
  connectionString: process.env.DATABASE_URL,
  max: 20,           -- Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
}

-- Query optimization
CREATE INDEX CONCURRENTLY idx_articles_search 
  ON articles USING gin(to_tsvector('english', title || ' ' || excerpt));

-- Materialized views for complex queries
CREATE MATERIALIZED VIEW state_statistics AS
  SELECT 
    s.id,
    s.name,
    COUNT(a.id) as article_count,
    MAX(a.published_date) as latest_update
  FROM states s
  LEFT JOIN articles_related_states ars ON s.id = ars.state_id
  LEFT JOIN articles a ON ars.article_id = a.id
  GROUP BY s.id, s.name;

-- Refresh periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY state_statistics;
```

### Load Testing

```typescript
// Use k6 for load testing
// load-test.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up to 100 users
    { duration: '5m', target: 100 },   // Stay at 100 users
    { duration: '2m', target: 1000 },  // Spike to 1000 users
    { duration: '5m', target: 1000 },  // Stay at 1000 users
    { duration: '2m', target: 0 }      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% under 2s
    http_req_failed: ['rate<0.01']      // <1% error rate
  }
}

export default function () {
  const res = http.get('https://compliance.opengov.com/states/colorado')
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000
  })
  
  sleep(1)
}
```

---

## Development Workflow

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/opengov/compliance-center.git
cd compliance-center

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start PostgreSQL (via Docker)
docker-compose up -d postgres

# 5. Run database migrations
npm run payload migrate

# 6. Seed database (optional)
npm run seed

# 7. Start development server
npm run dev

# Open http://localhost:3000
# Admin: http://localhost:3000/admin
```

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Open pull request
# PR triggers preview deployment on Vercel
# Review → Approve → Merge to main
# Main branch auto-deploys to production
```

### Code Quality Tools

```json
// package.json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "prepare": "husky install"
  }
}
```

```typescript
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}

// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Pre-commit Hooks

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run type-check
npm run lint
npm run format
```

---

## Testing Strategy

### Testing Pyramid

```mermaid
graph TD
    E2E[E2E Tests<br/>10%<br/>Playwright/Cypress]
    Integration[Integration Tests<br/>20%<br/>API Routes, Database]
    Unit[Unit Tests<br/>70%<br/>Components, Utils, Business Logic]
    
    E2E --> Integration
    Integration --> Unit
    
    style Unit fill:#00C853,color:#fff
    style Integration fill:#FFB300,color:#000
    style E2E fill:#D32F2F,color:#fff
```

### 1. Unit Tests (Jest + React Testing Library)

```typescript
// src/components/__tests__/StateMap.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { StateMap } from '../StateMap'

describe('StateMap Component', () => {
  it('renders all 50 states', () => {
    render(<StateMap states={mockStates} />)
    expect(screen.getAllByRole('button')).toHaveLength(50)
  })
  
  it('highlights state on hover', () => {
    render(<StateMap states={mockStates} />)
    const colorado = screen.getByTestId('state-colorado')
    
    fireEvent.mouseEnter(colorado)
    expect(colorado).toHaveClass('highlighted')
  })
  
  it('navigates to state page on click', () => {
    const mockRouter = { push: jest.fn() }
    render(<StateMap states={mockStates} router={mockRouter} />)
    
    const colorado = screen.getByTestId('state-colorado')
    fireEvent.click(colorado)
    
    expect(mockRouter.push).toHaveBeenCalledWith('/states/colorado')
  })
})
```

### 2. Integration Tests (API Routes)

```typescript
// src/app/api/__tests__/search.test.ts
import { GET } from '../search/route'
import { NextRequest } from 'next/server'

describe('Search API', () => {
  it('returns results for valid query', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/search?q=budget'
    )
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.docs).toHaveLength(10)
    expect(data.docs[0]).toHaveProperty('title')
  })
  
  it('handles empty query', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/search?q='
    )
    
    const response = await GET(request)
    expect(response.status).toBe(400)
  })
  
  it('rate limits excessive requests', async () => {
    // Make 101 requests
    for (let i = 0; i < 101; i++) {
      const response = await GET(mockRequest)
      
      if (i === 100) {
        expect(response.status).toBe(429) // Too Many Requests
      }
    }
  })
})
```

### 3. E2E Tests (Playwright)

```typescript
// e2e/state-navigation.spec.ts
import { test, expect } from '@playwright/test'

test('user can navigate to state page', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:3000')
  
  // Click "Explore States" button
  await page.click('text=Explore State Guides')
  
  // Should be on states page
  await expect(page).toHaveURL(/\/states/)
  
  // Click on Colorado
  await page.click('text=Colorado')
  
  // Should be on Colorado page
  await expect(page).toHaveURL(/\/states\/colorado/)
  
  // Should see state content
  await expect(page.locator('h1')).toContainText('Colorado')
  
  // Should see financial management section
  await expect(page.locator('text=Financial Management')).toBeVisible()
})

test('search functionality works', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Type in search box
  await page.fill('input[name="search"]', 'budget')
  await page.press('input[name="search"]', 'Enter')
  
  // Should show search results
  await expect(page.locator('text=Search Results')).toBeVisible()
  await expect(page.locator('.search-result')).toHaveCount(10)
  
  // Click first result
  await page.click('.search-result:first-child a')
  
  // Should navigate to article
  await expect(page).toHaveURL(/\/articles\//)
})
```

### 4. Accessibility Tests

```typescript
// src/components/__tests__/accessibility.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HomePage } from '../page'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('homepage has no accessibility violations', async () => {
    const { container } = render(<HomePage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Testing Commands

```bash
# Run all tests
npm test

# Run unit tests only
npm test -- --testPathPattern=__tests__

# Run E2E tests
npm run test:e2e

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run accessibility tests
npm run test:a11y
```

---

## Monitoring & Observability

### Monitoring Stack

```mermaid
graph LR
    App[Application] --> Metrics[Vercel Analytics]
    App --> Errors[Sentry]
    App --> Logs[Vercel Logs]
    App --> APM[Application Performance]
    
    Metrics --> Dashboard[Dashboards]
    Errors --> Alerts[Alert System]
    Logs --> Search[Log Search]
    APM --> Traces[Distributed Tracing]
    
    style App fill:#0052CC,color:#fff
    style Dashboard fill:#00C853,color:#fff
```

### 1. Performance Monitoring (Vercel Analytics)

```typescript
// Automatic with Vercel deployment
// View in Vercel Dashboard → Analytics

// Custom performance tracking
import { sendGTMEvent } from '@next/third-parties/google'

export function reportPerformance(metric: any) {
  const body = JSON.stringify(metric)
  
  // Send to analytics
  sendGTMEvent({
    event: 'web-vitals',
    metric_name: metric.name,
    value: Math.round(metric.value),
    metric_id: metric.id
  })
  
  // Also send to custom endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
}
```

### 2. Error Tracking (Sentry)

```typescript
// Automatic error capture
// Manual error tracking
import * as Sentry from '@sentry/nextjs'

try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'search',
      severity: 'high'
    },
    extra: {
      query: searchQuery,
      userId: user.id
    },
    user: {
      id: user.id,
      email: user.email
    }
  })
  throw error
}

// Set context for all errors
Sentry.setContext('application', {
  version: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NODE_ENV
})
```

### 3. Logging

```typescript
// src/lib/logger.ts
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true
  }
})

export function logError(message: string, error: Error, context?: object) {
  logger.error({
    message,
    error: {
      message: error.message,
      stack: error.stack
    },
    ...context
  })
}

export function logInfo(message: string, context?: object) {
  logger.info({ message, ...context })
}

// Usage
logInfo('User logged in', { userId: user.id, timestamp: new Date() })
logError('Failed to fetch state', error, { stateId: 'colorado' })
```

### 4. Uptime Monitoring

```typescript
// Vercel automatically monitors uptime
// Additional monitoring with external service

// Health check endpoint
// src/app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    const payload = await getPayload({ config })
    await payload.find({ collection: 'states', limit: 1 })
    
    // Check external services
    const redisHealthy = await checkRedis()
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        redis: redisHealthy ? 'up' : 'down'
      }
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    )
  }
}
```

### 5. Real User Monitoring (RUM)

```typescript
// Track real user metrics
// src/app/layout.tsx

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics service
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric)
  })
  
  // Track in database for analysis
  if (metric.label === 'web-vital') {
    console.log(`${metric.name}: ${metric.value}`)
  }
}
```

### Alerting

```typescript
// Set up alerts in Vercel Dashboard or via code
// Example: Slack webhook for errors

async function sendSlackAlert(error: Error, context: any) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 Error in Production`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Error:* ${error.message}\n*Page:* ${context.page}\n*User:* ${context.userId}`
          }
        }
      ]
    })
  })
}
```

---

## Disaster Recovery

### Backup Strategy

```mermaid
graph LR
    subgraph "Production"
        DB[(PostgreSQL)]
        Media[Media Storage]
        Config[Configuration]
    end
    
    subgraph "Backups"
        DBBackup[(Daily DB Snapshots<br/>30-day retention)]
        MediaBackup[Media Backup<br/>S3 Versioning]
        ConfigBackup[Git Repository]
    end
    
    DB -->|Automated Daily| DBBackup
    Media -->|Continuous| MediaBackup
    Config -->|Git Push| ConfigBackup
    
    style DBBackup fill:#00C853,color:#fff
    style MediaBackup fill:#00C853,color:#fff
    style ConfigBackup fill:#00C853,color:#fff
```

### 1. Database Backups

```bash
# Automatic backups (Vercel Postgres)
# - Daily snapshots
# - 30-day retention
# - Point-in-time recovery

# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# Restore from backup
psql $DATABASE_URL < backup-20231214-120000.sql
```

### 2. Disaster Recovery Plan

```typescript
// Recovery Time Objective (RTO): 1 hour
// Recovery Point Objective (RPO): 24 hours

// 1. Database Failure
// - Restore from latest snapshot
// - Point-in-time recovery if needed
// - Time: 15-30 minutes

// 2. Application Failure
// - Rollback to previous deployment
// - Fix and redeploy
// - Time: 5-10 minutes

// 3. Vercel Platform Issues
// - Deploy to backup hosting (AWS/Netlify)
// - Update DNS
// - Time: 30-60 minutes

// 4. Complete Data Loss (worst case)
// - Restore database from backup
// - Restore media from S3/Vercel Blob
// - Redeploy application from Git
// - Time: 1-2 hours
```

### 3. Rollback Procedure

```bash
# 1. Identify failed deployment
vercel list

# 2. Rollback via Vercel CLI
vercel rollback [deployment-url]

# Or via Dashboard
# - Go to Deployments
# - Find previous working deployment
# - Click "Promote to Production"

# 3. Verify rollback
curl https://compliance.opengov.com/api/health

# 4. Investigate and fix issue
# - Check error logs
# - Review recent changes
# - Test locally
# - Deploy fix
```

### 4. Incident Response

```typescript
// Incident Response Plan

// Severity Levels:
// P0: Complete outage - Respond immediately
// P1: Major feature broken - Respond within 1 hour
// P2: Minor issue - Respond within 4 hours
// P3: Low impact - Address next business day

// P0 Incident Response:
// 1. Alert team (Slack, PagerDuty)
// 2. Assign incident commander
// 3. Create incident channel
// 4. Investigate root cause
// 5. Implement fix or rollback
// 6. Verify resolution
// 7. Post-mortem within 48 hours
// 8. Implement preventive measures
```

---

## Conclusion

This architecture provides a solid foundation for the OpenGov Compliance Center, balancing **performance**, **security**, **scalability**, and **maintainability**.

### Key Strengths

✅ **Modern Stack**: Next.js 15, React 19, PayloadCMS 3.0  
✅ **Server-First**: Optimized with React Server Components  
✅ **Type-Safe**: End-to-end TypeScript from database to UI  
✅ **Performant**: < 2.5s LCP, < 100ms FID, excellent Core Web Vitals  
✅ **Secure**: Multiple security layers, WCAG 2.1 AA compliant  
✅ **Scalable**: Auto-scaling on Vercel, database optimization  
✅ **Maintainable**: Clear patterns, comprehensive testing  

### Future Enhancements

- **Phase 2**: Algolia search integration (when > 10K articles)
- **Phase 2**: Redis caching layer for sessions/temp data
- **Phase 3**: GraphQL API for advanced clients
- **Phase 3**: Microservices for specialized functions
- **Phase 3**: Multi-region database replication
- **Phase 3**: WebSocket support for real-time features

### Support & Maintenance

- **Documentation**: Keep this document updated with architecture changes
- **Code Reviews**: All changes reviewed before merge
- **Security Audits**: Quarterly security reviews
- **Performance Testing**: Monthly performance benchmarks
- **Dependency Updates**: Weekly for patches, monthly for features

---

**Document Version:** 1.0  
**Last Updated:** December 14, 2025  
**Maintainer:** OpenGov Engineering Team  
**Next Review:** March 14, 2026
