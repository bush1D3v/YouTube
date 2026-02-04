<template>
  <div class="app">
    <header class="header">
      <h1>Aula 05 — Diretivas no Vue 3</h1>
      <p class="subtitle">Cada diretiva em uma rota + um arquivo <code>.vue</code> separado.</p>
      <NavBar />
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <small>Feito pra você só dar <code>npm i</code> e <code>npm run dev</code>.</small>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
:root {
  color-scheme: light;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

* { box-sizing: border-box; }
body { margin: 0; background: #0b1020; color: #eaf0ff; }

.app { min-height: 100vh; display: flex; flex-direction: column; }
.header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,.10); background: rgba(255,255,255,.03); }
h1 { margin: 0 0 6px; font-size: 22px; }
.subtitle { margin: 0 0 14px; opacity: .85; }

.main { padding: 20px; flex: 1; max-width: 980px; width: 100%; margin: 0 auto; }
.footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,.10); opacity: .75; }

a { color: inherit; }
code { background: rgba(255,255,255,.08); padding: 2px 6px; border-radius: 6px; }
</style>
