<template>
  <section class="card">
    <h2><code>v-if</code> — cria / destrói elementos</h2>
    <p class="muted">
      Quando a condição muda, o Vue <strong>remove do DOM</strong> e <strong>cria de novo</strong> quando voltar.
      Repara que o contador interno zera quando o bloco “some e volta”.
    </p>

    <hr class="sep" />

    <div class="row">
      <button class="btn" @click="show = !show">
        {{ show ? 'Esconder bloco' : 'Mostrar bloco' }}
      </button>
      <span class="badge">show: {{ show }}</span>
    </div>

    <div v-if="show" class="panel">
      <p><strong>Bloco renderizado com v-if ✅</strong></p>
      <p class="muted">Contador interno (some e volta zerando): <strong>{{ innerCount }}</strong></p>
      <button class="btn" @click="innerCount++">+1 no contador interno</button>
    </div>

    <div v-else class="panel off">
      <p><strong>Bloco não existe no DOM ❌</strong></p>
      <p class="muted">Abre o DevTools e olha: ele realmente some do HTML.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
const innerCount = ref(0)
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.panel {
  margin-top: 14px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.10);
}
.off { opacity: .85; }
p { margin: 0 0 10px; }
</style>
