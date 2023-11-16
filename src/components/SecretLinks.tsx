import { For } from "solid-js"
import { useSantaStore } from "~/lib/store"
import classNames from "classnames"
import style from "~/routes/(app)/index.module.css"
import { Trans } from "@mbarzda/solid-i18next"

export const SecretLinks = () => {
  const { getSantasWithUrl, reset } = useSantaStore()
  return (
    <>
      <p>
        <Trans key="secretLinksTopText" />
      </p>
      <For each={getSantasWithUrl()}>
        {santa => {
          return (
            <button
              class="full-width plausible-event-name=copySingleLink"
              onClick={() => navigator.clipboard.writeText(santa.url)}
            >
              <Trans
                key="copySingleLinkButton"
                options={{ name: santa.name }}
              />
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
        <Trans key="copyAllLinksButton" />
      </button>
      <button
        class={classNames(
          "full-width",
          style.redraw,
          "plausible-event-name=redrawNames",
        )}
        onClick={reset}
      >
        <Trans key="redrawNamesButton" />
      </button>
    </>
  )
}
