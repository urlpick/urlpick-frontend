"use client"

import { useState, useEffect, useCallback } from "react"
import { urlService } from "@/lib/api/url-service"
import { ERRORS } from "@/lib/constants"
import { toast } from "sonner"
import { UI } from "@/lib/constants"

interface UseRedirectResult {
  originalUrl: string | null
  error: string | null
  isLoading: boolean
  countdown: number
  autoRedirect: boolean
  setAutoRedirect: (value: boolean) => void
  redirectNow: () => void
}

/**
 * Custom hook for URL redirection functionality
 */
export function useRedirect(hash: string): UseRedirectResult {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [countdown, setCountdown] = useState(UI.COUNTDOWN_SECONDS)
  const [autoRedirect, setAutoRedirect] = useState(true)

  const redirectNow = useCallback(() => {
    if (originalUrl) {
      window.location.href = originalUrl
    }
  }, [originalUrl])

  // Fetch the original URL
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        setIsLoading(true)
        const data = await urlService.fetchOriginalUrl(hash)
        setOriginalUrl(data.original_url)
      } catch (error) {
        const err = error as Error
        setError(err.message || ERRORS.API.DEFAULT)
        toast.error(ERRORS.API.REDIRECT)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOriginalUrl()
  }, [hash])

  // Handle countdown and auto-redirect
  useEffect(() => {
    // Only start countdown if we have the URL, auto-redirect is enabled, and we're not at zero
    if (!originalUrl || !autoRedirect || countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1
        if (newCount <= 0) {
          clearInterval(timer)
          redirectNow()
        }
        return newCount
      })
    }, 1000)

    // Clean up timer on unmount or when dependencies change
    return () => clearInterval(timer)
  }, [countdown, originalUrl, autoRedirect, redirectNow])

  return {
    originalUrl,
    error,
    isLoading,
    countdown,
    autoRedirect,
    setAutoRedirect,
    redirectNow,
  }
}

