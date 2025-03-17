import { normalizeUrl } from "@/lib/url-utils"
import type { UrlResponse } from "@/types/url"

const API_BASE_URL = "https://urlpick-api.injun.dev/api/v1"

/**
 * Creates a shortened URL
 */
export async function createShortUrl(url: string, token: string): Promise<UrlResponse> {
  const normalizedUrl = normalizeUrl(url)

  const response = await fetch(`${API_BASE_URL}/urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: normalizedUrl,
      turnstile_token: token,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Failed to shorten URL")
  }

  return await response.json()
}

/**
 * Fetches the original URL from a hash
 */
export async function fetchOriginalUrl(hash: string): Promise<UrlResponse> {
  const response = await fetch(`${API_BASE_URL}/urls/${hash}`)

  if (!response.ok) {
    throw new Error("Invalid or expired URL")
  }

  return await response.json()
}

