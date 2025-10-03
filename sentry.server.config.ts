// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isProduction } from "@/lib/env"
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  enabled: isProduction(),
  dsn: "https://18a8fa8ffc593daf573659d98151694c@o371187.ingest.us.sentry.io/4510123244191744",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
