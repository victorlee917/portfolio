'use client'

import React from 'react'
import { useNavigate } from '@/lib/navigation'
import { Gap, GapHorizontal } from '../gap'
import { Border } from '../border'
import { Tags } from './tags'
import { ImageFrame } from './image_frame'
import { Channels } from '../channels'
import { Bullets } from './bullets'

export function CardProject({
  masterYn,
  path,
  image,
  title,
  subTitle,
  desc,
  tags,
  date,
  ratio,
  channelArray,
  lastUpdate,
  order,
  length,
}) {
  const navigateToPath = useNavigate()

  const handleClick = () => {
    navigateToPath(path, masterYn)
  }

  return (
    <div
      onClick={handleClick}
      className={`w-full flex-col border-custom-width border-solid border-[var(--color-border)] ${masterYn ? 'md:hover:border-[var(--color-hover)] md:hover:cursor-pointer' : ''}`}
    >
      {masterYn ? null : (
        <div className="flex w-full justify-between bg-background-hard border-b-[var(--color-border)] border-b-custom-width px-box py-2">
          <div className="text-card-header">{date}</div>
          <div className="text-card-header">{`${order}/${length}`}</div>
        </div>
      )}

      {image ? (
        <ImageFrame
          image={image}
          className={ratio === '16:9' || ratio == null ? '' : 'aspect-square'}
        ></ImageFrame>
      ) : null}
      <div
        className={`w-full p-box ${image ? 'border-t-custom-width border-solid border-[var(--color-border)]' : ''}`}
      >
        <div className="flex items-center">
          <div className="bg-dot w-[5px] h-[16px]"></div>
          <GapHorizontal className={`w-[6px]`}></GapHorizontal>
          <h3 className="text-card-title">{title}</h3>
        </div>
        <Gap className={`h-[16px]`}></Gap>
        {masterYn ? (
          <>
            <h4 className="text-card-subtitle whitespace-pre-line">
              {subTitle}
            </h4>{' '}
          </>
        ) : (
          <>
            <Bullets bullets={desc}></Bullets>
          </>
        )}
        {masterYn ? (
          <>
            <Border className={'mt-box mb-box'}></Border>
            <div className="flex items-center">
              <span className="text-card-recent">최근 소식</span>
              <div className="h-[12px] mx-2 w-border bg-border"></div>
              <span className="text-card-recent">{`#${lastUpdate.order}. ${lastUpdate.title}`}</span>
              <GapHorizontal className="w-1"></GapHorizontal>
              <span className="text-card-label">{lastUpdate.date}</span>
            </div>
            <Gap className={`mb-box`}></Gap>
            <Tags tags={tags}></Tags>
          </>
        ) : (
          <>
            {' '}
            <Gap className={`mb-box`}></Gap>
            <Tags tags={tags}></Tags>
            {channelArray.length > 0 ? (
              <>
                {' '}
                <Border className={'mt-box mb-box'}></Border>
                <Channels channels={channelArray}></Channels>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
