import _sample from "lodash/sample"
import { DrawnSanta, SantaWithUrl, SecretSanta } from "~/lib/store"
import { obfuscate } from "~/lib/obfuscate"

const assertNamesAreUnique = (santas: SecretSanta[]) => {
  if (new Set(santas.map(santa => santa.name)).size !== santas.length) {
    throw new Error("Names are not unique")
  }
}

const addUrl = (santa: DrawnSanta, urlBase: string): SantaWithUrl => {
  const url = new URL("reveal", urlBase)
  url.searchParams.append("s", santa.name)
  url.searchParams.append("p", obfuscate(santa.presentee) as string)
  return { ...santa, state: "withUrl", url: url.toString() }
}

export const draw = (
  santas: SecretSanta[],
  urlBase: string,
): SantaWithUrl[] => {
  assertNamesAreUnique(santas)

  const drawnSantas: DrawnSanta[] = []

  while (drawnSantas.length !== santas.length) {
    for (const santa of santas) {
      const otherSantas = santas.filter(
        otherSanta => otherSanta.name !== santa!.name,
      )
      const presentee = _sample(otherSantas) as SecretSanta // it will not be nullish
      const notAlreadyPresentee = drawnSantas.every(
        santa => santa.presentee !== presentee.name,
      )
      const notAlreadyDrawn = !drawnSantas.find(s => s.name === santa.name)

      if (notAlreadyPresentee && notAlreadyDrawn) {
        drawnSantas.push({
          state: "drawn",
          name: santa.name,
          presentee: presentee.name,
        })
      }
    }
  }

  return drawnSantas.map(santa => addUrl(santa, urlBase))
}
