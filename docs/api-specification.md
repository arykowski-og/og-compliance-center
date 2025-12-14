# OpenGov Compliance Center - API Specification

**Version:** 1.0.0  
**Date:** December 14, 2025  
**Status:** Production Ready  
**Base URL:** `https://api.compliance.opengov.com/v1`

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [API Conventions](#api-conventions)
4. [Endpoints by Resource](#endpoints-by-resource)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Webhooks](#webhooks)
8. [Code Examples](#code-examples)

---

## API Overview

The OpenGov Compliance Center API provides programmatic access to state-by-state compliance guidance for local governments. The API supports:

- **Public Content Access** - Browse states, articles, and search without authentication
- **Authenticated Operations** - Save items, manage subscriptions, access personalized dashboard
- **Admin Operations** - Content management via PayloadCMS integration
- **Advanced Tools** - Multi-state comparison, template downloads, alert subscriptions

### Key Features

- **RESTful Design** - Resource-oriented URLs, HTTP methods, standard status codes
- **JSON API** - Request and response bodies in JSON format
- **Pagination** - Cursor-based pagination for large datasets
- **Filtering & Sorting** - Flexible query parameters for data refinement
- **Versioning** - URL-based versioning (`/v1/`)
- **Security** - JWT-based authentication, HTTPS only
- **Rate Limiting** - Fair usage policies with clear headers

---

## Authentication

### Authentication Methods

The API supports two authentication methods:

#### 1. JWT Bearer Tokens (Recommended)

For authenticated API requests, use JWT (JSON Web Tokens) in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

**Obtaining a Token:**

```bash
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "Sarah Smith"
    }
  }
}
```

**Token Expiration:**
- Access tokens expire after 1 hour
- Refresh tokens expire after 7 days
- Use the refresh endpoint to obtain new access tokens

**Refreshing Tokens:**

```bash
POST /v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. API Keys (Enterprise Only)

Enterprise customers can use API keys for server-to-server integrations:

```http
X-API-Key: your_api_key_here
```

Contact support@opengov.com to request API key access.

### Public Endpoints

The following endpoints are publicly accessible without authentication:

- `GET /v1/states` - List all states
- `GET /v1/states/{stateId}` - Get state details
- `GET /v1/states/{stateId}/articles` - Browse state articles
- `GET /v1/articles/{articleId}` - Read article content
- `GET /v1/topics` - List all topics
- `GET /v1/search` - Search content

### Protected Endpoints

These endpoints require authentication:

- `POST /v1/saved-items` - Save content
- `GET /v1/dashboard` - Access personalized dashboard
- `POST /v1/subscriptions` - Create alert subscriptions
- `POST /v1/comparisons` - Generate state comparisons
- `GET /v1/users/me` - Get current user profile

---

## API Conventions

### Request Format

**Headers:**
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
```

**URL Structure:**
```
https://api.compliance.opengov.com/v1/{resource}?{query_params}
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* resource data */ },
  "meta": {
    "timestamp": "2025-12-14T12:00:00Z",
    "version": "1.0.0"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      "resourceType": "article",
      "resourceId": "art_123"
    },
    "timestamp": "2025-12-14T12:00:00Z"
  }
}
```

### Pagination

The API uses **cursor-based pagination** for large datasets:

**Request:**
```bash
GET /v1/articles?limit=25&cursor=eyJpZCI6ImFydF8xMjMifQ
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [ /* array of items */ ],
    "pagination": {
      "limit": 25,
      "hasMore": true,
      "nextCursor": "eyJpZCI6ImFydF8xNTAifQ",
      "prevCursor": "eyJpZCI6ImFydF8xMDAifQ",
      "totalCount": 247
    }
  }
}
```

**Pagination Parameters:**
- `limit` (optional) - Number of items per page (default: 25, max: 100)
- `cursor` (optional) - Cursor for next/previous page
- `sort` (optional) - Sort field and direction (e.g., `created_at:desc`)

### Filtering

Use query parameters to filter results:

```bash
GET /v1/articles?state=colorado&topic=financial-management&contentType=regulation
```

**Common Filters:**
- `state` - Filter by state slug (e.g., `colorado`, `texas`)
- `topic` - Filter by topic slug
- `contentType` - Filter by content type (`regulation`, `guide`, `template`, `checklist`)
- `dateFrom` - Filter by date range start (ISO 8601)
- `dateTo` - Filter by date range end (ISO 8601)
- `search` - Full-text search query

### Sorting

Use the `sort` parameter:

```bash
GET /v1/articles?sort=updated_at:desc
```

**Sort Formats:**
- `updated_at:desc` - Sort by updated date, newest first
- `title:asc` - Sort by title, A-Z
- `created_at:desc` - Sort by created date, newest first

### Field Selection

Request only specific fields using the `fields` parameter:

```bash
GET /v1/articles?fields=id,title,state,updated_at
```

---

## Endpoints by Resource

### States

#### List All States

```http
GET /v1/states
```

**Description:** Retrieve a list of all 50 US states with compliance metadata.

**Query Parameters:**
- `fields` (optional) - Comma-separated list of fields to return

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "state_co",
        "slug": "colorado",
        "name": "Colorado",
        "abbreviation": "CO",
        "fiscalYear": {
          "start": "07-01",
          "end": "06-30"
        },
        "articleCount": 42,
        "lastUpdated": "2025-12-14T10:30:00Z"
      }
    ]
  }
}
```

#### Get State Details

```http
GET /v1/states/{stateId}
```

**Description:** Get detailed information about a specific state.

**Path Parameters:**
- `stateId` (required) - State ID or slug (e.g., `colorado` or `state_co`)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "state_co",
    "slug": "colorado",
    "name": "Colorado",
    "abbreviation": "CO",
    "fiscalYear": {
      "start": "07-01",
      "end": "06-30"
    },
    "characteristics": {
      "population": 5773714,
      "localGovernments": 276,
      "oversightAgency": {
        "name": "Colorado Department of Local Affairs",
        "website": "https://cdola.colorado.gov"
      }
    },
    "topics": [
      {
        "id": "topic_fin",
        "slug": "financial-management",
        "name": "Financial Management",
        "articleCount": 12,
        "lastUpdated": "2025-12-14T10:30:00Z"
      }
    ],
    "recentUpdates": [
      {
        "id": "art_123",
        "title": "Budget Adoption Deadlines",
        "updatedAt": "2025-12-14T10:30:00Z"
      }
    ]
  }
}
```

