import React from 'react'

export function ContainerContentsSmall({
  children,
  className,
  contentsFullYn = false,
  ...props
}) {
  return (
    <div
      className={`mx-auto w-full flex flex-col ${className || ''} ${contentsFullYn ? '' : 'md:max-w-screen-sm '} `}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContianerContents({ children, className, ...props }) {
  return (
    <div
      className={`w-full md:w-[60%] flex justify-start md:p-common mt-[24px] md:mt-0 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmall({ children, className, ...props }) {
  return (
    <div
      className={`flex flex-col h-full w-full md:max-w-[500px] justify-between relative md:p-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmallTop({ children, className, ...props }) {
  return (
    <div
      className={`flex w-full flex-col items-start ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderSmallBottom({ children, className, ...props }) {
  return (
    <div
      className={`flex w-full justify-between items-center ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContainerHeader({ children, className, ...props }) {
  return (
    <div
      className={`w-full md:w-[40%] h-[360px] md:h-screen-minus-common-x2 flex justify-center md:justify-end md:sticky md:top-common ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContianerXlarge({ children, className, ...props }) {
  return (
    <div
      className={`flex p-mb-common md:p-common flex-col md:flex-row ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
