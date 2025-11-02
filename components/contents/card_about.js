import React from 'react'
import { Gap, GapHorizontal } from '../gap'
import { Bullets } from './bullets'

export function CardAbout({ introArray, tagsArray }) {
  return (
    <div className="w-full flex flex-col p-box border-custom-width border-solid border-[var(--color-border)] gap-5">
      {introArray.map((intro, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-card-category">{intro.type}</span>
          <Gap className="h-[8px]"></Gap>
          <div key={index} className="flex flex-col gap-[6px]">
            <Bullets bullets={intro.itemArray}></Bullets>
          </div>
        </div>
      ))}
      <div className="flex flex-col">
        <span className="text-card-category">Tags</span>
        <Gap className="h-[8px]"></Gap>
        <div className="flex flex-col gap-[6px]">
          <Bullets bullets={tagsArray}></Bullets>
        </div>
      </div>
    </div>
  )
}
