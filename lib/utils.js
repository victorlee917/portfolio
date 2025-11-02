/**
 * Creates a throttled function that only invokes the provided function at most once per specified wait time
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to throttle invocations to
 * @returns {Function} The throttled function
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled!')
 * }, 100)
 * window.addEventListener('scroll', handleScroll)
 */
export function throttle(func, wait) {
  let timeout = null
  let previous = 0

  return function (...args) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed since the last time the debounced function was invoked
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 *
 * @example
 * const handleResize = debounce(() => {
 *   console.log('Resized!')
 * }, 300)
 * window.addEventListener('resize', handleResize)
 */
export function debounce(func, wait) {
  let timeout = null

  return function (...args) {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
