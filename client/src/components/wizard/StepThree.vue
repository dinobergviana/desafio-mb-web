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
        <button type="button" class="see-password" @click="toggleSeePassword">{{ seePassword ? 'esconder' : 'visualizar' }}</button>

        <div class="error-message">
          <ErrorMessage name="password" />
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
  import { useStepThreeForm } from './composables/useStepThreeForm.js'

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(["previous-step", "next-step"])
  
  const {
    password,
    seePassword,
    schema,
    initialize,
    handleSaveData,
    handlePreviousStep,
    toggleSeePassword
  } = useStepThreeForm(props.formData, emit)

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

  .actions {
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
