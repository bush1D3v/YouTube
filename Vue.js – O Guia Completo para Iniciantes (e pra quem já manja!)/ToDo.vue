<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref('');
const tasks = ref<string[]>([]);

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value.trim());
    newTask.value = '';
  }
}

function removeTask(index: number) {
  tasks.value.splice(index, 1);
}
</script>

<template>
  <div class="todo-container">
    <h1>Minha ToDo List</h1>

    <div class="input-section">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Digite uma nova tarefa" />
      <button @click="addTask">Adicionar</button>
    </div>

    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="removeTask(index)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">
.todo-container {
  max-width: 400px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
