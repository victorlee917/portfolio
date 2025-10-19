import React from 'react'

export function HeaderDescription({ children, className, ...props }) {
  return (
    <h2
      className={`text-page-subtitle font-normal ${className || ''}`}
      {...props}
    >
      {children}
    </h2>
  )
}
