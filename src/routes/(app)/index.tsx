import { Show } from "solid-js"
import { SecretLinks } from "~/components/SecretLinks"
import { Form } from "~/components/Form"
import { useSantaStore } from "~/lib/store"
import classNames from "classnames"
import style from "./index.module.css"

const Page = () => {
  const { lotsNotDrawnYet, reset } = useSantaStore()

  return (
    <Show when={lotsNotDrawnYet()} fallback={<Form />}>
      <SecretLinks />
      <button class={classNames("full-width", style.redraw)} onClick={reset}>
        Erneut auslosen
      </button>
    </Show>
  )
}

export default Page
