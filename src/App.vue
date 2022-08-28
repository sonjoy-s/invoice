<template>
  <div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script setup>
import {ref} from "vue";

const message = ref("Welcome");
</script>

<style scoped>
h3 {
  color: brown;
}
</style>