#### Get State Articles

```http
GET /v1/states/{stateId}/articles
```

**Description:** Retrieve all articles for a specific state.

**Path Parameters:**
- `stateId` (required) - State ID or slug

**Query Parameters:**
- `topic` (optional) - Filter by topic slug
- `contentType` (optional) - Filter by content type
- `limit` (optional) - Items per page (default: 25)
- `cursor` (optional) - Pagination cursor
- `sort` (optional) - Sort field and direction

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "art_123",
        "slug": "budget-adoption-deadlines",
        "title": "Budget Adoption Deadlines",
        "state": {
          "id": "state_co",
          "name": "Colorado"
        },
        "topic": {
          "id": "topic_fin",
          "name": "Financial Management"
        },
        "contentType": "regulation",
        "summary": "Colorado requires all jurisdictions to adopt a formal budget by September 30...",
        "updatedAt": "2025-12-14T10:30:00Z",
        "effectiveDate": "2025-01-01",
        "url": "/articles/art_123"
      }
    ],
    "pagination": {
      "limit": 25,
      "hasMore": false,
      "totalCount": 12
    }
  }
}
```

---

### Articles

#### Get Article Details

```http
GET /v1/articles/{articleId}
```

**Description:** Retrieve full article content including plain-language summaries, requirements, and resources.

**Path Parameters:**
- `articleId` (required) - Article ID or slug

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "art_123",
    "slug": "budget-adoption-deadlines",
    "title": "Budget Adoption Deadlines",
    "state": {
      "id": "state_co",
      "slug": "colorado",
      "name": "Colorado"
    },
    "topic": {
      "id": "topic_fin",
      "slug": "financial-management",
      "name": "Financial Management"
    },
    "contentType": "regulation",
    "summary": "Colorado requires all jurisdictions to adopt a formal budget by September 30 each fiscal year...",
    "content": {
      "whatYouNeedToKnow": "Plain language summary in 2-3 sentences...",
      "keyRequirements": [
        "Public hearing required",
        "At least 10 days' notice",
        "Budget must include all estimates of expenditure"
      ],
      "implementation": [
        {
          "step": 1,
          "title": "Prepare preliminary budget",
          "description": "Draft budget with all revenue and expenditure estimates..."
        }
      ],
      "body": "Full HTML content of the article..."
    },
    "sources": [
      {
        "name": "Colorado Revised Statutes § 29-1-1103",
        "url": "https://leg.colorado.gov/sites/default/files/images/olls/crs-title-29.pdf",
        "type": "statute"
      }
    ],
    "relatedArticles": [
      {
        "id": "art_124",
        "title": "Tax Mill Levy Limits"
      }
    ],
    "resources": [
      {
        "id": "res_001",
        "type": "template",
        "name": "Budget Resolution Template",
        "fileUrl": "/api/v1/resources/res_001/download"
      }
    ],
    "metadata": {
      "effectiveDate": "2025-01-01",
      "lastReviewed": "2025-12-01",
      "reviewedBy": "Jane Attorney, Licensed Attorney, 15+ years",
      "confidenceLevel": "verified"
    },
    "createdAt": "2024-01-15T09:00:00Z",
    "updatedAt": "2025-12-14T10:30:00Z"
  }
}
```

