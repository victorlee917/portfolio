'use client'

import { useState, useEffect, useCallback } from 'react'
import { throttle } from './utils'

/**
 * Custom hook to track scroll position and percentage
 * @param {number} throttleMs - Throttle delay in milliseconds (default: 16ms for 60fps)
 * @returns {Object} Scroll information
 * @returns {number} returns.scrollY - Current vertical scroll position
 * @returns {number} returns.scrollPercentage - Scroll percentage (0-100)
 *
 * @example
 * const { scrollY, scrollPercentage } = useScroll()
 * console.log(`Scrolled ${scrollPercentage}%`)
 */
export function useScroll(throttleMs = 16) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0

    setScrollY(scrollTop)
    setScrollPercentage(percentage)
  }, [])

  useEffect(() => {
    // Initial call to set values
    handleScroll()

    // Throttle scroll event
    const throttledScroll = throttle(handleScroll, throttleMs)

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [handleScroll, throttleMs])

  return { scrollY, scrollPercentage }
}

/**
 * Custom hook to detect if scrolled past a certain threshold
 * @param {number} threshold - Scroll position threshold in pixels
 * @param {number} throttleMs - Throttle delay in milliseconds (default: 16ms)
 * @returns {boolean} Whether scroll position is past threshold
 *
 * @example
 * const isScrolledPast = useScrollThreshold(220)
 * // Returns true when scrolled more than 220px
 */
export function useScrollThreshold(threshold, throttleMs = 16) {
  const [isPast, setIsPast] = useState(false)

  const handleScroll = useCallback(() => {
    setIsPast(window.scrollY >= threshold)
  }, [threshold])

  useEffect(() => {
    // Initial check
    handleScroll()

    // Throttle scroll event
    const throttledScroll = throttle(handleScroll, throttleMs)

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [handleScroll, throttleMs])

  return isPast
}
