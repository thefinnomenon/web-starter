import { NextResponse } from "next/server"
import { trackServer } from "@/lib/mixpanelServer"

export async function POST(req: Request) {
  const { id } = await req.json()

  await trackServer("Sample server metric", id)

  return NextResponse.json({ status: "ok" })
}
