'use client'

import React, { useState, useEffect, useMemo } from 'react'

export function HeaderGreeting({ koreanName, englishName, chineseName }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Multi-language greeting texts
  const texts = useMemo(
    () => [
      `안녕하세요, 저는\n${koreanName}입니다.`,
      `Hello I'm\n${englishName}.`,
    ],
    [koreanName, englishName]
  )

  useEffect(() => {
    let currentIndex = 0
    let typingInterval
    let deleteInterval
    let pauseTimeout

    const currentText = texts[currentTextIndex]

    // Typing animation
    typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setDisplayedText(currentText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)

        // Pause for 2 seconds before deleting
        pauseTimeout = setTimeout(() => {
          let deleteIndex = currentText.length

          // Delete animation
          deleteInterval = setInterval(() => {
            if (deleteIndex >= 0) {
              setDisplayedText(currentText.slice(0, deleteIndex))
              deleteIndex--
            } else {
              clearInterval(deleteInterval)
              // Move to next text
              setCurrentTextIndex((prev) => (prev + 1) % texts.length)
            }
          }, 80) // Delete speed
        }, 2000) // Pause duration
      }
    }, 100) // Typing speed

    return () => {
      clearInterval(typingInterval)
      clearInterval(deleteInterval)
      clearTimeout(pauseTimeout)
    }
  }, [currentTextIndex, texts])

  return (
    <h1 className="text-page-title whitespace-pre-line">
      {displayedText}
      <span className="animate-blink text-[32px]"> _</span>
    </h1>
  )
}
