import React from 'react'

export function Border({ className }) {
  return <div className={`w-full h-border bg-border ${className || ''}`}></div>
}
