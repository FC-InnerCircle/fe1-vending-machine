<template>
  <div class="flex w-full gap-2">
    <input 
      type="number" 
      v-model="money" 
      class="flex-auto p-2 text-black bg-white border rounded focus:outline-none focus:ring focus:border-blue-300" 
      min="0" 
      placeholder="자판기에 돈을 투입해 주세요."
      @input="handleInput"
      @keypress="handleKeypress"
    />
    <div class="flex space-x-2">
      <button 
        class="w-1/2 p-2 text-white bg-blue-500 rounded hover:bg-green-600" 
        @click="insertMoney"
      >
        투입
      </button>
      <button 
        class="w-1/2 p-2 text-white rounded bg-slate-500 hover:bg-red-600" 
        @click="returnMoney"
      >
        반환
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const money = ref(0)

const emit = defineEmits(['insert', 'return'])

const handleInput = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, '')
  money.value = parseInt(value) || 0
}

const insertMoney = () => {
  if (money.value > 0) {
    emit('insert', money.value)
    money.value = 0
  }
}

const handleKeypress = (event) => {
  if (event.key === 'Enter') {
    insertMoney()
  }
}

const returnMoney = () => {
  emit('return')
}
</script>