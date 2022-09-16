<template>
  <div class="settings-cols">
    <div class="settings-col">
      <div class="field">
        <label class="label">Invoice number</label>
        <div class="control">
          <input
            v-model="state.settings.number"
            class="input is-small"
            type="text"
            placeholder="invoice-082022"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Invoice date</label>
        <div class="control">
          <input
            v-model="state.settings.date"
            class="input is-small"
            type="date"
            placeholder="xx-number"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Billed to</label>
        <div class="control">
          <textarea
            v-model="state.settings.billedTo"
            class="textarea is-small"
            placeholder="Name & address"
          ></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Billed from</label>
        <div class="control">
          <textarea
            v-model="state.settings.billedFrom"
            class="textarea is-small"
            placeholder="Name & address"
          ></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Note</label>
        <div class="control">
          <textarea
            v-model="state.settings.note"
            class="textarea is-small"
            placeholder="note here"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="settings-col">
      <div class="settings-item-group mb-3">
        <div
          v-for="(item, index) in state.settings.items"
          :key="item.id"
          class="field"
        >
          <label
            class="label is-flex is-align-content-center is-justify-content-space-between"
          >
            <span>Item [{{ index + 1 }}]</span>
            <span
              v-if="state.settings.items.length > 1"
              class="remove"
              @click="removeItem(index)"
            >
              <MinusIcon />
            </span>
          </label>
          <div class="control">
            <div class="is-flex">
              <input
                v-model="item.title"
                type="text"
                class="input is-small mr-2"
                placeholder="description"
              />
              <input
                v-model="item.amount"
                type="number"
                class="input is-small amount"
                placeholder="price"
              />
            </div>
          </div>
        </div>
        <button class="button is-small is-info" @click="addItem">
          <PlusIcon />
          <span>New item</span>
        </button>
      </div>
      <div class="field field__file">
        <label class="label">Signature</label>
        <div v-if="state.settings.signature.data" class="is-flex mb-3">
          <img
            :src="state.settings.signature.data"
            :width="state.settings.signature.width"
            :height="state.settings.signature.height"
            alt="signature"
            class="mr-3"
          />
        </div>
        <div class="is-flex">
          <div class="file-upload">
            <label>
              <span class="button is-info is-light is-small">
                <UploadIcon />
                <span>Upload</span>
              </span>
              <input
                id="imgFile"
                type="file"
                accept="image/*"
                @change="uploadSignature"
              />
            </label>
            <button
              v-if="state.settings.signature.data"
              class="button is-danger is-light is-small ml-3"
              @click="removeSignature"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div v-for="field in templateFields" class="field field__file">
        <label class="label">{{ field.label }}</label>
        <div class="control">
          <input
            v-model="field.value"
            type="color"
            class="input is-small"
            placeholder="background color"
          />
        </div>
      </div>
      <hr />
      <div>
        <div class="tabs">
          <ul>
            <li :class="{ 'is-active': tab === 'pdf' }">
              <a @click="tab = 'pdf'">PDF</a>
            </li>
            <li :class="{ 'is-active': tab === 'localStorage' }">
              <a @click="tab = 'localStorage'">LocalStorage</a>
            </li>
            <li :class="{ 'is-active': tab === 'json' }" @click="tab = 'json'">
              <a>JSON</a>
            </li>
          </ul>
        </div>
        <div v-if="tab === 'pdf'" class="tab-content">
          <button class="button is-primary is-small" @click="download">
            <DownloadIcon />
            <span>Download invoice</span>
          </button>
          <button class="button is-danger is-light is-small ml-3" @click="resetSettings">
            Reset
          </button>
        </div>
        <div v-if="tab === 'localStorage'" class="tab-content">
          <button class="button is-info is-small mr-3">Open</button>
          <button class="button is-info is-light is-small">Save</button>
        </div>
        <div v-if="tab === 'json'" class="tab-content">
          <div class="is-flex mb-3">
            <div class="file-upload mr-3">
              <label>
                <span class="button is-info is-small">Import</span>
                <input
                  id="jsonFile"
                  type="file"
                  accept="application/json"
                  @change="loadFile"
                />
              </label>
            </div>
            <button class="button is-info is-light is-small" @click="saveJson">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import state from "../compositions/settings.js";
import { resetSettings } from "../compositions/settings.js";
import PlusIcon from "./icons/PlusIcon.vue";
import MinusIcon from "./icons/MinusIcon.vue";
import DownloadIcon from "./icons/DownloadIcon.vue";
import UploadIcon from "./icons/UploadIcon.vue";
import {TDocumentDefinitions} from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const templateFields = computed(function () {
  const fields = [];

  Object.keys(state.settings.templateSettings).forEach(key => {
    fields.push(state.settings.templateSettings[key]);
  });

  return fields;
})

/*
 * Refs
 */
const tab = ref<"pdf" | "localStorage" | "json">("pdf");

function uploadSignature(ev) {
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

    state.settings.signature.height = height;
    state.settings.signature.width = width;
    state.settings.signature.data = canvas.toDataURL();
  };

  FR.addEventListener("load", function (evt) {
    image.src = evt.target.result as string;
  });

  FR.readAsDataURL(ev.target.files[0]);
}

function removeSignature() {
  state.settings.signature.height = 0;
  state.settings.signature.width = 0;
  state.settings.signature.data = null;
}

function loadFile(ev) {
  if (!ev) {
    return;
  }

  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {
    const data = JSON.parse(evt.target.result as string);

    Object.keys(data).map((key) => {
      state.settings[key] = data[key];
    });
  });

  FR.readAsText(ev.target.files[0]);
}

function saveJson() {
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(state.settings)], {
    type: "application/json",
  });

  a.href = URL.createObjectURL(file);
  a.download = "invoice";
  a.click();
}

function download() {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        svg: document.getElementById("iframeContainer").innerHTML,
      },
    ],
    pageSize: {
      width: 595,
      height: 842,
    },
    pageMargins: [0, 0, 0, 0],
  };

  pdfMake.createPdf(docDefinition).download("invoice");
}

function addItem() {
  state.settings.items.push({
    id: Math.random().toString(36).slice(2, 7),
    title: "Item",
    amount: 0,
  });
}

function removeItem(index) {
  state.settings.items.splice(index, 1);
}
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

.file-upload span {
}
.file-upload input {
  visibility: hidden;
  position: absolute;
}

.button svg {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.button.is-primary svg,
.button.is-info svg {
  fill: #fff;
}

.button.is-info.is-light svg {
  fill: #296fa8;
}

.remove {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.remove svg {
  width: 15px;
  height: 15px;
}
</style>
