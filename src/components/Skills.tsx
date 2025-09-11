import { useState, useEffect } from 'react'
import { 
  Code, 
  Server, 
  Database, 
  Wrench
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'
import { useLanguage } from '../hooks/useLanguage'
import { SkillsSkeleton } from './SkeletonLoader'

// CountUp Number Component - Simple and Reliable
const CountUpNumber = ({ end, isVisible, delay }: { end: number, isVisible: boolean, delay: number }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (isVisible) {
      // Reset to 0 first
      setCount(0)
      
      // Start animation after delay
      const timer = setTimeout(() => {
        let currentCount = 0
        const increment = end / 30 // 30 steps
        const interval = setInterval(() => {
          currentCount += increment
          if (currentCount >= end) {
            setCount(end)
            clearInterval(interval)
          } else {
            setCount(Math.floor(currentCount))
          }
        }, 50) // 20fps
        
        return () => clearInterval(interval)
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    } else {
      setCount(0)
    }
  }, [isVisible, end, delay])
  
  return (
    <span className="text-green-400 text-sm font-mono">
      {count}%
    </span>
  )
}

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { t } = useLanguage()
  const [commentText, isComplete] = useTypewriter(t('skills.description'), 30, isVisible ? 500 : 0)
  
  // CountUp animation state
  const [animationStarted, setAnimationStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (isVisible && !animationStarted) {
      setAnimationStarted(true)
    }
  }, [isVisible, animationStarted])
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Vue.js', level: 75 },
        { name: 'SASS/SCSS', level: 85 }
      ]
    },
    {
      title: t('skills.backend'),
      icon: <Server className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Django', level: 70 },
        { name: 'FastAPI', level: 75 },
        { name: 'REST APIs', level: 90 }
      ]
    },
    {
      title: t('skills.database'),
      icon: <Database className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'Redis', level: 70 },
        { name: 'Firebase', level: 80 },
        { name: 'Prisma', level: 75 }
      ]
    },
    {
      title: t('skills.tools'),
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Vercel', level: 85 },
        { name: 'Figma', level: 80 },
        { name: 'VS Code', level: 95 }
      ]
    }
  ]

  return (
    <section ref={ref} id="skills" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <Code className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">skills.json</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-green-400 max-w-3xl mx-auto font-mono">
            {commentText}
            {!isComplete && (
              <motion.span 
                className="text-green-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              >
                |
              </motion.span>
            )}
          </p>
        </div>

        {isLoading ? (
          <SkillsSkeleton />
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Terminal-like header */}
              <div className="flex items-center gap-6 mb-6">
                <div className="w-6 h-6 text-gray-400">
                  {category.icon}
                </div>
                <span className="text-gray-400 text-xs font-mono">{category.title.toLowerCase()}.json</span>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="animate-fadeInUp" style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-mono text-sm">{skill.name}</span>
                      <CountUpNumber 
                        end={skill.level} 
                        isVisible={isVisible} 
                        delay={0.5 + (index * 0.2) + (skillIndex * 0.1)}
                      />
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-2 bg-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 2, 
                          delay: 0.5 + (index * 0.2) + (skillIndex * 0.1),
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Additional Skills */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <Code className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">additional_skills.json</span>
          </div>
          <h3 className="text-2xl font-bold mb-8 text-white font-mono">// {t('skills.additional')}</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Agile/Scrum', 'CI/CD', 'Microservices', 'GraphQL', 
              'WebSocket', 'JWT', 'OAuth', 'Responsive Design',
              'SEO', 'Performance Optimization', 'Testing', 'Code Review'
            ].map((skill, index) => (
              <span 
                key={skill}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 rounded text-sm transition-all duration-300 cursor-default font-mono"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
