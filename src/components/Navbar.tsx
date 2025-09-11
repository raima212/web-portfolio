import { useState, useEffect } from 'react'
import { 
  Home, 
  Code, 
  GraduationCap, 
  Briefcase, 
  FolderOpen, 
  Mail,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Globe
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void
}

const Sidebar = ({ onCollapseChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'experience', 'education', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.querySelector(`#${section}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { 
      name: 'App', 
      href: '#hero', 
      icon: Home,
      type: 'file',
      extension: '.tsx',
      translationKey: 'nav.home'
    },
    { 
      name: 'skills', 
      href: '#skills', 
      icon: Code,
      type: 'file',
      extension: '.json',
      translationKey: 'nav.skills'
    },
    { 
      name: 'experience', 
      href: '#experience', 
      icon: Briefcase,
      type: 'file',
      extension: '.json',
      translationKey: 'nav.experience'
    },
    { 
      name: 'education', 
      href: '#education', 
      icon: GraduationCap,
      type: 'file',
      extension: '.md',
      translationKey: 'nav.education'
    },
    { 
      name: 'projects', 
      href: '#projects', 
      icon: FolderOpen,
      type: 'folder',
      extension: '',
      translationKey: 'nav.projects'
    },
    { 
      name: 'contact', 
      href: '#contact', 
      icon: Mail,
      type: 'file',
      extension: '.js',
      translationKey: 'nav.contact'
    }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileOpen(false) // Close mobile menu after navigation
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 hover:text-white transition-colors duration-200"
      >
        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile Language Toggle Button */}
      <button
        onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
        className="md:hidden fixed top-4 left-16 z-[60] p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 hover:text-white transition-colors duration-200"
        title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
      >
        <Globe className="w-4 h-4" />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-700 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-12' : 'w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* VS Code Header */}
      <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center relative">
        {/* Traffic Lights */}
        <div className={`flex gap-1 ${isCollapsed ? 'justify-center w-full' : 'ml-3'}`}>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        {/* EXPLORER Text - Only when expanded */}
        {!isCollapsed && (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 text-xs font-mono">EXPLORER</span>
        )}
        
        {/* Language Toggle Button - Only when expanded */}
        {!isCollapsed && (
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-gray-300 hover:text-white transition-colors duration-200"
            title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
          >
            <Globe className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Portfolio Folder */}
      <div className="p-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-gray-300 text-sm font-mono mb-2">
            <ChevronDown className="w-3 h-3" />
            <Folder className="w-4 h-4 text-blue-400" />
            <span>mely-portfolio</span>
          </div>
        )}
        
        {/* Navigation Items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.name
            
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-left transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {item.type === 'folder' ? (
                  <Folder className="w-4 h-4 text-blue-400" />
                ) : (
                  <File className="w-4 h-4" />
                )}
                {!isCollapsed && (
                  <>
                    <span className="font-mono text-sm">{item.name}{item.extension}</span>
                    {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

        {/* Desktop Language Toggle Button - Only when collapsed */}
        {isCollapsed && (
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 hover:text-white transition-colors duration-200"
            title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
          >
            <Globe className="w-4 h-4" />
          </button>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => {
            const newCollapsed = !isCollapsed
            setIsCollapsed(newCollapsed)
            onCollapseChange?.(newCollapsed)
          }}
          className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 bg-gray-800 border border-gray-600 rounded-full items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </>
  )
}

export default Sidebar
