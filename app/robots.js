export default function robots() {
  const baseUrl = 'https://junwoolee.me'

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