#### List Articles

```http
GET /v1/articles
```

**Description:** List all articles with filtering and pagination.

**Query Parameters:**
- `state` (optional) - Filter by state slug
- `topic` (optional) - Filter by topic slug
- `contentType` (optional) - Filter by content type
- `search` (optional) - Full-text search query
- `dateFrom` (optional) - Filter articles updated after date (ISO 8601)
- `dateTo` (optional) - Filter articles updated before date (ISO 8601)
- `limit` (optional) - Items per page (default: 25, max: 100)
- `cursor` (optional) - Pagination cursor
- `sort` (optional) - Sort field and direction (default: `updated_at:desc`)

**Response:** Similar to state articles response with pagination.

---

### Topics

#### List All Topics

```http
GET /v1/topics
```

**Description:** Retrieve all compliance topic categories.

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "topic_fin",
        "slug": "financial-management",
        "name": "Financial Management",
        "description": "Budget adoption, financial reporting, audits, and fiscal compliance",
        "icon": "chart-bar",
        "articleCount": 234,
        "stateCount": 50
      },
      {
        "id": "topic_proc",
        "slug": "procurement-purchasing",
        "name": "Procurement & Purchasing",
        "description": "Competitive bidding, procurement methods, vendor management",
        "icon": "shopping-cart",
        "articleCount": 187,
        "stateCount": 50
      }
    ]
  }
}
```

#### Get Topic Details

```http
GET /v1/topics/{topicId}
```

**Description:** Get detailed information about a specific topic including articles across all states.

**Path Parameters:**
- `topicId` (required) - Topic ID or slug

**Query Parameters:**
- `state` (optional) - Filter by state
- `limit` (optional) - Items per page
- `cursor` (optional) - Pagination cursor

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "topic_fin",
    "slug": "financial-management",
    "name": "Financial Management",
    "description": "Budget adoption, financial reporting, audits, and fiscal compliance",
    "articles": {
      "items": [ /* array of articles */ ],
      "pagination": { /* pagination info */ }
    },
    "stateCoverage": [
      {
        "state": "Colorado",
        "articleCount": 12,
        "lastUpdated": "2025-12-14T10:30:00Z"
      }
    ]
  }
}
```

---

### Search

#### Search Content

```http
GET /v1/search
```

**Description:** Full-text search across all content with advanced filtering.

**Query Parameters:**
- `q` (required) - Search query string
- `state[]` (optional) - Filter by states (multi-select, e.g., `state[]=colorado&state[]=texas`)
- `topic[]` (optional) - Filter by topics (multi-select)
- `contentType[]` (optional) - Filter by content types (multi-select)
- `dateFrom` (optional) - Date range start (ISO 8601)
- `dateTo` (optional) - Date range end (ISO 8601)
- `limit` (optional) - Items per page (default: 25, max: 100)
- `cursor` (optional) - Pagination cursor
- `sort` (optional) - Sort by `relevance` (default), `date`, or `title`

