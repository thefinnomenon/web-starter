import Mixpanel from "mixpanel"

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (!token) throw new Error("Mixpanel server token is missing!")

export const mixpanelSrv = Mixpanel.init(token, {
  protocol: "https",
  verbose: true,
})

console.log(
  'Initialized Mixpanel server with token ending in "',
  token.slice(-4),
  '"'
)

// tiny helper with unified distinct_id
export function trackServer(
  event: string,
  distinctId: string,
  props: Record<string, unknown> = {}
) {
  mixpanelSrv.track(event, {
    distinct_id: distinctId,
    ...props,
    _source: "server",
  })
}
