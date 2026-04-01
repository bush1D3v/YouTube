<template>
  <main class="container">
    <h1>Vue 3 - Diretiva v-for</h1>
    <p class="subtitle">Lista dinamica com add/remove</p>

    <form class="form" @submit.prevent="addTask">
      <input
        v-model.trim="newTask"
        type="text"
        placeholder="Digite uma tarefa"
      />
      <button class="btn" type="submit">Adicionar</button>
    </form>

    <p class="total">Total de tarefas: {{ tasks.length }}</p>

    <ul class="list" v-if="tasks.length">
      <li v-for="task in tasks" :key="task.indice" class="item">
        <p v-for="(value, key) in task" :key="key">
          {{ key.toString().charAt(0).toUpperCase() + key.toString().slice(1) }}: {{ value }}
        </p>
        <button class="remove" @click="removeTask(task.indice)">Remover</button>
      </li>
    </ul>

    <p v-else class="empty">Nenhuma tarefa por enquanto.</p>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const nextId = ref(4)
const tasks = ref([
  { indice: 1, titulo: 'Estudar v-for' },
  { indice: 2, titulo: 'Praticar key unica' },
  { indice: 3, titulo: 'Revisar index e total' },
])

function addTask() {
  if (!newTask.value) return

  tasks.value.push({
    indice: nextId.value++,
    titulo: newTask.value,
  })

  newTask.value = ''
}

function removeTask(indice) {
  tasks.value = tasks.value.filter((task) => task.indice !== indice)
}
</script>

<style scoped>
.container {
  max-width: 760px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.subtitle {
  margin-top: 8px;
  color: #4b5563;
}

.form {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  background: #42b883;
  color: #0f172a;
  font-weight: 700;
  cursor: pointer;
}

.total {
  margin-top: 16px;
  font-weight: 700;
}

.list {
  margin-top: 12px;
  padding-left: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
}

.remove {
  border: none;
  background: #ef4444;
  color: #fff;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.empty {
  margin-top: 12px;
  color: #6b7280;
}
</style>
