import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ErrorBoundary from './components/ErrorBoundary'
import { useAutoScroll } from './hooks/useAutoScroll'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { useState } from 'react'

function App() {
  useAutoScroll()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-900 text-white overflow-y-scroll">
          <ErrorBoundary>
            <Navbar onCollapseChange={setIsCollapsed} />
          </ErrorBoundary>
          <div className={`transition-all duration-300 ${
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
    </ErrorBoundary>
  )
}

export default App
