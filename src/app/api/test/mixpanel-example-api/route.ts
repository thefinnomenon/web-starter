import { NextResponse } from "next/server"
import { trackServer } from "@/lib/mixpanelServer"

export async function POST(req: Request) {
  const { properties } = await req.json()

  trackServer("Sample server metric", {
    ...properties,
    server: true,
  })

  return NextResponse.json({ status: "ok" })
}
