import React from 'react'
import { Gap } from '../gap'

export function Ending({}) {
  return (
    <div
      className="w-full justify-between p-box border-custom-width border-solid
   3    border-gray-400"
    >
      <div className="flex-col">
        <span>끝까지 봐 주셔서 감사해요!</span>
        <Gap className={`h-1`}></Gap>
        <span>더 궁금한 점이 있다면 채널로 문의해 주세요.</span>
      </div>
      <div></div>
    </div>
  )
}
