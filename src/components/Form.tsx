import { Accessor, For, JSX, Show } from "solid-js"
import { SecretSanta, useSantaStore } from "~/lib/store"
import styles from "./Form.module.css"
import classNames from "classnames"

type InputProps = {
  index: Accessor<number>
  santa: SecretSanta
  delete: () => void
  update: (name: string) => void
}

const Input = (props: InputProps) => {
  const updateAndValidate: JSX.InputEventHandler<
    HTMLInputElement,
    InputEvent
  > = event => {
    props.update(event.target.value)
    const customValidity =
      props.santa.state === "invalid" ? props.santa.validationMessage : ""
    event.currentTarget.setCustomValidity(customValidity)
    event.currentTarget.reportValidity()
  }

  return (
    <>
      <label class="" for={`input-person-${props.index()}`}>
        Person {props.index() + 1}
      </label>
      <input
        id={`input-person-${props.index()}`}
        onInput={updateAndValidate}
        onFocusIn={event => event.currentTarget.reportValidity()}
        title={`Name der Person. Der Name muss mindestens drei Zeichen lang sein. Die meisten Sonderzeichen und Emojis werden nicht unterstützt.`}
        type="text"
        value={props.santa.name}
        aria-label={`Name Person ${props.index() + 1}`}
      />
      <button type="button" onClick={props.delete}>
        L&ouml;schen
      </button>
    </>
  )
}
export const Form = () => {
  const {
    santas,
    deleteSanta,
    addSanta,
    drawLots,
    updateName,
    isReadyToDrawLots,
    validationMessage,
  } = useSantaStore()

  return (
    <form onSubmit={() => drawLots()}>
      <p>Erfassen Sie alle Personen</p>
      <For each={santas}>
        {(santa, i) => (
          <div class="row">
            <Input
              index={i}
              santa={santa}
              update={name => updateName(i, name)}
              delete={() => deleteSanta(i)}
            />
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
      <Show
        when={
          !isReadyToDrawLots() && santas.every(santa => santa.state === "valid")
        }
      >
        <p class={classNames(styles.validationMessage, "full-width")}>
          {validationMessage()}
        </p>
      </Show>
      <input
        type="submit"
        class="full-width primary plausible-event-name=drawLots"
        disabled={!isReadyToDrawLots()}
        value="Wichtel auslosen"
      />
    </form>
  )
}
