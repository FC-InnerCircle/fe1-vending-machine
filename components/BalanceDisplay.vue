<template>
  <div class="py-2 mb-2 text-xl text-center bg-gray-300 rounded">
    {{ balance.toLocaleString() }} 원
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useVendingMachineStore } from '@/stores/vendingMachine'

const store = useVendingMachineStore()
const { balance } = storeToRefs(store)
</script>
