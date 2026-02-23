<template>
  <section class="card">
    <h2><code>v-for</code> — renderizando listas + <code>:key</code></h2>
    <p class="muted">
      O Vue repete um template para cada item da lista. E aqui é regra:
      <strong>sempre use <code>:key</code></strong> com algo estável (id).
    </p>

    <hr class="sep" />

    <div class="row">
      <Input :placeholder="'Nome do aluno'" :model-value="newNameInputAddButton" @update:modelValue="newNameInputAddButton = $event" />
      <Button :method="() => add('Botão de adicionar')">
        Adicionar
      </Button>
      <span class="badge">Total: {{ students.length }}</span>
    </div>

    <ul class="list">
      <li v-for="s in students" :key="s.id" class="item">
        <div class="left">
          <strong>{{ s.name }}</strong>
          <span class="muted">#{{ s.id }}</span>
        </div>
        <Button :method="() => remove(s.id)">
          Remover
        </Button>
      </li>
    </ul>

    <form @submit.prevent="add('Form com submit')">
      <Input type="text" :model-value="newNameInputForm" :placeholder="'Nome do aluno'" @update:modelValue="newNameInputForm = $event" />
    </form>

    <p class="muted" v-if="students.length === 0" style="margin-top: 12px;">
      Lista vazia. Adiciona alguém aí 😄
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Input from '../components/Input/Input.vue'
import Button from '../components/Button.vue'

// Estados Reativos

const newNameInputAddButton = ref('')
const newNameInputForm = ref('')
const students = ref([
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
  { id: 3, name: 'Carla' },
])

// Métodos

function add(root) {
  console.log("Método add acionado " + root);
  const name = root === 'Form com submit' ? newNameInputForm.value.trim() : newNameInputAddButton.value.trim()
  if (!name) return
  const nextId = (students.value.at(-1)?.id ?? 0) + 1
  students.value.push({ id: nextId, name })
  newNameInputAddButton.value = ''
  newNameInputForm.value = ''
}

function remove(id) {
  console.log("Método remove acionado");
  students.value = students.value.filter(s => s.id !== id)
}
</script>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
.list { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 10px; margin-bottom: 10px; }
.item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 14px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.10);
}
.left { display: flex; gap: 10px; align-items: baseline; }
</style>
