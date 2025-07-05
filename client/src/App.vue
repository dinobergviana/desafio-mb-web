<template>
  <main class="container">
    <StepFour :form-data="formData" @next="handleNextStep" />
  </main>
</template>

<script setup>
  import { reactive } from 'vue';
  
  import StepOne from './components/wizard/StepOne.vue'
  import StepTwo from './components/wizard/StepTwo.vue'
  import StepThree from './components/wizard/StepThree.vue'
  import StepFour from './components/wizard/StepFour.vue'
  import StepFive from './components/wizard/StepFive.vue'

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
