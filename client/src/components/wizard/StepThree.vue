<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">3</span><span> de 4</span>
    </div>

    <h1 class="form-title">Senha de acesso</h1>

    <Form class="form-container" @submit="handleSaveData" :validation-schema="schema">
      <PasswordInput
        v-model="password"
        label="Senha"
        name="password"
        id="password"
      />

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
  import { Form } from "vee-validate"
  import { useStepThreeForm } from './composables/useStepThreeForm.js'

  import PasswordInput from "../PasswordInput.vue"

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(["previous-step", "next-step"])
  
  const {
    password,
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
</style>
