function validatePhoneNumber(value) {
  if (!value) return false

  const digits = value.replace(/\D/g, '')
  
  return /^[0-9]{10,11}$/.test(digits)
}

const phone = {
  validatePhoneNumber
}

export default phone