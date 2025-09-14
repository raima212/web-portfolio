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
    // Bandırma Onyedi Eylül University
    'education.name_1': 'Bandırma Onyedi Eylül Üniversitesi',
    'education.degree_1': 'Bilgisayar Programcılığı',
    'education.description_1': 'Bilgisayar Programcılığı bölümünde eğitim alıyorum. Modern web teknolojileri, veritabanı yönetimi ve mobil uygulama geliştirme konularında ileri seviye eğitim alıyorum.',
    // Küçükyalı Mesleki ve Teknik Anadolu Lisesi
    'education.name_2': 'Küçükyalı Mesleki ve Teknik Anadolu Lisesi',
    'education.degree_2': 'Bilgisayar Teknolojisi ve Bilişim Sistemleri',
    'education.description_2': 'Yazılım geliştirme, algoritma tasarımı ve sistem mimarisi konularında kapsamlı eğitim aldım. Web teknolojileri ve mobil uygulama geliştirme alanlarında projeler gerçekleştirdim. Bunun yanı sıra donanım ve ağ yönetimi konularında da bilgi sahibiyim.',
    // Linkedin Learning Certificates
    'education.name_3': 'LinkedIn Learning',
    'education.gpa_3': 'Tamamlandı',
    'education.degree_3': 'API Geliştirme',
    'education.description_3': 'LinkedIn Learning platformunda API geliştirme konularında çeşitli kurslar aldım. Bu kurslar, RESTful API tasarımı, güvenlik ve performans optimizasyonu gibi konularda derinlemesine bilgi edinmemi sağladı.',
    'education.achievements': 'Başarılar & Sertifikalar',
    'education.stats.institutions': 'Eğitim Kurumu',
    'education.stats.certificates': 'Sertifika',
    'education.stats.experience': 'Yıl Deneyim',

    
    // Experience Section
    'experience.title': 'İş Deneyimi',
    'experience.description': '// Farklı sektörlerde kapsamlı yazılım geliştirme deneyimi',
    'experience.technologies': 'Kullanılan Teknolojiler',
    'experience.achievements': 'Önemli Başarılar',
    // Panasonic Internship
    'experience.achievements_1': 'Şirketlere özel varlık envanter yönetim sistemi ve kullanıcı dostu departman istatistik raporlama web siteleri geliştirdim.',
    'experience.achievements_2': 'Planlı şirket faaliyetleri ve canlı döviz kurları için web uygulamaları inşa ettim.',
    'experience.achievements_3': 'İç ihtiyaçlara yönelik özel yönetici paneli uygulamaları oluşturdum.',
    'experience.achievements_4': 'Oracle veritabanlarını izledim ve düzenli Jira raporlaması yaparken, pratik ve kullanıcı odaklı yazılım çözümlerine katkıda bulundum.',
    // Freelance Work
    'experience.description_2': 'React, Next.js ve Vite kullanarak 10\'dan fazla web uygulaması geliştirdim. Kimlik doğrulama, gerçek zamanlı güncellemeler ve panolar içeren çok kullanıcılı sistemler üzerinde çalıştım. Backend için AWS S3 ve Supabase kullandım. %99 müşteri memnuniyeti sağlıyorum.',
    'experience.achievements_5': 'React, Next.js ve Vite kullanarak 10\'dan fazla web uygulaması geliştirdim.',
    'experience.achievements_6': 'Kimlik doğrulama ve gerçek zamanlı güncellemeler içeren çok kullanıcılı sistemler yaptım.',
    'experience.achievements_7': 'Backend işleri için AWS S3 ve Supabase kullandım.',
    'experience.achievements_8': 'Zamanında teslimat ile %99 müşteri memnuniyeti sağlıyorum.',
    'experience.stats.years': 'Yıl Deneyim',
    'experience.stats.projects': 'Tamamlanan Proje',
    'experience.stats.technologies': 'Teknoloji',
    'experience.stats.satisfaction': 'Müşteri Memnuniyeti',
    
    // Projects Section
    'projects.title': 'Projeler',
    'projects.description': '// Farklı teknolojiler ve yaklaşımlarla geliştirilen projeler',
    'projects.viewDetails': 'Detayları Görüntüle',
    // West LA
    'project.description_1': 'Next.js, TypeScript ve Tailwind CSS ile inşa edilmiş roleplay oyun yönetim sistemi. Backend için Supabase ve resim depolama için Amazon S3 kullanır. Kullanıcı kimlik doğrulaması, gerçek zamanlı güncellemeler ve yönetici paneli özelliklerine sahiptir.',
    'project.longDescription_1': 'Roleplay oyun yönetim sistemi Next.js, TypeScript ve Tailwind CSS ile inşa edilmiştir. Backend için Supabase ve resim depolama için Amazon S3 kullanır. Kullanıcı kimlik doğrulaması, gerçek zamanlı güncellemeler ve yönetici paneli özelliklerine sahiptir.',
    'project.features_1': 'Yeni roleplay ekip üyeleri için kullanıcı kaydı ve başvuru sistemi.',
    'project.features_2': 'Personel dizini ve bilgi sayfaları.',
    'project.features_3': 'Fotoğraf, PDF ve e-posta paylaşımı için dahili iletişim sistemi.',
    'project.features_4': 'Yöneticilerin soruşturma açması ve ceza vermesi için disiplin sistemi.',
    'project.features_5': 'RESTful API entegrasyonu ve gerçek zamanlı veri senkronizasyonu.',
    'project.features_6': 'Oyuncu şikayet ve raporlama sistemi.',
    'project.features_7': 'Kullanıcı kimlik doğrulaması ile oyuncuların bilgilerini görüntüleyip düzenleyebileceği kişiselleştirilmiş panolar.',
    'project.features_8': 'Ekip yöneticilerinin üye ekleyip/düzenleyebileceği yönetim panelleri.',
    'project.features_9': 'Bileşen tabanlı mimari dahil olmak üzere modern geliştirme uygulamalarıyla inşa edilmiştir.',
    'project.challenges_1': 'Çeşitli kullanıcı tabanı ve onların özel ihtiyaçları nedeniyle karmaşık UI/UX tasarım zorlukları.',
    'project.challenges_2': 'Birden çok kullanıcı arasında veri tutarlılığı ve gerçek zamanlı güncellemeler.',
    'project.challenges_3': 'Gerçek zamanlı veri işleme için performans optimizasyonu zorlukları.',
    'project.results_1': 'Platformu başarıyla başlattım ve ilk ay içinde 500\'den fazla aktif kullanıcıya ulaştım.',
    'project.results_2': '99.9% çalışma süresi elde ettim ve kullanıcı deneyimi ve işlevselliği için olumlu geri bildirimler aldım.',
    'project.results_3': 'Platform, kullanıcı tabanını önemli ölçüde genişleterek birden fazla roleplay topluluğu tarafından benimsendi.',
    'project.results_4': 'Kullanıcı geri bildirimleri ve gelişen gereksinimler doğrultusunda sürekli geliştirme ve özellik iyileştirmeleri.',
    // Web Portfolio
    'project.description_2': 'React, TypeScript ve Tailwind CSS ile inşa edilmiş kişisel portföy web sitesi. En son web teknolojilerini kullanarak modern, kullanıcı dostu ve duyarlı bir tasarıma sahiptir. Proje, becerilerimi ve deneyimlerimi sergilerken benimle ilgili bilgiler sağlar.',
    'project.longDescription_2': 'React, TypeScript ve Tailwind CSS ile inşa edilmiş kişisel portföy web sitesi. En son web teknolojilerini kullanarak modern, kullanıcı dostu ve duyarlı bir tasarıma sahiptir. Proje, becerilerimi ve deneyimlerimi sergilerken benimle ilgili bilgiler sağlar.',
    'project.features_10': 'Tüm cihazlarda optimal görüntüleme için duyarlı tasarım.',
    'project.features_11': 'Framer Motion kullanarak pürüzsüz animasyonlarla etkileşimli UI öğeleri.',
    'project.features_12': 'Kullanıcı tercihi için açık/koyu mod geçişi.',
    'project.features_13': 'Doğrulama ve e-posta entegrasyonu ile iletişim formu.',
    'project.features_14': 'PDF formatında indirilebilir CV.',
    'project.features_15': 'Çoklu dil desteği (Türkçe ve İngilizce).',
    'project.challenges_4': 'Çeşitli cihazlarda çapraz tarayıcı uyumluluğu ve duyarlılığı sağlamak.',
    'project.challenges_5': 'Performanstan ödün vermeden pürüzsüz animasyonlar uygulamak.',
    'project.challenges_6': 'Yükleme sürelerini optimize etmek ve yüksek kaliteli görseller ve etkileşimsellik sağlamak.',
    'project.results_5': 'Portföy web sitesini başarıyla başlattım ve tasarımı ve işlevselliği için olumlu geri bildirimler aldım.',
    'project.results_6': 'Etkili SEO uygulamaları ve sosyal medya entegrasyonu ile görünürlüğü ve etkileşimi artırdım.',
    'project.results_7': 'Portföy, serbest projeler ve iş fırsatları elde etmede önemli bir araç olarak hizmet etti.',
    'project.results_8': 'Kullanıcı geri bildirimleri ve yeni web geliştirme trendlerine dayalı sürekli güncellemeler ve iyileştirmeler.',
    'projects.close': 'Kapat',
    'projects.technologies': 'Teknolojiler',
    'projects.descriptionLabel': 'Açıklama',
    
    // Contact Section
    'contact.title': 'İletişim',
    'contact.description': 'Projeleriniz hakkında konuşmak için iletişime geçin',
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
    // Bandırma Onyedi Eylül University
    'education.name_1': 'Bandırma Onyedi Eylül University',
    'education.degree_1': 'Computer Programming',
    'education.description_1': 'I am currently studying in the Computer Programming department. I am receiving advanced education in modern web technologies, database management, and mobile application development.',
    // Küçükyalı Mesleki ve Teknik Anadolu Lisesi
    'education.name_2': 'Küçükyalı Vocational and Technical Anatolian High School',
    'education.degree_2': 'Information Technology',
    'education.description_2': 'I received comprehensive education in software development, algorithm design, and system architecture. I carried out projects in web technologies and mobile application development. Additionally, I have knowledge in hardware and network management.',
    // Linkedin Learning Certificates
    'education.name_3': 'LinkedIn Learning',
    'education.gpa_3': 'Successfully Completed',
    'education.degree_3': 'API Development',
    'education.description_3': 'I took various courses on API development on the LinkedIn Learning platform. These courses provided me with in-depth knowledge on topics such as RESTful API design, security, and performance optimization.',
    'education.stats.institutions': 'Educational Institution',
    'education.stats.certificates': 'Certificate',
    'education.stats.experience': 'Years Experience',
    
    // Experience Section
    'experience.title': 'Work Experience',
    'experience.description': '// Comprehensive software development experience in different sectors',
    'experience.technologies': 'Technologies Used',
    'experience.achievements': 'Important Achievements',
    // Panasonic Internship
    'experience.description_1': 'Developed company-specific asset inventory management system and user-friendly department statistics reporting websites. Built web applications for scheduled company acivities and live currency exchange rates. Created custom admin panel applications tailored to internal needs. Monitored Oracle databases and performed regular Jira reporting while contributing to practical, user-oriented software solutions.',
    'experience.achievements_1': 'Developed company-specific asset inventory management system and user-friendly department statistics reporting websites.',
    'experience.achievements_2': 'Built web applications for scheduled company activities and live currency exchange rates.',
    'experience.achievements_3': 'Created custom admin panel applications tailored to internal needs.',
    'experience.achievements_4': 'Monitored Oracle databases and performed regular Jira reporting while contributing to practical, user-oriented software solutions.',
    // Freelance Work
    'experience.description_2': 'Built over 10 web apps using React, Next.js, and Vite. Work on multi-user systems with auth, real-time updates, and dashboards. Use AWS S3 and Supabase for backend. Keep 99% client satisfaction.',
    'experience.achievements_5': 'Built 10+ web apps with React, Next.js, and Vite.',
    'experience.achievements_6': 'Made multi-user systems with auth and real-time updates.',
    'experience.achievements_7': 'Used AWS S3 and Supabase for backend stuff.',
    'experience.achievements_8': 'Keep 99% client satisfaction with on-time delivery.',
    'experience.stats.years': 'Years Experience',
    'experience.stats.projects': 'Completed Project',
    'experience.stats.technologies': 'Technology',
    'experience.stats.satisfaction': 'Customer Satisfaction',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.description': '// Projects developed with different technologies and approaches',
    'projects.viewDetails': 'View Details',
    // West LA
    'project.description_1': 'Fivem police squad management system',
    'project.longDescription_1': 'Roleplay game management system built with Next.js, TypeScript, and Tailwind CSS. Uses Supabase for backend and Amazon S3 for image storage. Has user authentication, real-time updates, and admin dashboard.',
    'project.features_1': 'User registration and application system for new roleplay team members.',
    'project.features_2': 'Personnel directory and information pages.',
    'project.features_3': 'Internal communication system for sharing photos, PDFs, and emails.',
    'project.features_4': 'Disciplinary action system for administrators to open investigations and issue penalties.',
    'project.features_5': 'RESTful API integration, and real-time data synchronization.',
    'project.features_6': 'Player complaint and reporting system.',
    'project.features_7': 'User authentication with personalized dashboards for players to view and edit their information.',
    'project.features_8': 'Administrative panel for team managers to add/edit members, customize site themes, manage application forms.',
    'project.features_9': 'Built with modern development practices including component-based architecture.',
    'project.challenges_1': 'Complex UI/UX design challenges due to the diverse user base and their specific needs.',
    'project.challenges_2': 'Data consistency and real-time updates across multiple users.',
    'project.challenges_3': 'Performance optimization challenges for real-time data processing.',
    'project.results_1': 'Successfully launched the platform with over 500 active users within the first month.',
    'project.results_2': 'Achieved a 99.9% uptime and received positive feedback for user experience and functionality.',
    'project.results_3': 'The platform has been adopted by multiple roleplay communities, expanding its user base significantly.',
    'project.results_4': 'Ongoing development and feature enhancements based on user feedback and evolving requirements.',
    // Web Portfolio
    'project.description_2': 'Modern Portfolio Website (React + TypeScript)',
    'project.longDescription_2': 'Personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a modern, user-friendly, and responsive design using the latest web technologies. The project showcases my skills and experience while providing information about me.',
    'project.features_10': 'Responsive design for optimal viewing on all devices.',
    'project.features_11': 'Interactive UI elements with smooth animations using Framer Motion.',
    'project.features_12': 'Light mode toggle for user preference.',
    'project.features_13': 'Contact form with validation and email integration.',
    'project.features_14': 'Downloadable CV in PDF format.',
    'project.features_15': 'Multi-language support (Turkish and English).',
    'project.challenges_4': 'Ensuring cross-browser compatibility and responsiveness across various devices.',
    'project.challenges_5': 'Implementing smooth animations without compromising performance.',
    'project.challenges_6': 'Optimizing load times while maintaining high-quality visuals and interactivity.',
    'project.results_5': 'Successfully launched the portfolio website, receiving positive feedback for its design and functionality.',
    'project.results_6': 'Increased visibility and engagement through effective SEO practices and social media integration.',
    'project.results_7': 'The portfolio has served as a key tool in securing freelance projects and job opportunities.',
    'project.results_8': 'Ongoing updates and improvements based on user feedback and new web development trends.',
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

