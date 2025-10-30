# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Alwan**, a custom theme for the Salla e-commerce platform built on the Twilight theme engine. It's a Twig-based theme with TailwindCSS styling and vanilla JavaScript for interactivity.

Repository: https://github.com/musta20/alwan

## Development Commands

### Build Commands
- `pnpm production` or `pnpm prod` - Build for production
- `pnpm development` - Build for development
- `pnpm watch` - Watch mode for development

### Preview Theme
- `pnpm dev` - Preview theme on demo store (configured: testreqest) with editor
- `salla theme preview` or `salla theme p` - Alternative preview command

Note: The `dev` script runs with `--with-editor` flag for live editing.

### Package Manager
This project uses **pnpm** exclusively. A preinstall hook enforces this (`npx only-allow pnpm`).

## Architecture

### Build System
- **Webpack 5** bundles assets with multiple entry points:
  - `app.js` - Core application logic, wishlist, blog
  - `home.js` - Homepage specific
  - `product-card.js` - Product card component
  - `main-menu.js` - Navigation menu
  - `checkout.js` - Cart and thank you pages
  - `product.js` - Product pages and category ads
  - Other page-specific bundles

- **PostCSS** with TailwindCSS 3 for styling
- **Babel** transpiles JS with @babel/preset-env
- Output goes to `public/` directory

### Directory Structure

```
src/
├── assets/
│   ├── js/           # JavaScript modules
│   │   ├── partials/ # Reusable JS components (product-card, main-menu, etc.)
│   │   └── *.js      # Page-specific JS files
│   ├── styles/       # SCSS/CSS files
│   ├── images/       # Image assets (copied to public/images)
│   └── fonts/        # Font files (copied to public/fonts)
├── locales/
│   ├── ar.json       # Arabic translations
│   └── en.json       # English translations
└── views/
    ├── layouts/
    │   └── master.twig    # Main layout template
    ├── pages/             # Page templates
    │   ├── customer/      # Customer account pages
    │   ├── product/       # Product listing and details
    │   ├── brands/        # Brand pages
    │   └── partials/      # Reusable page fragments
    └── components/        # Reusable components
        ├── header/
        ├── footer/
        └── home/          # Home page components
```

### Twilight Framework Integration

This theme extends Salla's Twilight framework (`@salla.sa/twilight`). Key concepts:

- **twilight.json** - Theme configuration file defining:
  - Theme metadata (name, repository, author)
  - Enabled features (mega-menu, fonts, color, breadcrumb, various components)
  - Theme settings (customizable via Partners Portal)

- **Theme Features** - Pre-built components like:
  - Product sliders, fixed banners, testimonials
  - Photo sliders, parallax backgrounds
  - Store features, YouTube embeds
  - Featured products (3 style variants)

- **Theme Variables** - Available in all Twig templates:
  - `store.*` - Store data and settings
  - `theme.*` - Theme configuration and methods
  - `user.*` - Current user/visitor data

### Frontend Stack

- **Twig** - Symfony's templating engine for views
- **TailwindCSS 3** - Utility-first CSS framework with custom theme config
- **Vanilla JavaScript** - No framework, uses Twilight's built-in helpers
- **Dependencies**:
  - animejs - Animation library
  - fslightbox - Lightbox for images
  - mmenu-light - Mobile menu
  - sweetalert2 - Modal alerts
  - lite-youtube-embed - Optimized YouTube embeds

### Styling Approach

TailwindCSS is heavily customized in `tailwind.config.js`:
- Custom colors (dark, darker, danger)
- Extended spacing, border radius, font sizes
- Custom animations (slideUpFromBottom, slideDownFromBottom)
- Responsive breakpoints including xxs (380-479px) and xs (480px+)
- Content scanned from: `src/views/**/*.twig`, `src/assets/js/**/*.js`, and safelist files

### JavaScript Architecture

**Modular Structure**: Each page/component has its own JS file that imports shared utilities from `app-helpers.js`.

