import { NextResponse } from "next/server"
import { trackServer } from "@/lib/mixpanelServer"

export async function POST(req: Request) {
  const { id } = await req.json()

  trackServer("Sample server metric", id, {
    server: true,
  })

  return NextResponse.json({ status: "ok" })
}
