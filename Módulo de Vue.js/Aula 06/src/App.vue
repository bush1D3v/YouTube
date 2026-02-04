<script setup>
import CarrinhoComputedWatch from "./views/CarrinhoComputedWatch.vue";
</script>

<template>
  <div class="container">
    <header class="row" style="justify-content: space-between; margin-bottom: 14px;">
      <div>
        <h1 style="margin: 0;">Aula 06 — Computed + Watch</h1>
        <p class="muted" style="margin: 6px 0 0;">
          Carrinho simples + filtro de lista + alerta reativo
        </p>
      </div>
    </header>

    <CarrinhoComputedWatch />
  </div>
</template>