**Key Modules**:
- `product-card.js` (24KB) - Main product card logic with wishlist, quick view, color variants
- `app.js` - Core app initialization, global utilities, Salla SDK initialization
- `cart.js` - Shopping cart functionality
- `main-menu.js` - Navigation and mega menu
- `product.js` - Product detail page interactions
- `partials/validate-product-options.js` - Product option validation

**Global Configuration**: Window variables set in `master.twig` head:
- `window.wishlist_btn` - Wishlist button style preference
- `window.mutile_color_product_card` - Multiple color variants on cards
- `window.imageZoom` - Image zoom functionality toggle
- `window.product_card_color` - Product card background color

### Salla SDK Integration

The theme integrates with Salla's JavaScript SDK for e-commerce functionality. The SDK is initialized in `app.js`.

**Using Salla SDK**: Access the Salla JavaScript engine anywhere in the project:

```javascript
salla.onReady(() => {
    // Your code here - Salla SDK is now loaded and ready
    // Access store data, handle cart operations, etc.
});
```

**Core Application (app.js)**:
- Initializes Salla engine with configuration
- Sets up essential store functions
- Entry point for the application
- Registers global event handlers

**Important**: Review `app.js` to understand how the Salla engine and application work together.

### Salla Native Components

The platform provides built-in web components that can be used throughout the theme:

```html
<!-- Button component -->
<salla-button>Add to Cart</salla-button>

<!-- Modal component -->
<salla-modal>
    <h2 slot="header">Modal Title</h2>
    <p>Modal content here</p>
</salla-modal>

<!-- Other native components -->
<salla-tabs></salla-tabs>
<salla-card></salla-card>
<salla-rating></salla-rating>
```

These components provide consistent UI and behavior across Salla themes.

## Theme Settings

Theme settings are defined in `twilight.json` and configurable via the Salla Partners Portal. Key settings include:

- Email subscription list configuration (URL, user ID, input field)
- Custom theme features toggles
- Color schemes and font selection
- Component-specific settings

Settings are accessed in Twig via `theme.settings.get('setting_name', 'default_value')`.

## Component System Architecture (twilight.json)

The theme uses a sophisticated component system defined in `twilight.json`. This system allows for flexible page building through reusable UI components that can be managed through the Salla Partners Portal.

### Component Structure

Each component in `twilight.json` follows this standardized schema:

```json
{
    "key": "unique-uuid-identifier",
    "title": "Component Display Name",
    "icon": "sicon-icon-name",
    "path": "section.component-name",
    "image": "preview-image-url (optional)",
    "is_default": true/false (optional),
    "fields": [/* field definitions */]
}
```

### Field Types Reference

#### Basic Input Types
- **`string + format: "text"`** - Single line text input
- **`string + format: "textarea"`** - Multi-line text input
- **`string + format: "image"`** - Image upload field with optional size recommendations
- **`string + format: "url"`** - URL input field
- **`string + format: "color"`** - Color picker
- **`string + format: "icon"`** - Icon selector from Salla icon library (sicon-)
- **`boolean + format: "switch"`** - Toggle switch
- **`items + format: "dropdown-list"`** - Dropdown selection
- **`items + format: "radio-list"`** - Radio button selection
- **`items + format: "variable-list"`** - Dynamic content linking

#### Advanced Field Types
- **`collection + format: "collection"`** - Repeatable field groups (sliders, lists)
- **`static + format: "description"`** - HTML content display (instructions)
- **`static + format: "title"`** - Section headers for field grouping
- **`static + format: "line"`** - Visual separators

### Multilanguage Support

Components support multilingual content for Arabic and English:

```json
{
    "multilanguage": true,
    "value": {
        "ar": "النص بالعربي",
        "en": "English text"
    }
}
```

### Conditional Fields

Fields can show/hide based on other field values:

```json
{
    "conditions": [{
        "id": "field_name",
        "operation": "=", // Can be =, !=, >, <, etc.
        "value": true
    }]
}
```

