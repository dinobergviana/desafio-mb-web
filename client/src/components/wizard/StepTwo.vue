<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">2</span><span> de 4</span>
    </div>

    <h1 class="form-title">{{ isLegalPerson ? "Pessoa jurídica" : "Pessoa física" }}</h1>

    <form class="form-container" @submit.prevent="handleSaveDate">
      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Razão social" : "Nome" }}</label>
        <input v-model="legalName" v-if="isLegalPerson" type="legal-name" id="legal-name" required />
        <input v-model="name" v-else type="name" id="name" required />
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "CNPJ" : "CPF" }}</label>
        <input v-model="cnpj" v-if="isLegalPerson" type="cnpj" id="cnpj" required />
        <input v-model="cpf" v-else type="cpf" id="cpf" required />
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Data de abertura" : "Data de nascimento" }}</label>
        <input v-model="openingDate"  v-if="isLegalPerson" type="opening-date" id="opening-date" required />
        <input v-model="birthDate" v-else type="birth-date" id="birth-date" required />
      </div>

      <div class="input-control">
        <label for="name">Telefone</label>
        <input v-model="phone" type="phone" id="phone" required />
      </div>

      <div class="form-actions">
        <button class="btn-secondary" type="button" @click="emitPreviousStep">
          Voltar
        </button>

        <button class="btn-primary" type="submit">
          Continuar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';

  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(["previous-step", "next-step"])

  const name = ref("")
  const cpf = ref("")
  const birthDate = ref("")
  const legalName = ref("")
  const cnpj = ref("")
  const openingDate = ref("")
  const phone = ref("")

  const isLegalPerson = computed(() => {
    return props.formData.entity === "2"
  })

  function emitNextStep() {
    emit("next-step", props.formData.currentStep + 1)
    props.formData.currentStep += 1
  }

  function emitPreviousStep() {
    emit("previous-step", props.formData.currentStep - 1)
    props.formData.currentStep -= 1
  }

  function handleSaveDate() {
    if (isLegalPerson.value) {
      props.formData.legalName = legalName.value
      props.formData.cnpj = cnpj.value
      props.formData.openingDate = openingDate.value
    } else {
      props.formData.name = name.value
      props.formData.cpf = cpf.value
      props.formData.birthDate = birthDate.value
    }

    props.formData.phone = phone.value

    emitNextStep()
  }

  onMounted(() => {
    if (isLegalPerson.value) {
      legalName.value = props.formData.legalName
      cnpj.value = props.formData.cnpj
      openingDate.value = props.formData.openingDate
    } else {
      name.value = props.formData.name
      cpf.value = props.formData.cpf
      birthDate.value = props.formData.birthDate
    }

    phone.value = props.formData.phone
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

  .entity-container input {
    margin-right: 0.25rem;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
</style>
