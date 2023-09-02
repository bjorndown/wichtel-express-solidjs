import { describe, expect, it } from "vitest"
import { draw } from "~/lib/draw"
import { createStore } from "solid-js/store"
import { SecretSanta } from "~/lib/store"

describe("drawLots", () => {
  it("must fail if names are not unique", () => {
    const [santas, setSantas] = createStore<SecretSanta[]>([
      { name: "same" },
      { name: "same" },
    ])
    expect(() => draw(santas, setSantas)).toThrowError(/not unique/)
  })
  it("must draw lots such that no-one draws him or herself and that lots are unique", () => {
    const [santas, setSantas] = createStore<SecretSanta[]>([
      { name: "Hans" },
      { name: "Otto" },
      { name: "Oskar" },
      { name: "Nadine" },
      { name: "Nina" },
      { name: "Anita" },
      { name: "Petra" },
      { name: "Sandra" },
      { name: "Flavia" },
      { name: "Andrea" },
      { name: "Tina" },
      { name: "Rosina" },
      { name: "Kurt" },
      { name: "Berta" },
      { name: "Karl" },
      { name: "Boris" },
      { name: "Sven" },
      { name: "Carla" },
      { name: "Xenia" },
      { name: "Sonja" },
      { name: "Reto" },
      { name: "Thomas" },
      { name: "Daniel" },
      { name: "Peter" },
      { name: "Monika" },
      { name: "Heidi" },
      { name: "Jacqueline" },
    ])

    draw(santas, setSantas)

    expect(santas.every(s => !!s.presentee)).toBe(true)
    expect(santas.every(s => s.presentee !== s.name)).toBe(true)
    expect(new Set(santas.map(s => s.name))).toStrictEqual(
      new Set(santas.map(s => s.presentee)),
    )
  })
})
