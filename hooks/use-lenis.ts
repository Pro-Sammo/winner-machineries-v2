"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Get the Lenis instance from the global scope
    const lenis = (window as any).lenis
    if (lenis) {
      lenisRef.current = lenis
    }
  }, [])

  return lenisRef.current
}

// Utility functions for common scroll operations
export const scrollTo = (target: string | number, options?: {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}) => {
  const lenis = (window as any).lenis
  if (lenis) {
    lenis.scrollTo(target, options)
  }
}

export const scrollToTop = (options?: {
  duration?: number
  easing?: (t: number) => number
}) => {
  scrollTo(0, options)
}

export const scrollToBottom = (options?: {
  duration?: number
  easing?: (t: number) => number
}) => {
  const lenis = (window as any).lenis
  if (lenis) {
    lenis.scrollTo(lenis.limit, options)
  }
} 