<template>
  <section class="card">
    <h2><code>v-bind</code> (shorthand <code>:</code>) — ligando atributos ao estado</h2>
    <p class="muted">
      Aqui a gente vai bindar <code>class</code>, <code>style</code> e <code>disabled</code>.
      Tudo isso muda só mexendo em estado.
    </p>

    <hr class="sep" />

    <div class="row">
      <button class="btn" @click="danger = !danger">
        Alternar tema: {{ danger ? 'danger' : 'safe' }}
      </button>

      <button class="btn" @click="progress = Math.min(progress + 10, 100)">+10%</button>
      <button class="btn" @click="progress = Math.max(progress - 10, 0)">-10%</button>

      <span class="badge">progress: {{ progress }}%</span>
    </div>

    <div class="box" :class="{ danger, safe: !danger }">
      <p style="margin: 0 0 10px;"><strong>Caixa com classe dinâmica</strong></p>

      <div class="barWrap">
        <div class="bar" :style="{ width: progress + '%' }"></div>
      </div>

      <p class="muted" style="margin: 10px 0 0;">
        Barra com <code>:style</code> (width = {{ progress }}%).
      </p>
    </div>

    <div class="row" style="margin-top: 14px;">
      <button class="btn" :disabled="progress < 100" @click="alertDone">
        Finalizar (só libera com 100%)
      </button>
      <span class="muted">Exemplo de <code>:disabled</code>.</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const danger = ref(false)
const progress = ref(40)

function alertDone() {
  alert('Fechou! Chegou em 100%.')
}
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.box {
  margin-top: 14px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.05);
}
.safe { outline: 2px solid rgba(55, 255, 0, 0.25); }
.danger { outline: 2px solid rgba(255, 60, 60, .28); }

.barWrap {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.18);
}
.bar {
  height: 100%;
  background: rgba(0, 153, 255, .75);
}
button:disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>
