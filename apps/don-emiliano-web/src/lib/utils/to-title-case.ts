/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The string to title case
 */
export function toTitleCase(str: string): string {
  if (!str) return ''

  return str
    .toLowerCase()
    .split(' ')
    .map(word => (word.length === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}
