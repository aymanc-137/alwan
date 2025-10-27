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
- `app.js` - Core app initialization, global utilities
- `cart.js` - Shopping cart functionality
- `main-menu.js` - Navigation and mega menu
- `product.js` - Product detail page interactions
- `partials/validate-product-options.js` - Product option validation

**Global Configuration**: Window variables set in `master.twig` head:
- `window.wishlist_btn` - Wishlist button style preference
- `window.mutile_color_product_card` - Multiple color variants on cards
- `window.imageZoom` - Image zoom functionality toggle
- `window.product_card_color` - Product card background color

## Theme Settings

Theme settings are defined in `twilight.json` and configurable via the Salla Partners Portal. Key settings include:

- Email subscription list configuration (URL, user ID, input field)
- Custom theme features toggles
- Color schemes and font selection
- Component-specific settings

Settings are accessed in Twig via `theme.settings.get('setting_name', 'default_value')`.

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
