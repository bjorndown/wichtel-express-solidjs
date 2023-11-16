import { bench, expect } from "vitest"
import { draw } from "~/lib/draw"
import { santas } from "~/lib/data"

bench(
  "draw",
  () => {
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
  },
  { iterations: 500, time: 1000 },
)