**Example Request:**
```bash
GET /v1/search?q=budget+adoption&state[]=colorado&state[]=texas&contentType[]=regulation&sort=relevance
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "budget adoption",
    "items": [
      {
        "id": "art_123",
        "title": "Budget Adoption Deadlines",
        "state": {
          "id": "state_co",
          "name": "Colorado"
        },
        "topic": {
          "id": "topic_fin",
          "name": "Financial Management"
        },
        "contentType": "regulation",
        "snippet": "Colorado requires all jurisdictions to adopt a formal <mark>budget</mark> by September 30...",
        "relevanceScore": 0.95,
        "updatedAt": "2025-12-14T10:30:00Z",
        "url": "/articles/art_123"
      }
    ],
    "facets": {
      "states": [
        { "slug": "colorado", "count": 12 },
        { "slug": "texas", "count": 8 }
      ],
      "topics": [
        { "slug": "financial-management", "count": 15 }
      ],
      "contentTypes": [
        { "type": "regulation", "count": 10 },
        { "type": "guide", "count": 5 }
      ]
    },
    "pagination": {
      "limit": 25,
      "hasMore": true,
      "nextCursor": "eyJpZCI6ImFydF8xNTAifQ",
      "totalCount": 247
    }
  }
}
```

---

### User Dashboard

#### Get Dashboard

```http
GET /v1/dashboard
```

**Authentication:** Required

**Description:** Retrieve personalized dashboard with recent updates, saved items, subscriptions, and upcoming deadlines.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Sarah Smith",
      "email": "sarah@county.gov"
    },
    "monitoring": {
      "states": ["Colorado", "Wyoming", "New Mexico"],
      "topics": ["Financial Management", "Procurement"]
    },
    "newUpdates": {
      "count": 5,
      "items": [
        {
          "id": "art_123",
          "title": "Tax Levy Calculation Rules",
          "state": "Colorado",
          "topic": "Financial Management",
          "updatedAt": "2025-12-14T08:00:00Z",
          "isNew": true
        }
      ]
    },
    "savedItems": {
      "count": 12,
      "recentItems": [
        {
          "id": "saved_001",
          "article": {
            "id": "art_123",
            "title": "Budget Adoption Deadlines"
          },
          "savedAt": "2025-12-13T15:00:00Z"
        }
      ]
    },
    "activeSubscriptions": {
      "count": 3,
      "items": [
        {
          "id": "sub_001",
          "name": "Colorado - All Topics",
          "frequency": "weekly",
          "lastAlertSent": "2025-12-10T07:00:00Z",
          "itemsInLastAlert": 2
        }
      ]
    },
    "upcomingDeadlines": {
      "count": 8,
      "items": [
        {
          "id": "deadline_001",
          "date": "2025-02-15",
          "title": "Budget Adoption Deadline",
          "state": "Colorado",
          "daysRemaining": 30
        }
      ]
    },
    "lastLogin": "2025-12-14T10:00:00Z"
  }
}
```

---

### Saved Items

#### List Saved Items

```http
GET /v1/saved-items
```

**Authentication:** Required

**Description:** Retrieve user's saved/bookmarked content.

**Query Parameters:**
- `state` (optional) - Filter by state
- `topic` (optional) - Filter by topic
- `contentType` (optional) - Filter by content type
- `limit` (optional) - Items per page
- `cursor` (optional) - Pagination cursor
- `sort` (optional) - Sort by `saved_at:desc` (default), `title:asc`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "saved_001",
        "article": {
          "id": "art_123",
          "title": "Budget Adoption Deadlines",
          "state": {
            "id": "state_co",
            "name": "Colorado"
          },
          "topic": {
            "id": "topic_fin",
            "name": "Financial Management"
          },
          "url": "/articles/art_123"
        },
        "savedAt": "2025-12-13T15:00:00Z",
        "notes": "Important for FY26 budget process"
      }
    ],
    "pagination": {
      "limit": 25,
      "hasMore": false,
      "totalCount": 12
    }
  }
}
```

#### Save Item

```http
POST /v1/saved-items
```

**Authentication:** Required

**Description:** Save/bookmark an article.

**Request Body:**
```json
{
  "articleId": "art_123",
  "notes": "Important for FY26 budget process"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "saved_001",
    "articleId": "art_123",
    "savedAt": "2025-12-14T12:00:00Z"
  }
}
```

#### Remove Saved Item

```http
DELETE /v1/saved-items/{savedItemId}
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Item removed from saved items"
  }
}
```

---

### Subscriptions (Alerts)

#### List Subscriptions

