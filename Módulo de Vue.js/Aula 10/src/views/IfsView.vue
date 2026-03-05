<template>
  <section>
    <h2>Status de acesso</h2>

    <h1 v-if="role === 'admin'">Painel admin liberado.</h1>
    <h2 v-else-if="role === 'editor'">Area de edicao liberada.</h2>
    <h3 v-else>Modo visitante: acesso limitado.</h3>

    <!-- <h1 v-show="role === 'admin'">Painel admin liberado.</h1>
    <h2 v-show="role === 'editor'">Area de edicao liberada.</h2>
    <h3 v-show="role === 'visitante'">Modo visitante: acesso limitado.</h3> -->

    <button @click="switchRole('admin')">admin</button>
    <button @click="switchRole('editor')">editor</button>
    <button @click="switchRole('visitante')">visitante</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const role = ref('editor')

function switchRole(newRole) {
    role.value = newRole
}
</script>
