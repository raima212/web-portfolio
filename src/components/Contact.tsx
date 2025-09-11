import { useState } from 'react'
import { Mail, MapPin, Download, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'
import { useLanguage } from '../hooks/useLanguage'
// Removed EmailJS, using Formspree instead

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { t } = useLanguage()
  const [commentText, isComplete] = useTypewriter(t('contact.description'), 30, isVisible ? 500 : 0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    
    try {
      // Formspree configuration
      const formspreeEndpoint = import.meta.env.VITE_FORMPREE_ENDPOINT || 'https://formspree.io/f/xdklppjn'
      
      // Send email using Formspree
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${formData.subject}`
        }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Reset success status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error('Form submission failed')
      }
      
    } catch (error) {
      console.error('Email sending error:', error)
      setSubmitStatus('error')
      setErrorMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      title: 'Email',
      value: 'melihilker9@gmail.com',
      link: 'mailto:melihilker9@gmail.com'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      title: t('contact.location'),
      value: t('contact.locationValue'),
      link: '#'
    }
  ]

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      url: 'https://github.com/MelihIlker',
      color: 'hover:bg-gray-600'
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      url: 'https://www.linkedin.com/in/melihilker',
      color: 'hover:bg-gray-600'
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      url: 'https://www.instagram.com/melihilker0',
      color: 'hover:bg-gray-600'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      url: 'mailto:melihilker9@gmail.com',
      color: 'hover:bg-gray-600'
    }
  ]

  return (
    <section ref={ref} id="contact" className="py-20 bg-gray-800 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg mb-6">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-mono text-sm">contact.js</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Contact
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

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Contact Information */}
          <div className="animate-fadeInLeft">
            {/* Terminal-like header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700 border border-gray-600 rounded-t-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-xs ml-2 font-mono">contact_info.json</span>
              </div>
              <div className="bg-gray-900 border border-gray-600 border-t-0 rounded-b-lg p-4">
                <h3 className="text-xl font-mono text-white mb-4">$ cat contact_info.json</h3>
                
                {/* Contact Cards */}
                <div className="space-y-4 mb-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded hover:border-gray-600 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-mono text-sm">{info.title}</h4>
                        <p className="text-gray-400 text-xs font-mono">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mb-4">
                  <h4 className="text-sm font-mono text-green-400 mb-3">// social_links</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-gray-300 transition-all duration-300"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* CV Download */}
                <div className="bg-gray-800 border border-gray-700 rounded p-4">
                  <h4 className="text-sm font-mono text-green-400 mb-2">// {t('contact.downloadCV')}</h4>
                  <p className="text-gray-400 text-xs mb-3 font-mono">
                    {t('contact.cvDescription')}
                  </p>
                  <a 
                    href="/cv.pdf" 
                    download="MelihIlker-FullStack-Developer-CV.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-mono rounded border border-gray-600 transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    {t('contact.downloadCVButton')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fadeInRight">
            {/* Terminal-like header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700 border border-gray-600 rounded-t-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-xs ml-2 font-mono">contact_form.js</span>
              </div>
              <div className="bg-gray-900 border border-gray-600 border-t-0 rounded-b-lg p-4">
                <h3 className="text-xl font-mono text-white mb-4">$ node contact_form.js</h3>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-900/50 border border-green-600 rounded flex items-center gap-2 text-green-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-mono">Mesaj başarıyla gönderildi!</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded flex items-center gap-2 text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-mono">{errorMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label="İletişim formu">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-mono text-green-400 mb-2">
                          // name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Adınız ve soyadınız"
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-mono text-green-400 mb-2">
                          // email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="ornek@email.com"
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-mono text-green-400 mb-2">
                        // subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Mesaj konusu"
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-mono text-green-400 mb-2">
                        // message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Mesajınızı buraya yazın..."
                        required
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? 'Mesaj gönderiliyor' : 'Mesajı gönder'}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-mono rounded border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                          <span>sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>{t('contact.sendMessage')}</span>
                        </>
                      )}
                    </button>
                  </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Terminal Style */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Terminal-like header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700 border border-gray-600 rounded-t-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-xs ml-2 font-mono">footer.js</span>
            </div>
            <div className="bg-gray-900 border border-gray-600 border-t-0 rounded-b-lg p-6">
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-gray-400 font-mono text-sm mb-2">
                    // {t('footer.version')}
                  </p>
                  <p className="text-gray-300 font-mono text-sm">
                    {t('footer.copyright')}
                  </p>
                </div>
                
                <div className="flex justify-center items-center gap-4 text-xs font-mono text-gray-500">
                  {t('footer.technologies').split(' • ').map((tech: string, index: number, array: string[]) => (
                    <span key={tech}>
                      {tech}
                      {index < array.length - 1 && <span>•</span>}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-500 font-mono text-xs">
                    {t('footer.thanks')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Region for Screen Readers - Removed for now */}
    </section>
  )
}

export default Contact