<template>
  <main class="container">
    <h1>DOM x Virtual DOM no Vue 3 🧠</h1>
    <p>
      Contador: <strong>{{ count }}</strong>
    </p>

    <button class="btn" @click="increment">
      Incrementar
    </button>

    <button class="btn secondary" @click="toggle">
      Toggle (mostrar/ocultar)
    </button>

    <section v-if="show" class="card">
      <p>Esse bloco aparece e some sem você mexer no DOM manualmente 😄</p>
    </section>
  </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const show = ref(true)

function increment() {
  count.value++
}

function toggle() {
  show.value = !show.value
}

// Só pra enxergar o ciclo acontecendo
watchEffect(() => {
  console.log('[render] count:', count.value, '| show:', show.value)
})
</script>

<style scoped>
.container {
  max-width: 720px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
}

.btn {
  margin-top: 12px;
  margin-right: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #42b883;
  color: #0b1220;
  font-weight: 700;
  cursor: pointer;
}

.btn.secondary {
  background: #a7f3d0;
}

.card {
  margin-top: 16px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
}
</style>

