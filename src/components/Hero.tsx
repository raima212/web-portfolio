import { useState } from 'react'
import { Github, Linkedin, Mail, Terminal, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import TextType from './ui/TextType'
import GradientText from './ui/GradientText'
import SquaresBackground from './ui/SquaresBackground'
import { useLanguage } from '../hooks/useLanguage'


const Hero = () => {
  const { t } = useLanguage()
  
  // Typewriter animations
  const [whoamiComplete, setWhoamiComplete] = useState(false)
  const [nameComplete, setNameComplete] = useState(false)
  const [catComplete, setCatComplete] = useState(false)
  const [titleComplete, setTitleComplete] = useState(false)

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'MelihIlker-FullStack-Developer-CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden pt-24 pb-16">
      {/* Squares Background Pattern */}
      <SquaresBackground 
        speed={0.3}
        squareSize={30}
        direction="down"
        borderColor="#6b7280"
        hoverFillColor="#4b5563"
      />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            {/* Terminal Window */}
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-t-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm ml-4">mely@portfolio:~$</span>
              </div>
              
              {/* Terminal Content */}
              <div className="bg-gray-900 border border-gray-700 border-t-0 rounded-b-lg p-8 text-left font-mono">
                <div className="space-y-4">
                  {/* whoami command */}
                  <div className="flex items-center gap-2">
                    <TextType 
                      text="$ whoami" 
                      speed={20} 
                      delay={500}
                      className="text-green-400"
                      onComplete={() => setWhoamiComplete(true)}
                    />
                  </div>
                  
                  <div className="text-4xl lg:text-6xl font-bold text-white ml-4">
                    <TextType 
                      text={t('hero.name')} 
                      speed={30} 
                      delay={whoamiComplete ? 800 : 0}
                      onComplete={() => setNameComplete(true)}
                    />
                  </div>

                  {/* cat about.txt command */}
                  <div className="flex items-center gap-2 mt-8">
                    <TextType 
                      text="$ cat about.txt" 
                      speed={20} 
                      delay={nameComplete ? 1000 : 0}
                      className="text-green-400"
                      onComplete={() => setCatComplete(true)}
                    />
                  </div>
                  
                  <div className="ml-4 text-xl lg:text-2xl font-bold">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={3}
                      showBorder={false}
                      className=""
                    >
                      <TextType 
                        text={t('hero.title')} 
                        speed={30} 
                        delay={catComplete ? 800 : 0}
                        onComplete={() => setTitleComplete(true)}
                      />
                    </GradientText>
                  </div>

                  {/* Description with Typewriter Effect */}
                  <div className="text-lg text-gray-300 ml-4 max-w-2xl leading-relaxed">
                    <TextType 
                      text={t('hero.description')} 
                      speed={15} 
                      delay={titleComplete ? 800 : 0}
                    />
                  </div>

                  {/* Social Links */}
                  <motion.div 
                    className="flex gap-4 ml-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: titleComplete ? 1 : 0, y: titleComplete ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <a 
                      href="https://github.com/MelihIlker" 
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 text-gray-300" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/melihilker" 
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-gray-300" />
                    </a>
                    <a 
                      href="mailto:melihilker9@gmail.com" 
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <Mail className="w-5 h-5 text-gray-300" />
                    </a>
                  </motion.div>

                  {/* CTA Commands */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 ml-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: titleComplete ? 1 : 0, y: titleComplete ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.button 
                      onClick={scrollToProjects}
                      className="group flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Terminal className="w-4 h-4" />
                      <span>{t('hero.viewProjects')}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button 
                      onClick={downloadCV}
                      className="group flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-sm rounded transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{t('hero.downloadCV')}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero

