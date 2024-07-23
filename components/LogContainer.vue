<template>
  <div class="flex-1 w-full p-2 overflow-y-auto border rounded h-44">
    <ul>
      <li v-for="(log, index) in logs" :key="index" class="text-black">{{ log }}</li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useVendingMachineStore } from '@/stores/vendingMachine';

const store = useVendingMachineStore();
const { logs } = storeToRefs(store);
</script>