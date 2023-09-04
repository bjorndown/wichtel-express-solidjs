import * as Sentry from "@sentry/browser"

export const initSentry = () =>   Sentry.init({
  dsn: "https://b1c4c3ec90df4a98f8dace200d62399b@o4504040300544000.ingest.sentry.io/4505821759340544",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  beforeSend: (event: Sentry.Event): Sentry.Event | PromiseLike<Sentry.Event | null> | null => {
    if (window.location.host.includes("localhost")) {
      console.log(event)
      return null
    }
    return event
  },
})
