import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext.tsx'
import type { LanguageContextType } from '../contexts/LanguageContext.tsx'

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  
  return context
}
