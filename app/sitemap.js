import { getDocs, collection, getFirestore } from 'firebase/firestore'
import app from '@/firebase/config'

const db = getFirestore(app)

export default async function sitemap() {
  const baseUrl = 'https://junwoolee.me'

  try {
    // Fetch all dots documents from Firestore
    const dotsRef = collection(db, 'dots')
    const dotsSnap = await getDocs(dotsRef)

    const dynamicRoutes = dotsSnap.docs
      .filter((doc) => doc.id !== 'home') // home은 제외 (루트 페이지에 해당)
      .map((doc) => {
        const data = doc.data()
        return {
          url: `${baseUrl}/${doc.id}`,
          lastModified: data.lastUpdate?.date?.toDate
            ? data.lastUpdate.date.toDate()
            : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        }
      })

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      ...dynamicRoutes,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if Firebase fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]
  }
}