### Data Sources

Components can link to various content types via `variable-list` fields:

- **`products`** - Store products
- **`categories`** - Product categories
- **`brands`** - Brand pages
- **`pages`** - Static pages
- **`blog_articles`** - Blog articles
- **`blog_categories`** - Blog categories
- **Special links**: `offers_link`, `brands_link`, `blog_link`
- **`custom`** - External URLs

### Collection Fields (Repeatable Content)

For components like image sliders or product lists:

```json
{
    "type": "collection",
    "format": "collection",
    "minLength": 1,
    "maxLength": 10,
    "item_label": "Item Name",
    "fields": [/* nested field definitions */]
}
```

### Image Settings

Specify optimal image dimensions for better user guidance:

```json
{
    "type": "string",
    "format": "image",
    "settings": {
        "height": 580,
        "width": 1400
    },
    "description": "* Recommended size: 1400×580 pixels"
}
```

### Component Development Guidelines

1. **Component Keys**: Always use UUID format, never change existing keys (breaks user configurations)
2. **Naming Convention**: Use descriptive titles in Arabic with English technical paths
3. **Path Structure**: Follow `section.component-name` format (e.g., `home.slider-ads`, `categories.background`)
4. **Icons**: Use `sicon-` prefixed icons from Salla icon library
5. **Preview Images**: Provide preview images for visual components to help users identify them
6. **Field Validation**: Include proper `required`, `minLength`, `maxLength` validation
7. **Documentation**: Use static description fields to provide usage instructions within the admin panel
8. **Default Values**: Set sensible defaults for better user experience

### Working with Components

1. **Adding New Components**:
   - Define component structure in `twilight.json`
   - Create corresponding Twig template in `src/views/components/[section]/[component-name].twig`
   - Add any required styles and JavaScript
   - Test in the Salla Partners Portal

2. **Template Location**: `src/views/components/[section]/[component-name].twig`
   - `home.*` → `src/views/components/home/`
   - `categories.*` → `src/views/components/categories/`
   - Custom sections as defined in path

3. **Configuration**: Components are configured by merchants through the store admin panel
4. **Data Access**: Component field values are available in Twig templates via the `component` variable

### Component Data Access in Twig Templates

**IMPORTANT**: In component templates, always use the `component` variable (not `block`) to access component properties and field values.

#### Example Component Usage in Twig

```twig
{# Accessing text fields #}
{% if component.title %}
    <h2>{{ component.title }}</h2>
{% endif %}

{# Accessing image fields #}
{% if component.image %}
    <img src="{{ component.image|cdn }}" alt="{{ component.title }}">
{% endif %}

{# Accessing boolean fields #}
{% if component.show_description %}
    <p>{{ component.description }}</p>
{% endif %}

{# Accessing collection fields (repeatable content) #}
{% if component.slides %}
    {% for slide in component.slides %}
        <div class="slide">
            <img src="{{ slide.image|cdn }}" alt="{{ slide.title }}">
            <h3>{{ slide.title }}</h3>
        </div>
    {% endfor %}
{% endif %}

{# Accessing variable-list fields (linked content) #}
{% if component.products %}
    {% for product in component.products %}
        {% include 'pages.partials.product.card' %}
    {% endfor %}
{% endif %}

{# Accessing dropdown/radio list selections #}
{% if component.layout_style == 'grid' %}
    <div class="grid">...</div>
{% else %}
    <div class="list">...</div>
{% endif %}
```

**Note**: Always use `component.property_name` where `property_name` corresponds to the field `id` defined in `twilight.json`.

## Working with Salla Platform

### Prerequisites
- Salla CLI installed (`@salla.sa/cli`)
- Partner account at Salla Partners Portal
- Demo store for testing
- Basic knowledge of Twig, Tailwind, and the Salla/Twilight APIs

