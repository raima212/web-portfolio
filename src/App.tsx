import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ErrorBoundary from './components/ErrorBoundary'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { useState } from 'react'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-scroll">
          <ErrorBoundary>
            <Navbar onCollapseChange={setIsCollapsed} />
          </ErrorBoundary>
          <div className={`transition-all duration-300 pt-16 md:pt-0 ${
            isCollapsed ? 'md:ml-12' : 'md:ml-64'
          }`}>
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Experience />
            </ErrorBoundary>
            <ErrorBoundary>
              <Education />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </div>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
