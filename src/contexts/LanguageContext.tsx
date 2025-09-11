import React, { useState, useEffect } from 'react'
import { LanguageContext } from './LanguageContext'
import type { Language } from './LanguageContext'

// Translation data
const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.skills': 'Yetenekler',
    'nav.education': 'Eğitim',
    'nav.experience': 'Deneyim',
    'nav.projects': 'Projeler',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.name': 'Melih Ilker',
    'hero.title': 'Full Stack Developer',
    'hero.description': '8 yıllık kodlama deneyimi olan tutkulu Full Stack Developer. React.js, Next.js, TypeScript ve Node.js konularında uzman. Ölçeklenebilir, kullanıcı odaklı uygulamalar geliştirme konusunda kanıtlanmış başarı.',
    'hero.viewProjects': './view_projects.sh',
    'hero.downloadCV': 'wget cv.pdf',
    'hero.scrollToNavigate': 'scroll to navigate',
    
    // Skills Section
    'skills.title': 'Tech Stack',
    'skills.description': '// Modern web teknolojileri ile kapsamlı yazılım geliştirme deneyimi',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Veritabanı',
    'skills.tools': 'Araçlar',
    'skills.additional': 'Diğer Yetenekler',
    
    // Education Section
    'education.title': 'Eğitim',
    'education.description': '// Sürekli öğrenme ve kendimi geliştirme prensibiyle',
    'education.achievements': 'Başarılar & Sertifikalar',
    'education.stats.institutions': 'Eğitim Kurumu',
    'education.stats.certificates': 'Sertifika',
    'education.stats.experience': 'Yıl Deneyim',
    
    // Experience Section
    'experience.title': 'İş Deneyimi',
    'experience.description': '// Farklı sektörlerde kapsamlı yazılım geliştirme deneyimi',
    'experience.technologies': 'Kullanılan Teknolojiler',
    'experience.stats.years': 'Yıl Deneyim',
    'experience.stats.projects': 'Tamamlanan Proje',
    'experience.stats.technologies': 'Teknoloji',
    'experience.stats.satisfaction': 'Müşteri Memnuniyeti',
    
    // Projects Section
    'projects.title': 'Projeler',
    'projects.description': '// Farklı teknolojiler ve yaklaşımlarla geliştirilen projeler',
    'projects.viewDetails': 'Detayları Görüntüle',
    'projects.close': 'Kapat',
    'projects.technologies': 'Teknolojiler',
    'projects.descriptionLabel': 'Açıklama',
    
    // Contact Section
    'contact.title': 'İletişim',
    'contact.description': '// Projeleriniz hakkında konuşmak için iletişime geçin',
    'contact.location': 'Konum',
    'contact.locationValue': 'İstanbul, Türkiye',
    'contact.socialLinks': 'Sosyal Medya',
    'contact.message': 'Mesaj',
    'contact.messagePlaceholder': 'Mesajınızı buraya yazın...',
    'contact.sendMessage': 'send_message()',
    'contact.downloadCV': 'download_cv',
    'contact.cvDescription': 'Detaylı CV\'mi indirerek deneyimlerimi ve yeteneklerimi inceleyebilirsiniz.',
    'contact.downloadCVButton': 'CV İndir (PDF)',
    
    // Footer
    'footer.version': 'Portfolio v1.0.0 - Modern web teknolojileri ile geliştirildi',
    'footer.copyright': '© 2025 Melih Ilker. Tüm hakları saklıdır.',
    'footer.technologies': 'React • TypeScript • Tailwind CSS • Framer Motion • Vite',
    'footer.thanks': '$ echo "Thanks for visiting my portfolio!"'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.name': 'Melih Ilker',
    'hero.title': 'Full Stack Developer',
    'hero.description': 'Passionate Full Stack Developer with 8 years of coding experience. Expert in React.js, Next.js, TypeScript, and Node.js. Proven track record of building scalable, user-centric applications.',
    'hero.viewProjects': './view_projects.sh',
    'hero.downloadCV': 'wget cv.pdf',
    'hero.scrollToNavigate': 'scroll to navigate',
    
    // Skills Section
    'skills.title': 'Tech Stack',
    'skills.description': '// Comprehensive software development experience with modern web technologies',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Database',
    'skills.tools': 'Tools',
    'skills.additional': 'Additional Skills',
    
    // Education Section
    'education.title': 'Education',
    'education.description': '// With the principle of continuous learning and self-improvement',
    'education.achievements': 'Achievements & Certificates',
    'education.stats.institutions': 'Educational Institution',
    'education.stats.certificates': 'Certificate',
    'education.stats.experience': 'Years Experience',
    
    // Experience Section
    'experience.title': 'Work Experience',
    'experience.description': '// Comprehensive software development experience in different sectors',
    'experience.technologies': 'Technologies Used',
    'experience.stats.years': 'Years Experience',
    'experience.stats.projects': 'Completed Project',
    'experience.stats.technologies': 'Technology',
    'experience.stats.satisfaction': 'Customer Satisfaction',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.description': '// Projects developed with different technologies and approaches',
    'projects.viewDetails': 'View Details',
    'projects.close': 'Close',
    'projects.technologies': 'Technologies',
    'projects.descriptionLabel': 'Description',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.description': '// Get in touch to discuss your projects',
    'contact.location': 'Location',
    'contact.locationValue': 'Istanbul, Turkey',
    'contact.socialLinks': 'Social Links',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Write your message here...',
    'contact.sendMessage': 'send_message()',
    'contact.downloadCV': 'download_cv',
    'contact.cvDescription': 'You can review my experiences and skills by downloading my detailed CV.',
    'contact.downloadCVButton': 'Download CV (PDF)',
    
    // Footer
    'footer.version': 'Portfolio v1.0.0 - Built with modern web technologies',
    'footer.copyright': '© 2025 Melih Ilker. All rights reserved.',
    'footer.technologies': 'React • TypeScript • Tailwind CSS • Framer Motion • Vite',
    'footer.thanks': '$ echo "Thanks for visiting my portfolio!"'
  }
}

// Re-export types for convenience
export type { Language, LanguageContextType } from './LanguageContext'
// Re-export the context for useLanguage hook
export { LanguageContext } from './LanguageContext'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language')
    return (saved as Language) || 'tr'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

