import _shuffle from "lodash/shuffle"
import { DrawnSanta, SantaWithUrl, SecretSanta } from "~/lib/store"
import { obfuscate } from "~/lib/obfuscate"
import { lookupQuerystring, SupportedLanguages } from "~/lib/i18n"

const SHUFFLE_LIMIT = 50

const assertNamesAreUnique = (santas: readonly SecretSanta[]) => {
  if (new Set(santas.map(santa => santa.name)).size !== santas.length) {
    throw new Error("Names are not unique")
  }
}

const addUrl = (
  santa: DrawnSanta,
  urlBase: string,
  language: SupportedLanguages,
): SantaWithUrl => {
  const url = new URL("reveal", urlBase)
  url.searchParams.append("s", santa.name)
  url.searchParams.append("p", obfuscate(santa.presentee) as string)
  url.searchParams.append(lookupQuerystring, language)
  return { ...santa, state: "withUrl", url: url.toString() }
}

export const draw = (
  santas: readonly SecretSanta[],
  urlBase: string,
  language: SupportedLanguages,
): SantaWithUrl[] => {
  assertNamesAreUnique(santas)

  let presenteePool = _shuffle(santas)
  let shuffles = 0

  while (santas.some((santa, i) => santa.name === presenteePool[i].name)) {
    if (shuffles > SHUFFLE_LIMIT) {
      throw new Error(`stopped shuffling after ${SHUFFLE_LIMIT} iterations`)
    }
    presenteePool = _shuffle(presenteePool)
    shuffles++
  }

  return santas
    .map(
      (santa, i): DrawnSanta => ({
        state: "drawn",
        name: santa.name,
        presentee: presenteePool[i].name,
      }),
    )
    .map(santa => addUrl(santa, urlBase, language))
}
