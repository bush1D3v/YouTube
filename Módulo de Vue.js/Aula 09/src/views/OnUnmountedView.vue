<script setup>
import { onMounted, onUnmounted } from 'vue'

function handleResize() {
  console.log('Largura atual:', window.innerWidth)
}

onMounted(() => {
    console.log("Adicionando listener");
  window.addEventListener('resize', handleResize)
    console.log("Listener adicionado");

})

onUnmounted(() => {
    console.log("Removendo listener");
  window.removeEventListener('resize', handleResize)
    console.log("Listener removido");
})
</script>

<template>
  <h2>onUnmounted – Listener de resize</h2>
  <p>Abra o console e redimensione a janela para ver o hook em ação.</p>
  <p>Ao sair desta rota, o listener é removido com <code>onUnmounted</code>.</p>
</template>
