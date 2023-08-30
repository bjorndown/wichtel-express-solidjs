import { Title } from "solid-start"
import { HttpStatusCode } from "solid-start/server"
import { A } from "@solidjs/router"

export default function NotFound() {
  return (
    <main>
      <Title>Seite nicht gefunden</Title>
      <HttpStatusCode code={404} />
      <h2>Seite nicht gefunden</h2>
      <p>
        Zur&uuml;ck zur <A href="/">Startseite</A>
      </p>
    </main>
  )
}
