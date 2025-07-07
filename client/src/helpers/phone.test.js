import { describe, it, expect } from "vitest"
import phone from "../helpers/phone.js"

describe("validatePhoneNumber", () => {
  it("deve retornar false se o valor for vazio", () => {
    expect(phone.validatePhoneNumber("")).toBe(false)
  })

  it("deve retornar true para telefone fixo com 10 dígitos", () => {
    expect(phone.validatePhoneNumber("8633211234")).toBe(true)
  })

  it("deve retornar true para celular com 11 dígitos", () => {
    expect(phone.validatePhoneNumber("86998011234")).toBe(true)
  })

  it("deve retornar false se contiver letras", () => {
    expect(phone.validatePhoneNumber("86998011234abc")).toBe(false)
  })

  it("deve aceitar formatos com pontuação", () => {
    expect(phone.validatePhoneNumber("(86) 99801-1234")).toBe(true)
  })
})
