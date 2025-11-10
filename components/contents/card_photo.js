'use client'

import React from 'react'
import { Gap } from '../gap'
import Image from 'next/image'

export function CardPhoto({
  title,
  date,
  metadata,
  order,
  length,
  thumbnailImage,
  originalImage,
}) {
  const thumbUrl = thumbnailImage.url
  const ogUrl = originalImage.url
  return (
    <>
      <div
        className={`w-full p-mb-box md:p-box flex-col border-custom-width border-solid border-[var(--color-border)]`}
      >
        <Image
          src={thumbUrl}
          width={metadata.thumbnailWidth}
          height={metadata.thumbnailHeight}
          alt={`Picture ${title}`}
          loading="lazy"
          quality={85}
        ></Image>
        <Gap className={`h-[12px]`}></Gap>
        <div className={`w-full flex flex-col`}>
          <div className="flex items-center">
            <h3 className="text-card-subtitle">{title}</h3>
          </div>
          <Gap className={`h-[6px]`}></Gap>
          <span className="text-card-label">{date}</span>
        </div>
      </div>
    </>
  )
}
