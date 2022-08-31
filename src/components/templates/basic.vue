<template>
  <div class="container">
    <div id="iframeContainer" v-html="svg"></div>
    <button @click="download">Download</button>
  </div>
</template>


<script setup>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const svg = `
<svg width="595" height="842" viewBox="0 0 595 842" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="595" height="842" fill="white"/>
<rect width="695" height="100" fill="#D9D9D9"/>
<rect y="822" width="695" height="20" fill="#D9D9D9"/>
<text x="20" y="50" fill="#000" alignment-baseline="hanging" font-size="50">INVOICE</text>
<text x="20" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE NUMBER</text>
<text x="20" y="135" fill="#000" alignment-baseline="hanging" font-size="10">XX2022XX</text>
<text x="200" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE DATE</text>
<text x="200" y="135" fill="#000" alignment-baseline="hanging" font-size="10">31/08/2022</text>
<text x="20" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED TO</text>
<text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
  <tspan x="20" dy="1.3em">Demon Ltd.</tspan>
  <tspan x="20" dy="1.3em">Akshya Nagar 1st Block 1st Cross,</tspan>
  <tspan x="20" dy="1.3em">Rammurthy nagar, Bangalore-560016</tspan>
</text>
<text x="200" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED FROM</text>
<text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
  <tspan x="200" dy="1.3em">Alex Doe</tspan>
  <tspan x="200" dy="1.3em">2633 Camden Street</tspan>
  <tspan x="200" dy="1.3em">Las Vegas</tspan>
  <tspan x="200" dy="1.3em">Phone: 775-253-1659</tspan>
</text>

<text x="20" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">DESCRIPTION</text>
<text x="20" y="290" fill="#000" alignment-baseline="hanging" font-size="10">Fixing services, August 2022</text>
<text x="575" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">AMOUNT</text>
<text x="575" y="290" fill="#000" alignment-baseline="hanging" font-size="10" text-anchor="end">$500.00</text>

<rect x="20" y="545" width="555" height="1" fill="#D9D9D9"/>
<text x="515" y="555" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">TOTAL</text>
<text x="575" y="555" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">$500.00</text>

<text x="0" y="600" fill="#000" alignment-baseline="hanging" font-size="10">
  <tspan x="20" dy="1.3em" font-weight="bold">Note</tspan>
  <tspan x="20" dy="1.3em">2633 Camden Street</tspan>
  <tspan x="20" dy="1.3em">Las Vegas</tspan>
  <tspan x="20" dy="1.3em">Phone: 775-253-1659</tspan>
</text>

<image x="475" y="600" width="100" height="35" href="data:image/png;base64,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"/>
</svg>
`;

const docDefinition = {
  content: [
    {
      "svg": svg
    }
  ],
  pageSize: {
    width: 595,
    height: 842
  },
  pageMargins: [0, 0, 0, 0],
};

function download() {
  pdfMake.createPdf(docDefinition).download("invoice");
}
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
