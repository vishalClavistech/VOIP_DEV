# DaisyUI Manual - Complete Usage Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Theme Configuration](#theme-configuration)
4. [Component Categories](#component-categories)
5. [Layout Components](#layout-components)
6. [Navigation Components](#navigation-components)
7. [Form Components](#form-components)
8. [Data Display Components](#data-display-components)
9. [Feedback Components](#feedback-components)
10. [Overlay Components](#overlay-components)
11. [Utility Classes](#utility-classes)
12. [Customization](#customization)
13. [Best Practices](#best-practices)
14. [Troubleshooting](#troubleshooting)

---

## Introduction

DaisyUI is a component library built on top of Tailwind CSS that provides semantic, accessible, and customizable components. It follows design system principles and provides consistent styling across your application.

### Key Features
- **Semantic HTML**: Uses proper HTML elements with meaningful class names
- **Accessibility First**: Built with ARIA attributes and keyboard navigation
- **Theme Support**: Multiple built-in themes and custom theme creation
- **Tailwind Integration**: Seamlessly works with Tailwind CSS utilities
- **Responsive Design**: Mobile-first approach with responsive utilities

---

## Installation & Setup

### 1. Install DaisyUI
```bash
pnpm add daisyui
```

### 2. Configure Tailwind CSS
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        voip: {
          "primary": "#3B82F6",
          "secondary": "#10B981", 
          "accent": "#F59E0B",
          "neutral": "#6B7280",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#F3F4F6",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      "light",
      "dark",
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
} satisfies Config
```

### 3. Apply Theme to HTML
```html
<html lang="en" data-theme="voip">
  <body>
    <!-- Your app content -->
  </body>
</html>
```

---

## Theme Configuration

### Color System
DaisyUI uses a semantic color system that adapts to themes:

```css
/* Primary Colors */
.btn-primary { background-color: var(--fallback-p,oklch(var(--p)/1)); }
.text-primary { color: var(--fallback-p,oklch(var(--p)/1)); }

/* Base Colors */
.bg-base-100 { background-color: var(--fallback-b1,oklch(var(--b1)/1)); }
.bg-base-200 { background-color: var(--fallback-b2,oklch(var(--b2)/1)); }
.bg-base-300 { background-color: var(--fallback-b3,oklch(var(--b3)/1)); }

/* Content Colors */
.text-base-content { color: var(--fallback-bc,oklch(var(--bc)/1)); }
.text-base-content/70 { color: var(--fallback-bc,oklch(var(--bc)/0.7)); }
```

### Custom Theme Creation
```typescript
// tailwind.config.ts
daisyui: {
  themes: [
    {
      mytheme: {
        "primary": "#570df8",
        "secondary": "#f000b8",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
        "base-200": "#f9fafb",
        "base-300": "#f3f4f6",
        "info": "#3abff8",
        "success": "#36d399",
        "warning": "#fbbd23",
        "error": "#f87272",
      },
    },
  ],
}
```

---

## Component Categories

### 1. Layout Components
- **Container**: `container`
- **Divider**: `divider`
- **Footer**: `footer`
- **Hero**: `hero`
- **Indicator**: `indicator`
- **Mask**: `mask`
- **Stack**: `stack`

### 2. Navigation Components
- **Breadcrumbs**: `breadcrumbs`
- **Menu**: `menu`
- **Navbar**: `navbar`
- **Steps**: `steps`
- **Tabs**: `tabs`

### 3. Form Components
- **Button**: `btn`
- **Input**: `input`
- **Textarea**: `textarea`
- **Select**: `select`
- **Checkbox**: `checkbox`
- **Radio**: `radio`
- **Range**: `range`
- **Toggle**: `toggle`
- **File Input**: `file-input`
- **Form Control**: `form-control`

### 4. Data Display Components
- **Avatar**: `avatar`
- **Badge**: `badge`
- **Card**: `card`
- **Carousel**: `carousel`
- **Countdown**: `countdown`
- **Kbd**: `kbd`
- **Progress**: `progress`
- **Radial Progress**: `radial-progress`
- **Stat**: `stat`
- **Table**: `table`
- **Timeline**: `timeline`

### 5. Feedback Components
- **Alert**: `alert`
- **Loading**: `loading`
- **Skeleton**: `skeleton`
- **Toast**: `toast`

### 6. Overlay Components
- **Drawer**: `drawer`
- **Modal**: `modal`
- **Popover**: `popover`
- **Tooltip**: `tooltip`

---

## Layout Components

### Container
```jsx
<div className="container mx-auto px-4">
  <h1>Centered Container</h1>
</div>
```

### Divider
```jsx
<div className="divider">OR</div>
<div className="divider divider-horizontal">OR</div>
```

### Hero Section
```jsx
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">Provident cupiditate voluptatem et in.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

---

## Navigation Components

### Navbar
```jsx
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
```

### Menu
```jsx
<ul className="menu bg-base-200 w-56 rounded-box">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li>
    <details>
      <summary>Parent</summary>
      <ul>
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
      </ul>
    </details>
  </li>
</ul>
```

### Tabs
```jsx
<div className="tabs tabs-bordered">
  <a className="tab">Tab 1</a>
  <a className="tab tab-active">Tab 2</a>
  <a className="tab">Tab 3</a>
</div>
```

---

## Form Components

### Button
```jsx
{/* Button Variants */}
<button className="btn">Default</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-link">Link</button>

{/* Button Sizes */}
<button className="btn btn-lg">Large</button>
<button className="btn">Normal</button>
<button className="btn btn-sm">Small</button>
<button className="btn btn-xs">Extra Small</button>

{/* Button States */}
<button className="btn btn-primary" disabled>Disabled</button>
<button className="btn btn-primary loading">Loading</button>
```

### Input
```jsx
{/* Basic Input */}
<input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

{/* Input Variants */}
<input type="text" placeholder="Ghost" className="input input-ghost w-full max-w-xs" />
<input type="text" placeholder="Primary" className="input input-primary w-full max-w-xs" />
<input type="text" placeholder="Secondary" className="input input-secondary w-full max-w-xs" />
<input type="text" placeholder="Accent" className="input input-accent w-full max-w-xs" />
<input type="text" placeholder="Info" className="input input-info w-full max-w-xs" />
<input type="text" placeholder="Success" className="input input-success w-full max-w-xs" />
<input type="text" placeholder="Warning" className="input input-warning w-full max-w-xs" />
<input type="text" placeholder="Error" className="input input-error w-full max-w-xs" />

{/* Input Sizes */}
<input type="text" placeholder="Large" className="input input-bordered input-lg w-full max-w-xs" />
<input type="text" placeholder="Normal" className="input input-bordered w-full max-w-xs" />
<input type="text" placeholder="Small" className="input input-bordered input-sm w-full max-w-xs" />
<input type="text" placeholder="Mini" className="input input-bordered input-xs w-full max-w-xs" />
```

### Form Control
```jsx
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <label className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </label>
</div>
```

### Checkbox & Radio
```jsx
{/* Checkbox */}
<input type="checkbox" className="checkbox" />
<input type="checkbox" className="checkbox checkbox-primary" />
<input type="checkbox" className="checkbox checkbox-secondary" />

{/* Radio */}
<input type="radio" name="radio-1" className="radio" />
<input type="radio" name="radio-1" className="radio radio-primary" />
<input type="radio" name="radio-1" className="radio radio-secondary" />
```

---

## Data Display Components

### Card
```jsx
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```

### Table
```jsx
<div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Badge
```jsx
<div className="badge">Default</div>
<div className="badge badge-primary">Primary</div>
<div className="badge badge-secondary">Secondary</div>
<div className="badge badge-accent">Accent</div>
<div className="badge badge-ghost">Ghost</div>
<div className="badge badge-outline">Outline</div>
```

### Avatar
```jsx
<div className="avatar">
  <div className="w-24 rounded">
    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
  </div>
</div>

{/* Avatar Group */}
<div className="avatar-group -space-x-6">
  <div className="avatar">
    <div className="w-12">
      <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
    </div>
  </div>
  <div className="avatar placeholder">
    <div className="w-12 bg-neutral-focus text-neutral-content">
      <span>+99</span>
    </div>
  </div>
</div>
```

---

## Feedback Components

### Alert
```jsx
<div className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>New software update available.</span>
</div>

<div className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Your purchase has been confirmed!</span>
</div>
```

### Loading
```jsx
{/* Spinner */}
<span className="loading loading-spinner loading-md"></span>

{/* Dots */}
<span className="loading loading-dots loading-md"></span>

{/* Ring */}
<span className="loading loading-ring loading-md"></span>

{/* Ball */}
<span className="loading loading-ball loading-md"></span>

{/* Bars */}
<span className="loading loading-bars loading-md"></span>

{/* Infinity */}
<span className="loading loading-infinity loading-md"></span>
```

---

## Overlay Components

### Modal
```jsx
{/* Open modal button */}
<button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>

{/* Modal */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
```

### Drawer
```jsx
<div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
```

---

## Utility Classes

### Spacing
```jsx
<div className="p-4 m-2">Padding 4, Margin 2</div>
<div className="px-6 py-3">Horizontal padding 6, Vertical padding 3</div>
<div className="space-y-4">Vertical spacing between children</div>
```

### Flexbox
```jsx
<div className="flex items-center justify-between">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Customization

### Custom Component Classes
```css
/* Custom button variant */
.btn-custom {
  @apply btn btn-primary;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

/* Custom card with shadow */
.card-custom {
  @apply card bg-base-100 shadow-xl;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Theme Variables
```css
:root {
  --fallback-p: #3b82f6;
  --fallback-pc: #ffffff;
  --fallback-s: #10b981;
  --fallback-sc: #ffffff;
  --fallback-a: #f59e0b;
  --fallback-ac: #ffffff;
  --fallback-n: #6b7280;
  --fallback-nc: #ffffff;
  --fallback-b1: #ffffff;
  --fallback-b2: #f9fafb;
  --fallback-b3: #f3f4f6;
  --fallback-bc: #1f2937;
  --fallback-in: #3b82f6;
  --fallback-inc: #ffffff;
  --fallback-su: #10b981;
  --fallback-suc: #ffffff;
  --fallback-wa: #f59e0b;
  --fallback-wac: #ffffff;
  --fallback-er: #ef4444;
  --fallback-erc: #ffffff;
}
```

---

## Best Practices

### 1. Use Semantic Classes
```jsx
// ✅ Good - Semantic and meaningful
<button className="btn btn-primary">Save Changes</button>

// ❌ Avoid - Generic utility classes
<div className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</div>
```

### 2. Combine with Tailwind Utilities
```jsx
// ✅ Good - DaisyUI + Tailwind utilities
<div className="card bg-base-100 shadow-xl w-full max-w-md mx-auto">
  <div className="card-body">
    <h2 className="card-title text-2xl font-bold">Title</h2>
    <p className="text-base-content/70">Description</p>
  </div>
</div>
```

### 3. Responsive Design
```jsx
// ✅ Good - Responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-lg md:text-xl">Responsive Title</h2>
    </div>
  </div>
</div>
```

### 4. Accessibility
```jsx
// ✅ Good - Accessible form
<div className="form-control w-full max-w-xs">
  <label className="label" htmlFor="email">
    <span className="label-text">Email</span>
  </label>
  <input 
    type="email" 
    id="email"
    placeholder="Enter your email" 
    className="input input-bordered w-full max-w-xs" 
    required
    aria-describedby="email-error"
  />
  <label className="label" htmlFor="email-error">
    <span className="label-text-alt text-error">Please enter a valid email</span>
  </label>
</div>
```

---

## Troubleshooting

### Common Issues

#### 1. Components Not Styled
**Problem**: DaisyUI components appear unstyled
**Solution**: 
- Ensure DaisyUI is properly installed and configured in `tailwind.config.ts`
- Check that the plugin is added: `plugins: [require('daisyui')]`
- Verify the theme is applied to HTML: `<html data-theme="your-theme">`

#### 2. Theme Not Working
**Problem**: Custom theme colors not applied
**Solution**:
- Check theme configuration in `tailwind.config.ts`
- Ensure theme is set on HTML element
- Verify color values are valid CSS colors

#### 3. Build Errors
**Problem**: Build fails with DaisyUI-related errors
**Solution**:
- Clear build cache: `rm -rf .next node_modules/.cache`
- Reinstall dependencies: `pnpm install`
- Check for conflicting CSS classes

#### 4. Responsive Issues
**Problem**: Components not responsive
**Solution**:
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Check container classes and viewport settings
- Verify mobile-first approach

### Debug Mode
Enable DaisyUI logs to debug issues:
```typescript
// tailwind.config.ts
daisyui: {
  logs: true, // Enable console logs
}
```

---

## Examples from VoIP Dashboard

### Global Header with Navbar
```jsx
<header className="navbar bg-gradient-to-r from-blue-500 to-green-500 text-white">
  <div className="navbar-start">
    <button
      onClick={onMenuClick}
      className="btn btn-ghost btn-square"
      aria-label="Open menu"
    >
      <Bars3Icon className="h-6 w-6" />
    </button>
    <div className="ml-4">
      <div className="text-2xl font-bold">{title}</div>
    </div>
  </div>
  <div className="navbar-end">
    <CompanyDropdown
      companies={companies}
      selectedCompany={selectedCompany}
      onCompanyChange={handleCompanyChange}
    />
  </div>
</header>
```

### Call Center Tabs
```jsx
<div className="tabs tabs-bordered">
  <button 
    onClick={() => setActiveTab('dashboard')}
    className={`tab tab-bordered flex items-center gap-2 ${
      activeTab === 'dashboard' ? 'tab-active' : ''
    }`}
  >
    <PhoneIcon className="h-4 w-4" />
    Dashboard
  </button>
  <button 
    onClick={() => setActiveTab('settings')}
    className={`tab tab-bordered flex items-center gap-2 ${
      activeTab === 'settings' ? 'tab-active' : ''
    }`}
  >
    <UserCircleIcon className="h-4 w-4" />
    Settings
  </button>
</div>
```

### Search Form
```jsx
<div className="form-control">
  <div className="input-group">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search"
      className="input input-bordered w-64"
    />
    <button className="btn btn-square">
      <MagnifyingGlassIcon className="h-5 w-5" />
    </button>
  </div>
</div>
```

This manual provides comprehensive guidance for using DaisyUI effectively in your VoIP Dashboard project. The components are designed to work seamlessly with Tailwind CSS while providing semantic, accessible, and customizable UI elements.