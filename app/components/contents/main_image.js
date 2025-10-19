import Image from 'next/image'
import React from 'react'

export function MainImage({ title, children }) {
  return (
    <div className="w-full bg-white">
      <Image
        alt=""
        src=""
        className="w-full aspect-[16/9] object-cover"
      ></Image>
    </div>
  )
}
