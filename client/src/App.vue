<template>
  <main class="container">
    <component
      :is="steps[currentStep]"
      :form-data="formData"
      @previous-step="previousStep"
      @next-step="nextStep"
    />
  </main>
</template>

<script setup>
  import { reactive, ref } from "vue";
  
  import StepOne from "./components/wizard/StepOne.vue"
  import StepTwo from "./components/wizard/StepTwo.vue"
  import StepThree from "./components/wizard/StepThree.vue"
  import StepFour from "./components/wizard/StepFour.vue"
  import StepFive from "./components/wizard/StepFive.vue"

  const steps = [
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  ]

  const currentStep = ref(0)

  const formData = reactive({
    currentStep: 0,
    email: "",
    entity: "",
    name: "",
    cpf: "",
    birthDate: "",
    legalName: "",
    cnpj: "",
    openingDate: "",
    phone: "",
    password: ""
  })

  function previousStep(step) {
    currentStep.value = step
  }

  function nextStep(step) {
    currentStep.value = step
  }

</script>

<style scoped>
  .container {
    width: min(90vw, 300px);
    padding: 1rem;
    margin: 0 auto;
  }
</style>
