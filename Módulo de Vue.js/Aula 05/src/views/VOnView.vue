<template>
  <section class="card">
    <h2><code>v-on</code> (shorthand <code>@</code>) — eventos do DOM</h2>
    <p class="muted">
      Você liga eventos do HTML pra funções no seu script. Aqui tem <code>@click</code>,
      <code>@submit.prevent</code> e <code>@keyup.enter</code>.
    </p>

    <hr class="sep" />

    <div class="row">
      <button class="btn" @click="count++">Cliquei! +1</button>
      <button class="btn" @click="count = 0">Reset</button>
      <span class="badge">count: {{ count }}</span>
    </div>

    <form class="form" @submit.prevent="send">
      <input
        class="input"
        v-model="message"
        placeholder="Digite uma mensagem e aperte Enter…"
        @keyup.enter="send"
      />
      <button class="btn" type="submit">Enviar</button>
    </form>

    <div class="panel" v-if="lastSent">
      <p style="margin: 0 0 6px;"><strong>Último envio:</strong></p>
      <p class="muted" style="margin: 0;">{{ lastSent }}</p>
    </div>

    <p class="muted" style="margin-top: 12px;">
      Repara no <code>.prevent</code>: ele evita o refresh do form.
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('')
const lastSent = ref('')

function send() {
  const text = message.value.trim()
  if (!text) return
  lastSent.value = text
  message.value = ''
}
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.form { margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap; }
.panel {
  margin-top: 14px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.10);
}
</style>
