# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.6 portfolio website for Junwoo Lee (이준우) with dark/light mode theming and Firebase integration. Built with React 19, Tailwind CSS v4, and deployed with Turbopack.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

The development server runs on http://localhost:3000

## Architecture

### Component Structure

The project uses a **template-based architecture** where pages import templates from `app/templates/`, which compose smaller UI components:

- **Templates** (`app/templates/`): Main page layouts (e.g., `Main`)
- **Container Components** (`app/components/containers.js`): Layout wrappers with responsive sizing
  - `ContianerXlarge`: Root container with padding
  - `ContainerHeader`: Sticky header at 40% width
  - `ContianerContents`: Main content area at 60% width
  - `ContainerHeaderSmall`, `ContainerContentsSmall`: Inner containers with max-width constraints
- **Content Components** (`app/components/contents/`): Cards, sections, images
- **Header Components** (`app/components/header/`): Title, subtitle, back button, copyright
- **Utility Components** (`app/components/`): Gap, Border, Channels, ProgressBar, ThemeToggle

### Theme System

The app implements a custom dark/light mode system:

1. **ThemeProvider** (`app/components/theme_provider.js`): React Context that manages theme state
   - Persists theme preference to localStorage
   - Detects system preference via `prefers-color-scheme`
   - Provides `useTheme()` hook with `theme` and `toggleTheme`
2. **FOUC Prevention**: Inline script in `app/layout.js` applies dark class before render
3. **CSS Variables**: All colors defined as CSS variables in `app/globals.css` within `@theme` block, with `html.dark` overrides
4. **Component Integration**: Use `useTheme()` hook in client components to access current theme

### Styling Approach

**Tailwind CSS v4** with heavy use of CSS custom properties:

- Spacing: `--spacing-common` (32px), `--spacing-box` (16px), etc.
- Typography: Custom classes like `.text-page-title`, `.text-card-body` defined in `@layer base`
- Theme colors: `--color-background`, `--color-primary`, `--text-color-*` with light/dark variants
- Custom borders: `.border-custom-width` class uses `--border-common` variable
- Font stack: Outfit (Google Font) + Pretendard Variable (CDN) + fallback sans-serif

**Important**: When adding new components, use existing CSS variable patterns rather than arbitrary Tailwind values for colors and typography.

### Firebase Integration

Firebase is configured in `firebase/config.js` and expects these environment variables in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## Code Style

**Prettier config** (.prettierrc.json):
- No semicolons
- Single quotes
- 2-space indentation
- ES5 trailing commas

**ESLint**: Extends `next/core-web-vitals` and `prettier`

**Naming conventions**:
- Components use PascalCase exports (e.g., `export function Main()`)
- Container component has typo: `ContianerXlarge` (note the misspelling)
- Client components: Mark with `'use client'` directive at top of file

## Key Implementation Details

### Client Components
Most components are server components by default. Use `'use client'` for:
- Theme-related components (need `useTheme()` hook)
- Interactive components (event handlers, state)
- Components using Next.js Image with dynamic sources

### Layout System
The main layout uses a two-column design:
- Left (40%): Sticky header with navigation, title, and progress bar
- Right (60%): Scrollable content area

The `ProgressBar` component tracks scroll progress and displays as a vertical bar on the header's right edge.

### Asset Management
Images stored in `app/asset/images/`. The `Channels` component demonstrates theme-aware image switching (e.g., `Instagram` vs `InstagramDark`).

## Common Patterns

**Container composition**:
```jsx
<ContianerXlarge>
  <ContainerHeader>
    <ContainerHeaderSmall>
      {/* Header content */}
    </ContainerHeaderSmall>
  </ContainerHeader>
  <ContianerContents>
    <ContainerContentsSmall>
      {/* Main content */}
    </ContainerContentsSmall>
  </ContianerContents>
</ContianerXlarge>
```

**Theme-aware styling**:
```jsx
const { theme } = useTheme()
const icon = theme === 'dark' ? DarkIcon : LightIcon
```
