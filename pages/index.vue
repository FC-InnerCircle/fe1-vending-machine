<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="flex flex-row space-x-5">
      <div id="vending-machine" class="p-5 space-y-5 bg-white border-black rounded-lg shadow-lg w-96 h-72 border-1">
        <BalanceDisplay />
        <div class="grid grid-cols-3 gap-2">
          <ItemButton v-for="item in items" :key="item.label" :price="item.price" :label="item.label" @purchase="purchaseItem" />
        </div>
      </div>
      <div id="control-panel" class="flex flex-col p-5 space-y-5 bg-white border-black rounded-lg shadow-lg w-96 h-72 border-1">
        <MoneyInput @insert="insertMoney" @return="returnMoney" />
        <LogContainer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVendingMachineStore } from '@/stores/vendingMachine'

const store = useVendingMachineStore()

const items = [
  { label: 'FE300', price: 300 },
  { label: 'FE400', price: 400 },
  { label: 'FE500', price: 500 },
  { label: 'FE600', price: 600 },
  { label: 'FE700', price: 700 },
  { label: 'FE800', price: 800 },
  { label: 'FE900', price: 900 },
  { label: 'FE1000', price: 1000 },
  { label: 'FE1100', price: 1100 },
]

const insertMoney = (amount) => {
  store.insertMoney(amount)
}

const returnMoney = () => {
  store.returnMoney()
}

const purchaseItem = (price, label) => {
  store.purchaseItem(price, label)
}
</script>