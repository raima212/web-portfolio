import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular' | 'card'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

const SkeletonLoader = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  animation = 'pulse' 
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-700 rounded'
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    card: 'rounded-lg'
  }
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  }
  
  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'text' ? '16px' : variant === 'circular' ? '40px' : '200px')
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  )
}

// Predefined skeleton components
export const TextSkeleton = ({ lines = 1, className = '' }: { lines?: number, className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader 
        key={index} 
        variant="text" 
        width={index === lines - 1 ? '75%' : '100%'} 
      />
    ))}
  </div>
)

export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-lg p-6 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <SkeletonLoader variant="circular" width="48px" height="48px" />
      <div className="flex-1">
        <SkeletonLoader variant="text" height="20px" className="mb-2" />
        <SkeletonLoader variant="text" width="60%" height="16px" />
      </div>
    </div>
    <TextSkeleton lines={3} className="mb-4" />
    <div className="flex gap-2">
      <SkeletonLoader variant="text" width="80px" height="24px" />
      <SkeletonLoader variant="text" width="100px" height="24px" />
      <SkeletonLoader variant="text" width="60px" height="24px" />
    </div>
  </div>
)

export const ProjectCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded overflow-hidden ${className}`}>
    <SkeletonLoader variant="rectangular" height="128px" className="border-b border-gray-600" />
    <div className="p-6">
      <SkeletonLoader variant="text" height="24px" className="mb-2" />
      <SkeletonLoader variant="text" width="90%" height="16px" className="mb-1" />
      <SkeletonLoader variant="text" width="75%" height="16px" className="mb-4" />
      
      <div className="flex gap-2 mb-4">
        <SkeletonLoader variant="text" width="60px" height="24px" />
        <SkeletonLoader variant="text" width="80px" height="24px" />
        <SkeletonLoader variant="text" width="70px" height="24px" />
      </div>
      
      <div className="flex justify-between">
        <SkeletonLoader variant="text" width="80px" height="16px" />
        <SkeletonLoader variant="text" width="60px" height="16px" />
      </div>
    </div>
  </div>
)

export const SkillsSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-6 mb-6">
          <SkeletonLoader variant="circular" width="24px" height="24px" />
          <SkeletonLoader variant="text" width="120px" height="16px" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, skillIndex) => (
            <div key={skillIndex}>
              <div className="flex justify-between items-center mb-2">
                <SkeletonLoader variant="text" width="80px" height="16px" />
                <SkeletonLoader variant="text" width="40px" height="16px" />
              </div>
              <SkeletonLoader variant="rectangular" height="8px" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export const EducationCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`flex-shrink-0 w-96 bg-gray-900 border border-gray-800 rounded p-4 ${className}`}>
    <div className="flex items-start gap-4 mb-6">
      <SkeletonLoader variant="circular" width="32px" height="32px" />
      <div className="flex-1">
        <SkeletonLoader variant="text" height="20px" className="mb-1" />
        <SkeletonLoader variant="text" width="80%" height="16px" />
      </div>
    </div>
    
    <div className="flex items-center gap-4 mb-4">
      <SkeletonLoader variant="text" width="100px" height="16px" />
      <SkeletonLoader variant="text" width="80px" height="16px" />
    </div>
    
    <TextSkeleton lines={3} className="mb-6" />
    
    <div>
      <SkeletonLoader variant="text" height="18px" className="mb-3" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-start gap-2">
            <SkeletonLoader variant="circular" width="6px" height="6px" className="mt-2" />
            <SkeletonLoader variant="text" width="90%" height="14px" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default SkeletonLoader

