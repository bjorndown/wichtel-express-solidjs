// @refresh reload
import { Suspense } from "solid-js"
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start"
import "./root.css"
import { SantaProvider } from "~/lib/store"
import { captureException, initSentry } from "~/lib/sentry"


export default function Root() {
  initSentry()

  const errorComponent = (e: Error) => {
    captureException(e)
    return (
      <>
        <h1>Unerwarteter Fehler</h1>
        <p>{e.name}: {e.message}</p>
      </>
    )
  }

  return (
    <Html lang="en">
      <Head>
        <Title>
          wichtel.express &ndash; Wichtel-Auslosung schnell und ohne Anmeldung
        </Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Wichtel-Auslosung schnell und ohne Anmeldung"
        />
        <meta
          name="keywords"
          content="wichtel, wichteln, secret santa, auslosen, zuweisen, express, schnell, einfach, unkompliziert, ohne anmeldung"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script defer data-domain="wichtel.express" src="https://plausible.io/js/script.js"></script>
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary
            fallback={errorComponent}
          >
            <SantaProvider>
              <Routes>
                <FileRoutes />
              </Routes>
            </SantaProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
