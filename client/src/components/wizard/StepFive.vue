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
    resetFormData()
    emit("next-step", 0)
  }

  function resetFormData() {
    props.formData.currentStep = 0
    props.formData.email = ""
    props.formData.name = ""
    props.formData.cpf = ""
    props.formData.birthDate = ""
    props.formData.isLegalPerson = false,
    props.formData.legalName = ""
    props.formData.cnpj = ""
    props.formData.openingDate = ""
    props.formData.phone = ""
    props.formData.password = ""
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
