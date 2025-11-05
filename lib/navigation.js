'use client'

import { useRouter } from 'next/navigation'

/**
 * Custom hook for navigation with conditional routing
 * Supports both internal routes and external URLs (opens in new tab)
 * @returns {Function} navigateToPath - Function to navigate to a path with optional condition
 *
 * @example
 * const navigateToPath = useNavigate()
 * navigateToPath('/mojitto', true) // Internal route - navigates if condition is true
 * navigateToPath('https://github.com') // External URL - opens in new tab
 * navigateToPath('/about') // Always navigates
 */
export function useNavigate() {
  const router = useRouter()

  const navigateToPath = (path, condition = true) => {
    if (condition && path) {
      // Check if the URL is external (starts with http:// or https://)
      const isExternalUrl =
        path.startsWith('http://') || path.startsWith('https://')

      if (isExternalUrl) {
        // Open external URLs in a new tab
        window.open(path, '_blank', 'noopener,noreferrer')
      } else {
        // Use Next.js router for internal routes
        router.push(path)
      }
    }
  }

  return navigateToPath
}
