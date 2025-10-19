import React from 'react'

export function HeaderTitle({ children, className, ...props }) {
  return (
    <h1 className={`text-page-title font-black ${className || ''}`} {...props}>
      {children}
    </h1>
  )
}
