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

      <TextInput
        v-model="formData.legalName"
        v-if="isLegalPerson"
        label="Razão social"
        type="legal-name"
        id="legal-name"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.name"
        v-else
        label="Nome"
        id="name"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.cnpj"
        v-if="isLegalPerson"
        label="CNPJ"
        id="cnpj"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.cpf"
        v-else
        label="CPF"
        id="cpf"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.openingDate"
        v-if="isLegalPerson"
        LABEL="Data de abertura"
        id="opening-date"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.birthDate"
        v-else
        label="Data de nascimento"
        id="birth-date"
        disabled
        :show-error-message="false"
      />

      <TextInput
        v-model="formData.phone"
        label="Telefone"
        id="phone"
        disabled
        :show-error-message="false"
      />

      <PasswordInput
        v-model="formData.password"
        label="Senha"
        name="password"
        id="password"
        disabled
      />

      <div class="actions">
        <button class="btn-secondary" type="button" @click="emitPreviousStep">
          Voltar
        </button>

        <button class="btn-primary" type="submit">Cadastrar</button>
      </div>

      <div v-if="requestFailed">
        <span class="error-message">
          Erro ao tentar salvar os dados. Verifique se os dados estão corretos ou contate o suporte.
        </span>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useStepFourForm } from "./composables/useStepFourForm.js";

import TextInput from "../TextInput.vue";
import PasswordInput from "../PasswordInput.vue";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["previous-step", "next-step"]);

const {
  requestFailed,
  isLegalPerson,
  handleSeePassword,
  handleSubmit,
  emitPreviousStep,
} = useStepFourForm(props.formData, emit);
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

.input-control {
  margin-bottom: 1rem;
}
</style>
