import { Resend } from "resend"
import { ReactElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string
  subject: string
  react: ReactElement
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
      console.log("Email would be sent to:", to)
      console.log("Subject:", subject)
      return {
        success: true,
        message: "Email sending disabled (missing env vars)",
      }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      react,
    })

    if (error) {
      throw error
    }

    return { success: true, message: "Email sent successfully", data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
