import { describe, expect, it } from "vitest"
import { draw } from "~/lib/draw"
import { SecretSanta } from "~/lib/store"

describe("drawLots", () => {
  it("must fail if names are not unique", () => {
    expect(() =>
      draw(
        [
          { state: "valid", name: "same" },
          { state: "valid", name: "same" },
        ],
        "",
      ),
    ).toThrowError(/not unique/)
  })
  it("must draw lots such that no-one draws him or herself and that lots are unique", () => {
    const santas: SecretSanta[] = [
      { state: "valid", name: "Hans" },
      { state: "valid", name: "Otto" },
      { state: "valid", name: "Oskar" },
      { state: "valid", name: "Nadine" },
      { state: "valid", name: "Nina" },
      { state: "valid", name: "Anita" },
      { state: "valid", name: "Petra" },
      { state: "valid", name: "Sandra" },
      { state: "valid", name: "Flavia" },
      { state: "valid", name: "Andrea" },
      { state: "valid", name: "Tina" },
      { state: "valid", name: "Rosina" },
      { state: "valid", name: "Kurt" },
      { state: "valid", name: "Berta" },
      { state: "valid", name: "Karl" },
      { state: "valid", name: "Boris" },
      { state: "valid", name: "Sven" },
      { state: "valid", name: "Carla" },
      { state: "valid", name: "Xenia" },
      { state: "valid", name: "Sonja" },
      { state: "valid", name: "Reto" },
      { state: "valid", name: "Thomas" },
      { state: "valid", name: "Daniel" },
      { state: "valid", name: "Peter" },
      { state: "valid", name: "Monika" },
      { state: "valid", name: "Heidi" },
      { state: "valid", name: "Jacqueline" },
    ]
    const urlBase = "http://example.test"
    const drawnSantas = draw(santas, urlBase)

    expect(drawnSantas.every(s => s.state === "withUrl")).toBe(true)
    expect(drawnSantas.every(s => !!s.presentee)).toBe(true)
    expect(drawnSantas.every(s => s.presentee !== s.name)).toBe(true)
    expect(new Set(santas.map(s => s.name))).toStrictEqual(
      new Set(drawnSantas.map(s => s.presentee)),
    )
    expect(new Set(santas.map(s => s.name))).toStrictEqual(
      new Set(drawnSantas.map(s => s.name)),
    )
    expect(drawnSantas.every(santa => santa.url.startsWith(urlBase)))
  })
})
