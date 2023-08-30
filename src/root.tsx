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

export default function Root() {
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
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
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
