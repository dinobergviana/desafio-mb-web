  function validatePhoneNumber(value) {
    if (!value) return false

    const digits = value.replace(/\D/g, "")

    return digits.length === 10 || digits.length === 11
  }

const phone = {
  validatePhoneNumber
}

export default phone