<template>
  <div class="settings-cols">
    <div class="settings-col">
      <div class="field">
        <label class="label">Invoice number</label>
        <div class="control">
          <input v-model="settings.number" class="input" type="text" placeholder="xx-number">
        </div>
      </div>
      <div class="field">
        <label class="label">Invoice date</label>
        <div class="control">
          <input v-model="settings.date" class="input" type="date" placeholder="xx-number">
        </div>
      </div>
      <div class="field">
        <label class="label">Billed to:</label>
        <div class="control">
          <textarea v-model="settings.billedTo" class="textarea" placeholder="Name & address"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Billed from:</label>
        <div class="control">
          <textarea v-model="settings.billedFrom" class="textarea" placeholder="Name & address"></textarea>
        </div>
      </div>
    </div>
    <div class="settings-col">
      <div class="settings-item-group">
        <div v-for="(item, index) in settings.items" class="settings-group" :key="item.id">
          <label>Item {{ index + 1 }}:</label>
          <div class="settings-group--inputs">
            <input v-model="item.title" type="text" placeholder="description"/>
            <input v-model="item.amount" type="number" placeholder="price"/>
          </div>
        </div>
      </div>
      <div class="settings-group">
        <label>Note:</label>
        <textarea v-model="settings.note" placeholder="Name & address"></textarea>
      </div>
      <div class="settings-group">
        <label>Signature:</label>
        <div v-if="settings.signature.data">
          <img alt="signature" :src="settings.signature.data" :width="settings.signature.width" :height="settings.signature.height">
        </div>
        <input id="imgFile" type="file" accept="image/*"/>
      </div>
      <div>
        <button>Load JSON</button>
        <button>Download JSON</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import settings from "../compositions/settings.js";
import {onMounted} from "vue";

function readFile(ev) {
  if (!ev) {
    return;
  }

  const FR = new FileReader();
  const image = new Image();

  image.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const ratio = image.width / image.height;
    const width = 120;
    const height = width / ratio;

    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(image, 0, 0, width, height);

    settings.signature.height = height;
    settings.signature.width = width;
    settings.signature.data = canvas.toDataURL();
  };

  FR.addEventListener("load", function (evt) {
    image.src = evt.target.result as string;
  });

  FR.readAsDataURL(ev.target.files[0]);
}

onMounted(function () {
  document.querySelector("#imgFile").addEventListener("change", readFile);
});
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

.settings-cols {
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
}

.settings-col {
  width: 300px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
