'use client'

import React from 'react'
import Masonry from 'react-masonry-css'

export function Album({ children, breakpointCols }) {
  // Default responsive breakpoints
  const defaultBreakpoints = {
    default: 3,
    1280: 2,
    640: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointCols || defaultBreakpoints}
      className="album-masonry-grid"
      columnClassName="album-masonry-grid_column"
    >
      {children}
    </Masonry>
  )
}
