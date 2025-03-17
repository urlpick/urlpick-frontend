"use client"

import { useState, useCallback } from "react"
import { ERRORS } from "@/lib/constants"
import { toast } from "sonner"

interface UseTurnstileResult {
  token: string | null
  widgetId: string | null
  handleVerify: (token: string) => void
  handleError: () => void
  handleExpire: () => void
  handleLoad: (widgetId: string) => void
  resetToken: () => void
}

/**
 * Custom hook for Cloudflare Turnstile integration
 */
export function useTurnstile(): UseTurnstileResult {
  const [token, setToken] = useState<string | null>(null)
  const [widgetId, setWidgetId] = useState<string | null>(null)

  const handleVerify = useCallback((token: string) => {
    setToken(token)
  }, [])

  const handleError = useCallback(() => {
    setToken(null)
    toast.error(ERRORS.CAPTCHA.FAILED)
  }, [])

  const handleExpire = useCallback(() => {
    setToken(null)
    toast.error(ERRORS.CAPTCHA.EXPIRED)
  }, [])

  const handleLoad = useCallback((widgetId: string) => {
    setWidgetId(widgetId)
  }, [])

  const resetToken = useCallback(() => {
    setToken(null)
    if (window.turnstile && widgetId) {
      window.turnstile.reset(widgetId)
    }
  }, [widgetId])

  return {
    token,
    widgetId,
    handleVerify,
    handleError,
    handleExpire,
    handleLoad,
    resetToken,
  }
}

