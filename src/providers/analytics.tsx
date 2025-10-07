"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { initMixpanel, analytics } from "@/lib/analytics"
import { isProduction } from "@/lib/env"

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const queryString =
    typeof window !== "undefined" ? window.location.search : ""
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (isProduction()) initMixpanel()
  }, [])

  useEffect(() => {
    if (!isProduction()) return

    const pathWithQuery = `${pathname}${queryString}`

    if (lastPathRef.current === pathWithQuery) return
    lastPathRef.current = pathWithQuery

    analytics.track("Page View", {
      path: pathname,
      query: queryString?.toString() || "",
    })
  }, [pathname, queryString])

  return <>{children}</>
}
