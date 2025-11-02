import React from 'react'

export function Tags({ tags }) {
  return (
    // `grid`와 `grid-flow-col`, `auto-cols-min` 사용
    <div className="w-full grid grid-flow-col auto-cols-min gap-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="break-keep p-[12px] border-custom-width border-solid border-[var(--color-border)] flex justify-center text-card-tag  bg-background-hard"
        >
          {tag}
        </div>
      ))}
    </div>
  )
}
