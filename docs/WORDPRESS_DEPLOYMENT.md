# WordPress Deployment Guide (ARCHIVED - LEGACY)

> **⚠️ THIS GUIDE IS ARCHIVED - Site has been migrated to Payload CMS**
>
> This WordPress guide is kept for reference only. The site now uses Payload CMS + Next.js.
> See [README.md](../README.md) and [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for current deployment instructions.

**Last Updated:** December 14, 2025  
**Status:** ARCHIVED - WordPress files have been removed from this repository

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Hosting Options](#hosting-options)
4. [Step-by-Step Installation](#step-by-step-installation)
5. [Theme Setup](#theme-setup)
6. [Creating Pages](#creating-pages)
7. [Testing & Verification](#testing--verification)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **PHP**: Version 7.4 or higher (8.0+ recommended)
- **MySQL**: Version 5.7 or higher (or MariaDB 10.3+)
- **Web Server**: Apache with mod_rewrite or Nginx
- **HTTPS Support**: SSL certificate (Let's Encrypt recommended)
- **Memory**: 256 MB PHP memory limit minimum

### WordPress Requirements
- WordPress 5.9 or higher
- Write permissions for uploads directory
- Pretty permalinks enabled

---

## Quick Start

### Option 1: WordPress.com (Easiest)
1. Sign up at [WordPress.com](https://wordpress.com)
2. Choose Business or Commerce plan (required for custom themes)
3. Upload theme via Appearance > Themes > Upload Theme
4. Activate "OpenGov Compliance Center" theme

### Option 2: Local Development (Recommended for Testing)
1. Download [Local by Flywheel](https://localwp.com) (free)
2. Create new WordPress site
3. Copy theme files to `wp-content/themes/og-compliance-center/`
4. Activate theme in WordPress admin

### Option 3: Shared Hosting
1. Purchase hosting (Bluehost, SiteGround, etc.)
2. Install WordPress via cPanel one-click installer
3. Upload theme via FTP or file manager
4. Activate theme in WordPress admin

---

## Hosting Options Comparison

| Provider | Cost/Month | WordPress Optimized | Auto Updates | Support |
|----------|-----------|---------------------|--------------|---------|
| WordPress.com Business | $25 | ✅ Yes | ✅ Yes | ✅ 24/7 |
| WP Engine | $30+ | ✅ Yes | ✅ Yes | ✅ Expert |
| Bluehost | $10-15 | ⚠️ Partial | ⚠️ Manual | ⚠️ Standard |
| SiteGround | $15-30 | ✅ Yes | ✅ Yes | ✅ Good |
| DigitalOcean | $6+ | ⚠️ Manual | ❌ Manual | ⚠️ Docs Only |
| Local (Dev) | Free | ✅ Yes | N/A | N/A |

---

## Step-by-Step Installation

### Step 1: Install WordPress

#### Via cPanel (Shared Hosting)
1. Log into your hosting cPanel
2. Find "WordPress" or "Softaculous Apps Installer"
3. Click "Install Now"
4. Fill in:
   - **Site Name**: OpenGov Compliance Center
   - **Admin Username**: Choose secure username
   - **Admin Password**: Use strong password
   - **Admin Email**: Your email
5. Click "Install"
6. Note your admin URL (usually `yoursite.com/wp-admin`)

#### Via Command Line (VPS/Dedicated)
```bash
# Download WordPress
cd /var/www/html
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress/* .
rm -rf wordpress latest.tar.gz

# Create database
mysql -u root -p
CREATE DATABASE og_compliance;
CREATE USER 'og_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON og_compliance.* TO 'og_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Configure WordPress
cp wp-config-sample.php wp-config.php
nano wp-config.php
# Edit DB_NAME, DB_USER, DB_PASSWORD, DB_HOST

# Set permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html

# Visit yoursite.com/wp-admin/install.php
```

### Step 2: Upload Theme Files

#### Via FTP
1. Connect to your site via FTP (FileZilla, etc.)
2. Navigate to `/wp-content/themes/`
3. Create folder: `og-compliance-center`
4. Upload all theme files:
   ```
   og-compliance-center/
   ├── style.css
   ├── functions.php
   ├── header.php
   ├── footer.php
   ├── front-page.php
   ├── page.php
   ├── single.php
   ├── page-states.php
   ├── page-state-california.php
   ├── page-state-texas.php
   ├── js/
   │   └── main.js
   └── public/
       └── states/
           ├── outline/
           └── solid/
   ```

#### Via WordPress Admin
1. Zip all theme files into `og-compliance-center.zip`
2. Go to: Appearance > Themes > Add New
3. Click "Upload Theme"
4. Choose your zip file
5. Click "Install Now"

### Step 3: Activate Theme
1. Go to: Appearance > Themes
2. Find "OpenGov Compliance Center"
3. Click "Activate"

---

## Theme Setup

### Configure Menus
1. Go to: Appearance > Menus
2. Create menu: "Primary Menu"
3. Add pages:
   - Home
   - State Guides
   - Products
   - Resources
   - About
   - Contact
4. Assign to "Primary Menu" location

### Set Homepage
1. Go to: Settings > Reading
2. Select "A static page"
3. Choose "Home" for homepage
4. Save changes

### Configure Permalinks
1. Go to: Settings > Permalinks
2. Select "Post name" structure
3. Save changes (important for state pages!)

---

## Creating Pages

### 1. Create States Directory Page
1. Go to: Pages > Add New
2. **Title**: State Guides
3. **Slug**: `states` (important!)
4. **Template**: Select "States Directory" from Page Attributes
5. **Publish**
6. **URL will be**: `yoursite.com/states/`

### 2. Create California State Page
1. Go to: Pages > Add New
2. **Title**: California
3. **Slug**: `state-california` (important!)
4. **Template**: Select "State Compliance Guide" from Page Attributes
5. **Publish**
6. **URL will be**: `yoursite.com/state-california/`

### 3. Create Texas State Page
1. Go to: Pages > Add New
2. **Title**: Texas
3. **Slug**: `state-texas` (important!)
4. **Template**: Select "State Compliance Guide - Texas" from Page Attributes
5. **Publish**
6. **URL will be**: `yoursite.com/state-texas/`

### 4. Create Additional State Pages (Template)
For each new state, repeat this process:
1. Create new page with title: `[State Name]`
2. Set slug: `state-[statename]` (lowercase, no spaces)
3. Duplicate `page-state-california.php` and rename
4. Update state-specific data in the PHP file
5. Upload new template to theme folder
6. Select template in page attributes

---

## CSS Variables Setup

The theme uses CSS custom properties defined in `style.css`:

```css
:root {
    --og-primary: #0052CC;
    --og-primary-dark: #003D99;
    --og-primary-light: #E6F0FF;
    --og-secondary: #FF6B35;
    --og-dark: #172B4D;
    --og-gray-900: #253858;
    --og-gray-700: #5E6C84;
    --og-gray-500: #7A869A;
    --og-gray-300: #DFE1E6;
    --og-gray-100: #F4F5F7;
}
```

To customize colors:
1. Edit `style.css`
2. Change the hex values
3. Save and clear cache

---

## Testing & Verification

### Pre-Launch Checklist
- [ ] Theme activated successfully
- [ ] All pages created with correct slugs
- [ ] Navigation menu configured
- [ ] Permalinks set to "Post name"
- [ ] Homepage displays correctly
- [ ] State directory shows all 50 states
- [ ] California page loads
- [ ] Texas page loads
- [ ] Interactive map works (if using page-states.php)
- [ ] Search functionality works
- [ ] Mobile responsive design verified
- [ ] All links working
- [ ] Footer menus configured
- [ ] SSL certificate active (HTTPS)
- [ ] Forms working (if applicable)

### Test These URLs
```
https://yoursite.com/                 → Homepage
https://yoursite.com/states/          → States directory
https://yoursite.com/state-california/ → California guide
https://yoursite.com/state-texas/     → Texas guide
```

### Performance Testing
1. Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. Aim for 90+ score on both mobile and desktop
3. Optimize images if needed
4. Enable caching plugin (WP Super Cache or W3 Total Cache)

---

## Troubleshooting

### Issue: Pages Show 404 Error
**Solution**: Flush permalinks
1. Go to: Settings > Permalinks
2. Click "Save Changes" (don't change anything)
3. Try accessing pages again

### Issue: Theme Doesn't Appear
**Solution**: Check file structure
```bash
# Correct structure:
wp-content/themes/og-compliance-center/style.css
wp-content/themes/og-compliance-center/functions.php
# etc...

# Incorrect (extra folder):
wp-content/themes/og-compliance-center/og-compliance-center/style.css
```

### Issue: CSS Not Loading
**Solution**: 
1. Check `style.css` has correct header comment
2. Clear browser cache (Ctrl+Shift+R)
3. Disable caching plugins temporarily
4. Check file permissions (should be 644)

### Issue: Template Not Available
**Solution**:
1. Verify template has correct header comment:
   ```php
   <?php
   /**
    * Template Name: States Directory
    */
   ```
2. Check file is in theme root (not subfolder)
3. Refresh WordPress admin page

### Issue: Map Not Displaying
**Solution**:
1. Check JavaScript console for errors (F12)
2. Verify SVG state files exist in `/public/states/`
3. Check file paths in template
4. Ensure jQuery is loaded

### Issue: State Pages Broken
**Solution**:
1. Verify permalink structure is "Post name"
2. Check page slug matches template expectations
3. Flush permalinks (Settings > Permalinks > Save)
4. Verify template file exists and is named correctly

---

## Advanced Configuration

### Custom Post Types (Future Enhancement)
To add custom post types for compliance requirements:

```php
// Add to functions.php
function og_register_compliance_cpt() {
    register_post_type('compliance', array(
        'labels' => array(
            'name' => 'Compliance Requirements',
            'singular_name' => 'Requirement'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-yes-alt'
    ));
}
add_action('init', 'og_register_compliance_cpt');
```

### Database Optimization
```sql
-- Optimize tables
OPTIMIZE TABLE wp_posts;
OPTIMIZE TABLE wp_postmeta;
OPTIMIZE TABLE wp_options;

-- Add indexes for performance
ALTER TABLE wp_postmeta ADD INDEX meta_key_value (meta_key, meta_value(255));
```

### Caching Configuration
Install and configure WP Super Cache:
1. Install plugin: WP Super Cache
2. Go to: Settings > WP Super Cache
3. Enable "Caching On"
4. Choose "Expert" mode
5. Enable "Use mod_rewrite to serve cache files"
6. Save settings

---

## Security Best Practices

1. **Change default admin username** (never use "admin")
2. **Use strong passwords** (20+ characters)
3. **Install security plugin**: Wordfence or Sucuri
4. **Enable two-factor authentication**
5. **Keep WordPress and plugins updated**
6. **Disable file editing**: Add to `wp-config.php`:
   ```php
   define('DISALLOW_FILE_EDIT', true);
   ```
7. **Regular backups**: Use UpdraftPlus or BackWPup
8. **Hide WordPress version**
9. **Limit login attempts**: Install Login LockDown
10. **SSL certificate**: Ensure HTTPS is enforced

---

## Maintenance Schedule

### Daily
- Monitor site uptime
- Check for security alerts

### Weekly
- Review site analytics
- Check for broken links
- Review comment spam

### Monthly
- Update WordPress core
- Update plugins and themes
- Review and test backups
- Check site performance
- Review security logs

### Quarterly
- Full site audit
- Content review and updates
- SEO optimization check
- User experience testing
- Compliance content updates

---

## Support Resources

- **WordPress Codex**: https://codex.wordpress.org/
- **WordPress Support**: https://wordpress.org/support/
- **Theme Support**: [Your support email]
- **Hosting Support**: [Your hosting provider]

---

## Migration from HTML to WordPress

If you're currently using the HTML version (index.html, page-states.html, etc.):

### Migration Steps
1. **Set up WordPress** (follow installation steps above)
2. **Install theme** (upload PHP files)
3. **Create pages** (use templates)
4. **Update internal links** (WordPress handles this automatically)
5. **Set up redirects** (if needed):
   ```apache
   # Add to .htaccess
   Redirect 301 /page-states.html /states/
   Redirect 301 /index.html /
   ```
6. **Test thoroughly** (all pages, links, forms)
7. **Update DNS** (point to new server if applicable)
8. **Monitor** (check analytics and errors)

---

## Conclusion

You now have a complete WordPress deployment guide! The theme is ready to use and all templates are configured for the 50 US states compliance guide system.

**Need help?** Contact your hosting provider's support or hire a WordPress developer for hands-on assistance.

**Ready to go live?** Follow the checklist above and test everything before pointing your domain to the new site.

---

*Document Version: 1.0*  
*Last Updated: December 14, 2025*
