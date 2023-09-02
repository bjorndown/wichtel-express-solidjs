import { For } from "solid-js"
import { useSantaStore } from "~/lib/store"

export const SecretLinks = () => {
  const { santas } = useSantaStore()
  return (
    <>
      <p>
        Versenden Sie nun die persönlichen Links per e-Mail, SMS, WhatsApp,
        Signal etc.
      </p>
      <For each={santas}>
        {person => (
          <button
            class="full-width"
            onClick={() => navigator.clipboard.writeText(person.url as string)}
          >
            Link f&uuml;r {person.name} kopieren
          </button>
        )}
      </For>
      <button
        class="full-width"
        onClick={() =>
          navigator.clipboard.writeText(
            santas.map(person => `${person.name}: ${person.url}`).join("\n"),
          )
        }
      >
        Alle Namen und Links kopieren
      </button>
    </>
  )
}
