import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'
import app from '@/firebase/config'

const storage = getStorage(app)

/**
 * Fetches a download URL for a file in Firebase Storage
 * @param {string} path - The path to the file (e.g., 'mojitto/image.jpg')
 * @returns {Promise<string>} The download URL for the file
 * @throws {Error} If there's an error fetching the file
 *
 * @example
 * const imageUrl = await getFileURL('mojitto/profile.jpg')
 * <img src={imageUrl} alt="Profile" />
 */
export async function getFileURL(path) {
  try {
    const fileRef = ref(storage, path)
    const url = await getDownloadURL(fileRef)
    return url
  } catch (error) {
    console.error(`Error fetching file URL for path ${path}:`, error)
    throw error
  }
}

/**
 * Fetches download URLs for all files in a Firebase Storage directory
 * @param {string} path - The directory path (e.g., 'mojitto' or 'mojitto/images')
 * @returns {Promise<Array<{name: string, fullPath: string, url: string}>>} Array of file objects with URLs
 * @throws {Error} If there's an error fetching the files
 *
 * @example
 * const files = await getAllFilesInPath('mojitto')
 * files.forEach(file => {
 *   console.log(file.name) // 'image.jpg'
 *   console.log(file.url)  // 'https://...'
 * })
 */
export async function getAllFilesInPath(path) {
  try {
    const folderRef = ref(storage, path)
    const result = await listAll(folderRef)

    // Get download URLs for all files
    const filePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return {
        name: itemRef.name,
        fullPath: itemRef.fullPath,
        url: url,
      }
    })

    const files = await Promise.all(filePromises)
    return files
  } catch (error) {
    console.error(`Error fetching files from path ${path}:`, error)
    throw error
  }
}

/**
 * Fetches all files and subdirectories in a Firebase Storage path
 * @param {string} path - The directory path
 * @returns {Promise<{files: array, folders: array}>} Files and subdirectory names
 *
 * @example
 * const result = await getFilesAndFolders('mojitto')
 * console.log(result.files)   // Array of file objects with URLs
 * console.log(result.folders) // Array of folder names
 */
export async function getFilesAndFolders(path) {
  try {
    const folderRef = ref(storage, path)
    const result = await listAll(folderRef)

    // Get all files with URLs
    const filePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return {
        name: itemRef.name,
        fullPath: itemRef.fullPath,
        url: url,
      }
    })

    const files = await Promise.all(filePromises)

    // Get folder names
    const folders = result.prefixes.map((folderRef) => ({
      name: folderRef.name,
      fullPath: folderRef.fullPath,
    }))

    return {
      files,
      folders,
    }
  } catch (error) {
    console.error(`Error fetching contents from path ${path}:`, error)
    throw error
  }
}

/**
 * Fetches URLs for multiple specific file paths
 * @param {string[]} paths - Array of file paths
 * @returns {Promise<Array<{path: string, url: string}>>} Array of path-url pairs
 *
 * @example
 * const urls = await getMultipleFileURLs([
 *   'mojitto/image1.jpg',
 *   'mojitto/image2.jpg'
 * ])
 */
export async function getMultipleFileURLs(paths) {
  try {
    const urlPromises = paths.map(async (path) => {
      try {
        const url = await getFileURL(path)
        return { path, url }
      } catch (error) {
        console.warn(`Failed to fetch URL for ${path}:`, error)
        return { path, url: null, error: error.message }
      }
    })

    return await Promise.all(urlPromises)
  } catch (error) {
    console.error('Error fetching multiple file URLs:', error)
    throw error
  }
}

/**
 * Fetches files organized by filename (without extension) as keys
 * @param {string} path - The directory path
 * @returns {Promise<Object>} Object with filenames as keys and file data as values
 *
 * @example
 * const fileMap = await getFilesByName('mojitto')
 * console.log(fileMap['profile']) // { name: 'profile.jpg', url: '...', extension: 'jpg' }
 * <img src={fileMap['hero'].url} alt="Hero" />
 */
export async function getFilesByName(path) {
  try {
    const files = await getAllFilesInPath(path)

    const fileMap = {}
    files.forEach((file) => {
      // Extract filename without extension
      const nameWithoutExt = file.name.split('.').slice(0, -1).join('.')
      const extension = file.name.split('.').pop()

      fileMap[nameWithoutExt] = {
        ...file,
        extension,
        nameWithoutExtension: nameWithoutExt,
      }
    })

    return fileMap
  } catch (error) {
    console.error(`Error fetching files by name from path ${path}:`, error)
    throw error
  }
}

/**
 * Fetches files sorted by filename
 * @param {string} path - The directory path
 * @param {string} order - Sort order: 'asc' or 'desc' (default: 'asc')
 * @returns {Promise<Array>} Sorted array of file objects
 *
 * @example
 * const files = await getFilesSortedByName('mojitto', 'asc')
 * // Files sorted alphabetically by name
 */
export async function getFilesSortedByName(path, order = 'asc') {
  try {
    const files = await getAllFilesInPath(path)

    files.sort((a, b) => {
      if (order === 'desc') {
        return b.name.localeCompare(a.name)
      }
      return a.name.localeCompare(a.name)
    })

    return files
  } catch (error) {
    console.error(`Error fetching sorted files from path ${path}:`, error)
    throw error
  }
}

/**
 * Fetches a specific file by name (supports partial matching)
 * @param {string} path - The directory path
 * @param {string} filename - The filename to search for (can be partial)
 * @returns {Promise<Object|null>} File object or null if not found
 *
 * @example
 * const heroImage = await getFileByName('mojitto', 'hero')
 * // Finds 'hero.jpg', 'hero.png', 'hero-banner.jpg', etc.
 */
export async function getFileByName(path, filename) {
  try {
    const files = await getAllFilesInPath(path)

    const matchedFile = files.find((file) =>
      file.name.toLowerCase().includes(filename.toLowerCase())
    )

    return matchedFile || null
  } catch (error) {
    console.error(
      `Error fetching file by name "${filename}" from path ${path}:`,
      error
    )
    throw error
  }
}

/**
 * Fetches files grouped by extension
 * @param {string} path - The directory path
 * @returns {Promise<Object>} Object with extensions as keys and arrays of files as values
 *
 * @example
 * const grouped = await getFilesGroupedByExtension('mojitto')
 * console.log(grouped.jpg) // Array of all .jpg files
 * console.log(grouped.png) // Array of all .png files
 */
export async function getFilesGroupedByExtension(path) {
  try {
    const files = await getAllFilesInPath(path)

    const grouped = {}
    files.forEach((file) => {
      const extension = file.name.split('.').pop().toLowerCase()

      if (!grouped[extension]) {
        grouped[extension] = []
      }

      grouped[extension].push(file)
    })

    return grouped
  } catch (error) {
    console.error(
      `Error fetching files grouped by extension from path ${path}:`,
      error
    )
    throw error
  }
}
