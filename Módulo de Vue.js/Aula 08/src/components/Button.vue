<template>
    <button class="btn" @click="props.method">
        <slot></slot>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps([
    "method",
])
</script>

<style lang="css" scoped>
.btn {
  cursor: pointer;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.08);
  color: inherit;
  padding: 10px 12px;
  border-radius: 12px;
}
.btn:hover { background: rgba(255,255,255,.12); }
</style>
