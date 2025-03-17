"use client"

import { useState, useEffect, useCallback } from "react"

interface UseCountdownProps {
  initialCount: number
  onComplete?: () => void
  autoStart?: boolean
}

/**
 * Custom hook for countdown functionality
 */
export function useCountdown({ initialCount, onComplete, autoStart = true }: UseCountdownProps) {
  const [count, setCount] = useState(initialCount)
  const [isActive, setIsActive] = useState(autoStart)
  const [isPaused, setIsPaused] = useState(false)

  const reset = useCallback(() => {
    setCount(initialCount)
    setIsPaused(false)
  }, [initialCount])

  const start = useCallback(() => {
    setIsActive(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    setIsActive(false)
  }, [])

  useEffect(() => {
    if (!isActive || isPaused || count <= 0) return

    const interval = setInterval(() => {
      setCount((currentCount) => {
        const newCount = currentCount - 1
        if (newCount <= 0) {
          clearInterval(interval)
          if (onComplete) {
            onComplete()
          }
        }
        return newCount
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [count, isActive, isPaused, onComplete])

  return {
    count,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
  }
}

