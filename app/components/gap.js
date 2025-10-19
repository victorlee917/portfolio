import React from 'react'

export function Gap({ className, ...props }) {
  return <div className={`w-full ${className || ''}`} {...props}></div>
}
