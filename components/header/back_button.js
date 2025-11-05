'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import BackBig from '../../asset/images/icons/back_big.png'
import BackBigDark from '../../asset/images/icons/back_big_dark.png' // Assuming this path and it's an SVG component
import Image from 'next/image'
import { useTheme } from '../theme_provider'

export function BackButton() {
  const router = useRouter()
  const { theme } = useTheme()
  return (
    <button
      onClick={() => router.back()}
      className="hidden md:flex w-[24px] mb-[24px] cursor-pointer"
    >
      <Image
        alt="Go Back"
        src={theme === 'dark' ? BackBigDark : BackBig}
        className="w-full"
      ></Image>
    </button>
  )
}
