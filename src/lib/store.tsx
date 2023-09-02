import { Accessor, createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { obfuscate } from "./obfuscate"
import { draw } from "~/lib/draw"

const SantaContext = createContext<ReturnType<typeof createSantaStore>>()

export type SecretSanta = {
  name: string
  presentee?: string
  url?: string
  invalid?: boolean
}

export const useSantaStore = () => useContext(SantaContext)!

const generateLink = (santa: SecretSanta): string => {
  const url = new URL("reveal", location.href)
  url.searchParams.append("s", santa.name)
  url.searchParams.append("p", obfuscate(santa.presentee) as string)
  return url.toString()
}

const createSantaStore = () => {
  const [santas, setSantas] = createStore<SecretSanta[]>([
    { name: "" },
    { name: "" },
    { name: "" },
  ])

  return {
    santas,
    deleteSanta(i: Accessor<number>) {
      setSantas(santas => santas.filter((_, l) => l !== i()))
    },
    addSanta(): void {
      setSantas(_ => [...santas, { name: "" }])
    },
    reset(): void {
      setSantas(santas => santas.map(p => ({ name: p.name })))
    },
    updateName(i: Accessor<number>, name: string): void {
      setSantas(i(), "name", name)
    },
    drawLots(): void {
      draw(santas, setSantas)
      setSantas(santas =>
        santas.map(santa => ({ ...santa, url: generateLink(santa) })),
      )
    },
    isReadyToDrawLots(): boolean {
      return (
        santas.every(person => (person.name?.length ?? 0) > 0) &&
        santas.length === new Set(santas.map(p => p.name)).size &&
        santas.length > 2
      )
    },
    markInvalid(i: Accessor<number>): void {
      setSantas(i(), "invalid", true)
    },
    lotsNotDrawnYet() {
      return santas.some(p => !!p.presentee)
    },
  }
}

export const SantaProvider = (props: { children: any }) => {
  return (
    <SantaContext.Provider value={createSantaStore()}>
      {props.children}
    </SantaContext.Provider>
  )
}
