<template>
    <input class="input" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="props.placeholder" />
</template>

<script setup>
import { defineProps } from 'vue'
import './Input.css'

const props = defineProps([
    "modelValue",
    "placeholder"
])
</script>
