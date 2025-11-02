export default function robots() {
  const baseUrl = 'https://yourwebsite.com' // TODO: 실제 도메인으로 변경 필요

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'], // API 경로와 Next.js 내부 경로 제외
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
