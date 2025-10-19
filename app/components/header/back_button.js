'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export function BackButton() {
  const router = useRouter()
  return <button onClick={() => router.back()}>go back</button>
}
