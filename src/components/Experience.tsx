import { Building2, Calendar, MapPin, Users, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'
import { useLanguage } from '../hooks/useLanguage'

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { t } = useLanguage()
  const [commentText, isComplete] = useTypewriter(t('experience.description'), 30, isVisible ? 500 : 0)
  const experiences = [
    {
      id: 1,
      company: 'Panasonic Electric Works Turkey',
      position: 'Software Internship',
      period: '2023 - 2024',
      location: 'İstanbul, Türkiye',
      type: 'Internship',
      description: 'Developed company-specific asset inventory management system and user-friendly department statistics reporting websites. Built web applications for scheduled company acivities and live currency exchange rates. Created custom admin panel applications tailored to internal needs. Monitored Oracle databases and performed regular Jira reporting while contributing to practical, user-oriented software solutions.',
      achievements: [
        'Developed company-specific asset inventory management system and user-friendly department statistics reporting websites.',
        'Built web applications for scheduled company acivities and live currency exchange rates.',
        'Created custom admin panel applications tailored to internal needs.',
        'Monitored Oracle databases and performed regular Jira reporting while contributing to practical, user-oriented software solutions.'
      ],
      technologies: ['.NET Framework', 'ASP.NET', '.NET MVC', 'SQL Server', 'Oracle', 'Jira', 'C#', 'JavaScript', 'HTML', 'CSS'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      company: 'Freelance Full Stack Developer',
      position: 'Full Stack Developer',
      period: '2016 - Present',
      location: 'Istanbul, Türkiye',
      type: 'Full-time',
      description: 'Successfully designed and developed more than 10 web applications utilizing modern JavaScript frameworks including React.js, Next.js, and Vite for enhanced development performance. Specialized in building complex multi-user systems that incorporate secure user authentication, real-time data synchronization, and interactive user dashboards. Effectively integrated various cloud services including AWS S3 for file storage and Supabase for backend functionality, ensuring scalable and maintainable solutions. Consistently maintained a 99% client satisfaction rate by delivering projects on time, maintaining clear communication throughout development cycles, and providing comprehensive technical support.',
      achievements: [
        'Successfully designed and developed more than 10 web applications utilizing modern JavaScript frameworks including React.js, Next.js, and Vite for enhanced development performance.',
        'Specialized in building complex multi-user systems that incorporate secure user authentication, real-time data synchronization, and interactive user dashboards.',
        'Effectively integrated various cloud services including AWS S3 for file storage and Supabase for backend functionality, ensuring scalable and maintainable solutions.',
        'Consistently maintained a 99% client satisfaction rate by delivering projects on time, maintaining clear communication throughout development cycles, and providing comprehensive technical support.'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Express.js', 'Vite', 'AWS S3', 'Supabase', 'MongoDB', 'PostgreSQL', 'Micsrofot SQL Server', 'MySQL', 'HeidiSQL', 'SQLite', 'Tailwind CSS',  'JavaScript', 'Java', 'Spring Boot', 'Git', 'HTML', 'CSS', 'REST APIs', 'GraphQL', 'API Documentation', 'API Security', 'API Performance'],
      color: 'from-green-600 to-green-800'
    },
  ]

  return (
    <section ref={ref} id="experience" className="py-24 bg-gray-800 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">experience.json</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Experience
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

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative mb-12 animate-fadeInUp`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-600"></div>
              )}

              <div className="flex items-start gap-6">
                {/* Timeline Dot */}
                <div className="w-8 h-8 text-gray-400 flex-shrink-0 relative z-10">
                  <Building2 className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-900 border border-gray-800 rounded p-4 hover:border-gray-600 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{experience.position}</h3>
                      <p className="text-xl text-gray-300 font-semibold">{experience.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mt-2 lg:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  {/* Location and Type */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{experience.type}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-gray-400" />
                      Önemli Başarılar
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                      {t('experience.technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 rounded text-xs transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Stats - VS Code Style */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Years of Experience */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">experience_years.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">8+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('experience.stats.years')}</div>
            </div>
          </div>
          
          {/* Completed Projects */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">completed_projects.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">50+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('experience.stats.projects')}</div>
            </div>
          </div>
          
          {/* Technologies */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">technologies.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">25+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('experience.stats.technologies')}</div>
            </div>
          </div>
          
          {/* Customer Satisfaction */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">customer_satisfaction.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">100%</div>
              <div className="text-gray-300 font-mono text-sm">// {t('experience.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
