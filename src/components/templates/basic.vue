<template>
  <div class="container">
    <div ref="svgContainer" id="iframeContainer">
      <svg width="595" height="842" viewBox="0 0 595 842" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="595" height="842" fill="white"/>
        <rect width="695" height="100" fill="#D9D9D9"/>
        <rect y="822" width="695" height="20" fill="#D9D9D9"/>
        <text x="20" y="45" fill="#000" alignment-baseline="hanging" font-size="50">INVOICE</text>
        <text x="20" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE NUMBER</text>
        <text x="20" y="135" fill="#000" alignment-baseline="hanging" font-size="10">{{ settings.number }}</text>
        <text x="200" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE DATE</text>
        <text x="200" y="135" fill="#000" alignment-baseline="hanging" font-size="10">{{ settings.date }}</text>
        <text x="20" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED TO</text>
        <text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
          <tspan v-for="line in settings.billedTo.split('\n')" x="20" dy="1.3em">{{ line }}</tspan>
        </text>
        <text x="200" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED FROM</text>
        <text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
          <tspan v-for="line in settings.billedFrom.split('\n')" x="200" dy="1.3em">{{ line }}</tspan>
        </text>

        <text x="20" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">DESCRIPTION</text>
        <text y="280" fill="#000" alignment-baseline="hanging" font-size="10">
          <tspan v-for="item in settings.items" x="20" dy="1.5em">{{ item.title }}</tspan>
        </text>
        <text x="575" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">AMOUNT</text>
        <text y="280" fill="#000" alignment-baseline="hanging" font-size="10" text-anchor="end">
          <tspan v-for="item in settings.items" x="575" dy="1.5em">${{ item.amount || 0 }}</tspan>
        </text>

        <rect x="20" y="545" width="555" height="1" fill="#D9D9D9"/>
        <text x="515" y="555" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">TOTAL</text>
        <text x="575" y="555" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">${{ total }}</text>

        <text x="0" y="600" fill="#000" alignment-baseline="hanging" font-size="10">
          <tspan x="20" dy="1.3em" font-weight="bold">Note</tspan>
          <tspan v-for="line in settings.note.split('\n')" x="20" dy="1.3em">{{ line }}</tspan>
        </text>

        <image v-if="settings.signature.data" x="475" y="600" :width="settings.signature.width" :height="settings.signature.height" :href="settings.signature.data"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {computed, onMounted, ref} from "vue";
import settings from "../../compositions/settings.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const svgContainer = ref();

const total = computed(function() {
  return settings.items.reduce((acc, item) => acc + (item.amount || 0), 0);
})

function download() {
  const docDefinition = {
    content: [
      {
        "svg": svgContainer.value.innerHTML
      }
    ],
    pageSize: {
      width: 595,
      height: 842
    },
    pageMargins: [0, 0, 0, 0],
  };
  pdfMake.createPdf(docDefinition).download("invoice");
}

onMounted(function () {
  // download();
});
</script>

<style lang="css">
.container {
  display: flex;
  align-items: flex-start;
}

#iframeContainer {
  width: 595px;
  height: 842px;
}

</style>
