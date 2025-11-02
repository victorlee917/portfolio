'use client'

import React, { useState, useEffect } from 'react'
import { Channels } from '../channels'
import { useScroll, useScrollThreshold } from '@/lib/hooks'

export function TopBar({ title, channelArray }) {
  const [mounted, setMounted] = useState(false)
  const { scrollPercentage } = useScroll()
  const isVisible = useScrollThreshold(220)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={`w-full h-[60px] bg-background flex items-center fixed left-0 md:hidden px-mb-common md:px-common z-50 transition-transform duration-300 ${
        isVisible ? 'top-0' : '-top-[60px]'
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span
          onClick={scrollToTop}
          className="text-topbar-title cursor-pointer"
        >
          {title}
        </span>
        <Channels channels={channelArray}></Channels>
      </div>
      {mounted && (
        <div className="absolute h-border w-full bottom-0 left-0 bg-border">
          <div
            className="h-full bg-primary origin-left transition-transform duration-100"
            style={{ transform: `scaleX(${scrollPercentage / 100})` }}
          ></div>
        </div>
      )}
    </div>
  )
}
