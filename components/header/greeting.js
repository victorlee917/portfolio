'use client'

import React, { useState, useEffect, useMemo } from 'react'

export function HeaderGreeting({ children }) {
  const [displayedText, setDisplayedText] = useState('')

  // Memoize fullText to prevent unnecessary recalculations
  const fullText = useMemo(() => `Hello I'm\n${children}`, [children])

  useEffect(() => {
    let currentIndex = 0
    let typingInterval

    // Reset animation when children changes
    setDisplayedText('')

    typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100) // 100ms per character

    return () => {
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [fullText])

  return (
    <h1 className="text-page-title whitespace-pre-line">
      {displayedText}
      <span className="animate-blink text-[32px]"> _</span>
    </h1>
  )
}
