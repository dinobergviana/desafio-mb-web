<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">1</span><span> de 4</span>
    </div>

    <h1 class="form-title">Seja bem vindo(a)</h1>

    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="input-control">
        <label for="email">Endereço de e-mail</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <div class="legal-entities-container">
        <div class="entity-container">
          <input v-model="entity" type="radio" id="natural-person" name="entity">
          <label for="natural-person">Pessoa física</label>
        </div>

        <div class="entity-container">
          <input v-model="entity" type="radio" id="legal-person" name="entity">
          <label for="legal-person">Pessoa jurídica</label>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit">
          Continuar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
  import { ref } from 'vue';

  const email = ref("")
  const entity = ref("")

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['next'])
  function nextStep() {
    //
  }

  function handleSubmit() {
    console.log(email.value)
    // VALIDAR FORMULÁRIO
    // SE TUDO TIVER OK, IR PARA O PROXIMO PASSO
  }
</script>

<style scoped>
  .form-container {}

  .current-step-conteiner {
    margin-bottom: 0.25rem;
  }

  .current-step {
    color: var(--orange-500);
  }

  .form-title {
    margin-bottom: 1rem;
  }

  .input-control {
    margin-bottom: 1rem;
  }

  .input-control label {
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .input-control input {
    width: 100%;
    height: 32px;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--gray-500);
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

  .form-actions button {
    width: 100%;
    height: 32px;
    border: 0;
    background: var(--orange-300);
    color: var(--white);
    border-radius: 4px;
    transition: 0.2s;
  }

  .form-actions button:active {
    transform: translateY(2px);
  }

  .form-actions button:hover {
    background: var(--orange-500);
  }

  .btn-disabled {
    background: var(--orange-200);
  }
</style>
