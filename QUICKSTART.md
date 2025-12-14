# Quick Start Guide

Get OpenGov Compliance Center running in **5 minutes**! 🚀

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- Git installed

## Steps

### 1. Clone & Install

```bash
git clone <your-repo>
cd og-compliance-center
npm install
```

### 2. Setup Database

Create a PostgreSQL database:

```bash
createdb og_compliance
```

Or use Docker:

```bash
docker run --name postgres \
  -e POSTGRES_DB=og_compliance \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Configure Environment

Create `.env.local`:

```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/og_compliance
PAYLOAD_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!
```

### 4. Seed Database

```bash
npm run seed
```

This creates:
- Admin user
- All 50 US states
- Sample articles

### 5. Start Development Server

```bash
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Login:** Use credentials from step 3

## What's Next?

### Explore the Admin Panel

1. Login at `/admin`
2. Browse the States collection
3. Edit California or Texas
4. Create a new article
5. Upload some media files

### View the Frontend

1. Visit homepage at `/`
2. Check states directory at `/states`
3. View state detail pages
4. Browse articles at `/articles`

### Customize

1. Edit `src/app/globals.css` for styling
2. Modify collections in `src/collections/`
3. Update frontend pages in `src/app/(frontend)/`

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string
psql "postgresql://postgres:postgres@localhost:5432/og_compliance"
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Generate types
npm run generate:types

# Try build
npm run build
```

## Common Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run seed             # Seed database
npm run generate:types   # Generate TypeScript types
npm run lint             # Run ESLint
```

## Project Structure

```
og-compliance-center/
├── src/
│   ├── app/              # Next.js pages
│   ├── collections/      # Payload collections
│   ├── components/       # React components
│   └── seed/             # Database seed scripts
├── public/               # Static files
├── docs/                 # Documentation
└── package.json          # Dependencies
```

## Learn More

- 📖 [Full README](./README.md)
- 🚀 [Vercel Deployment Guide](./docs/VERCEL_DEPLOYMENT.md)
- 📝 [Payload CMS Guide](./docs/PAYLOAD_CMS_GUIDE.md)

## Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy with Vercel CLI
npm i -g vercel
vercel
```

Or use the [Vercel Dashboard](https://vercel.com/new) to import your repo.

---

**That's it! You're ready to build.** 🎉

Need help? Check the [full documentation](./README.md) or open an issue.