### Theme Preview Workflow
1. Run `pnpm dev` or `salla theme preview` from project root
2. Salla CLI syncs changes to demo store
3. Changes appear live in browser
4. Use `--with-editor` flag for inline editing

### Deployment
Themes are published through the Salla Partners Portal, not via git push. The portal syncs from the GitHub repository.

## Important Files

- `twilight.json` - Theme configuration and settings schema (168KB, review in sections)
- `webpack.config.js` - Build configuration with multiple entry points
- `tailwind.config.js` - TailwindCSS customization
- `postcss.config.js` - PostCSS plugins configuration
- `src/views/layouts/master.twig` - Base template with hooks and meta variables
- `package.json` - Dependencies and build scripts

## Localization

Translations stored in `src/locales/` as JSON files (ar.json, en.json). The store can be multilingual (`store.settings.is_multilingual`).

## Assets Output

Webpack outputs to `public/`:
- CSS: `app.css` (~600KB)
- JS bundles: Multiple files for code splitting
- Static assets: `images/`, `fonts/` directories copied as-is

## Font Configuration

The theme supports dynamic font selection via Twilight's font system:
- Predefined fonts: DINNextLTArabic, Amazon-Ember, Apple, Dubai, Estedad
- Font loaded via `theme.font.path|cdn` in master.twig
- Additional Google Fonts: Lalezar, Changa (loaded from CDN)

## Development Notes

- Master layout contains comprehensive Twig variable documentation in comments
- Component logic is split: view templates (`.twig`) + scripts (`.js`) + styles (`.scss`)
- Theme uses Twilight's component system - check official Salla docs for component APIs
- Arabic is the primary language (RTL support via `user.language.dir`)
- Theme documentation: https://lamsaweb.com/alwan

## Testing & Quality Assurance

### Manual Testing Checklist

When developing or modifying theme features, test the following:

- **Component Testing**: Test components in the Salla Partners Portal admin panel
- **Responsive Design**: Verify layout on mobile, tablet, and desktop devices
- **Language Switching**: Test Arabic (RTL) and English (LTR) language support
- **Interactive Elements**: Verify buttons, forms, modals, and navigation work correctly
- **Theme Customization**: Test theme settings and customization options in admin panel
- **Product Features**: Test add to cart, wishlist, quick view, color variants
- **Checkout Flow**: Test cart, checkout, and thank you pages
- **Performance**: Monitor loading times and Core Web Vitals

### Browser Compatibility

Test across:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)
- RTL (Right-to-Left) layout support for Arabic content
- Various screen sizes and resolutions

### Performance Considerations

- **Image Optimization**: Compress and optimize images before adding to assets
- **JavaScript Bundles**: Keep JS bundle size minimal, use code splitting
- **CSS Optimization**: Remove unused Tailwind classes, optimize CSS output
- **Loading Performance**: Test on slower connections (3G simulation)
- **Core Web Vitals**: Monitor LCP, FID, CLS metrics
- **CDN Usage**: Leverage `|cdn` filter for assets in Twig templates

**Note**: This project doesn't include automated tests. Testing is primarily manual through the Salla platform interface.

## Troubleshooting & Common Issues

### Build Errors

**SCSS Compilation Errors**:
- Check for missing semicolons or invalid SCSS syntax
- Verify imports are correctly referenced
- Ensure Tailwind directives are properly used

**JavaScript Errors**:
- Check console for error messages
- Verify all imports are correctly referenced
- Ensure Salla SDK is loaded before using `salla.*` methods
- Check for typos in variable names

**Webpack Build Failures**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear webpack cache: `rm -rf node_modules/.cache`
- Check for syntax errors in `webpack.config.js`

### Component Issues

**Component Not Appearing**:
- Verify component is properly defined in `twilight.json`
- Check that Twig template exists at the correct path
- Ensure component path matches the template file location
- Check for syntax errors in the component definition

**Component Data Not Loading**:
- Verify field definitions in `twilight.json`
- Check that data sources are properly configured
- Use `component.field_name` (not `block.field_name`) in Twig
- Ensure required fields have values set in admin panel

