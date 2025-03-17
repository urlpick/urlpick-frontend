import { apiClient } from "@/lib/api/client"
import { API } from "@/lib/constants"
import { normalizeUrl } from "@/lib/utils/url-utils"
import type { UrlResponse } from "@/types"

/**
 * URL-related API services
 */
export const urlService = {
  /**
   * Creates a shortened URL
   */
  createShortUrl: async (url: string, token: string): Promise<UrlResponse> => {
    const normalizedUrl = normalizeUrl(url)

    return apiClient.post<UrlResponse>(API.ENDPOINTS.URLS, {
      url: normalizedUrl,
      turnstile_token: token,
    })
  },

  /**
   * Fetches the original URL from a hash
   */
  fetchOriginalUrl: async (hash: string): Promise<UrlResponse> => {
    return apiClient.get<UrlResponse>(`${API.ENDPOINTS.URLS}/${hash}`)
  },
}

