<template>
  <div class="container">
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

<style lang="css">
.container {
  display: flex;
}
.container .preview {

}

.container .settings {
  width: 300px;
  padding: 10px 30px;
}
</style>
