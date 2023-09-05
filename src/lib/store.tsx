import { Accessor, createContext, JSXElement, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { draw } from "~/lib/draw"
import { containsBlockedChars } from "~/lib/obfuscate"

const SantaContext = createContext<ReturnType<typeof createSantaStore>>()

export type SecretSanta =
  | UntouchedSanta
  | InvalidSanta
  | ValidSanta
  | DrawnSanta
  | SantaWithUrl

export type UntouchedSanta = {
  state: "untouched"
  name: ""
}

export type InvalidSanta = {
  state: "invalid"
  name: string
  validationMessage: string
}

export type ValidSanta = {
  state: "valid"
  name: string
}

export type DrawnSanta = {
  state: "drawn"
  name: string
  presentee: string
}

export type SantaWithUrl = {
  state: "withUrl"
  name: string
  presentee: string
  url: string
}

type SantaStates = SecretSanta["state"]

export const useSantaStore = () => useContext(SantaContext)!

const getNextState = (
  santa: SecretSanta,
  newName: string,
): ValidSanta | InvalidSanta => {
  if ((newName ?? "")?.length < 3) {
    return {
      state: "invalid",
      name: santa.name,
      validationMessage: "Der Name muss mindestens drei Zeichen lang sein",
    }
  }

  if (containsBlockedChars(newName)) {
    return {
      state: "invalid",
      name: santa.name,
      validationMessage:
        "Der Name kann keine Sonderzeichen oder Emojis enthalten.",
    }
  }

  return { state: "valid", name: newName }
}

const createSantaStore = () => {
  const [santas, setSantas] = createStore<SecretSanta[]>([
    { name: "", state: "untouched" },
    { name: "", state: "untouched" },
    { name: "", state: "untouched" },
  ])

  return {
    santas,
    deleteSanta(i: Accessor<number>) {
      setSantas(santas => santas.filter((_, l) => l !== i()))
    },
    addSanta(): void {
      setSantas(_ => [...santas, { state: "untouched", name: "" }])
    },
    reset(): void {
      setSantas(santas =>
        santas.map(santa => ({ state: "valid", name: santa.name })),
      )
    },
    updateName(i: Accessor<number>, newName: string): void {
      setSantas(i(), santa => getNextState(santa, newName))
    },
    drawLots(): void {
      setSantas(santas => draw(santas, location.href))
    },
    isReadyToDrawLots(): boolean {
      return (
        santas.every(santa => santa.state === "valid") &&
        santas.length === new Set(santas.map(santa => santa.name)).size &&
        santas.length > 2
      )
    },
    lotsDrawn() {
      return santas.every(santa => santa.state === "withUrl")
    },
    getSantasWithUrl(): SantaWithUrl[] {
      const finalSantas = santas.filter<SantaWithUrl>(
        (santa): santa is SantaWithUrl => santa.state === "withUrl",
      )
      if (finalSantas.length !== santas.length) {
        throw new Error("Invalid state: Not all santas have been drawn")
      }
      return finalSantas
    },
  }
}

export const SantaProvider = (props: { children: JSXElement }) => {
  return (
    <SantaContext.Provider value={createSantaStore()}>
      {props.children}
    </SantaContext.Provider>
  )
}
