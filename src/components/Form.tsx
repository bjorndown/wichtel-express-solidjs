import { For } from "solid-js"
import { ALLOWED_CHARS, ALLOWED_CHARS_FOR_UI } from "~/lib/obfuscate"
import { useSantaStore } from "~/lib/store"
import styles from "./Form.module.css"

export const Form = () => {
  const {
    santas,
    deleteSanta,
    addSanta,
    drawLots,
    updateName,
    isReadyToDrawLots,
    markInvalid,
  } = useSantaStore()

  return (
    <form onSubmit={() => drawLots()}>
      <p>Erfassen Sie alle Teilnehmer:</p>
      <For each={santas}>
        {(person, i) => (
          <div class="row">
            <label class="visually-hidden" for={`input-person-${i()}`}>
              Name Person {i() + 1}
            </label>
            <input
              id={`input-person-${i()}`}
              onChange={event => updateName(i, event.target.value)}
              onInvalid={() => markInvalid(i)}
              title={`Name der Person. Erlaubte Zeichen: ${ALLOWED_CHARS_FOR_UI}`}
              placeholder={`Name Person ${i() + 1}`}
              type="text"
              size={16}
              value={person.name}
              minLength={3}
              pattern={ALLOWED_CHARS.source}
              aria-label={`Name Person ${i() + 1}`}
            />
            <button
              type="button"
              class={styles.deleteButton}
              onClick={() => deleteSanta(i)}
            >
              Löschen
            </button>
          </div>
        )}
      </For>
      <button type="button" class="full-width" onClick={addSanta}>
        Person hinzufügen
      </button>

      <input
        type="submit"
        class="full-width primary"
        disabled={!isReadyToDrawLots()}
        value="Wichtel auslosen"
      />
    </form>
  )
}
