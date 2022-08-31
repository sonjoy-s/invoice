<template>
  <div class="container">
    <div>
      <Basic />
    </div>
    <div>
      <Settings />
    </div>
  </div>
</template>

<script setup>
import Basic from "./components/templates/basic.vue";
import Settings from "./components/Settings.vue";
</script>

<style lang="css">
.container {
  display: flex;
}
.container > div {
  flex: 50%;
}
</style>
