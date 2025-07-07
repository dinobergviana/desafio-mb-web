function validateDate(value) {
  if (!value) return false

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
    date.getFullYear() === year
  )
}

function checkIsFutureDate(value) {
  const [day, month, year] = value.split("/").map(Number);
  const inputDate = new Date(year, month - 1, day);
  return inputDate <= new Date();
}

function checkIsLegalAge(value) {
  const [day, month, year] = value.split("/").map(Number);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  return (
    age > 18 ||
    (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
  );
}

const date = {
  validateDate,
  checkIsFutureDate,
  checkIsLegalAge
}

export default date