```http
GET /v1/subscriptions
```

**Authentication:** Required

**Description:** Retrieve user's alert subscriptions.

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "sub_001",
        "name": "Colorado - All Topics",
        "states": [
          { "id": "state_co", "name": "Colorado" }
        ],
        "topics": [],
        "frequency": "weekly",
        "deliveryMethod": "email",
        "isActive": true,
        "lastAlertSent": "2025-12-10T07:00:00Z",
        "createdAt": "2025-01-01T00:00:00Z"
      }
    ]
  }
}
```

#### Create Subscription

```http
POST /v1/subscriptions
```

**Authentication:** Required

**Description:** Create a new alert subscription.

**Request Body:**
```json
{
  "name": "Colorado - All Topics",
  "states": ["state_co"],
  "topics": [],
  "frequency": "weekly",
  "deliveryMethod": "email"
}
```

**Frequency Options:**
- `immediate` - Send alerts immediately for urgent changes
- `daily` - Daily digest at 7:00 AM user timezone
- `weekly` - Weekly digest every Monday at 7:00 AM
- `monthly` - Monthly digest on 1st of month at 7:00 AM

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "sub_001",
    "name": "Colorado - All Topics",
    "states": [
      { "id": "state_co", "name": "Colorado" }
    ],
    "topics": [],
    "frequency": "weekly",
    "deliveryMethod": "email",
    "isActive": true,
    "createdAt": "2025-12-14T12:00:00Z"
  }
}
```

#### Update Subscription

```http
PATCH /v1/subscriptions/{subscriptionId}
```

**Authentication:** Required

**Request Body:**
```json
{
  "frequency": "daily",
  "isActive": true
}
```

**Response:** Updated subscription object

#### Delete Subscription

```http
DELETE /v1/subscriptions/{subscriptionId}
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Subscription deleted successfully"
  }
}
```

---

### Comparison Tool

#### Create Comparison

```http
POST /v1/comparisons
```

**Authentication:** Required

**Description:** Generate a multi-state comparison for a specific topic/requirement.

**Request Body:**
```json
{
  "states": ["state_co", "state_tx", "state_ca"],
  "topicId": "topic_fin",
  "requirementSlug": "budget-adoption-deadlines",
  "save": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "comp_001",
    "title": "Budget Adoption Deadlines: Colorado vs Texas vs California",
    "states": [
      { "id": "state_co", "name": "Colorado" },
      { "id": "state_tx", "name": "Texas" },
      { "id": "state_ca", "name": "California" }
    ],
    "topic": {
      "id": "topic_fin",
      "name": "Financial Management"
    },
    "requirement": "Budget Adoption Deadlines",
    "comparison": [
      {
        "attribute": "Adoption Deadline",
        "values": {
          "state_co": "September 30",
          "state_tx": "June 30",
          "state_ca": "July 15"
        },
        "differenceLevel": "significant"
      },
      {
        "attribute": "Public Hearing Required",
        "values": {
          "state_co": "Yes",
          "state_tx": "Yes",
          "state_ca": "Yes"
        },
        "differenceLevel": "consistent"
      },
      {
        "attribute": "Notice Period",
        "values": {
          "state_co": "10 days",
          "state_tx": "5 days",
          "state_ca": "10 days"
        },
        "differenceLevel": "similar"
      }
    ],
    "keyTakeaways": [
      "All three states require public hearings before budget adoption",
      "Adoption deadlines vary significantly (30-90 days apart)"
    ],
    "exportUrls": {
      "excel": "/api/v1/comparisons/comp_001/export/excel",
      "pdf": "/api/v1/comparisons/comp_001/export/pdf"
    },
    "createdAt": "2025-12-14T12:00:00Z"
  }
}
```

**Difference Levels:**
- `consistent` - Same across all states
- `similar` - Minor variations
- `significant` - Major differences

#### Get Saved Comparisons

```http
GET /v1/comparisons
```

**Authentication:** Required

