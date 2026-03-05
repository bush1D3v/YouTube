<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  console.log('DOM atualizado. Novo count:', count.value)
})
</script>

<template>
  <h2>onUpdated – Reatividade no DOM</h2>
  <p>Abra o console e clique no botão para ver o hook em ação.</p>
  <button @click="count++">Incrementar: {{ count }}</button>
</template>
