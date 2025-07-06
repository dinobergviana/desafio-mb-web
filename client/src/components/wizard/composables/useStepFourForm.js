import { ref, computed } from 'vue'

export function useStepFourForm(formData, emit) {
  const requestFailed = ref(false)

  const isLegalPerson = computed(() => formData.isLegalPerson)

  function emitPreviousStep() {
    formData.currentStep -= 1
    emit('previous-step', formData.currentStep)
  }

  function emitNextStep() {
    formData.currentStep += 1
    emit('next-step', formData.currentStep)
  }

  async function handleSubmit() {
    const {
      email,
      phone,
      password,
      legalName,
      cnpj,
      openingDate,
      name,
      cpf,
      birthDate
    } = formData

    const data = {
      email,
      phone,
      password,
      ...(isLegalPerson.value
        ? { legalName, cnpj, openingDate }
        : { name, cpf, birthDate })
    }

    try {
      const response = await fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseBody = await response.json()

      if (responseBody.statusCode === 400 || responseBody.statusCode === 500) {
        throw new Error()
      }

      requestFailed.value = false
      emitNextStep()
    } catch (error) {
      console.error(error)
      requestFailed.value = true
    }
  }

  return {
    requestFailed,
    isLegalPerson,
    handleSubmit,
    emitPreviousStep
  }
}
