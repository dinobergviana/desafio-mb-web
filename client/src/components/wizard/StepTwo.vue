<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">2</span><span> de 4</span>
    </div>

    <h1 class="form-title">{{ isLegalPerson ? "Pessoa jurídica" : "Pessoa física" }}</h1>

    <Form class="form-container" @submit="handleSaveData" :validation-schema="schema">
      <TextInput 
        v-model="legalName" 
        v-if="isLegalPerson"
        label="Razão social"
        id="legal-name" 
        name="legalName" 
        placeholder="Conforme documento oficial" 
      />

      <TextInput
        v-model="name"
        v-else
        label="Nome"
        id="name"
        name="name" 
        placeholder="Conforme documento oficial"
      />

      <TextInput
        v-model="cnpj" 
        v-if="isLegalPerson"
        label="CNPJ"
        id="cnpj" 
        name="cnpj" 
        placeholder="Apenas números ou com pontuação"
      />

      <TextInput
        v-model="cpf"
        v-else
        label="CPF"
        id="cpf"
        name="cpf"
        placeholder="Apenas números ou com pontuação"
      />

      <TextInput
        v-model="openingDate"
        v-if="isLegalPerson"
        label="Data de abertura"
        id="opening-date"
        name="openingDate"
        placeholder="##/##/####" 
      />

      <TextInput
        v-model="birthDate"
        v-else
        label="Data de nascimento"
        id="birth-date"
        name="birthDate"
        placeholder="##/##/####"
      />

      <PhoneInput
        v-model="phone"
        name="phone"
        label="Telefone"
        placeholder="(99) 99999-9999"
      />

      <div class="actions">
        <Button variant="btn-secondary" type="button" @click="handlePreviousStep">
          Voltar
        </Button>

        <Button variant="btn-primary" type="submit">
          Continuar
        </Button>
      </div>
    </Form>
  </section>
</template>

<script setup>
  import { onMounted } from "vue"
  import { Form } from "vee-validate"
  
  import stepTwoSchema from "./form-schemas/step-two-schema"

  import { useStepTwoForm } from "./composables/useStepTwoForm.js"

  import TextInput from "../TextInput.vue"
  import Button from "../Button.vue"
  import PhoneInput from "../PhoneInput.vue"

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
