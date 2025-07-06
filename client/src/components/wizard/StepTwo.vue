<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">2</span><span> de 4</span>
    </div>

    <h1 class="form-title">{{ isLegalPerson ? "Pessoa jurídica" : "Pessoa física" }}</h1>

    <Form class="form-container" @submit="handleSaveData" :validation-schema="schema">
      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Razão social" : "Nome" }}</label>
        <Field v-model="legalName" v-if="isLegalPerson" id="legal-name" name="legalName" placeholder="Conforme documento oficial" />
        <Field v-model="name" v-else id="name" name="name" placeholder="Conforme documento oficial" />

        <div v-if="isLegalPerson" class="error-message">
          <ErrorMessage name="legalName" />
        </div>

        <div v-else class="error-message">
          <ErrorMessage name="name" />
        </div>
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "CNPJ" : "CPF" }}</label>
        <Field v-model="cnpj" v-if="isLegalPerson" id="cnpj" name="cnpj" placeholder="Apenas números ou com pontuação" />
        <Field v-model="cpf" v-else id="cpf" name="cpf" placeholder="Apenas números ou com pontuação" />
      
        <div v-if="isLegalPerson" class="error-message">
          <ErrorMessage name="cnpj" />
        </div>

        <div v-else class="error-message">
          <ErrorMessage name="cpf" />
        </div>
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Data de abertura" : "Data de nascimento" }}</label>
        <Field v-model="openingDate" v-if="isLegalPerson" id="opening-date" name="openingDate" placeholder="##/##/####" />
        <Field v-model="birthDate" v-else id="birth-date" name="birthDate" placeholder="##/##/####" />
      
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
        <button class="btn-secondary" type="button" @click="handlePreviousStep">
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
  import { onMounted } from "vue"
  import { Form, Field, ErrorMessage } from "vee-validate"
  
  import stepTwoSchema from "./form-schemas/step-two-schema"

  import { useStepTwoForm } from "./composables/useStepTwoForm.js"

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(["previous-step", "next-step"])

  const {
    name,
    cpf,
    birthDate,
    legalName,
    cnpj,
    openingDate,
    phone,
    isLegalPerson,
    schema,
    initialize,
    handleSaveData,
    handlePreviousStep
  } = useStepTwoForm(props.formData, emit, stepTwoSchema)

  onMounted(() => {
    initialize()
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
