import { type ReactNode, useEffect, useRef } from 'react'

// Skip to content link
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-blue-600 text-white px-4 py-2 rounded font-mono text-sm transition-all duration-200"
    >
      Ana içeriğe geç
    </a>
  )
}

// Accessible button with proper ARIA attributes
interface AccessibleButtonProps {
  children: ReactNode
  onClick?: () => void
  ariaLabel?: string
  ariaDescribedBy?: string
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const AccessibleButton = ({
  children,
  onClick,
  ariaLabel,
  ariaDescribedBy,
  disabled = false,
  className = '',
  type = 'button'
}: AccessibleButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      {children}
    </button>
  )
}

// Accessible link with proper ARIA attributes
interface AccessibleLinkProps {
  children: ReactNode
  href: string
  ariaLabel?: string
  ariaDescribedBy?: string
  external?: boolean
  className?: string
}

export const AccessibleLink = ({
  children,
  href,
  ariaLabel,
  ariaDescribedBy,
  external = false,
  className = ''
}: AccessibleLinkProps) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
    >
      {children}
      {external && (
        <span className="sr-only">(yeni sekmede açılır)</span>
      )}
    </a>
  )
}

// Accessible input with proper labels
interface AccessibleInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  describedBy?: string
  className?: string
}

export const AccessibleInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  describedBy,
  className = ''
}: AccessibleInputProps) => {
  const errorId = error ? `${id}-error` : undefined
  const describedByIds = [describedBy, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-green-400 font-mono text-sm"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="gerekli">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-describedby={describedByIds}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 font-mono text-sm ${className}`}
      />
      {error && (
        <p id={errorId} className="text-red-400 text-sm font-mono" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible textarea
interface AccessibleTextareaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
  error?: string
  describedBy?: string
  className?: string
}

export const AccessibleTextarea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error,
  describedBy,
  className = ''
}: AccessibleTextareaProps) => {
  const errorId = error ? `${id}-error` : undefined
  const describedByIds = [describedBy, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-green-400 font-mono text-sm"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="gerekli">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-describedby={describedByIds}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none font-mono text-sm ${className}`}
      />
      {error && (
        <p id={errorId} className="text-red-400 text-sm font-mono" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Focus trap for modals
interface FocusTrapProps {
  children: ReactNode
  active: boolean
  onEscape?: () => void
}

export const FocusTrap = ({ children, active, onEscape }: FocusTrapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }

      if (e.key === 'Tab') {
        const container = containerRef.current
        if (!container) return

        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, onEscape])

  return (
    <div ref={containerRef} className={active ? '' : 'sr-only'}>
      {children}
    </div>
  )
}

// Screen reader only text
export const ScreenReaderOnly = ({ children }: { children: ReactNode }) => {
  return <span className="sr-only">{children}</span>
}

// Live region for announcements
interface LiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive'
}

export const LiveRegion = ({ message, politeness = 'polite' }: LiveRegionProps) => {
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

