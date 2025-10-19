'use client'

import React, { useState, useEffect } from 'react'

export function ProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const handleScroll = () => {
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const percentage = (scrollTop / scrollHeight) * 100
    setScrollPercentage(percentage)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="absolute right-0 top-0 h-full w-border bg-gray-700">
      <div
        className="h-full w-full bg-blue-800 origin-top"
        style={{ transform: `scaleY(${scrollPercentage / 100})` }}
      ></div>
    </div>
  )
}
