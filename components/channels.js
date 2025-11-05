'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTheme } from './theme_provider'
import Url from '../asset/images/icons/url.png'
import UrlDark from '../asset/images/icons/url_dark.png'
import Instagram from '../asset/images/icons/instagram.png'
import InstagramDark from '../asset/images/icons/instagram_dark.png'
import Brunch from '../asset/images/icons/brunch.png'
import BrunchDark from '../asset/images/icons/brunch_dark.png'
import Youtube from '../asset/images/icons/youtube.png'
import YoutubeDark from '../asset/images/icons/youtube_dark.png'

export function Channels({ channels }) {
  const { theme } = useTheme()
  const channelIcon = {
    instagram: theme === 'dark' ? InstagramDark : Instagram,
    brunch: theme === 'dark' ? BrunchDark : Brunch,
    youtube: theme === 'dark' ? YoutubeDark : Youtube,
    url: theme === 'dark' ? UrlDark : Url,
  }

  return (
    <div className="flex gap-3 ">
      {channels.map((channel, index) => (
        <Link key={index} href={channel.url} target="_blank">
          <div className="group flex justify-center items-center w-[28px] h-[28px] border-custom-width border-solid border-[var(--color-border)] md:hover:border-[var(--color-hover)]">
            <Image
              alt="abd"
              src={channelIcon[channel.type] ?? channelIcon.url}
              className="w-[50%] opacity-50 md:group-hover:opacity-100"
            ></Image>
          </div>
        </Link>
      ))}
    </div>
  )
}
