import { For } from "solid-js"
import { useSantaStore } from "~/lib/store"
import classNames from "classnames"
import style from "~/routes/(app)/index.module.css"

export const SecretLinks = () => {
  const { getSantasWithUrl, reset } = useSantaStore()
  return (
    <>
      <p>
        Versenden Sie nun die persönlichen Links per e-Mail, SMS, WhatsApp,
        Signal etc.
      </p>
      <For each={getSantasWithUrl()}>
        {santa => {
          return (
            <button
              class="full-width plausible-event-name=copySingleLink"
              onClick={() => navigator.clipboard.writeText(santa.url)}
            >
              Link f&uuml;r {santa.name} kopieren
            </button>
          )
        }}
      </For>
      <button
        class="full-width plausible-event-name=copyAllLinks"
        onClick={() =>
          navigator.clipboard.writeText(
            getSantasWithUrl()
              .map(person => `${person.name}: ${person.url}`)
              .join("\n"),
          )
        }
      >
        Alle Namen und Links kopieren
      </button>
      <button
        class={classNames(
          "full-width",
          style.redraw,
          "plausible-event-name=redrawNames",
        )}
        onClick={reset}
      >
        Erneut auslosen
      </button>
    </>
  )
}
