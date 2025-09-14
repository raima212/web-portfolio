import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

interface FooterProps {
  isVisible: boolean
}

const Footer: React.FC<FooterProps> = ({ isVisible }) => {
  const { t } = useLanguage()

  return (
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
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 font-mono text-xs">
                {t('footer.thanks')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
