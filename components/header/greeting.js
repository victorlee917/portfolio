'use client'

import React, { useState, useEffect } from 'react'

export function HeaderGreeting({ children }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    const text = `Hello I'm\n${children}.`
    let currentIndex = 0
    let typingInterval

    // Typing animation
    typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100) // Typing speed

    return () => {
      clearInterval(typingInterval)
    }
  }, [children])

  return (
    <h1 className="text-page-title whitespace-pre-line ">
      {displayedText}
      <span className="animate-blink text-[32px]"> _</span>
    </h1>
  )
}
