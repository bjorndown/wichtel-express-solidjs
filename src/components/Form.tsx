import { Accessor, For, JSX, Show } from "solid-js"
import { SecretSanta, useSantaStore } from "~/lib/store"
import styles from "./Form.module.css"
import classNames from "classnames"
import { Trans, useTransContext } from "@mbarzda/solid-i18next"
import { getResolvedLanguage } from "~/lib/i18n"

type InputProps = {
  index: Accessor<number>
  santa: SecretSanta
  delete: () => void
  update: (name: string) => void
}

const Input = (props: InputProps) => {
  const [t] = useTransContext()

  const updateAndValidate: JSX.InputEventHandler<
    HTMLInputElement,
    InputEvent
  > = event => {
    props.update(event.target.value)
    const customValidity =
      props.santa.state === "invalid"
        ? t(`validationError${props.santa.validationError}`)
        : ""
    event.currentTarget.setCustomValidity(customValidity)
    event.currentTarget.reportValidity()
  }

  return (
    <>
      <label class="" for={`input-person-${props.index()}`}>
        <Trans key="personInputLabel" options={{ index: props.index() + 1 }} />
      </label>
      <input
        id={`input-person-${props.index()}`}
        onInput={updateAndValidate}
        onFocusIn={event => event.currentTarget.reportValidity()}
        title={t("personInputTitle")}
        type="text"
        value={props.santa.name}
        aria-label={t("personInputAriaLabel", { index: props.index() + 1 })}
      />
      <button type="button" onClick={props.delete}>
        <Trans key="deleteButton" />
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
    validationError,
  } = useSantaStore()
  const [t, { getI18next }] = useTransContext()
  return (
    <form
      class={classNames(
        "plausible-event-name=drawNames",
        `plausible-event-groupSize=${santas.length}`,
      )}
      onSubmit={() => drawLots(getResolvedLanguage(getI18next()))}
    >
      <p>
        <Trans key="formTopText" />
      </p>
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
        <Trans key="addPersonButton" />
      </button>
      <Show
        when={
          !isReadyToDrawLots() && santas.every(santa => santa.state === "valid")
        }
      >
        <p class={classNames(styles.validationMessage, "full-width")}>
          <Trans key={`validationError${validationError()}`} />
        </p>
      </Show>
      <input
        type="submit"
        class="full-width primary"
        disabled={!isReadyToDrawLots()}
        value={t("drawNamesButton")}
      />
    </form>
  )
}
