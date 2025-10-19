import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Channels({ channels }) {
  const channelIcon = {}

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-2">
      {channels.map((channel, index) => (
        <Link key={index} href="https://naver.com">
          <div className="flex justify-center items-center w-[32px] h-[32px] bg-red-500 ">
            {/* <Image alt="abd" src=""></Image> */}
          </div>
        </Link>
      ))}
    </div>
  )
}
