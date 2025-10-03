export const dynamic = "force-dynamic"
class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = "SentryExampleAPIError"
  }
}
// A faulty API route to test Sentry's error monitoring
export function GET() {
  throw new SentryExampleAPIError("Sample server error")
}
