<template>
  <div class="app-container">
    <div class="preview">
      <BasicTemplate />
    </div>
    <div class="settings">
      <InvoiceSettings />
    </div>
  </div>
</template>

<script setup>
import BasicTemplate from "./components/templates/BasicTemplate.vue";
import InvoiceSettings from "./components/InvoiceSettings.vue";
</script>

<style lang="css" scoped>
.app-container {
  padding-left: 300px;
}

.app-container .settings {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
