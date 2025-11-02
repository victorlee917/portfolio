import Link from 'next/link'
import React from 'react'

export function HeaderCopyRight({ children }) {
  return (
    <Link href="/" className="text-[12px] font-light md:hover:text-hover">
      ©{children}
    </Link>
  )
}
