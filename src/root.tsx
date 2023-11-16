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
import { Trans, TransProvider } from "@mbarzda/solid-i18next"
import "./root.css"
import { SantaProvider } from "~/lib/store"
import { captureException, initSentry } from "~/lib/sentry"
import { configureI18next, translations } from "~/lib/i18n"

export default function Root() {
  initSentry()
  configureI18next().catch(captureException)

  const errorComponent = (e: Error) => {
    captureException(e)
    return (
      <>
        <h1>
          <Trans key="errorHeadline" />
        </h1>
        <p>
          {e.name}: {e.message}
        </p>
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
          content="wichtel, wichteln, secret santa, père noël secret, auslosen, draw names, tirer au sort, zuweisen, express, schnell, einfach, unkompliziert, ohne anmeldung, quick, simplement, easy"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          defer
          data-domain="wichtel.express"
          src="https://plausible.io/js/script.tagged-events.js"
        ></script>
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary fallback={errorComponent}>
            <TransProvider
              options={{
                interpolation: { prefix: "$$", suffix: "$$" },
                resources: translations,
              }}
            >
              <SantaProvider>
                <Routes>
                  <FileRoutes />
                </Routes>
              </SantaProvider>
            </TransProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
