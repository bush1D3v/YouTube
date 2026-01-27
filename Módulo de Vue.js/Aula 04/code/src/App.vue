<template>
  <main class="container">
    <h1>Ref vs Reactive no Vue 3 ⚡</h1>
    <p class="subtitle">Reatividade na prática com Composition API</p>

    <!-- BLOCO 1: CONTADOR COM REF -->
    <section class="card">
      <h2>1) Contador com ref()</h2>

      <p>Valor atual: <strong>{{ count }}</strong></p>

      <div class="row">
        <button class="btn" @click="decrement">-</button>
        <button class="btn" @click="increment">+</button>
        <button class="btn outline" @click="reset">Reset</button>
      </div>
    </section>

    <!-- BLOCO 2: FORMULÁRIO COM REACTIVE -->
    <section class="card">
      <h2>2) Formulário com reactive()</h2>

      <form class="form" @submit.prevent="handleSubmit">
        <label class="label">
          Nome
          <input class="input" v-model="form.name" placeholder="Ex: Victor" />
        </label>

        <label class="label">
          Email
          <input class="input" v-model="form.email" placeholder="Ex: dev@email.com" />
        </label>

        <label class="label">
          Aceita termos?
          <input type="checkbox" v-model="form.acceptTerms" />
        </label>

        <button class="btn" type="submit">Enviar</button>
      </form>

      <div class="preview">
        <h3>Preview (reativo)</h3>
        <pre>{{ form }}</pre>
      </div>
    </section>

    <!-- BLOCO 3: EXEMPLO DE REF COM INPUT -->
    <section class="card">
      <h2>3) ref() em input (unwrapping no template)</h2>

      <input class="input" v-model="nickname" placeholder="Digite um apelido..." />
      <p>Você digitou: <strong>{{ nickname }}</strong></p>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

/**
 * ✅ ref: perfeito pra primitivos
 */
const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

/**
 * ✅ reactive: perfeito pra objeto (form)
 */
const form = reactive({
  name: '',
  email: '',
  acceptTerms: false,
})

function handleSubmit() {
  // aqui a gente só prova que está funcionando
  console.log('Form enviado:', { ...form })

  // reset simples
  form.name = ''
  form.email = ''
  form.acceptTerms = false
}

/**
 * ✅ ref em string (também primitivo)
 */
const nickname = ref('')
</script>

<style scoped>
.container {
  max-width: 760px;
  margin: 40px auto;
  padding: 24px;
}

.subtitle {
  opacity: 0.8;
  margin-bottom: 16px;
}

.card {
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  margin-top: 16px;
}

.row {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.form {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.label {
  display: grid;
  gap: 6px;
}

.input {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #42b883;
  color: #0b1220;
  font-weight: 700;
  cursor: pointer;
}

.btn.outline {
  background: transparent;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.preview {
  margin-top: 14px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
}
</style>

