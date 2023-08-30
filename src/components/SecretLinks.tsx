import { For } from "solid-js"
import { SecretSanta } from "~/lib/store"

type Props = {
  santas: SecretSanta[]
}

export const SecretLinks = (props: Props) => {
  return (
    <>
      <p>
        Versenden Sie nun die persönlichen Links per e-Mail, SMS, WhatsApp,
        Signal etc:
      </p>
      <For each={props.santas}>
        {(person, i) => (
          <div class="row">
            <span class="name">{person.name}</span>

            <button
              class="action"
              onClick={() =>
                navigator.clipboard.writeText(person.url as string)
              }
            >
              Link kopieren
            </button>
          </div>
        )}
      </For>
      <button
        class="full-width"
        onClick={() =>
          navigator.clipboard.writeText(
            props.santas
              .map(person => `${person.name}: ${person.url}`)
              .join("\n"),
          )
        }
      >
        Alle Namen und Links kopieren
      </button>
    </>
  )
}
