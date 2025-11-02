import React from 'react'

export function Gap({ className }) {
  return <div className={`w-full ${className || ''}`}></div>
}

export function GapHorizontal({ className }) {
  return <div className={`h-full ${className || ''}`}></div>
}
