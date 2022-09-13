<template>
  <div id="iframeContainer" v-html="invoice"></div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import state from "../../compositions/settings.js";
import Basic from "../../templates/Basic.svg";

function getAndModifySVG(url) {
  return fetch(url)
    // Get SVG response as text
    .then(response => response.text())
}

const total = computed(function () {
  return formatNumber(
    state.settings.items.reduce((acc, item) => acc + (item.amount || 0), 0)
  );
});

const markup = ref("<span>loading</span>");
const invoice = computed( function () {
  return parser(markup.value);
});

const mapper = {
  "%INVOICE_NUMBER%": "invoice",
  "%INVOICE_DATE%": "number",
  "%BILL_TO%": "billTo",
};

function parser(svg) {
  svg = svg.replace("%INVOICE_NUMBER%", state.settings.number);
  svg = svg.replace("%INVOICE_DATE%", state.settings.date);

  return svg;
}

function formatNumber(number) {
  if (typeof number !== "number") {
    return "0.00";
  }

  return number.toFixed(2);
}

onMounted(function() {
  getAndModifySVG(Basic).then(function(text) {
    markup.value = text;
  });
})
</script>

<style lang="css">
#iframeContainer {
  width: 595px;
  height: 842px;
}
</style>
