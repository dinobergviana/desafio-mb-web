<template>
  <section>
    <div class="current-step-conteiner">
      <span>Etapa </span><span class="current-step">4</span><span> de 4</span>
    </div>

    <h1 class="form-title">Revise suas informações</h1>

    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="input-control">
        <label for="email">Endereço de e-mail</label>
        <input :value="formData.email" type="email" id="email" disabled />
      </div>
      
      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Razão social" : "Nome" }}</label>
        <input :value="formData.legalName" v-if="isLegalPerson" type="legal-name" id="legal-name" disabled />
        <input :value="formData.name" v-else type="name" id="name" disabled />
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "CNPJ" : "CPF" }}</label>
        <input :value="formData.cnpj" v-if="isLegalPerson" type="cnpj" id="cnpj" disabled />
        <input :value="formData.cpf" v-else type="cpf" id="cpf" disabled />
      </div>

      <div class="input-control">
        <label for="name">{{ isLegalPerson ? "Data de abertura" : "Data de nascimento" }}</label>
        <input :value="formData.openingDate" v-if="isLegalPerson" type="opening-date" id="opening-date" disabled />
        <input :value="formData.birthDate" v-else type="birth-date" id="birth-date" disabled />
      </div>

      <div class="input-control">
        <label for="name">Telefone</label>
        <input :value="formData.phone" type="phone" id="phone" disabled />
      </div>

      <div class="input-control">
        <label for="email">Senha</label>
        <input :value="formData.password" :type="seePassword ? 'text' : 'password'" id="password" disabled />
        <button type="button" class="see-password" @click="handleSeePassword">visualizar</button>
      </div>

      <div class="form-actions">
        <button class="btn-secondary" type="button" @click="emitPreviousStep">
          Voltar
        </button>

        <button class="btn-primary" type="submit">
          Cadastrar
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

  const emit = defineEmits(["previous-step"])

  const seePassword = ref(false)

  const isLegalPerson = computed(() => {
    return props.formData.entity === "2"
  })

  function emitPreviousStep() {
    emit("previous-step", props.formData.currentStep - 1)
    props.formData.currentStep -= 1
  }

  function handleSubmit() {
    // VALIDAR FORMULÁRIO
    // SE TUDO TIVER OK, IR PARA O PROXIMO PASSO
  }

  function handleSeePassword() {
    seePassword.value = !seePassword.value
  }

  onMounted(() => {
    //
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