**Description:** Retrieve user's saved comparisons.

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "comp_001",
        "title": "Budget Adoption Deadlines: CO vs TX vs CA",
        "stateCount": 3,
        "createdAt": "2025-12-14T12:00:00Z",
        "url": "/comparisons/comp_001"
      }
    ]
  }
}
```

#### Export Comparison

```http
GET /v1/comparisons/{comparisonId}/export/{format}
```

**Authentication:** Required

**Path Parameters:**
- `comparisonId` (required) - Comparison ID
- `format` (required) - Export format (`excel`, `pdf`)

**Response:** File download (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet or application/pdf)

---

### Resources (Templates & Checklists)

#### List Resources

```http
GET /v1/resources
```

**Authentication:** Required

**Description:** Retrieve document templates, checklists, and other downloadable resources.

**Query Parameters:**
- `type` (optional) - Filter by resource type (`template`, `checklist`, `guide`, `video`)
- `state` (optional) - Filter by state
- `topic` (optional) - Filter by topic
- `limit` (optional) - Items per page
- `cursor` (optional) - Pagination cursor

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "res_001",
        "type": "template",
        "name": "Budget Resolution Template",
        "description": "Pre-formatted budget resolution template for Colorado jurisdictions",
        "state": {
          "id": "state_co",
          "name": "Colorado"
        },
        "topic": {
          "id": "topic_fin",
          "name": "Financial Management"
        },
        "fileType": "docx",
        "fileSize": 45120,
        "downloadUrl": "/api/v1/resources/res_001/download",
        "previewUrl": "/api/v1/resources/res_001/preview",
        "updatedAt": "2025-12-01T00:00:00Z"
      }
    ],
    "pagination": {
      "limit": 25,
      "hasMore": false,
      "totalCount": 48
    }
  }
}
```

#### Download Resource

```http
GET /v1/resources/{resourceId}/download
```

**Authentication:** Required

**Response:** File download with appropriate Content-Type header

---

### User Profile

#### Get Current User

```http
GET /v1/users/me
```

**Authentication:** Required

**Description:** Retrieve current user's profile and preferences.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "sarah@county.gov",
    "name": "Sarah Smith",
    "role": "Finance Director",
    "organization": {
      "name": "Jefferson County",
      "type": "county",
      "size": "medium"
    },
    "preferences": {
      "operatingStates": ["state_co", "state_wy"],
      "topicsOfInterest": ["topic_fin", "topic_proc"],
      "timezone": "America/Denver",
      "emailNotifications": true,
      "inAppNotifications": true
    },
    "subscription": {
      "plan": "professional",
      "status": "active",
      "expiresAt": "2026-12-31T23:59:59Z"
    },
    "createdAt": "2024-01-15T09:00:00Z",
    "lastLoginAt": "2025-12-14T10:00:00Z"
  }
}
```

#### Update User Profile

```http
PATCH /v1/users/me
```

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Sarah J. Smith",
  "preferences": {
    "timezone": "America/Denver",
    "emailNotifications": true
  }
}
```

**Response:** Updated user object

---

## Error Handling

### Error Response Format

All errors follow RFC 7807 Problem Details format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error context"
    },
    "timestamp": "2025-12-14T12:00:00Z",
    "requestId": "req_abc123",
    "documentation": "https://docs.compliance.opengov.com/errors/ERROR_CODE"
  }
}
```

### HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| 200 OK | Success | Successful GET, PATCH, DELETE |
| 201 Created | Resource created | Successful POST |
| 204 No Content | Success, no body | Successful DELETE |
| 400 Bad Request | Invalid request | Validation errors, malformed JSON |
| 401 Unauthorized | Authentication required | Missing or invalid token |
| 403 Forbidden | Insufficient permissions | Valid token, insufficient access |
| 404 Not Found | Resource not found | Invalid resource ID |
| 409 Conflict | Resource conflict | Duplicate resource |
| 422 Unprocessable Entity | Validation failed | Business logic validation errors |
| 429 Too Many Requests | Rate limit exceeded | Too many requests |
| 500 Internal Server Error | Server error | Unexpected server error |
| 503 Service Unavailable | Service down | Maintenance or temporary outage |

### Error Codes

| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| `AUTHENTICATION_REQUIRED` | No authentication provided | 401 |
| `INVALID_TOKEN` | Invalid or expired JWT token | 401 |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions | 403 |
| `RESOURCE_NOT_FOUND` | Requested resource does not exist | 404 |
| `VALIDATION_ERROR` | Request validation failed | 400 |
| `DUPLICATE_RESOURCE` | Resource already exists | 409 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Unexpected server error | 500 |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | 503 |

### Validation Errors

Validation errors include detailed field-level information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "fields": [
        {
          "field": "email",
          "message": "Invalid email format",
          "value": "invalid-email"
        },
        {
          "field": "states",
          "message": "At least one state is required",
          "value": []
        }
      ]
    },
    "timestamp": "2025-12-14T12:00:00Z"
  }
}
```

