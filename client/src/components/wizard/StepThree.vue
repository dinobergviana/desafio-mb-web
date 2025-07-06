<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">3</span><span> de 4</span>
    </div>

    <h1 class="form-title">Senha de acesso</h1>

    <Form class="form-container" @submit="handleSaveData" :validation-schema="schema">
      <div class="input-control">
        <label for="email">Sua senha</label>
        <Field v-model="password" :type="seePassword ? 'text' : 'password'" id="password" name="password" />
        <button type="button" class="see-password" @click="handleSeePassword">visualizar</button>

        <div class="error-message">
          <ErrorMessage name="password" />
        </div>
      </div>

      <div class="form-actions">
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
  import { onMounted, ref } from "vue"

  import { Form, Field, ErrorMessage } from "vee-validate"
  import * as yup from "yup"

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const schema = yup.object({
    password: yup.string().required("Campo obrigatório").min(6, "A senha deve conter pelo menos 6 caracteres."),
  })
  
  const emit = defineEmits(["previous-step", "next-step"])
  
  const password = ref("")
  const seePassword = ref(false)

  function emitNextStep() {
    emit("next-step", props.formData.currentStep + 1)
    props.formData.currentStep += 1
  }

  function emitPreviousStep() {
    emit("previous-step", props.formData.currentStep - 1)
    props.formData.currentStep -= 1
  }

  function handleSaveData() {
    props.formData.password = password.value
    emitNextStep()
  }

  function handleSeePassword() {
    seePassword.value = !seePassword.value
  }

  onMounted(() => {
    password.value = props.formData.password
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

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .see-password {
    background: transparent;
    border: 0;
    position: absolute;
    right: 0;
    top: 0.25rem;
  }
</style>
