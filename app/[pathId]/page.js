import { redirect } from 'next/navigation'
import { getDotDataByPath } from '@/lib/firestore'
import { getFilesByName } from '@/lib/storage'
import { Main } from '@/templates/main'

export async function generateMetadata({ params }) {
  const { pathId } = await params
  const data = await getDotDataByPath(pathId)
  const baseUrl = 'https://junwoolee.me'

  if (!data) {
    return {
      title: 'Not Found | Junwoo Lee',
      description: '페이지를 찾을 수 없습니다.',
    }
  }

  return {
    title: `${data.header.title || pathId} | Junwoo Lee`,
    description: data.header.subTitle || data.header.description || '',
    alternates: {
      canonical: `${baseUrl}/${pathId}`,
    },
  }
}

export default async function Page({ params }) {
  const { pathId } = await params

  // Parallelize Firebase calls for better performance
  const [data, files] = await Promise.all([
    getDotDataByPath(pathId),
    getFilesByName(pathId),
  ])

  if (!data) {
    redirect('/')
  }

  return (
    <Main headerData={data.header} contentsData={data.contents} files={files} />
  )
}
