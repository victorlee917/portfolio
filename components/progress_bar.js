'use client'

import React from 'react'
import { useScroll } from '@/lib/hooks'

export function ProgressBar() {
  const { scrollPercentage } = useScroll()

  return (
    <div className="hidden md:flex absolute right-0 top-common h-parent-minus-common-x2 w-border bg-border">
      <div
        className="h-full w-full bg-primary origin-top"
        style={{ transform: `scaleY(${scrollPercentage / 100})` }}
      ></div>
    </div>
  )
}
