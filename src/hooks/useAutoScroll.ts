import { useEffect, useRef } from 'react'

export const useAutoScroll = () => {
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<number | null>(null)
  const lastScrollTime = useRef(0)
  const scrollAccumulator = useRef(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if modal is open
      const modal = document.querySelector('[data-modal="true"]')
      if (modal) {
        return // Don't prevent default if modal is open
      }
      
      e.preventDefault()
      
      const now = Date.now()
      
      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY
      
      // Only trigger scroll if accumulated enough or enough time has passed
      const shouldTrigger = Math.abs(scrollAccumulator.current) > 100 || 
                           (now - lastScrollTime.current > 1000)
      
      if (!shouldTrigger) {
        return
      }
      
      if (isScrolling.current) return
      
      isScrolling.current = true
      lastScrollTime.current = now
      scrollAccumulator.current = 0
      
      const sections = ['#hero', '#skills', '#experience', '#education', '#projects', '#contact']
      
      // Find current section more accurately
      const currentSection = sections.find(section => {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Section is visible if it's more than 30% in viewport
          return rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3
        }
        return false
      })
      
      if (currentSection) {
        const currentIndex = sections.indexOf(currentSection)
        let nextIndex: number
        
        if (e.deltaY > 0) {
          // Scroll down
          nextIndex = Math.min(currentIndex + 1, sections.length - 1)
        } else {
          // Scroll up
          nextIndex = Math.max(currentIndex - 1, 0)
        }
        
        const nextSection = sections[nextIndex]
        const element = document.querySelector(nextSection)
        
        if (element && nextIndex !== currentIndex) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      } else {
        // If no current section found, go to first or last based on scroll direction
        const firstSection = document.querySelector('#hero')
        const lastSection = document.querySelector('#contact')
        
        if (e.deltaY > 0 && firstSection) {
          // Scroll down from top
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (e.deltaY < 0 && lastSection) {
          // Scroll up from bottom
          lastSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      
      // Reset scrolling flag after animation
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 1200) // Reduced timeout for better responsiveness
    }

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])
}
