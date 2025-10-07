import Mixpanel from "mixpanel"

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (!token) throw new Error("Mixpanel server token is missing!")

export const mixpanelSrv = Mixpanel.init(token, {
  protocol: "https",
})

console.log(
  'Initialized Mixpanel server with token ending in "',
  token.slice(-4),
  '"'
)

export const trackServer = async (
  event: string,
  distinctId: string,
  props: Record<string, unknown> = {}
) =>
  new Promise<void>((resolve, reject) =>
    mixpanelSrv.track(
      event,
      { distinct_id: distinctId, ...props, _source: "server" },
      (err?: Error) => (err ? reject(err) : resolve())
    )
  )
