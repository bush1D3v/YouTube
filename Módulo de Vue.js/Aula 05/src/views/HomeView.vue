<template>
  <section class="card">
    <h2>Como usar esse projeto</h2>
    <p class="muted">
      Aqui cada diretiva tem um componente separado em <code>src/views</code> e é acessada por uma rota.
      Use a barra de navegação acima pra ir testando.
    </p>

    <hr class="sep" />

    <div class="row">
      <span class="badge">Rota</span>
      <code>/v-if</code>
      <code>/v-show</code>
      <code>/v-for</code>
      <code>/v-bind</code>
      <code>/v-model</code>
      <code>/v-on</code>
    </div>

    <p class="muted" style="margin-top: 14px">
      Dica: abre o DevTools e observa o DOM quando alternar <code>v-if</code> e <code>v-show</code>.
    </p>
  </section>
</template>

<style scoped>
@import './_ui.css';
h2 { margin: 0 0 6px; font-size: 18px; }
p { margin: 0; line-height: 1.5; }
</style>