---

## Rate Limiting

### Rate Limit Policy

To ensure fair usage and system stability, the API enforces rate limits:

**Authenticated Users:**
- **Standard Plan:** 1,000 requests per hour
- **Professional Plan:** 5,000 requests per hour
- **Enterprise Plan:** 50,000 requests per hour (custom limits available)

**Public Endpoints (Unauthenticated):**
- 100 requests per hour per IP address

### Rate Limit Headers

Every API response includes rate limit information:

```http
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1702555200
X-RateLimit-Reset-After: 3600
```

**Header Descriptions:**
- `X-RateLimit-Limit` - Maximum requests allowed in window
- `X-RateLimit-Remaining` - Requests remaining in current window
- `X-RateLimit-Reset` - Unix timestamp when limit resets
- `X-RateLimit-Reset-After` - Seconds until limit resets

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 5000,
      "remaining": 0,
      "resetAt": "2025-12-14T13:00:00Z",
      "retryAfter": 3600
    },
    "timestamp": "2025-12-14T12:00:00Z"
  }
}
```

**HTTP Status:** 429 Too Many Requests

**Retry-After Header:** Included with seconds to wait before retrying

### Best Practices

1. **Check Rate Limit Headers** - Monitor `X-RateLimit-Remaining` before making requests
2. **Implement Exponential Backoff** - Wait progressively longer between retries
3. **Cache Responses** - Cache frequently accessed data
4. **Use Webhooks** - Subscribe to webhooks instead of polling
5. **Batch Requests** - Use filtering and pagination to reduce request count
6. **Contact Support** - Enterprise customers can request custom rate limits

---

## Webhooks

### Overview

Webhooks allow you to receive real-time notifications when events occur in the Compliance Center.

**Available for:** Enterprise plans

### Webhook Events

| Event Type | Description |
|------------|-------------|
| `article.created` | New article published |
| `article.updated` | Existing article updated |
| `article.deleted` | Article removed |
| `state.updated` | State profile updated |
| `deadline.approaching` | Compliance deadline within threshold |
| `user.subscription.created` | User created new alert subscription |

### Webhook Payload

```json
{
  "id": "evt_abc123",
  "type": "article.updated",
  "createdAt": "2025-12-14T12:00:00Z",
  "data": {
    "article": {
      "id": "art_123",
      "title": "Budget Adoption Deadlines",
      "state": "Colorado",
      "topic": "Financial Management",
      "updatedAt": "2025-12-14T12:00:00Z"
    }
  }
}
```

### Webhook Setup

Contact support@opengov.com to configure webhook endpoints.

**Requirements:**
- HTTPS endpoint with valid SSL certificate
- Responds with 2xx status code within 5 seconds
- Verifies webhook signature (HMAC-SHA256)

### Webhook Verification

Each webhook includes a signature header for verification:

```http
X-OpenGov-Signature: sha256=abc123def456...
X-OpenGov-Timestamp: 1702555200
```

**Verification Steps:**
1. Extract timestamp and signature from headers
2. Compute HMAC-SHA256 of `{timestamp}.{body}` using your webhook secret
3. Compare computed signature with provided signature
4. Reject if signatures don't match or timestamp is too old (>5 minutes)

---

## Code Examples

### JavaScript (Node.js)

#### Authentication

```javascript
const fetch = require('node-fetch');

