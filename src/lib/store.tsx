import {
  Accessor,
  createContext,
  createSignal,
  JSXElement,
  useContext,
} from "solid-js"
import { createStore } from "solid-js/store"
import { draw } from "~/lib/draw"
import { containsBlockedChars } from "~/lib/obfuscate"
import { SupportedLanguages } from "~/lib/i18n"

const SantaContext = createContext<ReturnType<typeof createSantaStore>>()

type ValidationErrors =
  | "NameTooShort"
  | "NameContainsInvalidChars"
  | "NotEnoughNames"
  | "NamesNotUnique"

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
  validationError: ValidationErrors
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
      validationError: "NameTooShort",
    }
  }

  if (containsBlockedChars(newName)) {
    return {
      state: "invalid",
      name: santa.name,
      validationError: "NameContainsInvalidChars",
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
  const [validationError, setValidationError] =
    createSignal<ValidationErrors | null>(null)

  return {
    santas,
    validationError,
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
    drawLots(language: SupportedLanguages): void {
      setSantas(santas => draw(santas, location.href, language))
    },
    isReadyToDrawLots(): boolean {
      const santasValid = santas.every(santa => santa.state === "valid")
      const santasUnique =
        santas.length === new Set(santas.map(santa => santa.name)).size
      const enoughSantas = santas.length > 2
      const ready = santasValid && santasUnique && enoughSantas

      if (!santasUnique) {
        setValidationError("NamesNotUnique")
      }

      if (!enoughSantas) {
        setValidationError("NotEnoughNames")
      }

      if (ready) {
        setValidationError(null)
      }

      return ready
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
