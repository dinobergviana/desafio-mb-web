<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">2</span><span> de 4</span>
    </div>

    <h1 class="form-title">{{ isLegalPerson ? "Pessoa jurídica" : "Pessoa física" }}</h1>

    <Form class="form-container" @submit="handleSaveDate" :validation-schema="schema">
      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Razão social" : "Nome" }}</label>
        <Field v-model="legalName" v-if="isLegalPerson" id="legal-name" name="legalName" />
        <Field v-model="name" v-else id="name" name="name" />

        <div v-if="isLegalPerson" class="error-message">
          <ErrorMessage name="legalName" />
        </div>

        <div v-else class="error-message">
          <ErrorMessage name="name" />
        </div>
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "CNPJ" : "CPF" }}</label>
        <Field v-model="cnpj" v-if="isLegalPerson" id="cnpj" name="cnpj" />
        <Field v-model="cpf" v-else id="cpf" name="cpf" />
      
        <div v-if="isLegalPerson" class="error-message">
          <ErrorMessage name="cnpj" />
        </div>

        <div v-else class="error-message">
          <ErrorMessage name="cpf" />
        </div>
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Data de abertura" : "Data de nascimento" }}</label>
        <Field v-model="openingDate" v-if="isLegalPerson" id="opening-date" name="openingDate" />
        <Field v-model="birthDate" v-else id="birth-date" name="birthDate" />
      
        <div v-if="isLegalPerson" class="error-message">
          <ErrorMessage name="openingDate" />
        </div>

        <div v-else class="error-message">
          <ErrorMessage name="birthDate" />
        </div>
      </div>

      <div class="input-control">
        <label for="name">Telefone</label>
        <Field v-model="phone" id="phone" name="phone" />
        
        <div class="error-message">
          <ErrorMessage name="phone" />
        </div>
      </div>

      <div class="actions">
        <button class="btn-secondary" type="button" @click="emitPreviousStep">
          Voltar
        </button>

        <button class="btn-primary" type="submit">
          Continuar
        </button>
      </div>
    </Form>
  </section>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue"

  import { Form, Field, ErrorMessage } from "vee-validate"
  import * as yup from "yup"

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/

  const schema = yup.object({
    name: props.formData.entity === 1 ? yup.string().required("Campo obrigatório") : false,
    cpf: props.formData.entity === 1 ? yup.string().required("Campo obrigatório").matches(cpfRegex, "CPF inválido") : false,
    birthDate: props.formData.entity === 1 ? yup.string().required("Campo obrigatório").test("valid-date", "Data inválida", value => isValidDate(value)) : false,
    legalName: props.formData.entity === 2 ? yup.string().required("Campo obrigatório") : false,
    cnpj: props.formData.entity === 2 ? yup.string().required("Campo obrigatório").matches(cnpjRegex, "CNPJ inválido") : false,
    openingDate: props.formData.entity === 2 ? yup.string().required("Campo obrigatório").test("valid-date", "Data inválida", value => isValidDate(value)) : false,
    phone: yup.string().required("Campo obrigatório").test("valid-phone", "Telefone inválido", value => validatePhone(value))
  })

  const emit = defineEmits(["previous-step", "next-step"])

  const name = ref("")
  const cpf = ref("")
  const birthDate = ref("")
  const legalName = ref("")
  const cnpj = ref("")
  const openingDate = ref("")
  const phone = ref("")

  const isLegalPerson = computed(() => {
    return props.formData.entity === 2
  })

  function isValidDate(value) {
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

  function validatePhone(value) {
    if (!value) return false

    const digits = value.replace(/\D/g, "")

    return digits.length === 10 || digits.length === 11
  }

  function emitNextStep() {
    emit("next-step", props.formData.currentStep + 1)
    props.formData.currentStep += 1
  }

  function emitPreviousStep() {
    emit("previous-step", props.formData.currentStep - 1)
    props.formData.currentStep -= 1
  }

  function handleSaveDate() {
    if (isLegalPerson.value) {
      props.formData.legalName = legalName.value
      props.formData.cnpj = cnpj.value
      props.formData.openingDate = openingDate.value
    } else {
      props.formData.name = name.value
      props.formData.cpf = cpf.value
      props.formData.birthDate = birthDate.value
    }

    props.formData.phone = phone.value

    emitNextStep()
  }

  onMounted(() => {
    if (isLegalPerson.value) {
      legalName.value = props.formData.legalName
      cnpj.value = props.formData.cnpj
      openingDate.value = props.formData.openingDate
    } else {
      name.value = props.formData.name
      cpf.value = props.formData.cpf
      birthDate.value = props.formData.birthDate
    }

    phone.value = props.formData.phone
  })
</script>

<style scoped>
  .current-step-conteiner {
    margin-bottom: 0.25rem;
  }

  .current-step {
    color: var(--orange-500);
  }

  .form-title {
    margin-bottom: 1rem;
  }

  .entity-container input {
    margin-right: 0.25rem;
    cursor: pointer;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
</style>
