import Image from 'next/image'
import React from 'react'
import { ImageFrame } from './image_frame'

export function MainImage({ image }) {
  return (
    <div className="relative w-full border-custom-width border-solid border-[var(--color-border)]">
      <ImageFrame image={image}></ImageFrame>
    </div>
  )
}
