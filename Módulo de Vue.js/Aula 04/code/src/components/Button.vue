<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0)

function increment() {
    count.value++;
}
</script>

<template>
    <button class="count-btn" aria-label="Botão Contador" title="Botão Contador" @click="increment" >
        Cliquei {{ count }} vezes
    </button>
</template>

<style lang="css" scoped>
.count-btn {
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    background: #13dcee;
}
</style>
