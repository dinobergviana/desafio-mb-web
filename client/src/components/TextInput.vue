<template>
  <div class="input-control">
    <label :for="id">{{ label }}</label>

    <Field
      :id="id"
      :name="name"
      :as="'input'"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="localValue"
    />

    <div v-if="showErrorMessage" class="error-message">
      <ErrorMessage :name="name" />
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  id: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  showErrorMessage: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
