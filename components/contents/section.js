import React from 'react'
import { Gap, GapHorizontal } from '../gap'

export function Section({ title, children }) {
  return (
    <section className="w-full flex-col">
      <div className="flex items-center">
        <div className="w-[7px] h-[7px] bg-dot"></div>
        <GapHorizontal className={`w-[5px]`}></GapHorizontal>
        <span className="text-section-title">{title}</span>
      </div>
      <Gap className={`h-3`}></Gap>
      <div className="w-full flex flex-col gap-4">{children}</div>
    </section>
  )
}
