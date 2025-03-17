/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(urlString: string): boolean {
  // Add protocol if missing for validation
  const urlToCheck = normalizeUrl(urlString)

  try {
    new URL(urlToCheck)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Normalizes a URL by adding https:// if no protocol is specified
 */
export function normalizeUrl(url: string): string {
  // Trim whitespace
  url = url.trim()

  // Check if URL already has a protocol
  if (!/^(?:f|ht)tps?:\/\//i.test(url)) {
    // Add https:// if no protocol is specified
    url = "https://" + url
  }

  return url
}

/**
 * Formats a date string to a localized date and time
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString()
  } catch (error) {
    return dateString
  }
}

