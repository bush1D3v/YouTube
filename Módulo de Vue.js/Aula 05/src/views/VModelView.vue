<template>
  <section class="card">
    <h2><code>v-model</code> — input ↔ estado (two-way binding)</h2>
    <p class="muted">
      Tudo que você digita vai pro estado, e o estado volta pro input automaticamente.
      Aqui vamos usar <code>input</code>, <code>select</code> e <code>checkbox</code>.
    </p>

    <hr class="sep" />

    <div class="grid">
      <label class="field">
        <span class="label">Nome</span>
        <input class="input" v-model="name" placeholder="Ex: Erackson" />
      </label>

      <label class="field">
        <span class="label">Stack</span>
        <select class="input" v-model="stack">
          <option value="vue">Vue</option>
          <option value="react">React</option>
          <option value="node">Node</option>
        </select>
      </label>

      <label class="field inline">
        <input type="checkbox" v-model="newsletter" />
        <span class="label">Receber newsletter</span>
      </label>
    </div>

    <div class="preview">
      <p style="margin: 0 0 6px;"><strong>Preview do estado:</strong></p>
      <pre>{{ statePreview }}</pre>
    </div>

    <p class="muted" style="margin-top: 10px;">
      Dica: no template, o Vue faz “unwrapping”, então você não precisa de <code>.value</code>.
    </p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const name = ref('')
const stack = ref('vue')
const newsletter = ref(true)

const statePreview = computed(() =>
  JSON.stringify({ name: name.value, stack: stack.value, newsletter: newsletter.value }, null, 2)
)
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.grid {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
}
.field { display: grid; gap: 6px; }
.field.inline { display: flex; align-items: center; gap: 10px; }
.label { font-size: 14px; opacity: .9; }
.preview {
  margin-top: 14px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(0,0,0,.18);
}
pre { margin: 0; white-space: pre-wrap; }
</style>
