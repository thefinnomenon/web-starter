import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import TestEmail from "@/emails/TestEmail"

export async function POST() {
  const result = await sendEmail({
    to: "chris@finnternet.com",
    subject: "Test Email",
    react: TestEmail({ name: "Test User" }),
  })

  if (result.success) {
    return NextResponse.json(result)
  } else {
    return NextResponse.json(result, { status: 500 })
  }
}
