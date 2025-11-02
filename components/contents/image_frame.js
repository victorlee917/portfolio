import Image from 'next/image'
import React from 'react'

export function ImageFrame({ image, className }) {
  const { name, url } = image
  return (
    <div className={`relative w-full aspect-[16/9]  ${className || ''}`}>
      <Image alt={`picture ${name}`} src={url} fill className="object-cover" />
    </div>
  )
}
