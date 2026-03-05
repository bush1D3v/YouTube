<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
    posts.value = await response.json()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h2>onMounted – Busca de dados</h2>
  <ul v-if="!loading">
    <li v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
    </li>
  </ul>
  <p v-else>Carregando...</p>
</template>
