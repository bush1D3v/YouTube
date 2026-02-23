<template>
  <nav class="nav">
    <RouterLink to="/" class="link" active-class="active" exact-active-class="active">Home</RouterLink>
    <RouterLink to="/v-for" class="link" active-class="active">v-for</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.link {
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.08);
}
.link:hover { background: rgba(255,255,255,.10); }
.active {
  background: rgba(0, 153, 255, .22);
  border-color: rgba(0, 153, 255, .45);
}
</style>
