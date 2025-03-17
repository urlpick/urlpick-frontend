"use client"

import { useState, useCallback } from "react"
import { urlService } from "@/lib/api/url-service"
import { ERRORS, SUCCESS } from "@/lib/constants"
import { toast } from "sonner"
import type { UrlResponse } from "@/types"

interface UseUrlShortenerResult {
  result: UrlResponse | null
  isLoading: boolean
  shortenUrl: (url: string, token: string) => Promise<boolean>
  resetResult: () => void
}

/**
 * Custom hook for URL shortening functionality
 */
export function useUrlShortener(): UseUrlShortenerResult {
  const [result, setResult] = useState<UrlResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const shortenUrl = useCallback(async (url: string, token: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const data = await urlService.createShortUrl(url, token)
      setResult(data)
      toast.success(SUCCESS.URL_SHORTENED)
      return true
    } catch (err) {
      const error = err as Error
      toast.error(error.message || ERRORS.API.SHORTEN)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const resetResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    result,
    isLoading,
    shortenUrl,
    resetResult,
  }
}

