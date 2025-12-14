# OpenGov Compliance Center

Your complete guide to local government compliance across all 50 states. Navigate regulatory requirements, understand product capabilities, and operate with confidence.

## 🚀 Quick Start (Sandbox - Port 3000)

### Running in Sandbox/Local Development

```bash
npm run dev
```

This starts a static file server on **port 3000** (sandbox proxy compatible):
- Serves `index.html` automatically
- No build step required
- Works with sandbox proxy URLs
- Hot reload on file changes

### Alternative Commands

```bash
npm start       # Same as npm run dev
npm run preview # Same as npm run dev
```

## 📦 What's Included

### ✅ Standalone HTML Version (Works Now - Port 3000)
Perfect for immediate viewing in this sandbox:
- `index.html` - Complete homepage with inline CSS/JS
- `page-states.html` - All 50 states directory with search and filters
- `test-map.html` - Interactive US map demo
- `products-financial.html` - Financial management compliance guide
- `article-gasb96.html` - Sample GASB 96 deep-dive article
- **Ready to view at:** `http://localhost:3000`
- Fully functional without WordPress (smooth scroll, hover effects, animations)

### ✅ WordPress Theme Files (For Production Deployment)
A modern, professional WordPress theme inspired by [OpenGov.com](https://opengov.com/), designed for government compliance and public service platforms.

**WordPress templates include:**
- `page-states.php` - States directory with interactive US map
- `page-state-california.php` - California compliance guide
- `page-state-texas.php` - Texas compliance guide
- All standard WordPress theme files (header, footer, functions, etc.)

**📖 Deployment Guide:** See [`docs/WORDPRESS_DEPLOYMENT.md`](docs/WORDPRESS_DEPLOYMENT.md) for complete WordPress installation instructions.

## Features

- **Modern Design System**: Clean, professional design following OpenGov's visual style
- **Fully Responsive**: Mobile-first approach with seamless tablet and desktop experiences
- **Accessibility Ready**: WCAG 2.1 compliant with semantic HTML and ARIA labels
- **Performance Optimized**: Lightweight CSS and vanilla JavaScript for fast load times
- **Customizer Integration**: Easy customization through WordPress Customizer
- **Multiple Navigation Menus**: Primary menu and three footer menu locations
- **Hero Section**: Customizable hero section with title, description, and CTA buttons
- **Feature Cards**: Showcase products and services with styled feature cards
- **Testimonial Support**: Built-in testimonial styling
- **Custom Post Layouts**: Optimized layouts for posts, pages, and front page
- **Widget Ready**: Sidebar and footer widget areas

## Design Elements

### Color Palette
- **Primary**: `#0052CC` (OpenGov Blue)
- **Primary Dark**: `#003D99`
- **Primary Light**: `#E6F0FF`
- **Secondary**: `#00B8D4`
- **Accent**: `#FF6B35`

### Typography
- **System Font Stack**: Uses native system fonts for optimal performance
- **Responsive Type Scale**: Fluid typography that adapts to screen size
- **Hierarchy**: Clear heading hierarchy with proper spacing

### Components
- Hero sections with gradient backgrounds
- Feature cards with hover effects
- Call-to-action buttons (primary, secondary, outline)
- Navigation with dropdown support
- Footer with multi-column layout
- Testimonial blocks with author info

## Installation

### HTML Version (Immediate Use)
The HTML files work right now - just open them in a browser or run:
```bash
npm run dev
# Visit http://localhost:3000
```

### WordPress Version (Production Deployment)
See the complete guide: **[`docs/WORDPRESS_DEPLOYMENT.md`](docs/WORDPRESS_DEPLOYMENT.md)**

Quick version:
1. Install WordPress on your hosting
2. Upload theme to `/wp-content/themes/og-compliance-center/`
3. Activate the theme in WordPress admin
4. Create pages and assign templates
5. Configure through Appearance → Customize

**Note:** WordPress requires PHP and MySQL - it cannot run in this Node.js sandbox.

## Theme Structure

```
og-compliance-center/
├── style.css           # Main stylesheet with theme information
├── functions.php       # Theme functions and features
├── index.php          # Main template file
├── front-page.php     # Home page template
├── header.php         # Header template
├── footer.php         # Footer template
├── page.php           # Page template
├── single.php         # Single post template
├── js/
│   └── main.js        # JavaScript functionality
└── README.md          # This file
```

## Customization

### Customizer Options

Navigate to **Appearance → Customize** to modify:

- **Site Identity**: Logo, site title, tagline
- **Hero Section**: Hero title, description, button text and URL
- **Colors**: Customize the color scheme
- **Menus**: Configure navigation menus

### Navigation Menus

The theme supports four menu locations:

1. **Primary Menu**: Main navigation in header
2. **Footer Products**: Footer column for product links
3. **Footer Resources**: Footer column for resource links
4. **Footer Company**: Footer column for company links

Configure menus at **Appearance → Menus**

### Widget Areas

- **Sidebar**: Main sidebar for blog posts
- **Footer 1**: Footer widget area

## Development

### CSS Variables

The theme uses CSS custom properties for easy theming. Main variables are defined in `style.css`:

```css
:root {
  --og-primary: #0052CC;
  --og-primary-dark: #003D99;
  --spacing-md: 1.5rem;
  --radius-md: 8px;
  /* ... more variables */
}
```

### JavaScript Features

- Mobile menu toggle
- Smooth scroll for anchor links
- Header scroll effects
- Dropdown menu accessibility
- Scroll animations
- Form validation

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Best Practices

1. **Content**: Use the front-page.php template for your homepage
2. **Images**: Recommended image sizes:
   - Featured images: 1200×600px
   - Thumbnails: 400×300px
3. **Menus**: Set up all four menu locations for best results
4. **Logo**: Upload a logo 200px wide for optimal display

## Support

For issues or questions about this theme, please refer to:
- [WordPress Theme Development Handbook](https://developer.wordpress.org/themes/)
- [OpenGov Website](https://opengov.com/)

## Credits

- Design inspired by [OpenGov.com](https://opengov.com/)
- Built for WordPress 5.0+
- Follows WordPress Coding Standards

## License

This theme is licensed under the GNU General Public License v2 or later.

## Changelog

### Version 1.0.0
- Initial release
- Full theme implementation
- Customizer integration
- Responsive design
- Accessibility features