**Styling Conflicts**:
- Check for conflicting Tailwind classes
- Verify custom SCSS doesn't override component styles unexpectedly
- Use browser DevTools to inspect CSS specificity issues

### Development Server Issues

**Store Connection Failed**:
- Verify Salla CLI is properly installed and configured
- Check that store name in `package.json` dev script is correct
- Ensure you have access permissions to the demo store
- Try re-authenticating with Salla CLI

**Hot Reload Not Working**:
- Restart the development server: `pnpm dev`
- Clear browser cache and hard reload
- Check that `--with-editor` flag is present in dev script

**Permission Errors**:
- Verify Salla platform access and authentication
- Check that you have developer/partner permissions
- Ensure store is in development mode

### Performance Issues

**Slow Loading**:
- Optimize and compress images
- Reduce JavaScript bundle size
- Remove unused CSS classes
- Check for heavy animations or scripts

**Memory Issues During Build**:
- Close unused applications and browser tabs
- Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`
- Reduce webpack concurrency if building on low-memory systems

**CSS Conflicts**:
- Check for conflicting Tailwind utilities and custom styles
- Use more specific selectors if needed
- Review PostCSS and Tailwind configuration

### Debugging Tips

1. **Browser DevTools**: Use console, network, and elements tabs for debugging
2. **Salla SDK Logs**: Check console for Salla SDK initialization and errors
3. **Network Requests**: Monitor API calls and asset loading in Network tab
4. **Twig Debug**: Add `{{ dump(variable_name) }}` temporarily to inspect variables
5. **Multiple Browsers**: Test in different browsers to isolate browser-specific issues
6. **RTL Testing**: Specifically test RTL layout with Arabic language selected
7. **Mobile Testing**: Use real devices or browser DevTools device emulation

### Getting Help

- **Salla Documentation**: https://docs.salla.dev
- **Twilight Framework Docs**: Check Salla developer portal for Twilight docs
- **Community Support**: Join Salla Developers Telegram: https://t.me/salladev
- **Theme Repository**: Check for known issues and solutions

## Claude Code Instructions

When assisting with this Alwan theme project, follow these guidelines:

### File Structure Understanding
- **Templates**: All Twig templates in `src/views/`
- **Styles**: SCSS files in `src/assets/styles/`
- **Scripts**: JavaScript files in `src/assets/js/` with partials in `partials/`
- **Components**: Defined in `twilight.json` with corresponding Twig templates

### Development Workflow
```bash
# Development server with live preview
pnpm dev

# Production build
pnpm production

# Development build
pnpm development

# Watch mode for development
pnpm watch
```

### Important Considerations
1. **Component System**: When creating components, update both `twilight.json` and create Twig template
2. **Multilingual Support**: Support Arabic (RTL) and English (LTR) - consider both languages
3. **Salla Integration**: This theme integrates with Salla platform APIs and SDK
4. **Build Process**: Changes require running build commands to reflect on platform
5. **Package Manager**: Use `pnpm` exclusively (enforced by preinstall hook)
6. **Deployment**: Changes deploy via Salla Partners Portal, not git push

### Common Tasks
- **Adding Components**: Define in `twilight.json` → Create Twig template → Add styles/JS
- **Styling Changes**: Edit SCSS files → Run build → Test in browser
- **JavaScript Features**: Add to existing JS files or create partials for reusable code
- **Translations**: Update `src/locales/ar.json` and `src/locales/en.json`

### Quality Standards
- Follow existing code patterns and conventions
- Maintain clean, readable code structure
- Optimize for performance (images, JS bundles, CSS)
- Ensure accessibility compliance (ARIA labels, semantic HTML)
- Test across different browsers and devices (especially mobile)
- Support both RTL (Arabic) and LTR (English) layouts
- Use Salla native components when available
- Leverage Twilight framework features appropriately
