import React from 'react'

export function ContainerContentsSmall({ children, className, ...props }) {
  return (
    <div
      className={`mx-auto bg-black h-[5000px] w-full max-w-screen-sm flex flex-col ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContianerContents({ children, className, ...props }) {
  return (
    <div
      className={`w-[60%] bg-amber-300 flex justify-start p-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmall({ children, className, ...props }) {
  return (
    <div
      className={`flex h-full w-full max-w-[500px] justify-between flex-col bg-amber-900 relative p-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmallTop({ children, className, ...props }) {
  return (
    <div
      className={`flex h-full w-full flex-col bg-amber-900 items-start ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmallBottom({ children, className, ...props }) {
  return (
    <div className={`flex w-full bg-amber-900 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export function ContainerHeader({ children, className, ...props }) {
  return (
    <div
      className={`w-[40%] h-screen-minus-common-x2 bg-amber-200 flex justify-end sticky top-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContianerXlarge({ children, className, ...props }) {
  return (
    <div
      className={`text-header-title flex p-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
