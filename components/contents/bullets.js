'use client'

import React from 'react'
import { useNavigate } from '@/lib/navigation'
import { GapHorizontal } from '../gap'

export function Bullets({ bullets }) {
  const navigateToPath = useNavigate()

  const handleClick = (url) => {
    if (url) {
      navigateToPath(url)
    }
  }

  return (
    <div className="flex flex-col items-start gap-[6px]">
      {bullets.map((bullet, index) => (
        <div
          key={index}
          onClick={() => handleClick(bullet.url)}
          className={`flex items-center  ${bullet.url ? 'group hover:cursor-pointer' : ''}`}
        >
          <div className="w-[4px] h-[4px] bg-bullet"></div>
          <GapHorizontal className={`w-[8px]`}></GapHorizontal>
          <h4
            className={`text-card-bullet ${bullet.url ? 'md:group-hover:text-hover' : ''}`}
          >
            {bullet.item}
          </h4>
          <GapHorizontal className={`w-[5px]`}></GapHorizontal>
          {bullet.count ? (
            <span className="text-card-label">{bullet.count}개</span>
          ) : null}
          {bullet.status === 'ongoing' ? (
            <div className="w-[4px] h-[4px] bg-red-500 rounded animate-blink"></div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
