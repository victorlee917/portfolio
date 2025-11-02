'use client'

import React from 'react'
import { useTheme } from '../theme_provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <span
      onClick={toggleTheme}
      className="text-[12px] font-light cursor-pointer md:hover:text-hover"
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </span>
  )
}
