'use client'

import { useRouter } from 'next/navigation'

/**
 * Custom hook for navigation with conditional routing
 * @returns {Function} navigateToPath - Function to navigate to a path with optional condition
 *
 * @example
 * const navigateToPath = useNavigate()
 * navigateToPath('/mojitto', true) // Navigates if condition is true
 * navigateToPath('/about') // Always navigates
 */
export function useNavigate() {
  const router = useRouter()

  const navigateToPath = (path, condition = true) => {
    if (condition && path) {
      router.push(path)
    }
  }

  return navigateToPath
}
