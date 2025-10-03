"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { initMixpanel, metrics } from "@/lib/mixpanel"
import { isProduction } from "@/lib/env"

export default function MixpanelProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (isProduction()) initMixpanel()
  }, [])

  useEffect(() => {
    if (!isProduction()) return

    const queryString =
      typeof window !== "undefined" ? window.location.search : ""
    const pathWithQuery = `${pathname}${queryString}`

    if (lastPathRef.current === pathWithQuery) return
    lastPathRef.current = pathWithQuery

    metrics.track("Page View", {
      path: pathname,
      query: searchParams?.toString() || "",
    })
  }, [pathname, searchParams])

  return <>{children}</>
}
