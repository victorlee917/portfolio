import { getDotDataByPath, getAllDotsExcept } from '@/lib/firestore'
import { getFilesByName } from '@/lib/storage'
import { Main } from '@/templates/main'

export const metadata = {
  title: 'Home | Junwoo Lee',
  description: '이준우의 포트폴리오 홈페이지',
  alternates: {
    canonical: 'https://yourwebsite.com', // TODO: 실제 도메인으로 변경 필요
  },
}

export default async function Page() {
  // Parallelize Firebase calls for better performance
  const [homeData, contentsData, files] = await Promise.all([
    getDotDataByPath('home'),
    getAllDotsExcept('home'),
    getFilesByName('home'),
  ])

  if (!homeData) {
    return <div>Content not found</div>
  }

  return (
    <Main
      headerData={homeData.header}
      contentsData={contentsData}
      files={files}
    />
  )
}
