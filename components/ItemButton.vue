<template>
 <button 
    :class="['item', 'bg-blue-200', 'p-4', 'rounded', 'hover:bg-blue-300', 'active:bg-blue-400', itemStatus === '잔액부족' ? 'bg-red-300' : '']" 
    @click="handleClick"
    :disabled="itemStatus === '잔액부족'"
  >
    {{ itemStatus === '잔액부족' ? '잔액부족' : label }}
  </button>
</template>

<script setup>
import { useVendingMachineStore } from '@/stores/vendingMachine'

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

const store = useVendingMachineStore()

const handleClick = () => {
  emit('purchase', props.price, props.label);
};

const itemStatus = computed(() => store.itemStatus[props.label] || '')
</script>