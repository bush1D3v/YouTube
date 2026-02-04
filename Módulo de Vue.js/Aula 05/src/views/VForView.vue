<template>
  <section class="card">
    <h2><code>v-for</code> — renderizando listas + <code>:key</code></h2>
    <p class="muted">
      O Vue repete um template para cada item da lista. E aqui é regra:
      <strong>sempre use <code>:key</code></strong> com algo estável (id).
    </p>

    <hr class="sep" />

    <div class="row">
      <input class="input" v-model="newName" placeholder="Nome do aluno" />
      <button class="btn" @click="add">Adicionar</button>
      <span class="badge">Total: {{ students.length }}</span>
    </div>

    <ul class="list">
      <li v-for="s in students" :key="s.id" class="item">
        <div class="left">
          <strong>{{ s.name }}</strong>
          <span class="muted">#{{ s.id }}</span>
        </div>
        <button class="btn" @click="remove(s.id)">Remover</button>
      </li>
    </ul>

    <p class="muted" v-if="students.length === 0" style="margin-top: 12px;">
      Lista vazia. Adiciona alguém aí 😄
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const newName = ref('')
const students = ref([
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
  { id: 3, name: 'Carla' },
])

function add() {
  const name = newName.value.trim()
  if (!name) return
  const nextId = (students.value.at(-1)?.id ?? 0) + 1
  students.value.push({ id: nextId, name })
  newName.value = ''
}

function remove(id) {
  students.value = students.value.filter(s => s.id !== id)
}
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.list { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 10px; }
.item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 14px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.10);
}
.left { display: flex; gap: 10px; align-items: baseline; }
</style>
