'use client' // Make it a client component

import React from 'react'
import { Gap } from '../gap'
import { UpArrowIcon } from '../icons/up_arrow'
import { useTheme } from '../theme_provider'

export function Ending({}) {
  const { theme } = useTheme()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // For smooth scrolling
    })
  }

  return (
    <div className="w-full flex justify-between items-center p-mb-box md:p-box border-custom-width border-solid border-[var(--color-border)]">
      <div className="flex-col">
        <span className="text-card-body">
          끝까지 봐 주셔서 감사해요!<br></br>더 궁금한 점이 있다면 채널로 문의해
          주세요.
        </span>
      </div>
      <button
        onClick={scrollToTop}
        className="group w-[32px] h-[32px] border-custom-width border-solid border-[var(--color-border)] cursor-pointer flex justify-center items-center md:hover:border-[var(--color-hover)]"
      >
        <UpArrowIcon
          className="w-[50%] h-[50%] opacity-50 md:group-hover:opacity-100 transition-opacity"
          color={
            theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
          }
        />
      </button>
    </div>
  )
}