const login = async (email, password) => {
  const response = await fetch('https://api.compliance.opengov.com/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  return data.data.token;
};

// Usage
const token = await login('user@example.com', 'password123');
```

#### Search with Filters

```javascript
const searchArticles = async (query, filters = {}) => {
  const params = new URLSearchParams({
    q: query,
    ...filters
  });
  
  const response = await fetch(`https://api.compliance.opengov.com/v1/search?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};

// Usage
const results = await searchArticles('budget adoption', {
  'state[]': 'colorado',
  'contentType[]': 'regulation',
  limit: 10
});
```

#### Create Subscription

```javascript
const createSubscription = async (token, subscriptionData) => {
  const response = await fetch('https://api.compliance.opengov.com/v1/subscriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscriptionData)
  });
  
  return await response.json();
};

// Usage
const subscription = await createSubscription(token, {
  name: 'Colorado - All Topics',
  states: ['state_co'],
  topics: [],
  frequency: 'weekly',
  deliveryMethod: 'email'
});
```

#### Pagination

```javascript
const fetchAllArticles = async (token, state) => {
  let allArticles = [];
  let cursor = null;
  let hasMore = true;
  
  while (hasMore) {
    const params = new URLSearchParams({ state, limit: 100 });
    if (cursor) params.append('cursor', cursor);
    
    const response = await fetch(
      `https://api.compliance.opengov.com/v1/articles?${params}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    const data = await response.json();
    allArticles = allArticles.concat(data.data.items);
    
    hasMore = data.data.pagination.hasMore;
    cursor = data.data.pagination.nextCursor;
  }
  
  return allArticles;
};
```

### Python

#### Authentication

```python
import requests

def login(email, password):
    response = requests.post(
        'https://api.compliance.opengov.com/v1/auth/login',
        json={'email': email, 'password': password}
    )
    response.raise_for_status()
    return response.json()['data']['token']

# Usage
token = login('user@example.com', 'password123')
```

#### Get State Articles

```python
def get_state_articles(token, state_id, topic=None):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    params = {'limit': 25}
    if topic:
        params['topic'] = topic
    
    response = requests.get(
        f'https://api.compliance.opengov.com/v1/states/{state_id}/articles',
        headers=headers,
        params=params
    )
    
    response.raise_for_status()
    return response.json()['data']

# Usage
articles = get_state_articles(token, 'colorado', topic='financial-management')
```

#### Create Comparison

```python
def create_comparison(token, states, topic_id, requirement_slug):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'states': states,
        'topicId': topic_id,
        'requirementSlug': requirement_slug,
        'save': True
    }
    
    response = requests.post(
        'https://api.compliance.opengov.com/v1/comparisons',
        headers=headers,
        json=payload
    )
    
    response.raise_for_status()
    return response.json()['data']

# Usage
comparison = create_comparison(
    token,
    ['state_co', 'state_tx', 'state_ca'],
    'topic_fin',
    'budget-adoption-deadlines'
)
```

### cURL

#### Get All States

```bash
curl -X GET "https://api.compliance.opengov.com/v1/states" \
  -H "Content-Type: application/json"
```

#### Search with Authentication

```bash
curl -X GET "https://api.compliance.opengov.com/v1/search?q=budget+adoption&state[]=colorado" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

#### Save Item

```bash
curl -X POST "https://api.compliance.opengov.com/v1/saved-items" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "articleId": "art_123",
    "notes": "Important for budget process"
  }'
```

#### Create Subscription

```bash
curl -X POST "https://api.compliance.opengov.com/v1/subscriptions" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Colorado - All Topics",
    "states": ["state_co"],
    "topics": [],
    "frequency": "weekly",
    "deliveryMethod": "email"
  }'
```

---

## Additional Resources

### Documentation Links

- **API Reference:** https://docs.compliance.opengov.com/api
- **Getting Started Guide:** https://docs.compliance.opengov.com/getting-started
- **Authentication Guide:** https://docs.compliance.opengov.com/authentication
- **Webhook Setup:** https://docs.compliance.opengov.com/webhooks
- **SDKs:** https://github.com/opengov/compliance-sdk

### Support

- **Email:** support@opengov.com
- **Developer Portal:** https://developers.opengov.com
- **Status Page:** https://status.opengov.com
- **Community Forum:** https://community.opengov.com

### Versioning

The API uses URL-based versioning. The current version is `v1`.

**Version Format:** `/v1/`

**Deprecation Policy:**
- 12 months notice before deprecation
- Sunset HTTP header in responses
- Migration guide provided

**Current Version:** 1.0.0  
**Last Updated:** December 14, 2025

---

## Changelog

### Version 1.0.0 (December 14, 2025)

**Initial Release:**
- Public content access (states, articles, topics, search)
- User authentication (JWT tokens)
- Dashboard and personalization
- Saved items management
- Alert subscriptions
- Multi-state comparison tool
- Resource downloads
- Rate limiting and error handling

---

**For questions or feedback, contact:** api-support@opengov.com
