# 🚀 Portfolio Website

> A modern, responsive portfolio website showcasing professional work and skills with elegant animations and interactive features.

## ✨ Features

- **🎨 Animated Grid Backgrounds**: Dynamic canvas-based grid animations that respond to user interaction
- **📱 Responsive Design**: Optimized for all device sizes with mobile-first approach
- **🌍 Internationalization**: Complete Turkish and English language support
- **🎯 Interactive Project Showcase**: Detailed project modals with technology stacks and live demos
- **📊 Animated Skill Visualization**: Dynamic progress bars with smooth count-up animations
- **⚡ Performance Optimized**: Lazy loading, error boundaries, and efficient rendering
- **🎭 Smooth Animations**: Powered by Framer Motion for seamless user experience
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 PWA Ready**: Service Worker, manifest.json, and offline capabilities
- **📈 Performance Monitoring**: Lighthouse score 92+ with optimized Core Web Vitals

## 🛠 Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and gesture library
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules

### Performance & Optimization
- **React Lazy Load Image** - Optimized image loading
- **Custom Hooks** - Reusable logic abstraction
- **Error Boundaries** - Graceful error handling
- **Code Splitting** - Bundle optimization with Vite

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/MelihIlker/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   │   ├── SquaresBackground.tsx  # Canvas-based animated grid
│   │   ├── GradientText.tsx       # Gradient text effects
│   │   └── TextType.tsx           # Typewriter effect
│   ├── Hero.tsx        # Landing section
│   ├── Projects.tsx    # Project showcase
│   ├── Skills.tsx      # Skills visualization
│   ├── Experience.tsx  # Work experience
│   ├── Education.tsx   # Education background
│   ├── Contact.tsx     # Contact information
│   ├── Footer.tsx      # Footer component
│   ├── Navbar.tsx      # Navigation sidebar
│   ├── Accessibility.tsx # Accessibility features
│   ├── MicroInteractions.tsx # UI micro-interactions
│   ├── ErrorBoundary.tsx # Error handling
│   └── SkeletonLoader.tsx # Loading states
├── hooks/              # Custom React hooks
│   ├── useScrollAnimation.ts  # Scroll-triggered animations
│   ├── useLanguage.ts         # Internationalization
│   ├── useCountUp.ts          # Number counting animations
│   └── useAccessibility.ts    # Accessibility features
├── contexts/           # React contexts
│   └── LanguageContext.tsx    # Language state management
└── types/              # TypeScript type definitions
    └── react-lazy-load-image-component.d.ts
```

## 🎯 Key Components

### Interactive Elements
- **SquaresBackground**: Custom canvas-based animated grid system with smooth 60fps animations
- **TextType**: Typewriter effect component for dynamic text animation
- **ProjectModal**: Detailed project information with technology stacks and live demos
- **SkillProgress**: Animated progress bars with count-up effects
- **Footer**: Terminal-style footer with social links and contact information

### Custom Hooks
- **useScrollAnimation**: Handles scroll-triggered animations with Intersection Observer
- **useLanguage**: Manages internationalization state with localStorage persistence
- **useCountUp**: Creates smooth number counting animations
- **useAccessibility**: Keyboard navigation and accessibility features

## 🌍 Internationalization

The portfolio supports both Turkish and English with:
- Complete UI translation
- Language persistence in localStorage
- Dynamic language switching
- Context-based translation system

## 📱 Responsive Design

Optimized for all screen sizes:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling
- Mobile sidebar with overlay

## ⚡ Performance Features

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Manual chunks for vendor, animations, and UI components
- **Error Boundaries**: Graceful error handling and recovery
- **Skeleton Loaders**: Improved perceived performance
- **Optimized Animations**: 60fps smooth canvas animations
- **Critical CSS**: Inline critical CSS for faster initial render
- **Font Preloading**: Google Fonts preloaded for better performance
- **Async CSS Loading**: Non-blocking CSS loading

## 🎨 Canvas API Implementation

The `SquaresBackground` component uses HTML5 Canvas for:
- **Dynamic Grid Generation**: Responsive grid that adapts to screen size
- **Smooth Animations**: 60fps animations with `requestAnimationFrame`
- **Performance Optimization**: 
  - `devicePixelRatio` support for retina displays
  - Optimized drawing with `lineWidth: 0.5` and `lineCap: 'round'`
  - Sub-pixel precision rendering
- **Animation Control**: Direction-based movement (up/down) with smooth transitions

## 🔧 PWA Features

- **Service Worker**: `sw.js` for offline capabilities and caching
- **Web App Manifest**: `manifest.json` with app metadata
- **Theme Color**: Dark theme support (`#1f2937`)
- **App Shortcuts**: Quick access to Projects and Contact sections
- **Installable**: Can be installed as a PWA on mobile devices

## 📈 Performance Metrics

- **Lighthouse Score**: 92+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized LCP, FID, and CLS
- **Bundle Size**: Optimized with code splitting
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🚀 Deployment

### Vercel Deployment
The project is configured for Vercel with:
- **vercel.json**: Cache headers and build configuration
- **Static Assets**: 1-year cache for optimal performance
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`

```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions
- **Any Static Host**: Upload built files

## 🛠 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
No environment variables required for basic functionality.

## 📄 License

This project is licensed under the MIT License.

## 🌐 Live Demo

Visit the live website: [Click!](https://melihilker-portfolio.vercel.app)

---


Built with ❤️ using React, TypeScript, and Tailwind CSS