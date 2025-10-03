import mixpanel from "mixpanel-browser"

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) throw Error("Mixpanel client token is missing!")

  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true })
}

export const metrics = {
  track: (event: string, props?: Record<string, unknown>) => {
    try {
      mixpanel.track(event, props)
    } catch {}
  },
  // If you have your own user IDs (e.g., post-login), you can link events without cookies:
  identify: (userId: string) => {
    try {
      mixpanel.identify(userId)
    } catch {}
  },
}
