function validateDate(value) {
  if (!value) return false

  if (value instanceof Date && !isNaN(value.getTime())) {
    return value <= new Date()
  }

  if (typeof value === "string") {
    const parts = value.split("/")

    if (parts.length !== 3) return false

    const [day, month, year] = parts.map(Number)

    if (
      isNaN(day) || isNaN(month) || isNaN(year) ||
      day < 1 || day > 31 || month < 1 || month > 12
    ) return false

    const date = new Date(year, month - 1, day)

    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year &&
      date <= new Date()
    )
  }

  return false
}

const date = {
  validateDate
}

export default date
