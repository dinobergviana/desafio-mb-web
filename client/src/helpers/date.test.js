import { describe, it, expect } from "vitest"
import date from "../helpers/date.js"

describe("validateDate", () => {
  it("retorna true para data válida como string", () => {
    expect(date.validateDate("30/06/1989")).toBe(true)
  })

  it("retorna false para 31 de fevereiro", () => {
    expect(date.validateDate("31/02/2023")).toBe(false)
  })

  it("retorna false para data futura", () => {
    expect(date.validateDate("31/12/2099")).toBe(false)
  })

  it("retorna false para string com letras", () => {
    expect(date.validateDate("30/jun/1989")).toBe(false)
  })

  it("retorna false para string no formato incorreto", () => {
    expect(date.validateDate("1989/06/30")).toBe(false)
  })

  it("retorna false se faltar dia, mês ou ano", () => {
    expect(date.validateDate("30/06")).toBe(false)
  })

  it("retorna false para string vazia", () => {
    expect(date.validateDate("")).toBe(false)
  })

  it("retorna false para null", () => {
    expect(date.validateDate(null)).toBe(false)
  })

  it("retorna false para undefined", () => {
    expect(date.validateDate(undefined)).toBe(false)
  })

  it("retorna false para string numérica inválida", () => {
    expect(date.validateDate("123456")).toBe(false)
  })

  it("retorna true para objeto Date válido", () => {
    expect(date.validateDate(new Date("1989-06-30"))).toBe(true)
  })

  it("retorna false para objeto Date inválido", () => {
    expect(date.validateDate(new Date("invalid-date"))).toBe(false)
  })

  it("retorna false para objeto Date futuro", () => {
    expect(date.validateDate(new Date("2099-12-31"))).toBe(false)
  })

  it("retorna false para dia inválido (32/01)", () => {
    expect(date.validateDate("32/01/2020")).toBe(false)
  })

  it("retorna false para mês inválido (13)", () => {
    expect(date.validateDate("10/13/2020")).toBe(false)
  })
})
