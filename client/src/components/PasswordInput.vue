<template>
  <div class="password-container">
    <TextInput
      v-model="localValue"
      :label="label"
      :id="id"
      :name="name"
      :type="seePassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-error-message="showErrorMessage"
    />

    <button
      type="button"
      class="see-password"
      @click="seePassword = !seePassword"
    >
      {{ seePassword ? "esconder" : "visualizar" }}
    </button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import TextInput from './TextInput.vue'

  const props = defineProps({
    modelValue: String,
    name: { type: String, required: true },
    label: { type: String, default: 'Senha' },
    id: { type: String, default: 'password' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    showErrorMessage: { type: Boolean, default: true }
  })

  const emit = defineEmits(['update:modelValue'])

  const localValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const seePassword = ref(false)
</script>

<style scoped>
.password-container {
  position: relative;
}

.see-password {
  background: transparent;
  border: 0;
  position: absolute;
  right: 0;
  top: 0.25rem;
}
</style>
