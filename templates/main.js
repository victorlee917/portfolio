import { TopBar } from '@/components/header/topbar'
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
import { CardAbout } from '../components/contents/card_about'
import { CardProject } from '../components/contents/card_project'
import { Ending } from '../components/contents/ending'
import { MainImage } from '../components/contents/main_image'
import { Section } from '../components/contents/section'
import { Gap } from '../components/gap'
import { BackButton } from '../components/header/back_button'
import { HeaderCopyRight } from '../components/header/copyright'
import { HeaderSubtitle } from '../components/header/subtitle'
import { HeaderTitle } from '../components/header/title'
import { ProgressBar } from '../components/progress_bar'
import { ThemeToggle } from '../components/header/theme_toggle' // Import ThemeToggle
import { HeaderGreeting } from '@/components/header/greeting'

/**
 * Aggregates all tags from contentsData and returns them sorted by frequency (descending)
 * @param {Array} contentsData - Array of content objects containing tags field
 * @returns {Array} Array of objects with tag and count, sorted by count descending
 *
 * @example
 * const tagStats = aggregateTagsByFrequency([
 *   { tags: ['React', 'Next.js'] },
 *   { tags: ['React', 'TypeScript'] }
 * ])
 * // Returns: [{ tag: 'React', count: 2 }, { tag: 'Next.js', count: 1 }, { tag: 'TypeScript', count: 1 }]
 */
function aggregateTagsByFrequency(contentsData) {
  // Count occurrences of each tag
  const tagCounts = {}

  contentsData.forEach((content) => {
    if (Array.isArray(content.tags)) {
      content.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // Convert to array and sort by count descending
  return Object.entries(tagCounts)
    .map(([item, count]) => ({ item, count }))
    .sort((a, b) => b.count - a.count)
}

export function Main({ headerData, contentsData, files }) {
  const { masterYn, title, subtitle, channelArray, introArray } = headerData
  const tagsArray = aggregateTagsByFrequency(contentsData)

  return (
    <ContianerXlarge>
      <ContainerHeader>
        <TopBar title={title} channelArray={channelArray}></TopBar>
        <ContainerHeaderSmall className="hidden md:flex">
          <ContainerHeaderSmallTop>
            {masterYn ? null : <BackButton></BackButton>}
            {masterYn ? (
              <HeaderGreeting>Junwoo Lee</HeaderGreeting>
            ) : (
              <HeaderTitle>{title}</HeaderTitle>
            )}
            <Gap className={`h-[10px]`}></Gap>
            <HeaderSubtitle>{subtitle}</HeaderSubtitle>
            <Gap className={`h-[24px]`}></Gap>
            <Channels channels={channelArray}></Channels>
          </ContainerHeaderSmallTop>
          <ContainerHeaderSmallBottom>
            <HeaderCopyRight>junwoolee.me</HeaderCopyRight>
            <ThemeToggle></ThemeToggle>
          </ContainerHeaderSmallBottom>
        </ContainerHeaderSmall>

        <ContainerHeaderSmall className="md:hidden">
          <ContainerHeaderSmallBottom>
            <HeaderCopyRight>junwoolee.me</HeaderCopyRight>
            <ThemeToggle></ThemeToggle>
          </ContainerHeaderSmallBottom>
          <ContainerHeaderSmallTop>
            {masterYn ? null : <BackButton></BackButton>}
            {masterYn ? (
              <HeaderGreeting>Junwoo Lee</HeaderGreeting>
            ) : (
              <HeaderTitle>{title}</HeaderTitle>
            )}
            <Gap className={`h-[10px]`}></Gap>
            <HeaderSubtitle>{subtitle}</HeaderSubtitle>
            <Gap className={`h-[24px]`}></Gap>
            <Channels channels={channelArray}></Channels>
          </ContainerHeaderSmallTop>
        </ContainerHeaderSmall>
        <ProgressBar></ProgressBar>
      </ContainerHeader>
      <ContianerContents>
        <ContainerContentsSmall>
          <MainImage image={files['main']}></MainImage>
          <Gap className="h-6"></Gap>
          <Section title="About">
            <CardAbout
              introArray={introArray}
              tagsArray={tagsArray}
            ></CardAbout>
          </Section>
          <Gap className={`h-6`}></Gap>
          <Section title={masterYn ? 'Dots' : 'Timeline'}>
            {contentsData.map((content, index) => (
              <CardProject
                image={masterYn ? files[content.id] : files[content.order]}
                masterYn={masterYn}
                key={index}
                title={content.title}
                subTitle={content.subtitle}
                lastUpdate={content.lastUpdate}
                desc={content.desc}
                tags={content.tags}
                date={content.date}
                ratio={content.ratio}
                channelArray={content.channelArray}
                order={content.order}
                length={contentsData.length}
                path={content.path}
              ></CardProject>
            ))}
          </Section>
          <Gap className={`h-6`}></Gap>
          <Ending></Ending>
        </ContainerContentsSmall>
      </ContianerContents>
    </ContianerXlarge>
  )
}
