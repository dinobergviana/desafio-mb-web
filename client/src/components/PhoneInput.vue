<template>
  <div class="input-control">
    <label :for="id">{{ label }}</label>

    <Field
      :id="id"
      :name="name"
      :as="'input'"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="localValue"
      class="input"
    />

    <div v-if="showErrorMessage" class="error-message">
      <ErrorMessage :name="name" />
    </div>
  </div>
</template>

<script setup>
  import { Field, ErrorMessage } from 'vee-validate'
  import { watch, ref } from 'vue'

  const props = defineProps({
    modelValue: { type: String, default: '' },
    name: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, default: '(99) 99999-9999' },
    id: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    showErrorMessage: { type: Boolean, default: true }
  })

  const emit = defineEmits(['update:modelValue'])

  const localValue = ref('')

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '')

    if (digits.length <= 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3').trim()
    } else {
      return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3').trim()
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      localValue.value = formatPhone(val || '')
    },
    { immediate: true }
  )

  watch(localValue, (val) => {
    const digits = val.replace(/\D/g, '')
    emit('update:modelValue', digits)
  })
</script>

<style scoped></style>
