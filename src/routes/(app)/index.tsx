import { Show } from "solid-js"
import { SecretLinks } from "~/components/SecretLinks"
import { Form } from "~/components/Form"
import { useSantaStore } from "~/lib/store"

const Page = () => {
  const { lotsDrawn } = useSantaStore()
  return (
    <Show when={lotsDrawn()} fallback={<Form />}>
      <SecretLinks />
    </Show>
  )
}

export default Page
