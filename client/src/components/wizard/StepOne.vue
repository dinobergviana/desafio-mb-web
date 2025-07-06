<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">1</span><span> de 4</span>
    </div>

    <h1 class="form-title">Seja bem vindo(a)</h1>

    <Form class="form-container" @submit="handleSaveData" :validation-schema="schema">
      <div class="input-control">
        <label for="email">Endereço de e-mail</label>
        <Field v-model="email" type="email" id="email" name="email" />
        <div class="error-message">
          <ErrorMessage name="email" />
        </div>
      </div>

      <div class="legal-entities-container">
        <div class="entity-container">
          <input v-model="entity" type="radio" id="natural-person" name="entity" :value="1" />
          <label for="natural-person">Pessoa física</label>
        </div>

        <div class="entity-container">
          <input v-model="entity" type="radio" id="legal-person" name="entity" :value="2">
          <label for="legal-person">Pessoa jurídica</label>
        </div>
      </div>

      <div class="actions">
        <button class="btn-primary" type="submit">
          Continuar
        </button>
      </div>
    </Form>
  </section>
</template>

<script setup>
  import { onMounted, ref } from "vue"

  import { Form, Field, ErrorMessage } from "vee-validate"
  import * as yup from "yup"

  const email = ref("")
  const entity = ref(null)

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const schema = yup.object({
    email: yup.string().required("E-mail é um campo obrigatório").email("Informe um e-mail válido"),
  })

  const emit = defineEmits(["next-step"])

  function emitNextStep() {
    emit("next-step", props.formData.currentStep + 1)
    props.formData.currentStep += 1
  }

  function handleSaveData() {
    props.formData.email = email.value
    props.formData.entity = entity.value

    props.formData.isLegalPerson = entity.value === 2 ? true : false

    emitNextStep()
  }

  onMounted(() => {
    email.value = props.formData.email
    entity.value = props.formData.isLegalPerson ? 2 : 1
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

  .legal-entities-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .entity-container input {
    margin-right: 0.25rem;
    cursor: pointer;
  }
</style>
