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

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

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
│   ├── Hero.tsx        # Landing section
│   ├── Projects.tsx    # Project showcase
│   ├── Skills.tsx      # Skills visualization
│   └── Contact.tsx     # Contact information
├── hooks/              # Custom React hooks
│   ├── useScrollAnimation.ts
│   ├── useLanguage.ts
│   └── useCountUp.ts
├── contexts/           # React contexts
│   └── LanguageContext.tsx
└── types/              # TypeScript type definitions
```

## 🎯 Key Components

### Interactive Elements
- **SquaresBackground**: Custom canvas-based animated grid system
- **TextType**: Typewriter effect component for dynamic text animation
- **ProjectModal**: Detailed project information with technology stacks
- **SkillProgress**: Animated progress bars with count-up effects

### Custom Hooks
- **useScrollAnimation**: Handles scroll-triggered animations
- **useLanguage**: Manages internationalization state
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

## ⚡ Performance Features

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic bundle optimization
- **Error Boundaries**: Graceful error handling
- **Skeleton Loaders**: Improved perceived performance
- **Optimized Animations**: 60fps smooth animations

## 🚀 Deployment

The project can be deployed to any static hosting platform:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions
- **Any Static Host**: Upload built files

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This project was developed with assistance from AI for some code optimization, documentation(README), and some implementation details.

Built with ❤️ using React, TypeScript, and Tailwind CSS