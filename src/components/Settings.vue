<template>
  <div>
    <div class="settings-group">
      <label>Invoice number:</label>
      <input v-model="settings.number" type="text" placeholder="invoice number here" />
    </div>
    <div class="settings-group">
      <label>Invoice date:</label>
      <input v-model="settings.date" type="date" placeholder="invoice date here" />
    </div>
    <div class="settings-group">
      <label>Billed to:</label>
      <textarea v-model="settings.billedTo" placeholder="Name & address"></textarea>
    </div>
    <div class="settings-group">
      <label>Billed from:</label>
      <textarea v-model="settings.billedFrom" placeholder="Name & address"></textarea>
    </div>
    <div class="settings-item-group">
      <div v-for="(item, index) in settings.items" class="settings-group" :key="item.id">
        <label>Item {{ index + 1 }}:</label>
        <div class="settings-group--inputs">
          <input v-model="item.title" type="text" placeholder="description" />
          <input v-model="item.amount" type="number" placeholder="price" />
        </div>
      </div>
    </div>
    <div class="settings-group">
      <label>Note:</label>
      <textarea v-model="settings.note" placeholder="Name & address"></textarea>
    </div>
    <div class="settings-group">
      <label>Signature:</label>
      <input type="file" accept="image/*" />
    </div>
    <div>
      <button>Load JSON</button>
      <button>Download JSON</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import settings from "../compositions/settings.js";
</script>

<style>
.settings-group {
  margin-bottom: 10px;
}
.settings-group label {
  display: block;
  width: 100%;
}

.settings-group input, .settings-group textarea {
  display: block;
  width: 100%;
  max-width: 100%;
}

.settings-item-group .settings-group label {
  width: 100%;
}

.settings-item-group .settings-group input[type=text] {
  width: 70%;
}

.settings-item-group .settings-group input[type=number] {
  width: 30%;
}

.settings-group--inputs {
  display: flex;
}
</style>
