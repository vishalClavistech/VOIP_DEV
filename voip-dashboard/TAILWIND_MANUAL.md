# Tailwind CSS Manual - Complete Usage Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core Concepts](#core-concepts)
4. [Layout Utilities](#layout-utilities)
5. [Spacing Utilities](#spacing-utilities)
6. [Typography Utilities](#typography-utilities)
7. [Color Utilities](#color-utilities)
8. [Background Utilities](#background-utilities)
9. [Border Utilities](#border-utilities)
10. [Flexbox & Grid](#flexbox--grid)
11. [Positioning](#positioning)
12. [Sizing](#sizing)
13. [Responsive Design](#responsive-design)
14. [State Variants](#state-variants)
15. [Customization](#customization)
16. [Best Practices](#best-practices)
17. [Troubleshooting](#troubleshooting)

---

## Introduction

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup. It follows a mobile-first approach and provides excellent developer experience with IntelliSense support.

### Key Features
- **Utility-First**: Small, composable utility classes
- **Responsive Design**: Mobile-first responsive utilities
- **State Variants**: Hover, focus, active, and other state modifiers
- **Customizable**: Highly configurable design system
- **Performance**: Purges unused CSS in production
- **Developer Experience**: Excellent tooling and IntelliSense

---

## Installation & Setup

### 1. Install Tailwind CSS
```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        figma: {
          blue: '#3B82F6',
          green: '#10B981',
          dark: '#1F2937',
          gray: '#6B7280',
          grayLight: '#F3F4F6',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config
```

### 3. Add Tailwind to CSS
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom components */
@layer components {
  .btn-custom {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## Core Concepts

### Utility Classes
Tailwind uses utility classes that map directly to CSS properties:

```jsx
// Instead of writing CSS
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>

// This generates:
// .bg-blue-500 { background-color: #3b82f6; }
// .text-white { color: #ffffff; }
// .p-4 { padding: 1rem; }
// .rounded-lg { border-radius: 0.5rem; }
```

### Responsive Design
Tailwind uses a mobile-first approach:

```jsx
// Mobile: 1 column, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Mobile: hidden, Desktop: visible
<div className="hidden md:block">
  Desktop only content
</div>
```

### State Variants
Tailwind provides state modifiers for interactive elements:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 active:bg-blue-700 disabled:opacity-50">
  Click me
</button>
```

---

## Layout Utilities

### Display
```jsx
<div className="block">Block element</div>
<div className="inline">Inline element</div>
<div className="inline-block">Inline-block element</div>
<div className="flex">Flex container</div>
<div className="grid">Grid container</div>
<div className="hidden">Hidden element</div>
```

### Position
```jsx
<div className="static">Static positioning</div>
<div className="relative">Relative positioning</div>
<div className="absolute">Absolute positioning</div>
<div className="fixed">Fixed positioning</div>
<div className="sticky">Sticky positioning</div>
```

### Z-Index
```jsx
<div className="z-0">Behind other elements</div>
<div className="z-10">Above z-0 elements</div>
<div className="z-20">Above z-10 elements</div>
<div className="z-50">Above z-20 elements</div>
<div className="z-auto">Automatic z-index</div>
```

---

## Spacing Utilities

### Padding
```jsx
<div className="p-0">No padding</div>
<div className="p-1">Padding 0.25rem</div>
<div className="p-2">Padding 0.5rem</div>
<div className="p-4">Padding 1rem</div>
<div className="p-8">Padding 2rem</div>

{/* Directional padding */}
<div className="pt-4">Padding top</div>
<div className="pr-4">Padding right</div>
<div className="pb-4">Padding bottom</div>
<div className="pl-4">Padding left</div>
<div className="px-4">Padding horizontal</div>
<div className="py-4">Padding vertical</div>
```

### Margin
```jsx
<div className="m-0">No margin</div>
<div className="m-1">Margin 0.25rem</div>
<div className="m-2">Margin 0.5rem</div>
<div className="m-4">Margin 1rem</div>
<div className="m-8">Margin 2rem</div>

{/* Directional margin */}
<div className="mt-4">Margin top</div>
<div className="mr-4">Margin right</div>
<div className="mb-4">Margin bottom</div>
<div className="ml-4">Margin left</div>
<div className="mx-4">Margin horizontal</div>
<div className="my-4">Margin vertical</div>

{/* Auto margin */}
<div className="mx-auto">Center horizontally</div>
<div className="ml-auto">Push to right</div>
<div className="mr-auto">Push to left</div>
```

### Gap (for Flexbox and Grid)
```jsx
<div className="flex gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Typography Utilities

### Font Size
```jsx
<p className="text-xs">Extra small text</p>
<p className="text-sm">Small text</p>
<p className="text-base">Base text (16px)</p>
<p className="text-lg">Large text</p>
<p className="text-xl">Extra large text</p>
<p className="text-2xl">2x large text</p>
<p className="text-3xl">3x large text</p>
<p className="text-4xl">4x large text</p>
```

### Font Weight
```jsx
<p className="font-thin">Thin (100)</p>
<p className="font-light">Light (300)</p>
<p className="font-normal">Normal (400)</p>
<p className="font-medium">Medium (500)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-bold">Bold (700)</p>
<p className="font-extrabold">Extra bold (800)</p>
<p className="font-black">Black (900)</p>
```

### Text Alignment
```jsx
<p className="text-left">Left aligned</p>
<p className="text-center">Center aligned</p>
<p className="text-right">Right aligned</p>
<p className="text-justify">Justified</p>
```

### Text Decoration
```jsx
<p className="underline">Underlined text</p>
<p className="line-through">Strikethrough text</p>
<p className="no-underline">No decoration</p>
```

### Line Height
```jsx
<p className="leading-none">Tight line height</p>
<p className="leading-tight">Tight line height</p>
<p className="leading-normal">Normal line height</p>
<p className="leading-relaxed">Relaxed line height</p>
<p className="leading-loose">Loose line height</p>
```

---

## Color Utilities

### Text Colors
```jsx
<p className="text-black">Black text</p>
<p className="text-white">White text</p>
<p className="text-gray-500">Gray text</p>
<p className="text-red-500">Red text</p>
<p className="text-blue-500">Blue text</p>
<p className="text-green-500">Green text</p>
<p className="text-yellow-500">Yellow text</p>
<p className="text-purple-500">Purple text</p>
```

### Background Colors
```jsx
<div className="bg-white">White background</div>
<div className="bg-black">Black background</div>
<div className="bg-gray-100">Light gray background</div>
<div className="bg-red-500">Red background</div>
<div className="bg-blue-500">Blue background</div>
<div className="bg-green-500">Green background</div>
```

### Border Colors
```jsx
<div className="border border-gray-300">Gray border</div>
<div className="border border-red-500">Red border</div>
<div className="border border-blue-500">Blue border</div>
<div className="border-t border-green-500">Green top border</div>
```

### Opacity
```jsx
<div className="bg-blue-500 opacity-50">50% opacity</div>
<div className="bg-blue-500 opacity-75">75% opacity</div>
<div className="bg-blue-500/50">50% opacity (modern syntax)</div>
<div className="bg-blue-500/75">75% opacity (modern syntax)</div>
```

---

## Background Utilities

### Background Colors
```jsx
<div className="bg-white">White background</div>
<div className="bg-gray-50">Very light gray</div>
<div className="bg-gray-100">Light gray</div>
<div className="bg-gray-900">Dark gray</div>
<div className="bg-blue-500">Blue background</div>
```

### Background Images
```jsx
<div className="bg-image bg-cover bg-center" style={{backgroundImage: 'url(/image.jpg)'}}>
  Background image
</div>
```

### Gradients
```jsx
<div className="bg-gradient-to-r from-blue-500 to-green-500">
  Left to right gradient
</div>
<div className="bg-gradient-to-b from-blue-500 to-green-500">
  Top to bottom gradient
</div>
<div className="bg-gradient-to-br from-blue-500 to-green-500">
  Diagonal gradient
</div>
```

### Background Size
```jsx
<div className="bg-cover">Cover entire element</div>
<div className="bg-contain">Contain within element</div>
<div className="bg-auto">Auto size</div>
```

---

## Border Utilities

### Border Width
```jsx
<div className="border">1px border</div>
<div className="border-2">2px border</div>
<div className="border-4">4px border</div>
<div className="border-t">Top border only</div>
<div className="border-r">Right border only</div>
<div className="border-b">Bottom border only</div>
<div className="border-l">Left border only</div>
```

### Border Radius
```jsx
<div className="rounded-none">No radius</div>
<div className="rounded-sm">Small radius</div>
<div className="rounded">Default radius</div>
<div className="rounded-md">Medium radius</div>
<div className="rounded-lg">Large radius</div>
<div className="rounded-xl">Extra large radius</div>
<div className="rounded-2xl">2x large radius</div>
<div className="rounded-full">Fully rounded</div>
```

### Border Style
```jsx
<div className="border-solid">Solid border</div>
<div className="border-dashed">Dashed border</div>
<div className="border-dotted">Dotted border</div>
<div className="border-double">Double border</div>
```

---

## Flexbox & Grid

### Flexbox
```jsx
{/* Flex container */}
<div className="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

{/* Flex direction */}
<div className="flex flex-row">Horizontal (default)</div>
<div className="flex flex-col">Vertical</div>
<div className="flex flex-row-reverse">Horizontal reversed</div>
<div className="flex flex-col-reverse">Vertical reversed</div>

{/* Justify content */}
<div className="flex justify-start">Start</div>
<div className="flex justify-center">Center</div>
<div className="flex justify-end">End</div>
<div className="flex justify-between">Space between</div>
<div className="flex justify-around">Space around</div>
<div className="flex justify-evenly">Space evenly</div>

{/* Align items */}
<div className="flex items-start">Align start</div>
<div className="flex items-center">Align center</div>
<div className="flex items-end">Align end</div>
<div className="flex items-stretch">Stretch</div>
<div className="flex items-baseline">Baseline</div>

{/* Flex wrap */}
<div className="flex flex-wrap">Wrap</div>
<div className="flex flex-nowrap">No wrap</div>
<div className="flex flex-wrap-reverse">Wrap reversed</div>

{/* Flex grow/shrink */}
<div className="flex-1">Grow to fill space</div>
<div className="flex-none">Don't grow or shrink</div>
<div className="flex-grow">Grow to fill space</div>
<div className="flex-shrink">Shrink if needed</div>
```

### Grid
```jsx
{/* Grid container */}
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Grid columns */}
<div className="grid grid-cols-1">1 column</div>
<div className="grid grid-cols-2">2 columns</div>
<div className="grid grid-cols-3">3 columns</div>
<div className="grid grid-cols-4">4 columns</div>
<div className="grid grid-cols-6">6 columns</div>
<div className="grid grid-cols-12">12 columns</div>

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Grid gaps */}
<div className="grid grid-cols-3 gap-2">Small gap</div>
<div className="grid grid-cols-3 gap-4">Medium gap</div>
<div className="grid grid-cols-3 gap-8">Large gap</div>

{/* Grid areas */}
<div className="grid grid-cols-3 grid-rows-3 gap-4">
  <div className="col-span-2">Spans 2 columns</div>
  <div className="row-span-2">Spans 2 rows</div>
  <div className="col-span-2 row-span-2">Spans 2x2</div>
</div>
```

---

## Positioning

### Position Types
```jsx
<div className="static">Static positioning</div>
<div className="relative">Relative positioning</div>
<div className="absolute">Absolute positioning</div>
<div className="fixed">Fixed positioning</div>
<div className="sticky">Sticky positioning</div>
```

### Position Values
```jsx
{/* Top/Right/Bottom/Left */}
<div className="absolute top-0 left-0">Top left</div>
<div className="absolute top-0 right-0">Top right</div>
<div className="absolute bottom-0 left-0">Bottom left</div>
<div className="absolute bottom-0 right-0">Bottom right</div>
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Center</div>

{/* Insets */}
<div className="absolute inset-0">Fill parent</div>
<div className="absolute inset-x-0">Full width</div>
<div className="absolute inset-y-0">Full height</div>
```

### Z-Index
```jsx
<div className="z-0">Behind</div>
<div className="z-10">Above z-0</div>
<div className="z-20">Above z-10</div>
<div className="z-30">Above z-20</div>
<div className="z-40">Above z-30</div>
<div className="z-50">Above z-40</div>
```

---

## Sizing

### Width
```jsx
<div className="w-0">Width 0</div>
<div className="w-1">Width 0.25rem</div>
<div className="w-2">Width 0.5rem</div>
<div className="w-4">Width 1rem</div>
<div className="w-8">Width 2rem</div>
<div className="w-16">Width 4rem</div>
<div className="w-32">Width 8rem</div>
<div className="w-64">Width 16rem</div>
<div className="w-96">Width 24rem</div>

{/* Percentage widths */}
<div className="w-1/2">Width 50%</div>
<div className="w-1/3">Width 33.333%</div>
<div className="w-2/3">Width 66.666%</div>
<div className="w-1/4">Width 25%</div>
<div className="w-3/4">Width 75%</div>
<div className="w-full">Width 100%</div>
<div className="w-screen">Width 100vw</div>
<div className="w-auto">Width auto</div>
<div className="w-max">Width max-content</div>
<div className="w-min">Width min-content</div>
<div className="w-fit">Width fit-content</div>
```

### Height
```jsx
<div className="h-0">Height 0</div>
<div className="h-1">Height 0.25rem</div>
<div className="h-2">Height 0.5rem</div>
<div className="h-4">Height 1rem</div>
<div className="h-8">Height 2rem</div>
<div className="h-16">Height 4rem</div>
<div className="h-32">Height 8rem</div>
<div className="h-64">Height 16rem</div>
<div className="h-96">Height 24rem</div>

{/* Percentage heights */}
<div className="h-1/2">Height 50%</div>
<div className="h-1/3">Height 33.333%</div>
<div className="h-2/3">Height 66.666%</div>
<div className="h-1/4">Height 25%</div>
<div className="h-3/4">Height 75%</div>
<div className="h-full">Height 100%</div>
<div className="h-screen">Height 100vh</div>
<div className="h-auto">Height auto</div>
<div className="h-max">Height max-content</div>
<div className="h-min">Height min-content</div>
<div className="h-fit">Height fit-content</div>
```

### Max/Min Dimensions
```jsx
<div className="max-w-xs">Max width 20rem</div>
<div className="max-w-sm">Max width 24rem</div>
<div className="max-w-md">Max width 28rem</div>
<div className="max-w-lg">Max width 32rem</div>
<div className="max-w-xl">Max width 36rem</div>
<div className="max-w-2xl">Max width 42rem</div>
<div className="max-w-full">Max width 100%</div>

<div className="min-h-screen">Min height 100vh</div>
<div className="min-h-full">Min height 100%</div>
<div className="min-h-0">Min height 0</div>
```

---

## Responsive Design

### Breakpoints
Tailwind uses mobile-first responsive design with these breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### Responsive Utilities
```jsx
{/* Mobile first approach */}
<div className="text-sm md:text-base lg:text-lg">
  Small on mobile, base on tablet, large on desktop
</div>

{/* Hide/show on different screens */}
<div className="hidden md:block">
  Hidden on mobile, visible on tablet and up
</div>

<div className="block md:hidden">
  Visible on mobile, hidden on tablet and up
</div>

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Responsive spacing */}
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

{/* Responsive text */}
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>
```

### Container
```jsx
<div className="container mx-auto px-4">
  Centered container with responsive padding
</div>

<div className="container mx-auto px-4 max-w-4xl">
  Centered container with max width
</div>
```

---

## State Variants

### Hover
```jsx
<button className="bg-blue-500 hover:bg-blue-600">
  Hover to change background
</button>

<div className="text-gray-500 hover:text-gray-900">
  Hover to change text color
</div>

<div className="opacity-50 hover:opacity-100">
  Hover to change opacity
</div>
```

### Focus
```jsx
<input className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

<button className="bg-blue-500 focus:bg-blue-600 focus:ring-2 focus:ring-blue-300">
  Focus styles
</button>
```

### Active
```jsx
<button className="bg-blue-500 active:bg-blue-700">
  Active state
</button>
```

### Disabled
```jsx
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
  Disabled button
</button>
```

### Group Hover
```jsx
<div className="group">
  <div className="opacity-0 group-hover:opacity-100">
    Hover to show
  </div>
</div>
```

---

## Customization

### Custom Colors
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        brand: '#3B82F6',
      },
    },
  },
}
```

### Custom Spacing
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
}
```

### Custom Animations
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

### Custom Components
```css
/* src/app/globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
}
```

---

## Best Practices

### 1. Use Semantic HTML
```jsx
// ✅ Good - Semantic elements
<button className="btn btn-primary">Save</button>
<nav className="navbar">
  <ul className="menu">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Avoid - Generic divs
<div className="btn btn-primary">Save</div>
<div className="navbar">
  <div className="menu">
    <div><a href="/">Home</a></div>
  </div>
</div>
```

### 2. Mobile-First Approach
```jsx
// ✅ Good - Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// ❌ Avoid - Desktop first
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 3. Consistent Spacing
```jsx
// ✅ Good - Consistent spacing scale
<div className="space-y-4">
  <div className="p-4">Item 1</div>
  <div className="p-4">Item 2</div>
  <div className="p-4">Item 3</div>
</div>

// ❌ Avoid - Inconsistent spacing
<div className="space-y-2">
  <div className="p-6">Item 1</div>
  <div className="p-2">Item 2</div>
  <div className="p-8">Item 3</div>
</div>
```

### 4. Use Component Classes
```jsx
// ✅ Good - Reusable component classes
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>

// ❌ Avoid - Repeated utility classes
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Primary Button</button>
<button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Secondary Button</button>
```

### 5. Responsive Design
```jsx
// ✅ Good - Responsive design
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Troubleshooting

### Common Issues

#### 1. Styles Not Applied
**Problem**: Tailwind classes not working
**Solution**: 
- Check if Tailwind is properly configured
- Ensure classes are in the content paths
- Verify PostCSS configuration

#### 2. Build Errors
**Problem**: Build fails with Tailwind errors
**Solution**:
- Clear build cache: `rm -rf .next node_modules/.cache`
- Check for syntax errors in config
- Verify all dependencies are installed

#### 3. Responsive Issues
**Problem**: Responsive classes not working
**Solution**:
- Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Verify breakpoint usage
- Test on actual devices

#### 4. Custom Classes Not Working
**Problem**: Custom component classes not applied
**Solution**:
- Check `@layer components` directive
- Verify CSS import order
- Ensure classes are defined before use

### Debug Mode
Enable Tailwind debug mode:
```typescript
// tailwind.config.ts
export default {
  // ... other config
  plugins: [
    require('tailwindcss/debug'),
  ],
}
```

---

## Examples from VoIP Dashboard

### Sidebar Component
```jsx
<div className={`
  fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
  <div className="flex items-center justify-between p-6 border-b border-gray-200">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
        <PhoneIcon className="h-6 w-6 text-white" />
      </div>
      <div className="font-bold text-xl text-gray-900">Zyra VoIP</div>
    </div>
    <button
      onClick={onClose}
      className="btn btn-ghost btn-sm"
      aria-label="Close sidebar"
    >
      <XMarkIcon className="h-5 w-5" />
    </button>
  </div>
</div>
```

### Call Center Table
```jsx
<div className="card bg-white shadow-xl overflow-hidden">
  <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left px-6 py-4 font-semibold text-gray-600 text-sm">Date</th>
          <th className="text-left px-6 py-4 font-semibold text-gray-600 text-sm">From</th>
          <th className="text-left px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <tr key={call.id} className="hover">
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">{call.date}</div>
            </td>
            <td className="px-6 py-4">
              <div className="font-mono text-sm text-gray-900">{call.from}</div>
            </td>
            <td className="px-6 py-4">
              <span className="text-sm font-bold capitalize text-blue-600">{call.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

### Search Form
```jsx
<div className="flex items-center gap-4">
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
  <button className="btn btn-primary">
    <DocumentArrowDownIcon className="h-4 w-4" />
    Export CSV
  </button>
</div>
```

This manual provides comprehensive guidance for using Tailwind CSS effectively in your VoIP Dashboard project. Tailwind's utility-first approach combined with DaisyUI components creates a powerful and maintainable styling system.