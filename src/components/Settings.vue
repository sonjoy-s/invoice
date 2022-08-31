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
    <div>
      <div v-for="(item, index) in settings.items" class="settings-group" :key="item.id">
        <label>Item {{ index + 1 }}:</label>
        <input v-model="item.title" type="text" placeholder="description" />
        <input v-model="item.amount" type="number" placeholder="price" />
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
import {reactive} from "vue";

const settings = reactive({
  number: "",
  date: "",
  billedTo: "",
  billedFrom: "",
  items: [
    {
      id: "xw9g",
      title: "",
      amount: 0,
    },
    {
      id: "dr2c",
      title: "",
      amount: 0,
    }
  ],
  note: "",
  signature: ""
});
</script>
