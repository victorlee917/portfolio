import React from 'react'

export function Tags({ tags }) {
  return (
    <div className="w-full flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="break-keep p-[12px] border-custom-width border-solid border-[var(--color-border)] flex justify-center text-card-tag bg-background-hard whitespace-nowrap"
        >
          {tag}
        </div>
      ))}
    </div>
  )
}
