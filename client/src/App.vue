<template>
  <main class="container">
    <StepOne :form-data="formData" @next="" />
  </main>
</template>

<script setup>
  import { reactive } from 'vue';
import StepOne from './components/wizard/StepOne.vue'

  const formData = reactive({
    email: ""
  })

  function handleNextStep() {
    console.log(formData)
  }

</script>

<style scoped>
  .container {
    width: min(90vw, 300px);
    padding: 1rem;
    margin: 0 auto;
  }
</style>
