<template>
  <div class="app-container">
    <div class="preview">
      <InvocieParser />
    </div>
    <div class="settings">
      <InvoiceSettings />
    </div>
  </div>
</template>

<script setup>
import BasicTemplate from "./components/templates/BasicTemplate.vue";
import InvoiceSettings from "./components/InvoiceSettings.vue";
import InvocieParser from "./components/templates/InvocieParser.vue";
</script>

<style lang="css" scoped>
.app-container {
  display: flex;
}
.app-container .preview {
  width: 595px;
  height: 842px;
}

.app-container .settings {
  padding: 10px 0;
}
</style>
