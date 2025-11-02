import './globals.css'
import { ThemeProvider } from '../components/theme_provider'
import { Outfit } from 'next/font/google' // Import Outfit font

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit', // Define as CSS variable
})

export const metadata = {
  title: 'Junwoo Lee | 이준우',
  description: '이준우에 대해 알아 보세요.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Junwoo Lee | 이준우',
    description: '이준우에 대해 알아 보세요.',
    url: 'https://junwoolee.me',
    siteName: 'About Junwoo Lee ',
    images: [
      {
        url: '/og-image.png', // 1200x630px 권장
        width: 1200,
        height: 630,
        alt: 'About Junwoo Lee',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junwoo Lee | 이준우',
    description: '이준우의 포트폴리오',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: '이준우',
        alternateName: 'Junwoo Lee',
        url: 'https://junwoolee.me',
        jobTitle: 'Developer',
        description: '이준우의 포트폴리오',
      },
      {
        '@type': 'WebSite',
        name: 'Junwoo Lee Portfolio',
        alternateName: '이준우 포트폴리오',
        url: 'https://junwoolee.me',
        description: '이준우에 대해 알아 보세요.',
        inLanguage: 'ko-KR',
      },
    ],
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Preload Pretendard font for better performance */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        {' '}
        {/* Apply Outfit font */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
