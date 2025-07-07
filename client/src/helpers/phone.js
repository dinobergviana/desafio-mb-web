function validatePhoneNumber(value) {
  if (!value) return false

  const pattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$|^\d{10,11}$/

  return pattern.test(value)
}

const phone = {
  validatePhoneNumber
}

export default phone