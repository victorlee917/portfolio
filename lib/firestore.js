import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore'
import app from '@/firebase/config'

const db = getFirestore(app)

/**
 * Fetches a dots document and all contents with matching id field from Firestore
 * @param {string} pathId - The path ID (e.g., 'mojitto', 'amd') that matches the document ID
 * @returns {Promise<{header: object, contents: array} | null>} The header data and contents array, or null if not found
 * @throws {Error} If there's an error fetching the document
 *
 * @example
 * const data = await getDotDataByPath('mojitto')
 * if (data) {
 *   console.log(data.header) // Main header data from dots document
 *   console.log(data.contents) // Array of content items with id field matching pathId
 * }
 */
export async function getDotDataByPath(pathId) {
  try {
    // Fetch the dots document with ID matching the pathId
    const dotsRef = doc(db, 'dots', pathId)
    const dotsSnap = await getDoc(dotsRef)

    if (!dotsSnap.exists()) {
      console.warn(`No dots document found for path: ${pathId}`)
      return null
    }

    const headerData = {
      id: dotsSnap.id,
      ...dotsSnap.data(),
    }

    // Query contents collection where id field matches pathId, ordered by order field (descending)
    const contentsRef = collection(db, 'contents')
    const q = query(
      contentsRef,
      where('id', '==', pathId),
      orderBy('order', 'desc')
    )
    const contentsSnap = await getDocs(q)

    const contentsData = contentsSnap.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }))

    return {
      header: headerData,
      contents: contentsData,
    }
  } catch (error) {
    console.error(`Error fetching dots document for path ${pathId}:`, error)
    throw error
  }
}

/**
 * Fetches a dots document with all items from its contents sub-collection
 * Use this if contents are stored as a sub-collection instead of a field
 * @param {string} pathId - The path ID that matches the document ID
 * @returns {Promise<{dots: object, contents: array} | null>} The dots document and contents array
 */
export async function fetchDotsWithSubCollection(pathId) {
  try {
    const { doc, getDoc, collection, getDocs } =
      await import('firebase/firestore')

    const dotsRef = doc(db, 'dots', pathId)
    const dotsSnap = await getDoc(dotsRef)

    if (!dotsSnap.exists()) {
      console.warn(`No dots document found for path: ${pathId}`)
      return null
    }

    const dotsData = {
      id: dotsSnap.id,
      ...dotsSnap.data(),
    }

    // Fetch contents sub-collection if it exists
    const contentsRef = collection(db, 'dots', pathId, 'contents')
    const contentsSnap = await getDocs(contentsRef)

    const contentsData = contentsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return {
      dots: dotsData,
      contents: contentsData,
    }
  } catch (error) {
    console.error(
      `Error fetching dots with sub-collection for path ${pathId}:`,
      error
    )
    throw error
  }
}

/**
 * Fetches all documents from dots collection except the specified ID, sorted by lastUpdate.date
 * @param {string} excludeId - The document ID to exclude (e.g., 'home')
 * @returns {Promise<array>} Array of dots documents sorted by lastUpdate.date (newest first)
 * @throws {Error} If there's an error fetching the documents
 *
 * @example
 * const allDots = await getAllDotsExcept('home')
 * // Returns all dots except 'home', sorted by most recent lastUpdate.date
 */
export async function getAllDotsExcept(excludeId) {
  try {
    const dotsRef = collection(db, 'dots')
    const dotsSnap = await getDocs(dotsRef)

    // Filter out the excluded ID and map to data objects
    const dotsData = dotsSnap.docs
      .filter((doc) => doc.id !== excludeId)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

    // Sort by lastUpdate.date in descending order (newest first)
    dotsData.sort((a, b) => {
      const dateA = a.lastUpdate?.date
      const dateB = b.lastUpdate?.date

      // Handle cases where lastUpdate.date might not exist
      if (!dateA && !dateB) return 0
      if (!dateA) return 1
      if (!dateB) return -1

      // Convert Firestore Timestamp to milliseconds for comparison if needed
      const timeA =
        dateA?.toDate ? dateA.toDate().getTime() : new Date(dateA).getTime()
      const timeB =
        dateB?.toDate ? dateB.toDate().getTime() : new Date(dateB).getTime()

      return timeB - timeA // Descending order (newest first)
    })

    return dotsData
  } catch (error) {
    console.error(`Error fetching all dots except ${excludeId}:`, error)
    throw error
  }
}
