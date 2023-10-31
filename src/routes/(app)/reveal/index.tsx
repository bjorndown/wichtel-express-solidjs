import { createSignal, Match, Show, Switch } from "solid-js"
import { useSearchParams } from "@solidjs/router"
import { deObfuscate } from "~/lib/obfuscate"
import { firstQueryParameter } from "~/lib/url"
import style from "./index.module.css"

const Reveal = () => {
  const [revealed, setRevealed] = createSignal(false)
  const [query] = useSearchParams()
  const santa = firstQueryParameter(query["s"])
  const presentee = deObfuscate(firstQueryParameter(query["p"]))
  const invalid = !santa || !presentee
  const fallback = (
    <button class="primary plausible-event-name=revealName" onClick={() => setRevealed(true)}>
      Enthülle den Namen
    </button>
  )

  return (
    <Switch>
      <Match when={invalid}>
        <article class={style.centered}>Diese URL ist ungültig.</article>
      </Match>
      <Match when={!invalid}>
        <article class={style.centered}>
          <h2 class={style.person}>{santa},</h2>
          <p>du bist der Wichtel von</p>
          <Show when={revealed()} fallback={fallback}>
            <span class={style.person}>{presentee}</span>
          </Show>
        </article>
      </Match>
    </Switch>
  )
}

export default Reveal
