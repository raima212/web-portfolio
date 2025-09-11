import { GraduationCap, Award, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'
import { useLanguage } from '../hooks/useLanguage'

const Education = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { t } = useLanguage()
  const [commentText, isComplete] = useTypewriter(t('education.description'), 30, isVisible ? 500 : 0)

  const educationData = [
    {
      id: 1,
      school: 'Bandırma Onyedi Eylül Üniversitesi',
      degree: 'Bilgisayar Programcılığı',
      period: '2025 - 2027',
      gpa: '0.0/4.0',
      description: 'Bilgisayar Programcılığı bölümünde eğitim alıyorum. Modern web teknolojileri, veritabanı yönetimi ve mobil uygulama geliştirme konularında ileri seviye eğitim alıyorum.',
      achievements: [
        'Web Application Development',
        'Database Management',
        'Mobile Application Development',
        'Network Administration',
        'Cybersecurity',
        'Cloud Computing',
        'DevOps',
        'Operating Systems',
        'Data Structures and Algorithms',
      ],
      color: 'from-green-600 to-green-800'
    },
    {
        id: 2,
        school: 'Küçükyalı Mesleki ve Teknik Anadolu Lisesi',
        degree: 'Information Technology',
        period: '2020-2024',
        gpa: '85,75 / 100',
        description: 'Yazılım geliştirme, algoritma tasarımı ve sistem mimarisi konularında kapsamlı eğitim aldım. Web teknolojileri ve mobil uygulama geliştirme alanlarında projeler gerçekleştirdim.',
        achievements: [
          'Mobile Application Development',
          'Web Application Development',
          'Database Management',
          'Network Administration',
        ],
        color: 'from-blue-600 to-blue-800'
      },
    {
      id: 3,
      school: 'LinkedIn Learning',
      degree: 'API Development',
      period: '2025',
      gpa: 'Tamamlandı',
      description: 'API Development konularında ileri seviye eğitim aldım.',
      achievements: [
        'API Development',
        'API Testing',
        'Web Services',
        'REST APIs',
        'GraphQL',
        'API Documentation',
        'API Security',
        'API Performance',
      ],
      color: 'from-purple-600 to-purple-800'
    },
  ]


  return (
    <section ref={ref} id="education" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">education.md</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Education
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

        <div className="relative">
          {/* Scrollable Cards Container */}
          <div
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {educationData.map((education, index) => (
              <div
                key={education.id}
                className="flex-shrink-0 w-96 bg-gray-900 border border-gray-800 rounded p-4 hover:border-gray-600 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 text-gray-400 flex-shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{education.school}</h3>
                    <p className="text-gray-300 font-semibold">{education.degree}</p>
                  </div>
                </div>

                {/* Period and GPA */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{education.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{education.gpa}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {education.description}
                </p>

                {/* Achievements */}
                <div>
                  <h4 className="text-white font-semibold mb-3">{t('education.achievements')}</h4>
                  <ul className="space-y-2">
                    {education.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Stats - VS Code Style */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Education Institutions */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">education_stats.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">3+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('education.stats.institutions')}</div>
            </div>
          </div>
          
          {/* Certificates */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">certificates.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">2+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('education.stats.certificates')}</div>
            </div>
          </div>
          
          {/* Experience Years */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-gray-400 text-xs font-mono">experience_years.json</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-mono">8+</div>
              <div className="text-gray-300 font-mono text-sm">// {t('education.stats.experience')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
