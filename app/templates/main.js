import { Channels } from '../components/channels'
import {
  ContainerContentsSmall,
  ContainerHeader,
  ContainerHeaderSmall,
  ContainerHeaderSmallBottom,
  ContainerHeaderSmallTop,
  ContianerContents,
  ContianerXlarge,
} from '../components/containers'
import { Ending } from '../components/contents/ending'
import { MainImage } from '../components/contents/main_image'
import { Section } from '../components/contents/section'
import { Gap } from '../components/gap'
import { BackButton } from '../components/header/back_button'
import { HeaderCopyRight } from '../components/header/copyright'
import { HeaderDescription } from '../components/header/description'
import { HeaderTitle } from '../components/header/title'
import { ProgressBar } from '../components/progress_bar'
import { ThemeToggle } from '../components/theme_toggle' // Import ThemeToggle

export function Main() {
  const channels = ['a', 'b', 'c']
  const isMaster = false
  return (
    <ContianerXlarge>
      <ContainerHeader>
        <ContainerHeaderSmall>
          <ContainerHeaderSmallTop>
            {isMaster ? null : <BackButton></BackButton>}
            <HeaderTitle>Title</HeaderTitle>
            <Gap className={`h-0.5`}></Gap>
            <HeaderDescription>Description</HeaderDescription>
            <Gap className={`h-4`}></Gap>
            <Channels channels={channels}></Channels>
            {/* <ThemeToggle></ThemeToggle> */}
          </ContainerHeaderSmallTop>
          <ContainerHeaderSmallBottom>
            <HeaderCopyRight>junwoolee.me</HeaderCopyRight>
          </ContainerHeaderSmallBottom>
        </ContainerHeaderSmall>
        <ProgressBar></ProgressBar>
      </ContainerHeader>
      <ContianerContents>
        <ContainerContentsSmall>
          <MainImage></MainImage>
          <Gap className="h-6"></Gap>
          <Section title="About"></Section>
          <Section title={isMaster ? 'Dots' : 'Timeline'}></Section>
          <Ending></Ending>
        </ContainerContentsSmall>
      </ContianerContents>
    </ContianerXlarge>
  )
}
