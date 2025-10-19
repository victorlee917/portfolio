import React from 'react'
import { Gap } from '../gap'

export function Section({ title, children }) {
  return (
    <section className="flex-col">
      <h3 className="text-section-title font-extrabold">{title}</h3>
      <Gap className={`h-4`}></Gap>
      {children}
    </section>
  )
}
