<template>
  <div id="iframeContainer">
    <svg
      width="595"
      height="842"
      viewBox="0 0 595 842"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="595" height="842" fill="white" />
      <rect width="695" height="100" :fill="state.settings.templateSettings.background.value" />
      <rect y="822" width="695" height="20" :fill="state.settings.templateSettings.background.value" />
      <text
        x="20"
        y="45"
        :fill="state.settings.templateSettings.titleColor.value"
        dominant-baseline="hanging"
        font-size="50"
      >
        INVOICE
      </text>
      <text
        x="20"
        y="120"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
      >
        INVOICE NUMBER
      </text>
      <text
        x="20"
        y="135"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
      >
        {{ state.settings.number }}
      </text>
      <text
        x="200"
        y="120"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
      >
        INVOICE DATE
      </text>
      <text
        x="200"
        y="135"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
      >
        {{ state.settings.date }}
      </text>
      <text
        x="20"
        y="170"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
      >
        BILLED TO
      </text>
      <text
        x="0"
        y="180"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
      >
        <tspan v-for="(line, index) in state.settings.billedTo.split('\n')" :key="index" x="20" dy="1.3em">
          {{ line }}
        </tspan>
      </text>
      <text
        x="200"
        y="170"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
      >
        BILLED FROM
      </text>
      <text
        x="0"
        y="180"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
      >
        <tspan
          v-for="(line, index) in state.settings.billedFrom.split('\n')"
          :key="index"
          x="200"
          dy="1.3em"
        >
          {{ line }}
        </tspan>
      </text>
      <text
        x="20"
        y="270"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
      >
        DESCRIPTION
      </text>
      <text y="280" fill="#000" dominant-baseline="hanging" font-size="10">
        <tspan v-for="item in state.settings.items" :key="item.id" x="20" dy="1.5em">
          {{ item.title }}
        </tspan>
      </text>
      <text
        x="575"
        y="270"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
        text-anchor="end"
      >
        AMOUNT
      </text>
      <text
        v-for="(item, index) in state.settings.items"
        :key="item.id"
        x="575"
        :y="295 + (index * 15)"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        text-anchor="end"
      >
        ${{ formatNumber(item.amount) }}
      </text>
      <rect x="20" y="545" width="555" height="1" :fill="state.settings.templateSettings.background.value" />
      <text
        x="515"
        y="555"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
        text-anchor="end"
      >
        TOTAL
      </text>
      <text
        x="575"
        y="555"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
        font-weight="bold"
        text-anchor="end"
      >
        ${{ total }}
      </text>
      <text
        x="0"
        y="600"
        fill="#000"
        dominant-baseline="hanging"
        font-size="10"
      >
        <tspan x="20" dy="1.3em" font-weight="bold">Note</tspan>
        <tspan v-for="(line, index) in state.settings.note.split('\n')" :key="index" x="20" dy="1.3em">
          {{ line }}
        </tspan>
      </text>
      <image
        v-if="state.settings.signature.data"
        x="475"
        y="600"
        :width="state.settings.signature.width"
        :height="state.settings.signature.height"
        :href="state.settings.signature.data"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";
import state from "../../compositions/settings.js";

const total = computed(function () {
  return formatNumber(
    state.settings.items.reduce((acc, item) => acc + (item.amount || 0), 0)
  );
});

function formatNumber(number) {
  if (typeof number !== "number") {
    return "0.00";
  }

  return number.toFixed(2);
}
</script>

<style lang="css">
#iframeContainer {
  width: 595px;
  height: 842px;
}
</style>
