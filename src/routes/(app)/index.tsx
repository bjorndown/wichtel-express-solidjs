import { Show } from "solid-js"
import { SecretLinks } from "~/components/SecretLinks"
import { Form } from "~/components/Form"
import { useSantaStore } from "~/lib/store"

const Page = () => {
  const { santas, reset } = useSantaStore()

  return (
    <Show when={santas.some(p => !!p.presentee)} fallback={<Form />}>
      <SecretLinks santas={santas} />
      <button class="full-width" onClick={reset}>
        Zurücksetzen
      </button>
    </Show>
  )
}

export default Page
