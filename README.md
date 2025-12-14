# OpenGov Compliance Center

> A modern, full-stack application built with Payload CMS and Next.js for managing government compliance across all 50 US states.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)
![Payload CMS](https://img.shields.io/badge/Payload-3.0-blue?logo=payload)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## 🚀 Features

- **🎯 Headless CMS** - Built on Payload CMS 3.0 with full TypeScript support
- **⚡ Next.js 15** - Modern React framework with App Router
- **🗄️ PostgreSQL** - Powerful relational database (MongoDB also supported)
- **🎨 Modern Design** - Clean, professional UI inspired by OpenGov
- **📱 Fully Responsive** - Mobile-first design that works everywhere
- **🔒 Authentication** - Built-in user management and access control
- **📊 Rich Content** - Lexical rich text editor for complex content
- **🗺️ State Management** - Comprehensive guides for all 50 US states
- **📝 Articles System** - Blog/articles with categories and relationships
- **☁️ Vercel Ready** - Optimized for seamless Vercel deployment

## 📦 What's Included

### Collections

- **States** - Complete compliance guides for all 50 US states
  - Financial Management requirements
  - Budgeting & Planning guidelines
  - Procurement regulations
  - Downloadable resources
  
- **Articles** - Knowledge base with categories:
  - GASB Standards
  - Best Practices
  - Case Studies
  - Regulatory Updates
  - Technology insights

- **Pages** - Flexible page builder with blocks:
  - Hero sections
  - Content blocks
  - Feature grids
  - Call-to-action sections

- **Media** - Asset management with automatic image optimization

- **Users** - Role-based access control (Admin, Editor, Viewer)

## 🏁 Quick Start

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database (or MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd og-compliance-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:
   ```env
   # Database (PostgreSQL)
   DATABASE_URI=postgresql://user:password@localhost:5432/og_compliance
   
   # Or use MongoDB
   # DATABASE_URI=mongodb://localhost:27017/og-compliance
   
   # Payload Secret (generate a secure random string)
   PAYLOAD_SECRET=your-secret-key-here
   
   # Server URL
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   
   # Admin credentials for first user
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Set up the database**
   
   For PostgreSQL:
   ```bash
   createdb og_compliance
   ```
   
   For MongoDB:
   ```bash
   # MongoDB will create the database automatically
   ```

5. **Run database migrations and seed data**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Login with your admin credentials

## 📁 Project Structure

```
og-compliance-center/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (frontend)/          # Public-facing pages
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── states/          # States directory & detail pages
│   │   │   └── articles/        # Articles listing & detail pages
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   │
│   ├── collections/             # Payload CMS Collections
│   │   ├── Users.ts             # User management
│   │   ├── States.ts            # State compliance guides
│   │   ├── Articles.ts          # Articles & insights
│   │   ├── Pages.ts             # Flexible pages
│   │   └── Media.ts             # Media library
│   │
│   ├── components/              # React components
│   │   ├── Header.tsx           # Site header/navigation
│   │   ├── Footer.tsx           # Site footer
│   │   └── StateMap.tsx         # Interactive state selector
│   │
│   ├── seed/                    # Database seed scripts
│   │   └── index.ts             # Seed all 50 states + sample data
│   │
│   ├── payload.config.ts        # Payload CMS configuration
│   └── payload-types.ts         # Auto-generated TypeScript types
│
├── public/                      # Static assets
│   ├── media/                   # Uploaded media files
│   └── states/                  # State SVG maps
│       ├── outline/             # Outlined state shapes
│       └── solid/               # Solid state shapes
│
├── docs/                        # Documentation
│   ├── IMPLEMENTATION_PLAN.md
│   └── WORDPRESS_DEPLOYMENT.md  # Legacy WordPress docs
│
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
└── vercel.json                  # Vercel deployment config
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with initial data
npm run payload      # Payload CLI
npm run generate:types # Generate TypeScript types from collections
```

### Admin Panel

Access the Payload admin panel at `/admin`:

- Full CRUD operations for all collections
- Rich text editor with Lexical
- Media library with drag & drop upload
- User role management
- Real-time preview

### Adding New States

States are auto-seeded. To customize:

1. Go to `/admin/collections/states`
2. Select a state
3. Add content to tabs:
   - Overview (hero, quick stats)
   - Financial Management
   - Budgeting & Planning
   - Procurement
   - Resources

### Creating Articles

1. Go to `/admin/collections/articles`
2. Click "Create New"
3. Fill in:
   - Title, slug, excerpt
   - Select category
   - Add rich text content
   - Link related states
   - Set status to "Published"

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   
   In Vercel dashboard, add these environment variables:
   
   ```
   DATABASE_URI=<your-production-database-url>
   PAYLOAD_SECRET=<secure-random-string>
   NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=<secure-password>
   ```

4. **Deploy Database**
   
   Options for PostgreSQL:
   - [Vercel Postgres](https://vercel.com/storage/postgres) (easiest)
   - [Supabase](https://supabase.com) (free tier)
   - [Railway](https://railway.app) (PostgreSQL hosting)
   - [Neon](https://neon.tech) (serverless Postgres)

5. **Deploy!**
   ```bash
   vercel
   ```

### Environment Setup for Production

After deployment:

1. Run seed command in Vercel:
   ```bash
   vercel env pull
   npm run seed
   ```

2. Or use Vercel's CLI:
   ```bash
   vercel run seed
   ```

## 🎨 Customization

### Styling

Edit `src/app/globals.css` to customize:
- Color scheme (CSS variables at top)
- Typography
- Spacing
- Components

### Collections

Add new collections in `src/collections/`:

```typescript
import type { CollectionConfig } from 'payload'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Add more fields
  ],
}
```

Then add to `src/payload.config.ts`.

### Frontend Pages

Add pages in `src/app/(frontend)/`:
- Create `your-page/page.tsx`
- Use server components to fetch from Payload
- Style with global CSS classes

## 🔒 Security

- Change `PAYLOAD_SECRET` to a strong random string in production
- Use secure passwords for admin accounts
- Enable HTTPS (automatic with Vercel)
- Set up proper database access controls
- Review user roles and permissions regularly

## 📊 Database

### PostgreSQL (Recommended)

Best for:
- Relational data
- Complex queries
- Production deployments
- Vercel hosting

### MongoDB (Alternative)

To use MongoDB instead:

1. Update `src/payload.config.ts`:
   ```typescript
   import { mongooseAdapter } from '@payloadcms/db-mongodb'
   
   db: mongooseAdapter({
     url: process.env.DATABASE_URI,
   }),
   ```

2. Update `package.json`:
   ```json
   "@payloadcms/db-mongodb": "^3.0.0"
   ```

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Issues**: Open an issue on GitHub

## 🎯 Roadmap

- [ ] Add more state-specific compliance data
- [ ] Implement full-text search with PostgreSQL
- [ ] Add PDF generation for compliance reports
- [ ] Create mobile app with React Native
- [ ] Add email notifications for updates
- [ ] Implement multi-language support
- [ ] Add analytics dashboard
- [ ] Create API documentation

## 📚 Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Built with ❤️ for transparent, compliant government operations**
