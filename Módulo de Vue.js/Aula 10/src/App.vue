<script setup>
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #1a1a1a;
}

nav a {
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-active {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>
