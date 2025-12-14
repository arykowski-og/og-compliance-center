# Vercel Deployment Guide

> Complete guide for deploying OpenGov Compliance Center to Vercel

**Last Updated:** December 14, 2025

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Initial Setup](#initial-setup)
6. [Custom Domain](#custom-domain)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- Git installed locally
- Node.js 18+ installed

---

## Database Setup

You need a PostgreSQL database for production. Here are your options:

### Option 1: Vercel Postgres (Easiest) ⭐

Vercel offers built-in PostgreSQL hosting:

1. Go to your Vercel project
2. Navigate to "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Name it `og-compliance-db`
6. Copy the `DATABASE_URL` provided

**Pricing:**
- Free: 256 MB storage, 60 hours compute
- Pro: $20/month for more resources

### Option 2: Supabase (Free Tier Available)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

**Pricing:**
- Free: 500 MB database, 2 GB bandwidth
- Pro: $25/month

### Option 3: Railway (Easy Setup)

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Copy connection string from service settings

**Pricing:**
- Free: $5 credit/month
- Hobby: $5/month minimum

### Option 4: Neon (Serverless Postgres)

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Supports branching and autoscaling

**Pricing:**
- Free: 0.5 GB storage
- Pro: $19/month

---

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Payload CMS app"

# Create main branch
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/yourusername/og-compliance-center.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

5. **DO NOT DEPLOY YET** - Add environment variables first!

---

## Environment Variables

Before deploying, add these environment variables in Vercel:

### Required Variables

Go to: Project Settings → Environment Variables

Add the following:

#### 1. DATABASE_URI
```
Value: postgresql://user:password@host:5432/database
```
Get this from your database provider (Vercel Postgres, Supabase, etc.)

#### 2. PAYLOAD_SECRET
```
Value: your-super-secure-random-string-change-this
```
Generate a secure random string:
```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use online generator:
# https://www.random.org/strings/
```

#### 3. NEXT_PUBLIC_SERVER_URL
```
Value: https://your-project.vercel.app
```
(Update after first deployment with your actual Vercel URL)

#### 4. ADMIN_EMAIL
```
Value: admin@yourdomain.com
```
Your admin user email

#### 5. ADMIN_PASSWORD
```
Value: YourSecurePassword123!
```
Your admin password (change after first login)

### Environment Selection

For each variable, select:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Once deployed, you'll get your URL: `https://your-project.vercel.app`

---

## Initial Setup

### Step 1: Update NEXT_PUBLIC_SERVER_URL

1. Copy your Vercel deployment URL
2. Go to Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_SERVER_URL` to your actual URL
4. Redeploy (Vercel → Deployments → ... → Redeploy)

### Step 2: Run Database Seed

You have two options:

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull

# Run seed
npm run seed
```

#### Option B: Using Vercel Dashboard

1. Go to your project dashboard
2. Navigate to Settings → Functions
3. Enable cron jobs or one-time functions
4. Create a serverless function to run seed:

```typescript
// api/seed.ts
import { seed } from '../src/seed'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await seed()
    res.status(200).json({ message: 'Seed completed' })
  }
}
```

5. Call it once: `curl -X POST https://your-project.vercel.app/api/seed`

### Step 3: Access Admin Panel

1. Visit `https://your-project.vercel.app/admin`
2. Login with your admin credentials
3. **Change your password immediately!**

### Step 4: Verify Deployment

Check these URLs:
- ✅ Homepage: `https://your-project.vercel.app/`
- ✅ States: `https://your-project.vercel.app/states`
- ✅ Admin: `https://your-project.vercel.app/admin`
- ✅ Articles: `https://your-project.vercel.app/articles`

---

## Custom Domain

### Adding Your Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., `compliance.yourdomain.com`)
4. Follow DNS setup instructions:

#### For Root Domain (yourdomain.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

#### For Subdomain (compliance.yourdomain.com):
```
Type: CNAME
Name: compliance
Value: cname.vercel-dns.com
```

5. Wait for DNS propagation (5-60 minutes)
6. Vercel automatically provisions SSL certificate

### Update Environment Variables

After adding domain:
1. Update `NEXT_PUBLIC_SERVER_URL` to your custom domain
2. Redeploy

---

## Performance Optimization

### Enable ISR (Incremental Static Regeneration)

Already configured! Your pages will:
- Generate statically at build time
- Revalidate every 60 seconds
- Serve cached pages for speed

### Edge Functions

Vercel deploys your API routes as serverless functions automatically.

### Image Optimization

Next.js Image component is already configured:
- Automatic WebP conversion
- Responsive images
- Lazy loading

---

## Continuous Deployment

Every push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
# Vercel automatically deploys!
```

### Preview Deployments

Every pull request gets a unique preview URL:
1. Create branch: `git checkout -b feature/new-feature`
2. Push: `git push origin feature/new-feature`
3. Open PR on GitHub
4. Vercel comments with preview URL

---

## Monitoring & Analytics

### Vercel Analytics

1. Go to Project → Analytics
2. Enable Vercel Analytics (free on Pro plan)
3. Get insights on:
   - Page views
   - Performance metrics
   - Core Web Vitals

### Logging

View logs:
1. Project → Deployments
2. Click on a deployment
3. View "Function Logs" tab

---

## Troubleshooting

### Issue: Build Fails

**Error:** `Module not found` or `Type errors`

**Solution:**
```bash
# Locally test build
npm run build

# Fix any TypeScript errors
npm run generate:types

# Push fixed code
git add .
git commit -m "Fix build errors"
git push
```

### Issue: Database Connection Failed

**Error:** `Could not connect to database`

**Solution:**
1. Verify `DATABASE_URI` is correct in environment variables
2. Check database is running and accessible
3. Verify IP whitelist (Supabase/Railway allow all by default)
4. Test connection string locally:
   ```bash
   psql "postgresql://user:pass@host:5432/db"
   ```

### Issue: Admin Panel Shows 404

**Error:** `/admin` returns 404

**Solution:**
1. Check build logs for errors
2. Verify Payload config is correct
3. Clear cache and redeploy:
   ```bash
   vercel --force
   ```

### Issue: Images Not Loading

**Error:** Images return 404 or don't display

**Solution:**
1. Check `public/media` folder exists
2. Verify image upload configuration in `Media.ts`
3. Check Vercel function size limits (50MB max)
4. Consider using external storage (S3, Cloudinary) for large media

### Issue: Environment Variables Not Working

**Error:** `PAYLOAD_SECRET is not defined`

**Solution:**
1. Verify variables are set for Production, Preview, Development
2. Redeploy after adding variables
3. Check variable names (case-sensitive!)
4. Pull latest env vars locally:
   ```bash
   vercel env pull
   ```

### Issue: Slow Performance

**Solution:**
1. Check database performance (upgrade if needed)
2. Enable caching in Payload config
3. Use CDN for static assets
4. Optimize images (already done with Next.js)
5. Review function execution times in logs

---

## Scaling

### When to Upgrade

Consider upgrading when:
- Site gets > 100k page views/month
- Database storage > 500 MB
- Need faster builds
- Want team collaboration features

### Vercel Pro Benefits

- $20/month
- Faster builds (6x)
- More function execution time
- Analytics included
- Team collaboration
- Password protection
- More preview deployments

### Database Scaling

Monitor your database and upgrade when:
- Storage > 80% capacity
- Connection pool maxed out
- Query performance degrades
- Backup/restore needed

---

## Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set strong `PAYLOAD_SECRET`
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Review user roles and permissions
- [ ] Set up database backups
- [ ] Enable 2FA on Vercel account
- [ ] Restrict admin panel access (IP whitelist if needed)
- [ ] Review CORS settings
- [ ] Set up monitoring and alerts
- [ ] Test all forms and uploads

---

## Backup Strategy

### Database Backups

#### Vercel Postgres:
- Automatic daily backups
- Point-in-time recovery
- Managed by Vercel

#### Supabase:
- Daily backups on Pro plan
- Export manually: Settings → Database → Backups

#### Manual Backup:
```bash
pg_dump $DATABASE_URI > backup-$(date +%Y%m%d).sql
```

### Media Backups

```bash
# Download all media files
vercel download public/media
```

---

## Cost Estimation

### Free Tier (Hobby)
- Vercel: Free
- Database: Free (Supabase/Neon free tier)
- **Total: $0/month**
- Good for: Testing, small projects, MVP

### Production (Small)
- Vercel: $20/month (Pro)
- Database: $25/month (Supabase Pro)
- **Total: $45/month**
- Good for: Small orgs, < 100k visitors

### Production (Medium)
- Vercel: $20/month (Pro)
- Database: $100/month (dedicated)
- **Total: $120/month**
- Good for: Medium orgs, < 1M visitors

---

## Next Steps

After successful deployment:

1. ✅ Test all functionality
2. ✅ Add content via admin panel
3. ✅ Configure SEO settings
4. ✅ Set up monitoring
5. ✅ Train team on admin panel
6. ✅ Plan content migration
7. ✅ Set up analytics
8. ✅ Create backup schedule

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Payload Docs:** https://payloadcms.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions
- **Project Issues:** Open an issue on your GitHub repo

---

**🎉 Congratulations! Your Payload CMS application is now live on Vercel!**

*Document Version: 1.0*  
*Last Updated: December 14, 2025*
