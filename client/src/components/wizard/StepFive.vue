<template>
  <section class="success-page-container">
    <h1 class="title">Cadastro realizado com sucesso!</h1>

    <div class="actions">
      <button class="btn-primary" type="button" @click="emitGoToFirstStep">Voltar para o início</button>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(["next-step"])

  function emitGoToFirstStep() {
    emit("next-step", 0)
  }
</script>

<style scoped>
  .success-page-container {
    margin-bottom: 0.25rem;
  }

  .success-page-container h1 {
    margin-bottom: 1rem;
  }
</style>
