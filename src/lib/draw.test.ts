import { describe, expect, it } from "vitest"
import { draw } from "~/lib/draw"
import { santas } from "~/lib/data"

describe("drawLots", () => {
  it("must fail if names are not unique", () => {
    expect(() =>
      draw(
        [
          { state: "valid", name: "same" },
          { state: "valid", name: "same" },
        ],
        "",
        "de",
      ),
    ).toThrowError(/not unique/)
  })
  it("must draw lots such that no-one draws him or herself and that lots are unique", () => {
    const urlBase = "http://example.test"
    const drawnSantas = draw(santas, urlBase, "de")

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
