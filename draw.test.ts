import { describe, expect, test } from "bun:test"
import { pattern, mask } from "./draw"

describe("drawWord", () => {
  test("WRITE MY NAME", () => {
    expect(pattern).toMatchSnapshot()
  })

  test("first X is at index 39", () => {
    for (let i = 0; i < 39; i++) {
      expect(mask[i]).toBe(true)
    }
    expect(mask[39]).toBe(false)
  })

  test("last X is at index 320", () => {
    for (let i = mask.length - 1; i > 320; i--) {
      expect(mask[i]).toBe(true)
    }
    expect(mask[320]).toBe(false)
  })

  test("mask has correct length of output", () => {
    const DAYS_IN_YEAR = 365
    const DAYS_ARE_NOT_IN_FULL_WEEK = 8
    expect(mask.length).toBe(DAYS_IN_YEAR - DAYS_ARE_NOT_IN_FULL_WEEK)
  })
})
