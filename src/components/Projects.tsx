import { useState, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { Github, X, Calendar, Users, Globe } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextType from './ui/TextType'
import SquaresBackground from './ui/SquaresBackground'
import { useLanguage } from '../hooks/useLanguage'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  period: string
  teamSize: string
  features: string[]
  challenges: string[]
  results: string[]
  liveUrl?: string
  githubUrl?: string
  color: string
}

// Skeleton Loader Component
const ProjectSkeleton = () => (
  <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden animate-pulse">
    <div className="h-32 bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-14"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
)

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'West LA',
      description: (t('project.description_1')),
      longDescription: (t('project.longDescription_1')),
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker', 'AWS', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Next.js', 'REST APIs', 'API Documentation', 'API Security', 'API Performance'],
      category: 'Full Stack',
      period: '2024 - 2025',
      teamSize: '2 Developer',
      features: [
        (t('project.features_1')),
        (t('project.features_2')),
        (t('project.features_3')),
        (t('project.features_4')),
        (t('project.features_5')),
        (t('project.features_6')),
        (t('project.features_7')),
        (t('project.features_8')),
        (t('project.features_9'))
      ],  
      challenges: [
        (t('project.challenges_1')),
        (t('project.challenges_2')),
        (t('project.challenges_3'))
      ],
      results: [
        (t('project.results_1')),
        (t('project.results_2')),
        (t('project.results_3')),
        (t('project.results_4'))
      ],
      liveUrl: 'https://westla.online',
    /*  githubUrl: 'https://github.com/ilker/ecommerce', */
      color: 'from-blue-600 to-blue-800'
    },
    // {
    //   id: 2,
    //   title: 'NullSect Development',
    //   description: 'FiveM Script Development Platform (Full-Stack)',
    //   longDescription: 'A professional platform providing custom script development, modification, and technical support services for FiveM server owners. Built with React.js, TypeScript, and Tailwind CSS. Features responsive design with glass morphism effects and dark theme optimized for gaming community.',
    //   image: '/api/placeholder/400/300',
    //   technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'GitHub', 'Responsive Design', 'SEO Optimization', 'Glass Morphism', 'Dark Theme', 'Component Architecture', 'Performance Optimization', 'Accessibility'],
    //   category: 'Full Stack',
    //   period: '2024',
    //   teamSize: '1 Developer',
    //   features: [
    //     'Responsive design with glass morphism effects and dark theme optimized for gaming community',
    //     'Multi-page structure including services showcase, product portfolio, and company information',
    //     'Interactive animations with hover effects and smooth transitions',
    //     'Performance optimization with component-based architecture and type-safe development',
    //     'SEO optimized with semantic HTML structure and accessibility compliance',
    //     'Professional service platform for the gaming industry',
    //     'Custom script development and modification services',
    //     'Technical support services for FiveM server owners'
    //   ],
    //   challenges: [
    //     'Creating gaming-optimized UI/UX design',
    //     'Implementing glass morphism effects',
    //     'Performance optimization for gaming community',
    //     'SEO and accessibility compliance'
    //   ],
    //   results: [
    //     'Professional gaming platform',
    //     'Modern React.js development showcase',
    //     'UI/UX design principles demonstration',
    //     'SEO and accessibility compliant'
    //   ],
    //   liveUrl: 'https://nullsect.vercel.app',
    //   githubUrl: 'https://github.com/MelihIlker/nullsect',
    //   color: 'from-purple-600 to-purple-800'
    // },
    {
      id: 3,
      title: 'Web Portfolio',
      description: (t('project.description_2')),
      longDescription: (t('project.longDescription_2')),
      image: '/api/placeholder/400/300',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Lucide React', 'PWA', 'SEO', 'Performance Optimization', 'Canvas API', 'Intersection Observer', 'Service Worker', 'Vercel'],
      category: 'Frontend',
      period: '2025',
      teamSize: '1 Developer',
      features: [
        (t('project.features_10')),
        (t('project.features_11')),
        (t('project.features_12')),
        (t('project.features_13')),
        (t('project.features_14')),
        (t('project.features_15')),
      ],
      challenges: [
        (t('project.challenges_4')),
        (t('project.challenges_5')),
        (t('project.challenges_6')),
      ],
      results: [
        (t('project.results_5')),
        (t('project.results_6')),
        (t('project.results_7')),
        (t('project.results_8')),
      ],
      liveUrl: 'https://melihilker-portfolio.vercel.app',
      githubUrl: 'https://github.com/MelihIlker/personal-website',
      color: 'from-indigo-600 to-indigo-800'
    },
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project)
    // Disable body scroll when modal opens
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    // Re-enable body scroll when modal closes
    document.body.style.overflow = 'auto'
  }

  return (
    <section ref={ref} id="projects" className="py-24 bg-gray-800 relative">
      <SquaresBackground 
        speed={0.7}
        squareSize={50}
        direction="down"
        borderColor="#111827"
        hoverFillColor="#0f172a"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <Github className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">projects.json</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Projects
          </h2>
          <p className="text-lg text-green-400 max-w-3xl mx-auto font-mono">
            <TextType 
              text={t('projects.description')} 
              speed={30} 
              delay={isVisible ? 500 : 0}
            />
          </p>
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Suspense fallback={
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          }>
            {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded overflow-hidden hover:border-gray-600 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(project)}
            >
              {/* Project Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs font-mono rounded">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize}</span>
                  </div>
                </div>

                {/* Landing Links */}
                <div className="flex gap-3 mt-auto">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 rounded transition-all duration-300 text-sm font-mono"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 rounded transition-all duration-300 text-sm font-mono"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          </Suspense>
        </div>

        {/* Project Modal */}
        {selectedProject && createPortal(
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
            onClick={closeModal}
            data-modal="true"
          >
            <div 
              className="bg-gray-900 border border-gray-800 rounded max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm font-mono ml-4">{selectedProject.title.toLowerCase().replace(/\s+/g, '_')}.md</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                    <span className="text-gray-400 text-sm font-mono">{selectedProject.category}</span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Links */}
                <div className="flex gap-3 mb-6">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded transition-all duration-300 text-sm font-mono"
                    >
                      <Globe className="w-4 h-4" />
                      live_demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded transition-all duration-300 text-sm font-mono"
                    >
                      <Github className="w-4 h-4" />
                      source_code
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-mono text-green-400 mb-3">// description</h3>
                  <p className="text-gray-300 leading-relaxed font-mono text-sm">{selectedProject.longDescription}</p>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-3">// project_details</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedProject.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{selectedProject.teamSize}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-3">// tech_stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 rounded text-xs transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-mono text-green-400 mb-3">// features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400 text-sm font-mono">
                        <span className="text-gray-600">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges and Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-3">// challenges</h4>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-400 text-sm font-mono">
                          <span className="text-gray-600">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-3">// results</h4>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-400 text-sm font-mono">
                          <span className="text-gray-600">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        , document.body)}
      </div>
    </section>
  )
}

export default Projects
