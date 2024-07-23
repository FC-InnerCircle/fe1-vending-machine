<template>
  <button 
    :class="['item', 'bg-blue-200', 'p-4', 'rounded', 'hover:bg-blue-300', 'active:bg-blue-400']" 
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['purchase']);

const handleClick = () => {
  emit('purchase', props.price, props.label);
};
</script>