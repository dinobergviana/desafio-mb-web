<template>
  <button
    :class="variant"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    }
  })

  const emit = defineEmits(['click'])

  const handleClick = (e) => {
    emit('click', e)
  }
</script>
