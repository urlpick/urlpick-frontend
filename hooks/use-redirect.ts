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

  // Navigate only to http/https targets; the URL comes from the API and is untrusted.
  const navigateTo = useCallback((url: string) => {
    try {
      const protocol = new URL(url).protocol
      if (protocol !== "http:" && protocol !== "https:") {
        setError(ERRORS.API.REDIRECT)
        return
      }
    } catch {
      setError(ERRORS.API.REDIRECT)
      return
    }
    window.location.href = url
  }, [])

  const redirectNow = useCallback(() => {
    if (originalUrl) {
      navigateTo(originalUrl)
    }
  }, [originalUrl, navigateTo])

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

  // Handle countdown and auto-redirect. One interval owns the countdown for its
  // lifetime; `countdown` is intentionally not a dependency so it isn't recreated
  // every tick.
  useEffect(() => {
    if (!originalUrl || !autoRedirect) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1
        if (newCount <= 0) {
          clearInterval(timer)
          redirectNow()
          return 0
        }
        return newCount
      })
    }, 1000)

    // Clean up timer on unmount or when dependencies change
    return () => clearInterval(timer)
  }, [originalUrl, autoRedirect, redirectNow])

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

