import { For } from "solid-js"
import { ALLOWED_CHARS, ALLOWED_CHARS_FOR_UI } from "~/lib/obfuscate"
import { useSantaStore } from "~/lib/store"
import styles from "./Form.module.css"
import classNames from "classnames"

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
      <p>Erfassen Sie alle Personen</p>
      <For each={santas}>
        {(person, i) => (
          <div class="row">
            <label class="" for={`input-person-${i()}`}>
              Person {i() + 1}
            </label>
            <input
              id={`input-person-${i()}`}
              onChange={event => updateName(i, event.target.value)}
              onInvalid={e => {
                console.dir(e)
                markInvalid(i)
              }}
              // title={`Name der Person. Erlaubte Zeichen: ${ALLOWED_CHARS_FOR_UI}`}
              type="text"
              value={person.name}
              minLength={3}
              pattern={ALLOWED_CHARS.source}
              aria-label={`Name Person ${i() + 1}`}
            />
            <button type="button" onClick={() => deleteSanta(i)}>
              L&ouml;schen
            </button>
          </div>
        )}
      </For>
      <button
        type="button"
        class={classNames("full-width", styles.addButton)}
        onClick={addSanta}
      >
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
