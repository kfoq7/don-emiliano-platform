/**
 * Debounce Function
 * Execute a function after a timeout, canceling previous pending executions
 *
 * This function delays the execution of the provided function until after
 * a specified wait time has elapsed since the last time it was invoked.
 * Useful for limiting the rate of execution of expensive operations like
 * API calls triggered by user input.
 *
 * @template T - The type of the function to debounce
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay execution
 * @returns A debounced version of the provided function that accepts the same parameters
 *
 * @example
 * const searchAPI = debounce((query: string) => {
 *   fetch(`/api/search?q=${query}`)
 * }, 500)
 *
 * // Only the last call within 500ms will execute
 * searchAPI('h')
 * searchAPI('he')
 * searchAPI('hel')
 * searchAPI('hello') // Only this call executes after 500ms
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const context = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
