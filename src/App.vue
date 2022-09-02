<template>
  <div class="app-container">
    <div class="preview">
      <Basic />
    </div>
    <div class="settings">
      <Settings />
    </div>
  </div>
</template>

<script setup>
import Basic from "./components/templates/basic.vue";
import Settings from "./components/Settings.vue";
</script>

<style lang="css" scoped>
.app-container {
  display: flex;
}
.app-container .preview {

}

.app-container .settings {
  padding: 10px 0;
}
</style>
