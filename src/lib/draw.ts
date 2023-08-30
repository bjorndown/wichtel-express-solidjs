import { SetStoreFunction } from "solid-js/store"
import _sample from "lodash/sample"
import { SecretSanta } from "~/lib/store"

const assertNamesAreUnique = (santas: SecretSanta[]) => {
  if (new Set(santas.map((santa) => santa.name)).size !== santas.length) {
    throw new Error('Names are not unique')
  }
}
export const draw = (
  santas: SecretSanta[],
  setSantas: SetStoreFunction<SecretSanta[]>
) => {
  assertNamesAreUnique(santas)
  while (santas.some((santa) => !santa.presentee)) {
    for (const santa of santas) {
      const otherSantas = santas.filter(
        (otherSanta) => otherSanta.name !== santa.name
      )
      const presentee = _sample(otherSantas) as SecretSanta // it will not be nullish
      const alreadyPresentee = santas.some(
        (santa) => santa.presentee === presentee.name
      )
      if (!alreadyPresentee) {
        const index = santas.indexOf(santa)
        setSantas(index, 'presentee', presentee.name)
      }
    }
  }
}
