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
      <div class="settings-item-group mb-3">
        <div v-for="(item, index) in settings.items" :key="item.id" class="field">
          <label class="label">Item {{ index + 1 }}:</label>
          <div class="control">
            <div class="is-flex">
              <input v-model="item.title" type="text" class="input mr-2" placeholder="description"/>
              <input v-model="item.amount" type="number" class="input amount" placeholder="price"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
      <label class="label">Note:</label>
      <div class="control">
        <textarea v-model="settings.note" class="textarea" placeholder="note here"></textarea>
      </div>
    </div>
      <div class="field field__file">
        <label class="label">Signature:</label>
        <div class="is-flex">
          <img
            v-if="settings.signature.data"
            :src="settings.signature.data"
            :width="settings.signature.width"
            :height="settings.signature.height" alt="signature"
            class="mr-3"
          />
          <div class="file-upload">
            <label>
              <span class="button is-primary is-small">Upload signature</span>
              <input id="imgFile" type="file" accept="image/*" />
            </label>
          </div>
        </div>
      </div>
      <hr>
      <div>
        <span class="label">Invoice</span>
        <div class="is-flex">
          <div class="file-upload mr-3">
            <label>
              <span class="button is-primary is-small">Load JSON</span>
              <input id="jsonFile" type="file" accept="application/json" />
            </label>
          </div>
          <button @click="saveJson" class="button is-info is-small">Save JSON</button>
        </div>
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

function loadFile(ev) {
  if (!ev) {
    return;
  }

  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {
    const data = JSON.parse(evt.target.result as string);

    Object.keys(data).map(key => {
      settings[key] = data[key];
    });
  });

  FR.readAsText(ev.target.files[0]);
}

function saveJson() {
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(settings)], {type: "application/json"});

  a.href = URL.createObjectURL(file);
  a.download = "invoice";
  a.click();
}

onMounted(function () {
  document.querySelector("#imgFile").addEventListener("change", readFile);
  document.querySelector("#jsonFile").addEventListener("change", loadFile);
});
</script>

<style>
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

.amount {
  width: 80px;
}

.file-upload label {
  position: relative;
}

.file-upload span {}
.file-upload input {
  visibility: hidden;
  position: absolute;
}
</style>
